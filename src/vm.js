const LDC=1,VEC=2,GET=3,SET=4,MON=5,DYA=6,LAM=7,RET=8,POP=9,SPL=10,JEQ=11,EMB=12,CON=13
,Proc=function(code,addr,size,env){this.code=code;this.addr=addr;this.size=size;this.env=env;this.toString=_=>'#procedure'}
,toFn=p=>(x,y)=>vm({code:p.code,env:p.env.concat([[x,p,y,null]]),pc:p.addr})
,vm=o=>{
  let code=o.code,env=o.env,stk=o.stk||[],pc=o.pc||0
  asrt(code instanceof Array);asrt(env instanceof Array);for(let i=0;i<env.length;i++)asrt(env[i]instanceof Array)
  while(1){
    switch(code[pc++]){
      case LDC:stk.push(code[pc++]);break
      case VEC:{
        let a=stk.splice(stk.length-code[pc++])
        for(let i=0;i<a.length;i++)if(isSimple(a[i]))a[i]=unwrap(a[i])
        stk.push(A(a))
        break
      }
      case GET:{let r=env[code[pc++]][code[pc++]];r!=null||valErr();stk.push(r);break}
      case SET:{env[code[pc++]][code[pc++]]=stk[stk.length-1];break}
      case MON:{
        let wf=stk.splice(-2),w=wf[0],f=wf[1]
        if(typeof f==='function'){
          if(w instanceof Proc)w=toFn(w)
          if(f.cps){
            f(w,undefined,undefined,r=>{stk.push(r);vm({code:code,env:env,stk:stk,pc:pc})})
            return
          }else{
            stk.push(f(w))
          }
        }else{
          let bp=stk.length;stk.push(code,pc,env);code=f.code;pc=f.addr;env=f.env.concat([[w,f,null,bp]])
        }
        break
      }
      case DYA:{
        let wfa=stk.splice(-3),w=wfa[0],f=wfa[1],a=wfa[2]
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
          let bp=stk.length;stk.push(code,pc,env);code=f.code;pc=f.addr;env=f.env.concat([[w,f,a,bp]])
        }
        break
      }
      case LAM:{let size=code[pc++];stk.push(new Proc(code,pc,size,env));pc+=size;break}
      case RET:{
        if(stk.length===1)return stk[0]
        let u=stk.splice(-4,3);code=u[0];pc=u[1];env=u[2]
        break
      }
      case POP:{stk.pop();break}
      case SPL:{
        let n=code[pc++]
        let a=toArray(stk[stk.length-1]).reverse()
        for(let i=0;i<a.length;i++)if(!(a[i].isA))a[i]=A([a[i]],[])
        if(a.length===1){a=repeat(a,n)}else if(a.length!==n){lenErr()}
        stk.push.apply(stk,a)
        break
      }
      case JEQ:{let n=code[pc++];toInt(stk[stk.length-1],0,2)||(pc+=n);break}
      case EMB:{let frame=env[env.length-1];stk.push(code[pc++](frame[0],frame[2]));break}
      case CON:{
        let frame=env[env.length-1]
        ;(_=>{
          let cont={
            code:code,
            env:env.map(x=>x.slice(0)),
            stk:stk.slice(0,frame[3]),
            pc:frame[1].addr+frame[1].size-1
          }
          asrt(code[cont.pc] === RET)
          stk.push(r=>{code=cont.code;env=cont.env;stk=cont.stk;pc=cont.pc;stk.push(r)})
        })()
        break
      }
      default:err('Unrecognized instruction:'+code[pc-1]+',pc:'+pc)
    }
  }
}
