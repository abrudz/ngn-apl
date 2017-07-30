//usr/bin/env node "$0" $@;exit $?
var preludeSrc="⍬←()\n⍝ ⍬     ←→ 0⍴0\n⍝ ⍴⍬    ←→ ,0\n⍝# ⍬←5   !!!\n⍝ ⍳0    ←→ ⍬\n⍝ ⍴0    ←→ ⍬\n⍝ ⍬     ←→ ⍬\n⍝ ⍬⍬    ←→ ⍬ ⍬\n⍝ 1⍬2⍬3 ←→ 1 ⍬ 2 ⍬ 3\n\n⎕a←'ABCDEFGHIJKLMNOPQRSTUVWXYZ'\n⎕á←'ÁÂÃÇÈÊËÌÍÎÏÐÒÓÔÕÙÚÛÝþãìðòõ'\n⎕d←'0123456789'\n\n~←~⍠{(~⍺∊⍵)/⍺}\n⍝ \"ABCDEFGHIJKLMNOPQRSTUVWXYZ\"~\"AEIOU\" ←→ 'BCDFGHJKLMNPQRSTVWXYZ'\n⍝ 1 2 3 4 5 6~2 4 6                    ←→ 1 3 5\n⍝ \"THIS IS TEXT\"~\" \"                   ←→ 'THISISTEXT'\n⍝ \"THIS\" \"AND\" \"THAT\"~\"T\"              ←→ 'THIS' 'AND' 'THAT'\n⍝ \"THIS\" \"AND\" \"THAT\"~\"AND\"            ←→ 'THIS' 'AND' 'THAT'\n⍝ \"THIS\" \"AND\" \"THAT\"~⊂\"AND\"           ←→ 'THIS' 'THAT'\n⍝ \"THIS\" \"AND\" \"THAT\"~\"TH\" \"AND\"       ←→ 'THIS' 'THAT'\n⍝ 11 12 13 14 15 16~2 3⍴1 2 3 14 5 6   ←→ 11 12 13 15 16\n⍝ (2 2⍴⍳4)~2 !!! RANK ERROR\n\n_atop←{⍶⍹⍵;⍶⍺⍹⍵}\n⍝ (-⍟)2 3 ←→ -⍟2 3\n⍝ 2(-*)3 ←→ -2*3\n\n⊃←{\n  0=⍴⍴⍵:↑⍵\n  0=×/⍴⍵:⍵\n  shape←⍴⍵ ⋄ ⍵←,⍵\n  r←⌈/≢¨shapes←⍴¨⍵ ⍝ maximum rank of all shapes\n  max←↑⌈/shapes←(⍴ ↓ (r⍴1)∘,)¨shapes ⍝ maximum shape of rank adjusted shapes\n  (shape,max)⍴↑⍪/shapes{max↑⍺⍴⍵}¨⍵\n  ;\n  1<⍴⍴⍺:↗'RANK ERROR'\n  x←⍵\n  {\n    1<⍴⍴⍵:↗'RANK ERROR'\n    ⍵←,⍵\n    (⍴⍵)≠⍴⍴x:↗'RANK ERROR'\n    ∨/⍵≥⍴x:↗'INDEX ERROR'\n    x←⊃⍵⌷x\n  }¨⍺\n  x\n}\n⍝ ⊃3            ←→ 3\n⍝ ⊃(1 2)(3 4)   ←→ 2 2⍴1 2 3 4\n⍝ ⊃(1 2)(3 4 5) ←→ 2 3⍴1 2 0 3 4 5\n⍝ ⊃1 2          ←→ 1 2\n⍝ ⊃(1 2)3       ←→ 2 2⍴1 2 3 0\n⍝ ⊃1(2 3)       ←→ 2 2⍴1 0 2 3\n⍝ ⊃2 2⍴1(1 1 2⍴3 4)(5 6)(2 0⍴0) ←→ 2 2 1 2 2⍴1 0 0 0 3 4 0 0 5 6 0 0 0 0 0 0\n⍝ ⊃⍬            ←→ ⍬\n⍝ ⊃2 3 0⍴0      ←→ 2 3 0⍴0\n⍝ ⍬⊃3               ←→ 3\n⍝ 2⊃'PICK'          ←→ 'C'\n⍝ (⊂1 0)⊃2 2⍴'ABCD' ←→ 'C'\n⍝ 1⊃'foo' 'bar'     ←→ 'bar'\n⍝ 1 2⊃'foo' 'bar'   ←→ 'r'\n⍝ (2 2⍴0)⊃1 2       !!! RANK ERROR\n⍝ (⊂2 1⍴0)⊃2 2⍴0    !!! RANK ERROR\n⍝ (⊂2 2⍴0)⊃1 2      !!! RANK ERROR\n⍝ (⊂2 2)⊃1 2        !!! RANK ERROR\n⍝ (⊂0 2)⊃2 2⍴'ABCD' !!! INDEX ERROR\n\n⊂←⊂⍠{ ⍝ ⍺⊂⍵ definition\n  1<⍴⍴⍺:↗'RANK ERROR' ⋄ 1≠⍴⍴⍵:↗'NONCE ERROR' ⋄ ⍺←,⍺=0\n  keep←~1 1⍷⍺ ⋄ sel←keep/⍺ ⋄ dat←keep/⍵\n  {1=1↑sel:{sel←1↓sel ⋄ dat←1↓dat}⍬}⍬\n  {1=¯1↑sel:{sel←¯1↓sel ⋄ dat←¯1↓dat}⍬}⍬\n  sel←(⍴sel),⍨sel/⍳⍴sel ⋄ drop←0\n  sel{∆←drop↓⍺↑⍵ ⋄ drop←⍺+1 ⋄ ∆}¨⊂dat\n}\n⍝ a←' this is a test ' ⋄ (a≠' ')⊂a ←→ 'this' 'is' (,'a') 'test'\n\n↓←{\n  0=⍴⍴⍵:⍵ ⋄ ⊂[¯1+⍴⍴⍵]⍵\n  ;\n  1<⍴⍴⍺:↗'RANK ERROR'\n  a←,⍺\n  ⍵←{0=⍴⍴⍵:((⍴a)⍴1)⍴⍵⋄⍵}⍵\n  (⍴a)>⍴⍴⍵:↗'RANK ERROR'\n  a←(⍴⍴⍵)↑a\n  a←((a>0)×0⌊a-⍴⍵)+(a≤0)×0⌈a+⍴⍵\n  a↑⍵\n}\n⍝ ↓1 2 3 ←→ ⊂1 2 3\n⍝ ↓(1 2)(3 4) ←→ ⊂(1 2)(3 4)\n⍝ ↓2 2⍴⍳4 ←→ (0 1)(2 3)\n⍝ ↓2 3 4⍴⍳24 ←→ 2 3⍴(0 1 2 3)(4 5 6 7)(8 9 10 11)(12 13 14 15)(16 17 18 19)(20 21 22 23)\n⍝ 4↓'OVERBOARD'         ←→ 'BOARD'\n⍝ ¯5↓'OVERBOARD'        ←→ 'OVER'\n⍝ ⍴10↓'OVERBOARD'       ←→ ,0\n⍝ 0 ¯2↓3 3⍴'ONEFATFLY'  ←→ 3 1⍴'OFF'\n⍝ ¯2 ¯1↓3 3⍴'ONEFATFLY' ←→ 1 2⍴'ON'\n⍝ 1↓3 3⍴'ONEFATFLY'     ←→ 2 3⍴'FATFLY'\n⍝ ⍬↓3 3⍴⍳9              ←→ 3 3⍴⍳9\n⍝ 1 1↓2 3 4⍴\"ABCDEFGHIJKLMNOPQRSTUVWXYZ\"   ←→ 1 2 4⍴'QRSTUVWX'\n⍝ ¯1 ¯1↓2 3 4⍴\"ABCDEFGHIJKLMNOPQRSTUVWXYZ\" ←→ 1 2 4⍴'ABCDEFGH'\n⍝ 1↓0                   ←→ ⍬\n⍝ 0 1↓2                 ←→ 1 0⍴0\n⍝ 1 2↓3                 ←→ 0 0⍴0\n⍝ ⍬↓0                   ←→ 0\n\n⍪←{(≢⍵)(×/1↓⍴⍵)⍴⍵; ⍺,[0]⍵}\n⍝ ⍪2 3 4 ←→ 3 1⍴2 3 4\n⍝ ⍪0 ←→ 1 1⍴0\n⍝ ⍪2 2⍴2 3 4 5 ←→ 2 2⍴2 3 4 5\n⍝ ⍴⍪2 3⍴⍳6 ←→ 2 3\n⍝ ⍴⍪2 3 4⍴⍳24 ←→ 2 12\n⍝ (2 3⍴⍳6)⍪9 ←→ 3 3⍴(0 1 2 3 4 5 9 9 9)\n⍝ 1⍪2 ←→ 1 2\n\n⊢←{⍵}\n⍝ 123⊢456 ←→ 456\n⍝ ⊢456 ←→ 456\n\n⊣←{⍵;⍺}\n⍝ 123⊣456 ←→ 123\n⍝ ⊣456 ←→ 456\n\n≢←{⍬⍴(⍴⍵),1; ~⍺≡⍵}\n⍝ ≢0 ←→ 1\n⍝ ≢0 0 0 ←→ 3\n⍝ ≢⍬ ←→ 0\n⍝ ≢2 3⍴⍳6 ←→ 2\n⍝ 3≢3 ←→ 0\n\n,←{(×/⍴⍵)⍴⍵}⍠,\n⍝ ,2 3 4⍴'abcdefghijklmnopqrstuvwx' ←→ 'abcdefghijklmnopqrstuvwx'\n⍝ ,123 ←→ 1⍴123\n\n⌹←{\n  norm←{(⍵+.×+⍵)*0.5}\n\n  QR←{ ⍝ QR decomposition\n    n←(⍴⍵)[1]\n    1≥n:{t←norm,⍵ ⋄ (⍵÷t)(⍪t)}⍵\n    m←⌈n÷2\n    a0←((1↑⍴⍵),m)↑⍵\n    a1←(0,m)↓⍵\n    (q0 r0)←∇a0\n    c←(+⍉q0)+.×a1\n    (q1 r1)←∇a1-q0+.×c\n    (q0,q1)((r0,c)⍪((⌊n÷2),-n)↑r1)\n  }\n\n  Rinv←{ ⍝ Inverse of an upper triangular matrix\n    1=n←1↑⍴⍵:÷⍵\n    m←⌈n÷2\n    ai←∇(m,m)↑⍵\n    di←∇(m,m)↓⍵\n    b←(m,m-n)↑⍵\n    bx←-ai+.×b+.×di\n    (ai,bx)⍪((⌊n÷2),-n)↑di\n  }\n\n  0=⍴⍴⍵:÷⍵\n  1=⍴⍴⍵:,∇⍪⍵\n  2≠⍴⍴⍵:↗'RANK ERROR'\n  0∊≥/⍴⍵:↗'LENGTH ERROR'\n  (Q R)←QR ⍵\n  (Rinv R)+.×+⍉Q\n  ;\n  (⌹⍵)+.×⍺\n}\n⍝ ⌹2 ←→ .5\n⍝ ⌹2 2⍴4 3 3 2 ←→ 2 2⍴¯2 3 3 ¯4\n⍝ (4 4⍴12 1 4 10 ¯6 ¯5 4 7 ¯4 9 3 4 ¯2 ¯6 7 7)⌹93 81 93.5 120.5 ←→ .0003898888816687221 ¯.005029566573526544 .04730651764247189 .0705568912859835\n⍝ ⌹2 2 2⍴⍳8 !!! RANK ERROR\n⍝ ⌹2 3⍴⍳6 !!! LENGTH ERROR\n\n⍨←{⍵⍶⍵;⍵⍶⍺}\n⍝ 17-⍨23 ←→ 6\n⍝ 7⍴⍨2 3 ←→ 2 3⍴7\n⍝ +⍨2    ←→ 4\n⍝ -⍨123  ←→ 0\n";
const asrt=x=>{if(!x)throw Error('assertion failed')}
,isInt=(x,start,end)=>x===~~x&&(start==null||start<=x&&(end==null||x<end))
,prod=x=>{var r=1;for(var i=0;i<x.length;i++)r*=x[i];return r}
,all=x=>{for(var i=0;i<x.length;i++)if(!x[i])return;return 1}
,extend=(x,y)=>{for(var k in y)x[k]=y[k];return x}
,fmtNum=x=>(''+x).replace('Infinity','∞').replace(/-/g,'¯')
,repeat=(x,n)=>{ // catenates "n" instances of a string or array "x"
  asrt(x.length!=null)
  asrt(isInt(n,0))
  if(!n)return x.slice(0,0)
  var m=n*x.length;while(x.length*2<m)x=x.concat(x)
  return x.concat(x.slice(0,m-x.length))
}
,arrEq=(x,y)=>{
  if(x.length!==y.length)return 0
  for(var i=0;i<x.length;i++)if(x[i]!==y[i])return 0
  return 1
}
,reversed=x=>{
  if(x instanceof Array)return x.slice(0).reverse()
  var i=-1,j=x.length,y=new x.constructor(x.length);y.set(x)
  while(++i<--j){var h=y[i];y[i]=y[j];y[j]=h}
  return y
}
const err=(name,m,o)=>{ // m:message, o:options
  m=m||''
  if(o&&o.aplCode&&o.offset!=null){
    var a=o.aplCode.slice(0,o.offset).split('\n')
    var l=a.length,c=1+(a[a.length-1]||'').length // line and column
    m+='\n'+(o.file||'-')+':'+l+':'+c+o.aplCode.split('\n')[l-1]+'_'.repeat(c-1)+'^'
  }
  var e=Error(m);e.name=name;for(var k in o)e[k]=o[k]
  throw e
}
,synErr=(m,o)=>err('SYNTAX ERROR',m,o)
,domErr=(m,o)=>err('DOMAIN ERROR',m,o)
,lenErr=(m,o)=>err('LENGTH ERROR',m,o)
,rnkErr=(m,o)=>err(  'RANK ERROR',m,o)
,idxErr=(m,o)=>err( 'INDEX ERROR',m,o)
,nyiErr=(m,o)=>err( 'NONCE ERROR',m,o)
,valErr=(m,o)=>err( 'VALUE ERROR',m,o)
const each=(a,f)=>{ // iterates through the elements of an APL array in ravel order.
  if(empty(a))return
  var data=a.data,shape=a.shape,stride=a.stride,lastAxis=shape.length-1,p=a.offset,i=[],axis=shape.length
  while(--axis>=0)i.push(0)
  while(1){
    f(data[p],i,p)
    axis=lastAxis
    while(axis>=0&&i[axis]+1===shape[axis]){
      p-=i[axis]*stride[axis];i[axis--]=0
    }
    if(axis<0)break
    i[axis]++
    p+=stride[axis]
  }
}
const each2=(a,b,f)=>{ // like each() but iterates over two APL array in parallel
  var data =a.data,shape =a.shape,stride =a.stride
  var data1=b.data,shape1=b.shape,stride1=b.stride
  shape.length!==shape1.length&&rnkErr()
  shape!=''+shape1&&lenErr() // abuse JS type coercion -- compare the shapes as strings
  if(empty(a))return
  var lastAxis=shape.length-1,p=a.offset,q=b.offset
  var i=Array(shape.length);for(var j=0;j<i.length;j++)i[j]=0
  while(1){
    f(data[p],data1[q],i)
    var axis = lastAxis
    while(axis>=0&&i[axis]+1===shape[axis]){p-=i[axis]*stride[axis];q-=i[axis]*stride1[axis];i[axis--]=0}
    if(axis<0)break
    i[axis]++;p+=stride[axis];q+=stride1[axis]
  }
}

function A(data,shape,stride,offset){ // APL array constructor
  var x=this
  x.data=data                             ;asrt(x.data.length!=null)
  x.shape=shape||[x.data.length]          ;asrt(x.shape.length!=null)
  x.stride=stride||strideForShape(x.shape);asrt(x.stride.length===x.shape.length)
  x.offset=offset||0                      ;asrt(!x.data.length||isInt(x.offset,0,x.data.length))
  x.toString=function(){return format(this).join('\n')}
  x.isA=1
  for(var i=0;i<x.shape.length;i++)asrt(isInt(x.shape[i],0))
  if(x.data.length)for(var i=0;i<x.stride.length;i++)asrt(isInt(x.stride[i],-x.data.length,x.data.length+1))
}
const empty=x=>{for(var i=0;i<x.shape.length;i++)if(!x.shape[i])return 1;return 0}
,map=(x,f)=>{var r=[];each(x,(y,i,p)=>r.push(f(y,i,p)));return new A(r,x.shape)}
,map2=(x,y,f)=>{var r=[];each2(x,y,(xi,yi,i)=>r.push(f(xi,yi,i)));return new A(r,x.shape)}
,toArray=x=>{var r=[];each(x,y=>r.push(y));return r}
,toInt=(x,m,M)=>{var r=unwrap(x);if(r!==r|0||m!=null&&r<m||M!=null&&M<=r)domErr();return r}
,toSimpleString=x=>{
  if(x.shape.length>1)rnkErr()
  if(typeof x.data==='string'){
    if(!x.shape.length)return x.data[x.offset]
    if(!x.shape[0])return''
    if(x.stride[0]===1)return x.data.slice(x.offset,x.offset+x.shape[0])
    return toArray(x).join('')
  }else{
    var a=toArray(x)
    for(var i=0;i<a.length;i++)typeof a[i]!=='string'&&domErr()
    return a.join('')
  }
}
,isSingleton=x=>{var s=x.shape;for(var i=0;i<s.length;i++)if(s[i]!==1)return 0;return 1}
,isSimple=x=>!x.shape.length&&!(x.data[x.offset].isA)
,unwrap=x=>{isSingleton(x)||lenErr();return x.data[x.offset]}
,getPrototype=x=>empty(x)||typeof x.data[x.offset]!=='string'?0:' ' // todo
,strideForShape=s=>{
  asrt(s.length!=null)
  var r=Array(s.length),u=1
  for(var i=r.length-1;i>=0;i--){asrt(isInt(s[i],0));r[i]=u;u*=s[i]}
  return r
}

A.zero =new A([0],[])
A.one  =new A([1],[])
A.zilde=new A([],[0])
A.scalar=x=>new A([x],[])
A.bool=[A.zero,A.one]
// Zify(x) - complexify
// * if x is real, it's converted to a complex instance with imaginary part 0
// * if x is already complex, it's preserved
const Zify=x=>typeof x==='number'?new Z(x,0):x instanceof Z?x:domErr()

// simplify(re, im)
// * if the imaginary part is 0, the real part is returned
// * otherwise, a complex instance is created
const simplify=(re,im)=>im===0?re:new Z(re,im)

function Z(re,im){ // complex number constructor
  asrt(typeof re==='number')
  asrt(typeof im==='number'||im==null)
  if(re!==re||im!==im)domErr('NaN')
  this.re=re;this.im=im||0
}
Z.prototype.toString=function(){return fmtNum(this.re)+'J'+fmtNum(this.im)}
Z.prototype.repr=function(){return'new Z('+repr(this.re)+','+repr(this.im)+')'}

Z.exp=x=>{x=Zify(x);var r=Math.exp(x.re);return simplify(r*Math.cos(x.im),r*Math.sin(x.im))}
Z.log=x=>{
  if(typeof x==='number'&&x>0){return Math.log(x)}
  else{x=Zify(x);return simplify(Math.log(Math.sqrt(x.re*x.re+x.im*x.im)),Z.direction(x))}
}
Z.conjugate=x=>new Z(x.re,-x.im)
Z.negate   =x=>new Z(-x.re,-x.im)
Z.itimes   =x=>{x=Zify(x);return simplify(-x.im,x.re)}
Z.negitimes=x=>{x=Zify(x);return simplify(x.im,-x.re)}
Z.add      =(x,y)=>{x=Zify(x);y=Zify(y);return simplify(x.re+y.re,x.im+y.im)}
Z.subtract =(x,y)=>{x=Zify(x);y=Zify(y);return simplify(x.re-y.re,x.im-y.im)}
Z.multiply =(x,y)=>{x=Zify(x);y=Zify(y);return simplify(x.re*y.re-x.im*y.im,x.re*y.im+x.im*y.re)}
Z.divide   =(x,y)=>{x=Zify(x);y=Zify(y);const d=y.re*y.re+y.im*y.im
                    return simplify((x.re*y.re+x.im*y.im)/d,(y.re*x.im-y.im*x.re)/d)}

// ¯1 ¯2 ¯3 ¯4*2 ←→ 1 4 9 16
// 0j1*2 ←→ ¯1
// 1j2*3 ←→ ¯11j¯2
// .5j1.5*5 ←→ 9.875j¯0.375
// 9 4 0 ¯4 ¯9*.5 ←→ 3 2 0 0j2 0j3
Z.pow=(x,y)=>{
  if(typeof x==='number'&&typeof y==='number'&&(x>=0||isInt(y)))return Math.pow(x,y)
  if(typeof y==='number'&&isInt(y,0)){var r=1;while(y){(y&1)&&(r=Z.multiply(r,x));x=Z.multiply(x,x);y>>=1};return r}
  if(typeof x==='number'&&y===.5)return x<0?new Z(0,Math.sqrt(-x)):Math.sqrt(x)
  return Z.exp(Z.multiply(y,Z.log(x)))
}
Z.sqrt=x=>Z.pow(x,.5)
Z.magnitude=x=>Math.sqrt(x.re*x.re+x.im*x.im)
Z.direction=x=>Math.atan2(x.im,x.re)
Z.sin=x=>Z.negitimes(Z.sinh(Z.itimes(x)))
Z.cos=x=>Z.cosh(Z.itimes(x))
Z.tan=x=>Z.negitimes(Z.tanh(Z.itimes(x)))

// arcsin x = -i ln(ix + sqrt(1 - x^2))
// arccos x = -i ln(x + i sqrt(x^2 - 1))
// arctan x = (i/2) (ln(1-ix) - ln(1+ix))
Z.asin=x=>{x=Zify(x);return Z.negitimes(Z.log(Z.add(Z.itimes(x),Z.sqrt(Z.subtract(1,Z.pow(x,2))))))}
Z.acos=x=>{
  x=Zify(x);r=Z.negitimes(Z.log(Z.add(x,Z.sqrt(Z.subtract(Z.pow(x,2),1)))))
  // TODO look up the algorithm for determining the sign of arccos; the following line is dubious
  return r instanceof Z&&(r.re<0||(r.re===0&&r.im<0))?Z.negate(r):r
}
Z.atan=x=>{
  x=Zify(x);ix=Z.itimes(x)
  return Z.multiply(new Z(0,.5),Z.subtract(Z.log(Z.subtract(1,ix)),Z.log(Z.add(1,ix))))
}

Z.sinh=x=>{var a=Z.exp(x);return Z.multiply(.5,Z.subtract(a,Z.divide(1,a)))}
Z.cosh=x=>{var a=Z.exp(x);return Z.multiply(.5,Z.add(a,Z.divide(1,a)))}
Z.tanh=x=>{var a=Z.exp(x),b=Z.divide(1,a);return Z.divide(Z.subtract(a,b),Z.add(a,b))}

// arcsinh x =     i arcsin(-ix)
// arccosh x = +/- i arccos(x)
// arctanh x =     i arctan(-ix)
Z.asinh=x=>Z.itimes(Z.asin(Z.negitimes(x)))
Z.acosh=x=>{x=Zify(x);var sign=x.im>0||(!x.im&&x.re<=1)?1:-1;return Z.multiply(new Z(0,sign),Z.acos(x))}
Z.atanh=x=>Z.itimes(Z.atan(Z.negitimes(x)))

Z.floor=x=>{
  if(typeof x==='number')return Math.floor(x)
  x=Zify(x)
  var re=Math.floor(x.re),im=Math.floor(x.im),r=x.re-re,i=x.im-im
  if(r+i>=1)r>=i?re++:im++
  return simplify(re,im)
}
Z.ceil=x=>{
  if(typeof x==='number')return Math.ceil(x)
  x=Zify(x)
  var re=Math.ceil(x.re),im=Math.ceil(x.im),r=re-x.re,i=im-x.im
  if(r+i>=1)r>=i?re--:im--
  return simplify(re,im)
}

const iszero=x=>!x||(x instanceof Z&&!x.re&&!x.im)
Z.residue=(x,y)=>typeof x==='number'&&typeof y==='number'?(x?y-x*Math.floor(y/x):y)
                 :iszero(x)?y:Z.subtract(y,Z.multiply(x,Z.floor(Z.divide(y,x))))
Z.isint=x=>typeof x==='number'?x===Math.floor(x):x.re===Math.floor(x.re)&&x.im===Math.floor(x.im)

const firstquadrant=x=>{ // rotate into first quadrant
  if(typeof x==='number'){return Math.abs(x)}
  else{x.re<0&&(x=Z.negate(x));x.im<0&&(x=Z.itimes(x));return x.re?x:x.im}
}
Z.gcd=(x,y)=>{
  if(typeof x==='number'&&typeof y==='number'){
    while(y){var z=y;y=x%y;x=z}
    return Math.abs(x)
  }else{
    while(!iszero(y)){var z=y;y=Z.residue(y,x);x=z}
    return firstquadrant(x)
  }
}
Z.lcm=(x,y)=>{var p=Z.multiply(x,y);return iszero(p)?p:Z.divide(p,Z.gcd(x,y))}
const LDC=1,VEC=2,GET=3,SET=4,MON=5,DYA=6,LAM=7,RET=8,POP=9,SPL=10,JEQ=11,EMB=12,CON=13
,Proc=function(code,addr,size,env){this.code=code;this.addr=addr;this.size=size;this.env=env;this.toString=_=>'#procedure'}
,toFn=p=>(x,y)=>vm({code:p.code,env:p.env.concat([[x,p,y,null]]),pc:p.addr})
,vm=o=>{
  var code=o.code,env=o.env,stk=o.stk||[],pc=o.pc||0
  asrt(code instanceof Array);asrt(env instanceof Array);for(var i=0;i<env.length;i++)asrt(env[i]instanceof Array)
  while(1){
    switch(code[pc++]){
      case LDC:stk.push(code[pc++]);break
      case VEC:
        var a=stk.splice(stk.length-code[pc++])
        for(var i=0;i<a.length;i++)if(isSimple(a[i]))a[i]=unwrap(a[i])
        stk.push(new A(a))
        break
      case GET:var r=env[code[pc++]][code[pc++]];r!=null||valErr();stk.push(r);break
      case SET:env[code[pc++]][code[pc++]]=stk[stk.length-1];break
      case MON:
        var wf=stk.splice(-2),w=wf[0],f=wf[1]
        if(typeof f==='function'){
          if(w instanceof Proc)w=toFn(w)
          if(f.cps){
            f(w,undefined,undefined,r=>{stk.push(r);vm({code:code,env:env,stk:stk,pc:pc})})
            return
          }else{
            stk.push(f(w))
          }
        }else{
          var bp=stk.length;stk.push(code,pc,env);code=f.code;pc=f.addr;env=f.env.concat([[w,f,null,bp]])
        }
        break
      case DYA:
        var wfa=stk.splice(-3),w=wfa[0],f=wfa[1],a=wfa[2]
        if(typeof f==='function'){
          if(w instanceof Proc)w=toFn(w)
          if(a instanceof Proc)a=toFn(a)
          if(f.cps){
            f(w,a,undefined,r=>{stk.push(r);vm({code:code,env:env,stk:stk,pc:pc})})
            return
          }else{
            stk.push(f(w,a))
          }
        }else{
          var bp=stk.length;stk.push(code,pc,env);code=f.code;pc=f.addr;env=f.env.concat([[w,f,a,bp]])
        }
        break
      case LAM:var size=code[pc++];stk.push(new Proc(code,pc,size,env));pc+=size;break
      case RET:
        if(stk.length===1)return stk[0]
        var u=stk.splice(-4,3);code=u[0];pc=u[1];env=u[2]
        break
      case POP:stk.pop();break
      case SPL:
        var n=code[pc++]
        var a=toArray(stk[stk.length-1]).reverse()
        for(var i=0;i<a.length;i++)if(!(a[i].isA))a[i]=new A([a[i]],[])
        if(a.length===1){a=repeat(a,n)}else if(a.length!==n){lenErr()}
        stk.push.apply(stk,a)
        break
      case JEQ:var n=code[pc++];toInt(stk[stk.length-1],0,2)||(pc+=n);break
      case EMB:var frame=env[env.length-1];stk.push(code[pc++](frame[0],frame[2]));break
      case CON:
        var frame=env[env.length-1]
        ;(_=>{
          var cont={
            code:code,
            env:env.map(x=>x.slice(0)),
            stk:stk.slice(0,frame[3]),
            pc:frame[1].addr+frame[1].size-1
          }
          asrt(code[cont.pc] === RET)
          stk.push(r=>{code=cont.code;env=cont.env;stk=cont.stk;pc=cont.pc;stk.push(r)})
        })()
        break
      default:err('Unrecognized instruction:'+code[pc-1]+',pc:'+pc)
    }
  }
}
const ltr='_A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶ-ͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮ-ٯٱ-ۓەۥ-ۦۮ-ۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴ-ߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএ-ঐও-নপ-রলশ-হঽৎড়-ঢ়য়-ৡৰ-ৱਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽૐૠ-ૡଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽଡ଼-ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘ-ౙౠ-ౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠ-ೡೱ-ೲഅ-ഌഎ-ഐഒ-ഺഽൎൠ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะา-ำเ-ๆກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥ-ၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮ-ᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵ-ᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃ-ↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〆〱-〵〻-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪ-ꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵ-ꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּ-סּףּ-פּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ'
,td=[
  ['-',/^(?:[ \t]+|[⍝\#].*)+/],        // whitespace and comments
  ['L',/^[\n\r]+/],                    // newline
  ['⋄',/^⋄/],                          // statement separator
  ['N',/^¯?(?:0x[\da-f]+|\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:0x[\da-f]+|\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞))?/i],
  ['S',/^(?:'[^']*')+|^(?:"[^"]*")+/], // string
  ['.',/^[\(\)\[\]\{\}:;←]/],          // punctuation
  ['J',/^«[^»]*»/],                    // JS literal
  ['X',RegExp('^(?:⎕?['+ltr+']['+ltr+'0-9]*|⍺⍺|⍵⍵|∇∇|[^¯\'":«»])','i')] // identifier
]
,parse=(s,o)=>{
  // tokens are {t:type,v:value,o:offset,s:aplCode}
  // "stk" tracks bracket nesting and causes 'L' tokens to be dropped when the latest unclosed bracket is '(' or '['
  var i=0,tokens=[],stk=['{'],ns=s.length // i:offset in s
  while(i<ns){
    var m,t,v,s1=s.slice(i) // m:match object, t:type, v:value, s1:remaining source code
    for(var j=0;j<td.length;j++)if(m=s1.match(td[j][1])){v=m[0];t=td[j][0];t==='.'&&(t=v);break}
    t||synErr('Unrecognized token',{file:o?o.file:null,o:i,s:s})
    if(t!=='-'){
      if('([{'.includes(t)){stk.push(t)}else if(')]}'.includes(t)){stk.pop()}
      if(t!=='L'||stk[stk.length-1]==='{')tokens.push({t:t,v:v[0]==='⎕'?v.toUpperCase():v,o:i,s:s})
    }
    i+=v.length
  }
  tokens.push({t:'$',v:'',o:i,s:s})
  // AST node types:          The compiler replaces '.' nodes with:
  // 'B' body     a⋄b         'V' vector      1 2
  // ':' guard    a:b         'M' monadic     +1
  // 'N' number   1           'D' dyadic      1+2
  // 'S' string   'a'         'A' adverb      +/
  // 'X' symbol   a           'C' conjunction +.×
  // 'J' embedded «a»         'T' atop        +÷
  // '⍬' empty    ()          'F' fork        +÷⍴
  // '{' lambda   {}
  // '[' index    a[b]
  // '←' assign   a←b
  // '.' expr     a b
  var i=1,token=tokens[0] // single-token lookahead
  const consume=x=>x.includes(token.t)?token=tokens[i++]:0
  ,demand=x=>{token.t===x?(token=tokens[i++]):prsErr('Expected token of type '+x+' but got '+token.t)}
  ,prsErr=x=>{synErr(x,{file:o.file,offset:token.o,aplCode:s})}
  ,body=_=>{
    var r=['B']
    while(1){
      if('$};'.includes(token.t))return r
      while(consume('⋄L')){}
      if('$};'.includes(token.t))return r
      var e=expr()
      if(consume(':'))e=[':',e,expr()]
      r.push(e)
    }
  }
  ,expr=_=>{
    var r=['.'],item
    while(1){
      var token0=token
      if(consume('NSXJ')){item=[token0.t,token0.v]}
      else if(consume('(')){if(consume(')')){item=['⍬']}else{item=expr();demand(')')}}
      else if(consume('{')){item=['{',body()];while(consume(';')){item.push(body())};demand('}')}
      else{prsErr('Encountered unexpected token of type '+token.t)}
      if(consume('[')){
        item=['[',item]
        while(1){
          if(consume(';')){item.push(null)}
          else if(token.t===']'){item.push(null);break}
          else{item.push(expr());if(token.t===']'){break}else{demand(';')}}
        }
        demand(']')
      }
      if(consume('←'))return r.concat([['←',item,expr()]])
      r.push(item)
      if(')]}:;⋄L$'.includes(token.t))return r
    }
  }
  ,r=body()
  demand('$');return r // 'hello'} !!! SYNTAX ERROR
}
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
      case 23:        xi=x.data[x.offset];return map(y,yi=>f2(xi,yi))
      case 32:case 22:yi=y.data[y.offset];return map(x,xi=>f2(xi,yi))
      case 33:        x.shape.length!==y.shape.length&&rnkErr();x.shape!=''+y.shape&&lenErr();return map2(x,y,f2)
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
    if(!(y.isA)||x.shape!=''+y.shape)return 0
    var r=1;each2(x,y,(xi,yi)=>{r&=match(xi,yi)});return r
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
    var r=1;each2(x,y,(xi,yi)=>{r&=approx(xi,yi)});return r
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
  monad:numeric(x=>x,Z.conjugate),
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
  monad:numeric(x=>-x,Z.negate),
  // 1-3     ←→ ¯2
  // 5-¯3    ←→ 8
  // 5j2-3j8 ←→ 2j¯6
  // 5-3j8   ←→ 2j¯8
  // -/⍬     ←→ 0
  dyad:numeric((y,x)=>x-y,(y,x)=>Z.subtract(x,y))
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
  dyad:numeric((y,x)=>x*y,(y,x)=>Z.multiply(x,y))
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
  dyad:numeric((y,x)=>x/y,(y,x)=>Z.divide(x,y))
}))
voc['*']=withId(1,perv({
  // *2   ←→ 7.38905609893065
  // *2j3 ←→ ¯7.315110094901103J1.0427436562359045
  monad:exp=numeric(Math.exp,Z.exp),
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
              ?Math.log(y)/Math.log(x):Z.divide(Z.log(y),Z.log(x))
})
voc['|']=withId(0,perv({
  // |¯8 0 8 ¯3.5 ←→ 8 0 8 3.5
  // |5j12 ←→ 13
  monad:numeric(x=>Math.abs(x),Z.magnitude),
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
// ,\"AB" "CD" "EF"           ←→ 'AB' 'ABCD' 'ABCDEF'
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
// T←"ONE(TWO) BOOK(S)" ⋄ ≠\T∊"()" ←→ 0 0 0 1 1 1 1 0 0 0 0 0 0 1 1 0
// T←"ONE(TWO) BOOK(S)" ⋄ ((T∊"()")⍱≠\T∊"()")/T ←→ 'ONE BOOK'
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
      return map(om,(x,indices,p)=>{
        x.isA||(x=A.scalar(x))
        for(var j=0,nj=indices[axis];j<nj;j++){
          p-=om.stride[axis]
          y=om.data[p]
          y.isA||(y=A.scalar(y))
          x=f(x,y)
        }
        x.shape.length||(x=unwrap(x))
        return x
      })
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
      var filler=getPrototype(om),p=om.offset,indices=repeat([0],shape.length)
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
    return new A(data,shape)
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
        case -10:return Z.conjugate(x)
        case  -9:return x
        case  -8:return Z.negate(Z.sqrt(Z.subtract(-1,Z.multiply(x,x))))
        case  -7:return Z.atanh(x)
        case  -6:return Z.acosh(x)
        case  -5:return Z.asinh(x)
        case  -4:
          if(x.re===-1&&!x.im)return 0
          var a=Z.add(x,1),b=Z.subtract(x,1);return Z.multiply(a,Z.sqrt(Z.divide(b,a)))
        case  -3:return Z.atan(x)
        case  -2:return Z.acos(x)
        case  -1:return Z.asin(x)
        case   0:return Z.sqrt(Z.subtract(1,Z.multiply(x,x)))
        case   1:return Z.sin(x)
        case   2:return Z.cos(x)
        case   3:return Z.tan(x)
        case   4:return Z.sqrt(Z.add(1,Z.multiply(x,x)))
        case   5:return Z.sinh(x)
        case   6:return Z.cosh(x)
        case   7:return Z.tanh(x)
        case   8:return Z.sqrt(Z.subtract(-1,Z.multiply(x,x)))
        case   9:return x.re
        case  10:return Z.magnitude(x)
        case  11:return x.im
        case  12:return Z.direction(x)
        default:domErr()
      }
    }else{
      domErr()
    }
  }
})
voc[',']=(om,al,axis)=>{
  if(al){
    // 10,66←→10 66
    // '10 ','MAY ','1985'←→'10 MAY 1985'
    // (2 3⍴⍳6),2 2⍴⍳4     ←→ 2 5⍴(0 1 2 0 1  3 4 5 2 3)
    // (3 2⍴⍳6),2 2⍴⍳4     !!! LENGTH ERROR
    // (2 3⍴⍳6),9          ←→ 2 4⍴(0 1 2 9  3 4 5 9)
    // (2 3 4⍴⍳24),99←→2 3 5⍴0 1 2 3 99 4 5 6 7 99 8 9 10 11 99 12 13 14 15 99 16 17 18 19 99 20 21 22 23 99
    // ⍬,⍬                 ←→ ⍬
    // ⍬,1                 ←→ ,1
    // 1,⍬                 ←→ ,1
    var nAxes=Math.max(al.shape.length,om.shape.length)
    if(axis){
      axis=unwrap(axis)
      typeof axis!=='number'&&domErr()
      nAxes&&!(-1<axis&&axis<nAxes)&&rnkErr()
    }else{
      axis=nAxes-1
    }

    if(!al.shape.length&&!om.shape.length){
      return new A([unwrap(al),unwrap(om)])
    }else if(!al.shape.length){
      var s=om.shape.slice(0)
      if(isInt(axis))s[axis]=1
      al=new A([unwrap(al)],s,repeat([0],om.shape.length))
    }else if(!om.shape.length){
      var s=al.shape.slice(0)
      if(isInt(axis))s[axis]=1
      om=new A([unwrap(om)],s,repeat([0],al.shape.length))
    }else if(al.shape.length+1===om.shape.length){
      isInt(axis)||rnkErr()
      var shape =al.shape .slice(0);shape .splice(axis,0,1)
      var stride=al.stride.slice(0);stride.splice(axis,0,0)
      al=new A(al.data,shape,stride,al.offset)
    }else if(al.shape.length===om.shape.length+1){
      isInt(axis)||rnkErr()
      var shape =om.shape .slice(0);shape .splice(axis,0,1)
      var stride=om.stride.slice(0);stride.splice(axis,0,0)
      om=new A(om.data,shape,stride,om.offset)
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
      var r=0,p=al.offset // r:pointer in data (the result), p:pointer in al.data
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
      var q=om.offset // pointer in ⍵.data
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
    return new A(data,shape,stride)
  }else{
    asrt(0)
  }
}
var eq
// 12=12               ←→ 1
// 2=12                ←→ 0
// "Q"="Q"             ←→ 1
// 1="1"               ←→ 0
// "1"=1               ←→ 0
// 11 7 2 9=11 3 2 6   ←→ 1 0 1 0
// "STOAT"="TOAST"     ←→ 0 0 0 0 1
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
voc['=']=withId(1,perv({dyad:eq=(y,x)=>
  +(x instanceof Z&&y instanceof Z?x.re===y.re&&x.im===y.im:x===y)
})),

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
// ("ABC" "DEF")≡"ABCDEF" ←→ 0
//! (⍳0)≡""               ←→ 0
// (2 0⍴0)≡(0 2⍴0)        ←→ 0
//! (0⍴1 2 3)≡0⍴⊂2 2⍴⍳4   ←→ 0
// ≡4                      ←→ 0
// ≡⍳4                     ←→ 1
// ≡2 2⍴⍳4                 ←→ 1
// ≡"abc"1 2 3(23 55)      ←→ 2
// ≡"abc"(2 4⍴"abc"2 3"k") ←→ 3
voc['≡']=(om,al)=>al?A.bool[+match(om,al)]:new A([depthOf(om)],[])

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
  if(typeof f==='function'){
    if(typeof g==='function'){
      return(om,al)=>f(g(om),al) // f∘g
    }else{
      return(om,al)=>{al==null||synErr();return f(g,om)} // f∘B
    }
  }else{
    asrt(typeof g==='function')
    return(om,al)=>{al==null||synErr();return g(om,f)} // A∘g
  }
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
    var a=toArray(al),r=[];each(om,x=>{contains(a,x)||r.push(x)});return new A(a.concat(r))
  }else{
    // ∪3 17 17 17 ¯3 17 0 ←→ 3 17 ¯3 0
    // ∪3 17               ←→ 3 17
    // ∪17                 ←→ ,17
    // ∪⍬                  ←→ ⍬
    if(om.shape.length>1)rnkErr()
    var r=[];each(om,x=>{contains(r,x)||r.push(x)});return new A(r)
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
    return new A(r)
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
  if(!al.shape.length)al=new A([unwrap(al)])
  if(!om.shape.length)om=new A([unwrap(om)])
  var lastDimA=al.shape[al.shape.length-1],firstDimB=om.shape[0]
  if(lastDimA!==1&&firstDimB!==1&&lastDimA!==firstDimB)lenErr()
  var a=toArray(al),b=toArray(om),data=[],ni=a.length/lastDimA,nj=b.length/firstDimB
  for(var i=0;i<ni;i++)for(var j=0;j<nj;j++){
    var x=a.slice(i*lastDimA,(i+1)*lastDimA)
    var y=[];for(var l=0;l<firstDimB;l++)y.push(b[j+l*(b.length/firstDimB)])
    if(x.length===1)x=repeat([x[0]],y.length)
    if(y.length===1)y=repeat([y[0]],x.length)
    var z=y[0];for(var k=1;k<y.length;k++)z=Z.add(Z.multiply(z,x[k]),y[k])
    data.push(z)
  }
  return new A(data,al.shape.slice(0,-1).concat(om.shape.slice(1)))
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
    return new A(data,al.shape.concat(om.shape))
  }
}
// For matrices, the inner product behaves like matrix multiplication where +
// and × can be substituted with any verbs.
//
// For higher dimensions, the general formula is:
// A f.g B   <->   f/¨ (⊂[¯1+⍴⍴A]A) ∘.g ⊂[0]B
//
// (1 3 5 7)+.=2 3 6 7 ←→ 2
// (1 3 5 7)∧.=2 3 6 7 ←→ 0
// (1 3 5 7)∧.=1 3 5 7 ←→ 1
// 7+.=8 8 7 7 8 7 5   ←→ 3
// 8 8 7 7 8 7 5+.=7   ←→ 3
// 7+.=7               ←→ 1
// (3 2⍴5 ¯3 ¯2 4 ¯1 0)+.×2 2⍴6 ¯3 5 7 ←→ 3 2⍴15 ¯36 8 34 ¯6 3
const innerProduct=(g,f)=>{
  var F=voc['¨'](voc['/'](f)),G=outerProduct(g)
  return(om,al)=>{
    if(!al.shape.length)al=new A([unwrap(al)])
    if(!om.shape.length)om=new A([unwrap(om)])
    return F(G(
      voc['⊂'](om,undefined,new A([0])),
      voc['⊂'](al,undefined,new A([al.shape.length-1]))
    ))
  }
}

// ⍴¨(0 0 0 0)(0 0 0)             ←→ (,4)(,3)
// ⍴¨"MONDAY" "TUESDAY"           ←→ (,6)(,7)
// ⍴   (2 2⍴⍳4)(⍳10)97.3(3 4⍴"K") ←→ ,4
// ⍴¨  (2 2⍴⍳4)(⍳10)97.3(3 4⍴"K") ←→ (2 2)(,10)⍬(3 4)
// ⍴⍴¨ (2 2⍴⍳4)(⍳10)97.3(3 4⍴"K") ←→ ,4
// ⍴¨⍴¨(2 2⍴⍳4)(⍳10)97.3(3 4⍴"K") ←→ (,2)(,1)(,0)(,2)
// (1 2 3) ,¨ 4 5 6               ←→ (1 4)(2 5)(3 6)
// 2 3↑¨'MONDAY' 'TUESDAY'        ←→ 'MO' 'TUE'
// 2↑¨'MONDAY' 'TUESDAY'          ←→ 'MO' 'TU'
// 2 3⍴¨1 2                       ←→ (1 1)(2 2 2)
// 4 5⍴¨"THE" "CAT"               ←→ 'THET' 'CATCA'
// {1+⍵*2}¨2 3⍴⍳6                 ←→ 2 3⍴1 2 5 10 17 26
voc['¨']=adv((f,g)=>{
  asrt(typeof f==='function');asrt(g==null)
  return(om,al)=>{
    if(!al){
      return map(om,x=>{
        x.isA||(x=new A([x],[]))
        var r=f(x);asrt(r.isA)
        return r.shape.length?r:unwrap(r)
      })
    }else if(arrEq(al.shape,om.shape)){
      return map2(om,al,(x,y)=>{
        x.isA||(x=new A([x],[]))
        y.isA||(y=new A([y],[]))
        var r=f(x,y);asrt(r.isA)
        return r.shape.length?r:unwrap(r)
      })
    }else if(isSingleton(al)){
      var y=al.data[0].isA?unwrap(al):al
      return map(om,x=>{
        x.isA||(x=new A([x],[]))
        var r=f(x,y);asrt(r.isA)
        return r.shape.length?r:unwrap(r)
      })
    }else if(isSingleton(om)){
      var x=om.data[0].isA?unwrap(om):om
      return map(al,y=>{
        y.isA||(y=new A([y],[]))
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
      y=iszero(x)?0:Z.divide(Z.subtract(y,Z.residue(x,y)),x)
    }
  }
  return new A(data,shape)
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
    // ⍴∊(1 2 3)"ABC"(4 5 6) ←→ ,9
    // ∊2 2⍴(1+2 2⍴⍳4)"DEF"(1+2 3⍴⍳6)(7 8 9) ←→ 1 2 3 4,'DEF',1 2 3 4 5 6 7 8 9
    var r=[];enlist(om,r);return new A(r)
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
    var r;
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
    z--;x=p[0];for(var i=1;i<g+2;i++)x+=p[i]/(z+i)
    t=z+g+.5
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
  // "AN"⍷"BANANA"                        ←→ 0 1 0 1 0 0
  // "BIRDS" "NEST"⍷"BIRDS" "NEST" "SOUP" ←→ 1 0 0
  // "ME"⍷"HOME AGAIN"                    ←→ 0 0 1 0 0 0 0 0 0 0
  // "DAY"⍷7 9⍴'SUNDAY   MONDAY   TUESDAY  WEDNESDAYTHURSDAY FRIDAY   SATURDAY ' ←→ 7 9⍴0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0
  // (2 2⍴"ABCD")⍷"ABCD" ←→ 4 ⍴ 0
  // (1 2)(3 4)⍷"START"(1 2 3)(1 2)(3 4) ←→ 0 0 1 0
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
  if(al.shape.length>om.shape.length)return new A([0],om.shape,repeat([0],om.shape.length))
  if(al.shape.length < om.shape.length){
    al=new A( // prepend ones to the shape of ⍺
      al.data,
      repeat([1],om.shape.length-al.shape.length).concat(al.shape),
      repeat([0],om.shape.length-al.shape.length).concat(al.stride),
      al.offset
    )
  }
  if(empty(al))return new A([1],om.shape,repeat([0],om.shape.length))
  var findShape=[]
  for(var i=0;i<om.shape.length;i++){
    var d=om.shape[i]-al.shape[i]+1
    if(d<=0)return new A([0],om.shape,repeat([0],om.shape.length))
    findShape.push(d)
  }
  var stride=strideForShape(om.shape),data=repeat([0],prod(om.shape))
  var p=om.offset,q=0,indices=repeat([0],findShape.length)
  while(1){
    data[q]=+match(al,new A(om.data,al.shape,om.stride,p))
    var a=findShape.length-1
    while(a>=0&&indices[a]+1===findShape[a]){p-=indices[a]*om.stride[a];q-=indices[a]*stride[a];indices[a--]=0}
    if(a<0)break
    p+=om.stride[a];q+=stride[a];indices[a]++
  }
  return new A(data,om.shape)
}

voc['⌊']=withId(Infinity,perv({
  // ⌊123   ←→ 123
  // ⌊12.3  ←→ 12
  // ⌊¯12.3 ←→ ¯13
  // ⌊¯123  ←→ ¯123
  // ⌊'a'   !!! DOMAIN ERROR
  // ⌊12j3      ←→ 12j3
  // ⌊1.2j2.3   ←→ 1j2
  // ⌊1.2j¯2.3  ←→ 1j¯3
  // ⌊¯1.2j2.3  ←→ ¯1j2
  // ⌊¯1.2j¯2.3 ←→ ¯1j¯3
  // ⌊0 5 ¯5 (○1) ¯1.5 ←→ 0 5 ¯5 3 ¯2
  monad:Z.floor,
  // 3⌊5 ←→ 3
  // ⌊/⍬ ←→ ¯
  dyad:real((y,x)=>Math.min(y,x))
}))

voc['⌈']=withId(-Infinity,perv({
  // ⌈123   ←→ 123
  // ⌈12.3  ←→ 13
  // ⌈¯12.3 ←→ ¯12
  // ⌈¯123  ←→ ¯123
  // ⌈'a'   !!! DOMAIN ERROR
  // ⌈12j3      ←→ 12j3
  // ⌈1.2j2.3   ←→ 1j3
  // ⌈1.2j¯2.3  ←→ 1j¯2
  // ⌈¯1.2j2.3  ←→ ¯1j3
  // ⌈¯1.2j¯2.3 ←→ ¯1j¯2
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
voc._fork1=(h,g)=>{
  asrt(typeof h==='function')
  asrt(typeof g==='function')
  return[h,g]
}
voc._fork2=(hg,f)=>{
  var h=hg[0],g=hg[1]
  asrt(typeof h==='function')
  return(b,a)=>g(h(b,a),f(b,a))
}

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
voc['⍕']=(om,al)=>{al&&nyiErr();var t=format(om);return new A(t.join(''),[t.length,t[0].length])}

// Format an APL object as an array of strings
const format=a=>{
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
      var left =repeat(' ',c.leftMargin +(t.align==='right')*(c.width-t[0].length))
      var right=repeat(' ',c.rightMargin+(t.align!=='right')*(c.width-t[0].length))
      for(var k=0;k<t.length;k++)t[k]=left+t[k]+right
      var bottom=repeat(' ',t[0].length)
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
// ⍋"ZAMBIA"                    ←→ 1 5 3 4 2 0
// s←"ZAMBIA" ⋄ s[⍋s]           ←→ 'AABIMZ'
// t←3 3⍴"BOBALFZAK" ⋄ ⍋t       ←→ 1 0 2
// t←3 3⍴4 5 6 1 1 3 1 1 2 ⋄ ⍋t ←→ 2 1 0
// t←3 3⍴4 5 6 1 1 3 1 1 2 ⋄ t[⍋t;] ←→ 3 3⍴ 1 1 2 1 1 3 4 5 6
// a←3 2 3⍴2 3 4 0 1 0 1 1 3 4 5 6 1 1 2 10 11 12 ⋄ a[⍋a;;] ←→ 3 2 3⍴1 1 2 10 11 12 1 1 3 4 5 6 2 3 4 0 1 0
// a←3 2 5⍴"joe  doe  bob  jonesbob  zwart"  ⋄  a[⍋a;;] ←→ 3 2 5 ⍴ 'bob  jonesbob  zwartjoe  doe  '
// "ZYXWVUTSRQPONMLKJIHGFEDCBA"⍋"ZAMBIA" ←→ 0 2 4 3 1 5
// ⎕A←"ABCDEFGHIJKLMNOPQRSTUVWXYZ" ⋄ (⌽⎕A)⍋3 3⍴"BOBALFZAK" ←→ 2 0 1
// a←6 4⍴"ABLEaBLEACREABELaBELACES" ⋄ a[(2 26⍴"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")⍋a;] ←→ 6 4⍴'ABELaBELABLEaBLEACESACRE'
// a←6 4⍴"ABLEaBLEACREABELaBELACES" ⋄ a[("AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz")⍋a;] ←→ 6 4⍴'ABELABLEACESACREaBELaBLE'
// ⍋0 1 2 3 4 3 6 6 4 9 1 11 12 13 14 15 ←→ 0 1 10 2 3 5 4 8 6 7 9 11 12 13 14 15
voc['⍋']=(om,al)=>grade(om,al,1),

// ⍒3 1 8 ←→ 2 0 1
voc['⍒']=(om,al)=>grade(om,al,-1)

// Helper for ⍋ and ⍒
const grade=(om,al,direction)=>{
  var h={} // maps a character to its index in the collation
  if(al){
    al.shape.length||rnkErr()
    each(al,(x,indices)=>{typeof x==='string'||domErr();h[x]=indices[indices.length-1]})
  }
  om.shape.length||rnkErr()
  var r=[];for(var i=0;i<om.shape[0];i++)r.push(i)
  return new A(r.sort((i,j)=>{
    var p=om.offset,indices=repeat([0],om.shape.length)
    while(1){
      var x=om.data[p+i*om.stride[0]],tx=typeof x
      var y=om.data[p+j*om.stride[0]],ty=typeof y
      if(tx<ty)return-direction
      if(tx>ty)return direction
      if(h[x]!=null)x=h[x]
      if(h[y]!=null)y=h[y]
      if(x<y)return-direction
      if(x>y)return direction
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
    // "GORSUCH"⍳"S"                           ←→ 3
    // "ABCDEFGHIJKLMNOPQRSTUVWXYZ"⍳"CARP"     ←→ 2 0 17 15
    // "ABCDEFGHIJKLMNOPQRSTUVWXYZ"⍳"PORK PIE" ←→ 15 14 17 10 26 15 8 4
    // "MON" "TUES" "WED"⍳"MON" "THURS"        ←→ 0 3
    // 1 3 2 0 3⍳⍳5                            ←→ 3 0 2 1 5
    // "CAT" "DOG" "MOUSE"⍳"DOG" "BIRD"        ←→ 1 3
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
      return rank.length===1?rank[0]:new A(rank)
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
    if(m===1){data=r}else{data=Array(n);for(var i=0;i<n;i++)data[i]=new A(r.slice(m*i,m*i+m))}
    return new A(data,a)
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
  if(axes==null){
    axes=[];for(var i=0;i<om.shape.length;i++)axes.push(i)
  }else{
    axes=getAxisList(axes,om.shape.length)
  }
  if(isSimple(om))return om
  var unitShape =axes.map(k=>om.shape [k])
  var unitStride=axes.map(k=>om.stride[k])
  var resultAxes=[];for(var k=0;k<om.shape.length;k++)axes.indexOf(k)<0&&resultAxes.push(k)
  var shape =resultAxes.map(k=>om.shape [k])
  var stride=resultAxes.map(k=>om.stride[k])
  var data=[]
  each(new A(om.data,shape,stride,om.offset),(x,indices,p)=>{data.push(new A(om.data,unitShape,unitStride,p))})
  return new A(data,shape)
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
    readline('      ',line=>{callback(exec(toSimpleString(new A(line))))})
  }
})
voc['set_⎕']=x=>{
  var s=format(x).join('\n')+'\n'
  if(typeof window!=='undefined'&&typeof window.alert==='function'){window.alert(s)}else{process.stdout.write(s)}
  return x
}
voc['get_⍞']=cps((_,_1,_2,callback)=>{
  if(typeof window!=='undefined'&&typeof window.prompt==='function'){
    setTimeout(_=>{callback(new A(prompt('')||''))},0)
  }else{
    readline('',line=>{callback(new A(line))})
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

voc['⎕DL']=cps((om,al,_,callback)=>{var t0=+new Date;setTimeout(_=>{callback(new A([new Date-t0]))},unwrap(om))})

// 'b(c+)d'⎕RE'abcd' ←→ 1 'bcd' (,'c')
// 'B(c+)d'⎕RE'abcd' ←→ ⍬
// 'a(b'   ⎕RE'c'           !!! DOMAIN ERROR
voc['⎕RE']=(om,al)=>{
  var x=toSimpleString(al),y=toSimpleString(om)
  try{var re=RegExp(x)}catch(e){domErr(e.toString())}
  var m=re.exec(y)
  if(!m)return A.zilde
  var r=[m.index];for(var i=0;i<m.length;i++)r.push(new A(m[i]||''))
  return new A(r)
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

// n←100 ⋄ (+/n?n)=(+/⍳n) ←→ 1 # a permutation (an "n?n" dealing) contains all 0...n
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
  for(var i=0;i<al;i++){var j=i+Math.floor(Math.random()*(om-i));h=r[i];r[i]=r[j];r[j]=h}
  return new A(r.slice(0,al))
}

// ↗'CUSTOM ERROR' !!! CUSTOM ERROR
voc['↗']=om=>err(om.toString())

voc['⍴']=(om,al)=>{
  if(al){
    // ⍴1 2 3⍴0  ←→ 1 2 3
    // ⍴⍴1 2 3⍴0 ←→ ,3
    // 3 3⍴⍳4    ←→ 3 3⍴0 1 2 3 0 1 2 3 0
    // ⍴3 3⍴⍳4   ←→ 3 3
    // ⍬⍴123     ←→ 123
    // ⍬⍴⍬       ←→ 0
    // 2 3⍴⍬     ←→ 2 3⍴0
    // 2 3⍴⍳7    ←→ 2 3⍴0 1 2 3 4 5
    al.shape.length<=1||rnkErr()
    var a=toArray(al),n=prod(a)
    for(var i=0;i<a.length;i++)isInt(a[i],0)||domErr
    if(!n){
      return new A([],a)
    }else if(a.length>=om.shape.length&&arrEq(om.shape,a.slice(a.length-om.shape.length))){
      // If ⍺ is only prepending axes to ⍴⍵, we can reuse the .data array
      return new A(om.data,a,repeat([0],a.length-om.shape.length).concat(om.stride),om.offset)
    }else{
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
      return new A(data,a)
    }
  }else{
    // ⍴0       ←→ 0⍴0
    // ⍴0 0     ←→ 1⍴2
    // ⍴⍴0      ←→ 1⍴0
    // ⍴⍴⍴0     ←→ 1⍴1
    // ⍴⍴⍴0 0   ←→ 1⍴1
    // ⍴'a'     ←→ 0⍴0
    // ⍴'ab'    ←→ 1⍴2
    // ⍴2 3 4⍴0 ←→ 2 3 4
    return new A(om.shape)
  }
}

voc['⌽']=(om,al,axis)=>{
  asrt(typeof axis==='undefined'||axis.isA)
  if(al){
    // 1⌽1 2 3 4 5 6             ←→ 2 3 4 5 6 1
    // 3⌽'ABCDEFGH'              ←→ 'DEFGHABC'
    // 3⌽2 5⍴1 2 3 4 5 6 7 8 9 0 ←→ 2 5⍴4 5 1 2 3 9 0 6 7 8
    // ¯2⌽"ABCDEFGH"             ←→ 'GHABCDEF'
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
    var data=[],shape=om.shape,stride=om.stride,p=om.offset,indices=repeat([0],shape.length)
    while(1){
      data.push(om.data[p+((indices[axis]+step)%shape[axis]-indices[axis])*stride[axis]])
      var a=shape.length-1
      while(a>=0&&indices[a]+1===shape[a]){p-=indices[a]*stride[a];indices[a--]=0}
      if(a<0)break
      indices[a]++;p+=stride[a]
    }
    return new A(data,shape)
  }else{
    // ⌽1 2 3 4 5 6                 ←→ 6 5 4 3 2 1
    // ⌽(1 2)(3 4)(5 6)             ←→ (5 6)(3 4)(1 2)
    // ⌽"BOB WON POTS"              ←→ 'STOP NOW BOB'
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
    var offset=om.offset+(om.shape[axis]-1)*om.stride[axis]
    return new A(om.data,om.shape,stride,offset)
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
      if(!om.shape.length)om=new A([unwrap(om)])
      axis=axis0?toInt(axis0):om.shape.length-1
      0<=axis&&axis<om.shape.length||rnkErr()
      var n,isNWise,isBackwards
      if(al){isNWise=1;n=toInt(al);if(n<0){isBackwards=1;n=-n}}else{n=om.shape[axis]}

      var shape=om.shape.slice(0);shape[axis]=om.shape[axis]-n+1
      var rShape=shape
      if(isNWise){
        if(!shape[axis])return new A([],rShape)
        shape[axis]>=0||lenErr()
      }else{
        rShape=rShape.slice(0);rShape.splice(axis,1)
      }

      if(empty(om)){
        var z=f.identity;z!=null||domErr();asrt(!z.shape.length)
        return new A(z.data,rShape,repeat([0],rShape.length),z.offset)
      }

      var data=[],indices=repeat([0],shape.length),p=om.offset
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
      return new A(data,rShape)
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
    om.shape.length||(om=new A([unwrap(om)]))
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
      var filler=getPrototype(om),p=om.offset,indices=repeat([0],shape.length)
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
    return new A(data,shape)
  }
})

// "a0 a1...⌷b" is equivalent to "b[a0;a1;...]"
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
    var u=a[i].isA?a[i]:new A([a[i]],[])
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
// " X"[(3 3⍴⍳9)∊1 3 6 7 8] ←→ 3 3⍴' X ','X  ','XXX'
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
  var h=toArray(args).map(x=>x.isA?x:new A([x],[]))
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
  var subs=voc['⌷'](voc['⍳'](new A(om.shape)),al,new A(axes))
  if(isSingleton(value))value=new A([value],subs.shape,repeat([0],subs.shape.length))
  var data=toArray(om),stride=strideForShape(om.shape)
  each2(subs,value,(u,v)=>{
    if(v.isA&&!v.shape.length)v=unwrap(v)
    if(u.isA){
      var p=0,ua=toArray(u)
      for(var i=0;i<ua.length;i++)p+=ua[i]*stride[i]
      data[p]=v
    }else{
      data[u]=v
    }
  })
  return new A(data,om.shape)
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
    var offset=om.offset+u[0]*om.stride[ax]
    return new A(om.data,shape,stride,offset)
  }else{
    var shape1=om.shape.slice(0);shape1.splice(ax,1)
    var stride1=om.stride.slice(0);stride1.splice(ax,1)
    var data=[]
    each(sub,x=>{
      var chunk=new A(om.data,shape1,stride1,om.offset+x*om.stride[ax])
      data.push.apply(data,toArray(chunk))
    })
    var shape = shape1.slice(0)
    var stride = strideForShape(shape)
    shape.splice.apply(shape,[ax, 0].concat(sub.shape))
    var subStride = strideForShape (sub.shape)
    var k=prod(shape1)
    for(var i=0;i<subStride.length;i++)subStride[i]*=k
    stride.splice.apply(stride,[ax,0].concat(subStride))
    return new A(data,shape,stride)
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
// 5↑"abc"          ←→ 'abc  '
// ¯5↑"abc"         ←→ '  abc'
// 3 3↑1 1⍴"a"      ←→ 3 3⍴'a        '
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
  if(!om.shape.length)om=new A([unwrap(om)],al.shape.length?repeat([1],al.shape[0]):[1])
  var a=toArray(al)
  a.length<=om.shape.length||rnkErr()
  for(var i=0;i<a.length;i++)typeof a[i]==='number'&&a[i]===Math.floor(a[i])||domErr()
  var mustCopy=0,shape=om.shape.slice(0)
  for(var i=0;i<a.length;i++){shape[i]=Math.abs(a[i]);if(shape[i]>om.shape[i])mustCopy=1}
  if(mustCopy){
    var stride=Array(shape.length);stride[stride.length-1]=1
    for(var i=stride.length-2;i>=0;i--)stride[i]=stride[i+1]*shape[i+1]
    var data=repeat([getPrototype(om)],prod(shape))
    var copyShape=shape.slice(0),p=om.offset,q=0
    for(var i=0;i<a.length;i++){
      var x=a[i];copyShape[i]=Math.min(om.shape[i],Math.abs(x))
      if(x<0){if(x<-om.shape[i]){q-=(x+om.shape[i])*stride[i]}else{p+=(x+om.shape[i])*om.stride[i]}}
    }
    if(prod(copyShape)){
      var copyIndices=repeat([0],copyShape.length)
      while(1){
        data[q]=om.data[p];axis=copyShape.length-1
        while(axis>=0&&copyIndices[axis]+1===copyShape[axis]){
          p-=copyIndices[axis]*om.stride[axis];q-=copyIndices[axis]*stride[axis];copyIndices[axis--]=0
        }
        if(axis<0)break
        p+=om.stride[axis];q+=stride[axis];copyIndices[axis]++
      }
    }
    return new A(data,shape,stride)
  }else{
    var offset=om.offset;for(var i=0;i<a.length;i++)if(a[i]<0)offset+=(om.shape[i]+a[i])*om.stride[i]
    return new A(om.data,shape,om.stride,offset)
  }
}

// ↑(1 2 3)(4 5 6) ←→ 1 2 3
// ↑(1 2)(3 4 5)   ←→ 1 2
// ↑'AB'           ←→ 'A'
// ↑123            ←→ 123
// ↑⍬              ←→ 0
//! ↑''             ←→ ' '
const first=x=>{var y=empty(x)?getPrototype(x):x.data[x.offset];return y.isA?y:new A([y],[])}

voc['⍉']=(om,al)=>{
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
    al.shape.length||(al=new A([unwrap(al)]))
    var n=om.shape.length
    al.shape[0]===n||lenErr()
    var shape=[],stride=[],a=toArray(al)
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
    return new A(om.data,shape,stride,om.offset)
  }else{
    // ⍉2 3⍴1 2 3 6 7 8  ←→ 3 2⍴1 6 2 7 3 8
    // ⍴⍉2 3⍴1 2 3 6 7 8 ←→ 3 2
    // ⍉1 2 3            ←→ 1 2 3
    // ⍉2 3 4⍴⍳24        ←→ 4 3 2⍴0 12 4 16 8 20 1 13 5 17 9 21 2 14 6 18 10 22 3 15 7 19 11 23
    // ⍉⍬                ←→ ⍬
    // ⍉''               ←→ ''
    return new A(om.data,reversed(om.shape),reversed(om.stride),om.offset)
  }
}

//  ({1}⍠{2})0 ←→ 1
// 0({1}⍠{2})0 ←→ 2
voc['⍠']=conj((f,g)=>{
  asrt(typeof f==='function')
  asrt(typeof g==='function')
  return(om,al,axis)=>(al?f:g)(om,al,axis)
})
const NOUN=1,VERB=2,ADV=3,CONJ=4
,exec=(s,o)=>{ // s:APL code, o:options
  o=o||{}
  var ast=parse(s,o),code=compileAST(ast,o),env=[prelude.env[0].slice(0)]
  for(var k in ast.vars)env[0][ast.vars[k].slot]=o.ctx[k]
  var r=vm({code:code,env:env})
  for(var k in ast.vars){
    var v=ast.vars[k],x=o.ctx[k]=env[0][v.slot]
    if(v.ctg===ADV)x.adv=1
    if(v.ctg===CONJ)x.conj=1
  }
  return r
}
,repr=x=>x===null||['string','number','boolean'].indexOf(typeof x)>=0?JSON.stringify(x):
         x instanceof Array?'['+x.map(repr).join(',')+']':
         x.repr?x.repr():'{'+Object.keys(x).map(k=>repr(k)+':'+repr(x[k])).join(',')+'}'
,compileAST=(ast,o)=>{
  o=o||{}
  ast.scopeDepth=0
  ast.nSlots=prelude?prelude.nSlots:0
  ast.vars=prelude?Object.create(prelude.vars):{}
  o.ctx=o.ctx||Object.create(voc)
  for(var key in o.ctx)if(!ast.vars[key]){
    const value=o.ctx[key]
    const varInfo=ast.vars[key]={ctg:NOUN,slot:ast.nSlots++,scopeDepth:ast.scopeDepth}
    if(typeof value==='function'||value instanceof Proc){
      varInfo.ctg=value.adv?ADV:value.conj?CONJ:VERB
      if(/^[gs]et_.*/.test(key))ast.vars[key.slice(4)]={ctg:NOUN}
    }
  }
  const err=(node,message)=>{synErr({message:message,file:o.file,offset:node.offset,aplCode:o.aplCode})}
  asrt(VERB<ADV&&ADV<CONJ)//we are relying on this ordering below
  const ctgriseLambdas=node=>{
    switch(node[0]){
      case'B':case':':case'←':case'[':case'{':case'.':case'⍬':
        var r=VERB;for(var i=1;i<node.length;i++)if(node[i])r=Math.max(r,ctgriseLambdas(node[i]))
        if(node[0]==='{'){node.ctg=r;return VERB}else{return r}
      case'S':case'N':case'J':return 0
      case'X':var s=node[1];return s==='⍺⍺'||s==='⍶'||s==='∇∇'?ADV:s==='⍵⍵'||s==='⍹'?CONJ:VERB
      default:asrt(0)
    }
  }
  ctgriseLambdas(ast)
  var queue=[ast] // accumulates"body"nodes we encounter on the way
  while(queue.length){
    var scopeNode=queue.shift(),vars=scopeNode.vars
    const visit=node=>{
      node.scopeNode=scopeNode
      switch(node[0]){
        case':':var r=visit(node[1]);visit(node[2]);return r
        case'←':return visitLHS(node[1],visit(node[2]))
        case'X':
          var name=node[1],v=vars['get_'+name],r
          if(v&&v.ctg===VERB){
            return NOUN
          }else{
            // x ⋄ x←0 !!! VALUE ERROR
            return vars[name]&&vars[name].ctg||
              valErr('Symbol '+name+' is referenced before assignment.',
                {file:o.file,offset:node.offset,aplCode:o.aplCode})
          }
        case'{':
          for(var i=1;i<node.length;i++){
            var d,v
            queue.push(extend(node[i],{
              scopeNode:scopeNode,
              scopeDepth:d=scopeNode.scopeDepth+1+(node.ctg!==VERB),
              nSlots:4,
              vars:v=extend(Object.create(vars),{
                '⍵':{slot:0,scopeDepth:d,ctg:NOUN},
                '∇':{slot:1,scopeDepth:d,ctg:VERB},
                '⍺':{slot:2,scopeDepth:d,ctg:NOUN},
                // slot 3 is reserved for a "base pointer"
                '⍫':{       scopeDepth:d,ctg:VERB}
              })
            }))
            if(node.ctg===CONJ){
              v['⍵⍵']=v['⍹']={slot:0,scopeDepth:d-1,ctg:VERB}
              v['∇∇']=       {slot:1,scopeDepth:d-1,ctg:CONJ}
              v['⍺⍺']=v['⍶']={slot:2,scopeDepth:d-1,ctg:VERB}
            }else if(node.ctg===ADV){
              v['⍺⍺']=v['⍶']={slot:0,scopeDepth:d-1,ctg:VERB}
              v['∇∇']=       {slot:1,scopeDepth:d-1,ctg:ADV}
            }
          }
          return node.ctg||VERB
        case'S':case'N':case'J':case'⍬':return NOUN
        case'[':
          for(var i=2;i<node.length;i++)if(node[i]&&visit(node[i])!==NOUN)err(node,'Indices must be nouns.')
          return visit(node[1])
        case'.':
          var a=node.slice(1),h=Array(a.length)
          for(var i=a.length-1;i>=0;i--)h[i]=visit(a[i])
          // Form vectors from sequences of data
          var i=0
          while(i<a.length-1){
            if(h[i]===NOUN&&h[i+1]===NOUN){
              var j=i+2;while(j<a.length&&h[j]===NOUN)j++
              a.splice(i,j-i,['V'].concat(a.slice(i,j)))
              h.splice(i,j-i,NOUN)
            }else{
              i++
            }
          }
          // Apply adverbs and conjunctions
          // ⌽¨⍣3⊢(1 2)3(4 5 6) ←→ (2 1)3(6 5 4)
          var i=0
          while(i < a.length){
            if(h[i]===VERB&&i+1<a.length&&h[i+1]===ADV){
              a.splice(i,2,['A'].concat(a.slice(i,i+2)))
              h.splice(i,2,VERB)
            }else if((h[i]===NOUN||h[i]===VERB||h[i]===CONJ)&&i+2<a.length&&h[i+1]===CONJ&&(h[i+2]===NOUN||h[i+2]===VERB)){
              // allow conjunction-conjunction-something to accommodate ∘.f syntax
              a.splice(i,3,['C'].concat(a.slice(i,i+3)))
              h.splice(i,3,VERB)
            }else{
              i++
            }
          }
          // Atops
          if(h.length===2&&h[0]!==NOUN&&h[1]!==NOUN){a=[['T'].concat(a)];h=[VERB]}
          // Forks
          if(h.length>=3&&h.length%2&&h.indexOf(NOUN)<0){a=[['F'].concat(a)];h=[VERB]}
          if(h[h.length-1]!==NOUN){
            if(h.length>1)err(a[h.length-1],'Trailing function in expression')
          }else{
            // Apply monadic and dyadic functions
            while(h.length>1){
              if(h.length===2||h[h.length-3]!==NOUN){
                a.splice(-2,9e9,['M'].concat(a.slice(-2)))
                h.splice(-2,9e9,NOUN)
              }else{
                a.splice(-3,9e9,['D'].concat(a.slice(-3)))
                h.splice(-3,9e9,NOUN)
              }
            }
          }
          node.splice(0,9e9,a[0])
          extend(node,a[0])
          return h[0]
      }
      asrt(0)
    }
    const visitLHS=(node,rhsCtg)=>{
      node.scopeNode=scopeNode
      switch(node[0]){
        case'X':
          var name=node[1];if(name==='∇'||name==='⍫')err(node,'Assignment to '+name+' is not allowed.')
          if(vars[name]){
            if(vars[name].ctg!==rhsCtg){
              err(node,'Inconsistent usage of symbol '+name+', it is assigned both nouns and verbs.')
            }
          }else{
            vars[name]={scopeDepth:scopeNode.scopeDepth,slot:scopeNode.nSlots++,ctg:rhsCtg}
          }
          break
        case'.':
          rhsCtg===NOUN||err(node,'Strand assignment can be used only for nouns.')
          for(var i=1;i<node.length;i++)visitLHS(node[i],rhsCtg)
          break
        case'[':
          rhsCtg===NOUN||err(node,'Indexed assignment can be used only for nouns.')
          visitLHS(node[1],rhsCtg);for(var i=2;i<node.length;i++)node[i]&&visit(node[i])
          break
        default:
          err(node,'Invalid LHS node type: '+JSON.stringify(node[0]))
      }
      return rhsCtg
    }
    for(var i=1;i<scopeNode.length;i++)visit(scopeNode[i])
  }
  const render=node=>{
    switch(node[0]){
      case'B':
        if(node.length===1){
          // {}0 ←→ ⍬
          return[LDC,A.zilde,RET]
        }else{
          var a=[];for(var i=1;i<node.length;i++){a.push.apply(a,render(node[i]));a.push(POP)}
          a[a.length-1]=RET
          return a
        }
      case':':var x=render(node[1]),y=render(node[2]);return x.concat(JEQ,y.length+2,POP,y,RET)
      case'←':
        // A←5     ←→ 5
        // A×A←2 5 ←→ 4 25
        return render(node[2]).concat(renderLHS(node[1]))
      case'X':
        // r←3 ⋄ get_c←{2×○r} ⋄ get_S←{○r*2} ⋄ before←.01×⌊100×r c S ⋄ r←r+1 ⋄ after←.01×⌊100×r c S ⋄ before after ←→ (3 18.84 28.27)(4 25.13 50.26)
        // {⍺}0 !!! VALUE ERROR
        // {x}0 ⋄ x←0 !!! VALUE ERROR
        // {⍫1⋄2}⍬ ←→ 1
        // c←{} ⋄ x←{c←⍫⋄1}⍬ ⋄ {x=1:c 2⋄x}⍬ ←→ 2
        var s=node[1],vars=node.scopeNode.vars,v
        return s==='⍫'?[CON]:
               (v=vars['get_'+s])&&v.ctg===VERB?[LDC,A.zero,GET,v.scopeDepth,v.slot,MON]:
                 [GET, vars[s].scopeDepth, vars[s].slot]
      case'{':
        // {1 + 1} 1                    ←→ 2
        // {⍵=0:1 ⋄ 2×∇⍵-1} 5           ←→ 32 # two to the power of
        // {⍵<2 : 1 ⋄ (∇⍵-1)+(∇⍵-2) } 8 ←→ 34 # Fibonacci sequence
        // ⊂{⍺⍺ ⍺⍺ ⍵}'hello'            ←→ ⊂⊂'hello'
        // ⊂{⍺⍺ ⍵⍵ ⍵}⌽'hello'           ←→ ⊂'olleh'
        // ⊂{⍶⍶⍵}'hello'                ←→ ⊂⊂'hello'
        // ⊂{⍶⍹⍵}⌽'hello'               ←→ ⊂'olleh'
        // +{⍵⍶⍵}10 20 30               ←→ 20 40 60
        // f←{⍵⍶⍵} ⋄ +f 10 20 30        ←→ 20 40 60
        // twice←{⍶⍶⍵} ⋄ *twice 2       ←→ 1618.1779919126539
        // f←{-⍵;⍺×⍵} ⋄ (f 5)(3 f 5)    ←→ ¯5 15
        // f←{;} ⋄ (f 5)(3 f 5)         ←→ ⍬⍬
        // ²←{⍶⍶⍵;⍺⍶⍺⍶⍵} ⋄ *²2          ←→ 1618.1779919126539
        // ²←{⍶⍶⍵;⍺⍶⍺⍶⍵} ⋄ 3*²2         ←→ 19683
        // H←{⍵⍶⍹⍵;⍺⍶⍹⍵} ⋄ +H÷ 2        ←→ 2.5
        // H←{⍵⍶⍹⍵;⍺⍶⍹⍵} ⋄ 7 +H÷ 2      ←→ 7.5
        // {;;}                         !!!
        var x=render(node[1])
        var lx=[LAM,x.length].concat(x)
        if(node.length===2){
          f=lx
        }else if(node.length===3){
          var y=render(node[2]),ly=[LAM,y.length].concat(y),v=node.scopeNode.vars['⍠']
          f=ly.concat(GET,v.scopeDepth,v.slot,lx,DYA)
        }else{
          err(node)
        }
        return node.ctg===VERB?f:[LAM,f.length+1].concat(f,RET)
      case'S':
        // ⍴''     ←→ ,0
        // ⍴'x'    ←→ ⍬
        // ⍴'xx'   ←→ ,2
        // ⍴'a''b' ←→ ,3
        // ⍴"a""b" ←→ ,3
        // ⍴'a""b' ←→ ,4
        // ⍴'''a'  ←→ ,2
        // ⍴'a'''  ←→ ,2
        // ''''    ←→ "'"
        // ⍴"\f\t\n\r\u1234\xff" ←→ ,18
        // "a      !!!
        var d=node[1][0] // the delimiter: " or '
        var s=node[1].slice(1,-1).replace(RegExp(d+d,'g'),d)
        return[LDC,new A(s,s.length===1?[]:[s.length])]
      case'N':
        // ∞ ←→ ¯
        // ¯∞ ←→ ¯¯
        // ¯∞j¯∞ ←→ ¯¯j¯¯
        // ∞∞ ←→ ¯ ¯
        // ∞¯ ←→ ¯ ¯
        var a=node[1].replace(/[¯∞]/g,'-').split(/j/i).map(x=>
          x==='-'?Infinity:x==='--'?-Infinity:x.match(/^-?0x/i)?parseInt(x,16):parseFloat(x)
        )
        var v=a[1]?new Z(a[0],a[1]):a[0]
        return[LDC,new A([v],[])]
      case'J':
        // 123 + «456 + 789» ←→ 1368
        var f=Function('return(_w,_a)=>('+node[1].replace(/^«|»$/g,'')+')')()
        return[EMB,(_w,_a)=>aplify(f(_w,_a))]
      case'[':
        // ⍴ x[⍋x←6?40] ←→ ,6
        var v=node.scopeNode.vars._index,axes=[],a=[],c
        for(var i=2;i<node.length;i++)if(c=node[i]){axes.push(i-2);a.push.apply(a,render(c))}
        a.push(VEC,axes.length,LDC,new A(axes),VEC,2,GET,v.scopeDepth,v.slot)
        a.push.apply(a,render(node[1]))
        a.push(DYA)
        return a
      case'V':
        var fragments=[],areAllConst=1
        for(var i=1;i<node.length;i++){
          var f=render(node[i]);fragments.push(f);if(f.length!==2||f[0]!==LDC)areAllConst=0
        }
        return areAllConst?[LDC,new A(fragments.map(f=>isSimple(f[1])?unwrap(f[1]):f[1]))]
                         :[].concat.apply([],fragments).concat([VEC,node.length-1])
      case'⍬':return[LDC,A.zilde]
      case'M':return render(node[2]).concat(render(node[1]),MON)
      case'A':return render(node[1]).concat(render(node[2]),MON)
      case'D':case'C':return render(node[3]).concat(render(node[2]),render(node[1]),DYA)
      case'T':
        var v=node.scopeNode.vars._atop
        return render(node[2]).concat(GET,v.scopeDepth,v.slot,render(node[1]),DYA)
      case'F':
        var u=node.scopeNode.vars._atop
        var v=node.scopeNode.vars._fork1
        var w=node.scopeNode.vars._fork2
        var i=node.length-1
        var r=render(node[i--])
        while(i>=2)r=r.concat(GET,v.scopeDepth,v.slot,render(node[i--]),DYA,
                              GET,w.scopeDepth,w.slot,render(node[i--]),DYA)
        return i?r.concat(render(node[1]),GET,u.scopeDepth,u.slot,DYA):r
      default:asrt(0)
    }
  }
  const renderLHS=node=>{
    switch(node[0]){
      case'X':
        var name=node[1],vars=node.scopeNode.vars,v=vars['set_'+name]
        return v&&v.ctg===VERB?[GET,v.scopeDepth,v.slot,MON]:[SET,vars[name].scopeDepth,vars[name].slot]
      case'.': // strand assignment
        // (a b) ← 1 2 ⋄ a           ←→ 1
        // (a b) ← 1 2 ⋄ b           ←→ 2
        // (a b) ← +                 !!!
        // (a b c) ← 3 4 5 ⋄ a b c   ←→ 3 4 5
        // (a b c) ← 6     ⋄ a b c   ←→ 6 6 6
        // (a b c) ← 7 8   ⋄ a b c   !!!
        // ((a b)c)←3(4 5) ⋄ a b c   ←→ 3 3 (4 5)
        var n=node.length-1,a=[SPL,n]
        for(var i=1;i<node.length;i++){a.push.apply(a,renderLHS(node[i]));a.push(POP)}
        return a
      case'[': // indexed assignment
        var axes=[],a=[],v=node.scopeNode.vars._substitute
        for(var i=2;i<node.length;i++)if(node[i]){axes.push(i-2);a.push.apply(a,render(node[i]))}
        a.push(VEC,axes.length)
        a.push.apply(a,render(node[1]))
        a.push(LDC,new A(axes),VEC,4,GET,v.scopeDepth,v.slot,MON)
        a.push.apply(a,renderLHS(node[1]))
        return a
    }
    asrt(0)
  }
  return render(ast)
}
,aplify=x=>{
  if(typeof x==='string')return x.length===1?A.scalar(x):new A(x)
  if(typeof x==='number')return A.scalar(x)
  if(x instanceof Array)return new A(x.map(y=>{y=aplify(y);return y.shape.length?y:unwrap(y)}))
  if(x.isA)return x
  err('Cannot aplify object:'+x)
}
var prelude
;(_=>{
  const ast=parse(preludeSrc)
  const code=compileAST(ast) //creates ast.vars as a side effect
  const vars={};for(var k in ast.vars)vars[k]=ast.vars[k] //flatten prototype chain
  prelude={code:code,nSlots:ast.nSlots,vars:vars}

  var env=prelude.env=[[]]
  for(var k in prelude.vars)env[0][prelude.vars[k].slot]=voc[k]
  vm({code:prelude.code,env:env})
  for(var k in prelude.vars)voc[k]=env[0][prelude.vars[k].slot]
})()
var apl=this.apl=(s,o)=>apl.ws(o)(s) // s:apl code; o:options
extend(apl,{format:format,approx:approx,parse:parse,compileAST:compileAST,repr:repr})
apl.ws=opts=>{
  opts=opts||{}
  ctx=Object.create(voc)
  if(opts.in )ctx['get_⎕']=ctx['get_⍞']=_=>{var s=opts.in();asrt(typeof s==='string');return new A(s)}
  if(opts.out)ctx['set_⎕']=ctx['set_⍞']=x=>{opts.out(format(x).join('\n')+'\n')}
  return aplCode=>exec(aplCode,{ctx:ctx})
}
const readline=(prompt,f)=>{
  ;(readline.requesters=readline.requesters||[]).push(f)
  var rl=readline.rl
  if(!rl){
    rl=readline.rl=require('readline').createInterface(process.stdin,process.stdout)
    rl.on('line',x=>{var h=readline.requesters.pop();h&&h(x)})
    rl.on('close',_=>{process.stdout.write('\n');process.exit(0)})
  }
  rl.setPrompt(prompt);rl.prompt()
}
if(typeof module!=='undefined'){
  module.exports=apl
  if(module===require.main)(_=>{
    var usage='Usage: apl.js [options] [filename.apl]\n'+
              'Options:\n'+
              '  -l --linewise   Process stdin line by line and disable prompt\n'
    var file,linewise
    process.argv.slice(2).forEach(arg=>{
      if(arg==='-h'||arg==='--help'){process.stderr.write(usage);process.exit(0)}
      else if(arg==='-l'||arg=='--linewise')linewise=1
      else if(arg[0]==='-'){process.stderr.write('unrecognized option:'+arg+'\n'+usage);process.exit(1)}
      else if(file){process.stderr.write(usage);process.exit(1)}
      else file=arg
    })
    if(file){
      exec(require('fs').readFileSync(file,'utf8'))
    }else if(linewise){
      var fs=require('fs'),ws=apl.ws(),a=Buffer(256),i=0,n=0,b=Buffer(a.length),k
      while(k=fs.readSync(0,b,0,b.length)){
        if(n+k>a.length)a=Buffer.concat([a,a])
        b.copy(a,n,0,k);n+=k
        while(i<n){
          if(a[i]===10){ // '\n'
            var r;try{r=format(ws(''+a.slice(0,i))).join('\n')+'\n'}catch(e){r=e+'\n'}
            process.stdout.write(r);a.copy(a,0,i+1);n-=i+1;i=0
          }else{
            i++
          }
        }
      }
    }else if(!require('tty').isatty()){
      var fs=require('fs'),b=Buffer(1024),n=0,k
      while(k=fs.readSync(0,b,n,b.length-n)){n+=k;n===b.length&&b.copy(b=Buffer(2*n))} // read all of stdin
      exec(b.toString('utf8',0,n))
    }else{
      const ws=apl.ws(),out=process.stdout
      const f=s=>{
        try{s.match(/^[\ \t\f\r\n]*$/)||out.write(format(ws(s)).join('\n')+'\n')}catch(e){out.write(e+'\n')}
        readline('      ',f)
      }
      f('')
    }
  })()
}
