const voc={}
,perv=h=>{
  var f1=!h.monad?nyiErr:x=>{
    if(x.isA)return map(x,f1)
    var r=h.monad(x);typeof r==='number'&&r!==r&&domErr();return r
  }
  var f2=!h.dyad?nyiErr:(x,y)=>{
    var tx=x.isA?(isSingleton(x)?20:30):10
    var ty=y.isA?(isSingleton(y)? 2: 3): 1
    switch(tx+ty){ // todo: use the larger shape when tx=10 and ty=1
      case 11:        var r=h.dyad(x,y);typeof r==='number'&&r!==r&&domErr();return r
      case 12:case 13:return map(y,yi=>f2(x,yi))
      case 21:case 31:return map(x,xi=>f2(xi,y))
      case 23:        const xi=x.data[0];return map(y,yi=>f2(xi,yi))
      case 32:case 22:const yi=y.data[0];return map(x,xi=>f2(xi,yi))
      case 33:        {x.shape.length!==y.shape.length&&rnkErr();x.shape!=''+y.shape&&lenErr()
                       const n=x.data.length,r=Array(n)
                       for(var i=0;i<n;i++)r[i]=f2(x.data[i],y.data[i])
                       return A(r,x.shape)}
      default:        asrt(0)
    }
  }
  return(om,al)=>{asrt(om.isA);asrt(!al||al.isA);return(al?f2:f1)(om,al)}
}
,real=f=>(x,y,axis)=>typeof x!=='number'||y!=null&&typeof y!=='number'?domErr():f(x,y,axis)
,numeric=(f,g)=>(x,y,axis)=>
  (typeof x!=='number'||y!=null&&typeof y!=='number'?g(Zify(x),y==null?y:Zify(y),axis):f(x,y,axis))
,match=(x,y)=>{
  if(x.isA){
    if(!y.isA||x.shape!=''+y.shape)return 0
    var r=1,n=prod(x.shape);for(var i=0;i<n;i++)r&=match(x.data[i],y.data[i])
    return r
  }else{
    if(y.isA)return 0
    if(x instanceof Z&&y instanceof Z)return x.re===y.re&&x.im===y.im
    return x===y
  }
}
,numApprox=(x,y)=>x===y||Math.abs(x-y)<1e-11
,approx=(x,y)=>{
  // approx() is like match(), but it is tolerant to precision errors;
  // used for comparing expected and actual results in doctests
  if(x.isA){
    if(!(y.isA))return 0
    if(x.shape.length!==y.shape.length)return 0
    if(x.shape!=''+y.shape)return 0
    var r=1,n=prod(x.shape);for(var i=0;i<n;i++)r&=approx(x.data[i],y.data[i])
    return r
  }else{
    if(y.isA)return 0
    if(x==null||y==null)return 0
    if(typeof x==='number')x=new Z(x)
    if(typeof y==='number')y=new Z(y)
    if(x instanceof Z)return y instanceof Z&&numApprox(x.re,y.re)&&numApprox(x.im,y.im)
    return x===y
  }
}
,bool=x=>(x&1)!==x?domErr():x
,getAxisList=(axes,rank)=>{
  asrt(isInt(rank,0))
  if(axes==null)return[]
  asrt(axes.isA)
  if(axes.shape.length!==1||axes.shape[0]!==1)synErr() // [sic]
  var a=unwrap(axes)
  if(a.isA){
    a=toArray(a)
    for(var i=0;i<a.length;i++){
      isInt(a[i],0,rank)||domErr()
      a.indexOf(a[i])<i&&domErr()
    }
    return a
  }else if(isInt(a,0,rank)){
    return[a]
  }else{
    domErr()
  }
}
,withId=(x,f)=>{f.identity=x.isA?x:A.scalar(x);return f}
,adv =f=>{f.adv =1;return f}
,conj=f=>{f.conj=1;return f}
,cps =f=>{f.cps =1;return f}

voc['+']=withId(0,perv({
  // +4            ←→ 4
  // ++4           ←→ 4
  // +4 5          ←→ 4 5
  // +((5 6)(7 1)) ←→ (5 6)(7 1)
  // + (5 6)(7 1)  ←→ (5 6)(7 1)
  // +1j¯2         ←→ 1j2
  monad:numeric(x=>x,Z.cjg),
  // 1+2                      ←→ 3
  // 2 3+5 8                  ←→ 7 11
  // (2 3⍴1 2 3 4 5 6)+    ¯2 ←→ 2 3 ⍴ ¯1 0 1 2 3 4
  // (2 3⍴1 2 3 4 5 6)+  2⍴¯2 !!! RANK ERROR
  // (2 3⍴1 2 3 4 5 6)+2 3⍴¯2 ←→ 2 3 ⍴ ¯1 0 1 2 3 4
  // 1 2 3+4 5                !!! LENGTH ERROR
  // (2 3⍴⍳6)+3 2⍴⍳6          !!! LENGTH ERROR
  // 1j¯2+¯2j3                ←→ ¯1j1
  // +/⍬                      ←→ 0
  // ¯+¯¯                     !!! DOMAIN ERROR
  // 1j¯+2j¯¯                 !!! DOMAIN ERROR
  dyad:numeric((y,x)=>x+y,(y,x)=>Z.add(x,y))
}))
voc['-']=withId(0,perv({
  // -4     ←→ ¯4
  // -1 2 3 ←→ ¯1 ¯2 ¯3
  // -1j2   ←→ ¯1j¯2
  monad:numeric(x=>-x,Z.neg),
  // 1-3     ←→ ¯2
  // 5-¯3    ←→ 8
  // 5j2-3j8 ←→ 2j¯6
  // 5-3j8   ←→ 2j¯8
  // -/⍬     ←→ 0
  dyad:numeric((y,x)=>x-y,(y,x)=>Z.sub(x,y))
}))
voc['×']=withId(1,perv({
  // ×¯2 ¯1 0 1 2 ←→ ¯1 ¯1 0 1 1
  // ×¯           ←→ 1
  // ×¯¯          ←→ ¯1
  // ×3j¯4        ←→ .6j¯.8
  monad:numeric(x=>(x>0)-(x<0),x=>{var d=Math.sqrt(x.re*x.re+x.im*x.im);return simplify(x.re/d,x.im/d)}),
  // 7×8       ←→ 56
  // 1j¯2×¯2j3 ←→ 4j7
  // 2×1j¯2    ←→ 2j¯4
  // ×/⍬       ←→ 1
  dyad:numeric((y,x)=>x*y,(y,x)=>Z.mul(x,y))
}))
voc['÷']=withId(1,perv({
  // ÷2   ←→ .5
  // ÷2j3 ←→ 0.15384615384615385J¯0.23076923076923078
  // 0÷0  !!! DOMAIN ERROR
  monad:numeric(x=>1/x,
                x=>{var d=x.re*x.re+x.im*x.im;return simplify(x.re/d,-x.im/d)}),
  // 27÷9     ←→ 3
  // 4j7÷1j¯2 ←→ ¯2j3
  // 0j2÷0j1  ←→ 2
  // 5÷2j1    ←→ 2j¯1
  // ÷/⍬      ←→ 1
  dyad:numeric((y,x)=>x/y,(y,x)=>Z.div(x,y))
}))
voc['*']=withId(1,perv({
  // *2   ←→ 7.38905609893065
  // *2j3 ←→ ¯7.315110094901103J1.0427436562359045
  monad:numeric(Math.exp,Z.exp),
  // 2*3 ←→ 8
  // 3*2 ←→ 9
  // ¯2*3 ←→ ¯8
  // ¯3*2 ←→ 9
  // ¯1*.5 ←→ 0j1
  // 1j2*3j4 ←→ .129009594074467j.03392409290517014
  // */⍬ ←→ 1
  dyad:(y,x)=>Z.pow(x,y)
}))
voc['⍟']=perv({
  // ⍟123 ←→ 4.812184355372417
  // ⍟0 ←→ ¯¯
  // ⍟¯1 ←→ 0j1×○1
  // ⍟123j456 ←→ 6.157609243895447J1.3073297857599793
  monad:Z.log,
  // 12⍟34 ←→ 1.419111870829036
  // 12⍟¯34 ←→ 1.419111870829036j1.26426988871305
  // ¯12⍟¯34 ←→ 1.1612974763994781j¯.2039235425372641
  // 1j2⍟3j4 ←→ 1.2393828252698689J¯0.5528462880299602
  dyad:(y,x)=>typeof x==='number'&&typeof y==='number'&&x>0&&y>0
              ?Math.log(y)/Math.log(x):Z.div(Z.log(y),Z.log(x))
})
voc['|']=withId(0,perv({
  // |¯8 0 8 ¯3.5 ←→ 8 0 8 3.5
  // |5j12 ←→ 13
  monad:numeric(x=>Math.abs(x),Z.mag),
  // 3|5 ←→ 2
  // 1j2|3j4 ←→ ¯1j1
  // 7 ¯7∘.|31 28 ¯30        ←→ 2 3⍴3 0 5 ¯4 0 ¯2
  // ¯0.2 0 0.2∘.|¯0.3 0 0.3 ←→ 3 3⍴¯0.1 0 ¯0.1 ¯0.3 0 0.3 0.1 0 0.1
  // |/⍬ ←→ 0
  // 0|¯4 ←→ ¯4
  // 0|¯4j5 ←→ ¯4j5
  // 10|4j3 ←→ 4j3
  // 4j6|7j10 ←→ 3j4
  // ¯10 7j10 0.3|17 5 10 ←→ ¯3 ¯5j7 0.1
  dyad:(y,x)=>Z.residue(x,y)
}))

voc['⍀']=adv((om,al,axis)=>voc['\\'](om,al,axis||A.zero))

// +\20 10 ¯5 7               ←→ 20 30 25 32
// ,\'AB' 'CD' 'EF'           ←→ 'AB' 'ABCD' 'ABCDEF'
// ×\2 3⍴5 2 3 4 7 6          ←→ 2 3⍴5 10 30 4 28 168
// ∧\1 1 1 0 1 1              ←→ 1 1 1 0 0 0
// -\1 2 3 4                  ←→ 1 ¯1 2 ¯2
// ∨\0 0 1 0 0 1 0            ←→ 0 0 1 1 1 1 1
// +\1 2 3 4 5                ←→ 1 3 6 10 15
// +\(1 2 3)(4 5 6)(7 8 9)    ←→ (1 2 3)(5 7 9)(12 15 18)
// M←2 3⍴1 2 3 4 5 6 ⋄ +\M    ←→ 2 3 ⍴ 1 3 6 4 9 15
// M←2 3⍴1 2 3 4 5 6 ⋄ +⍀M    ←→ 2 3 ⍴ 1 2 3 5 7 9
// M←2 3⍴1 2 3 4 5 6 ⋄ +\[0]M ←→ 2 3 ⍴ 1 2 3 5 7 9
// ,\'ABC'                    ←→ 'A' 'AB' 'ABC'
// T←'ONE(TWO) BOOK(S)' ⋄ ≠\T∊'()' ←→ 0 0 0 1 1 1 1 0 0 0 0 0 0 1 1 0
// T←'ONE(TWO) BOOK(S)' ⋄ ((T∊'()')⍱≠\T∊'()')/T ←→ 'ONE BOOK'
// 1 0 1\'ab'          ←→ 'a b'
// 0 1 0 1 0\2 3       ←→ 0 2 0 3 0
// (2 2⍴0)\'food'      !!! RANK ERROR
// 'abc'\'def'         !!! DOMAIN ERROR
// 1 0 1 1\'ab'        !!! LENGTH ERROR
// 1 0 1 1\'abcd'      !!! LENGTH ERROR
// 1 0 1\2 2⍴'ABCD'    ←→ 2 3⍴'A BC D'
// 1 0 1⍀2 2⍴'ABCD'    ←→ 3 2⍴'AB  CD'
// 1 0 1\[0]2 2⍴'ABCD' ←→ 3 2⍴'AB  CD'
// 1 0 1\[1]2 2⍴'ABCD' ←→ 2 3⍴'A BC D'
voc['\\']=adv((om,al,axis)=>{
  if(typeof om==='function'){
    asrt(typeof al==='undefined')
    var f=om
    return(om,al)=>{
      asrt(al==null)
      if(!om.shape.length)return om
      axis=axis?toInt(axis,0,om.shape.length):om.shape.length-1
      const ni=prod(om.shape.slice(0,axis)), nj=om.shape[axis], nk=prod(om.shape.slice(axis+1)), r=Array(ni*nj*nk)
      if(r.length)for(var i=0;i<ni;i++)for(var j=0;j<nj;j++)for(var k=0;k<nk;k++){
        var x=om.data[(i*nj+j)*nk+k];x=x.isA?x:A.scalar(x)
        for(var l=j-1;l>=0;l--){var y=om.data[(i*nj+l)*nk+k];x=f(x,y.isA?y:A.scalar(y))}
        r[(i*nj+j)*nk+k]=x.shape.length?x:unwrap(x)
      }
      return A(r,om.shape)
    }
  }else{
    om.shape.length||nyiErr()
    axis=axis?toInt(axis,0,om.shape.length):om.shape.length-1
    al.shape.length>1&&rnkErr()
    var a=toArray(al),b=[],i=0,shape=om.shape.slice(0);shape[axis]=a.length
    for(var j=0;j<a.length;j++){isInt(a[j],0,2)||domErr();b.push(a[j]>0?i++:null)}
    i===om.shape[axis]||lenErr()
    var data=[]
    if(shape[axis]&&!empty(om)){
      var filler=getPrototype(om),p=0,indices=repeat([0],shape.length)
      while(1){
        data.push(b[indices[axis]]==null?filler:om.data[p+b[indices[axis]]*om.stride[axis]])
        var i=shape.length-1
        while(i>=0&&indices[i]+1===shape[i]){
          if(i!==axis)p-=om.stride[i]*indices[i]
          indices[i--]=0
        }
        if(i<0)break
        if(i!==axis)p+=om.stride[i]
        indices[i]++
      }
    }
    return A(data,shape)
  }
})
voc['○']=perv({
  // ○2     ←→ 6.283185307179586
  // ○2J2   ←→ 6.283185307179586J6.283185307179586
  // ○'ABC' !!! DOMAIN ERROR
  monad:numeric(x=>Math.PI*x,x=>new Z(Math.PI*x.re,Math.PI*x.im)),
  // ¯12○2          ←→ ¯0.4161468365471J0.9092974268257
  // ¯12○2j3        ←→ ¯0.02071873100224J0.04527125315609
  // ¯11○2          ←→ 0j2
  // ¯11○2j3        ←→ ¯3j2
  // ¯10○2          ←→ 2
  // ¯10○2j3        ←→ 2j¯3
  // ¯9○2           ←→ 2
  // ¯9○2j3         ←→ 2j3
  // ¯8○2           ←→ 0J¯2.2360679774998
  // ¯8○2j3         ←→ ¯2.8852305489054J2.0795565201111
  // ¯7○0.5         ←→ 0.54930614433405
  // ¯7○2           ←→ 0.5493061443340548456976226185j¯1.570796326794896619231321692
  // ¯7○2j3         ←→ 0.1469466662255297520474327852j1.338972522294493561124193576
  // ¯6○0.5         ←→ ¯1.1102230246252E¯16J1.0471975511966
  // ¯6○2           ←→ 1.316957896924816708625046347
  // ¯6○2j3         ←→ 1.983387029916535432347076903j1.000143542473797218521037812
  // ¯5○2           ←→ 1.443635475178810342493276740
  // ¯5○2j3         ←→ 1.968637925793096291788665095j0.9646585044076027920454110595
  // ¯4○2           ←→ 1.7320508075689
  // ¯4○0           ←→ 0j1
  // ¯4○¯2          ←→ ¯1.7320508075689
  // ¯4○2j3         ←→ 1.9256697360917J3.1157990841034
  // ¯3○0.5         ←→ 0.46364760900081
  // ¯3○2           ←→ 1.107148717794090503017065460
  // ¯3○2j3         ←→ 1.409921049596575522530619385j0.2290726829685387662958818029
  // ¯2○0.5         ←→ 1.0471975511966
  // ¯2○2           ←→ 0J1.316957896924816708625046347
  // ¯2○2j3         ←→ 1.000143542473797218521037812J¯1.983387029916535432347076903
  // ¯1○0.5         ←→ 0.5235987755983
  // ¯1○2           ←→ 1.570796326794896619231321692J¯1.316957896924816708625046347
  // ¯1○2j3         ←→ 0.5706527843210994007102838797J1.983387029916535432347076903
  // 0○0.5          ←→ 0.86602540378444
  // 0○2            ←→ 0J1.7320508075689
  // 0○2j3          ←→ 3.1157990841034J¯1.9256697360917
  // 1e¯10>|.5-1○○÷6 ←→ 1 # sin(pi/6) = .5
  // 1○1            ←→ 0.8414709848079
  // 1○2j3          ←→ 9.1544991469114J¯4.1689069599666
  // 2○1            ←→ 0.54030230586814
  // 2○2j3          ←→ ¯4.1896256909688J¯9.1092278937553
  // 3○1            ←→ 1.5574077246549
  // 3○2j3          ←→ ¯0.0037640256415041J1.0032386273536
  // 4○2            ←→ 2.2360679774998
  // 4○2j3          ←→ 2.0795565201111J2.8852305489054
  // 5○2            ←→ 3.626860407847
  // 5○2j3          ←→ ¯3.5905645899858J0.53092108624852
  // 6○2            ←→ 3.7621956910836
  // 6○2j3          ←→ ¯3.7245455049153J0.51182256998738
  // 7○2            ←→ 0.96402758007582
  // 7○2j3          ←→ 0.96538587902213J¯0.0098843750383225
  // 8○2            ←→ 0J2.2360679774998
  // 8○2j3          ←→ 2.8852305489054J¯2.0795565201111
  // 9○2            ←→ 2
  // 9○2j3          ←→ 2
  // 10○¯2          ←→ 2
  // 10○¯2j3        ←→ 3.605551275464
  // 11○2           ←→ 0
  // 11○2j3         ←→ 3
  // 12○2           ←→ 0
  // 12○2j3         ←→ 0.98279372324733
  // 1○'hello'      !!! DOMAIN ERROR
  // 99○1           !!! DOMAIN ERROR
  // 99○1j2         !!! DOMAIN ERROR
  dyad:(x,i)=>{
    if(typeof x==='number'){
      switch(i){
        case-12:return Z.exp(simplify(0,x))
        case-11:return simplify(0,x)
        case-10:return x
        case -9:return x
        case -8:return simplify(0,-Math.sqrt(1+x*x))
        case -7:return Z.atanh(x)
        case -6:return Z.acosh(x)
        case -5:return Z.asinh(x)
        case -4:var t=Z.sqrt(x*x-1);return x<-1?-t:t
        case -3:return Z.atan(x)
        case -2:return Z.acos(x)
        case -1:return Z.asin(x)
        case  0:return Z.sqrt(1-x*x)
        case  1:return Math.sin(x)
        case  2:return Math.cos(x)
        case  3:return Math.tan(x)
        case  4:return Math.sqrt(1+x*x)
        case  5:var a=Math.exp(x),b=1/a;return(a-b)/2     // sinh
        case  6:var a=Math.exp(x),b=1/a;return(a+b)/2     // cosh
        case  7:var a=Math.exp(x),b=1/a;return(a-b)/(a+b) // tanh
        case  8:return Z.sqrt(-1-x*x)
        case  9:return x
        case 10:return Math.abs(x)
        case 11:return 0
        case 12:return 0
        default:domErr()
      }
    }else if(x instanceof Z){
      switch(i){
        case -12:return Z.exp(simplify(-x.im,x.re))
        case -11:return Z.itimes(x)
        case -10:return Z.cjg(x)
        case  -9:return x
        case  -8:return Z.neg(Z.sqrt(Z.sub(-1,Z.mul(x,x))))
        case  -7:return Z.atanh(x)
        case  -6:return Z.acosh(x)
        case  -5:return Z.asinh(x)
        case  -4:
          if(x.re===-1&&!x.im)return 0
          var a=Z.add(x,1),b=Z.sub(x,1);return Z.mul(a,Z.sqrt(Z.div(b,a)))
        case  -3:return Z.atan(x)
        case  -2:return Z.acos(x)
        case  -1:return Z.asin(x)
        case   0:return Z.sqrt(Z.sub(1,Z.mul(x,x)))
        case   1:return Z.sin(x)
        case   2:return Z.cos(x)
        case   3:return Z.tan(x)
        case   4:return Z.sqrt(Z.add(1,Z.mul(x,x)))
        case   5:return Z.sinh(x)
        case   6:return Z.cosh(x)
        case   7:return Z.tanh(x)
        case   8:return Z.sqrt(Z.sub(-1,Z.mul(x,x)))
        case   9:return x.re
        case  10:return Z.mag(x)
        case  11:return x.im
        case  12:return Z.dir(x)
        default:domErr()
      }
    }else{
      domErr()
    }
  }
})
voc[',']=(om,al,axis)=>{
  if(al){
    // 10,66 ←→ 10 66
    // 'ab','c','def' ←→ 'abcdef'
    // (2 3⍴⍳6),2 2⍴⍳4 ←→ 2 5⍴0 1 2 0 1 3 4 5 2 3
    // (3 2⍴⍳6),2 2⍴⍳4 !!! LENGTH ERROR
    // (2 3⍴⍳6),9 ←→ 2 4⍴0 1 2 9 3 4 5 9
    // (2 3 4⍴⍳24),99 ←→ 2 3 5⍴0 1 2 3 99 4 5 6 7 99 8 9 10 11 99 12 13 14 15 99 16 17 18 19 99 20 21 22 23 99
    // ⍬,⍬ ←→ ⍬
    // ⍬,1 ←→ ,1
    // 1,⍬ ←→ ,1
    var nAxes=Math.max(al.shape.length,om.shape.length)
    if(axis){axis=unwrap(axis);typeof axis!=='number'&&domErr();nAxes&&!(-1<axis&&axis<nAxes)&&rnkErr()}
    else{axis=nAxes-1}

    if(!al.shape.length&&!om.shape.length){
      return A([unwrap(al),unwrap(om)])
    }else if(!al.shape.length){
      var s=om.shape.slice(0)
      if(isInt(axis))s[axis]=1
      al=A([unwrap(al)],s,repeat([0],om.shape.length))
    }else if(!om.shape.length){
      var s=al.shape.slice(0)
      if(isInt(axis))s[axis]=1
      om=A([unwrap(om)],s,repeat([0],al.shape.length))
    }else if(al.shape.length+1===om.shape.length){
      isInt(axis)||rnkErr()
      var shape =al.shape .slice(0);shape .splice(axis,0,1)
      var stride=al.stride.slice(0);stride.splice(axis,0,0)
      al=A(al.data,shape,stride)
    }else if(al.shape.length===om.shape.length+1){
      isInt(axis)||rnkErr()
      var shape =om.shape .slice(0);shape .splice(axis,0,1)
      var stride=om.stride.slice(0);stride.splice(axis,0,0)
      om=A(om.data,shape,stride)
    }else if(al.shape.length!==om.shape.length){
      rnkErr()
    }

    asrt(al.shape.length===om.shape.length)
    for(var i=0;i<al.shape.length;i++)if(i!==axis&&al.shape[i]!==om.shape[i])lenErr()

    var shape=al.shape.slice(0);if(isInt(axis)){shape[axis]+=om.shape[axis]}else{shape.splice(Math.ceil(axis),0,2)}
    var data=Array(prod(shape))
    var stride=Array(shape.length);stride[shape.length-1]=1
    for(var i=shape.length-2;i>=0;i--)stride[i]=stride[i+1]*shape[i+1]

    var rStride=stride;if(!isInt(axis)){rStride=stride.slice(0);rStride.splice(Math.ceil(axis),1)}
    if(!empty(al)){
      var r=0,p=0 // r:pointer in data (the result), p:pointer in al.data
      var pIndices=repeat([0],al.shape.length)
      while(1){
        data[r]=al.data[p]
        var a=pIndices.length-1
        while(a>=0&&pIndices[a]+1===al.shape[a]){
          p-=pIndices[a]*al.stride[a];r-=pIndices[a]*rStride[a];pIndices[a--]=0
        }
        if(a<0)break
        p+=al.stride[a];r+=rStride[a];pIndices[a]++
      }
    }
    if(!empty(om)){
      var r=isInt(axis)?stride[axis]*al.shape[axis]:stride[Math.ceil(axis)] // pointer in data (the result)
      var q=0 // pointer in ⍵.data
      var pIndices=repeat([0],om.shape.length)
      while(1){
        data[r]=om.data[q]
        var a=pIndices.length-1
        while(a>=0&&pIndices[a]+1===om.shape[a]){
          q-=pIndices[a]*om.stride[a];r-=pIndices[a]*rStride[a];pIndices[a--]=0
        }
        if(a<0)break
        q+=om.stride[a];r+=rStride[a];pIndices[a]++
      }
    }
    return A(data,shape,stride)
  }else{
    asrt(0)
  }
}
var eq
// 12=12               ←→ 1
// 2=12                ←→ 0
// 'Q'='Q'             ←→ 1
// 1='1'               ←→ 0
// '1'=1               ←→ 0
// 11 7 2 9=11 3 2 6   ←→ 1 0 1 0
// 'STOAT'='TOAST'     ←→ 0 0 0 0 1
// 8=2+2+2+2           ←→ 1
// (2 3⍴1 2 3 4 5 6)=2 3⍴3 3 3 5 5 5 ←→ 2 3⍴0 0 1 0 1 0
// 3=2 3⍴1 2 3 4 5 6   ←→ 2 3⍴0 0 1 0 0 0
// 3=(2 3⍴1 2 3 4 5 6)(2 3⍴3 3 3 5 5 5)←→(2 3⍴0 0 1 0 0 0)(2 3⍴1 1 1 0 0 0)
// 2j3=2j3             ←→ 1
// 2j3=3j2             ←→ 0
// 0j0                 ←→ 0
// 123j0               ←→ 123
// 2j¯3+¯2j3           ←→ 0
// =/⍬                 ←→ 1
voc['=']=withId(1,perv({dyad:eq=(y,x)=>+(x instanceof Z&&y instanceof Z?x.re===y.re&&x.im===y.im:x===y)})),

// 3≢5 ←→ 1
// 8≠8 ←→ 0
// ≠/⍬ ←→ 0
voc['≠']=withId(0,perv({dyad:(y,x)=>1-eq(y,x)})),

// </⍬ ←→ 0
// >/⍬ ←→ 0
// ≤/⍬ ←→ 1
// ≥/⍬ ←→ 1
voc['<']=withId(0,perv({dyad:real((y,x)=>+(x< y))})),
voc['>']=withId(0,perv({dyad:real((y,x)=>+(x> y))})),
voc['≤']=withId(1,perv({dyad:real((y,x)=>+(x<=y))})),
voc['≥']=withId(1,perv({dyad:real((y,x)=>+(x>=y))})),

// 3≡3                    ←→ 1
// 3≡,3                   ←→ 0
// 4 7.1 8≡4 7.2 8        ←→ 0
// (3 4⍴⍳12)≡3 4⍴⍳12      ←→ 1
// (3 4⍴⍳12)≡⊂3 4⍴⍳12     ←→ 0
// ('ABC' 'DEF')≡'ABCDEF' ←→ 0
//! (⍳0)≡''               ←→ 0
// (2 0⍴0)≡(0 2⍴0)        ←→ 0
//! (0⍴1 2 3)≡0⍴⊂2 2⍴⍳4   ←→ 0
// ≡4                      ←→ 0
// ≡⍳4                     ←→ 1
// ≡2 2⍴⍳4                 ←→ 1
// ≡'abc'1 2 3(23 55)      ←→ 2
// ≡'abc'(2 4⍴'abc'2 3'k') ←→ 3
voc['≡']=(om,al)=>al?A.bool[+match(om,al)]:A([depthOf(om)],[])

const depthOf=x=>{
  if(!(x.isA)||!x.shape.length&&!(x.data[0].isA))return 0
  var r=0;each(x,y=>{r=Math.max(r,depthOf(y))});return r+1
}

// (÷∘-)2     ←→ ¯0.5
// 8(÷∘-)2    ←→ ¯4
// ÷∘-2       ←→ ¯0.5
// 8÷∘-2      ←→ ¯4
// ⍴∘⍴2 3⍴⍳6  ←→ ,2
// 3⍴∘⍴2 3⍴⍳6 ←→ 2 3 2
// 3∘-1       ←→ 2
// (-∘2)9     ←→ 7
voc['∘']=conj((g,f)=>{
  if(typeof f==='function'){if(typeof g==='function'){return(om,al)=>f(g(om),al)}      // f∘g
                            else{return(om,al)=>{al==null||synErr();return f(g,om)}}}  // f∘B
  else{asrt(typeof g==='function');return(om,al)=>{al==null||synErr();return g(om,f)}} // A∘g
})

voc['∪']=(om,al)=>{
  if(al){
    // 1 2∪2 3     ←→ 1 2 3
    // 'SHOCK'∪'CHOCOLATE' ←→ 'SHOCKLATE'
    // 1∪1         ←→ ,1
    // 1∪2         ←→ 1 2
    // 1∪2 1       ←→ 1 2
    // 1 2∪2 2 2 2 ←→ 1 2
    // 1 2∪2 2⍴3   !!! RANK ERROR
    // (2 2⍴3)∪4 5 !!! RANK ERROR
    // ⍬∪1         ←→ ,1
    // 1 2∪⍬       ←→ 1 2
    // ⍬∪⍬         ←→ ⍬
    // 2 3 3∪4 5 3 4 ←→ 2 3 3 4 5 4
    // 'lentils' 'bulghur'(3 4 5)∪'lentils' 'rice' ←→ 'lentils' 'bulghur'(3 4 5)'rice'
    if(al.shape.length>1||om.shape.length>1)rnkErr()
    var a=toArray(al),r=[];each(om,x=>{contains(a,x)||r.push(x)});return A(a.concat(r))
  }else{
    // ∪3 17 17 17 ¯3 17 0 ←→ 3 17 ¯3 0
    // ∪3 17               ←→ 3 17
    // ∪17                 ←→ ,17
    // ∪⍬                  ←→ ⍬
    if(om.shape.length>1)rnkErr()
    var r=[];each(om,x=>{contains(r,x)||r.push(x)});return A(r)
  }
}
voc['∩']=(om,al)=>{
  if(al){
    // 'ABRA'∩'CAR' ←→ 'ARA'
    // 1'PLUS'2∩⍳5  ←→ 1 2
    // 1∩2          ←→ ⍬
    // 1∩2 3⍴4      !!! RANK ERROR
    if(al.shape.length>1||om.shape.length>1)rnkErr()
    var r=[],b=toArray(om);each(al,x=>{contains(b,x)&&r.push(x)})
    return A(r)
  }else{
    // ∩1 !!! NONCE ERROR
    nyiErr()
  }
}
const contains=(a,x)=>{for(var i=0;i<a.length;i++)if(match(x,a[i]))return 1}

// 10⊥3 2 6 9                        ←→ 3269
// 8⊥3 1                             ←→ 25
// 1760 3 12⊥1 2 8                   ←→ 68
// 2 2 2⊥1                           ←→ 7
// 0 20 12 4⊥2 15 6 3                ←→ 2667
// 1760 3 12⊥3 3⍴1 1 1 2 0 3 0 1 8   ←→ 60 37 80
// 60 60⊥3 13                        ←→ 193
// 0 60⊥3 13                         ←→ 193
// 60⊥3 13                           ←→ 193
// 2⊥1 0 1 0                         ←→ 10
// 2⊥1 2 3 4                         ←→ 26
// 3⊥1 2 3 4                         ←→ 58
// (4 3⍴1 1 1 2 2 2 3 3 3 4 4 4)⊥3 8⍴0 0 0 0 1 1 1 1 0 0 1 1 0 0 1 1 0 1 0 1 0 1 0 1←→4 8⍴0 1 1 2 1 2 2 3 0 1 2 3 4 5 6 7 0 1 3 4 9 10 12 13 0 1 4 5 16 17 20 21
// 2⊥3 8⍴0 0 0 0 1 1 1 1 0 0 1 1 0 0 1 1 0 1 0 1 0 1 0 1←→0 1 2 3 4 5 6 7
// (2 1⍴2 10)⊥3 8 ⍴0 0 0 0 1 1 1 1 0 0 1 1 0 0 1 1 0 1 0 1 0 1 0 1←→2 8⍴0 1 2 3 4 5 6 7 0 1 10 11 100 101 110 111
// 2j3⊤4j5 6j7 8j9 ←→ 2j2 2j1 ¯1j2
// 10⊥3 4.5j1 ←→ 34.5j1
voc['⊥']=(om,al)=>{
  asrt(al)
  if(!al.shape.length)al=A([unwrap(al)])
  if(!om.shape.length)om=A([unwrap(om)])
  var lastDimA=al.shape[al.shape.length-1],firstDimB=om.shape[0]
  if(lastDimA!==1&&firstDimB!==1&&lastDimA!==firstDimB)lenErr()
  var a=toArray(al),b=toArray(om),data=[],ni=a.length/lastDimA,nj=b.length/firstDimB
  for(var i=0;i<ni;i++)for(var j=0;j<nj;j++){
    var x=a.slice(i*lastDimA,(i+1)*lastDimA)
    var y=[];for(var l=0;l<firstDimB;l++)y.push(b[j+l*(b.length/firstDimB)])
    if(x.length===1)x=repeat([x[0]],y.length)
    if(y.length===1)y=repeat([y[0]],x.length)
    var z=y[0];for(var k=1;k<y.length;k++)z=Z.add(Z.mul(z,x[k]),y[k])
    data.push(z)
  }
  return A(data,al.shape.slice(0,-1).concat(om.shape.slice(1)))
}

voc['.']=conj((g,f)=>f===voc['∘']?outerProduct(g):innerProduct(g,f))

// 2 3 4∘.×1 2 3 4 ←→ 3 4⍴2 4  6  8 3 6  9 12 4 8 12 16
// 0 1 2 3 4∘.!0 1 2 3 4←→5 5⍴1 1 1 1 1 0 1 2 3 4 0 0 1 3 6 0 0 0 1 4 0 0 0 0 1
// 1 2∘.,1+⍳3 ←→ 2 3⍴(1 1)(1 2)(1 3)(2 1)(2 2)(2 3)
// ⍴1 2∘.,1+⍳3 ←→ 2 3
// 2 3∘.↑1 2←→(2 2⍴(1 0)(2 0)(1 0 0)(2 0 0))
// ⍴2 3∘.↑1 2 ←→ 2 2
// ⍴((4 3⍴0)∘.+5 2⍴0) ←→ 4 3 5 2
// 2 3∘.×4 5      ←→ 2 2⍴8 10 12 15
// 2 3∘ . ×4 5    ←→ 2 2⍴8 10 12 15
// 2 3∘.{⍺×⍵}4 5  ←→ 2 2⍴8 10 12 15
const outerProduct=f=>{
  asrt(typeof f==='function')
  return(om,al)=>{
    al||synErr()
    var a=toArray(al),b=toArray(om),data=[]
    for(var i=0;i<a.length;i++)for(var j=0;j<b.length;j++){
      var x=a[i],y=b[j]
      x.isA||(x=A.scalar(x))
      y.isA||(y=A.scalar(y))
      var z=f(y,x)
      z.shape.length||(z=unwrap(z))
      data.push(z)
    }
    return A(data,al.shape.concat(om.shape))
  }
}

// (1 3 5 7)+.=2 3 6 7 ←→ 2
// (1 3 5 7)∧.=2 3 6 7 ←→ 0
// (1 3 5 7)∧.=1 3 5 7 ←→ 1
// 7+.=8 8 7 7 8 7 5   ←→ 3
// 8 8 7 7 8 7 5+.=7   ←→ 3
// 7+.=7               ←→ 1
// (3 2⍴5 ¯3 ¯2 4 ¯1 0)+.×2 2⍴6 ¯3 5 7 ←→ 3 2⍴15 ¯36 8 34 ¯6 3
const innerProduct=(g,f)=>{ // A f.g B <-> f/¨(⊂[¯1+⍴⍴A]A)∘.g⊂[0]B
  var F=voc['¨'](voc['/'](f)),G=outerProduct(g)
  return(om,al)=>{if(!al.shape.length)al=A([unwrap(al)])
                  if(!om.shape.length)om=A([unwrap(om)])
                  return F(G(voc['⊂'](om,undefined,A([0])),
                             voc['⊂'](al,undefined,A([al.shape.length-1]))))}
}

// ⍴¨(0 0 0 0)(0 0 0)             ←→ (,4)(,3)
// ⍴¨'MONDAY' 'TUESDAY'           ←→ (,6)(,7)
// ⍴   (2 2⍴⍳4)(⍳10)97.3(3 4⍴'K') ←→ ,4
// ⍴¨  (2 2⍴⍳4)(⍳10)97.3(3 4⍴'K') ←→ (2 2)(,10)⍬(3 4)
// ⍴⍴¨ (2 2⍴⍳4)(⍳10)97.3(3 4⍴'K') ←→ ,4
// ⍴¨⍴¨(2 2⍴⍳4)(⍳10)97.3(3 4⍴'K') ←→ (,2)(,1)(,0)(,2)
// (1 2 3) ,¨ 4 5 6               ←→ (1 4)(2 5)(3 6)
// 2 3↑¨'MONDAY' 'TUESDAY'        ←→ 'MO' 'TUE'
// 2↑¨'MONDAY' 'TUESDAY'          ←→ 'MO' 'TU'
// 2 3⍴¨1 2                       ←→ (1 1)(2 2 2)
// 4 5⍴¨'THE' 'CAT'               ←→ 'THET' 'CATCA'
// {1+⍵*2}¨2 3⍴⍳6                 ←→ 2 3⍴1 2 5 10 17 26
voc['¨']=adv((f,g)=>{
  asrt(typeof f==='function');asrt(g==null)
  return(om,al)=>{
    if(!al){
      return map(om,x=>{
        x.isA||(x=A([x],[]))
        var r=f(x);asrt(r.isA)
        return r.shape.length?r:unwrap(r)
      })
    }else if(arrEq(al.shape,om.shape)){
      const n=al.data.length,r=Array(n)
      for(var i=0;i<n;i++){
        const x=al.data[i],y=om.data[i],z=f(y.isA?y:A([y],[]),x.isA?x:A([x],[]))
        r[i]=z.shape.length?z:unwrap(z)
      }
      return A(r,al.shape)
    }else if(isSingleton(al)){
      var y=al.data[0].isA?unwrap(al):al
      return map(om,x=>{
        x.isA||(x=A([x],[]))
        var r=f(x,y);asrt(r.isA)
        return r.shape.length?r:unwrap(r)
      })
    }else if(isSingleton(om)){
      var x=om.data[0].isA?unwrap(om):om
      return map(al,y=>{
        y.isA||(y=A([y],[]))
        var r=f(x,y);asrt(r.isA)
        return r.shape.length?r:unwrap(r)
      })
    }else{
      lenErr()
    }
  }
})

// 1760 3 12⊤75    ←→ 2 0 3
// 3 12⊤75         ←→ 0 3
// 100000 12⊤75    ←→ 6 3
// 16 16 16 16⊤100 ←→ 0 0 6 4
// 1760 3 12⊤75.3  ←→ 2 0(75.3-72)
// 0 1⊤75.3        ←→ 75(75.3-75)
// 2 2 2 2 2⊤1 2 3 4 5 ←→ 5 5⍴0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 1 1 0 0 1 0 1 0 1
// 10⊤5 15 125 ←→ 5 5 5
// 0 10⊤5 15 125 ←→ 2 3⍴0 1 12 5 5 5
// (8 3⍴2 0 0 2 0 0 2 0 0 2 0 0 2 8 0 2 8 0 2 8 16 2 8 16)⊤75 ←→ 8 3⍴0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 1 0 1 1 4 1 3 11
// 0j1 2j3 4j5⊤6j7 ←→ 0 ¯2j2 2j2
voc['⊤']=(om,al)=>{
  asrt(al)
  var a=toArray(al),b=toArray(om),shape=al.shape.concat(om.shape),data=Array(prod(shape))
  var n=al.shape.length?al.shape[0]:1,m=a.length/n
  for(var i=0;i<m;i++)for(var j=0;j<b.length;j++){
    var y=typeof b[j]==='number'?Math.abs(b[j]):b[j]
    for(var k=n-1;k>=0;k--){
      var x=a[k*m+i]
      data[(k*m+i)*b.length+j]=iszero(x)?y:Z.residue(x,y)
      y=iszero(x)?0:Z.div(Z.sub(y,Z.residue(x,y)),x)
    }
  }
  return A(data,shape)
}

voc['∊']=(om,al)=>{
  if(al){
    // 2 3 4 5 6∊1 2 3 5 8 13 21 ←→ 1 1 0 1 0
    // 5∊1 2 3 5 8 13 21         ←→ 1
    var b=toArray(om)
    return map(al,x=>{
      for(var i=0;i<b.length;i++)if(match(x,b[i]))return 1
      return 0
    })
  }else{
    // ∊17                   ←→ ,17
    // ⍴∊(1 2 3)'ABC'(4 5 6) ←→ ,9
    // ∊2 2⍴(1+2 2⍴⍳4)'DEF'(1+2 3⍴⍳6)(7 8 9) ←→ 1 2 3 4,'DEF',1 2 3 4 5 6 7 8 9
    var r=[];enlist(om,r);return A(r)
  }
}

const enlist=(x,r)=>{x.isA?each(x,y=>enlist(y,r)):r.push(x)}
var Beta
voc['!']=withId(1,perv({

  // !5    ←→ 120
  // !21   ←→ 51090942171709440000
  // !0    ←→ 1
  // !1.5  ←→ 1.3293403881791
  // !¯1.5 ←→ ¯3.544907701811
  // !¯2.5 ←→ 2.3632718012074
  // !¯200.5 ←→ 0
  // !¯1   !!! DOMAIN ERROR
  // !¯200 !!! DOMAIN ERROR
  monad:real(x=>
    !isInt(x)?Γ(x+1):x<0?domErr():x<smallFactorials.length?smallFactorials[x]:Math.round(Γ(x+1))
  ),

  // 2!4       ←→ 6
  // 3!20      ←→ 1140
  // 2!6 12 20 ←→ 15 66 190
  // (2 3⍴1+⍳6)!2 3⍴3 6 9 12 15 18 ←→ 2 3⍴3 15 84 495 3003 18564
  // 0.5!1     ←→ 1.2732395447351612
  // 1.2!3.4   ←→ 3.795253463731253
  // !/⍬       ←→ 1
  // (2!1000)=499500 ←→ 1
  // (998!1000)=499500 ←→ 1
  //
  //                Negative integer?  Expected
  //                   ⍺   ⍵  ⍵-⍺       Result
  //                  -----------     ----------
  // 3!5   ←→ 10  #    0   0   0      (!⍵)÷(!⍺)×!⍵-⍺
  // 5!3   ←→ 0   #    0   0   1      0
  // see below    #    0   1   0      Domain Error
  // 3!¯5  ←→ ¯35 #    0   1   1      (¯1*⍺)×⍺!⍺-⍵+1
  // ¯3!5  ←→ 0   #    1   0   0      0
  //              #    1   0   1      Cannot arise
  // ¯5!¯3 ←→ 6   #    1   1   0      (¯1*⍵-⍺)×(|⍵+1)!(|⍺+1)
  // ¯3!¯5 ←→ 0   #    1   1   1      0
  //
  // 0.5!¯1 !!! DOMAIN ERROR
  dyad:Beta=real((n,k)=>{
    var r
    switch(256*negInt(k)+16*negInt(n)+negInt(n-k)){
      case 0x000:r=Math.exp(lnΓ(n+1)-lnΓ(k+1)-lnΓ(n-k+1))            ;break
      case 0x001:r=0                                                 ;break
      case 0x010:r=domErr()                                          ;break
      case 0x011:r=Math.pow(-1,k)*Beta(k-n-1,k)                      ;break
      case 0x100:r=0                                                 ;break
      case 0x101:asrt(0)                                             ;break
      case 0x110:r=Math.pow(-1,n-k)*Beta(Math.abs(k+1),Math.abs(n+1));break
      case 0x111:r=0                                                 ;break
    }
    return isInt(n)&&isInt(k)?Math.round(r):r
  })
}))

const negInt=x=>isInt(x)&&x<0
var smallFactorials=[1];(_=>{var x=1;for(var i=1;i<=25;i++)smallFactorials.push(x*=i)})()
var Γ,lnΓ
;(_=>{
  const g=7
  ,p=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,
      12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7]
  ,g_ln=607/128
  ,p_ln=[0.99999999999999709182,57.156235665862923517,-59.597960355475491248,14.136097974741747174,
         -0.49191381609762019978,0.33994649984811888699e-4,0.46523628927048575665e-4,-0.98374475304879564677e-4,
         0.15808870322491248884e-3,-0.21026444172410488319e-3,0.21743961811521264320e-3,-0.16431810653676389022e-3,
         0.84418223983852743293e-4,-0.26190838401581408670e-4,0.36899182659531622704e-5]
  // Spouge approximation (suitable for large arguments)
  lnΓ=z=>{
    if(z<0)return NaN
    var x=p_ln[0];for(var i=p_ln.length-1;i>0;i--)x+=p_ln[i]/(z+i)
    var t=z+g_ln+.5
    return.5*Math.log(2*Math.PI)+(z+.5)*Math.log(t)-t+Math.log(x)-Math.log(z)
  }
  Γ=z=>{
    if(z<.5)return Math.PI/(Math.sin(Math.PI*z)*Γ(1-z))
    if(z>100)return Math.exp(lnΓ(z))
    z--;var x=p[0];for(var i=1;i<g+2;i++)x+=p[i]/(z+i)
    var t=z+g+.5
    return Math.sqrt(2*Math.PI)*Math.pow(t,z+.5)*Math.exp(-t)*x
  }
})()

// ⍎'+/ 2 2 ⍴ 1 2 3 4'  ←→ 3 7
// ⍴⍎'123 456'          ←→ ,2
// ⍎'{⍵*2} ⍳5'          ←→ 0 1 4 9 16
// ⍎'undefinedVariable' !!!
// ⍎'1 2 (3'            !!!
// ⍎123                 !!!
voc['⍎']=(om,al)=>al?nyiErr():exec(toSimpleString(om))

voc['⍷']=(om,al)=>{
  al||nyiErr()
  // 'AN'⍷'BANANA'                        ←→ 0 1 0 1 0 0
  // 'BIRDS' 'NEST'⍷'BIRDS' 'NEST' 'SOUP' ←→ 1 0 0
  // 'ME'⍷'HOME AGAIN'                    ←→ 0 0 1 0 0 0 0 0 0 0
  // 'DAY'⍷7 9⍴'SUNDAY   MONDAY   TUESDAY  WEDNESDAYTHURSDAY FRIDAY   SATURDAY ' ←→ 7 9⍴0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0
  // (2 2⍴'ABCD')⍷'ABCD' ←→ 4 ⍴ 0
  // (1 2)(3 4)⍷'START'(1 2 3)(1 2)(3 4) ←→ 0 0 1 0
  // (2 2⍴7 8 12 13)⍷1+4 5⍴⍳20 ←→ 4 5⍴0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0
  // 1⍷⍳5                ←→ 0 1 0 0 0
  // 1 2⍷⍳5              ←→ 0 1 0 0 0
  // ⍬⍷⍳5                ←→ 1 1 1 1 1
  // ⍬⍷⍬                 ←→ ⍬
  // 1⍷⍬                 ←→ ⍬
  // 1 2 3⍷⍬             ←→ ⍬
  // (2 3 0⍴0)⍷(3 4 5⍴0) ←→ 3 4 5⍴1
  // (2 3 4⍴0)⍷(3 4 0⍴0) ←→ 3 4 0⍴0
  // (2 3 0⍴0)⍷(3 4 0⍴0) ←→ 3 4 0⍴0
  if(al.shape.length>om.shape.length)return A([0],om.shape,repeat([0],om.shape.length))
  if(al.shape.length<om.shape.length){
    al=A( // prepend ones to the shape of ⍺
      al.data,
      repeat([1],om.shape.length-al.shape.length).concat(al.shape),
      repeat([0],om.shape.length-al.shape.length).concat(al.stride)
    )
  }
  if(empty(al))return A([1],om.shape,repeat([0],om.shape.length))
  var findShape=[]
  for(var i=0;i<om.shape.length;i++){
    var d=om.shape[i]-al.shape[i]+1
    if(d<=0)return A([0],om.shape,repeat([0],om.shape.length))
    findShape.push(d)
  }
  var stride=strideForShape(om.shape),data=repeat([0],prod(om.shape))
  var p=0,q=0,indices=repeat([0],findShape.length)
  while(1){
    data[q]=+match(al,A(om.data,al.shape,om.stride,p))
    var a=findShape.length-1
    while(a>=0&&indices[a]+1===findShape[a]){p-=indices[a]*om.stride[a];q-=indices[a]*stride[a];indices[a--]=0}
    if(a<0)break
    p+=om.stride[a];q+=stride[a];indices[a]++
  }
  return A(data,om.shape)
}

voc['⌊']=withId(Infinity,perv({
  // ⌊123 12.3 ¯12.3 ¯123 ←→ 123 12 ¯13 ¯123
  // ⌊'a' !!! DOMAIN ERROR
  // ⌊12j3 1.2j2.3 1.2j¯2.3 ¯1.2j2.3 ¯1.2j¯2.3 ←→ 12j3 1j2 1j¯3 ¯1j2 ¯1j¯3
  // ⌊0 5 ¯5 (○1) ¯1.5 ←→ 0 5 ¯5 3 ¯2
  monad:Z.floor,
  // 3⌊5 ←→ 3
  // ⌊/⍬ ←→ ¯
  dyad:real((y,x)=>Math.min(y,x))
}))

voc['⌈']=withId(-Infinity,perv({
  // ⌈123 12.3 ¯12.3 ¯123 ←→ 123 13 ¯12 ¯123
  // ⌈'a'   !!! DOMAIN ERROR
  // ⌈12j3 1.2j2.3 1.2j¯2.3 ¯1.2j2.3 ¯1.2j¯2.3 ←→ 12j3 1j3 1j¯2 ¯1j3 ¯1j¯2
  // ⌈0 5 ¯5(○1)¯1.5 ←→ 0 5 ¯5 4 ¯1
  monad:Z.ceil,
  // 3⌈5 ←→ 5
  // ⌈/⍬ ←→ ¯¯
  dyad:real((y,x)=>Math.max(y,x))
}))

// Fork: `(fgh)⍵ ← → (f⍵)g(h⍵)` ; `⍺(fgh)⍵ ← → (⍺f⍵)g(⍺h⍵)`
// (+/÷⍴)4 5 10 7 ←→ ,6.5
// a←1 ⋄ b←¯22 ⋄ c←85 ⋄ √←{⍵*.5} ⋄ ((-b)(+,-)√(b*2)-4×a×c)÷2×a ←→ 17 5
// (+,-,×,÷)2  ←→ 2 ¯2 1 .5
// 1(+,-,×,÷)2 ←→ 3 ¯1 2 .5
voc._fork1=(h,g)=>{asrt(typeof h==='function');asrt(typeof g==='function');return[h,g]}
voc._fork2=(hg,f)=>{var h=hg[0],g=hg[1];asrt(typeof h==='function');return(b,a)=>g(h(b,a),f(b,a))}

// ⍕123            ←→ 1 3⍴'123'
// ⍕123 456        ←→ 1 7⍴'123 456'
// ⍕123 'a'        ←→ 1 5⍴'123 a'
// ⍕12 'ab'        ←→ 1 7⍴'12  ab '
// ⍕1 2⍴'a'        ←→ 1 2⍴'a'
// ⍕2 2⍴'a'        ←→ 2 2⍴'a'
// ⍕2 2⍴5          ←→ 2 3⍴'5 5','5 5'
// ⍕2 2⍴0 0 0 'a'  ←→ 2 3⍴'0 0','0 a'
// ⍕2 2⍴0 0 0 'ab' ←→ 2 6⍴'0   0 ','0  ab '
// ⍕2 2⍴0 0 0 123  ←→ 2 5⍴('0   0','0 123')
// ⍕4 3 ⍴ '---' '---' '---' 1 2 3 4 5 6 100 200 300 ←→ 4 17⍴(' ---   ---   --- ','   1     2     3 ','   4     5     6 ',' 100   200   300 ')
// ⍕1 ⍬ 2 '' 3     ←→ 1 11⍴'1    2    3'
// ⍕∞              ←→ 1 1⍴'∞'
// ⍕¯∞             ←→ 1 2⍴'¯∞'
// ⍕¯1             ←→ 1 2⍴'¯1'
// ⍕¯1e¯100J¯2e¯99 ←→ 1 14⍴'¯1e¯100J¯2e¯99'
voc['⍕']=(om,al)=>{al&&nyiErr();var t=format(om);return A(t.join(''),[t.length,t[0].length])}

const format=a=>{ // as array of strings
  var t=typeof a
  if(a===null)return['null']
  if(t==='undefined')return['undefined']
  if(t==='string')return[a]
  if(t==='number'){var r=[fmtNum(a)];r.align='right';return r}
  if(t==='function')return['#procedure']
  if(!(a.isA))return[''+a]
  if(empty(a))return['']

  var sa=a.shape
  a=toArray(a)
  if(!sa.length)return format(a[0])
  var nRows=prod(sa.slice(0,-1))
  var nCols=sa[sa.length-1]
  var rows=[];for(var i=0;i<nRows;i++)rows.push({height:0,bottomMargin:0})
  var cols=[];for(var i=0;i<nCols;i++)cols.push({type:0,width:0,leftMargin:0,rightMargin:0}) // type:0=characters,1=numbers,2=subarrays

  var grid=[]
  for(var i=0;i<nRows;i++){
    var r=rows[i],gridRow=[];grid.push(gridRow)
    for(var j=0;j<nCols;j++){
      var c=cols[j],x=a[nCols*i+j],box=format(x)
      r.height=Math.max(r.height,box.length)
      c.width=Math.max(c.width,box[0].length)
      c.type=Math.max(c.type,typeof x==='string'&&x.length===1?0:x.isA?2:1)
      gridRow.push(box)
    }
  }

  var step=1;for(var d=sa.length-2;d>0;d--){step*=sa[d];for(var i=step-1;i<nRows-1;i+=step)rows[i].bottomMargin++}

  for(var j=0;j<nCols;j++){
    var c=cols[j]
    if(j<nCols-1&&(c.type!==cols[j+1].type||c.type))c.rightMargin++
    if(c.type===2){c.leftMargin++;c.rightMargin++}
  }

  var result=[]
  for(var i=0;i<nRows;i++){
    var r=rows[i]
    for(var j=0;j<nCols;j++){
      var c=cols[j]
      var t=grid[i][j]
      var left =' '.repeat(c.leftMargin +(t.align==='right')*(c.width-t[0].length))
      var right=' '.repeat(c.rightMargin+(t.align!=='right')*(c.width-t[0].length))
      for(var k=0;k<t.length;k++)t[k]=left+t[k]+right
      var bottom=' '.repeat(t[0].length)
      for(var h=r.height+r.bottomMargin-t.length;h>0;h--)t.push(bottom)
    }
    var nk=r.height+r.bottomMargin
    for(var k=0;k<nk;k++){
      var s='';for(var j=0;j<nCols;j++)s+=grid[i][j][k]
      result.push(s)
    }
  }
  return result
}

// ⍋13 8 122 4                  ←→ 3 1 0 2
// a←13 8 122 4 ⋄ a[⍋a]         ←→ 4 8 13 122
// ⍋'ZAMBIA'                    ←→ 1 5 3 4 2 0
// s←'ZAMBIA' ⋄ s[⍋s]           ←→ 'AABIMZ'
// t←3 3⍴'BOBALFZAK' ⋄ ⍋t       ←→ 1 0 2
// t←3 3⍴4 5 6 1 1 3 1 1 2 ⋄ ⍋t ←→ 2 1 0
// t←3 3⍴4 5 6 1 1 3 1 1 2 ⋄ t[⍋t;] ←→ 3 3⍴ 1 1 2 1 1 3 4 5 6
// a←3 2 3⍴2 3 4 0 1 0 1 1 3 4 5 6 1 1 2 10 11 12 ⋄ a[⍋a;;] ←→ 3 2 3⍴1 1 2 10 11 12 1 1 3 4 5 6 2 3 4 0 1 0
// a←3 2 5⍴'joe  doe  bob  jonesbob  zwart'  ⋄  a[⍋a;;] ←→ 3 2 5 ⍴ 'bob  jonesbob  zwartjoe  doe  '
// 'ZYXWVUTSRQPONMLKJIHGFEDCBA'⍋'ZAMBIA' ←→ 0 2 4 3 1 5
// ⎕A←'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ⋄ (⌽⎕A)⍋3 3⍴'BOBALFZAK' ←→ 2 0 1
// a←6 4⍴'ABLEaBLEACREABELaBELACES' ⋄ a[(2 26⍴'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')⍋a;] ←→ 6 4⍴'ABELaBELABLEaBLEACESACRE'
// a←6 4⍴'ABLEaBLEACREABELaBELACES' ⋄ a[('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')⍋a;] ←→ 6 4⍴'ABELABLEACESACREaBELaBLE'
// ⍋0 1 2 3 4 3 6 6 4 9 1 11 12 13 14 15 ←→ 0 1 10 2 3 5 4 8 6 7 9 11 12 13 14 15
voc['⍋']=(om,al)=>grade(om,al,1),
// ⍒3 1 8 ←→ 2 0 1
voc['⍒']=(om,al)=>grade(om,al,-1)
const grade=(om,al,dir)=>{
  var h={} // maps a character to its index in the collation
  if(al){
    al.shape.length||rnkErr()
    each(al,(x,indices)=>{typeof x==='string'||domErr();h[x]=indices[indices.length-1]})
  }
  om.shape.length||rnkErr()
  var r=[];for(var i=0;i<om.shape[0];i++)r.push(i)
  return A(r.sort((i,j)=>{
    var p=0,indices=repeat([0],om.shape.length)
    while(1){
      var x=om.data[p+i*om.stride[0]],tx=typeof x
      var y=om.data[p+j*om.stride[0]],ty=typeof y
      if(tx<ty)return-dir
      if(tx>ty)return dir
      if(h[x]!=null)x=h[x]
      if(h[y]!=null)y=h[y]
      if(x<y)return-dir
      if(x>y)return dir
      var a=indices.length-1
      while(a>0&&indices[a]+1===om.shape[a]){p-=om.stride[a]*indices[a];indices[a--]=0}
      if(a<=0)break
      p+=om.stride[a];indices[a]++
    }
    return(i>j)-(i<j)
  }))
}

// f←{⍺+2×⍵} ⋄ f/⍬           !!! DOMAIN ERROR
// f←{⍺+2×⍵} ⋄ (f⍁123)/⍬     ←→ 123
// f←{⍺+2×⍵} ⋄ (456⍁f)/⍬     ←→ 456
// f←{⍺+2×⍵} ⋄ g←f⍁789 ⋄ f/⍬ !!! DOMAIN ERROR
// {}⍁1 2                    !!! RANK ERROR
// ({}⍁(1 1 1⍴123))/⍬        ←→ 123
voc['⍁']=conj((f,x)=>{
  if(f.isA){var h=f;f=x;x=h}
  asrt(typeof f==='function')
  asrt(x.isA)
  isSingleton(x)||rnkErr()
  if(x.shape.length)x=A.scalar(unwrap(x))
  return withId(x,(om,al,axis)=>f(om,al,axis))
})

voc['⍳']=(om,al)=>{
  if(al){
    // 2 5 9 14 20⍳9                           ←→ 2
    // 2 5 9 14 20⍳6                           ←→ 5
    // 'GORSUCH'⍳'S'                           ←→ 3
    // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'⍳'CARP'     ←→ 2 0 17 15
    // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'⍳'PORK PIE' ←→ 15 14 17 10 26 15 8 4
    // 'MON' 'TUES' 'WED'⍳'MON' 'THURS'        ←→ 0 3
    // 1 3 2 0 3⍳⍳5                            ←→ 3 0 2 1 5
    // 'CAT' 'DOG' 'MOUSE'⍳'DOG' 'BIRD'        ←→ 1 3
    // 123⍳123                                 !!! RANK ERROR
    // (2 2⍴123)⍳123                           !!! RANK ERROR
    // 123 123⍳123                             ←→ 0
    // ⍬⍳123 234                               ←→ 0 0
    // 123 234⍳⍬                               ←→ ⍬
    al.shape.length===1||rnkErr()
    return map(om,x=>{
      var rank=al.shape
      try{each(al,(y,indices)=>{if(match(x,y)){rank=indices;throw'break'}})}
      catch(e){if(e!=='break')throw e}
      return rank.length===1?rank[0]:A(rank)
    })
  }else{
    // ⍳5     ←→ 0 1 2 3 4
    // ⍴⍳5    ←→ 1 ⍴ 5
    // ⍳0     ←→ ⍬
    // ⍴⍳0    ←→ ,0
    // ⍳2 3 4 ←→ 2 3 4⍴(0 0 0)(0 0 1)(0 0 2)(0 0 3)(0 1 0)(0 1 1)(0 1 2)(0 1 3)(0 2 0)(0 2 1)(0 2 2)(0 2 3)(1 0 0)(1 0 1)(1 0 2)(1 0 3)(1 1 0)(1 1 1)(1 1 2)(1 1 3)(1 2 0)(1 2 1)(1 2 2)(1 2 3)
    // ⍴⍳2 3 4 ←→ 2 3 4
    // ⍳¯1 !!! DOMAIN ERROR
    om.shape.length<=1||rnkErr()
    var a=toArray(om);for(var i=0;i<a.length;i++)isInt(a[i],0)||domErr()
    var n=prod(a),m=a.length,data,r=new Float64Array(n*m),p=1,q=n
    for(var i=0;i<m;i++){
      var ai=a[i],u=i-m;q/=a[i];for(var j=0;j<p;j++)for(var k=0;k<ai;k++)for(var l=0;l<q;l++)r[u+=m]=k
      p*=ai
    }
    if(m===1){data=r}else{data=Array(n);for(var i=0;i<n;i++)data[i]=A(r.slice(m*i,m*i+m))}
    return A(data,a)
  }
}

// ⍴⊂2 3⍴⍳6      ←→ ⍬
// ⍴⍴⊂2 3⍴⍳6     ←→ ,0
// ⊂[0]2 3⍴⍳6    ←→ (0 3)(1 4)(2 5)
// ⍴⊂[0]2 3⍴⍳6   ←→ ,3
// ⊂[1]2 3⍴⍳6    ←→ (0 1 2)(3 4 5)
// ⍴⊂[1]2 3⍴⍳6   ←→ ,2
// ⊃⊂[1 0]2 3⍴⍳6 ←→ 3 2⍴0 3 1 4 2 5
// ⍴⊂[1 0]2 3⍴⍳6 ←→ ⍬
// ⍴⊃⊂⊂1 2 3     ←→ ⍬
voc['⊂']=(om,al,axes)=>{
  asrt(!al)
  if(isSimple(om))return om
  if(axes==null){axes=[];for(var i=0;i<om.shape.length;i++)axes.push(i)}else{axes=getAxisList(axes,om.shape.length)}
  var rAxes=[],axisMask=new Uint8Array(om.shape.length)
  for(var k=0;k<om.shape.length;k++){if(axes.indexOf(k)<0){rAxes.push(k)}else{axisMask[k]=1}}
  var rs=rAxes.map(k=>om.shape[k]), rd=strideForShape(rs)
  var us=axes .map(k=>om.shape[k]), ud=strideForShape(us), un=prod(us)
  var allAxes=rAxes.concat(axes)
  var a=Array(prod(rs))
  for(var i=0;i<a.length;i++){a[i]=typeof om.data==='string'||om.data instanceof Array?Array(un):new Float64Array(un)}
  const f=(k,l,p,q,t)=>{
    if(k+l>=om.shape.length){a[p][q]=om.data[t]}
    else if(axisMask[k+l]){for(var i=0;i<us[l];i++)f(k,l+1,p,q+i*ud[l],t+i*om.stride[axes[l]])}
    else                  {for(var i=0;i<rs[k];i++)f(k+1,l,p+i*rd[k],q,t+i*om.stride[rAxes[k]])}
  }
  f(0,0,0,0,0)
  for(var i=0;i<a.length;i++)a[i]=A(a[i],us)
  return A(a,rs)
}

// ~0 1 ←→ 1 0
// ~2   !!! DOMAIN ERROR
voc['~']=perv({monad:x=>+!bool(x)})

// 1∨1               ←→ 1
// 1∨0               ←→ 1
// 0∨1               ←→ 1
// 0∨0               ←→ 0
// 0 0 1 1 ∨ 0 1 0 1 ←→ 0 1 1 1
// 12∨18             ←→ 6 ⍝ 12=2×2×3, 18=2×3×3
// 299∨323           ←→ 1 ⍝ 299=13×23, 323=17×19
// 12345∨12345       ←→ 12345
// 0∨123             ←→ 123
// 123∨0             ←→ 123
// ∨/⍬               ←→ 0
// ¯12∨18            ←→ 6
// 12∨¯18            ←→ 6
// ¯12∨¯18           ←→ 6
// 1.5∨2.5           !!! DOMAIN ERROR
// 'a'∨1             !!! DOMAIN ERROR
// 1∨'a'             !!! DOMAIN ERROR
// 'a'∨'b'           !!! DOMAIN ERROR
// 135j¯14∨155j34    ←→ 5j12
// 2 3 4∨0j1 1j2 2j3 ←→ 1 1 1
// 2j2 2j4∨5j5 4j4   ←→ 1j1 2
voc['∨']=withId(0,perv({dyad:(y,x)=>Z.isint(x)&&Z.isint(y)?Z.gcd(x,y):domErr()}))

// 0 0 1 1∧0 1 0 1                ←→ 0 0 0 1
// t←3 3⍴1 1 1 0 0 0 1 0 1 ⋄ 1∧t  ←→ 3 3 ⍴ 1 1 1 0 0 0 1 0 1
// t←3 3⍴1 1 1 0 0 0 1 0 1 ⋄ ∧/t  ←→ 1 0 0
// 12∧18                          ←→ 36
// 299∧323                        ←→ 96577
// 12345∧12345                    ←→ 12345
// 0∧123                          ←→ 0
// 123∧0                          ←→ 0
// ∧/⍬                            ←→ 1
// ¯12∧18                         ←→ ¯36
// 12∧¯18                         ←→ ¯36
// ¯12∧¯18                        ←→ 36
// 1.5∧2.5                        !!! DOMAIN ERROR
// 'a'∧1                          !!! DOMAIN ERROR
// 1∧'a'                          !!! DOMAIN ERROR
// 'a'∧'b'                        !!! DOMAIN ERROR
// 135j¯14∧155j34                 ←→ 805j¯1448
// 2 3 4∧0j1 1j2 2j3              ←→ 0j2 3j6 8j12
// 2j2 2j4∧5j5 4j4                ←→ 10j10 ¯4j12
voc['∧']=withId(1,perv({dyad:(y,x)=>Z.isint(x)&&Z.isint(y)?Z.lcm(x,y):domErr()}))

// 0 0 1 1⍱0 1 0 1 ←→ 1 0 0 0
// 0⍱2 !!! DOMAIN ERROR
voc['⍱']=perv({dyad:real((y,x)=>+!(bool(x)|bool(y)))}),

// 0 0 1 1⍲0 1 0 1 ←→ 1 1 1 0
// 0⍲2 !!! DOMAIN ERROR
voc['⍲']=perv({dyad:real((y,x)=>+!(bool(x)&bool(y)))})

// ({⍵+1}⍣5)3 ←→ 8
// ({⍵+1}⍣0)3 ←→ 3
// (⍴⍣3)2 2⍴⍳4 ←→ ,1
// 'a'(,⍣3)'b' ←→ 'aaab'
// 1{⍺+÷⍵}⍣=1 ←→ 1.618033988749895
// c←0 ⋄ 5⍣{c←c+1}0 ⋄ c ←→ 5
voc['⍣']=conj((g,f)=>{
  if(f.isA&&typeof g==='function'){var h=f;f=g;g=h}else{asrt(typeof f==='function')}
  if(typeof g==='function'){
    return(om,al)=>{
      while(1){
        var om1=f(om,al)
        if(toInt(g(om,om1),0,2))return om
        om=om1
      }
    }
  }else{
    var n=toInt(g,0)
    return(om,al)=>{
      for(var i=0;i<n;i++)om=f(om,al)
      return om
    }
  }
})
voc['get_⎕']=cps((_,_1,_2,callback)=>{
  if(typeof window!=='undefined'&&typeof window.prompt==='function'){
    setTimeout(_=>{callback(exec(prompt('⎕:')||''))},0)
  }else{
    process.stdout.write('⎕:\n')
    readline('      ',line=>{callback(exec(toSimpleString(A(line))))})
  }
})
voc['set_⎕']=x=>{
  var s=format(x).join('\n')+'\n'
  if(typeof window!=='undefined'&&typeof window.alert==='function'){window.alert(s)}else{process.stdout.write(s)}
  return x
}
voc['get_⍞']=cps((_,_1,_2,callback)=>{
  if(typeof window!=='undefined'&&typeof window.prompt==='function'){
    setTimeout(_=>{callback(A(prompt('')||''))},0)
  }else{
    readline('',line=>{callback(A(line))})
  }
})
voc['set_⍞']=x=>{
  var s=format(x).join('\n')
  if(typeof window!=='undefined'&&typeof window.alert==='function'){window.alert(s)}else{process.stdout.write(s)}
  return x
}

// ⎕IO   ←→ 0
// ⎕IO←0 ←→ 0
// ⎕IO←1 !!!
voc['get_⎕IO']=_=>A.zero
voc['set_⎕IO']=x=>{if(match(x,A.zero)){return x}else{domErr()}}

voc['⎕DL']=cps((om,al,_,callback)=>{var t0=+new Date;setTimeout(_=>{callback(A([new Date-t0]))},unwrap(om))})

// 'b(c+)d'⎕RE'abcd' ←→ 1 'bcd' (,'c')
// 'B(c+)d'⎕RE'abcd' ←→ ⍬
// 'a(b'   ⎕RE'c'           !!! DOMAIN ERROR
voc['⎕RE']=(om,al)=>{
  var x=toSimpleString(al),y=toSimpleString(om)
  try{var re=RegExp(x)}catch(e){domErr(e.toString())}
  var m=re.exec(y)
  if(!m)return A.zilde
  var r=[m.index];for(var i=0;i<m.length;i++)r.push(A(m[i]||''))
  return A(r)
}

// ⎕UCS'a' ←→ 97
// ⎕UCS'ab' ←→ 97 98
// ⎕UCS 2 2⍴97+⍳4 ←→ 2 2⍴'abcd'
voc['⎕UCS']=(om,al)=>{
  al&&nyiErr()
  return map(om,x=>isInt(x,0,0x10000)?String.fromCharCode(x):typeof x==='string'?x.charCodeAt(0):domErr())
}

voc['get_⎕OFF']=_=>{typeof process==='undefined'&&nyiErr();process.exit(0)}

voc['?']=(om,al)=>al?deal(om,al):roll(om)

// n←6 ⋄ r←?n ⋄ (0≤r)∧(r<n) ←→ 1
// ?0   !!! DOMAIN ERROR
// ?1   ←→ 0
// ?1.5 !!! DOMAIN ERROR
// ?'a' !!! DOMAIN ERROR
// ?1j2 !!! DOMAIN ERROR
// ?∞   !!! DOMAIN ERROR
var roll=perv({monad:om=>{isInt(om,1)||domErr();return Math.floor(Math.random()*om)}})

// n←100 ⋄ (+/n?n)=(+/⍳n) ←→ 1 # a permutation (an 'n?n' dealing) contains all 0...n
// n←100 ⋄ A←(n÷2)?n ⋄ ∧/(0≤A),A<n ←→ 1 # any number x in a dealing is 0 <= x < n
// 0?100 ←→ ⍬
// 0?0   ←→ ⍬
// 1?1   ←→ ,0
// 1?1 1 !!! LENGTH ERROR
// 5?3   !!! DOMAIN ERROR
// ¯1?3  !!! DOMAIN ERROR
const deal=(om,al)=>{
  al=unwrap(al);om=unwrap(om)
  isInt(om,0)&&isInt(al,0,om+1)||domErr()
  var r=Array(om);for(var i=0;i<om;i++)r[i]=i
  for(var i=0;i<al;i++){var j=i+Math.floor(Math.random()*(om-i));const h=r[i];r[i]=r[j];r[j]=h}
  return A(r.slice(0,al))
}

// ↗'CUSTOM ERROR' !!! CUSTOM ERROR
voc['↗']=om=>err(toSimpleString(om))

voc['⍴']=(om,al)=>{
  if(al){
    // 2 5⍴¨⊂1 2 3 ←→ (1 2)(1 2 3 1 2)
    // ⍴1 2 3⍴0  ←→ 1 2 3
    // ⍴⍴1 2 3⍴0 ←→ ,3
    // 2 3⍴⍳5    ←→ 2 3⍴0 1 2 3 4 0
    // ⍬⍴123     ←→ 123
    // ⍬⍴⍬       ←→ 0
    // 2 3⍴⍬     ←→ 2 3⍴0
    // 2 3⍴⍳7    ←→ 2 3⍴0 1 2 3 4 5
    al.shape.length<=1||rnkErr()
    var a=toArray(al),n=prod(a)
    for(var i=0;i<a.length;i++)isInt(a[i],0)||domErr
    var data=[]
    try{
      each(om,x=>{
        if(data.length>=n)throw'break'
        data.push(x)
      })
    }catch(e){
      if(e!=='break')throw e
    }
    if(data.length){
      while(2*data.length<n)data=data.concat(data)
      if(data.length!==n)data=data.concat(data.slice(0,n-data.length))
    }else{
      data=repeat([getPrototype(om)],n)
    }
    return A(data,a)
  }else{
    // ⍴0       ←→ 0⍴0
    // ⍴0 0     ←→ 1⍴2
    // ⍴⍴0      ←→ 1⍴0
    // ⍴⍴⍴0     ←→ 1⍴1
    // ⍴⍴⍴0 0   ←→ 1⍴1
    // ⍴'a'     ←→ 0⍴0
    // ⍴'ab'    ←→ 1⍴2
    // ⍴2 3 4⍴0 ←→ 2 3 4
    return A(om.shape)
  }
}

voc['⌽']=(om,al,axis)=>{
  asrt(typeof axis==='undefined'||axis.isA)
  if(al){
    // 1⌽1 2 3 4 5 6             ←→ 2 3 4 5 6 1
    // 3⌽'ABCDEFGH'              ←→ 'DEFGHABC'
    // 3⌽2 5⍴1 2 3 4 5 6 7 8 9 0 ←→ 2 5⍴4 5 1 2 3 9 0 6 7 8
    // ¯2⌽'ABCDEFGH'             ←→ 'GHABCDEF'
    // 1⌽3 3⍴⍳9                  ←→ 3 3⍴1 2 0 4 5 3 7 8 6
    // 0⌽1 2 3 4                 ←→ 1 2 3 4
    // 0⌽1234                    ←→ 1234
    // 5⌽⍬                       ←→ ⍬
    axis=axis?unwrap(axis):om.shape.length-1
    isInt(axis)||domErr()
    if(om.shape.length&&!(0<=axis&&axis<om.shape.length))idxErr()
    var step=unwrap(al)
    isInt(step)||domErr()
    if(!step)return om
    var n=om.shape[axis]
    step=(n+step%n)%n // force % to handle negatives properly
    if(empty(om)||!step)return om
    var data=[],shape=om.shape,stride=om.stride,p=0,indices=repeat([0],shape.length)
    while(1){
      data.push(om.data[p+((indices[axis]+step)%shape[axis]-indices[axis])*stride[axis]])
      var a=shape.length-1
      while(a>=0&&indices[a]+1===shape[a]){p-=indices[a]*stride[a];indices[a--]=0}
      if(a<0)break
      indices[a]++;p+=stride[a]
    }
    return A(data,shape)
  }else{
    // ⌽1 2 3 4 5 6                 ←→ 6 5 4 3 2 1
    // ⌽(1 2)(3 4)(5 6)             ←→ (5 6)(3 4)(1 2)
    // ⌽'BOB WON POTS'              ←→ 'STOP NOW BOB'
    // ⌽    2 5⍴1 2 3 4 5 6 7 8 9 0 ←→ 2 5⍴5 4 3 2 1 0 9 8 7 6
    // ⌽[0] 2 5⍴1 2 3 4 5 6 7 8 9 0 ←→ 2 5⍴6 7 8 9 0 1 2 3 4 5
    if(axis){
      isSingleton(axis)||lenErr()
      axis=unwrap(axis)
      isInt(axis)||domErr()
      0<=axis&&axis<om.shape.length||idxErr()
    }else{
      axis=[om.shape.length-1]
    }
    if(!om.shape.length)return om
    var stride=om.stride.slice(0);stride[axis]=-stride[axis]
    return A(om.data,om.shape,stride,(om.shape[axis]-1)*om.stride[axis])
  }
}

// ⊖1 2 3 4 5 6                 ←→ 6 5 4 3 2 1
// ⊖(1 2) (3 4) (5 6)           ←→ (5 6)(3 4)(1 2)
// ⊖'BOB WON POTS'              ←→ 'STOP NOW BOB'
// ⊖    2 5⍴1 2 3 4 5 6 7 8 9 0 ←→ 2 5⍴6 7 8 9 0 1 2 3 4 5
// ⊖[1] 2 5⍴1 2 3 4 5 6 7 8 9 0 ←→ 2 5⍴5 4 3 2 1 0 9 8 7 6
// 1⊖3 3⍴⍳9 ←→ 3 3⍴3 4 5 6 7 8 0 1 2
voc['⊖']=(om,al,axis)=>voc['⌽'](om,al,axis||A.zero)

voc['⌿']=adv((om,al,axis)=>voc['/'](om,al,axis||A.zero)),
voc['/']=adv((om,al,axis)=>{
  if(typeof om==='function'){
    // +/3                    ←→ 3
    // +/3 5 8                ←→ 16
    // ⌈/82 66 93 13          ←→ 93
    // ×/2 3⍴1 2 3 4 5 6      ←→ 6 120
    // 2,/'ab' 'cd' 'ef' 'hi' ←→ 'abcd' 'cdef' 'efhi'
    // 3,/'ab' 'cd' 'ef' 'hi' ←→ 'abcdef' 'cdefhi'
    // -/3 0⍴42               ←→ 3⍴0
    // 2+/1+⍳10    ←→ 3 5 7 9 11 13 15 17 19
    // 5+/1+⍳10    ←→ 15 20 25 30 35 40
    // 10+/1+⍳10   ←→ ,55
    // 11+/1+⍳10   ←→ ⍬
    // 12+/1+⍳10   !!! LENGTH ERROR
    // 2-/3 4 9 7  ←→ ¯1 ¯5 2
    // ¯2-/3 4 9 7 ←→ 1 5 ¯2
    var f=om,g=al,axis0=axis
    asrt(typeof f==='function')
    asrt(typeof g==='undefined')
    asrt(typeof axis0==='undefined'||axis0.isA)
    return(om,al)=>{
      if(!om.shape.length)om=A([unwrap(om)])
      axis=axis0?toInt(axis0):om.shape.length-1
      0<=axis&&axis<om.shape.length||rnkErr()
      var n,isNWise,isBackwards
      if(al){isNWise=1;n=toInt(al);if(n<0){isBackwards=1;n=-n}}else{n=om.shape[axis]}

      var shape=om.shape.slice(0);shape[axis]=om.shape[axis]-n+1
      var rShape=shape
      if(isNWise){
        if(!shape[axis])return A([],rShape)
        shape[axis]>=0||lenErr()
      }else{
        rShape=rShape.slice(0);rShape.splice(axis,1)
      }

      if(empty(om)){
        var z=f.identity;z!=null||domErr();asrt(!z.shape.length)
        return A(z.data,rShape,repeat([0],rShape.length))
      }

      var data=[],indices=repeat([0],shape.length),p=0
      while(1){
        if(isBackwards){
          var x=om.data[p];x.isA||(x=A.scalar(x))
          for(var i=1;i<n;i++){
            var y=om.data[p+i*om.stride[axis]];y.isA||(y=A.scalar(y))
            x=f(x,y)
          }
        }else{
          var x=om.data[p+(n-1)*om.stride[axis]];x.isA||(x=A.scalar(x))
          for(var i=n-2;i>=0;i--){
            var y=om.data[p+i*om.stride[axis]];y.isA||(y=A.scalar(y))
            x=f(x,y)
          }
        }
        x.shape.length||(x=unwrap(x))
        data.push(x)
        var a=indices.length-1
        while(a>=0&&indices[a]+1===shape[a]){p-=indices[a]*om.stride[a];indices[a--]=0}
        if(a<0)break
        p+=om.stride[a];indices[a]++
      }
      return A(data,rShape)
    }
  }else{
    // 0 1 0 1/'abcd'                   ←→ 'bd'
    // 1 1 1 1 0/12 14 16 18 20         ←→ 12 14 16 18
    // m←45 60 33 50 66 19 ⋄ (m≥50)/m   ←→ 60 50 66
    // m←45 60 33 50 66 19 ⋄ (m=50)/⍳≢m ←→ ,3
    // 1/'ab'                           ←→ 'ab'
    // 0/'ab'                           ←→ ⍬
    // 0 1 0/ 1+2 3⍴⍳6                  ←→ 2 1⍴2 5
    // 1 0/[0]1+2 3⍴⍳6                  ←→ 1 3⍴1 2 3
    // 1 0⌿   1+2 3⍴⍳6                  ←→ 1 3⍴1 2 3
    // 3/5                              ←→ 5 5 5
    // 2 ¯2 2/1+2 3⍴⍳6           ←→ 2 6⍴  1 1 0 0 3 3  4 4 0 0 6 6
    // 1 1 ¯2 1 1/1 2(2 2⍴⍳4)3 4 ←→ 1 2 0 0 3 4
    // 2 3 2/'abc'               ←→ 'aabbbcc'
    // 2/'def'                   ←→ 'ddeeff'
    // 5 0 5/1 2 3               ←→ 1 1 1 1 1 3 3 3 3 3
    // 2/1+2 3⍴⍳6                ←→ 2 6⍴ 1 1 2 2 3 3  4 4 5 5 6 6
    // 2⌿1+2 3⍴⍳6                ←→ 4 3⍴ 1 2 3  1 2 3  4 5 6  4 5 6
    // 2 3/3 1⍴'abc'             ←→ 3 5⍴'aaaaabbbbbccccc'
    // 2 ¯1 2/[1]3 1⍴7 8 9       ←→ 3 5⍴7 7 0 7 7 8 8 0 8 8 9 9 0 9 9
    // 2 ¯1 2/[1]3 1⍴'abc'       ←→ 3 5⍴'aa aabb bbcc cc'
    // 2 ¯2 2/7                  ←→ 7 7 0 0 7 7
    om.shape.length||(om=A([unwrap(om)]))
    axis=axis?toInt(axis,0,om.shape.length):om.shape.length-1
    al.shape.length<=1||rnkErr()
    var a=toArray(al),n=om.shape[axis]
    if(a.length===1)a=repeat(a,n)
    if(n!==1&&n!==a.length)lenErr()

    var shape=om.shape.slice(0);shape[axis]=0
    var b=[]
    for(var i=0;i<a.length;i++){
      var x=a[i]
      isInt(x)||domErr()
      shape[axis]+=Math.abs(x)
      var nj=Math.abs(x);for(var j=0;j<nj;j++)b.push(x>0?i:null)
    }
    if(n===1)for(var i=0;i<b.length;i++)b[i]=b[i]==null?b[i]:0

    var data=[]
    if(shape[axis]&&!empty(om)){
      var filler=getPrototype(om),p=0,indices=repeat([0],shape.length)
      while(1){
        data.push(b[indices[axis]]==null?filler:om.data[p+b[indices[axis]]*om.stride[axis]])
        var i=shape.length-1
        while(i>=0&&indices[i]+1===shape[i]){
          if(i!==axis)p-=om.stride[i]*indices[i]
          indices[i--]=0
        }
        if(i<0)break
        if(i!==axis)p+=om.stride[i]
        indices[i]++
      }
    }
    return A(data,shape)
  }
})

// 'a0 a1...⌷b' is equivalent to 'b[a0;a1;...]'
//
// 1⌷3 5 8                ←→ 5
// (3 5 8)[1]             ←→ 5
// (3 5 8)[⍬]             ←→ ⍬
// (2 2 0)(1 2)⌷3 3⍴⍳9    ←→ 3 2⍴7 8 7 8 1 2
// ¯1⌷3 5 8               !!! INDEX ERROR
// 2⌷111 222 333 444      ←→ 333
// (⊂3 2)⌷111 222 333 444 ←→ 444 333
// (⊂2 3⍴2 0 3 0 1 2)⌷111 222 333 444 ←→ 2 3⍴333 111 444 111 222 333
// 1 0   ⌷3 4⍴11 12 13 14 21 22 23 24 31 32 33 34 ←→ 21
// 1     ⌷3 4⍴11 12 13 14 21 22 23 24 31 32 33 34 ←→ 21 22 23 24
// 2(1 0)⌷3 4⍴11 12 13 14 21 22 23 24 31 32 33 34 ←→ 32 31
// (1 2)0⌷3 4⍴11 12 13 14 21 22 23 24 31 32 33 34 ←→ 21 31
// a←2 2⍴0 ⋄ a[;0]←1 ⋄ a ←→ 2 2⍴1 0 1 0
// a←2 3⍴0 ⋄ a[1;0 2]←1 ⋄ a ←→ 2 3⍴0 0 0 1 0 1
voc['⌷']=(om,al,axes)=>{
  if(typeof om==='function')return(x,y)=>om(x,y,al)
  al||nyiErr()
  al.shape.length>1&&rnkErr()
  var a=toArray(al);a.length>om.shape.length&&lenErr()
  if(axes){
    axes=toArray(axes)
    a.length===axes.length||lenErr()
    var h=Array(om.shape.length)
    for(var i=0;i<axes.length;i++){
      var axis=axes[i]
      isInt(axis)||domErr()
      0<=axis&&axis<om.shape.length||rnkErr()
      h[axis]&&rnkErr()
      h[axis]=1
    }
  }else{
    axes=[];for(var i=0;i<a.length;i++)axes.push(i)
  }
  var r=om
  for(var i=a.length-1;i>=0;i--){
    var u=a[i].isA?a[i]:A([a[i]],[])
    r=indexAtSingleAxis(r,u,axes[i])
  }
  return r
}

// (23 54 38)[0]                       ←→ 23
// (23 54 38)[1]                       ←→ 54
// (23 54 38)[2]                       ←→ 38
// (23 54 38)[3]                       !!! INDEX ERROR
// (23 54 38)[¯1]                      !!! INDEX ERROR
// (23 54 38)[0 2]                     ←→ 23 38
// (2 3⍴100 101 102 110 111 112)[1;2]  ←→ 112
// (2 3⍴100 101 102 110 111 112)[1;¯1] !!! INDEX ERROR
// (2 3⍴100 101 102 110 111 112)[10;1] !!! INDEX ERROR
// (2 3⍴100 101 102 110 111 112)[1;]   ←→ 110 111 112
// (2 3⍴100 101 102 110 111 112)[;1]   ←→ 101 111
// 'hello'[1]                          ←→ 'e'
// 'ipodlover'[1 2 5 8 3 7 6 0 4]      ←→ 'poordevil'
// ('axlrose'[4 3 0 2 5 6 1])[0 1 2 3] ←→ 'oral'
// (1 2 3)[⍬]                          ←→ ⍬
// ⍴(1 2 3)[1 2 3 0 5⍴0]               ←→ 1 2 3 0 5
// (⍳3)[]                              ←→ ⍳3
// ⍴(3 3⍴⍳9)[⍬;⍬]                      ←→ 0 0
// ' X'[(3 3⍴⍳9)∊1 3 6 7 8] ←→ 3 3⍴' X ','X  ','XXX'
voc._index=(alphaAndAxes,om)=>{
  var h=toArray(alphaAndAxes),al=h[0],axes=h[1]
  return voc['⌷'](om,al,axes)
}

// a←⍳5 ⋄ a[1 3]←7 8 ⋄ a ←→ 0 7 2 8 4
// a←⍳5 ⋄ a[1 3]←7   ⋄ a ←→ 0 7 2 7 4
// a←⍳5 ⋄ a[1]  ←7 8 ⋄ a !!! RANK ERROR
// a←1 2 3 ⋄ a[1]←4 ⋄ a ←→ 1 4 3
// a←2 2⍴⍳4 ⋄ a[0;0]←4 ⋄ a ←→ 2 2⍴4 1 2 3
// a←5 5⍴0 ⋄ a[1 3;2 4]←2 2⍴1+⍳4 ⋄ a ←→ 5 5⍴0 0 0 0 0 0 0 1 0 2 0 0 0 0 0 0 0 3 0 4 0 0 0 0 0
// a←'this is a test' ⋄ a[0 5]←'TI' ←→ 'This Is a test'
// Data←0 4 8 ⋄ 10+ (Data[0 2]← 7 9) ←→ 17 14 19
// a←3 4⍴⍳12 ⋄ a[;1 2]←99 ←→ 3 4⍴0 99 99 3 4 99 99 7 8 99 99 11
// a←1 2 3 ⋄ a[⍬]←4 ⋄ a ←→ 1 2 3
// a←3 3⍴⍳9 ⋄ a[⍬;1 2]←789 ⋄ a ←→ 3 3⍴⍳9
// a←1 2 3 ⋄ a[]←4 5 6 ⋄ a ←→ 4 5 6
voc._substitute=args=>{
  var h=toArray(args).map(x=>x.isA?x:A([x],[]))
  var value=h[0],al=h[1],om=h[2],axes=h[3]
  al.shape.length>1&&rnkErr()
  var a=toArray(al);a.length>om.shape.length&&lenErr()
  if(axes){
    axes.shape.length>1&&rnkErr()
    axes=toArray(axes)
    a.length===axes.length||lenErr()
  }else{
    axes=[];for(var i=0;i<a.length;i++)a.push(i)
  }
  var subs=voc['⌷'](voc['⍳'](A(om.shape)),al,A(axes))
  if(isSingleton(value))value=A([value],subs.shape,repeat([0],subs.shape.length))
  var data=toArray(om),stride=strideForShape(om.shape)
  subs.shape.length!==value.shape.length&&rnkErr();''+subs.shape!=''+value.shape&&lenErr()
  const ni=prod(subs.shape)
  for(var i=0;i<ni;i++){
    var u=subs.data[i], v=value.data[i]
    if(v.isA&&!v.shape.length)v=unwrap(v)
    if(u.isA){
      var p=0,ua=toArray(u)
      for(var j=0;j<ua.length;j++)p+=ua[j]*stride[j]
      data[p]=v
    }else{
      data[u]=v
    }
  }
  return A(data,om.shape)
}

const indexAtSingleAxis=(om,sub,ax)=>{
  asrt(om.isA&&sub.isA&&isInt(ax)&&0<=ax&&ax<om.shape.length)
  var u=toArray(sub),n=om.shape[ax]
  for(var i=0;i<u.length;i++){isInt(u[i])||domErr();0<=u[i]&&u[i]<n||idxErr()}
  var isUniform=0
  if(u.length>=2){var d=u[1]-u[0];isUniform=1;for(var i=2;i<u.length;i++)if(u[i]-u[i-1]!==d){isUniform=0;break}}
  if(isUniform){
    var shape=om.shape.slice(0);shape.splice.apply(shape,[ax,1].concat(sub.shape))
    var stride=om.stride.slice(0)
    var subStride=strideForShape(sub.shape)
    for(var i=0;i<subStride.length;i++)subStride[i]*=d*om.stride[ax]
    stride.splice.apply(stride,[ax,1].concat(subStride))
    return A(om.data,shape,stride,u[0]*om.stride[ax])
  }else{
    var shape1=om.shape.slice(0);shape1.splice(ax,1)
    var stride1=om.stride.slice(0);stride1.splice(ax,1)
    var data=[]
    each(sub,x=>{
      var chunk=A(om.data,shape1,stride1,x*om.stride[ax])
      data.push.apply(data,toArray(chunk))
    })
    var shape = shape1.slice(0)
    var stride = strideForShape(shape)
    shape.splice.apply(shape,[ax, 0].concat(sub.shape))
    var subStride = strideForShape (sub.shape)
    var k=prod(shape1)
    for(var i=0;i<subStride.length;i++)subStride[i]*=k
    stride.splice.apply(stride,[ax,0].concat(subStride))
    return A(data,shape,stride)
  }
}

voc['↑']=(om,al)=>al?take(om,al):first(om)

// 5↑'ABCDEFGH'     ←→ 'ABCDE'
// ¯3↑'ABCDEFGH'    ←→ 'FGH'
// 3↑22 2 19 12     ←→ 22 2 19
// ¯1↑22 2 19 12    ←→ ,12
// ⍴1↑(2 2⍴⍳4)(⍳10) ←→ ,1
// 2↑1              ←→ 1 0
// 5↑40 92 11       ←→ 40 92 11 0 0
// ¯5↑40 92 11      ←→ 0 0 40 92 11
// 3 3↑1 1⍴0        ←→ 3 3⍴0 0 0 0 0 0 0 0 0
// 5↑'abc'          ←→ 'abc  '
// ¯5↑'abc'         ←→ '  abc'
// 3 3↑1 1⍴'a'      ←→ 3 3⍴'a        '
// 2 3↑1+4 3⍴⍳12    ←→ 2 3⍴1 2 3 4 5 6
// ¯1 3↑1+4 3⍴⍳12   ←→ 1 3⍴10 11 12
// 1 2↑1+4 3⍴⍳12    ←→ 1 2⍴1 2
// 3↑⍬              ←→ 0 0 0
// ¯2↑⍬             ←→ 0 0
// 0↑⍬              ←→ ⍬
// 3 3↑1            ←→ 3 3⍴1 0 0 0 0 0 0 0 0
// 2↑3 3⍴⍳9         ←→ 2 3⍴⍳6
// ¯2↑3 3⍴⍳9        ←→ 2 3⍴3+⍳6
// 4↑3 3⍴⍳9         ←→ 4 3⍴(⍳9),0 0 0
// ⍬↑3 3⍴⍳9         ←→ 3 3⍴⍳9
const take=(om,al)=>{
  al.shape.length<=1||rnkErr()
  if(!om.shape.length)om=A([unwrap(om)],al.shape.length?repeat([1],al.shape[0]):[1])
  var a=toArray(al)
  a.length<=om.shape.length||rnkErr()
  for(var i=0;i<a.length;i++)typeof a[i]==='number'&&a[i]===Math.floor(a[i])||domErr()
  var mustCopy=0,shape=om.shape.slice(0)
  for(var i=0;i<a.length;i++){shape[i]=Math.abs(a[i]);if(shape[i]>om.shape[i])mustCopy=1}
  if(mustCopy){
    var stride=Array(shape.length);stride[stride.length-1]=1
    for(var i=stride.length-2;i>=0;i--)stride[i]=stride[i+1]*shape[i+1]
    var data=repeat([getPrototype(om)],prod(shape))
    var copyShape=shape.slice(0),p=0,q=0
    for(var i=0;i<a.length;i++){
      var x=a[i];copyShape[i]=Math.min(om.shape[i],Math.abs(x))
      if(x<0){if(x<-om.shape[i]){q-=(x+om.shape[i])*stride[i]}else{p+=(x+om.shape[i])*om.stride[i]}}
    }
    if(prod(copyShape)){
      var copyIndices=repeat([0],copyShape.length)
      while(1){
        data[q]=om.data[p];var axis=copyShape.length-1
        while(axis>=0&&copyIndices[axis]+1===copyShape[axis]){
          p-=copyIndices[axis]*om.stride[axis];q-=copyIndices[axis]*stride[axis];copyIndices[axis--]=0
        }
        if(axis<0)break
        p+=om.stride[axis];q+=stride[axis];copyIndices[axis]++
      }
    }
    return A(data,shape,stride)
  }else{
    var offset=0;for(var i=0;i<a.length;i++)if(a[i]<0)offset+=(om.shape[i]+a[i])*om.stride[i]
    return A(om.data,shape,om.stride,offset)
  }
}

// ↑(1 2 3)(4 5 6) ←→ 1 2 3
// ↑(1 2)(3 4 5)   ←→ 1 2
// ↑'AB'           ←→ 'A'
// ↑123            ←→ 123
// ↑⍬              ←→ 0
//! ↑''             ←→ ' '
const first=x=>{var y=empty(x)?getPrototype(x):x.data[0];return y.isA?y:A([y],[])}

voc['⍉']=(om,al)=>{
  var n=om.shape.length
  if(al){
    // (2 2⍴⍳4)⍉2 2 2 2⍴⍳16 !!! RANK ERROR
    // 0⍉3 5 8 ←→ 3 5 8
    // 1 0⍉2 2 2⍴⍳8 !!! LENGTH ERROR
    // ¯1⍉1 2 !!! DOMAIN ERROR
    // 'a'⍉1 2 !!! DOMAIN ERROR
    // 2⍉1 2 !!! RANK ERROR
    // 2 0 1⍉2 3 4⍴⍳24 ←→ 3 4 2⍴0 12 1 13 2 14 3 15 4 16 5 17 6 18 7 19 8 20 9 21 10 22 11 23
    // 2 0 0⍉2 3 4⍴⍳24 !!! RANK ERROR
    // 0 0⍉3 3⍴⍳9 ←→ 0 4 8
    // 0 0⍉2 3⍴⍳9 ←→ 0 4
    // 0 0 0⍉3 3 3⍴⍳27 ←→ 0 13 26
    // 0 1 0⍉3 3 3⍴⍳27 ←→ 3 3⍴0 3 6 10 13 16 20 23 26
    al.shape.length<=1||rnkErr()
    al.shape.length||(al=A([unwrap(al)]))
    al.shape[0]===n||lenErr()
    var a=toArray(al)
  }else{
    // ⍉2 3⍴1 2 3 6 7 8  ←→ 3 2⍴1 6 2 7 3 8
    // ⍴⍉2 3⍴1 2 3 6 7 8 ←→ 3 2
    // ⍉1 2 3            ←→ 1 2 3
    // ⍉2 3 4⍴⍳24        ←→ 4 3 2⍴0 12 4 16 8 20 1 13 5 17 9 21 2 14 6 18 10 22 3 15 7 19 11 23
    // ⍉⍬                ←→ ⍬
    // ⍉''               ←→ ''
    var a=[];for(var i=n-1;i>=0;i--)a.push(i)
  }
  var shape=[],stride=[]
  for(var i=0;i<a.length;i++){
    var x=a[i]
    isInt(x,0)||domErr()
    x<n||rnkErr()
    if(shape[x]==null){
      shape[x]=om.shape[i]
      stride[x]=om.stride[i]
    }else{
      shape[x]=Math.min(shape[x],om.shape[i])
      stride[x]+=om.stride[i]
    }
  }
  for(var i=0;i<shape.length;i++)shape[i]!=null||rnkErr()
  return A(om.data,shape,stride)
}

//  ({1}⍠{2})0 ←→ 1
// 0({1}⍠{2})0 ←→ 2
voc['⍠']=conj((f,g)=>{
  asrt(typeof f==='function')
  asrt(typeof g==='function')
  return(om,al,axis)=>(al?f:g)(om,al,axis)
})
