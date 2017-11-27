;(_=>{
let hc={'<':'&lt;','&':'&amp;',"'":'&apos;','"':'&quot;'},he=x=>x.replace(/[<&'"]/g,c=>hc[c]) //html chars and escape fn
,tcs='<-←xx×:-÷*o⍟[-⌹oo○ff⌈FF⌈ll⌊LL⌊tt⊥TT⊤-|⊣|-⊢~~≈=/≠<=≤>=≥==≡=-≢vv∨^^∧^~⍲v~⍱^|↑v|↓<<⊂>>⊃[|⌷A|⍋V|⍒ii⍳ee∊e-⍷'+
'uu∪nn∩/-⌿\\-⍀,-⍪rr⍴pp⍴o|⌽o-⊖o\\⍉..¨~:⍨*:⍣o.∘[\'⍞[]⎕[:⍠[=⌸ot⍎oT⍕<>⋄on⍝aa⍺ww⍵a-⍶w-⍹VV∇--¯88∞0~⍬V~⍫//↗[/⍁'
,lbs=['←assign','+conjugate;add','-negate;subtract','×signum;multiply','÷reciprocal;divide','*exp;power','⍟ln;log',
'⌹matrix inverse;matrix divide','○pi;circular','!factorial;binomial','?roll;deal','|magnitude;residue',
'⌈ceiling;max','⌊floor;min','⊥decode','⊤encode','⊣left','⊢right','=equals','≈approx','≠not equals',
'≤lesser or equal to','<less than','>greater than','≥greater or equal to','≡depth;match','≢tally;not match','∨or',
'∧and','⍲nand','⍱nor','↑mix;take','↓split;drop','⊂enclose','⊃first;pick','⌷index','⍋grade up',
'⍒grade down','⍳indices;index of','∊flatten;member of','⍷find','∪unique;union','∩intersection','~not;without',
'/reduce;replicate','\\scan','⌿1st axis reduce;1st axis replicate','⍀1st axis scan',',enlist;catenate',
'⍪table;1st axis catenate','⍴shape of;reshape','⌽reverse;rotate','⊖1st axis reverse;1st axis rotate',
'⍉transpose;reorder axes','¨each','⍨selfie;commute','⍣power operator','.inner product',
'∘compose','⍞stdin/stdout','⎕eval\'ed stdin/stdout','⍠combine monadic-dyadic fns',
'⌸key operator','⍎execute','⍕format','⋄statement separator','⍝comment','⍺left argument','⍵right argument',
'⍶left operand','⍹right operand','∇recursion','¯negative','∞infinity','⍬empty numeric vector',
'⍫"return" reified as a function','↗throw','⍁identity element operator']
,bqk=' =1234567890-qwertyuiop\\asdfghjkl;\'zxcvbnm,./`[]+!@#$%^&*()_QWERTYUIOP|ASDFGHJKL:"ZXCVBNM<>?~{}'
,bqv='`÷¨¯<≤=≥>≠∨∧×?⍵∊⍴~↑↓⍳○*⊢ ⍺⌈⌊_∇∆∘k⎕⍎⍕ ⊂⊃∩∪⊥⊤|⍝⍀⌿⋄←→⌹⌶⍫⍒⍋⌽⍉⊖⍟⍱⍲!⍰⍵⍷⍷⍨↑↓⍸⍥⍣⊣⍺⌈⌊_⍢HJ⌸⌷≡≢ZXCV⍭⍡∥⍪⍙⍠¤⍞⍬'.replace(/ /g,'')
,tc={},bqc={} //tab completions and ` completions
for(let i=0;i<bqk.length;i++)bqc[bqk[i]]=bqv[i]
for(let i=0;i<tcs.length;i+=3)tc[tcs[i]+tcs[i+1]]=tcs[i+2]
for(let i=0;i<tcs.length;i+=3){let k=tcs[i+1]+tcs[i];tc[k]=tc[k]||tcs[i+2]}
let lbh='';for(let i=0;i<lbs.length;i++){
  let ks=[]
  for(let j=0;j<tcs.length;j+=3)if(lbs[i][0]===tcs[j+2])ks.push('\n'+tcs[j]+' '+tcs[j+1]+' <tab>')
  for(let j=0;j<bqk.length;j++)if(lbs[i][0]===bqv[j])ks.push('\n` '+bqk[j])
  lbh+='<b title="'+he(lbs[i].slice(1))+(ks.length?'\n'+ks.join(''):'')+'">'+lbs[i][0]+'</b>'
}
let d=document,el=d.createElement('div');el.innerHTML=
`<div class=ngn_lb>${lbh}</div>
 <style>
  @font-face{font-family:"Apl385 Unicode";src:url(https://ngn.github.com/ngn/apl/web/Apl385.woff)format('woff');}
 </style>
 <style>
  body{padding-top:24px!important}
  .ngn_lb{position:fixed;top:0;left:0;right:0;height:24px;line-height:24px;background-color:#eee;color:#000;
    cursor:default;overflow:hidden;font-family:"APL385 Unicode",monospace;white-space:pre;wrap:no-wrap;
    border-bottom:solid #ccc 1px;z-index:2147483647}
  .ngn_lb b{cursor:pointer;padding:0 1px;font-weight:normal}
  .ngn_lb b:hover{background-color:#008;color:#fff}
  .ngn_bq .ngn_lb{color:#c00}
 </style>`
d.body.appendChild(el)
let t,lb=el.firstChild,bqm=0 //t:textarea, lb:language bar, bqm:backquote mode
let pd=x=>x.preventDefault()
lb.onmousedown=x=>{
  if(x.target.nodeName!=='B'||!t)return
  let i=t.selectionStart,j=t.selectionEnd,v=t.value,s=x.target.textContent
  if(i!=null&&j!=null){t.value=v.slice(0,i)+s+v.slice(j);t.selectionStart=t.selectionEnd=i+s.length}
  pd(x)
}
lb.onmousewheel=x=>{lb.scrollLeft-=x.wheelDelta/60}
lb.addEventListener('DOMMouseScroll',x=>{pd(x);lb.onmousewheel({wheelDelta:x.detail*-120})}) //firefox
let fk=x=>{
  let t=x.target
  if(bqm){let i=t.selectionStart,v=t.value,c=bqc[x.key];if(x.which>31){bqm=0;d.body.classList.remove('ngn_bq')}
          if(c){t.value=v.slice(0,i)+c+v.slice(i);t.selectionStart=t.selectionEnd=i+1;pd(x)}}
  switch(x.ctrlKey+2*x.shiftKey+4*x.altKey+8*x.metaKey+100*x.which){
    case 19200:bqm=1;d.body.classList.add('ngn_bq');pd(x);break //`
    case   900:{let i=t.selectionStart,v=t.value,c=tc[v.slice(i-2,i)] //tab
                if(c){t.value=v.slice(0,i-2)+c+v.slice(i);t.selectionStart=t.selectionEnd=i-1} pd(x);break}
  }
}
let ff=x=>{
  let t0=x.target,nn=t0.nodeName.toLowerCase()
  if(nn!=='textarea'&&(nn!=='input'||t0.type!=='text'&&t0.type!=='search'))return
  t=t0;if(!t.ngn){t.ngn=1;t.addEventListener('keydown',fk)}
}
d.addEventListener('focus',ff,!0);let ae=d.activeElement;ae&&ff({type:'focus',target:ae})
})();
