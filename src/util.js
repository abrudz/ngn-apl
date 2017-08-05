const asrt=x=>{if(typeof x==='function'){if(!x())throw Error('assertion failed: '+x)}
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
