const LDC=1,VEC=2,GET=3,SET=4,MON=5,DYA=6,LAM=7,RET=8,POP=9,SPL=10,JEQ=11,EMB=12,CON=13
,Proc=function(b,p,size,h){this.b=b;this.p=p;this.size=size;this.h=h;this.toString=_=>'#procedure'}
,toFn=f=>(x,y)=>vm(f.b,f.h.concat([[x,f,y,null]]),f.p)
,vm=(b,h,p=0,t=[])=>{ // b:bytecode,h:environment,p:program counter,t:stack
  while(1)switch(b[p++]){default:asrt(0)
    case LDC:t.push(b[p++]);break
    case VEC:{let a=t.splice(t.length-b[p++]);for(let i=0;i<a.length;i++)if(isSimple(a[i]))a[i]=unwrap(a[i])
              t.push(A(a));break}
    case GET:{let r=h[b[p++]][b[p++]];r!=null||valErr();t.push(r);break}
    case SET:{h[b[p++]][b[p++]]=t[t.length-1];break}
    case MON:{let[w,f]=t.splice(-2)
              if(typeof f==='function'){if(w instanceof Proc)w=toFn(w)
                                        if(f.cps){f(w,undefined,undefined,r=>{t.push(r);vm(b,h,p,t)});return}
                                        t.push(f(w))}
              else{let bp=t.length;t.push(b,p,h);b=f.b;p=f.p;h=f.h.concat([[w,f,null,bp]])}
              break}
    case DYA:{let[w,f,a]=t.splice(-3)
              if(typeof f==='function'){if(w instanceof Proc)w=toFn(w)
                                        if(a instanceof Proc)a=toFn(a)
                                        if(f.cps){f(w,a,undefined,r=>{t.push(r);vm(b,h,p,t)});return}
                                        t.push(f(w,a))}
              else{let bp=t.length;t.push(b,p,h);b=f.b;p=f.p;h=f.h.concat([[w,f,a,bp]])}
              break}
    case LAM:{let size=b[p++];t.push(new Proc(b,p,size,h));p+=size;break}
    case RET:{if(t.length===1)return t[0];[b,p,h]=t.splice(-4,3);break}
    case POP:{t.pop();break}
    case SPL:{let n=b[p++],a=toArray(t[t.length-1]).reverse();for(let i=0;i<a.length;i++)if(!a[i].isA)a[i]=A([a[i]],[])
              if(a.length===1){a=repeat(a,n)}else if(a.length!==n){lenErr()}
              t.push.apply(t,a);break}
    case JEQ:{const n=b[p++];toInt(t[t.length-1],0,2)||(p+=n);break}
    case EMB:{let frm=h[h.length-1];t.push(b[p++](frm[0],frm[2]));break}
    case CON:{let frm=h[h.length-1],cont={b,h:h.map(x=>x.slice(0)),t:t.slice(0,frm[3]),p:frm[1].p+frm[1].size-1}
              asrt(b[cont.p]===RET);t.push(r=>{b=cont.b;h=cont.h;t=cont.t;p=cont.p;t.push(r)});break}
  }
}
