//usr/bin/env node "$0" $@;exit $?
'use strict'
const prelude=`
⍬←() ⋄ ⎕d←'0123456789' ⋄ ⎕a←'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
~←~⍠{(~⍺∊⍵)/⍺}
_atop←{⍶⍹⍵;⍶⍺⍹⍵}
↑←{0=⍴⍴⍵:⊃⍵ ⋄ 0=×/⍴⍵:⍵ ⋄ shape←⍴⍵ ⋄ ⍵←,⍵ ⋄ r←⌈/≢¨shapes←⍴¨⍵ ⋄ max←⊃⌈/shapes←(⍴↓(r⍴1)∘,)¨shapes
  (shape,max)⍴⊃⍪/shapes{max↑⍺⍴⍵}¨⍵}⍠↑
⊃←⊃⍠{;1<⍴⍴⍺:↗'RANK ERROR' ⋄ x←⍵
      {1<⍴⍴⍵:↗'RANK ERROR' ⋄ ⍵←,⍵ ⋄ (⍴⍵)≠⍴⍴x:↗'RANK ERROR' ⋄ ∨/⍵≥⍴x:↗'INDEX ERROR' ⋄ x←⊃⍵⌷x}¨⍺
      x}
⊂←⊂⍠{1<⍴⍴⍺:↗'RANK ERROR' ⋄ 1≠⍴⍴⍵:↗'NONCE ERROR' ⋄ ⍺←,⍺=0
     keep←~1 1⍷⍺ ⋄ sel←keep/⍺ ⋄ dat←keep/⍵
     {1=1↑sel:{sel←1↓sel ⋄ dat←1↓dat}⍬}⍬
     {1=¯1↑sel:{sel←¯1↓sel ⋄ dat←¯1↓dat}⍬}⍬
     sel←(⍴sel),⍨sel/⍳⍴sel ⋄ drop←0
     sel{∆←drop↓⍺↑⍵ ⋄ drop←⍺+1 ⋄ ∆}¨⊂dat}
↓←{0=⍴⍴⍵:⍵ ⋄ ⊂[¯1+⍴⍴⍵]⍵
   ;
   1<⍴⍴⍺:↗'RANK ERROR' ⋄ a←,⍺ ⋄ ⍵←{0=⍴⍴⍵:((⍴a)⍴1)⍴⍵ ⋄ ⍵}⍵
   (⍴a)>⍴⍴⍵:↗'RANK ERROR' ⋄ a←(⍴⍴⍵)↑a ⋄ a←((a>0)×0⌊a-⍴⍵)+(a≤0)×0⌈a+⍴⍵ ⋄ a↑⍵}
⍪←{(≢⍵)(×/1↓⍴⍵)⍴⍵ ; ⍺,[0]⍵}
⊢←{⍵} ⋄ ⊣←{⍵;⍺}
≢←{⍬⍴(⍴⍵),1; ~⍺≡⍵}
,←{(×/⍴⍵)⍴⍵}⍠,
⌹←{norm←{(⍵+.×+⍵)*0.5}
   QR←{n←(⍴⍵)[1] ⋄ 1≥n:{t←norm,⍵ ⋄ (⍵÷t)(⍪t)}⍵ ⋄ m←⌈n÷2 ⋄ a0←((1↑⍴⍵),m)↑⍵ ⋄ a1←(0,m)↓⍵ ⋄ (q0 r0)←∇a0
       c←(+⍉q0)+.×a1 ⋄ (q1 r1)←∇a1-q0+.×c ⋄ (q0,q1)((r0,c)⍪((⌊n÷2),-n)↑r1)}
   Rinv←{1=n←1↑⍴⍵:÷⍵ ⋄ m←⌈n÷2 ⋄ ai←∇(m,m)↑⍵ ⋄ di←∇(m,m)↓⍵ ⋄ b←(m,m-n)↑⍵ ⋄ bx←-ai+.×b+.×di ⋄ (ai,bx)⍪((⌊n÷2),-n)↑di}
   0=⍴⍴⍵:÷⍵ ⋄ 1=⍴⍴⍵:,∇⍪⍵ ⋄ 2≠⍴⍴⍵:↗'RANK ERROR' ⋄ 0∊≥/⍴⍵:↗'LENGTH ERROR' ⋄ (Q R)←QR ⍵ ⋄ (Rinv R)+.×+⍉Q
   ;
   (⌹⍵)+.×⍺}
⍨←{⍵⍶⍵;⍵⍶⍺}
≈←{1e¯14>|⍺-⍵}
`

,A=(a,s=[a.length])=>{
  if(a.length&&a instanceof Array){
    let t=1;for(let i=0;i<a.length;i++)if(typeof a[i]!=='number'){t=0;break}
    if(t)a=new Float64Array(a)
  }
  if(!(s instanceof Array)){let s0=s;s=Array(s0.length);for(let i=0;i<s0.length;i++)s[i]=s0[i]}
  return{isA:1,a,s}
}
,strides=s=>{let r=Array(s.length),u=1;for(let i=r.length-1;i>=0;i--){asrt(isInt(s[i],0));r[i]=u;u*=s[i]};return r}
,toInt=(x,m,M)=>{let r=unw(x);if(r!==r|0||m!=null&&r<m||M!=null&&M<=r)domErr();return r}
,str=x=>{x.s.length>1&&rnkErr();for(let i=0;i<x.a.length;i++)typeof x.a[i]!=='string'&&domErr();return x.a.join('')}
,isSimple=x=>!x.s.length&&!x.a[0].isA
,unw=x=>{x.a.length===1||lenErr();return x.a[0]} // unwrap
,getProt=x=>!x.a.length||typeof x.a[0]!=='string'?0:' ' // todo
,asrt=x=>{if(typeof x==='function'){if(!x())throw Error('assertion failed: '+x)}
          else                     {if(!x)  throw Error('assertion failed'    )}}
,isInt=(x,m,M)=>x===~~x&&(m==null||m<=x&&(M==null||x<M))
,prd=x=>{let r=1;for(let i=0;i<x.length;i++)r*=x[i];return r}
,extend=(x,y)=>{for(let k in y)x[k]=y[k];return x}
,fmtNum=x=>(''+x).replace('Infinity','∞').replace(/-/g,'¯')
,rpt=(x,n)=>{
  let m=n*x.length;if(!m)return x.slice(0,0)
  if(x.set){let r=new(x.constructor)(x.length);r.set(x);while(n<m){r.copyWithin(n,0,n);n*=2};return r}
  else{while(x.length*2<m)x=x.concat(x);return x.concat(x.slice(0,m-x.length))}
}
,err=(s,o)=>{
  let m
  if(o&&o.aplCode&&o.offset!=null){
    let a=o.aplCode.slice(0,o.offset).split('\n')
    let l=a.length,c=1+(a[a.length-1]||'').length // line and column
    m='\n'+(o.file||'-')+':'+l+':'+c+o.aplCode.split('\n')[l-1]+'_'.repeat(c-1)+'^'
  }
  let e=Error(m);e.name=s;for(let k in o)e[k]=o[k];throw e
}
,synErr=o=>err('SYNTAX ERROR',o)
,domErr=o=>err('DOMAIN ERROR',o)
,lenErr=o=>err('LENGTH ERROR',o)
,rnkErr=o=>err(  'RANK ERROR',o)
,idxErr=o=>err( 'INDEX ERROR',o)
,nyiErr=o=>err( 'NONCE ERROR',o)
,valErr=o=>err( 'VALUE ERROR',o)

A.bool=[A.zero=A(new Float64Array([0]),[]),
        A.one =A(new Float64Array([1]),[])]
A.zld=A(new Float64Array(),[0])
A.scal=x=>A([x],[])

const Zify=x=>typeof x==='number'?new Z(x,0):x instanceof Z?x:domErr() // complexify
const smplfy=(re,im)=>im===0?re:new Z(re,im)
function Z(re,im){asrt(typeof re==='number');asrt(typeof im==='number'||im==null)
  if(re!==re||im!==im)domErr(); this.re=re;this.im=im||0}
Z.prototype.toString=function(){return fmtNum(this.re)+'J'+fmtNum(this.im)}
Z.prototype.repr=function(){return'new Z('+repr(this.re)+','+repr(this.im)+')'}
Z.exp=x=>{x=Zify(x);let r=Math.exp(x.re);return smplfy(r*Math.cos(x.im),r*Math.sin(x.im))}
Z.log=x=>{if(typeof x==='number'&&x>0){return Math.log(x)}
          else{x=Zify(x);return smplfy(Math.log(Math.sqrt(x.re*x.re+x.im*x.im)),Z.dir(x))}}
Z.cjg=x=>new Z(x.re,-x.im)
Z.neg=x=>new Z(-x.re,-x.im)
Z.add=(x,y)=>{x=Zify(x);y=Zify(y);return smplfy(x.re+y.re,x.im+y.im)}
Z.sub=(x,y)=>{x=Zify(x);y=Zify(y);return smplfy(x.re-y.re,x.im-y.im)}
Z.mul=(x,y)=>{x=Zify(x);y=Zify(y);return smplfy(x.re*y.re-x.im*y.im,x.re*y.im+x.im*y.re)}
Z.div=(x,y)=>{x=Zify(x);y=Zify(y);const d=y.re*y.re+y.im*y.im
              return smplfy((x.re*y.re+x.im*y.im)/d,(y.re*x.im-y.im*x.re)/d)}
Z.it =x=>{x=Zify(x);return smplfy(-x.im,x.re)} // i times
Z.nit=x=>{x=Zify(x);return smplfy(x.im,-x.re)} // -i times
Z.pow=(x,y)=>{
  if(typeof x==='number'&&typeof y==='number'&&(x>=0||isInt(y)))return Math.pow(x,y)
  if(typeof y==='number'&&isInt(y,0)){let r=1;while(y){(y&1)&&(r=Z.mul(r,x));x=Z.mul(x,x);y>>=1};return r}
  if(typeof x==='number'&&y===.5)return x<0?new Z(0,Math.sqrt(-x)):Math.sqrt(x)
  return Z.exp(Z.mul(y,Z.log(x)))
}
Z.sqrt=x=>Z.pow(x,.5)
Z.mag=x=>Math.sqrt(x.re*x.re+x.im*x.im)
Z.dir=x=>Math.atan2(x.im,x.re)
Z.sin=x=>Z.nit(Z.sh(Z.it(x)))
Z.cos=x=>Z.ch(Z.it(x))
Z.tg =x=>Z.nit(Z.th(Z.it(x)))
Z.asin=x=>{x=Zify(x);return Z.nit(Z.log(Z.add(Z.it(x),Z.sqrt(Z.sub(1,Z.pow(x,2))))))}
Z.acos=x=>{x=Zify(x);const r=Z.nit(Z.log(Z.add(x,Z.sqrt(Z.sub(Z.pow(x,2),1)))))
           return r instanceof Z&&(r.re<0||(r.re===0&&r.im<0))?Z.neg(r):r} // dubious?
Z.atg=x=>{x=Zify(x);const ix=Z.it(x);return Z.mul(new Z(0,.5),Z.sub(Z.log(Z.sub(1,ix)),Z.log(Z.add(1,ix))))}
Z.sh=x=>{let a=Z.exp(x);return Z.mul(.5,Z.sub(a,Z.div(1,a)))}
Z.ch=x=>{let a=Z.exp(x);return Z.mul(.5,Z.add(a,Z.div(1,a)))}
Z.th=x=>{let a=Z.exp(x),b=Z.div(1,a);return Z.div(Z.sub(a,b),Z.add(a,b))}
Z.ash=x=>Z.it(Z.asin(Z.nit(x)))
Z.ach=x=>{x=Zify(x);let sign=x.im>0||(!x.im&&x.re<=1)?1:-1;return Z.mul(new Z(0,sign),Z.acos(x))}
Z.ath=x=>Z.it(Z.atg(Z.nit(x)))
Z.floor=x=>{
  if(typeof x==='number')return Math.floor(x)
  x=Zify(x)
  let re=Math.floor(x.re),im=Math.floor(x.im),r=x.re-re,i=x.im-im
  if(r+i>=1)r>=i?re++:im++
  return smplfy(re,im)
}
Z.ceil=x=>{
  if(typeof x==='number')return Math.ceil(x)
  x=Zify(x);let re=Math.ceil(x.re),im=Math.ceil(x.im),r=re-x.re,i=im-x.im
  if(r+i>=1)r>=i?re--:im--
  return smplfy(re,im)
}
const iszero=x=>!x||(x instanceof Z&&!x.re&&!x.im)
Z.mod=(x,y)=>typeof x==='number'&&typeof y==='number'?(x?y-x*Math.floor(y/x):y)
                 :iszero(x)?y:Z.sub(y,Z.mul(x,Z.floor(Z.div(y,x))))
Z.isint=x=>typeof x==='number'?x===Math.floor(x):x.re===Math.floor(x.re)&&x.im===Math.floor(x.im)
Z.gcd=(x,y)=>{
  if(typeof x==='number'&&typeof y==='number'){while(y){let z=y;y=x%y;x=z}return Math.abs(x)}
  while(!iszero(y)){let z=y;y=Z.mod(y,x);x=z}
  if(typeof x==='number'){return Math.abs(x)} // rotate into first quadrant
  else{x.re<0&&(x=Z.neg(x));x.im<0&&(x=Z.it(x));return x.re?x:x.im}
}
Z.lcm=(x,y)=>{let p=Z.mul(x,y);return iszero(p)?p:Z.div(p,Z.gcd(x,y))}

const LDC=1,VEC=2,GET=3,SET=4,MON=5,DYA=6,LAM=7,RET=8,POP=9,SPL=10,JEQ=11,EMB=12,CON=13
,Proc=function(b,p,size,h){this.b=b;this.p=p;this.size=size;this.h=h;this.toString=_=>'#procedure'}
,toFn=f=>(x,y)=>vm(f.b,f.h.concat([[x,f,y,null]]),f.p)
,vm=(b,h,p=0,t=[])=>{while(1)switch(b[p++]){default:asrt(0) // b:bytecode,h:environment,p:program counter,t:stack
  case LDC:t.push(b[p++]);break
  case VEC:{let a=t.splice(t.length-b[p++]);for(let i=0;i<a.length;i++)if(isSimple(a[i]))a[i]=unw(a[i])
            t.push(A(a));break}
  case GET:{let r=h[b[p++]][b[p++]];r!=null||valErr();t.push(r);break}
  case SET:{h[b[p++]][b[p++]]=t[t.length-1];break}
  case MON:{let[x,f]=t.splice(-2)
            if(typeof f==='function'){if(x instanceof Proc)x=toFn(x)
                                      if(f.cps){f(x,undefined,undefined,r=>{t.push(r);vm(b,h,p,t)});return}
                                      t.push(f(x))}
            else{let bp=t.length;t.push(b,p,h);b=f.b;p=f.p;h=f.h.concat([[x,f,null,bp]])}
            break}
  case DYA:{let[y,f,x]=t.splice(-3)
            if(typeof f==='function'){if(y instanceof Proc)y=toFn(y)
                                      if(x instanceof Proc)x=toFn(x)
                                      if(f.cps){f(y,x,undefined,r=>{t.push(r);vm(b,h,p,t)});return}
                                      t.push(f(y,x))}
            else{let bp=t.length;t.push(b,p,h);b=f.b;p=f.p;h=f.h.concat([[y,f,x,bp]])}
            break}
  case LAM:{let size=b[p++];t.push(new Proc(b,p,size,h));p+=size;break}
  case RET:{if(t.length===1)return t[0];[b,p,h]=t.splice(-4,3);break}
  case POP:{t.pop();break}
  case SPL:{let n=b[p++],a=t[t.length-1].a.slice().reverse(),a1=Array(a.length)
            for(let i=0;i<a.length;i++)a1[i]=a[i].isA?a[i]:A([a[i]],[])
            if(a1.length===1){a1=rpt(a1,n)}else if(a1.length!==n){lenErr()}
            t.push.apply(t,a1);break}
  case JEQ:{const n=b[p++];toInt(t[t.length-1],0,2)||(p+=n);break}
  case EMB:{let frm=h[h.length-1];t.push(b[p++](frm[0],frm[2]));break}
  case CON:{let frm=h[h.length-1],cont={b,h:h.map(x=>x.slice()),t:t.slice(0,frm[3]),p:frm[1].p+frm[1].size-1}
            asrt(b[cont.p]===RET);t.push(r=>{b=cont.b;h=cont.h;t=cont.t;p=cont.p;t.push(r)});break}
}}
const ltr='_A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶ-ͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮ-ٯٱ-ۓەۥ-ۦۮ-ۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴ-ߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএ-ঐও-নপ-রলশ-হঽৎড়-ঢ়য়-ৡৰ-ৱਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽૐૠ-ૡଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽଡ଼-ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘ-ౙౠ-ౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠ-ೡೱ-ೲഅ-ഌഎ-ഐഒ-ഺഽൎൠ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะา-ำเ-ๆກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥ-ၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮ-ᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵ-ᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃ-ↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〆〱-〵〻-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪ-ꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵ-ꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּ-סּףּ-פּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ'
,td=[['-',/^ +|^[⍝#].*/],           // whitespace or comment
     ['N',/^¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞))?/i], // number
     ['S',/^(?:'[^']*')+/],         // string
     ['.',/^[\(\)\[\]\{\}:;←⋄\n]/], // punctuation
     ['J',/^«[^»]*»/],              // JS literal
     ['X',RegExp('^(?:⎕?['+ltr+']['+ltr+'0-9]*|⍺⍺|⍵⍵|∇∇|[^¯\'":«»])','i')]] // identifier
,prs=(s,o)=>{
  // tokens are {t:type,v:value,o:offset,s:aplCode}
  // "stk" tracks bracket nesting and causes '\n' tokens to be dropped when the latest unclosed bracket is '(' or '['
  let i=0,a=[],stk=['{'],l=s.length // i:offset in s, a:tokens
  while(i<l){
    let m,t,v,r=s.slice(i) // m:match object, t:type, v:value, r:remaining source code
    for(let j=0;j<td.length;j++)if(m=r.match(td[j][1])){v=m[0];t=td[j][0];t==='.'&&(t=v);break}
    t||synErr({file:o?o.file:null,o:i,s:s})
    '([{'.includes(t)?stk.push(t):')]}'.includes(t)?stk.pop():0
    if(t!=='-'&&(t!=='\n'||stk[stk.length-1]==='{'))a.push({t:t,v:v[0]==='⎕'?v.toUpperCase():v,o:i,s:s})
    i+=v.length
  }
  a.push({t:'$',v:'',o:i,s})
  // AST node types: 'B' a⋄b  ':' a:b  'N' 1  'S' 'a'  'X' a  'J' «a»  '⍬' ()  '{' {}  '[' a[b]  '←' a←b  '.' a b
  // '.' gets replaced with: 'V' 1 2  'M' +1  'D' 1+2  'A' +/  'C' +.×  'T' +÷
  i=0 // offset in a
  const dmnd=x=>a[i].t===x?i++:prsErr()
  ,prsErr=x=>synErr({file:o.file,offset:a[i].o,aplCode:s})
  ,body=_=>{
    let r=['B']
    while(1){
      while('⋄\n'.includes(a[i].t))i++
      if('$};'.includes(a[i].t))return r
      let e=expr();if(a[i].t===':'){i++;e=[':',e,expr()]}
      r.push(e)
    }
  }
  ,expr=_=>{
    let r=['.'],x
    while(1){
      if('NSXJ'.includes(a[i].t)){x=[a[i].t,a[i].v];i++}
      else if(a[i].t==='('){i++;if(a[i].t===')'){i++;x=['⍬']}else{x=expr();dmnd(')')}}
      else if(a[i].t==='{'){i++;x=['{',body()];while(a[i].t===';'){i++;x.push(body())}dmnd('}')}
      else{prsErr()}
      if(a[i].t==='['){
        i++;x=['[',x]
        while(1){if(a[i].t===';'){i++;x.push(null)}
                 else if(a[i].t===']'){x.push(null);break}
                 else{x.push(expr());if(a[i].t===']'){break}else{dmnd(';')}}}
        dmnd(']')
      }
      if(a[i].t==='←'){i++;return r.concat([['←',x,expr()]])}
      r.push(x);if(')]}:;⋄\n$'.includes(a[i].t))return r
    }
  }
  return[body(),dmnd('$')][0]
}
const voc={}
,perv=(f1,f2)=>{ // pervasive f1:monad, f2:dyad
  let g1=!f1?nyiErr:x=>{
    if(x.isA){let r=Array(x.a.length);for(let i=0;i<x.a.length;i++)r[i]=g1(x.a[i]);return A(r,x.s)}
    let r=f1(x);typeof r==='number'&&r!==r&&domErr();return r
  }
  let g2=!f2?nyiErr:(x,y)=>{switch((!x.isA?10:x.a.length===1?20:30)+(!y.isA?1:y.a.length===1?2:3)){
    case 11:{let r=f2(x,y);typeof r==='number'&&r!==r&&domErr();return r}
    case 12:case 13:{const n=y.a.length,r=Array(n);for(let i=0;i<n;i++)r[i]=g2(x,y.a[i]);return A(r,y.s)}
    case 21:case 31:{const n=x.a.length,r=Array(n);for(let i=0;i<n;i++)r[i]=g2(x.a[i],y);return A(r,x.s)}
    case 22:return A([g2(x.a[0],y.a[0])],x.s.length>y.s.length?x.s:y.s)
    case 23:{const xi=x.a[0],n=y.a.length,r=Array(n);for(let i=0;i<n;i++)r[i]=g2(xi,y.a[i]);return A(r,y.s)}
    case 32:{const yi=y.a[0],n=x.a.length,r=Array(n);for(let i=0;i<n;i++)r[i]=g2(x.a[i],yi);return A(r,x.s)}
    case 33:{x.s.length!==y.s.length&&rnkErr();x.s!=''+y.s&&lenErr()
             const n=x.a.length,r=Array(n);for(let i=0;i<n;i++)r[i]=g2(x.a[i],y.a[i]);return A(r,x.s)}
  }}
  return(y,x)=>x?g2(x,y):g1(y)
}
,real=f=>(x,y,h)=>typeof x!=='number'||y!=null&&typeof y!=='number'?domErr():f(x,y,h)
,numeric=(f,g)=>(x,y,h)=>(typeof x!=='number'||y!=null&&typeof y!=='number'?g(Zify(x),y==null?y:Zify(y),h):f(x,y,h))
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
,nAprx=(x,y)=>x===y||Math.abs(x-y)<1e-11 // approximate equality for numbers
,aprx=(x,y)=>{ // like match(), but approximate
  if(x.isA){
    if(!y.isA)return 0
    if(x.s.length!==y.s.length)return 0
    if(x.s!=''+y.s)return 0
    let r=1,n=x.a.length;for(let i=0;i<n;i++)r&=aprx(x.a[i],y.a[i])
    return r
  }else{
    if(y.isA)return 0
    if(x==null||y==null)return 0
    if(typeof x==='number')x=new Z(x)
    if(typeof y==='number')y=new Z(y)
    if(x instanceof Z)return y instanceof Z&&nAprx(x.re,y.re)&&nAprx(x.im,y.im)
    return x===y
  }
}
,bool=x=>(x&1)!==x?domErr():x
,withId=(x,f)=>{f.identity=x.isA?x:A.scal(x);return f}
,adv =f=>{f.adv =1;return f}
,conj=f=>{f.conj=1;return f}
,cps =f=>{f.cps =1;return f}

voc['+']=withId(0,perv(
  numeric(x=>x,Z.cjg),
  numeric((x,y)=>x+y,Z.add)
))
voc['-']=withId(0,perv(
  numeric(x=>-x,Z.neg),
  numeric((x,y)=>x-y,Z.sub)
))
voc['×']=withId(1,perv(
  numeric(x=>(x>0)-(x<0),x=>{let d=Math.sqrt(x.re*x.re+x.im*x.im);return smplfy(x.re/d,x.im/d)}),
  numeric((x,y)=>x*y,Z.mul)
))
voc['÷']=withId(1,perv(
  numeric(x=>1/x,
          x=>{let d=x.re*x.re+x.im*x.im;return smplfy(x.re/d,-x.im/d)}),
  numeric((x,y)=>x/y,Z.div)
))
voc['*']=withId(1,perv(
  numeric(Math.exp,Z.exp),
  Z.pow
))
voc['⍟']=perv(
  Z.log,
  (x,y)=>typeof x==='number'&&typeof y==='number'&&x>0&&y>0?Math.log(y)/Math.log(x):Z.div(Z.log(y),Z.log(x))
)
voc['|']=withId(0,perv(
  numeric(x=>Math.abs(x),Z.mag),
  Z.mod
))
voc['⍀']=adv((y,x,h)=>voc['\\'](y,x,h||A.zero))
voc['\\']=adv((y,x,h)=>{
  if(typeof y==='function'){
    asrt(typeof x==='undefined')
    let f=y
    return(y,x)=>{
      asrt(x==null)
      if(!y.s.length)return y
      h=h?toInt(h,0,y.s.length):y.s.length-1
      const ni=prd(y.s.slice(0,h)), nj=y.s[h], nk=prd(y.s.slice(h+1)), r=Array(ni*nj*nk)
      if(r.length)for(let i=0;i<ni;i++)for(let j=0;j<nj;j++)for(let k=0;k<nk;k++){
        let u=y.a[(i*nj+j)*nk+k];u=u.isA?u:A.scal(u)
        for(let l=j-1;l>=0;l--){let v=y.a[(i*nj+l)*nk+k];u=f(u,v.isA?v:A.scal(v))}
        r[(i*nj+j)*nk+k]=u.s.length?u:unw(u)
      }
      return A(r,y.s)
    }
  }else{
    y.s.length||nyiErr()
    h=h?toInt(h,0,y.s.length):y.s.length-1
    x.s.length>1&&rnkErr()
    let b=[],i=0,s=y.s.slice();s[h]=x.a.length
    for(let j=0;j<x.a.length;j++){isInt(x.a[j],0,2)||domErr();b.push(x.a[j]>0?i++:null)}
    i===y.s[h]||lenErr()
    let r=[],xd=strides(y.s)
    if(s[h]&&y.a.length){
      let filler=getProt(y),p=0,ind=rpt([0],s.length)
      while(1){
        r.push(b[ind[h]]==null?filler:y.a[p+b[ind[h]]*xd[h]])
        let i=s.length-1;while(i>=0&&ind[i]+1===s[i]){if(i!==h)p-=xd[i]*ind[i];ind[i--]=0}
        if(i<0)break
        if(i!==h)p+=xd[i]
        ind[i]++
      }
    }
    return A(r,s)
  }
})
voc['○']=perv(
  numeric(x=>Math.PI*x,x=>new Z(Math.PI*x.re,Math.PI*x.im)),
  (i,x)=>{
    if(typeof x==='number'){
      switch(i){
        case-12:return Z.exp(smplfy(0,x))
        case-11:return smplfy(0,x)
        case-10:return x
        case -9:return x
        case -8:return smplfy(0,-Math.sqrt(1+x*x))
        case -7:return Z.ath(x)
        case -6:return Z.ach(x)
        case -5:return Z.ash(x)
        case -4:let t=Z.sqrt(x*x-1);return x<-1?-t:t
        case -3:return Z.atg(x)
        case -2:return Z.acos(x)
        case -1:return Z.asin(x)
        case  0:return Z.sqrt(1-x*x)
        case  1:return Math.sin(x)
        case  2:return Math.cos(x)
        case  3:return Math.tan(x)
        case  4:return Math.sqrt(1+x*x)
        case  5:{let a=Math.exp(x),b=1/a;return(a-b)/2}     // sh
        case  6:{let a=Math.exp(x),b=1/a;return(a+b)/2}     // ch
        case  7:{let a=Math.exp(x),b=1/a;return(a-b)/(a+b)} // th
        case  8:return Z.sqrt(-1-x*x)
        case  9:return x
        case 10:return Math.abs(x)
        case 11:return 0
        case 12:return 0
        default:domErr()
      }
    }else if(x instanceof Z){
      switch(i){
        case -12:return Z.exp(smplfy(-x.im,x.re))
        case -11:return Z.it(x)
        case -10:return Z.cjg(x)
        case  -9:return x
        case  -8:return Z.neg(Z.sqrt(Z.sub(-1,Z.mul(x,x))))
        case  -7:return Z.ath(x)
        case  -6:return Z.ach(x)
        case  -5:return Z.ash(x)
        case  -4:if(x.re===-1&&!x.im){return 0}else{let a=Z.add(x,1);return Z.mul(a,Z.sqrt(Z.div(Z.sub(x,1),a)))}
        case  -3:return Z.atg(x)
        case  -2:return Z.acos(x)
        case  -1:return Z.asin(x)
        case   0:return Z.sqrt(Z.sub(1,Z.mul(x,x)))
        case   1:return Z.sin(x)
        case   2:return Z.cos(x)
        case   3:return Z.tg(x)
        case   4:return Z.sqrt(Z.add(1,Z.mul(x,x)))
        case   5:return Z.sh(x)
        case   6:return Z.ch(x)
        case   7:return Z.th(x)
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
voc[',']=(y,x,h)=>{
  x||nyiErr()
  let nAxes=Math.max(x.s.length,y.s.length)
  if(h){h=unw(h);typeof h!=='number'&&domErr();nAxes&&!(-1<h&&h<nAxes)&&rnkErr()}else{h=nAxes-1}
  if(!x.s.length&&!y.s.length){return A([unw(x),unw(y)])}
  else if(!x.s.length){let s=y.s.slice();if(isInt(h))s[h]=1;x=A(rpt([unw(x)],prd(s)),s)}
  else if(!y.s.length){let s=x.s.slice();if(isInt(h))s[h]=1;y=A(rpt([unw(y)],prd(s)),s)}
  else if(x.s.length+1===y.s.length){isInt(h)||rnkErr();let s=x.s.slice();s.splice(h,0,1);x=A(x.a,s)}
  else if(x.s.length===y.s.length+1){isInt(h)||rnkErr();let s=y.s.slice();s.splice(h,0,1);y=A(y.a,s)}
  else if(x.s.length!==y.s.length){rnkErr()}
  asrt(x.s.length===y.s.length)
  for(let i=0;i<x.s.length;i++)if(i!==h&&x.s[i]!==y.s[i])lenErr()
  let s=x.s.slice();if(isInt(h)){s[h]+=y.s[h]}else{s.splice(Math.ceil(h),0,2)}
  let r=Array(prd(s))
  let stride=Array(s.length);stride[s.length-1]=1
  for(let i=s.length-1;i>0;i--)stride[i-1]=stride[i]*s[i]
  let d=stride;if(!isInt(h)){d=stride.slice();d.splice(Math.ceil(h),1)}
  if(x.a.length){ // p:pointer in result, q:pointer in x.a
    let p=0,q=0,i=new Int32Array(x.s.length),xd=strides(x.s)
    while(1){
      r[p]=x.a[q]
      let a=i.length-1;while(a>=0&&i[a]+1===x.s[a]){q-=i[a]*xd[a];p-=i[a]*d[a];i[a--]=0}
      if(a<0)break
      q+=xd[a];p+=d[a];i[a]++
    }
  }
  if(y.a.length){ // p:pointer in result, q:pointer in y.a
    let p=isInt(h)?stride[h]*x.s[h]:stride[Math.ceil(h)],q=0,i=new Int32Array(y.s.length),yd=strides(y.s)
    while(1){
      r[p]=y.a[q]
      let a=i.length-1;while(a>=0&&i[a]+1===y.s[a]){q-=i[a]*yd[a];p-=i[a]*d[a];i[a--]=0}
      if(a<0)break
      q+=yd[a];p+=d[a];i[a]++
    }
  }
  return A(r,s)
}
let eq
voc['=']=withId(1,perv(null,eq=(x,y)=>+(x instanceof Z&&y instanceof Z?x.re===y.re&&x.im===y.im:x===y)))
voc['≠']=withId(0,perv(null,(x,y)=>1-eq(y,x)))
voc['<']=withId(0,perv(null,real((x,y)=>+(x< y))))
voc['>']=withId(0,perv(null,real((x,y)=>+(x> y))))
voc['≤']=withId(1,perv(null,real((x,y)=>+(x<=y))))
voc['≥']=withId(1,perv(null,real((x,y)=>+(x>=y))))
voc['≡']=(y,x)=>x?A.bool[+match(y,x)]:A([depth(y)],[])
const depth=x=>{if(!x.isA||!x.s.length&&!x.a[0].isA)return 0
                let r=0,n=x.a.length;for(let i=0;i<n;i++)r=Math.max(r,depth(x.a[i]));return r+1}
voc['∘']=conj((g,f)=>{
  if(typeof f==='function'){if(typeof g==='function'){return(y,x)=>f(g(y),x)}      // f∘g
                            else{return(y,x)=>{x==null||synErr();return f(g,y)}}}  // f∘B
  else{asrt(typeof g==='function');return(y,x)=>{x==null||synErr();return g(y,f)}} // A∘g
})
voc['∪']=(y,x)=>{
  if(x){
    if(x.s.length>1||y.s.length>1)rnkErr()
    let m=x.a.length,n=y.a.length,r=Array(m)
    for(let i=0;i<m;i++)r[i]=x.a[i]
    for(let i=0;i<n;i++)contains(x.a,y.a[i])||r.push(y.a[i])
    return A(r)
  }else{
    if(y.s.length>1)rnkErr()
    let r=[],n=y.a.length;for(let i=0;i<n;i++)contains(r,y.a[i])||r.push(y.a[i]);return A(r)
  }
}
voc['∩']=(y,x)=>{x||nyiErr();if(x.s.length>1||y.s.length>1)rnkErr()
                 let r=[],n=x.a.length;for(let i=0;i<n;i++)contains(y.a,x.a[i])&&r.push(x.a[i]);return A(r)}
const contains=(a,x)=>{for(let i=0;i<a.length;i++)if(match(x,a[i]))return 1}
voc['⊥']=(y,x)=>{
  asrt(x)
  if(!x.s.length)x=A([unw(x)])
  if(!y.s.length)y=A([unw(y)])
  let lastDimA=x.s[x.s.length-1],firstDimB=y.s[0]
  if(lastDimA!==1&&firstDimB!==1&&lastDimA!==firstDimB)lenErr()
  let r=[],ni=x.a.length/lastDimA,nj=y.a.length/firstDimB
  for(let i=0;i<ni;i++)for(let j=0;j<nj;j++){
    let u=x.a.slice(i*lastDimA,(i+1)*lastDimA)
    let v=[];for(let l=0;l<firstDimB;l++)v.push(y.a[j+l*(y.a.length/firstDimB)])
    if(u.length===1)u=rpt([u[0]],v.length)
    if(v.length===1)v=rpt([v[0]],u.length)
    let z=v[0];for(let k=1;k<v.length;k++)z=Z.add(Z.mul(z,u[k]),v[k])
    r.push(z)
  }
  return A(r,x.s.slice(0,-1).concat(y.s.slice(1)))
}
voc['.']=conj((g,f)=>f===voc['∘']?oprd(g):iprd(g,f))
const oprd=f=>{ // outer product
  asrt(typeof f==='function')
  return(y,x)=>{
    x||synErr()
    const m=x.a.length,n=y.a.length,r=Array(m*n)
    for(let i=0;i<m;i++)for(let j=0;j<n;j++){
      let u=x.a[i],v=y.a[j];u.isA||(u=A.scal(u));v.isA||(v=A.scal(v))
      let w=f(v,u);w.s.length||(w=unw(w))
      r[i*n+j]=w
    }
    return A(r,x.s.concat(y.s))
  }
}
const iprd=(g,f)=>{ // inner product: A f.g B <-> f/¨(⊂[¯1+⍴⍴A]A)∘.g⊂[0]B
  let F=voc['¨'](voc['/'](f)),G=oprd(g)
  return(y,x)=>{if(!x.s.length)x=A([unw(x)])
                if(!y.s.length)y=A([unw(y)])
                return F(G(voc['⊂'](y,undefined,A([0])),
                           voc['⊂'](x,undefined,A([x.s.length-1]))))}
}
voc['¨']=adv((f,g)=>{
  asrt(typeof f==='function');asrt(g==null)
  return(y,x)=>{
    if(!x){
      const n=y.a.length,r=Array(n)
      for(let i=0;i<n;i++){const u=y.a[i],v=f(u.isA?u:A([u],[]));asrt(v.isA);r[i]=v.s.length?v:unw(v)}
      return A(r,y.s)
    }else if(x.a.length===1){
      const n=y.a.length,r=Array(n),u=x.a[0].isA?x.a[0]:A([x.a[0]],[])
      for(let i=0;i<n;i++){const v=y.a[i],w=f(v.isA?v:A([v],[]),u);r[i]=w.s.length?w:unw(w)}
      return A(r,y.s)
    }else if(y.a.length===1){
      const n=x.a.length,r=Array(n),v=y.a[0].isA?y.a[0]:A([y.a[0]],[])
      for(let i=0;i<n;i++){const u=x.a[i],w=f(v,u.isA?u:A([u],[]));r[i]=w.s.length?w:unw(w)}
      return A(r,x.s)
    }else{
      const n=x.a.length,r=Array(n)
      x.s.length===y.s.length||rnkErr();for(let i=0;i<x.s.length;i++)if(x.s[i]!==y.s[i])lenErr()
      for(let i=0;i<n;i++){const u=x.a[i],v=y.a[i],w=f(v.isA?v:A([v],[]),u.isA?u:A([u],[]));r[i]=w.s.length?w:unw(w)}
      return A(r,x.s)
    }
  }
})
voc['⊤']=(y,x)=>{
  x||synErr()
  let s=x.s.concat(y.s),r=Array(prd(s)),n=x.s.length?x.s[0]:1,m=x.a.length/n
  for(let i=0;i<m;i++)for(let j=0;j<y.a.length;j++){
    let v=y.a[j];v=typeof v==='number'?Math.abs(v):v
    for(let k=n-1;k>=0;k--){let u=x.a[k*m+i];r[(k*m+i)*y.a.length+j]=iszero(u)?v:Z.mod(u,v)
                            v=iszero(u)?0:Z.div(Z.sub(v,Z.mod(u,v)),u)}
  }
  return A(r,s)
}
voc['∊']=(y,x)=>{
  if(x){
    let r=new Float64Array(x.a.length)
    for(let i=0;i<x.a.length;i++)for(let j=0;j<y.a.length;j++)if(match(x.a[i],y.a[j])){r[i]=1;break}
    return A(r,x.s)
  }
  let r=[];enlist(y,r);return A(r)
}
const enlist=(x,r)=>{if(x.isA){const n=x.a.length;for(let i=0;i<n;i++)enlist(x.a[i],r)}else{r.push(x)}}
let Beta
voc['!']=withId(1,perv(
  real(x=>!isInt(x)?Γ(x+1):x<0?domErr():x<smallFactorials.length?smallFactorials[x]:Math.round(Γ(x+1))),
  Beta=real((k,n)=>{
    let r                                                               // Neg int?
    switch(4*negInt(k)+2*negInt(n)+negInt(n-k)){                        // ⍺ ⍵ ⍵-⍺
      case 0:r=Math.exp(lnΓ(n+1)-lnΓ(k+1)-lnΓ(n-k+1))            ;break // 0 0 0   (!⍵)÷(!⍺)×!⍵-⍺
      case 1:r=0                                                 ;break // 0 0 1   0
      case 2:r=domErr()                                          ;break // 0 1 0   domain error
      case 3:r=Math.pow(-1,k)*Beta(k,k-n-1)                      ;break // 0 1 1   (¯1*⍺)×⍺!⍺-⍵+1
      case 4:r=0                                                 ;break // 1 0 0   0
      case 5:asrt(0)                                             ;break // 1 0 1   cannot arise
      case 6:r=Math.pow(-1,n-k)*Beta(Math.abs(n+1),Math.abs(k+1));break // 1 1 0   (¯1*⍵-⍺)×(|⍵+1)!(|⍺+1)
      case 7:r=0                                                 ;break // 1 1 1   0
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
voc['⍎']=(y,x)=>x?nyiErr():exec(str(y))
voc['⍷']=(y,x)=>{
  y||nyiErr()
  const r=new Float64Array(y.a.length)
  if(x.s.length>y.s.length)return A(r,y.s)
  if(x.s.length<y.s.length)x=A(x.a,rpt([1],y.s.length-x.s.length).concat(x.s))
  if(!x.a.length)return A(r.fill(1),y.s)
  const s=new Int32Array(y.s.length) // find shape
  for(let i=0;i<y.s.length;i++){s[i]=y.s[i]-x.s[i]+1;if(s[i]<=0)return A(r,y.s)}
  let d=strides(y.s),i=new Int32Array(s.length),j=new Int32Array(s.length),nk=x.a.length,p=0
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
  Z.floor,
  real((x,y)=>Math.min(x,y))
))
voc['⌈']=withId(-Infinity,perv(
  Z.ceil,
  real((x,y)=>Math.max(x,y))
))
voc._fork1=(h,g)=>{asrt(typeof h==='function');return[h,g]}
voc._fork2=(hg,f)=>{let[h,g]=hg;return(b,a)=>g(h(b,a),f.isA?f:f(b,a))}
voc['⍕']=(y,x)=>{x&&nyiErr();let t=fmt(y);return A(t.join(''),[t.length,t[0].length])}
const fmt=x=>{ // as array of strings
  const t=typeof x
  if(x===null)return['null']
  if(t==='undefined')return['undefined']
  if(t==='string')return[x]
  if(t==='number'){const r=[fmtNum(x)];r.al=1;return r}
  if(t==='function')return['#procedure']
  if(!x.isA)return[''+x]
  if(!x.a.length)return['']
  if(!x.s.length)return fmt(x.a[0])
  // {t:type(0=chr,1=num,2=nst),w:width,h:height,lm:leftMargin,rm:rightMargin,bm:bottomMargin,al:align(0=lft,1=rgt)}
  const nr=prd(x.s.slice(0,-1)),nc=x.s[x.s.length-1],rows=Array(nr),cols=Array(nc)
  for(let i=0;i<nr;i++)rows[i]={h:0,bm:0};for(let i=0;i<nc;i++)cols[i]={t:0,w:0,lm:0,rm:0}
  let g=Array(nr) // grid
  for(let i=0;i<nr;i++){
    const r=rows[i],gr=g[i]=Array(nc) // gr:grid row
    for(let j=0;j<nc;j++){
      const c=cols[j],u=x.a[nc*i+j],b=fmt(u) // b:box
      r.h=Math.max(r.h,b.length);c.w=Math.max(c.w,b[0].length)
      c.t=Math.max(c.t,typeof u==='string'&&u.length===1?0:u.isA?2:1);gr[j]=b
    }
  }
  let step=1;for(let d=x.s.length-2;d>0;d--){step*=x.s[d];for(let i=step-1;i<nr-1;i+=step)rows[i].bm++}
  for(let j=0;j<nc;j++){const c=cols[j];if(j<nc-1&&(c.t!==cols[j+1].t||c.t))c.rm++;if(c.t===2){c.lm++;c.rm++}}
  const a=[] // result
  for(let i=0;i<nr;i++){
    const r=rows[i]
    for(let j=0;j<nc;j++){
      const c=cols[j],t=g[i][j],d=c.w-t[0].length,lft=' '.repeat(c.lm+!!t.al*d),rgt=' '.repeat(c.rm+ !t.al*d)
      for(let k=0;k<t.length;k++)t[k]=lft+t[k]+rgt
      const btm=' '.repeat(t[0].length);for(let h=r.h+r.bm-t.length;h>0;h--)t.push(btm)
    }
    const nk=r.h+r.bm;for(let k=0;k<nk;k++){let s='';for(let j=0;j<nc;j++)s+=g[i][j][k];a.push(s)}
  }
  return a
}
voc['⍋']=(y,x)=>grd(y,x,1)
voc['⍒']=(y,x)=>grd(y,x,-1)
const grd=(y,x,dir)=>{
  let h={} // maps a character to its index in the collation
  if(x){
    x.s.length||rnkErr();let ni=prd(x.s.slice(0,-1)),nj=x.s[x.s.length-1]
    for(let i=0;i<ni;i++)for(let j=0;j<nj;j++){const u=x.a[i*nj+j];typeof u==='string'||domErr();h[u]=j}
  }
  y.s.length||rnkErr()
  let r=[];for(let i=0;i<y.s[0];i++)r.push(i)
  const d=strides(y.s)
  return A(r.sort((i,j)=>{
    let p=0,ind=rpt([0],y.s.length)
    while(1){
      let u=y.a[p+i*d[0]],ku=typeof u
      let v=y.a[p+j*d[0]],kv=typeof v
      if(ku!==kv)return dir*(1-2*(ku<kv))
      if(h[u]!=null)u=h[u]
      if(h[v]!=null)v=h[v]
      if(u!==v)return dir*(1-2*(u<v))
      let a=ind.length-1
      while(a>0&&ind[a]+1===y.s[a]){p-=d[a]*ind[a];ind[a--]=0}
      if(a<=0)break
      p+=d[a];ind[a]++
    }
    return(i>j)-(i<j)
  }))
}
voc['⍁']=conj((f,x)=>{
  if(f.isA){let h=f;f=x;x=h}
  asrt(typeof f==='function');asrt(x.isA);x.a.length===1||rnkErr()
  if(x.s.length)x=A.scal(unw(x))
  return withId(x,(y,x,h)=>f(y,x,h))
})
voc['⍳']=(y,x)=>{
  if(x){
    x.s.length===1||rnkErr()
    const m=x.a.length,n=y.a.length,r=new Float64Array(n)
    for(let i=0;i<n;i++){r[i]=x.s[0];for(let j=0;j<m;j++)if(match(y.a[i],x.a[j])){r[i]=j;break}}
    return A(r,y.s)
  }else{
    y.s.length<=1||rnkErr();for(let i=0;i<y.a.length;i++)isInt(y.a[i],0)||domErr()
    let n=prd(y.a),m=y.a.length,r=new Float64Array(n*m),p=1,q=n
    for(let i=0;i<m;i++){
      let ai=y.a[i],u=i-m;q/=y.a[i];for(let j=0;j<p;j++)for(let k=0;k<ai;k++)for(let l=0;l<q;l++)r[u+=m]=k
      p*=ai
    }
    if(m===1){return A(r,y.a)}else{let r1=Array(n);for(let i=0;i<n;i++)r1[i]=A(r.slice(m*i,m*i+m));return A(r1,y.a)}
  }
}
voc['⊂']=(y,x,h)=>{
  asrt(!x)
  if(isSimple(y))return y
  if(h==null){
    h=[];for(let i=0;i<y.s.length;i++)h.push(i)
  }else{
    if(h.s.length!==1||h.s[0]!==1)synErr()
    let k=unw(h)
    if(k.isA){h=k.a;for(let i=0;i<k.a.length;i++){isInt(k.a[i],0,y.s.length)||domErr();k.a.indexOf(k.a[i])<i&&domErr()}}
    else{h=[k];if(!isInt(k,0,y.s.length))domErr()}
  }
  let rh=[],m=new Uint8Array(y.s.length) // m:axisMask
  for(let k=0;k<y.s.length;k++){if(h.indexOf(k)<0){rh.push(k)}else{m[k]=1}}
  let rs=rh.map(k=>y.s[k]), rd=strides(rs)
  let us=h.map(k=>y.s[k]), ud=strides(us), un=prd(us)
  let a=Array(prd(rs)),d=strides(y.s)
  for(let i=0;i<a.length;i++){a[i]=typeof y.a==='string'||y.a instanceof Array?Array(un):new Float64Array(un)}
  const f=(k,l,p,q,t)=>{
    if(k+l>=y.s.length){a[p][q]=y.a[t]}
    else if(m[k+l]){for(let i=0;i<us[l];i++)f(k,l+1,p,q+i*ud[l],t+i*d[h[l]])}
    else                  {for(let i=0;i<rs[k];i++)f(k+1,l,p+i*rd[k],q,t+i*d[rh[k]])}
  }
  f(0,0,0,0,0)
  for(let i=0;i<a.length;i++)a[i]=A(a[i],us)
  return A(a,rs)
}
voc['∨']=withId(0,perv(null,(x,y)=>Z.isint(x)&&Z.isint(y)?Z.gcd(x,y):domErr()))
voc['∧']=withId(1,perv(null,(x,y)=>Z.isint(x)&&Z.isint(y)?Z.lcm(x,y):domErr()))
voc['⍱']=perv(null,real((x,y)=>+!(bool(x)|bool(y))))
voc['⍲']=perv(null,real((x,y)=>+!(bool(x)&bool(y))))
voc['~']=perv(x=>+!bool(x))
voc['⍣']=conj((g,f)=>{
  if(f.isA&&typeof g==='function'){let h=f;f=g;g=h}else{asrt(typeof f==='function')}
  if(typeof g==='function'){return(y,x)=>{while(1){let y1=f(y,x);if(toInt(g(y,y1),0,2))return y;y=y1}}}
  let n=toInt(g,0);return(y,x)=>{for(let i=0;i<n;i++)y=f(y,x);return y}
})
voc['get_⎕']=cps((_,_1,_2,cb)=>{
  if(typeof window!=='undefined'&&typeof window.prompt==='function'){setTimeout(_=>{cb(exec(prompt('⎕:')||''))},0)}
  else{process.stdout.write('⎕:\n');readline('      ',x=>cb(exec(str(A(x)))))}
})
voc['set_⎕']=x=>{
  let s=fmt(x).join('\n')+'\n'
  if(typeof window!=='undefined'&&typeof window.alert==='function'){window.alert(s)}else{process.stdout.write(s)}
  return x
}
voc['get_⍞']=cps((_,_1,_2,cb)=>{
  if(typeof window!=='undefined'&&typeof window.prompt==='function'){setTimeout(_=>{cb(A(prompt('')||''))},0)}
  else{readline('',x=>cb(A(x)))}
})
voc['set_⍞']=x=>{
  let s=fmt(x).join('\n')
  if(typeof window!=='undefined'&&typeof window.alert==='function'){window.alert(s)}else{process.stdout.write(s)}
  return x
}
voc['get_⎕IO']=_=>A.zero
voc['set_⎕IO']=x=>match(x,A.zero)?x:domErr()
voc['⎕DL']=cps((y,x,_,cb)=>{let t0=+new Date;setTimeout(_=>{cb(A([new Date-t0]))},unw(y))})
voc['⎕RE']=(y,x)=>{
  x=str(x),y=str(y)
  let re;try{re=RegExp(x)}catch(e){domErr()}
  let m=re.exec(y);if(!m)return A.zld
  let r=[m.index];for(let i=0;i<m.length;i++)r.push(A(m[i]||''))
  return A(r)
}
voc['⎕UCS']=(y,x)=>{
  x&&nyiErr();let r=Array(y.a.length)
  for(let i=0;i<y.a.length;i++){
    let u=y.a[i];r[i]=isInt(u,0,0x10000)?String.fromCharCode(u):typeof u==='string'?u.charCodeAt(0):domErr()
  }
  return A(r,y.s)
}
voc['get_⎕OFF']=_=>{typeof process==='undefined'&&nyiErr();process.exit(0)}
voc['?']=(y,x)=>x?deal(y,x):roll(y)
const roll=perv(y=>{isInt(y,1)||domErr();return Math.floor(Math.random()*y)})
,deal=(y,x)=>{
  x=unw(x);y=unw(y)
  isInt(y,0)&&isInt(x,0,y+1)||domErr()
  let r=Array(y);for(let i=0;i<y;i++)r[i]=i
  for(let i=0;i<x;i++){let j=i+Math.floor(Math.random()*(y-i));const h=r[i];r[i]=r[j];r[j]=h}
  return A(r.slice(0,x))
}
voc['↗']=y=>err(str(y))
voc['⍴']=(y,x)=>{
  if(x){
    x.s.length<=1||rnkErr()
    let s=x.a,n=prd(s),m=y.a.length,a=y.a
    for(let i=0;i<s.length;i++)isInt(s[i],0)||domErr()
    if(!m){m=1;a=[0]}
    let r=Array(n);for(let i=0;i<n;i++)r[i]=a[i%m]
    return A(r,s)
  }else{
    return A(new Float64Array(y.s))
  }
}
voc['⌽']=(y,x,h)=>{
  asrt(typeof h==='undefined'||h.isA)
  if(x){
    h=h?unw(h):y.s.length-1
    isInt(h)||domErr()
    if(y.s.length&&!(0<=h&&h<y.s.length))idxErr()
    let step=unw(x)
    isInt(step)||domErr()
    if(!step)return y
    let n=y.s[h]
    step=(n+step%n)%n // force % to handle negatives properly
    if(!y.a.length||!step)return y
    let r=[],d=strides(y.s),p=0,i=rpt([0],y.s.length)
    while(1){
      r.push(y.a[p+((i[h]+step)%y.s[h]-i[h])*d[h]])
      let a=y.s.length-1;while(a>=0&&i[a]+1===y.s[a]){p-=i[a]*d[a];i[a--]=0}
      if(a<0)break
      i[a]++;p+=d[a]
    }
    return A(r,y.s)
  }else{
    if(h){h.a.length===1||lenErr();h=unw(h);isInt(h)||domErr();0<=h&&h<y.s.length||idxErr()}else{h=[y.s.length-1]}
    if(!y.s.length)return y
    const ni=prd(y.s.slice(0,h)),nj=y.s[h],nk=prd(y.s.slice(h+1)),r=Array(ni*nj*nk)
    for(let i=0;i<ni;i++)for(let j=0;j<nj;j++)for(let k=0;k<nk;k++)r[(i*nj+j)*nk+k]=y.a[(i*nj+nj-1-j)*nk+k]
    return A(r,y.s)
  }
}
voc['⊖']=(y,x,h)=>voc['⌽'](y,x,h||A.zero)
voc['⌿']=adv((y,x,h)=>voc['/'](y,x,h||A.zero))
voc['/']=adv((y,x,h)=>{
  if(typeof y==='function'){
    let f=y,g=x,h0=h
    asrt(typeof f==='function')
    asrt(typeof g==='undefined')
    asrt(typeof h0==='undefined'||h0.isA)
    return(y,x)=>{
      if(!y.s.length)y=A([unw(y)])
      h=h0?toInt(h0):y.s.length-1
      0<=h&&h<y.s.length||rnkErr()
      let n,w,b // w:isNWise,b:isBackwards
      if(x){w=1;n=toInt(x);if(n<0){b=1;n=-n}}else{n=y.s[h]}
      let s0=y.s.slice();s0[h]=y.s[h]-n+1
      let s=s0
      if(w){
        if(!s0[h])return A([],s)
        s0[h]>=0||lenErr()
      }else{
        s=s.slice();s.splice(h,1)
      }
      if(!y.a.length){let z=f.identity;z!=null||domErr();asrt(!z.s.length);return A(rpt([z.a[0]],prd(s)),s)}
      let r=[],ind=rpt([0],s0.length),p=0,u,d=strides(y.s)
      while(1){
        if(b){
          u=y.a[p];u.isA||(u=A.scal(u))
          for(let i=1;i<n;i++){let v=y.a[p+i*d[h]];v.isA||(v=A.scal(v));u=f(u,v)}
        }else{
          u=y.a[p+(n-1)*d[h]];u.isA||(u=A.scal(u))
          for(let i=n-2;i>=0;i--){let v=y.a[p+i*d[h]];v.isA||(v=A.scal(v));u=f(u,v)}
        }
        u.s.length||(u=unw(u));r.push(u)
        let a=ind.length-1;while(a>=0&&ind[a]+1===s0[a]){p-=ind[a]*d[a];ind[a--]=0}
        if(a<0)break
        p+=d[a];ind[a]++
      }
      return A(r,s)
    }
  }else{
    y.s.length||(y=A([unw(y)]))
    h=h?toInt(h,0,y.s.length):y.s.length-1
    x.s.length<=1||rnkErr()
    let a=[],n=y.s[h]
    for(let i=0;i<x.a.length;i++)a[i]=x.a[i]
    if(a.length===1)a=rpt(a,n)
    if(n!==1&&n!==a.length)lenErr()
    let b=[],s=[];for(let i=0;i<y.s.length;i++)s[i]=y.s[i]
    s[h]=0
    for(let i=0;i<a.length;i++){
      let u=a[i];isInt(u)||domErr();s[h]+=Math.abs(u)
      let nj=Math.abs(u);for(let j=0;j<nj;j++)b.push(u>0?i:null)
    }
    if(n===1)for(let i=0;i<b.length;i++)b[i]=b[i]==null?b[i]:0
    let r=[],d=strides(y.s)
    if(s[h]&&y.a.length){
      let filler=getProt(y),p=0,ind=rpt([0],s.length)
      while(1){
        r.push(b[ind[h]]==null?filler:y.a[p+b[ind[h]]*d[h]])
        let i=s.length-1;while(i>=0&&ind[i]+1===s[i]){if(i!==h)p-=d[i]*ind[i];ind[i--]=0}
        if(i<0)break
        if(i!==h)p+=d[i]
        ind[i]++
      }
    }
    return A(r,s)
  }
})
voc['⌷']=(y,x,h)=>{
  if(typeof y==='function')return(u,v)=>y(u,v,x)
  x||nyiErr();x.s.length>1&&rnkErr();x.a.length>y.s.length&&lenErr()
  if(h){
    h=h.a;x.a.length===h.length||lenErr()
    let u=Array(y.s.length)
    for(let i=0;i<h.length;i++){
      isInt(h[i])||domErr();0<=h[i]&&h[i]<y.s.length||rnkErr();u[h[i]]&&rnkErr();u[h[i]]=1
    }
  }else{
    h=[];for(let i=0;i<x.a.length;i++)h.push(i)
  }
  let r=y;for(let i=x.a.length-1;i>=0;i--)r=indexAtSingleAxis(r,x.a[i].isA?x.a[i]:A([x.a[i]],[]),h[i])
  return r
}
const indexAtSingleAxis=(x,y,h)=>{ // y:subscript
  asrt(x.isA&&y.isA&&isInt(h)&&0<=h&&h<x.s.length)
  const ni=prd(x.s.slice(0,h)),nj0=x.s[h],nj=y.a.length,nk=prd(x.s.slice(h+1))
       ,s=x.s.slice(0,h).concat(y.s).concat(x.s.slice(h+1)),n=ni*nj*nk,r=Array(n)
  for(let j=0;j<nj;j++){const u=y.a[j];isInt(u)||domErr();0<=u&&u<nj0||idxErr()}
  let l=0;for(let i=0;i<ni;i++)for(let j=0;j<nj;j++)for(let k=0;k<nk;k++)r[l++]=x.a[(i*nj0+y.a[j])*nk+k]
  return A(r,s)
}
voc._index=({a},y)=>voc['⌷'](y,a[0],a[1])
voc._amend=args=>{
  let[value,x,y,h]=args.a.map(u=>u.isA?u:A([u],[]))
  x.s.length>1&&rnkErr()
  let a=Array(x.a.length);a.length>y.s.length&&lenErr()
  if(h){h.s.length>1&&rnkErr();h=h.a;a.length===h.length||lenErr()}
  else{h=[];for(let i=0;i<a.length;i++)a.push(i)}
  let subs=voc['⌷'](voc['⍳'](A(y.s)),x,A(h))
  if(value.a.length===1)value=A(rpt([value],subs.a.length),subs.s)
  let r=y.a.slice(),stride=strides(y.s)
  subs.s.length!==value.s.length&&rnkErr();''+subs.s!=''+value.s&&lenErr()
  const ni=subs.a.length
  for(let i=0;i<ni;i++){
    let u=subs.a[i],v=value.a[i]
    if(v.isA&&!v.s.length)v=unw(v)
    if(u.isA){let p=0;for(let j=0;j<u.a.length;j++)p+=u.a[j]*stride[j]; r[p]=v}
    else{r[u]=v}
  }
  return A(r,y.s)
}
voc['↑']=(y,x)=>{
  x||nyiErr()
  x.s.length<=1||rnkErr()
  if(!y.s.length)y=A([unw(y)],x.s.length?rpt([1],x.s[0]):[1])
  x.a.length<=y.s.length||rnkErr()
  for(let i=0;i<x.a.length;i++)typeof x.a[i]==='number'&&x.a[i]===Math.floor(x.a[i])||domErr()
  let s=y.s.slice();for(let i=0;i<x.a.length;i++)s[i]=Math.abs(x.a[i])
  let d=Array(s.length);d[d.length-1]=1
  for(let i=d.length-1;i>0;i--)d[i-1]=d[i]*s[i]
  let r=rpt([getProt(y)],prd(s))
  let cs=s.slice(),p=0,q=0,xd=strides(y.s) // cs:shape to copy
  for(let i=0;i<x.a.length;i++){
    let u=x.a[i];cs[i]=Math.min(y.s[i],Math.abs(u))
    if(u<0){if(u<-y.s[i]){q-=(u+y.s[i])*d[i]}else{p+=(u+y.s[i])*xd[i]}}
  }
  if(prd(cs)){
    let ci=new Int32Array(cs.length) // ci:indices for copying
    while(1){
      r[q]=y.a[p];let h=cs.length-1
      while(h>=0&&ci[h]+1===cs[h]){p-=ci[h]*xd[h];q-=ci[h]*d[h];ci[h--]=0}
      if(h<0)break
      p+=xd[h];q+=d[h];ci[h]++
    }
  }
  return A(r,s)
}
voc['⊃']=(y,x)=>{x&&nyiErr();y=y.a.length?y.a[0]:getProt(y);return y.isA?y:A([y],[])}
voc['⍉']=(y,x)=>{
  let a,s=[],d=[],d0=strides(y.s)
  if(x){x.s.length<=1||rnkErr();x.s.length||(x=A([unw(x)]));x.s[0]===y.s.length||lenErr();a=x.a}
  else{a=new Int32Array(y.s.length);for(let i=0;i<a.length;i++)a[i]=a.length-i-1}
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
voc['⍠']=conj((f,g)=>(y,x,h)=>(x?f:g)(y,x,h))

const NOUN=1,VRB=2,ADV=3,CNJ=4
,exec=(s,o={})=>{
  const t=prs(s,o),b=compile(t,o),e=[preludeData.env[0].slice()] // t:ast,b:bytecode,e:env
  for(let k in t.v)e[0][t.v[k].i]=o.ctx[k]
  const r=vm(b,e)
  for(let k in t.v){const v=t.v[k],x=o.ctx[k]=e[0][v.i];if(v.g===ADV)x.adv=1;if(v.g===CNJ)x.conj=1}
  return r
}
,repr=x=>x===null||['string','number','boolean'].indexOf(typeof x)>=0?JSON.stringify(x):
         x instanceof Array?'['+x.map(repr).join(',')+']':
         x.repr?x.repr():'{'+Object.keys(x).map(k=>repr(k)+':'+repr(x[k])).join(',')+'}'
,compile=(ast,o={})=>{
  ast.d=0;ast.n=preludeData?preludeData.n:0;ast.v=preludeData?Object.create(preludeData.v):{} // n:nSlots,d:scopeDepth,v:vars
  o.ctx=o.ctx||Object.create(voc)
  for(let key in o.ctx)if(!ast.v[key]){ // VarInfo{g:grammaticalCategory(1=noun,2=vrb,3=adv,4=cnj),i:slot,d:scopeDepth}
    const u=o.ctx[key],v=ast.v[key]={g:NOUN,i:ast.n++,d:ast.d}
    if(typeof u==='function'||u instanceof Proc){
      v.g=u.adv?ADV:u.conj?CNJ:VRB
      if(/^[gs]et_.*/.test(key))ast.v[key.slice(4)]={g:NOUN}
    }
  }
  const synErrAt=x=>{synErr({file:o.file,offset:x.offset,aplCode:o.aplCode})}
  const gl=x=>{switch(x[0]){default:asrt(0) // categorise lambdas
    case'B':case':':case'←':case'[':case'{':case'.':case'⍬':
      let r=VRB;for(let i=1;i<x.length;i++)if(x[i])r=Math.max(r,gl(x[i]))
      if(x[0]==='{'){x.g=r;return VRB}else{return r}
    case'S':case'N':case'J':return 0
    case'X':{const s=x[1];return s==='⍺⍺'||s==='⍶'||s==='∇∇'?ADV:s==='⍵⍵'||s==='⍹'?CNJ:VRB}
  }}
  gl(ast)
  const q=[ast] // queue for "body" nodes
  while(q.length){
    const scp=q.shift() // scp:scope node
    ,vst=x=>{
      x.scp=scp
      switch(x[0]){default:asrt(0)
        case':':{const r=vst(x[1]);vst(x[2]);return r}
        case'←':return vstLHS(x[1],vst(x[2]))
        case'X':{
          const s=x[1],v=scp.v['get_'+s];if(v&&v.g===VRB)return NOUN
          return(scp.v[s]||{}).g||valErr({file:o.file,offset:x.offset,aplCode:o.aplCode})
        }
        case'{':{
          for(let i=1;i<x.length;i++){
            const d=scp.d+1+(x.g!==VRB) // slot 3 is reserved for a "base pointer"
            ,v=extend(Object.create(scp.v),{'⍵':{i:0,d,g:NOUN},'∇':{i:1,d,g:VRB},'⍺':{i:2,d,g:NOUN},'⍫':{d,g:VRB}})
            q.push(extend(x[i],{scp,d,n:4,v}))
            if(x.g===CNJ){v['⍵⍵']=v['⍹']={i:0,d:d-1,g:VRB};v['∇∇']={i:1,d:d-1,g:CNJ};v['⍺⍺']=v['⍶']={i:2,d:d-1,g:VRB}}
            else if(x.g===ADV){v['⍺⍺']=v['⍶']={i:0,d:d-1,g:VRB};v['∇∇']={i:1,d:d-1,g:ADV}}
          }
          return x.g||VRB
        }
        case'S':case'N':case'J':case'⍬':return NOUN
        case'[':{for(let i=2;i<x.length;i++)if(x[i]&&vst(x[i])!==NOUN)synErrAt(x);return vst(x[1])}
        case'.':{
          let a=x.slice(1),h=Array(a.length);for(let i=a.length-1;i>=0;i--)h[i]=vst(a[i])
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
          while(i<a.length){
            if(h[i]===VRB&&i+1<a.length&&h[i+1]===ADV){
              a.splice(i,2,['A'].concat(a.slice(i,i+2)));h.splice(i,2,VRB)
            }else if((h[i]===NOUN||h[i]===VRB||h[i]===CNJ)&&i+2<a.length&&h[i+1]===CNJ&&(h[i+2]===NOUN||h[i+2]===VRB)){
              a.splice(i,3,['C'].concat(a.slice(i,i+3)));h.splice(i,3,VRB) // allow CNJ,CNJ,... for ∘.f
            }else{
              i++
            }
          }
          if(h.length>1&&h[h.length-1]===VRB){a=[['T'].concat(a)];h=[VRB]} // trains
          if(h[h.length-1]!==NOUN){
            if(h.length>1)synErrAt(a[h.length-1])
          }else{
            while(h.length>1){ // monadic and dyadic verbs
              if(h.length===2||h[h.length-3]!==NOUN){a.splice(-2,9e9,['M'].concat(a.slice(-2)));h.splice(-2,9e9,NOUN)}
              else                                  {a.splice(-3,9e9,['D'].concat(a.slice(-3)));h.splice(-3,9e9,NOUN)}
            }
          }
          x.splice(0,9e9,a[0]);extend(x,a[0]);return h[0]
        }
      }
    }
    ,vstLHS=(x,rg)=>{ // rg:right-hand side grammatical category
      x.scp=scp
      switch(x[0]){default:asrt(0)
        case'X':const s=x[1];if(s==='∇'||s==='⍫')synErrAt(x)
                if(scp.v[s]){scp.v[s].g!==rg&&synErrAt(x)}else{scp.v[s]={d:scp.d,i:scp.n++,g:rg}};break
        case'.':rg===NOUN||synErrAt(x);for(let i=1;i<x.length;i++)vstLHS(x[i],rg);break
        case'[':rg===NOUN||synErrAt(x);vstLHS(x[1],rg);for(let i=2;i<x.length;i++)x[i]&&vst(x[i]);break
      }
      return rg
    }
    for(let i=1;i<scp.length;i++)vst(scp[i])
  }
  const rndr=x=>{switch(x[0]){default:asrt(0)
    case'B':{if(x.length===1)return[LDC,A.zld,RET]
             const a=[];for(let i=1;i<x.length;i++){a.push.apply(a,rndr(x[i]));a.push(POP)}
             a[a.length-1]=RET;return a}
    case':':{const r=rndr(x[1]),y=rndr(x[2]);return r.concat(JEQ,y.length+2,POP,y,RET)}
    case'←':return rndr(x[2]).concat(rndrLHS(x[1]))
    case'X':{const s=x[1],vars=x.scp.v,v=vars['get_'+s]
             return s==='⍫'?[CON]:v&&v.g===VRB?[LDC,A.zero,GET,v.d,v.i,MON]:[GET,vars[s].d,vars[s].i]}
    case'{':{const r=rndr(x[1]),lx=[LAM,r.length].concat(r);let f
             if(x.length===2){f=lx}
             else if(x.length===3){let y=rndr(x[2]),ly=[LAM,y.length].concat(y),v=x.scp.v['⍠']
                                   f=ly.concat(GET,v.d,v.i,lx,DYA)}
             else{synErrAt(x)}
             return x.g===VRB?f:[LAM,f.length+1].concat(f,RET)}
    case'S':{const s=x[1].slice(1,-1).replace(/''/g,"'");return[LDC,A(s.split(''),s.length===1?[]:[s.length])]}
    case'N':{const a=x[1].replace(/[¯∞]/g,'-').split(/j/i).map(x=>x==='-'?Infinity:x==='--'?-Infinity:parseFloat(x))
             return[LDC,A([a[1]?new Z(a[0],a[1]):a[0]],[])]}
    case'J':{const f=Function('return(_w,_a)=>('+x[1].replace(/^«|»$/g,'')+')')();return[EMB,(_w,_a)=>aplify(f(_w,_a))]}
    case'[':{const v=x.scp.v._index,h=[],a=[]
             for(let i=2;i<x.length;i++){const c=x[i];if(c){h.push(i-2);a.push.apply(a,rndr(c))}}
             a.push(VEC,h.length,LDC,A(h),VEC,2,GET,v.d,v.i);a.push.apply(a,rndr(x[1]));a.push(DYA);return a}
    case'V':{const frags=[];let allConst=1
             for(let i=1;i<x.length;i++){const f=rndr(x[i]);frags.push(f);if(f.length!==2||f[0]!==LDC)allConst=0}
             return allConst?[LDC,A(frags.map(f=>isSimple(f[1])?unw(f[1]):f[1]))]
                            :[].concat.apply([],frags).concat([VEC,x.length-1])}
    case'⍬':return[LDC,A.zld]
    case'M':return rndr(x[2]).concat(rndr(x[1]),MON)
    case'A':return rndr(x[1]).concat(rndr(x[2]),MON)
    case'D':case'C':return rndr(x[3]).concat(rndr(x[2]),rndr(x[1]),DYA)
    case'T':{const u=x.scp.v._atop,v=x.scp.v._fork1,w=x.scp.v._fork2;let i=x.length-1,r=rndr(x[i--])
             while(i>=2)r=r.concat(GET,v.d,v.i,rndr(x[i--]),DYA,GET,w.d,w.i,rndr(x[i--]),DYA)
             return i?r.concat(GET,u.d,u.i,rndr(x[1]),DYA):r}
  }}
  const rndrLHS=x=>{switch(x[0]){default:asrt(0)
    case'X':{const s=x[1],vars=x.scp.v,v=vars['set_'+s];return v&&v.g===VRB?[GET,v.d,v.i,MON]:[SET,vars[s].d,vars[s].i]}
    case'.':{const n=x.length-1,a=[SPL,n];for(let i=1;i<x.length;i++){a.push.apply(a,rndrLHS(x[i]));a.push(POP)};return a}
    case'[':{const h=[],a=[],v=x.scp.v._amend // index assignment
             for(let i=2;i<x.length;i++)if(x[i]){h.push(i-2);a.push.apply(a,rndr(x[i]))}
             a.push(VEC,h.length);a.push.apply(a,rndr(x[1]));a.push(LDC,A(h),VEC,4,GET,v.d,v.i,MON)
             a.push.apply(a,rndrLHS(x[1]));return a}
  }}
  return rndr(ast)
}
,aplify=x=>{
  if(typeof x==='string')return x.length===1?A.scal(x):A(x)
  if(typeof x==='number')return A.scal(x)
  if(x instanceof Array)return A(x.map(y=>{y=aplify(y);return y.s.length?y:unw(y)}))
  if(x.isA)return x
  domErr()
}

let preludeData
;(_=>{
  const ast=prs(prelude),code=compile(ast),v={},env=[[]];for(let k in ast.v)v[k]=ast.v[k]
  preludeData={n:ast.n,v,env}
  for(let k in v)env[0][v[k].i]=voc[k]
  vm(code,env)
  for(let k in v)voc[k]=env[0][v[k].i]
})()
let apl=this.apl=(s,o)=>apl.ws(o)(s) // s:apl code; o:options
extend(apl,{fmt,aprx,prs,compile,repr})
apl.ws=(o={})=>{
  const ctx=Object.create(voc)
  if(o.in )ctx['get_⎕']=ctx['get_⍞']=_=>{let s=o.in();asrt(typeof s==='string');return new A(s)}
  if(o.out)ctx['set_⎕']=ctx['set_⍞']=x=>{o.out(fmt(x).join('\n')+'\n')}
  return s=>exec(s,{ctx})
}
const readline=(p,f)=>{ // p:prompt
  ;(readline.requesters=readline.requesters||[]).push(f)
  let rl=readline.rl
  if(!rl){
    rl=readline.rl=require('readline').createInterface(process.stdin,process.stdout)
    rl.on('line',x=>{let h=readline.requesters.pop();h&&h(x)})
    rl.on('close',_=>{process.stdout.write('\n');process.exit(0)})
  }
  rl.setPrompt(p);rl.prompt()
}
if(typeof module!=='undefined'){
  module.exports=apl
  if(module===require.main){
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
            let r;try{r=fmt(ws(''+a.slice(0,i))).join('\n')+'\n'}catch(e){r=e+'\n'}
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
        try{s.match(/^\s*$/)||out.write(fmt(ws(s)).join('\n')+'\n')}catch(e){out.write(e+'\n')}
        readline('      ',f)
      }
      f('')
    }
  }
}
