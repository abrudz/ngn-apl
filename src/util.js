const asrt=x=>{if(!x)throw Error('assertion failed')}
,isInt=(x,start,end)=>x===~~x&&(start==null||start<=x&&(end==null||x<end))
,prod=x=>{var r=1;for(var i=0;i<x.length;i++)r*=x[i];return r}
,all=x=>{for(var i=0;i<x.length;i++)if(!x[i])return;return 1}
,extend=(x,y)=>{for(var k in y)x[k]=y[k];return x}
,fmtNum=x=>(''+x).replace('Infinity','∞').replace(/-/g,'¯')
,repeat=(x,n)=>{ // catenates "n" instances of a string or array "x"
  asrt(x.length!=null)
  asrt(isInt(n,0))
  if(!n)return x.slice(0,0)
  var m=n*x.length;while(x.length*2<m)x=x.concat(x)
  return x.concat(x.slice(0,m-x.length))
}
,arrEq=(x,y)=>{
  if(x.length!==y.length)return 0
  for(var i=0;i<x.length;i++)if(x[i]!==y[i])return 0
  return 1
}
,reversed=x=>{
  if(x instanceof Array)return x.slice(0).reverse()
  var i=-1,j=x.length,y=new x.constructor(x.length);y.set(x)
  while(++i<--j){var h=y[i];y[i]=y[j];y[j]=h}
  return y
}
