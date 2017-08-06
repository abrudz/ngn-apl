const A=(a,s,stride,offset)=>{
  const x={isA:1, a:a, s:s||[a.length], stride:stride, offset:offset||0}
  x.stride=x.stride||strideForShape(x.s)
  asrt(x.a.length!=null);asrt(x.s.length!=null);asrt(x.stride.length===x.s.length)
  asrt(!x.a.length||isInt(x.offset,0,x.a.length))
  for(var i=0;i<x.s.length;i++)asrt(isInt(x.s[i],0))
  if(x.a.length)for(var i=0;i<x.stride.length;i++)asrt(isInt(x.stride[i],-x.a.length,x.a.length+1))
  return norm(x)
}
,norm=x=>{
  if(''+x.stride===''+strideForShape(x.s)&&!x.offset)return x
  if(typeof x.a==='string'){var r='';each(x,u=>r+=u);return A(r,x.s)}
  if(!(x.a instanceof Float64Array||x.a instanceof Array))nyiErr()
  var r=new(x.a.constructor)(prd(x.s)),i=0;each(x,u=>r[i++]=u);return A(r,x.s)
}
,strideForShape=s=>{
  asrt(s.length!=null)
  var r=Array(s.length),u=1
  for(var i=r.length-1;i>=0;i--){asrt(isInt(s[i],0));r[i]=u;u*=s[i]}
  return r
}
,each=(a,f)=>{
  if(!prd(a.s))return
  var data=a.a,s=a.s,stride=a.stride,lastAxis=s.length-1,p=a.offset,i=[],axis=s.length
  while(--axis>=0)i.push(0)
  while(1){
    f(data[p],i,p)
    axis=lastAxis
    while(axis>=0&&i[axis]+1===s[axis]){
      p-=i[axis]*stride[axis];i[axis--]=0
    }
    if(axis<0)break
    i[axis]++
    p+=stride[axis]
  }
}
,empty=x=>{for(var i=0;i<x.s.length;i++)if(!x.s[i])return 1;return 0}
,map=(x,f)=>{const n=prd(x.s),r=Array(n);for(var i=0;i<n;i++)r[i]=f(x.a[i]);return A(r,x.s)}
,toArray=x=>{const n=prd(x.s),r=Array(n);for(var i=0;i<n;i++)r[i]=x.a[i];return r}
,toInt=(x,m,M)=>{var r=unwrap(x);if(r!==r|0||m!=null&&r<m||M!=null&&M<=r)domErr();return r}
,toSimpleString=x=>{
  if(x.s.length>1)rnkErr()
  if(typeof x.a==='string'){
    if(!x.s.length)return x.a[0]
    if(!x.s[0])return''
    if(x.stride[0]===1)return x.a.slice(0,x.s[0])
    return toArray(x).join('')
  }else{
    var a=toArray(x)
    for(var i=0;i<a.length;i++)typeof a[i]!=='string'&&domErr()
    return a.join('')
  }
}
,isSingleton=x=>{var s=x.s;for(var i=0;i<s.length;i++)if(s[i]!==1)return 0;return 1}
,isSimple=x=>!x.s.length&&!(x.a[0].isA)
,unwrap=x=>{isSingleton(x)||lenErr();return x.a[0]}
,getPrototype=x=>empty(x)||typeof x.a[0]!=='string'?0:' ' // todo
,asrt=x=>{if(typeof x==='function'){if(!x())throw Error('assertion failed: '+x)}
               else                     {if(!x)  throw Error('assertion failed'    )}}
,isInt=(x,m,M)=>x===~~x&&(m==null||m<=x&&(M==null||x<M))
,prd=x=>{var r=1;for(var i=0;i<x.length;i++)r*=x[i];return r}
,extend=(x,y)=>{for(var k in y)x[k]=y[k];return x}
,fmtNum=x=>(''+x).replace('Infinity','∞').replace(/-/g,'¯')
,repeat=(x,n)=>{
  if(!n)return x.slice(0,0)
  var m=n*x.length;while(x.length*2<m)x=x.concat(x)
  return x.concat(x.slice(0,m-x.length))
}
,arrEq=(x,y)=>{
  if(x.length!==y.length)return 0
  for(var i=0;i<x.length;i++)if(x[i]!==y[i])return 0
  return 1
}
,err=(name,m,o)=>{
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

A.zero =A([0],[])
A.one  =A([1],[])
A.zilde=A([],[0])
A.scalar=x=>A([x],[])
A.bool=[A.zero,A.one]
