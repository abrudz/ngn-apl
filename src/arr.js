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
,err=(name,m,o)=>{
  m=m||''
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
