const NOUN=1,VRB=2,ADV=3,CNJ=4
,exec=(s,o={})=>{
  const ast=parse(s,o),code=compile(ast,o),env=[prelude.env[0].slice(0)]
  for(let k in ast.v)env[0][ast.v[k].i]=o.ctx[k]
  const r=vm(code,env)
  for(let k in ast.v){const v=ast.v[k],x=o.ctx[k]=env[0][v.i];if(v.g===ADV)x.adv=1;if(v.g===CNJ)x.conj=1}
  return r
}
,repr=x=>x===null||['string','number','boolean'].indexOf(typeof x)>=0?JSON.stringify(x):
         x instanceof Array?'['+x.map(repr).join(',')+']':
         x.repr?x.repr():'{'+Object.keys(x).map(k=>repr(k)+':'+repr(x[k])).join(',')+'}'
,compile=(ast,o={})=>{
  ast.d=0;ast.n=prelude?prelude.n:0;ast.v=prelude?Object.create(prelude.v):{} // n:nSlots,d:scopeDepth,v:vars
  o.ctx=o.ctx||Object.create(voc)
  for(let key in o.ctx)if(!ast.v[key]){ // VarInfo{g:grammaticalCategory(1=noun,2=vrb,3=adv,4=cnj),i:slot,d:scopeDepth}
    const u=o.ctx[key],varInfo=ast.v[key]={g:NOUN,i:ast.n++,d:ast.d}
    if(typeof u==='function'||u instanceof Proc){
      varInfo.g=u.adv?ADV:u.conj?CNJ:VRB
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
    const scp=q.shift(),vars=scp.v // scp:scope node
    ,vst=x=>{
      x.scp=scp
      switch(x[0]){
        case':':{const r=vst(x[1]);vst(x[2]);return r}
        case'←':return vstLHS(x[1],vst(x[2]))
        case'X':{
          const s=x[1],v=vars['get_'+s]
          if(v&&v.g===VRB)return NOUN
          return vars[s]&&vars[s].g||valErr(s,{file:o.file,offset:x.offset,aplCode:o.aplCode}) // x⋄x←0 !!! VALUE ERROR
        }
        case'{':
          for(let i=1;i<x.length;i++){
            const d=scp.d+1+(x.g!==VRB)   // slot 3 is reserved for a "base pointer"
            ,v=extend(Object.create(vars),{'⍵':{i:0,d,g:NOUN},'∇':{i:1,d,g:VRB},'⍺':{i:2,d,g:NOUN},'⍫':{d,g:VRB}})
            q.push(extend(x[i],{scp,d,n:4,v}))
            if(x.g===CNJ){v['⍵⍵']=v['⍹']={i:0,d:d-1,g:VRB};v['∇∇']={i:1,d:d-1,g:CNJ};v['⍺⍺']=v['⍶']={i:2,d:d-1,g:VRB}}
            else if(x.g===ADV){v['⍺⍺']=v['⍶']={i:0,d:d-1,g:VRB};v['∇∇']={i:1,d:d-1,g:ADV}}
          }
          return x.g||VRB
        case'S':case'N':case'J':case'⍬':return NOUN
        case'[':{
          for(let i=2;i<x.length;i++)if(x[i]&&vst(x[i])!==NOUN)synErrAt(x)
          return vst(x[1])
        }
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
          while(i<a.length){ // ⌽¨⍣3⊢(1 2)3(4 5 6)←→(2 1)3(6 5 4)
            if(h[i]===VRB&&i+1<a.length&&h[i+1]===ADV){
              a.splice(i,2,['A'].concat(a.slice(i,i+2)));h.splice(i,2,VRB)
            }else if((h[i]===NOUN||h[i]===VRB||h[i]===CNJ)&&i+2<a.length&&h[i+1]===CNJ&&(h[i+2]===NOUN||h[i+2]===VRB)){
              a.splice(i,3,['C'].concat(a.slice(i,i+3)));h.splice(i,3,VRB) // allow CNJ,CNJ,... for ∘.f
            }else{
              i++
            }
          }
          if(h.length===2&&h[0]!==NOUN&&h[1]!==NOUN){a=[['T'].concat(a)];h=[VRB]}     // atops
          if(h.length>=3&&h.length%2&&h.indexOf(NOUN)<0){a=[['F'].concat(a)];h=[VRB]} // forks
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
      asrt(0)
    }
    ,vstLHS=(x,rg)=>{ // rg:right-hand side grammatical category
      x.scp=scp
      switch(x[0]){default:asrt(0)
        case'X':const s=x[1];if(s==='∇'||s==='⍫')synErrAt(x)
                if(vars[s]){vars[s].g!==rg&&synErrAt(x)}else{vars[s]={d:scp.d,i:scp.n++,g:rg}};break
        case'.':rg===NOUN||synErrAt(x);for(let i=1;i<x.length;i++)vstLHS(x[i],rg);break
        case'[':rg===NOUN||synErrAt(x);vstLHS(x[1],rg);for(let i=2;i<x.length;i++)x[i]&&vst(x[i]);break
      }
      return rg
    }
    for(let i=1;i<scp.length;i++)vst(scp[i])
  }
  const rndr=x=>{switch(x[0]){default:asrt(0)
    case'B':{if(x.length===1)return[LDC,A.zilde,RET] // {}0 ←→ ⍬
             const a=[];for(let i=1;i<x.length;i++){a.push.apply(a,rndr(x[i]));a.push(POP)}
             a[a.length-1]=RET;return a}
    case':':{const r=rndr(x[1]),y=rndr(x[2]);return r.concat(JEQ,y.length+2,POP,y,RET)}
    case'←':return rndr(x[2]).concat(rndrLHS(x[1])) // a←5←→5 ⍙ a×a←2 5←→4 25
    // r←3⋄get_c←{2×○r}⋄get_S←{○r*2}⋄bef←.01×⌊100×r c S⋄r←r+1⋄aft←.01×⌊100×r c S⋄bef aft←→(3 18.84 28.27)(4 25.13 50.26)
    // {⍺}0 !!! VALUE ERROR ⍙ {x}0⋄x←0 !!! VALUE ERROR ⍙ {⍫1⋄2}⍬←→1 ⍙ c←{}⋄x←{c←⍫⋄1}⍬⋄{x=1:c 2⋄x}⍬←→2
    case'X':{const s=x[1],vars=x.scp.v,v=vars['get_'+s]
             return s==='⍫'?[CON]:v&&v.g===VRB?[LDC,A.zero,GET,v.d,v.i,MON]:[GET,vars[s].d,vars[s].i]}
    // {1+1}1←→2 ⍙ {⍵=0:1⋄2×∇⍵-1}5←→32 ⍙ {⍵<2:1⋄(∇⍵-1)+∇⍵-2}8←→34 ⍙ ⊂{⍺⍺ ⍺⍺ ⍵}'ab'←→⊂⊂'ab' ⍙ ⊂{⍺⍺ ⍵⍵ ⍵}⌽'ab'←→⊂'ba'
    // ⊂{⍶⍶⍵}'ab'←→⊂⊂'ab' ⍙ ⊂{⍶⍹⍵}⌽'ab'←→⊂'ba' ⍙ +{⍵⍶⍵}1 2←→2 4 ⍙ f←{⍵⍶⍵}⋄+f 1 2←→2 4
    // tw←{⍶⍶⍵}⋄*tw 2←→1618.1779919126539 ⍙ f←{-⍵;⍺×⍵}⋄(f 5)(3 f 5)←→¯5 15 ⍙ f←{;}⋄(f 5)(3 f 5)←→⍬⍬
    // ²←{⍶⍶⍵;⍺⍶⍺⍶⍵}⋄*²2←→1618.1779919126539 ⍙ ²←{⍶⍶⍵;⍺⍶⍺⍶⍵}⋄3*²2←→19683 ⍙ H←{⍵⍶⍹⍵;⍺⍶⍹⍵}⋄+H÷2←→2.5
    // H←{⍵⍶⍹⍵;⍺⍶⍹⍵}⋄7+H÷2←→7.5 ⍙ {;;} !!!
    case'{':{const r=rndr(x[1]),lx=[LAM,r.length].concat(r);let f
             if(x.length===2){f=lx}
             else if(x.length===3){let y=rndr(x[2]),ly=[LAM,y.length].concat(y),v=x.scp.v['⍠']
                                   f=ly.concat(GET,v.d,v.i,lx,DYA)}
             else{synErrAt(x)}
             return x.g===VRB?f:[LAM,f.length+1].concat(f,RET)}
    // ⍴''←→,0 ⍙ ⍴'x'←→⍬ ⍙ ⍴'xx'←→,2 ⍙ ⍴'a''b'←→,3 ⍙ ⍴'''a'←→,2 ⍙ ⍴'a'''←→,2 ⍙ ⍴''''←→⍬ ⍙ 'a !!!
    case'S':{const s=x[1].slice(1,-1).replace(/''/g,"'");return[LDC,A(s,s.length===1?[]:[s.length])]}
    // ∞←→¯ ⍙ ¯∞←→¯¯ ⍙ ¯∞j¯∞←→¯¯j¯¯ ⍙ ∞∞←→¯ ¯ ⍙ ∞¯←→¯ ¯
    case'N':{const a=x[1].replace(/[¯∞]/g,'-').split(/j/i).map(x=>x==='-'?Infinity:x==='--'?-Infinity:parseFloat(x))
             return[LDC,A([a[1]?new Z(a[0],a[1]):a[0]],[])]}
    // 1+«2+3»←→6
    case'J':{const f=Function('return(_w,_a)=>('+x[1].replace(/^«|»$/g,'')+')')();return[EMB,(_w,_a)=>aplify(f(_w,_a))]}
    case'[':{const v=x.scp.v._index,axes=[],a=[] // ⍴x[⍋x←6?49]←→,6
             for(let i=2;i<x.length;i++){const c=x[i];if(c){axes.push(i-2);a.push.apply(a,rndr(c))}}
             a.push(VEC,axes.length,LDC,A(axes),VEC,2,GET,v.d,v.i);a.push.apply(a,rndr(x[1]));a.push(DYA);return a}
    case'V':{const frags=[];let allConst=1
             for(let i=1;i<x.length;i++){const f=rndr(x[i]);frags.push(f);if(f.length!==2||f[0]!==LDC)allConst=0}
             return allConst?[LDC,A(frags.map(f=>isSimple(f[1])?unwrap(f[1]):f[1]))]
                            :[].concat.apply([],frags).concat([VEC,x.length-1])}
    case'⍬':return[LDC,A.zilde]
    case'M':return rndr(x[2]).concat(rndr(x[1]),MON)
    case'A':return rndr(x[1]).concat(rndr(x[2]),MON)
    case'D':case'C':return rndr(x[3]).concat(rndr(x[2]),rndr(x[1]),DYA)
    case'T':{const v=x.scp.v._atop;return rndr(x[2]).concat(GET,v.d,v.i,rndr(x[1]),DYA)}
    case'F':{const u=x.scp.v._atop,v=x.scp.v._fork1,w=x.scp.v._fork2;let i=x.length-1,r=rndr(x[i--])
             while(i>=2)r=r.concat(GET,v.d,v.i,rndr(x[i--]),DYA,GET,w.d,w.i,rndr(x[i--]),DYA)
             return i?r.concat(rndr(x[1]),GET,u.d,u.i,DYA):r}
  }}
  const rndrLHS=x=>{switch(x[0]){default:asrt(0)
    case'X':{const s=x[1],vars=x.scp.v,v=vars['set_'+s];return v&&v.g===VRB?[GET,v.d,v.i,MON]:[SET,vars[s].d,vars[s].i]}
    // (a b)←1 2⋄a←→1 ⍙ (a b)←1 2⋄b←→2 ⍙ (a b)←+ !!! ⍙ (a b c)←3 4 5⋄a b c←→3 4 5 ⍙ (a b c)←6⋄a b c←→6 6 6
    // (a b c)←7 8⋄a b c !!! ⍙ ((a b)c)←3(4 5)⋄a b c←→3 3(4 5)
    case'.':{const n=x.length-1,a=[SPL,n];for(let i=1;i<x.length;i++){a.push.apply(a,rndrLHS(x[i]));a.push(POP)};return a}
    case'[':{const axes=[],a=[],v=x.scp.v._substitute // index assignment
             for(let i=2;i<x.length;i++)if(x[i]){axes.push(i-2);a.push.apply(a,rndr(x[i]))}
             a.push(VEC,axes.length);a.push.apply(a,rndr(x[1]));a.push(LDC,A(axes),VEC,4,GET,v.d,v.i,MON)
             a.push.apply(a,rndrLHS(x[1]));return a}
  }}
  return rndr(ast)
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
  const ast=parse(preludeSrc),code=compile(ast),v={},env=[[]];for(let k in ast.v)v[k]=ast.v[k]
  prelude={code,n:ast.n,v,env}
  for(let k in prelude.v)env[0][prelude.v[k].i]=voc[k]
  vm(prelude.code,env)
  for(let k in prelude.v)voc[k]=env[0][prelude.v[k].i]
})()
