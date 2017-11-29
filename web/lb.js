;(_=>{
let hc={'<':'&lt;','&':'&amp;',"'":'&apos;','"':'&quot;'},he=x=>x.replace(/[<&'"]/g,c=>hc[c]) //html chars and escape fn
,tcs='<-←xx×:-÷*o⍟[-⌹oo○ff⌈FF⌈ll⌊LL⌊tt⊥TT⊤-|⊣|-⊢~~≈=/≠<=≤>=≥==≡=-≢vv∨^^∧^~⍲v~⍱^|↑v|↓<<⊂>>⊃[|⌷A|⍋V|⍒ii⍳ee∊e-⍷'+
'uu∪nn∩/-⌿\\-⍀,-⍪rr⍴pp⍴o|⌽o-⊖o\\⍉..¨~:⍨*:⍣o.∘[\'⍞[]⎕[:⍠[=⌸ot⍎oT⍕<>⋄on⍝aa⍺ww⍵a-⍶w-⍹VV∇--¯88∞0~⍬V~⍫//↗[/⍁'
,lbs=`←assign_+conjugate;add_-negate;subtract_×signum;multiply_÷reciprocal;divide_*exp;power_⍟ln;log
⌹matrix inverse;matrix divide_○pi;circular_!factorial;binomial_?roll;deal_|magnitude;residue_⌈ceiling;max_⌊floor;min
⊥decode_⊤encode_⊣left_⊢right_=equals_≈approx_≠not equals_≤lesser or equal to_<less than_>greater than
≥greater or equal to_≡depth;match_≢tally;not match_∨or_∧and_⍲nand_⍱nor_↑mix;take_↓split;drop_⊂enclose_⊃first;pick
⌷index_⍋grade up_⍒grade down_⍳indices;index of_∊flatten;member of_⍷find_∪unique;union_∩intersection_~not;without
/reduce;replicate_\\scan_⌿1st axis reduce;1st axis replicate_⍀1st axis scan_,enlist;catenate_⍪table;1st axis catenate
⍴shape of;reshape_⌽reverse;rotate_⊖1st axis reverse;1st axis rotate_⍉transpose;reorder axes_¨each_⍨selfie;commute
⍣power operator_.inner product_∘compose_⍞stdin/stdout_⎕eval\'ed stdin/stdout_⍠combine monadic-dyadic fns_⌸key operator
⍎execute_⍕format_⋄statement separator_⍝comment_⍺left argument_⍵right argument_⍶left operand_⍹right operand_∇recursion
¯negative_∞infinity_⍬empty numeric vector_⍫"return" reified as a function_↗throw_⍁identity element operator`.split(/[\n_]/)
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
  lbh+='<b title="'+he(lbs[i].slice(1).replace(';','\n'))+(ks.length?'\n'+ks.join(''):'')+'">'+lbs[i][0]+'</b>'
}
let d=document,el=d.createElement('div');el.innerHTML=
`<div class=ngn_lb><span class=ngn_x title="Hide language bar">❎</span>${lbh}</div>
 <style>@font-face{font-family:"Apl385 Unicode";src:url(Apl385.woff)format('woff');}</style>
 <style>
  .ngn_lb{position:fixed;top:0;left:0;right:0;background-color:#eee;color:#000;cursor:default;z-index:2147483647;
    font-family:"Apl385 Unicode",monospace;border-bottom:solid #ccc 1px;padding:0 4px;word-wrap:break-word}
  .ngn_lb b{cursor:pointer;padding:0 1px;font-weight:normal;float:left}
  .ngn_lb b:hover{background-color:#008;color:#fff}
  .ngn_bq .ngn_lb{color:#c00}
  .ngn_x{float:right;color:#888;cursor:pointer}
  .ngn_x:hover{color:#f00}
 </style>`
d.body.appendChild(el)
let t,ts=[],lb=el.firstChild,bqm=0 //t:textarea or input, lb:language bar, bqm:backquote mode
let pd=x=>x.preventDefault()
let ev=(x,t,f,c)=>x.addEventListener(t,f,c)
ev(lb,'mousedown',x=>{
  if(x.target.classList.contains('ngn_x')){lb.hidden=1;upd();pd(x);return}
  if(x.target.nodeName==='B'&&t){
    let i=t.selectionStart,j=t.selectionEnd,v=t.value,s=x.target.textContent
    if(i!=null&&j!=null){t.value=v.slice(0,i)+s+v.slice(j);t.selectionStart=t.selectionEnd=i+s.length}
    pd(x);return
  }
})
let fk=x=>{
  let t=x.target
  if(bqm){let i=t.selectionStart,v=t.value,c=bqc[x.key];if(x.which>31){bqm=0;d.body.classList.remove('ngn_bq')}
          if(c){t.value=v.slice(0,i)+c+v.slice(i);t.selectionStart=t.selectionEnd=i+1;pd(x);return!1}}
  switch(x.ctrlKey+2*x.shiftKey+4*x.altKey+8*x.metaKey+100*x.which){
    case 19200:bqm=1;d.body.classList.add('ngn_bq');pd(x);break //`
    case   900:{let i=t.selectionStart,v=t.value,c=tc[v.slice(i-2,i)] //tab
                if(c){t.value=v.slice(0,i-2)+c+v.slice(i);t.selectionStart=t.selectionEnd=i-1;pd(x)}
                break}
  }
}
let ff=x=>{
  let t0=x.target,nn=t0.nodeName.toLowerCase()
  if(nn!=='textarea'&&(nn!=='input'||t0.type!=='text'&&t0.type!=='search'))return
  t=t0;if(!t.ngn){t.ngn=1;ts.push(t);ev(t,'keydown',fk)}
}
let upd=_=>{d.body.style.marginTop=lb.clientHeight+'px'}
upd();ev(window,'resize',upd)
ev(d,'focus',ff,!0);let ae=d.activeElement;ae&&ff({type:'focus',target:ae})
})();
