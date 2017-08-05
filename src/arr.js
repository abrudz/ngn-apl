const A=(data,shape,stride,offset)=>{
  const x={isA:1, data:data, shape:shape||[data.length], stride:stride, offset:offset||0}
  x.stride=x.stride||strideForShape(x.shape)
  asrt(x.data.length!=null);asrt(x.shape.length!=null);asrt(x.stride.length===x.shape.length)
  asrt(!x.data.length||isInt(x.offset,0,x.data.length))
  for(var i=0;i<x.shape.length;i++)asrt(isInt(x.shape[i],0))
  if(x.data.length)for(var i=0;i<x.stride.length;i++)asrt(isInt(x.stride[i],-x.data.length,x.data.length+1))
  return norm(x)
}
,norm=x=>{
  if(''+x.stride===''+strideForShape(x.shape)&&!x.offset)return x
  if(typeof x.data==='string'){var r='';each(x,u=>r+=u);return A(r,x.shape)}
  if(!(x.data instanceof Float64Array||x.data instanceof Array))nyiErr()
  var r=new(x.data.constructor)(prod(x.shape)),i=0;each(x,u=>r[i++]=u);return A(r,x.shape)
}
,strideForShape=s=>{
  asrt(s.length!=null)
  var r=Array(s.length),u=1
  for(var i=r.length-1;i>=0;i--){asrt(isInt(s[i],0));r[i]=u;u*=s[i]}
  return r
}
,each=(a,f)=>{
  if(!prod(a.shape))return
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
,empty=x=>{for(var i=0;i<x.shape.length;i++)if(!x.shape[i])return 1;return 0}
,map=(x,f)=>{const n=prod(x.shape),r=Array(n);for(var i=0;i<n;i++)r[i]=f(x.data[i]);return A(r,x.shape)}
,toArray=x=>{const n=prod(x.shape),r=Array(n);for(var i=0;i<n;i++)r[i]=x.data[i];return r}
,toInt=(x,m,M)=>{var r=unwrap(x);if(r!==r|0||m!=null&&r<m||M!=null&&M<=r)domErr();return r}
,toSimpleString=x=>{
  if(x.shape.length>1)rnkErr()
  if(typeof x.data==='string'){
    if(!x.shape.length)return x.data[0]
    if(!x.shape[0])return''
    if(x.stride[0]===1)return x.data.slice(0,x.shape[0])
    return toArray(x).join('')
  }else{
    var a=toArray(x)
    for(var i=0;i<a.length;i++)typeof a[i]!=='string'&&domErr()
    return a.join('')
  }
}
,isSingleton=x=>{var s=x.shape;for(var i=0;i<s.length;i++)if(s[i]!==1)return 0;return 1}
,isSimple=x=>!x.shape.length&&!(x.data[0].isA)
,unwrap=x=>{isSingleton(x)||lenErr();return x.data[0]}
,getPrototype=x=>empty(x)||typeof x.data[0]!=='string'?0:' ' // todo
,asrt=x=>{if(typeof x==='function'){if(!x())throw Error('assertion failed: '+x)}
               else                     {if(!x)  throw Error('assertion failed'    )}}
,isInt=(x,m,M)=>x===~~x&&(m==null||m<=x&&(M==null||x<M))
,prod=x=>{var r=1;for(var i=0;i<x.length;i++)r*=x[i];return r}
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
