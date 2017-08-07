//usr/bin/env node "$0" $@;exit $?
"use strict";
var preludeSrc="⍬←() ⍝ ⍬←→0⍴0 ⍙ ⍴⍬←→,0\n⎕a←'ABCDEFGHIJKLMNOPQRSTUVWXYZ'\n⎕á←'ÁÂÃÇÈÊËÌÍÎÏÐÒÓÔÕÙÚÛÝþãìðòõ'\n⎕d←'0123456789'\n\n~←~⍠{(~⍺∊⍵)/⍺}\n⍝ 'abcd'~'bde'←→'ac'\n⍝ 1 2 3 4 5 6~2 4 6←→1 3 5\n⍝ 'ab' 'cd' 'ad'~'a'←→'ab' 'cd' 'ad'\n⍝ 'ab' 'cd' 'ad'~'cd'←→'ab' 'cd' 'ad'\n⍝ 'ab' 'cd' 'ad'~⊂'cd'←→'ab' 'ad'\n⍝ 'ab' 'cd' 'ad'~'a' 'cd'←→'ab' 'ad'\n⍝ 11 12 13 14 15 16~2 3⍴1 2 3 14 5 6←→11 12 13 15 16\n⍝ (2 2⍴⍳4)~2 !!! RANK ERROR\n\n_atop←{⍶⍹⍵;⍶⍺⍹⍵} ⍝ (-⍟)2 3←→-⍟2 3 ⍙ 2(-*)3←→-2*3\n\n⊃←{\n  0=⍴⍴⍵:↑⍵\n  0=×/⍴⍵:⍵\n  shape←⍴⍵ ⋄ ⍵←,⍵\n  r←⌈/≢¨shapes←⍴¨⍵ ⍝ maximum rank of all shapes\n  max←↑⌈/shapes←(⍴ ↓ (r⍴1)∘,)¨shapes ⍝ maximum shape of rank adjusted shapes\n  (shape,max)⍴↑⍪/shapes{max↑⍺⍴⍵}¨⍵\n  ;\n  1<⍴⍴⍺:↗'RANK ERROR'\n  x←⍵\n  {\n    1<⍴⍴⍵:↗'RANK ERROR'\n    ⍵←,⍵\n    (⍴⍵)≠⍴⍴x:↗'RANK ERROR'\n    ∨/⍵≥⍴x:↗'INDEX ERROR'\n    x←⊃⍵⌷x\n  }¨⍺\n  x\n}\n⍝ ⊃3←→3 ⍙ ⊃(1 2)(3 4)←→2 2⍴1 2 3 4 ⍙ ⊃(1 2)(3 4 5)←→2 3⍴1 2 0 3 4 5 ⍙ ⊃1 2←→1 2 ⍙ ⊃(1 2)3←→2 2⍴1 2 3 0\n⍝ ⊃1(2 3)←→2 2⍴1 0 2 3 ⍙ ⊃2 2⍴1(1 1 2⍴3 4)(5 6)(2 0⍴0)←→2 2 1 2 2⍴1 0 0 0 3 4 0 0 5 6 0 0 0 0 0 0 ⍙ ⊃⍬←→⍬\n⍝ ⊃2 3 0⍴0←→2 3 0⍴0 ⍙ ⍬⊃3←→3 ⍙ 2⊃'pick'←→'c' ⍙ (⊂1 0)⊃2 2⍴'abcd'←→'c' ⍙ 1⊃'foo' 'bar'←→'bar' ⍙ 1 2⊃'foo' 'bar'←→'r'\n⍝ (2 2⍴0)⊃1 2 !!! RANK ERROR ⍙ (⊂2 1⍴0)⊃2 2⍴0 !!! RANK ERROR ⍙ (⊂2 2⍴0)⊃1 2 !!! RANK ERROR\n⍝ (⊂2 2)⊃1 2 !!! RANK ERROR ⍙ (⊂0 2)⊃2 2⍴'ABCD' !!! INDEX ERROR\n\n⊂←⊂⍠{\n  1<⍴⍴⍺:↗'RANK ERROR' ⋄ 1≠⍴⍴⍵:↗'NONCE ERROR' ⋄ ⍺←,⍺=0\n  keep←~1 1⍷⍺ ⋄ sel←keep/⍺ ⋄ dat←keep/⍵\n  {1=1↑sel:{sel←1↓sel ⋄ dat←1↓dat}⍬}⍬\n  {1=¯1↑sel:{sel←¯1↓sel ⋄ dat←¯1↓dat}⍬}⍬\n  sel←(⍴sel),⍨sel/⍳⍴sel ⋄ drop←0\n  sel{∆←drop↓⍺↑⍵ ⋄ drop←⍺+1 ⋄ ∆}¨⊂dat\n}\n⍝ a←' this is a test ' ⋄ (a≠' ')⊂a←→'this' 'is' (,'a') 'test'\n\n↓←{\n  0=⍴⍴⍵:⍵ ⋄ ⊂[¯1+⍴⍴⍵]⍵\n  ;\n  1<⍴⍴⍺:↗'RANK ERROR'\n  a←,⍺\n  ⍵←{0=⍴⍴⍵:((⍴a)⍴1)⍴⍵⋄⍵}⍵\n  (⍴a)>⍴⍴⍵:↗'RANK ERROR'\n  a←(⍴⍴⍵)↑a\n  a←((a>0)×0⌊a-⍴⍵)+(a≤0)×0⌈a+⍴⍵\n  a↑⍵\n}\n⍝ ↓1 2 3←→⊂1 2 3 ⍙ ↓(1 2)(3 4)←→⊂(1 2)(3 4) ⍙ ↓2 2⍴⍳4←→(0 1)(2 3)\n⍝ ↓2 3 4⍴⍳24←→2 3⍴(0 1 2 3)(4 5 6 7)(8 9 10 11)(12 13 14 15)(16 17 18 19)(20 21 22 23)\n⍝ 2↓'abc'←→,'c' ⍙ ¯1↓'abc'←→'ab' ⍙ 5↓'abc'←→'' ⍙ 0 ¯2↓3 3⍴⎕a←→3 1⍴'ADG' ⍙ ¯2 ¯1↓3 3⍴⎕a←→1 2⍴'AB' ⍙ 1↓3 3⍴⎕a←→2 3⍴'DEFGHI'\n⍝ ⍬↓3 3⍴⍳9←→3 3⍴⍳9 ⍙ 1 1↓2 3 4⍴⎕a←→1 2 4⍴'QRSTUVWX' ⍙ ¯1 ¯1↓2 3 4⍴⎕a←→1 2 4⍴'ABCDEFGH'\n⍝ 1↓0←→⍬ ⍙ 0 1↓2←→1 0⍴0 ⍙ 1 2↓3←→0 0⍴0 ⍙ ⍬↓0←→0\n\n⍪←{(≢⍵)(×/1↓⍴⍵)⍴⍵; ⍺,[0]⍵}\n⍝ ⍪2 3 4←→3 1⍴2 3 4 ⍙ ⍪0←→1 1⍴0 ⍙ ⍪2 2⍴2 3 4 5←→2 2⍴2 3 4 5 ⍙ ⍴⍪2 3⍴⍳6←→2 3 ⍙ ⍴⍪2 3 4⍴⍳24←→2 12\n⍝ (2 3⍴⍳6)⍪9←→3 3⍴0 1 2 3 4 5 9 9 9 ⍙ 1⍪2←→1 2\n\n⊢←{⍵}   ⍝ 1⊢2←→2 ⍙ ⊢3←→3\n⊣←{⍵;⍺} ⍝ 1⊣2←→1 ⍙ ⊣3←→3\n≢←{⍬⍴(⍴⍵),1; ~⍺≡⍵} ⍝ ≢0←→1 ⍙ ≢0 0←→2 ⍙ ≢⍬←→0 ⍙ ≢2 3⍴⍳6←→2 ⍙ 2≢2←→0\n,←{(×/⍴⍵)⍴⍵}⍠, ⍝ ,2 13⍴⎕a←→⎕a ⍙ ,1←→1⍴1\n\n⌹←{\n  norm←{(⍵+.×+⍵)*0.5}\n\n  QR←{ ⍝ QR decomposition\n    n←(⍴⍵)[1]\n    1≥n:{t←norm,⍵ ⋄ (⍵÷t)(⍪t)}⍵\n    m←⌈n÷2\n    a0←((1↑⍴⍵),m)↑⍵\n    a1←(0,m)↓⍵\n    (q0 r0)←∇a0\n    c←(+⍉q0)+.×a1\n    (q1 r1)←∇a1-q0+.×c\n    (q0,q1)((r0,c)⍪((⌊n÷2),-n)↑r1)\n  }\n\n  Rinv←{ ⍝ Inverse of an upper triangular matrix\n    1=n←1↑⍴⍵:÷⍵\n    m←⌈n÷2\n    ai←∇(m,m)↑⍵\n    di←∇(m,m)↓⍵\n    b←(m,m-n)↑⍵\n    bx←-ai+.×b+.×di\n    (ai,bx)⍪((⌊n÷2),-n)↑di\n  }\n\n  0=⍴⍴⍵:÷⍵\n  1=⍴⍴⍵:,∇⍪⍵\n  2≠⍴⍴⍵:↗'RANK ERROR'\n  0∊≥/⍴⍵:↗'LENGTH ERROR'\n  (Q R)←QR ⍵\n  (Rinv R)+.×+⍉Q\n  ;\n  (⌹⍵)+.×⍺\n}\n⍝ ⌹2←→.5 ⍙ ⌹2 2⍴4 3 3 2←→2 2⍴¯2 3 3 ¯4 ⍙ ⌹2 2 2⍴⍳8 !!! RANK ERROR ⍙ ⌹2 3⍴⍳6 !!! LENGTH ERROR\n⍝ (4 4⍴12 1 4 10 ¯6 ¯5 4 7 ¯4 9 3 4 ¯2 ¯6 7 7)⌹93 81 93.5 120.5←→.0003898888816687221 ¯.005029566573526544 .04730651764247189 .0705568912859835\n\n⍨←{⍵⍶⍵;⍵⍶⍺} ⍝ 17-⍨23←→6 ⍙ 7⍴⍨2 3←→2 3⍴7 ⍙ +⍨2←→4 ⍙ -⍨123←→0\n";
const A=(a,s)=>{s&&asrt(a.length===prd(s));return{isA:1,a:a,s:s||[a.length]}}
,strideForShape=s=>{
  asrt(s.length!=null)
  let r=Array(s.length),u=1
  for(let i=r.length-1;i>=0;i--){asrt(isInt(s[i],0));r[i]=u;u*=s[i]}
  return r
}
,map=(x,f)=>{const n=x.a.length,r=Array(n);for(let i=0;i<n;i++)r[i]=f(x.a[i]);return A(r,x.s)}
,toArray=x=>{const n=x.a.length,r=Array(n);for(let i=0;i<n;i++)r[i]=x.a[i];return r}
,toInt=(x,m,M)=>{let r=unwrap(x);if(r!==r|0||m!=null&&r<m||M!=null&&M<=r)domErr();return r}
,toSimpleString=x=>{
  if(x.s.length>1)rnkErr()
  if(typeof x.a==='string'){
    if(!x.s.length)return x.a[0]
    if(!x.s[0])return''
    if(x.s.length===1)return x.a.slice(0,x.s[0])
    return toArray(x).join('')
  }else{
    let a=toArray(x)
    for(let i=0;i<a.length;i++)typeof a[i]!=='string'&&domErr()
    return a.join('')
  }
}
,isSimple=x=>!x.s.length&&!x.a[0].isA
,unwrap=x=>{x.a.length===1||lenErr();return x.a[0]}
,getPrototype=x=>!x.a.length||typeof x.a[0]!=='string'?0:' ' // todo
,asrt=x=>{if(typeof x==='function'){if(!x())throw Error('assertion failed: '+x)}
          else                     {if(!x)  throw Error('assertion failed'    )}}
,isInt=(x,m,M)=>x===~~x&&(m==null||m<=x&&(M==null||x<M))
,prd=x=>{let r=1;for(let i=0;i<x.length;i++)r*=x[i];return r}
,extend=(x,y)=>{for(let k in y)x[k]=y[k];return x}
,fmtNum=x=>(''+x).replace('Infinity','∞').replace(/-/g,'¯')
,repeat=(x,n)=>{
  if(!n)return x.slice(0,0)
  let m=n*x.length;while(x.length*2<m)x=x.concat(x)
  return x.concat(x.slice(0,m-x.length))
}
,arrEq=(x,y)=>{
  if(x.length!==y.length)return 0
  for(let i=0;i<x.length;i++)if(x[i]!==y[i])return 0
  return 1
}
,err=(name,m='',o)=>{
  if(o&&o.aplCode&&o.offset!=null){
    let a=o.aplCode.slice(0,o.offset).split('\n')
    let l=a.length,c=1+(a[a.length-1]||'').length // line and column
    m+='\n'+(o.file||'-')+':'+l+':'+c+o.aplCode.split('\n')[l-1]+'_'.repeat(c-1)+'^'
  }
  let e=Error(m);e.name=name;for(let k in o)e[k]=o[k]
  throw e
}
,synErr=(m,o)=>err('SYNTAX ERROR',m,o)
,domErr=(m,o)=>err('DOMAIN ERROR',m,o)
,lenErr=(m,o)=>err('LENGTH ERROR',m,o)
,rnkErr=(m,o)=>err(  'RANK ERROR',m,o)
,idxErr=(m,o)=>err( 'INDEX ERROR',m,o)
,nyiErr=(m,o)=>err( 'NONCE ERROR',m,o)
,valErr=(m,o)=>err( 'VALUE ERROR',m,o)

A.zero =A([0],[])
A.one  =A([1],[])
A.zilde=A([],[0])
A.scalar=x=>A([x],[])
A.bool=[A.zero,A.one]
const Zify=x=>typeof x==='number'?new Z(x,0):x instanceof Z?x:domErr() // complexify
const simplify=(re,im)=>im===0?re:new Z(re,im)
function Z(re,im){asrt(typeof re==='number');asrt(typeof im==='number'||im==null)
  if(re!==re||im!==im)domErr('NaN'); this.re=re;this.im=im||0}
Z.prototype.toString=function(){return fmtNum(this.re)+'J'+fmtNum(this.im)}
Z.prototype.repr=function(){return'new Z('+repr(this.re)+','+repr(this.im)+')'}

Z.exp=x=>{x=Zify(x);let r=Math.exp(x.re);return simplify(r*Math.cos(x.im),r*Math.sin(x.im))}
Z.log=x=>{if(typeof x==='number'&&x>0){return Math.log(x)}
          else{x=Zify(x);return simplify(Math.log(Math.sqrt(x.re*x.re+x.im*x.im)),Z.dir(x))}}
Z.cjg=x=>new Z(x.re,-x.im)
Z.neg=x=>new Z(-x.re,-x.im)
Z.add=(x,y)=>{x=Zify(x);y=Zify(y);return simplify(x.re+y.re,x.im+y.im)}
Z.sub=(x,y)=>{x=Zify(x);y=Zify(y);return simplify(x.re-y.re,x.im-y.im)}
Z.mul=(x,y)=>{x=Zify(x);y=Zify(y);return simplify(x.re*y.re-x.im*y.im,x.re*y.im+x.im*y.re)}
Z.div=(x,y)=>{x=Zify(x);y=Zify(y);const d=y.re*y.re+y.im*y.im
              return simplify((x.re*y.re+x.im*y.im)/d,(y.re*x.im-y.im*x.re)/d)}
Z.itimes   =x=>{x=Zify(x);return simplify(-x.im,x.re)}
Z.negitimes=x=>{x=Zify(x);return simplify(x.im,-x.re)}

// ¯1 ¯2 ¯3 ¯4*2 ←→ 1 4 9 16
// 0j1*2 ←→ ¯1
// 1j2*3 ←→ ¯11j¯2
// .5j1.5*5 ←→ 9.875j¯0.375
// 9 4 0 ¯4 ¯9*.5 ←→ 3 2 0 0j2 0j3
Z.pow=(x,y)=>{
  if(typeof x==='number'&&typeof y==='number'&&(x>=0||isInt(y)))return Math.pow(x,y)
  if(typeof y==='number'&&isInt(y,0)){let r=1;while(y){(y&1)&&(r=Z.mul(r,x));x=Z.mul(x,x);y>>=1};return r}
  if(typeof x==='number'&&y===.5)return x<0?new Z(0,Math.sqrt(-x)):Math.sqrt(x)
  return Z.exp(Z.mul(y,Z.log(x)))
}
Z.sqrt=x=>Z.pow(x,.5)
Z.mag=x=>Math.sqrt(x.re*x.re+x.im*x.im) // magnitude
Z.dir=x=>Math.atan2(x.im,x.re) // direction
Z.sin=x=>Z.negitimes(Z.sinh(Z.itimes(x)))
Z.cos=x=>Z.cosh(Z.itimes(x))
Z.tan=x=>Z.negitimes(Z.tanh(Z.itimes(x)))

// arcsin x = -i ln(ix + sqrt(1 - x^2))
// arccos x = -i ln(x + i sqrt(x^2 - 1))
// arctan x = (i/2) (ln(1-ix) - ln(1+ix))
Z.asin=x=>{x=Zify(x);return Z.negitimes(Z.log(Z.add(Z.itimes(x),Z.sqrt(Z.sub(1,Z.pow(x,2))))))}
Z.acos=x=>{
  x=Zify(x);const r=Z.negitimes(Z.log(Z.add(x,Z.sqrt(Z.sub(Z.pow(x,2),1)))))
  // TODO look up the algorithm for determining the sign of arccos; the following line is dubious
  return r instanceof Z&&(r.re<0||(r.re===0&&r.im<0))?Z.neg(r):r
}
Z.atan=x=>{
  x=Zify(x);const ix=Z.itimes(x)
  return Z.mul(new Z(0,.5),Z.sub(Z.log(Z.sub(1,ix)),Z.log(Z.add(1,ix))))
}

Z.sinh=x=>{let a=Z.exp(x);return Z.mul(.5,Z.sub(a,Z.div(1,a)))}
Z.cosh=x=>{let a=Z.exp(x);return Z.mul(.5,Z.add(a,Z.div(1,a)))}
Z.tanh=x=>{let a=Z.exp(x),b=Z.div(1,a);return Z.div(Z.sub(a,b),Z.add(a,b))}

// arcsinh x =     i arcsin(-ix)
// arccosh x = +/- i arccos(x)
// arctanh x =     i arctan(-ix)
Z.asinh=x=>Z.itimes(Z.asin(Z.negitimes(x)))
Z.acosh=x=>{x=Zify(x);let sign=x.im>0||(!x.im&&x.re<=1)?1:-1;return Z.mul(new Z(0,sign),Z.acos(x))}
Z.atanh=x=>Z.itimes(Z.atan(Z.negitimes(x)))

Z.floor=x=>{
  if(typeof x==='number')return Math.floor(x)
  x=Zify(x)
  let re=Math.floor(x.re),im=Math.floor(x.im),r=x.re-re,i=x.im-im
  if(r+i>=1)r>=i?re++:im++
  return simplify(re,im)
}
Z.ceil=x=>{
  if(typeof x==='number')return Math.ceil(x)
  x=Zify(x)
  let re=Math.ceil(x.re),im=Math.ceil(x.im),r=re-x.re,i=im-x.im
  if(r+i>=1)r>=i?re--:im--
  return simplify(re,im)
}

const iszero=x=>!x||(x instanceof Z&&!x.re&&!x.im)
Z.residue=(x,y)=>typeof x==='number'&&typeof y==='number'?(x?y-x*Math.floor(y/x):y)
                 :iszero(x)?y:Z.sub(y,Z.mul(x,Z.floor(Z.div(y,x))))
Z.isint=x=>typeof x==='number'?x===Math.floor(x):x.re===Math.floor(x.re)&&x.im===Math.floor(x.im)

const firstquadrant=x=>{ // rotate into first quadrant
  if(typeof x==='number'){return Math.abs(x)}
  else{x.re<0&&(x=Z.neg(x));x.im<0&&(x=Z.itimes(x));return x.re?x:x.im}
}
Z.gcd=(x,y)=>{
  if(typeof x==='number'&&typeof y==='number'){
    while(y){let z=y;y=x%y;x=z}
    return Math.abs(x)
  }else{
    while(!iszero(y)){let z=y;y=Z.residue(y,x);x=z}
    return firstquadrant(x)
  }
}
Z.lcm=(x,y)=>{let p=Z.mul(x,y);return iszero(p)?p:Z.div(p,Z.gcd(x,y))}
const LDC=1,VEC=2,GET=3,SET=4,MON=5,DYA=6,LAM=7,RET=8,POP=9,SPL=10,JEQ=11,EMB=12,CON=13
,Proc=function(code,addr,size,env){this.code=code;this.addr=addr;this.size=size;this.env=env;this.toString=_=>'#procedure'}
,toFn=p=>(x,y)=>vm(p.code,p.env.concat([[x,p,y,null]]),p.addr)
,vm=(code,env,pc=0,stk=[])=>{
  asrt(code instanceof Array);asrt(env instanceof Array);for(let i=0;i<env.length;i++)asrt(env[i]instanceof Array)
  while(1){
    switch(code[pc++]){
      case LDC:stk.push(code[pc++]);break
      case VEC:{
        let a=stk.splice(stk.length-code[pc++]);for(let i=0;i<a.length;i++)if(isSimple(a[i]))a[i]=unwrap(a[i])
        stk.push(A(a));break
      }
      case GET:{let r=env[code[pc++]][code[pc++]];r!=null||valErr();stk.push(r);break}
      case SET:{env[code[pc++]][code[pc++]]=stk[stk.length-1];break}
      case MON:{
        let[w,f]=stk.splice(-2)
        if(typeof f==='function'){
          if(w instanceof Proc)w=toFn(w)
          if(f.cps){f(w,undefined,undefined,r=>{stk.push(r);vm(code,env,pc,stk)});return}
          stk.push(f(w))
        }else{
          let bp=stk.length;stk.push(code,pc,env);code=f.code;pc=f.addr;env=f.env.concat([[w,f,null,bp]])
        }
        break
      }
      case DYA:{
        let[w,f,a]=stk.splice(-3)
        if(typeof f==='function'){
          if(w instanceof Proc)w=toFn(w)
          if(a instanceof Proc)a=toFn(a)
          if(f.cps){f(w,a,undefined,r=>{stk.push(r);vm(code,env,pc,stk)});return}
          stk.push(f(w,a))
        }else{
          let bp=stk.length;stk.push(code,pc,env);code=f.code;pc=f.addr;env=f.env.concat([[w,f,a,bp]])
        }
        break
      }
      case LAM:{let size=code[pc++];stk.push(new Proc(code,pc,size,env));pc+=size;break}
      case RET:{if(stk.length===1)return stk[0];[code,pc,env]=stk.splice(-4,3);break}
      case POP:{stk.pop();break}
      case SPL:{
        let n=code[pc++],a=toArray(stk[stk.length-1]).reverse()
        for(let i=0;i<a.length;i++)if(!a[i].isA)a[i]=A([a[i]],[])
        if(a.length===1){a=repeat(a,n)}else if(a.length!==n){lenErr()}
        stk.push.apply(stk,a)
        break
      }
      case JEQ:{const n=code[pc++];toInt(stk[stk.length-1],0,2)||(pc+=n);break}
      case EMB:{let frm=env[env.length-1];stk.push(code[pc++](frm[0],frm[2]));break}
      case CON:{
        let frm=env[env.length-1]
        let cont={code,env:env.map(x=>x.slice(0)),stk:stk.slice(0,frm[3]),pc:frm[1].addr+frm[1].size-1}
        asrt(code[cont.pc]===RET)
        stk.push(r=>{code=cont.code;env=cont.env;stk=cont.stk;pc=cont.pc;stk.push(r)})
        break
      }
      default:err('Unrecognized instruction:'+code[pc-1]+',pc:'+pc)
    }
  }
}
const ltr='_A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶ-ͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮ-ٯٱ-ۓەۥ-ۦۮ-ۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴ-ߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএ-ঐও-নপ-রলশ-হঽৎড়-ঢ়য়-ৡৰ-ৱਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽૐૠ-ૡଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽଡ଼-ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘ-ౙౠ-ౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠ-ೡೱ-ೲഅ-ഌഎ-ഐഒ-ഺഽൎൠ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะา-ำเ-ๆກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥ-ၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮ-ᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵ-ᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃ-ↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〆〱-〵〻-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪ-ꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵ-ꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּ-סּףּ-פּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ'
,td=[
  ['-',/^(?:[ \t]+|[⍝\#].*)+/], // whitespace and comments
  ['L',/^[\n\r]+/],             // newline
  ['⋄',/^⋄/],                   // statement separator
  ['N',/^¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞))?/i],
  ['S',/^(?:'[^']*')+/],        // string
  ['.',/^[\(\)\[\]\{\}:;←]/],   // punctuation
  ['J',/^«[^»]*»/],             // JS literal
  ['X',RegExp('^(?:⎕?['+ltr+']['+ltr+'0-9]*|⍺⍺|⍵⍵|∇∇|[^¯\'":«»])','i')] // identifier
]
,parse=(s,o)=>{
  // tokens are {t:type,v:value,o:offset,s:aplCode}
  // "stk" tracks bracket nesting and causes 'L' tokens to be dropped when the latest unclosed bracket is '(' or '['
  let i=0,tokens=[],stk=['{'],ns=s.length // i:offset in s
  while(i<ns){
    let m,t,v,s1=s.slice(i) // m:match object, t:type, v:value, s1:remaining source code
    for(let j=0;j<td.length;j++)if(m=s1.match(td[j][1])){v=m[0];t=td[j][0];t==='.'&&(t=v);break}
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
  i=1;let token=tokens[0] // single-token lookahead
  const consume=x=>x.includes(token.t)?token=tokens[i++]:0
  ,demand=x=>{token.t===x?(token=tokens[i++]):prsErr('Expected token of type '+x+' but got '+token.t)}
  ,prsErr=x=>{synErr(x,{file:o.file,offset:token.o,aplCode:s})}
  ,body=_=>{
    let r=['B']
    while(1){
      if('$};'.includes(token.t))return r
      while(consume('⋄L')){}
      if('$};'.includes(token.t))return r
      let e=expr()
      if(consume(':'))e=[':',e,expr()]
      r.push(e)
    }
  }
  ,expr=_=>{
    let r=['.'],item
    while(1){
      let token0=token
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
,perv=(f1,f2)=>{ // pervasive f1:monad, f2:dyad
  let g1=!f1?nyiErr:x=>{
    if(x.isA)return map(x,g1)
    let r=f1(x);typeof r==='number'&&r!==r&&domErr();return r
  }
  let g2=!f2?nyiErr:(x,y)=>{
    switch((!x.isA?10:x.a.length===1?20:30)+(!y.isA?1:y.a.length===1?2:3)){
      case 11:{let r=f2(x,y);typeof r==='number'&&r!==r&&domErr();return r}
      case 12:case 13:return map(y,yi=>g2(x,yi))
      case 21:case 31:return map(x,xi=>g2(xi,y))
      case 22:return A([g2(x.a[0],y.a[0])],x.s.length>y.s.length?x.s:y.s) // (1 1⍴2)+1 1 1⍴3←→1 1 1⍴5
      case 23:{const xi=x.a[0];return map(y,yi=>g2(xi,yi))}
      case 32:{const yi=y.a[0];return map(x,xi=>g2(xi,yi))}
      case 33:{x.s.length!==y.s.length&&rnkErr();x.s!=''+y.s&&lenErr()
               const n=x.a.length,r=Array(n);for(let i=0;i<n;i++)r[i]=g2(x.a[i],y.a[i]);return A(r,x.s)}
    }
  }
  return(y,x)=>{asrt(y.isA);asrt(!x||x.isA);return(x?g2:g1)(y,x)}
}
,real=f=>(x,y,axis)=>typeof x!=='number'||y!=null&&typeof y!=='number'?domErr():f(x,y,axis)
,numeric=(f,g)=>(x,y,axis)=>
  (typeof x!=='number'||y!=null&&typeof y!=='number'?g(Zify(x),y==null?y:Zify(y),axis):f(x,y,axis))
,match=(x,y)=>{
  if(x.isA){
    if(!y.isA||x.s!=''+y.s)return 0
    let r=1,n=x.a.length;for(let i=0;i<n;i++)r&=match(x.a[i],y.a[i])
    return r
  }else{
    if(y.isA)return 0
    if(x instanceof Z&&y instanceof Z)return x.re===y.re&&x.im===y.im
    return x===y
  }
}
,numApprox=(x,y)=>x===y||Math.abs(x-y)<1e-11
,approx=(x,y)=>{ // like match(), but imprecision-tolerant
  if(x.isA){
    if(!y.isA)return 0
    if(x.s.length!==y.s.length)return 0
    if(x.s!=''+y.s)return 0
    let r=1,n=x.a.length;for(let i=0;i<n;i++)r&=approx(x.a[i],y.a[i])
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
  if(axes.s.length!==1||axes.s[0]!==1)synErr() // [sic]
  let a=unwrap(axes)
  if(a.isA){
    a=toArray(a)
    for(let i=0;i<a.length;i++){
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

voc['+']=withId(0,perv(
  numeric(x=>x,Z.cjg),                // +0((1j¯2 ¯3j4)¯5.6) ←→ 0((1j2 ¯3j¯4)¯5.6)
  // 1(2 3)+(4 5)6 ←→ (5 6)(8 9)
  // (2 3⍴1 2 3 4 5 6)+    ¯2 ←→ 2 3⍴¯1 0 1 2 3 4
  // (2 3⍴1 2 3 4 5 6)+  2⍴¯2 !!! RANK ERROR
  // (2 3⍴1 2 3 4 5 6)+2 3⍴¯2 ←→ 2 3⍴¯1 0 1 2 3 4
  // 1 2 3+4 5                !!! LENGTH ERROR
  // (2 3⍴⍳6)+3 2⍴⍳6          !!! LENGTH ERROR
  // 1j¯2+¯2j3                ←→ ¯1j1
  // +/⍬                      ←→ 0
  // ¯+¯¯                     !!! DOMAIN ERROR
  // 1j¯+2j¯¯                 !!! DOMAIN ERROR
  numeric((y,x)=>x+y,(y,x)=>Z.add(x,y))
))
voc['-']=withId(0,perv(
  // -4(1 2 3)1j2 ←→ ¯4(¯1 ¯2 ¯3)¯1j¯2
  numeric(x=>-x,Z.neg),
  // 1-3←→¯2 ⍙ 5j2-3j8←→2j¯6 ⍙ -/⍬←→0
  numeric((y,x)=>x-y,(y,x)=>Z.sub(x,y))
))
voc['×']=withId(1,perv(
  // ×¯2 ¯1 0 1 2 ¯ ¯¯ 3j¯4 ←→ ¯1 ¯1 0 1 1 1 ¯1 .6j¯.8
  numeric(x=>(x>0)-(x<0),x=>{let d=Math.sqrt(x.re*x.re+x.im*x.im);return simplify(x.re/d,x.im/d)}),
  // 7×8←→56 ⍙ 1j¯2×¯2j3←→4j7 ⍙ 2×1j¯2←→2j¯4 ⍙ ×/⍬←→1
  numeric((y,x)=>x*y,(y,x)=>Z.mul(x,y))
))
voc['÷']=withId(1,perv(
  // ÷2←→.5 ⍙ ÷2j3←→0.15384615384615385J¯0.23076923076923078 ⍙ 0÷0!!!DOMAIN ERROR
  numeric(x=>1/x,
                x=>{let d=x.re*x.re+x.im*x.im;return simplify(x.re/d,-x.im/d)}),
  // 27÷9←→3 ⍙ 4j7÷1j¯2←→¯2j3 ⍙ 0j2÷0j1←→2 ⍙ 5÷2j1←→2j¯1 ⍙ ÷/⍬←→1
  numeric((y,x)=>x/y,(y,x)=>Z.div(x,y))
))
voc['*']=withId(1,perv(
  // *2←→7.38905609893065 ⍙ *2j3←→¯7.315110094901103J1.0427436562359045
  numeric(Math.exp,Z.exp),
  // 2 3 ¯2 ¯3*3 2 3 2←→8 9 ¯8 9 ⍙ ¯1*.5←→0j1 ⍙ */⍬←→1 ⍙ 1j2*3j4 ←→ .129009594074467j.03392409290517014
  (y,x)=>Z.pow(x,y)
))
voc['⍟']=perv(
  // ⍟123←→4.812184355372417 ⍙ ⍟0←→¯¯ ⍙ ⍟¯1←→0j1×○1 ⍙ ⍟123j456←→6.157609243895447J1.3073297857599793
  Z.log,
  // 12⍟34 ¯34←→1.419111870829036 1.419111870829036j1.26426988871305
  // ¯12⍟¯34 ←→ 1.1612974763994781j¯.2039235425372641
  // 1j2⍟3j4 ←→ 1.2393828252698689J¯0.5528462880299602
  (y,x)=>typeof x==='number'&&typeof y==='number'&&x>0&&y>0?Math.log(y)/Math.log(x):Z.div(Z.log(y),Z.log(x))
)
voc['|']=withId(0,perv(
  // |¯8 0 8 ¯3.5←→8 0 8 3.5 ⍙ |5j12←→13
  numeric(x=>Math.abs(x),Z.mag),
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
  (y,x)=>Z.residue(x,y)
))

voc['⍀']=adv((y,x,axis)=>voc['\\'](y,x,axis||A.zero))

// +\20 10 ¯5 7               ←→ 20 30 25 32
// ,\'AB' 'CD' 'EF'           ←→ 'AB' 'ABCD' 'ABCDEF'
// ×\2 3⍴5 2 3 4 7 6          ←→ 2 3⍴5 10 30 4 28 168
// ∧\1 1 1 0 1 1              ←→ 1 1 1 0 0 0
// -\1 2 3 4                  ←→ 1 ¯1 2 ¯2
// ∨\0 0 1 0 0 1 0            ←→ 0 0 1 1 1 1 1
// +\1 2 3 4 5                ←→ 1 3 6 10 15
// +\(1 2 3)(4 5 6)(7 8 9)    ←→ (1 2 3)(5 7 9)(12 15 18)
// M←2 3⍴1 2 3 4 5 6 ⋄ +\M    ←→ 2 3⍴1 3 6 4 9 15
// M←2 3⍴1 2 3 4 5 6 ⋄ +⍀M    ←→ 2 3⍴1 2 3 5 7 9
// M←2 3⍴1 2 3 4 5 6 ⋄ +\[0]M ←→ 2 3⍴1 2 3 5 7 9
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
voc['\\']=adv((y,x,axis)=>{
  if(typeof y==='function'){
    asrt(typeof x==='undefined')
    let f=y
    return(y,x)=>{
      asrt(x==null)
      if(!y.s.length)return y
      axis=axis?toInt(axis,0,y.s.length):y.s.length-1
      const ni=prd(y.s.slice(0,axis)), nj=y.s[axis], nk=prd(y.s.slice(axis+1)), r=Array(ni*nj*nk)
      if(r.length)for(let i=0;i<ni;i++)for(let j=0;j<nj;j++)for(let k=0;k<nk;k++){
        let u=y.a[(i*nj+j)*nk+k];u=u.isA?u:A.scalar(u)
        for(let l=j-1;l>=0;l--){let v=y.a[(i*nj+l)*nk+k];u=f(u,v.isA?v:A.scalar(v))}
        r[(i*nj+j)*nk+k]=u.s.length?u:unwrap(u)
      }
      return A(r,y.s)
    }
  }else{
    y.s.length||nyiErr()
    axis=axis?toInt(axis,0,y.s.length):y.s.length-1
    x.s.length>1&&rnkErr()
    let a=toArray(x),b=[],i=0,shape=y.s.slice(0);shape[axis]=a.length
    for(let j=0;j<a.length;j++){isInt(a[j],0,2)||domErr();b.push(a[j]>0?i++:null)}
    i===y.s[axis]||lenErr()
    let data=[],xd=strideForShape(y.s)
    if(shape[axis]&&y.a.length){
      let filler=getPrototype(y),p=0,indices=repeat([0],shape.length)
      while(1){
        data.push(b[indices[axis]]==null?filler:y.a[p+b[indices[axis]]*xd[axis]])
        let i=shape.length-1
        while(i>=0&&indices[i]+1===shape[i]){
          if(i!==axis)p-=xd[i]*indices[i]
          indices[i--]=0
        }
        if(i<0)break
        if(i!==axis)p+=xd[i]
        indices[i]++
      }
    }
    return A(data,shape)
  }
})
voc['○']=perv(
  // ○2←→6.283185307179586
  // ○2j2←→6.283185307179586j6.283185307179586
  // ○'ABC' !!! DOMAIN ERROR
  numeric(x=>Math.PI*x,x=>new Z(Math.PI*x.re,Math.PI*x.im)),
  // ¯12○2 2j3←→¯0.4161468365471j0.9092974268257 ¯0.02071873100224j0.04527125315609
  // ¯11○2 2j3←→0j2 ¯3j2
  // ¯10○2 2j3←→2 2j¯3
  // ¯9○2 2j3←→2 2j3
  // ¯8○2 2j3←→0j¯2.2360679774998 ¯2.8852305489054j2.0795565201111
  // ¯7○0.5 2 2j3←→0.54930614433405 0.5493061443340548456976226185j¯1.570796326794896619231321692 0.1469466662255297520474327852j1.338972522294493561124193576
  // ¯6○0.5 2 2j3←→¯1.1102230246252e¯16j1.0471975511966 1.316957896924816708625046347 1.983387029916535432347076903j1.000143542473797218521037812
  // ¯5○2 2j3←→1.443635475178810342493276740 1.968637925793096291788665095j0.9646585044076027920454110595
  // ¯4○2 0 ¯2 2j3←→1.7320508075689 0j1 ¯1.7320508075689 1.9256697360917j3.1157990841034
  // ¯3○0.5 2 2j3←→0.46364760900081 1.107148717794090503017065460 1.409921049596575522530619385j0.2290726829685387662958818029
  // ¯2○0.5 2 2j3←→1.0471975511966 0j1.316957896924816708625046347 1.000143542473797218521037812j¯1.983387029916535432347076903
  // ¯1○0.5 2 2j3←→0.5235987755983 1.570796326794896619231321692j¯1.316957896924816708625046347 0.5706527843210994007102838797j1.983387029916535432347076903
  // 0○0.5 2 2j3←→0.86602540378444 0j1.7320508075689 3.1157990841034j¯1.9256697360917
  // 1e¯10>|.5-1○○÷6←→1 # sin(pi/6) = .5
  // 1○1 2j3←→0.8414709848079 9.1544991469114j¯4.1689069599666
  // 2○1 2j3←→0.54030230586814 ¯4.1896256909688j¯9.1092278937553
  // 3○1 2j3←→1.5574077246549 ¯0.0037640256415041j1.0032386273536
  // 4○2 2j3←→2.2360679774998 2.0795565201111j2.8852305489054
  // 5○2 2j3←→3.626860407847 ¯3.5905645899858j0.53092108624852
  // 6○2 2j3←→3.7621956910836 ¯3.7245455049153j0.51182256998738
  // 7○2 2j3←→0.96402758007582 0.96538587902213j¯0.0098843750383225
  // 8○2 2j3←→0j2.2360679774998 2.8852305489054j¯2.0795565201111
  // 9○2 2j3←→2 2
  // 10○¯2 ¯2j3←→2 3.605551275464
  // 11○2  2j3←→0 3
  // 12○2  2j3←→0 0.98279372324733
  // 1○'a' !!! DOMAIN ERROR ⍙ 99○1 !!! DOMAIN ERROR ⍙ 99○1j2 !!! DOMAIN ERROR
  (x,i)=>{
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
        case -4:let t=Z.sqrt(x*x-1);return x<-1?-t:t
        case -3:return Z.atan(x)
        case -2:return Z.acos(x)
        case -1:return Z.asin(x)
        case  0:return Z.sqrt(1-x*x)
        case  1:return Math.sin(x)
        case  2:return Math.cos(x)
        case  3:return Math.tan(x)
        case  4:return Math.sqrt(1+x*x)
        case  5:{let a=Math.exp(x),b=1/a;return(a-b)/2}     // sinh
        case  6:{let a=Math.exp(x),b=1/a;return(a+b)/2}     // cosh
        case  7:{let a=Math.exp(x),b=1/a;return(a-b)/(a+b)} // tanh
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
        case  -4:if(x.re===-1&&!x.im){return 0}else{let a=Z.add(x,1);return Z.mul(a,Z.sqrt(Z.div(Z.sub(x,1),a)))}
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
)
voc[',']=(y,x,axis)=>{
  if(!x)nyiErr()
  // 10,66←→10 66 ⍙ ⍬,⍬←→⍬ ⍙ ⍬,1←→,1 ⍙ 1,⍬←→,1 ⍙ 'ab','c','def'←→'abcdef'
  // (2 3⍴⍳6),2 2⍴⍳4←→2 5⍴0 1 2 0 1 3 4 5 2 3 ⍙ (2 3⍴⍳6),⍳2←→2 4⍴0 1 2 0 3 4 5 1
  // (3 2⍴⍳6),2 2⍴⍳4 !!! LENGTH ERROR         ⍙ (⍳2),2 3⍴⍳6←→2 4⍴0 0 1 2 1 3 4 5
  // (2 3⍴⍳6),9←→2 4⍴0 1 2 9 3 4 5 9 ⍙ (2 3 4⍴⎕a),'*'←→2 3 5⍴'ABCD*EFGH*IJKL*MNOP*QRST*UVWX*'
  let nAxes=Math.max(x.s.length,y.s.length)
  if(axis){axis=unwrap(axis);typeof axis!=='number'&&domErr();nAxes&&!(-1<axis&&axis<nAxes)&&rnkErr()}
  else{axis=nAxes-1}

  if(!x.s.length&&!y.s.length){return A([unwrap(x),unwrap(y)])}
  else if(!x.s.length){let s=y.s.slice(0);if(isInt(axis))s[axis]=1;x=A(repeat([unwrap(x)],prd(s)),s)}
  else if(!y.s.length){let s=x.s.slice(0);if(isInt(axis))s[axis]=1;y=A(repeat([unwrap(y)],prd(s)),s)}
  else if(x.s.length+1===y.s.length){isInt(axis)||rnkErr();let s=x.s.slice(0);s.splice(axis,0,1);x=A(x.a,s)}
  else if(x.s.length===y.s.length+1){isInt(axis)||rnkErr();let s=y.s.slice(0);s.splice(axis,0,1);y=A(y.a,s)}
  else if(x.s.length!==y.s.length){rnkErr()}

  asrt(x.s.length===y.s.length)
  for(let i=0;i<x.s.length;i++)if(i!==axis&&x.s[i]!==y.s[i])lenErr()
  let s=x.s.slice(0);if(isInt(axis)){s[axis]+=y.s[axis]}else{s.splice(Math.ceil(axis),0,2)}
  let r=Array(prd(s))
  let stride=Array(s.length);stride[s.length-1]=1
  for(let i=s.length-1;i>0;i--)stride[i-1]=stride[i]*s[i]
  let d=stride;if(!isInt(axis)){d=stride.slice(0);d.splice(Math.ceil(axis),1)}
  if(x.a.length){ // p:pointer in result, q:pointer in x.a
    let p=0,q=0,i=new Int32Array(x.s.length),xd=strideForShape(x.s)
    while(1){
      r[p]=x.a[q]
      let a=i.length-1;while(a>=0&&i[a]+1===x.s[a]){q-=i[a]*xd[a];p-=i[a]*d[a];i[a--]=0}
      if(a<0)break
      q+=xd[a];p+=d[a];i[a]++
    }
  }
  if(y.a.length){ // p:pointer in result, q:pointer in y.a
    let p=isInt(axis)?stride[axis]*x.s[axis]:stride[Math.ceil(axis)],q=0,i=new Int32Array(y.s.length),yd=strideForShape(y.s)
    while(1){
      r[p]=y.a[q]
      let a=i.length-1;while(a>=0&&i[a]+1===y.s[a]){q-=i[a]*yd[a];p-=i[a]*d[a];i[a--]=0}
      if(a<0)break
      q+=yd[a];p+=d[a];i[a]++
    }
  }
  return A(r,s)
}

// 12=12←→1 ⍙ 2=12←→0 ⍙ 'Q'='Q'←→1 ⍙ 1='1'←→0 ⍙ '1'=1←→0 ⍙ 11 7 2 9=11 3 2 6←→1 0 1 0 ⍙ 4=2+2←→1
// 2j3=2j3←→1 ⍙ 2j3=3j2←→0 ⍙ 0j0←→0 ⍙ 123j0←→123 ⍙ 2j¯3+¯2j3←→0 ⍙ =/⍬←→1 ⍙ 'stoat'='toast'←→0 0 0 0 1
// (2 3⍴1 2 3 4 5 6)=2 3⍴3 3 3 5 5 5←→2 3⍴0 0 1 0 1 0
// 3=2 3⍴1 2 3 4 5 6←→2 3⍴0 0 1 0 0 0
// 3=(2 3⍴1 2 3 4 5 6)(2 3⍴3 3 3 5 5 5)←→(2 3⍴0 0 1 0 0 0)(2 3⍴1 1 1 0 0 0)
let eq
voc['=']=withId(1,perv(null,eq=(y,x)=>+(x instanceof Z&&y instanceof Z?x.re===y.re&&x.im===y.im:x===y)))
voc['≠']=withId(0,perv(null,(y,x)=>1-eq(y,x))) // 3≢5←→1 ⍙ 8≠8←→0 ⍙ ≠/⍬←→0
voc['<']=withId(0,perv(null,real((y,x)=>+(x< y)))) // </⍬ ←→ 0
voc['>']=withId(0,perv(null,real((y,x)=>+(x> y)))) // >/⍬ ←→ 0
voc['≤']=withId(1,perv(null,real((y,x)=>+(x<=y)))) // ≤/⍬ ←→ 1
voc['≥']=withId(1,perv(null,real((y,x)=>+(x>=y)))) // ≥/⍬ ←→ 1

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
voc['≡']=(y,x)=>x?A.bool[+match(y,x)]:A([depthOf(y)],[])

const depthOf=x=>{
  if(!x.isA||!x.s.length&&!x.a[0].isA)return 0
  let r=0,n=x.a.length;for(let i=0;i<n;i++)r=Math.max(r,depthOf(x.a[i]));return r+1
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
  if(typeof f==='function'){if(typeof g==='function'){return(y,x)=>f(g(y),x)}      // f∘g
                            else{return(y,x)=>{x==null||synErr();return f(g,y)}}}  // f∘B
  else{asrt(typeof g==='function');return(y,x)=>{x==null||synErr();return g(y,f)}} // A∘g
})

voc['∪']=(y,x)=>{
  if(x){
    // 1 2∪2 3←→1 2 3 ⍙ 'abc'∪'cad'←→'abcd' ⍙ 1∪1←→,1 ⍙ 1∪2←→1 2 ⍙ 1∪2 1←→1 2 ⍙ 1 2∪2 2 2 2←→1 2
    // 2 3 3∪4 5 3 4←→2 3 3 4 5 4 ⍙ ⍬∪1←→,1 ⍙ 1 2∪⍬←→1 2 ⍙ ⍬∪⍬←→⍬
    // 1 2∪2 2⍴3 !!! RANK ERROR ⍙ (2 2⍴3)∪4 5 !!! RANK ERROR
    // 'ab' 'c'(0 1)∪'ab' 'de' ←→ 'ab' 'c'(0 1)'de'
    if(x.s.length>1||y.s.length>1)rnkErr()
    let r=[],n=y.a.length;for(let i=0;i<n;i++)contains(x.a,y.a[i])||r.push(y.a[i]);return A(x.a.concat(r))
  }else{
    // ∪3 17←→3 17 ⍙ ∪⍬←→⍬ ⍙ ∪17←→,17 ⍙ ∪3 17 17 17 ¯3 17 0←→3 17 ¯3 0
    if(y.s.length>1)rnkErr()
    let r=[],n=y.a.length;for(let i=0;i<n;i++)contains(r,y.a[i])||r.push(y.a[i]);return A(r)
  }
}
voc['∩']=(y,x)=>{
  if(x){ // 'abca'∩'dac'←→'aca' ⍙ 1'2'3∩⍳5←→1 3 ⍙ 1∩2←→⍬ ⍙ 1∩2 3⍴4 !!! RANK ERROR
    if(x.s.length>1||y.s.length>1)rnkErr()
    let r=[],n=x.a.length;for(let i=0;i<n;i++)contains(y.a,x.a[i])&&r.push(x.a[i]);return A(r)
  }else{
    nyiErr() // ∩1 !!! NONCE ERROR
  }
}
const contains=(a,x)=>{for(let i=0;i<a.length;i++)if(match(x,a[i]))return 1}

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
voc['⊥']=(y,x)=>{
  asrt(x)
  if(!x.s.length)x=A([unwrap(x)])
  if(!y.s.length)y=A([unwrap(y)])
  let lastDimA=x.s[x.s.length-1],firstDimB=y.s[0]
  if(lastDimA!==1&&firstDimB!==1&&lastDimA!==firstDimB)lenErr()
  let a=toArray(x),b=toArray(y),data=[],ni=a.length/lastDimA,nj=b.length/firstDimB
  for(let i=0;i<ni;i++)for(let j=0;j<nj;j++){
    let u=a.slice(i*lastDimA,(i+1)*lastDimA)
    let v=[];for(let l=0;l<firstDimB;l++)v.push(b[j+l*(b.length/firstDimB)])
    if(u.length===1)u=repeat([u[0]],v.length)
    if(v.length===1)v=repeat([v[0]],u.length)
    let z=v[0];for(let k=1;k<v.length;k++)z=Z.add(Z.mul(z,u[k]),v[k])
    data.push(z)
  }
  return A(data,x.s.slice(0,-1).concat(y.s.slice(1)))
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
  return(y,x)=>{
    x||synErr()
    let a=toArray(x),b=toArray(y),data=[]
    for(let i=0;i<a.length;i++)for(let j=0;j<b.length;j++){
      let u=a[i],v=b[j]
      u.isA||(u=A.scalar(u))
      v.isA||(v=A.scalar(v))
      let z=f(v,u)
      z.s.length||(z=unwrap(z))
      data.push(z)
    }
    return A(data,x.s.concat(y.s))
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
  let F=voc['¨'](voc['/'](f)),G=outerProduct(g)
  return(y,x)=>{if(!x.s.length)x=A([unwrap(x)])
                if(!y.s.length)y=A([unwrap(y)])
                return F(G(voc['⊂'](y,undefined,A([0])),
                           voc['⊂'](x,undefined,A([x.s.length-1]))))}
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
  return(y,x)=>{
    if(!x){
      const n=y.a.length,r=Array(n)
      for(var i=0;i<n;i++){const u=y.a[i],v=f(u.isA?u:A([u],[]));asrt(v.isA);r[i]=v.s.length?v:unwrap(v)}
      return A(r,y.s)
    }else if(x.a.length===1){
      const n=y.a.length,r=Array(n),u=x.a[0].isA?x.a[0]:A([x.a[0]],[])
      for(let i=0;i<n;i++){const v=y.a[i],w=f(v.isA?v:A([v],[]),u);r[i]=w.s.length?w:unwrap(w)}
      return A(r,y.s)
    }else if(y.a.length===1){
      const n=x.a.length,r=Array(n),v=y.a[0].isA?y.a[0]:A([y.a[0]],[])
      for(let i=0;i<n;i++){const u=x.a[i],w=f(v,u.isA?u:A([u],[]));r[i]=w.s.length?w:unwrap(w)}
      return A(r,x.s)
    }else{
      const n=x.a.length,r=Array(n);arrEq(x.s,y.s)||lenErr()
      for(let i=0;i<n;i++){const u=x.a[i],v=y.a[i],w=f(v.isA?v:A([v],[]),u.isA?u:A([u],[]));r[i]=w.s.length?w:unwrap(w)}
      return A(r,x.s)
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
voc['⊤']=(y,x)=>{
  asrt(x)
  let a=toArray(x),b=toArray(y),shape=x.s.concat(y.s),data=Array(prd(shape))
  let n=x.s.length?x.s[0]:1,m=a.length/n
  for(let i=0;i<m;i++)for(let j=0;j<b.length;j++){
    let y=typeof b[j]==='number'?Math.abs(b[j]):b[j]
    for(let k=n-1;k>=0;k--){
      let u=a[k*m+i]
      data[(k*m+i)*b.length+j]=iszero(u)?y:Z.residue(u,y)
      y=iszero(u)?0:Z.div(Z.sub(y,Z.residue(u,y)),u)
    }
  }
  return A(data,shape)
}

voc['∊']=(y,x)=>{
  if(x){ // 2 3 4 5 6∊1 2 3 5 8 13 21←→1 1 0 1 0 ⍙ 5∊1 2 3 5 8 13 21←→1
    let b=toArray(y);return map(x,u=>{for(let i=0;i<b.length;i++)if(match(u,b[i]))return 1;return 0})
  }else{ // ∊17←→,17 ⍙ ⍴∊(1 2 3)'ab'(4 5 6)←→,8 ⍙ ∊2 2⍴(1+2 2⍴⍳4)'ab'(1+2 3⍴⍳6)(7 8) ←→ 1 2 3 4,'ab',1 2 3 4 5 6 7 8
    let r=[];enlist(y,r);return A(r)
  }
}

const enlist=(x,r)=>{if(x.isA){const n=x.a.length;for(let i=0;i<n;i++)enlist(x.a[i],r)}else{r.push(x)}}
let Beta
voc['!']=withId(1,perv(

  // !0 5 21←→1 120 51090942171709440000 ⍙ !1.5 ¯1.5 ¯2.5←→1.3293403881791 ¯3.544907701811 2.3632718012074
  // !¯200.5←→0 ⍙ !¯1 !!! DOMAIN ERROR ⍙ !¯200 !!! DOMAIN ERROR
  real(x=>!isInt(x)?Γ(x+1):x<0?domErr():x<smallFactorials.length?smallFactorials[x]:Math.round(Γ(x+1))),

  // 2!4←→6 ⍙ 3!20←→1140 ⍙ 2!6 12 20←→15 66 190 ⍙ (2 3⍴1+⍳6)!2 3⍴3 6 9 12 15 18←→2 3⍴3 15 84 495 3003 18564
  // 0.5!1←→1.2732395447351612 ⍙ 1.2!3.4←→3.795253463731253 ⍙ !/⍬←→1
  // (2!1000)=499500←→1 ⍙ (998!1000)=499500←→1 ⍙ 0.5!¯1 !!! DOMAIN ERROR
  Beta=real((n,k)=>{
    let r                                                               //              Neg int?
    switch(4*negInt(k)+2*negInt(n)+negInt(n-k)){                        //              ⍺ ⍵ ⍵-⍺
      case 0:r=Math.exp(lnΓ(n+1)-lnΓ(k+1)-lnΓ(n-k+1))            ;break // 3!5←→10    ⍝ 0 0 0   (!⍵)÷(!⍺)×!⍵-⍺
      case 1:r=0                                                 ;break // 5!3←→0     ⍝ 0 0 1   0
      case 2:r=domErr()                                          ;break // see below  ⍝ 0 1 0   domain error
      case 3:r=Math.pow(-1,k)*Beta(k-n-1,k)                      ;break // 3!¯5←→¯35  ⍝ 0 1 1   (¯1*⍺)×⍺!⍺-⍵+1
      case 4:r=0                                                 ;break // ¯3!5←→0    ⍝ 1 0 0   0
      case 5:asrt(0)                                             ;break //            ⍝ 1 0 1   cannot arise
      case 6:r=Math.pow(-1,n-k)*Beta(Math.abs(k+1),Math.abs(n+1));break // ¯5!¯3←→6   ⍝ 1 1 0   (¯1*⍵-⍺)×(|⍵+1)!(|⍺+1)
      case 7:r=0                                                 ;break // ¯3!¯5←→0   ⍝ 1 1 1   0
    }
    return isInt(n)&&isInt(k)?Math.round(r):r
  })
))

const negInt=x=>isInt(x)&&x<0
let smallFactorials=[1];(_=>{let x=1;for(let i=1;i<=25;i++)smallFactorials.push(x*=i)})()
let Γ,lnΓ
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
    let x=p_ln[0];for(let i=p_ln.length-1;i>0;i--)x+=p_ln[i]/(z+i)
    let t=z+g_ln+.5
    return.5*Math.log(2*Math.PI)+(z+.5)*Math.log(t)-t+Math.log(x)-Math.log(z)
  }
  Γ=z=>{
    if(z<.5)return Math.PI/(Math.sin(Math.PI*z)*Γ(1-z))
    if(z>100)return Math.exp(lnΓ(z))
    z--;let x=p[0];for(let i=1;i<g+2;i++)x+=p[i]/(z+i)
    let t=z+g+.5
    return Math.sqrt(2*Math.PI)*Math.pow(t,z+.5)*Math.exp(-t)*x
  }
})()

// ⍎'+/2 2⍴1 2 3 4'←→3 7 ⍙ ⍴⍎'123 456'←→,2 ⍙ ⍎'{⍵*2}⍳5'←→0 1 4 9 16 ⍙ ⍎'let' !!! ⍙ ⍎'1 2 (3' !!! ⍙ ⍎123 !!!
voc['⍎']=(y,x)=>x?nyiErr():exec(toSimpleString(y))

voc['⍷']=(y,x)=>{
  y||nyiErr()
  // 'ab'⍷'bababc'←→0 1 0 1 0 0
  // 'ab' 'cde'⍷'ab' 'cde' 'fg' ←→ 1 0 0
  // 'cd'⍷'abcd efghi'←→0 0 1 0 0 0 0 0 0 0
  // 'day'⍷7 9⍴'sunday   monday   tuesday  wednesdaythursday friday   saturday ' ←→ 7 9⍴0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0
  // (2 2⍴'abcd')⍷'abcd'←→4⍴0
  // (1 2)(3 4)⍷'start'(1 2 3)(1 2)(3 4) ←→ 0 0 1 0
  // (2 2⍴7 8 12 13)⍷1+4 5⍴⍳20 ←→ 4 5⍴0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0
  // 1⍷⍳5←→0 1 0 0 0 ⍙ 1 2⍷⍳5←→0 1 0 0 0 ⍙ ⍬⍷⍳5←→1 1 1 1 1 ⍙ ⍬⍷⍬←→⍬ ⍙ 1⍷⍬←→⍬ ⍙ 1 2 3⍷⍬←→⍬
  // (2 3 0⍴0)⍷3 4 5⍴0←→3 4 5⍴1
  // (2 3 4⍴0)⍷3 4 0⍴0←→3 4 0⍴0
  // (2 3 0⍴0)⍷3 4 0⍴0←→3 4 0⍴0
  const r=new Float64Array(y.a.length)
  if(x.s.length>y.s.length)return A(r,y.s)
  if(x.s.length<y.s.length)x=A(x.a,repeat([1],y.s.length-x.s.length).concat(x.s))
  if(!x.a.length)return A(r.fill(1),y.s)
  const s=new Int32Array(y.s.length) // find shape
  for(let i=0;i<y.s.length;i++){s[i]=y.s[i]-x.s[i]+1;if(s[i]<=0)return A(r,y.s)}
  let d=strideForShape(y.s),i=new Int32Array(s.length),j=new Int32Array(s.length),nk=x.a.length,p=0
  while(1){
    let q=p;r[q]=1;j.fill(0)
    for(let k=0;k<nk;k++){
      r[p]&=+match(x.a[k],y.a[q])
      let a=s.length-1;while(a>=0&&j[a]+1===x.s[a]){q-=j[a]*d[a];j[a--]=0}
      if(a<0)break
      q+=d[a];j[a]++
    }
    let a=s.length-1;while(a>=0&&i[a]+1===s[a]){p-=i[a]*d[a];i[a--]=0}
    if(a<0)break
    p+=d[a];i[a]++
  }
  return A(r,y.s)
}

voc['⌊']=withId(Infinity,perv(
  // ⌊123 12.3 ¯12.3 ¯123←→123 12 ¯13 ¯123 ⍙ ⌊12j3 1.2j2.3 1.2j¯2.3 ¯1.2j2.3 ¯1.2j¯2.3←→12j3 1j2 1j¯3 ¯1j2 ¯1j¯3
  // ⌊0 5 ¯5 (○1) ¯1.5←→0 5 ¯5 3 ¯2 ⍙ ⌊'a' !!! DOMAIN ERROR
  Z.floor,
  // 3⌊5←→3 ⍙ ⌊/⍬←→¯
  real((y,x)=>Math.min(y,x))
))

voc['⌈']=withId(-Infinity,perv(
  // ⌈123 12.3 ¯12.3 ¯123←→123 13 ¯12 ¯123 ⍙ ⌈12j3 1.2j2.3 1.2j¯2.3 ¯1.2j2.3 ¯1.2j¯2.3←→12j3 1j3 1j¯2 ¯1j3 ¯1j¯2
  // ⌈0 5 ¯5(○1)¯1.5←→0 5 ¯5 4 ¯1 ⍙ ⌈'a' !!! DOMAIN ERROR
  Z.ceil,
  // 3⌈5←→5 ⍙ ⌈/⍬←→¯¯
  real((y,x)=>Math.max(y,x))
))

// Fork: `(fgh)⍵ ← → (f⍵)g(h⍵)` ; `⍺(fgh)⍵ ← → (⍺f⍵)g(⍺h⍵)`
// (+/÷⍴)4 5 10 7 ←→ ,6.5 ⍙ (+,-,×,÷)2←→2 ¯2 1 .5 ⍙ 1(+,-,×,÷)2←→3 ¯1 2 .5
// a←1 ⋄ b←¯22 ⋄ c←85 ⋄ √←{⍵*.5} ⋄ ((-b)(+,-)√(b*2)-4×a×c)÷2×a ←→ 17 5
voc._fork1=(h,g)=>{asrt(typeof h==='function');asrt(typeof g==='function');return[h,g]}
voc._fork2=(hg,f)=>{let h=hg[0],g=hg[1];asrt(typeof h==='function');return(b,a)=>g(h(b,a),f(b,a))}

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
// ⍕4 3⍴'---' '---' '---' 1 2 3 4 5 6 100 200 300 ←→ 4 17⍴(' ---   ---   --- ','   1     2     3 ','   4     5     6 ',' 100   200   300 ')
// ⍕1 ⍬ 2 '' 3     ←→ 1 11⍴'1    2    3'
// ⍕∞              ←→ 1 1⍴'∞'
// ⍕¯∞             ←→ 1 2⍴'¯∞'
// ⍕¯1             ←→ 1 2⍴'¯1'
// ⍕¯1e¯100J¯2e¯99 ←→ 1 14⍴'¯1e¯100J¯2e¯99'
voc['⍕']=(y,x)=>{x&&nyiErr();let t=format(y);return A(t.join(''),[t.length,t[0].length])}

const format=a=>{ // as array of strings
  let t=typeof a
  if(a===null)return['null']
  if(t==='undefined')return['undefined']
  if(t==='string')return[a]
  if(t==='number'){let r=[fmtNum(a)];r.align='right';return r}
  if(t==='function')return['#procedure']
  if(!a.isA)return[''+a]
  if(!a.a.length)return['']

  let sa=a.s
  a=toArray(a)
  if(!sa.length)return format(a[0])
  let nRows=prd(sa.slice(0,-1))
  let nCols=sa[sa.length-1]
  let rows=[];for(let i=0;i<nRows;i++)rows.push({height:0,bottomMargin:0})
  let cols=[];for(let i=0;i<nCols;i++)cols.push({type:0,width:0,leftMargin:0,rightMargin:0}) // type:0=characters,1=numbers,2=subarrays

  let grid=[]
  for(let i=0;i<nRows;i++){
    let r=rows[i],gridRow=[];grid.push(gridRow)
    for(let j=0;j<nCols;j++){
      let c=cols[j],x=a[nCols*i+j],box=format(x)
      r.height=Math.max(r.height,box.length)
      c.width=Math.max(c.width,box[0].length)
      c.type=Math.max(c.type,typeof x==='string'&&x.length===1?0:x.isA?2:1)
      gridRow.push(box)
    }
  }

  let step=1;for(let d=sa.length-2;d>0;d--){step*=sa[d];for(let i=step-1;i<nRows-1;i+=step)rows[i].bottomMargin++}

  for(let j=0;j<nCols;j++){
    let c=cols[j]
    if(j<nCols-1&&(c.type!==cols[j+1].type||c.type))c.rightMargin++
    if(c.type===2){c.leftMargin++;c.rightMargin++}
  }

  let result=[]
  for(let i=0;i<nRows;i++){
    let r=rows[i]
    for(let j=0;j<nCols;j++){
      let c=cols[j]
      let t=grid[i][j]
      let left =' '.repeat(c.leftMargin +(t.align==='right')*(c.width-t[0].length))
      let right=' '.repeat(c.rightMargin+(t.align!=='right')*(c.width-t[0].length))
      for(let k=0;k<t.length;k++)t[k]=left+t[k]+right
      let bottom=' '.repeat(t[0].length)
      for(let h=r.height+r.bottomMargin-t.length;h>0;h--)t.push(bottom)
    }
    let nk=r.height+r.bottomMargin
    for(let k=0;k<nk;k++){
      let s='';for(let j=0;j<nCols;j++)s+=grid[i][j][k]
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
// a←3 2 5⍴'joe  doe  bob  jonesbob  zwart'  ⋄  a[⍋a;;] ←→ 3 2 5⍴'bob  jonesbob  zwartjoe  doe  '
// 'ZYXWVUTSRQPONMLKJIHGFEDCBA'⍋'ZAMBIA' ←→ 0 2 4 3 1 5
// ⎕A←'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ⋄ (⌽⎕A)⍋3 3⍴'BOBALFZAK' ←→ 2 0 1
// a←6 4⍴'ABLEaBLEACREABELaBELACES' ⋄ a[(2 26⍴'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')⍋a;] ←→ 6 4⍴'ABELaBELABLEaBLEACESACRE'
// a←6 4⍴'ABLEaBLEACREABELaBELACES' ⋄ a[('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')⍋a;] ←→ 6 4⍴'ABELABLEACESACREaBELaBLE'
// ⍋0 1 2 3 4 3 6 6 4 9 1 11 12 13 14 15 ←→ 0 1 10 2 3 5 4 8 6 7 9 11 12 13 14 15
voc['⍋']=(y,x)=>grade(y,x,1)
// ⍒3 1 8 ←→ 2 0 1
voc['⍒']=(y,x)=>grade(y,x,-1)
const grade=(y,x,dir)=>{
  let h={} // maps a character to its index in the collation
  if(x){
    x.s.length||rnkErr();let ni=prd(x.s.slice(0,-1)),nj=x.s[x.s.length-1]
    for(let i=0;i<ni;i++)for(let j=0;j<nj;j++){const u=x.a[i*nj+j];typeof u==='string'||domErr();h[u]=j}
  }
  y.s.length||rnkErr()
  let r=[];for(let i=0;i<y.s[0];i++)r.push(i)
  const d=strideForShape(y.s)
  return A(r.sort((i,j)=>{
    let p=0,indices=repeat([0],y.s.length)
    while(1){
      let u=y.a[p+i*d[0]],ku=typeof u
      let v=y.a[p+j*d[0]],kv=typeof v
      if(ku<kv)return-dir
      if(ku>kv)return dir
      if(h[u]!=null)u=h[u]
      if(h[v]!=null)v=h[v]
      if(u<v)return-dir
      if(u>v)return dir
      let a=indices.length-1
      while(a>0&&indices[a]+1===y.s[a]){p-=d[a]*indices[a];indices[a--]=0}
      if(a<=0)break
      p+=d[a];indices[a]++
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
  if(f.isA){let h=f;f=x;x=h}
  asrt(typeof f==='function')
  asrt(x.isA)
  x.a.length===1||rnkErr()
  if(x.s.length)x=A.scalar(unwrap(x))
  return withId(x,(y,x,axis)=>f(y,x,axis))
})

voc['⍳']=(y,x)=>{
  if(x){
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
    x.s.length===1||rnkErr()
    const m=x.a.length,n=y.a.length,r=new Float64Array(n)
    for(let i=0;i<n;i++){r[i]=x.s[0];for(let j=0;j<m;j++)if(match(y.a[i],x.a[j])){r[i]=j;break}}
    return A(r,y.s)
  }else{
    // ⍳5     ←→ 0 1 2 3 4
    // ⍴⍳5    ←→ 1⍴5
    // ⍳0     ←→ ⍬
    // ⍴⍳0    ←→ ,0
    // ⍳2 3 4 ←→ 2 3 4⍴(0 0 0)(0 0 1)(0 0 2)(0 0 3)(0 1 0)(0 1 1)(0 1 2)(0 1 3)(0 2 0)(0 2 1)(0 2 2)(0 2 3)(1 0 0)(1 0 1)(1 0 2)(1 0 3)(1 1 0)(1 1 1)(1 1 2)(1 1 3)(1 2 0)(1 2 1)(1 2 2)(1 2 3)
    // ⍴⍳2 3 4 ←→ 2 3 4
    // ⍳¯1 !!! DOMAIN ERROR
    y.s.length<=1||rnkErr()
    let a=toArray(y);for(let i=0;i<a.length;i++)isInt(a[i],0)||domErr()
    let n=prd(a),m=a.length,data,r=new Float64Array(n*m),p=1,q=n
    for(let i=0;i<m;i++){
      let ai=a[i],u=i-m;q/=a[i];for(let j=0;j<p;j++)for(let k=0;k<ai;k++)for(let l=0;l<q;l++)r[u+=m]=k
      p*=ai
    }
    if(m===1){data=r}else{data=Array(n);for(let i=0;i<n;i++)data[i]=A(r.slice(m*i,m*i+m))}
    return A(data,a)
  }
}

// ⍴⊂2 3⍴⍳6←→⍬ ⍙ ⍴⍴⊂2 3⍴⍳6←→,0 ⍙ ⊂[0]2 3⍴⍳6←→(0 3)(1 4)(2 5) ⍙ ⍴⊂[0]2 3⍴⍳6←→,3 ⍙ ⊂[1]2 3⍴⍳6←→(0 1 2)(3 4 5)
// ⍴⊂[1]2 3⍴⍳6←→,2 ⍙ ⊃⊂[1 0]2 3⍴⍳6←→3 2⍴0 3 1 4 2 5 ⍙ ⍴⊂[1 0]2 3⍴⍳6←→⍬ ⍙ ⍴⊃⊂⊂1 2 3←→⍬
voc['⊂']=(y,x,axes)=>{
  asrt(!x)
  if(isSimple(y))return y
  if(axes==null){axes=[];for(let i=0;i<y.s.length;i++)axes.push(i)}else{axes=getAxisList(axes,y.s.length)}
  let rAxes=[],axisMask=new Uint8Array(y.s.length)
  for(let k=0;k<y.s.length;k++){if(axes.indexOf(k)<0){rAxes.push(k)}else{axisMask[k]=1}}
  let rs=rAxes.map(k=>y.s[k]), rd=strideForShape(rs)
  let us=axes .map(k=>y.s[k]), ud=strideForShape(us), un=prd(us)
  let allAxes=rAxes.concat(axes)
  let a=Array(prd(rs)),d=strideForShape(y.s)
  for(let i=0;i<a.length;i++){a[i]=typeof y.a==='string'||y.a instanceof Array?Array(un):new Float64Array(un)}
  const f=(k,l,p,q,t)=>{
    if(k+l>=y.s.length){a[p][q]=y.a[t]}
    else if(axisMask[k+l]){for(let i=0;i<us[l];i++)f(k,l+1,p,q+i*ud[l],t+i*d[axes[l]])}
    else                  {for(let i=0;i<rs[k];i++)f(k+1,l,p+i*rd[k],q,t+i*d[rAxes[k]])}
  }
  f(0,0,0,0,0)
  for(let i=0;i<a.length;i++)a[i]=A(a[i],us)
  return A(a,rs)
}

// ~0 1←→1 0 ⍙ ~2 !!! DOMAIN ERROR
voc['~']=perv(x=>+!bool(x))

// 0 0 1 1∨0 1 0 1←→0 1 1 1 ⍙ 12∨18←→6 ⍙ 299∨323←→1 ⍙ 12345∨12345←→12345 ⍙ 0∨123←→123 ⍙ 123∨0←→123 ⍙ ∨/⍬←→0
// ¯12∨18←→6 ⍙ 12∨¯18←→6 ⍙ ¯12∨¯18←→6 ⍙ 135j¯14∨155j34←→5j12 ⍙ 2 3 4∨0j1 1j2 2j3←→1 1 1 ⍙ 2j2 2j4∨5j5 4j4←→1j1 2
// 1.5∨2.5 !!! DOMAIN ERROR ⍙ 'a'∨1 !!! DOMAIN ERROR ⍙ 1∨'a' !!! DOMAIN ERROR ⍙ 'a'∨'b' !!! DOMAIN ERROR
voc['∨']=withId(0,perv(null,(y,x)=>Z.isint(x)&&Z.isint(y)?Z.gcd(x,y):domErr()))

// 0 0 1 1∧0 1 0 1                ←→ 0 0 0 1
// t←3 3⍴1 1 1 0 0 0 1 0 1 ⋄ 1∧t  ←→ 3 3⍴1 1 1 0 0 0 1 0 1
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
voc['∧']=withId(1,perv(null,(y,x)=>Z.isint(x)&&Z.isint(y)?Z.lcm(x,y):domErr()))

// 0 0 1 1⍱0 1 0 1 ←→ 1 0 0 0
// 0⍱2 !!! DOMAIN ERROR
voc['⍱']=perv(null,real((y,x)=>+!(bool(x)|bool(y))))

// 0 0 1 1⍲0 1 0 1 ←→ 1 1 1 0
// 0⍲2 !!! DOMAIN ERROR
voc['⍲']=perv(null,real((y,x)=>+!(bool(x)&bool(y))))

// ({⍵+1}⍣5)3 ←→ 8
// ({⍵+1}⍣0)3 ←→ 3
// (⍴⍣3)2 2⍴⍳4 ←→ ,1
// 'a'(,⍣3)'b' ←→ 'aaab'
// 1{⍺+÷⍵}⍣=1 ←→ 1.618033988749895
// c←0 ⋄ 5⍣{c←c+1}0 ⋄ c ←→ 5
voc['⍣']=conj((g,f)=>{
  if(f.isA&&typeof g==='function'){let h=f;f=g;g=h}else{asrt(typeof f==='function')}
  if(typeof g==='function'){
    return(y,x)=>{while(1){let y1=f(y,x);if(toInt(g(y,y1),0,2))return y;y=y1}}
  }else{
    let n=toInt(g,0);return(y,x)=>{for(let i=0;i<n;i++)y=f(y,x);return y}
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
  let s=format(x).join('\n')+'\n'
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
  let s=format(x).join('\n')
  if(typeof window!=='undefined'&&typeof window.alert==='function'){window.alert(s)}else{process.stdout.write(s)}
  return x
}

voc['get_⎕IO']=_=>A.zero //⎕IO←→0 ⍙ ⎕IO←0←→0 ⍙ ⎕IO←1 !!!
voc['set_⎕IO']=x=>{if(match(x,A.zero)){return x}else{domErr()}}

voc['⎕DL']=cps((y,x,_,callback)=>{let t0=+new Date;setTimeout(_=>{callback(A([new Date-t0]))},unwrap(y))})

voc['⎕RE']=(y,x)=>{ // 'b(c+)d'⎕RE'abcd'←→1'bcd'(,'c') ⍙ 'B(c+)d'⎕RE'abcd'←→⍬ ⍙ 'a(b'⎕RE'c' !!! DOMAIN ERROR
  x=toSimpleString(x),y=toSimpleString(y)
  let re;try{re=RegExp(x)}catch(e){domErr(e.toString())}
  let m=re.exec(y);if(!m)return A.zilde
  let r=[m.index];for(let i=0;i<m.length;i++)r.push(A(m[i]||''))
  return A(r)
}

voc['⎕UCS']=(y,x)=>{ // ⎕UCS'a'←→97 ⍙ ⎕UCS'ab'←→97 98 ⍙ ⎕UCS 2 2⍴97+⍳4←→2 2⍴'abcd'
  x&&nyiErr();return map(y,u=>isInt(u,0,0x10000)?String.fromCharCode(u):typeof u==='string'?u.charCodeAt(0):domErr())
}

voc['get_⎕OFF']=_=>{typeof process==='undefined'&&nyiErr();process.exit(0)}

voc['?']=(y,x)=>x?deal(y,x):roll(y)

// n←6 ⋄ r←?n ⋄ (0≤r)∧(r<n) ←→ 1
// ?0   !!! DOMAIN ERROR
// ?1   ←→ 0
// ?1.5 !!! DOMAIN ERROR
// ?'a' !!! DOMAIN ERROR
// ?1j2 !!! DOMAIN ERROR
// ?∞   !!! DOMAIN ERROR
let roll=perv(y=>{isInt(y,1)||domErr();return Math.floor(Math.random()*y)})

// n←100 ⋄ (+/n?n)=(+/⍳n) ←→ 1 # a permutation (an 'n?n' dealing) contains all 0...n
// n←100 ⋄ A←(n÷2)?n ⋄ ∧/(0≤A),A<n ←→ 1 # any number x in a dealing is 0 <= x < n
// 0?100 ←→ ⍬
// 0?0   ←→ ⍬
// 1?1   ←→ ,0
// 1?1 1 !!! LENGTH ERROR
// 5?3   !!! DOMAIN ERROR
// ¯1?3  !!! DOMAIN ERROR
const deal=(y,x)=>{
  x=unwrap(x);y=unwrap(y)
  isInt(y,0)&&isInt(x,0,y+1)||domErr()
  let r=Array(y);for(let i=0;i<y;i++)r[i]=i
  for(let i=0;i<x;i++){let j=i+Math.floor(Math.random()*(y-i));const h=r[i];r[i]=r[j];r[j]=h}
  return A(r.slice(0,x))
}

// ↗'CUSTOM ERROR' !!! CUSTOM ERROR
voc['↗']=y=>err(toSimpleString(y))

voc['⍴']=(y,x)=>{
  if(x){
    // 2 5⍴¨⊂1 2 3←→(1 2)(1 2 3 1 2) ⍙ ⍴1 2 3⍴0←→1 2 3 ⍙ ⍴⍴1 2 3⍴0←→,3 ⍙ 2 3⍴⍳5←→2 3⍴0 1 2 3 4 0
    // ⍬⍴123←→123 ⍙ ⍬⍴⍬←→0 ⍙ 2 3⍴⍬←→2 3⍴0 ⍙ 2 3⍴⍳7←→2 3⍴0 1 2 3 4 5
    x.s.length<=1||rnkErr()
    let s=toArray(x),n=prd(s),m=y.a.length,a=y.a
    for(let i=0;i<s.length;i++)isInt(s[i],0)||domErr
    if(!m){m=1;a=[0]}
    let r=Array(n);for(let i=0;i<n;i++)r[i]=a[i%m]
    return A(r,s)
  }else{
    //⍴0←→0⍴0 ⍙ ⍴0 0←→1⍴2 ⍙ ⍴⍴0←→1⍴0 ⍙ ⍴⍴⍴0←→1⍴1 ⍙ ⍴⍴⍴0 0←→1⍴1 ⍙ ⍴'a'←→0⍴0 ⍙ ⍴'ab'←→1⍴2 ⍙ ⍴2 3 4⍴0←→2 3 4
    return A(new Float64Array(y.s))
  }
}

voc['⌽']=(y,x,axis)=>{
  asrt(typeof axis==='undefined'||axis.isA)
  if(x){
    // 1⌽1 2 3 4 5 6             ←→ 2 3 4 5 6 1
    // 3⌽'ABCDEFGH'              ←→ 'DEFGHABC'
    // 3⌽2 5⍴1 2 3 4 5 6 7 8 9 0 ←→ 2 5⍴4 5 1 2 3 9 0 6 7 8
    // ¯2⌽'ABCDEFGH'             ←→ 'GHABCDEF'
    // 1⌽3 3⍴⍳9                  ←→ 3 3⍴1 2 0 4 5 3 7 8 6
    // 0⌽1 2 3 4                 ←→ 1 2 3 4
    // 0⌽1234                    ←→ 1234
    // 5⌽⍬                       ←→ ⍬
    axis=axis?unwrap(axis):y.s.length-1
    isInt(axis)||domErr()
    if(y.s.length&&!(0<=axis&&axis<y.s.length))idxErr()
    let step=unwrap(x)
    isInt(step)||domErr()
    if(!step)return y
    let n=y.s[axis]
    step=(n+step%n)%n // force % to handle negatives properly
    if(!y.a.length||!step)return y
    let r=[],d=strideForShape(y.s),p=0,i=repeat([0],y.s.length)
    while(1){
      r.push(y.a[p+((i[axis]+step)%y.s[axis]-i[axis])*d[axis]])
      let a=y.s.length-1;while(a>=0&&i[a]+1===y.s[a]){p-=i[a]*d[a];i[a--]=0}
      if(a<0)break
      i[a]++;p+=d[a]
    }
    return A(r,y.s)
  }else{
    // ⌽1 2 3 4 5 6                 ←→ 6 5 4 3 2 1
    // ⌽(1 2)(3 4)(5 6)             ←→ (5 6)(3 4)(1 2)
    // ⌽'BOB WON POTS'              ←→ 'STOP NOW BOB'
    // ⌽    2 5⍴1 2 3 4 5 6 7 8 9 0 ←→ 2 5⍴5 4 3 2 1 0 9 8 7 6
    // ⌽[0] 2 5⍴1 2 3 4 5 6 7 8 9 0 ←→ 2 5⍴6 7 8 9 0 1 2 3 4 5
    if(axis){
      axis.a.length===1||lenErr()
      axis=unwrap(axis)
      isInt(axis)||domErr()
      0<=axis&&axis<y.s.length||idxErr()
    }else{
      axis=[y.s.length-1]
    }
    if(!y.s.length)return y
    const ni=prd(y.s.slice(0,axis)),nj=y.s[axis],nk=prd(y.s.slice(axis+1)),r=Array(ni*nj*nk)
    for(let i=0;i<ni;i++)for(let j=0;j<nj;j++)for(let k=0;k<nk;k++)r[(i*nj+j)*nk+k]=y.a[(i*nj+nj-1-j)*nk+k]
    return A(r,y.s)
  }
}

// ⊖1 2 3 4 5 6←→6 5 4 3 2 1
// ⊖(1 2)(3 4)(5 6)←→(5 6)(3 4)(1 2)
// ⊖'bob won pots'←→'stop now bob'
// ⊖   2 5⍴1 2 3 4 5 6 7 8 9 0←→2 5⍴6 7 8 9 0 1 2 3 4 5
// ⊖[1]2 5⍴1 2 3 4 5 6 7 8 9 0←→2 5⍴5 4 3 2 1 0 9 8 7 6
// 1⊖3 3⍴⍳9←→3 3⍴3 4 5 6 7 8 0 1 2
voc['⊖']=(y,x,axis)=>voc['⌽'](y,x,axis||A.zero)

voc['⌿']=adv((y,x,axis)=>voc['/'](y,x,axis||A.zero))
voc['/']=adv((y,x,axis)=>{
  if(typeof y==='function'){
    // +/3←→3 ⍙ +/3 5 8←→16 ⍙ ⌈/82 66 93 13←→93 ⍙ ×/2 3⍴1 2 3 4 5 6←→6 120 ⍙ -/3 0⍴42←→3⍴0
    // 2,/'ab' 'cd' 'ef' 'hi'←→'abcd' 'cdef' 'efhi'
    // 3,/'ab' 'cd' 'ef' 'hi'←→'abcdef' 'cdefhi'
    // 2+/1+⍳5←→3 5 7 9 ⍙ 5+/1+⍳8←→15 20 25 30 ⍙ 10+/1+⍳10←→,55 ⍙ 11+/1+⍳10←→⍬ ⍙ 12+/1+⍳10 !!! LENGTH ERROR
    // 2-/3 4 9 7←→¯1 ¯5 2 ⍙ ¯2-/3 4 9 7←→1 5 ¯2
    let f=y,g=x,axis0=axis
    asrt(typeof f==='function')
    asrt(typeof g==='undefined')
    asrt(typeof axis0==='undefined'||axis0.isA)
    return(y,x)=>{
      if(!y.s.length)y=A([unwrap(y)])
      axis=axis0?toInt(axis0):y.s.length-1
      0<=axis&&axis<y.s.length||rnkErr()
      let n,isNWise,isBackwards
      if(x){isNWise=1;n=toInt(x);if(n<0){isBackwards=1;n=-n}}else{n=y.s[axis]}

      let shape=y.s.slice(0);shape[axis]=y.s[axis]-n+1
      let rShape=shape
      if(isNWise){
        if(!shape[axis])return A([],rShape)
        shape[axis]>=0||lenErr()
      }else{
        rShape=rShape.slice(0);rShape.splice(axis,1)
      }

      if(!y.a.length){
        let z=f.identity;z!=null||domErr();asrt(!z.s.length)
        return A(repeat([z.a[0]],prd(rShape)),rShape)
      }

      let data=[],indices=repeat([0],shape.length),p=0,u,d=strideForShape(y.s)
      while(1){
        if(isBackwards){
          u=y.a[p];u.isA||(u=A.scalar(u))
          for(let i=1;i<n;i++){
            let v=y.a[p+i*d[axis]];v.isA||(v=A.scalar(v))
            u=f(u,v)
          }
        }else{
          u=y.a[p+(n-1)*d[axis]];u.isA||(u=A.scalar(u))
          for(let i=n-2;i>=0;i--){
            let v=y.a[p+i*d[axis]];v.isA||(v=A.scalar(v))
            u=f(u,v)
          }
        }
        u.s.length||(u=unwrap(u))
        data.push(u)
        let a=indices.length-1
        while(a>=0&&indices[a]+1===shape[a]){p-=indices[a]*d[a];indices[a--]=0}
        if(a<0)break
        p+=d[a];indices[a]++
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
    y.s.length||(y=A([unwrap(y)]))
    axis=axis?toInt(axis,0,y.s.length):y.s.length-1
    x.s.length<=1||rnkErr()
    let a=toArray(x),n=y.s[axis]
    if(a.length===1)a=repeat(a,n)
    if(n!==1&&n!==a.length)lenErr()

    let shape=y.s.slice(0);shape[axis]=0
    let b=[]
    for(let i=0;i<a.length;i++){
      let u=a[i]
      isInt(u)||domErr()
      shape[axis]+=Math.abs(u)
      let nj=Math.abs(u);for(let j=0;j<nj;j++)b.push(u>0?i:null)
    }
    if(n===1)for(let i=0;i<b.length;i++)b[i]=b[i]==null?b[i]:0

    let data=[],d=strideForShape(y.s)
    if(shape[axis]&&y.a.length){
      let filler=getPrototype(y),p=0,indices=repeat([0],shape.length)
      while(1){
        data.push(b[indices[axis]]==null?filler:y.a[p+b[indices[axis]]*d[axis]])
        let i=shape.length-1
        while(i>=0&&indices[i]+1===shape[i]){
          if(i!==axis)p-=d[i]*indices[i]
          indices[i--]=0
        }
        if(i<0)break
        if(i!==axis)p+=d[i]
        indices[i]++
      }
    }
    return A(data,shape)
  }
})

// 1⌷3 5 8←→5 ⍙ (3 5 8)[1]←→5 ⍙ (3 5 8)[⍬]←→⍬ ⍙ (2 2 0)(1 2)⌷3 3⍴⍳9←→3 2⍴7 8 7 8 1 2 ⍙ ¯1⌷3 5 8 !!! INDEX ERROR
// 2⌷111 222 333 444←→333
// (⊂3 2)⌷111 222 333 444←→444 333
// (⊂2 3⍴2 0 3 0 1 2)⌷111 222 333 444←→2 3⍴333 111 444 111 222 333
// 1 0   ⌷3 4⍴11 12 13 14 21 22 23 24 31 32 33 34←→21
// 1     ⌷3 4⍴11 12 13 14 21 22 23 24 31 32 33 34←→21 22 23 24
// 2(1 0)⌷3 4⍴11 12 13 14 21 22 23 24 31 32 33 34←→32 31
// (1 2)0⌷3 4⍴11 12 13 14 21 22 23 24 31 32 33 34←→21 31
// a←2 2⍴0 ⋄ a[;0]←1 ⋄ a ←→ 2 2⍴1 0 1 0
// a←2 3⍴0 ⋄ a[1;0 2]←1 ⋄ a ←→ 2 3⍴0 0 0 1 0 1
voc['⌷']=(y,x,axes)=>{
  if(typeof y==='function')return(u,v)=>y(u,v,x)
  x||nyiErr()
  x.s.length>1&&rnkErr()
  let a=toArray(x);a.length>y.s.length&&lenErr()
  if(axes){
    axes=toArray(axes)
    a.length===axes.length||lenErr()
    let h=Array(y.s.length)
    for(let i=0;i<axes.length;i++){
      let axis=axes[i]
      isInt(axis)||domErr()
      0<=axis&&axis<y.s.length||rnkErr()
      h[axis]&&rnkErr()
      h[axis]=1
    }
  }else{
    axes=[];for(let i=0;i<a.length;i++)axes.push(i)
  }
  let r=y;for(let i=a.length-1;i>=0;i--)r=indexAtSingleAxis(r,a[i].isA?a[i]:A([a[i]],[]),axes[i])
  return r
}
const indexAtSingleAxis=(x,y,ax)=>{ // y:subscript
  asrt(x.isA&&y.isA&&isInt(ax)&&0<=ax&&ax<x.s.length)
  const ni=prd(x.s.slice(0,ax)),nj0=x.s[ax],nj=y.a.length,nk=prd(x.s.slice(ax+1))
       ,s=x.s.slice(0,ax).concat(y.s).concat(x.s.slice(ax+1)),n=ni*nj*nk,r=Array(n)
  for(let j=0;j<nj;j++){const u=y.a[j];isInt(u)||domErr();0<=u&&u<nj0||idxErr()}
  let l=0;for(let i=0;i<ni;i++)for(let j=0;j<nj;j++)for(let k=0;k<nk;k++)r[l++]=x.a[(i*nj0+y.a[j])*nk+k]
  return A(r,s)
}

// (23 54 38)[0]←→23
// (23 54 38)[1]←→54
// (23 54 38)[2]←→38
// (23 54 38)[3] !!! INDEX ERROR
// (23 54 38)[¯1] !!! INDEX ERROR
// (23 54 38)[0 2]←→23 38
// (2 3⍴100 101 102 110 111 112)[1;2]  ←→ 112
// (2 3⍴100 101 102 110 111 112)[1;¯1] !!! INDEX ERROR
// (2 3⍴100 101 102 110 111 112)[10;1] !!! INDEX ERROR
// (2 3⍴100 101 102 110 111 112)[1;]   ←→ 110 111 112
// (2 3⍴100 101 102 110 111 112)[;1]   ←→ 101 111
// 'hello'[1]←→'e' ⍙ 'ipodlover'[1 2 5 8 3 7 6 0 4]←→'poordevil' ⍙ ('axlrose'[4 3 0 2 5 6 1])[⍳4]←→'oral'
// (1 2 3)[⍬]                          ←→ ⍬
// ⍴(1 2 3)[1 2 3 0 5⍴0]               ←→ 1 2 3 0 5
// (⍳3)[]                              ←→ ⍳3
// ⍴(3 3⍴⍳9)[⍬;⍬]                      ←→ 0 0
// ' X'[(3 3⍴⍳9)∊1 3 6 7 8] ←→ 3 3⍴' X ','X  ','XXX'
voc._index=(alphaAndAxes,y)=>{let h=toArray(alphaAndAxes),x=h[0],axes=h[1];return voc['⌷'](y,x,axes)}

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
  let h=toArray(args).map(u=>u.isA?u:A([u],[]))
  let value=h[0],x=h[1],y=h[2],axes=h[3]
  x.s.length>1&&rnkErr()
  let a=toArray(x);a.length>y.s.length&&lenErr()
  if(axes){
    axes.s.length>1&&rnkErr()
    axes=toArray(axes)
    a.length===axes.length||lenErr()
  }else{
    axes=[];for(let i=0;i<a.length;i++)a.push(i)
  }
  let subs=voc['⌷'](voc['⍳'](A(y.s)),x,A(axes))
  if(value.a.length===1)value=A(repeat([value],subs.a.length),subs.s)
  let data=toArray(y),stride=strideForShape(y.s)
  subs.s.length!==value.s.length&&rnkErr();''+subs.s!=''+value.s&&lenErr()
  const ni=subs.a.length
  for(let i=0;i<ni;i++){
    let u=subs.a[i], v=value.a[i]
    if(v.isA&&!v.s.length)v=unwrap(v)
    if(u.isA){
      let p=0,ua=toArray(u)
      for(let j=0;j<ua.length;j++)p+=ua[j]*stride[j]
      data[p]=v
    }else{
      data[u]=v
    }
  }
  return A(data,y.s)
}

voc['↑']=(y,x)=>x?take(y,x):first(y)

// 2↑⎕a←→'AB' ⍙ ¯3↑⎕a←→'XYZ' ⍙ 5↑'abc'←→'abc  ' ⍙ ¯5↑'abc'←→'  abc' ⍙ 3↑⍳2←→0 1 0 ⍙ ¯1↑⍳4←→,3
// ⍴1↑(2 2⍴⍳4)(⍳10)←→,1 ⍙ 2↑1←→1 0 ⍙ 2 ¯2↑1 1⍴1←→2 2⍴0 1 0 0 ⍙ 3 3↑1 1⍴'a'←→3 3⍴'a        '
// 2 3↑1+4 3⍴⍳12←→2 3⍴1 2 3 4 5 6 ⍙ ¯1 3↑1+4 3⍴⍳12←→1 3⍴10 11 12 ⍙ 1 2↑1+4 3⍴⍳12←→1 2⍴1 2
// 3↑⍬←→0 0 0 ⍙ ¯2↑⍬←→0 0 ⍙ 0↑⍬←→⍬ ⍙ 3 3↑1←→3 3⍴1 0 0 0 0 0 0 0 0 ⍙ 2↑3 3⍴⍳9←→2 3⍴⍳6
// ¯2↑3 3⍴⍳9←→2 3⍴3+⍳6 ⍙ 4↑3 3⍴⍳9←→4 3⍴(⍳9),0 0 0 ⍙ ⍬↑3 3⍴⍳9←→3 3⍴⍳9
const take=(x,y)=>{
  y.s.length<=1||rnkErr()
  if(!x.s.length)x=A([unwrap(x)],y.s.length?repeat([1],y.s[0]):[1])
  let a=toArray(y);a.length<=x.s.length||rnkErr()
  for(let i=0;i<a.length;i++)typeof a[i]==='number'&&a[i]===Math.floor(a[i])||domErr()
  let s=x.s.slice(0);for(let i=0;i<a.length;i++)s[i]=Math.abs(a[i])
  let d=Array(s.length);d[d.length-1]=1
  for(let i=d.length-1;i>0;i--)d[i-1]=d[i]*s[i]
  let r=repeat([getPrototype(x)],prd(s))
  let cs=s.slice(0),p=0,q=0,xd=strideForShape(x.s) // cs:shape to copy
  for(let i=0;i<a.length;i++){
    let u=a[i];cs[i]=Math.min(x.s[i],Math.abs(u))
    if(u<0){if(u<-x.s[i]){q-=(u+x.s[i])*d[i]}else{p+=(u+x.s[i])*xd[i]}}
  }
  if(prd(cs)){
    let ci=new Int32Array(cs.length) // ci:indices for copying
    while(1){
      r[q]=x.a[p];let axis=cs.length-1
      while(axis>=0&&ci[axis]+1===cs[axis]){p-=ci[axis]*xd[axis];q-=ci[axis]*d[axis];ci[axis--]=0}
      if(axis<0)break
      p+=xd[axis];q+=d[axis];ci[axis]++
    }
  }
  return A(r,s)
}

// ↑(1 2 3)(4 5 6)←→1 2 3 ⍙ ↑(1 2)(3 4 5)←→1 2 ⍙ ↑'ab'←→'a' ⍙ ↑123←→123 ⍙ ↑⍬←→0
const first=x=>{let y=x.a.length?x.a[0]:getPrototype(x);return y.isA?y:A([y],[])}

voc['⍉']=(y,x)=>{
  let a
  if(x){
    // 0⍉1 2←→1 2 ⍙ (2 2⍴⍳4)⍉2 2 2 2⍴⍳3 !!! RANK ERROR
    // 1 0⍉2 2 2⍴⍳8 !!! LENGTH ERROR ⍙ ¯1⍉1 2 !!! DOMAIN ERROR ⍙ 'a'⍉1 2 !!! DOMAIN ERROR ⍙ 3⍉0 1 !!! RANK ERROR
    // 2 0 1⍉2 3 4⍴⎕a←→3 4 2⍴'AMBNCODPEQFRGSHTIUJVKWLX' ⍙ 0 0 2⍉2 3 4⍴⍳24 !!! RANK ERROR
    // 0 0⍉3 3⍴⍳9←→0 4 8 ⍙ 0 0⍉2 3⍴⍳9←→0 4 ⍙ 0 0 0⍉3 3 3⍴⍳27←→0 13 26 ⍙ 0 1 0⍉3 3 3⍴⎕a←→3 3⍴'ADGKNQUXA'
    x.s.length<=1||rnkErr()
    x.s.length||(x=A([unwrap(x)]))
    x.s[0]===y.s.length||lenErr()
    a=toArray(x)
  }else{
    // ⍉⍬←→⍬ ⍙ ⍉''←→'' ⍙ ⍉⍳3←→0 1 2 ⍙ ⍉2 3⍴⍳6←→3 2⍴0 3 1 4 2 5 ⍙ ⍉2 3 4⍴⎕a←→4 3 2⍴'AMEQIUBNFRJVCOGSKWDPHTLX'
    a=[];for(let i=y.s.length-1;i>=0;i--)a.push(i)
  }
  let s=[],d=[],d0=strideForShape(y.s)
  for(let i=0;i<a.length;i++){
    let x=a[i];isInt(x,0)||domErr();x<y.s.length||rnkErr()
    if(s[x]==null){s[x]=y.s[i];d[x]=d0[i]}
    else{s[x]=Math.min(s[x],y.s[i]);d[x]+=d0[i]}
  }
  for(let i=0;i<s.length;i++)s[i]!=null||rnkErr()
  let n=prd(s),r=Array(n),j=new Int32Array(s.length),p=0,l=s.length-1
  for(let i=0;i<n;i++){
    r[i]=y.a[p]
    let u=l;while(u>=0&&j[u]+1===s[u]){p-=j[u]*d[u];j[u--]=0}
    if(u<0)break
    j[u]++;p+=d[u]
  }
  return A(r,s)
}

voc['⍠']=conj((f,g)=>(y,x,axis)=>(x?f:g)(y,x,axis)) // ({1}⍠{2})0←→1 ⍙ 0({1}⍠{2})0←→2
const NOUN=1,VERB=2,ADV=3,CONJ=4
,exec=(s,o={})=>{ // s:APL code, o:options
  let ast=parse(s,o),code=compileAST(ast,o),env=[prelude.env[0].slice(0)]
  for(let k in ast.vars)env[0][ast.vars[k].slot]=o.ctx[k]
  let r=vm(code,env)
  for(let k in ast.vars){
    let v=ast.vars[k],x=o.ctx[k]=env[0][v.slot]
    if(v.ctg===ADV)x.adv=1
    if(v.ctg===CONJ)x.conj=1
  }
  return r
}
,repr=x=>x===null||['string','number','boolean'].indexOf(typeof x)>=0?JSON.stringify(x):
         x instanceof Array?'['+x.map(repr).join(',')+']':
         x.repr?x.repr():'{'+Object.keys(x).map(k=>repr(k)+':'+repr(x[k])).join(',')+'}'
,compileAST=(ast,o={})=>{
  ast.scopeDepth=0
  ast.nSlots=prelude?prelude.nSlots:0
  ast.vars=prelude?Object.create(prelude.vars):{}
  o.ctx=o.ctx||Object.create(voc)
  for(let key in o.ctx)if(!ast.vars[key]){
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
        let r=VERB;for(let i=1;i<node.length;i++)if(node[i])r=Math.max(r,ctgriseLambdas(node[i]))
        if(node[0]==='{'){node.ctg=r;return VERB}else{return r}
      case'S':case'N':case'J':return 0
      case'X':let s=node[1];return s==='⍺⍺'||s==='⍶'||s==='∇∇'?ADV:s==='⍵⍵'||s==='⍹'?CONJ:VERB
      default:asrt(0)
    }
  }
  ctgriseLambdas(ast)
  let queue=[ast] // accumulates "body" nodes we encounter on the way
  while(queue.length){
    let scopeNode=queue.shift(),vars=scopeNode.vars
    const visit=node=>{
      node.scopeNode=scopeNode
      switch(node[0]){
        case':':{let r=visit(node[1]);visit(node[2]);return r}
        case'←':return visitLHS(node[1],visit(node[2]))
        case'X':
          let name=node[1],v=vars['get_'+name],r
          if(v&&v.ctg===VERB){
            return NOUN
          }else{
            // x ⋄ x←0 !!! VALUE ERROR
            return vars[name]&&vars[name].ctg||
              valErr('Symbol '+name+' is referenced before assignment.',
                {file:o.file,offset:node.offset,aplCode:o.aplCode})
          }
        case'{':
          for(let i=1;i<node.length;i++){
            let d,v
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
        case'[':{
          for(let i=2;i<node.length;i++)if(node[i]&&visit(node[i])!==NOUN)err(node,'Indices must be nouns.')
          return visit(node[1])
        }
        case'.':{
          let a=node.slice(1),h=Array(a.length)
          for(let i=a.length-1;i>=0;i--)h[i]=visit(a[i])
          // strands
          let i=0
          while(i<a.length-1){
            if(h[i]===NOUN&&h[i+1]===NOUN){
              let j=i+2;while(j<a.length&&h[j]===NOUN)j++
              a.splice(i,j-i,['V'].concat(a.slice(i,j)))
              h.splice(i,j-i,NOUN)
            }else{
              i++
            }
          }
          // adverbs and conjunctions
          i=0
          while(i<a.length){ // ⌽¨⍣3⊢(1 2)3(4 5 6)←→(2 1)3(6 5 4)
            if(h[i]===VERB&&i+1<a.length&&h[i+1]===ADV){
              a.splice(i,2,['A'].concat(a.slice(i,i+2)));h.splice(i,2,VERB)
            }else if((h[i]===NOUN||h[i]===VERB||h[i]===CONJ)&&i+2<a.length&&h[i+1]===CONJ&&(h[i+2]===NOUN||h[i+2]===VERB)){
              a.splice(i,3,['C'].concat(a.slice(i,i+3)));h.splice(i,3,VERB) // allow CONJ,CONJ,... for ∘.f
            }else{
              i++
            }
          }
          if(h.length===2&&h[0]!==NOUN&&h[1]!==NOUN){a=[['T'].concat(a)];h=[VERB]}     // atops
          if(h.length>=3&&h.length%2&&h.indexOf(NOUN)<0){a=[['F'].concat(a)];h=[VERB]} // forks
          if(h[h.length-1]!==NOUN){
            if(h.length>1)err(a[h.length-1],'Trailing function in expression')
          }else{
            while(h.length>1){ // monadic and dyadic verbs
              if(h.length===2||h[h.length-3]!==NOUN){a.splice(-2,9e9,['M'].concat(a.slice(-2)));h.splice(-2,9e9,NOUN)}
              else                                  {a.splice(-3,9e9,['D'].concat(a.slice(-3)));h.splice(-3,9e9,NOUN)}
            }
          }
          node.splice(0,9e9,a[0]);extend(node,a[0]);return h[0]
        }
      }
      asrt(0)
    }
    const visitLHS=(node,rhsCtg)=>{
      node.scopeNode=scopeNode
      switch(node[0]){
        case'X':
          let name=node[1];if(name==='∇'||name==='⍫')err(node,'Assignment to '+name+' is not allowed.')
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
          for(let i=1;i<node.length;i++)visitLHS(node[i],rhsCtg)
          break
        case'[':
          rhsCtg===NOUN||err(node,'Indexed assignment can be used only for nouns.')
          visitLHS(node[1],rhsCtg);for(let i=2;i<node.length;i++)node[i]&&visit(node[i])
          break
        default:asrt(0)
      }
      return rhsCtg
    }
    for(let i=1;i<scopeNode.length;i++)visit(scopeNode[i])
  }
  const render=node=>{
    switch(node[0]){
      case'B':
        if(node.length===1)return[LDC,A.zilde,RET] // {}0 ←→ ⍬
        let a=[];for(let i=1;i<node.length;i++){a.push.apply(a,render(node[i]));a.push(POP)}
        a[a.length-1]=RET
        return a
      case':':{let x=render(node[1]),y=render(node[2]);return x.concat(JEQ,y.length+2,POP,y,RET)}
      case'←':return render(node[2]).concat(renderLHS(node[1])) // a←5←→5 ⍙ a×a←2 5←→4 25
      case'X':{
        // r←3 ⋄ get_c←{2×○r} ⋄ get_S←{○r*2} ⋄ before←.01×⌊100×r c S ⋄ r←r+1 ⋄ after←.01×⌊100×r c S ⋄ before after ←→ (3 18.84 28.27)(4 25.13 50.26)
        // {⍺}0 !!! VALUE ERROR
        // {x}0 ⋄ x←0 !!! VALUE ERROR
        // {⍫1⋄2}⍬ ←→ 1
        // c←{} ⋄ x←{c←⍫⋄1}⍬ ⋄ {x=1:c 2⋄x}⍬ ←→ 2
        let s=node[1],vars=node.scopeNode.vars,v
        return s==='⍫'?[CON]:
               (v=vars['get_'+s])&&v.ctg===VERB?[LDC,A.zero,GET,v.scopeDepth,v.slot,MON]:
                 [GET,vars[s].scopeDepth,vars[s].slot]
      }
      case'{':{
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
        let x=render(node[1]), lx=[LAM,x.length].concat(x), f
        if(node.length===2){
          f=lx
        }else if(node.length===3){
          let y=render(node[2]),ly=[LAM,y.length].concat(y),v=node.scopeNode.vars['⍠']
          f=ly.concat(GET,v.scopeDepth,v.slot,lx,DYA)
        }else{
          err(node)
        }
        return node.ctg===VERB?f:[LAM,f.length+1].concat(f,RET)
      }
      case'S':{ // ⍴''←→,0 ⍙ ⍴'x'←→⍬ ⍙ ⍴'xx'←→,2 ⍙ ⍴'a''b'←→,3 ⍙ ⍴'''a'←→,2 ⍙ ⍴'a'''←→,2 ⍙ ⍴''''←→⍬ ⍙ 'a !!!
        let s=node[1].slice(1,-1).replace(/''/g,"'");return[LDC,A(s,s.length===1?[]:[s.length])]
      }
      case'N':{ // ∞←→¯ ⍙ ¯∞←→¯¯ ⍙ ¯∞j¯∞←→¯¯j¯¯ ⍙ ∞∞←→¯ ¯ ⍙ ∞¯←→¯ ¯
        let a=node[1].replace(/[¯∞]/g,'-').split(/j/i).map(x=>x==='-'?Infinity:x==='--'?-Infinity:parseFloat(x))
        return[LDC,A([a[1]?new Z(a[0],a[1]):a[0]],[])]
      }
      case'J':{ // 123 + «456 + 789» ←→ 1368
        let f=Function('return(_w,_a)=>('+node[1].replace(/^«|»$/g,'')+')')();return[EMB,(_w,_a)=>aplify(f(_w,_a))]
      }
      case'[':{ // ⍴ x[⍋x←6?40] ←→ ,6
        let v=node.scopeNode.vars._index,axes=[],a=[],c
        for(let i=2;i<node.length;i++)if(c=node[i]){axes.push(i-2);a.push.apply(a,render(c))}
        a.push(VEC,axes.length,LDC,A(axes),VEC,2,GET,v.scopeDepth,v.slot)
        a.push.apply(a,render(node[1]))
        a.push(DYA)
        return a
      }
      case'V':{
        let fragments=[],areAllConst=1
        for(let i=1;i<node.length;i++){
          let f=render(node[i]);fragments.push(f);if(f.length!==2||f[0]!==LDC)areAllConst=0
        }
        return areAllConst?[LDC,A(fragments.map(f=>isSimple(f[1])?unwrap(f[1]):f[1]))]
                         :[].concat.apply([],fragments).concat([VEC,node.length-1])
      }
      case'⍬':return[LDC,A.zilde]
      case'M':return render(node[2]).concat(render(node[1]),MON)
      case'A':return render(node[1]).concat(render(node[2]),MON)
      case'D':case'C':return render(node[3]).concat(render(node[2]),render(node[1]),DYA)
      case'T':{let v=node.scopeNode.vars._atop;return render(node[2]).concat(GET,v.scopeDepth,v.slot,render(node[1]),DYA)}
      case'F':{
        let u=node.scopeNode.vars._atop
        let v=node.scopeNode.vars._fork1
        let w=node.scopeNode.vars._fork2
        let i=node.length-1
        let r=render(node[i--])
        while(i>=2)r=r.concat(GET,v.scopeDepth,v.slot,render(node[i--]),DYA,
                              GET,w.scopeDepth,w.slot,render(node[i--]),DYA)
        return i?r.concat(render(node[1]),GET,u.scopeDepth,u.slot,DYA):r
      }
      default:asrt(0)
    }
  }
  const renderLHS=node=>{
    switch(node[0]){
      case'X':{
        let name=node[1],vars=node.scopeNode.vars,v=vars['set_'+name]
        return v&&v.ctg===VERB?[GET,v.scopeDepth,v.slot,MON]:[SET,vars[name].scopeDepth,vars[name].slot]
      }
      case'.':{
        // (a b)←1 2⋄a←→1
        // (a b)←1 2⋄b←→2
        // (a b)←+ !!!
        // (a b c)←3 4 5⋄a b c←→3 4 5
        // (a b c)←6⋄a b c←→6 6 6
        // (a b c)←7 8⋄a b c !!!
        // ((a b)c)←3(4 5)⋄a b c←→3 3(4 5)
        let n=node.length-1,a=[SPL,n]
        for(let i=1;i<node.length;i++){a.push.apply(a,renderLHS(node[i]));a.push(POP)}
        return a
      }
      case'[':{ // indexed assignment
        let axes=[],a=[],v=node.scopeNode.vars._substitute
        for(let i=2;i<node.length;i++)if(node[i]){axes.push(i-2);a.push.apply(a,render(node[i]))}
        a.push(VEC,axes.length)
        a.push.apply(a,render(node[1]))
        a.push(LDC,A(axes),VEC,4,GET,v.scopeDepth,v.slot,MON)
        a.push.apply(a,renderLHS(node[1]))
        return a
      }
    }
    asrt(0)
  }
  return render(ast)
}
,aplify=x=>{
  if(typeof x==='string')return x.length===1?A.scalar(x):A(x)
  if(typeof x==='number')return A.scalar(x)
  if(x instanceof Array)return A(x.map(y=>{y=aplify(y);return y.s.length?y:unwrap(y)}))
  if(x.isA)return x
  err('Cannot aplify object:'+x)
}
let prelude
;(_=>{
  const ast=parse(preludeSrc)
  const code=compileAST(ast) //creates ast.vars as a side effect
  const vars={};for(let k in ast.vars)vars[k]=ast.vars[k] //flatten prototype chain
  prelude={code,nSlots:ast.nSlots,vars}
  let env=prelude.env=[[]]
  for(let k in prelude.vars)env[0][prelude.vars[k].slot]=voc[k]
  vm(prelude.code,env)
  for(let k in prelude.vars)voc[k]=env[0][prelude.vars[k].slot]
})()
let apl=this.apl=(s,o)=>apl.ws(o)(s) // s:apl code; o:options
extend(apl,{format:format,approx:approx,parse:parse,compileAST:compileAST,repr:repr})
apl.ws=(o={})=>{
  const ctx=Object.create(voc)
  if(o.in )ctx['get_⎕']=ctx['get_⍞']=_=>{let s=o.in();asrt(typeof s==='string');return new A(s)}
  if(o.out)ctx['set_⎕']=ctx['set_⍞']=x=>{o.out(format(x).join('\n')+'\n')}
  return aplCode=>exec(aplCode,{ctx:ctx})
}
const readline=(prompt,f)=>{
  ;(readline.requesters=readline.requesters||[]).push(f)
  let rl=readline.rl
  if(!rl){
    rl=readline.rl=require('readline').createInterface(process.stdin,process.stdout)
    rl.on('line',x=>{let h=readline.requesters.pop();h&&h(x)})
    rl.on('close',_=>{process.stdout.write('\n');process.exit(0)})
  }
  rl.setPrompt(prompt);rl.prompt()
}
if(typeof module!=='undefined'){
  module.exports=apl
  if(module===require.main)(_=>{
    let usage='Usage: apl.js [options] [filename.apl]\n'+
              'Options:\n'+
              '  -l --linewise   Process stdin line by line and disable prompt\n'
    let file,linewise
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
      let fs=require('fs'),ws=apl.ws(),a=Buffer(256),i=0,n=0,b=Buffer(a.length),k
      while(k=fs.readSync(0,b,0,b.length)){
        if(n+k>a.length)a=Buffer.concat([a,a])
        b.copy(a,n,0,k);n+=k
        while(i<n){
          if(a[i]===10){ // '\n'
            let r;try{r=format(ws(''+a.slice(0,i))).join('\n')+'\n'}catch(e){r=e+'\n'}
            process.stdout.write(r);a.copy(a,0,i+1);n-=i+1;i=0
          }else{
            i++
          }
        }
      }
    }else if(!require('tty').isatty()){
      let fs=require('fs'),b=Buffer(1024),n=0,k
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
