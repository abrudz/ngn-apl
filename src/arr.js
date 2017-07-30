const each=(a,f)=>{ // iterates through the elements of an APL array in ravel order.
  if(empty(a))return
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
const each2=(a,b,f)=>{ // like each() but iterates over two APL array in parallel
  var data =a.data,shape =a.shape,stride =a.stride
  var data1=b.data,shape1=b.shape,stride1=b.stride
  shape.length!==shape1.length&&rnkErr()
  shape!=''+shape1&&lenErr() // abuse JS type coercion -- compare the shapes as strings
  if(empty(a))return
  var lastAxis=shape.length-1,p=a.offset,q=b.offset
  var i=Array(shape.length);for(var j=0;j<i.length;j++)i[j]=0
  while(1){
    f(data[p],data1[q],i)
    var axis = lastAxis
    while(axis>=0&&i[axis]+1===shape[axis]){p-=i[axis]*stride[axis];q-=i[axis]*stride1[axis];i[axis--]=0}
    if(axis<0)break
    i[axis]++;p+=stride[axis];q+=stride1[axis]
  }
}

function A(data,shape,stride,offset){ // APL array constructor
  var x=this
  x.data=data                             ;asrt(x.data.length!=null)
  x.shape=shape||[x.data.length]          ;asrt(x.shape.length!=null)
  x.stride=stride||strideForShape(x.shape);asrt(x.stride.length===x.shape.length)
  x.offset=offset||0                      ;asrt(!x.data.length||isInt(x.offset,0,x.data.length))
  x.toString=function(){return format(this).join('\n')}
  x.isA=1
  for(var i=0;i<x.shape.length;i++)asrt(isInt(x.shape[i],0))
  if(x.data.length)for(var i=0;i<x.stride.length;i++)asrt(isInt(x.stride[i],-x.data.length,x.data.length+1))
}
const empty=x=>{for(var i=0;i<x.shape.length;i++)if(!x.shape[i])return 1;return 0}
,map=(x,f)=>{var r=[];each(x,(y,i,p)=>r.push(f(y,i,p)));return new A(r,x.shape)}
,map2=(x,y,f)=>{var r=[];each2(x,y,(xi,yi,i)=>r.push(f(xi,yi,i)));return new A(r,x.shape)}
,toArray=x=>{var r=[];each(x,y=>r.push(y));return r}
,toInt=(x,m,M)=>{var r=unwrap(x);if(r!==r|0||m!=null&&r<m||M!=null&&M<=r)domErr();return r}
,toSimpleString=x=>{
  if(x.shape.length>1)rnkErr()
  if(typeof x.data==='string'){
    if(!x.shape.length)return x.data[x.offset]
    if(!x.shape[0])return''
    if(x.stride[0]===1)return x.data.slice(x.offset,x.offset+x.shape[0])
    return toArray(x).join('')
  }else{
    var a=toArray(x)
    for(var i=0;i<a.length;i++)typeof a[i]!=='string'&&domErr()
    return a.join('')
  }
}
,isSingleton=x=>{var s=x.shape;for(var i=0;i<s.length;i++)if(s[i]!==1)return 0;return 1}
,isSimple=x=>!x.shape.length&&!(x.data[x.offset].isA)
,unwrap=x=>{isSingleton(x)||lenErr();return x.data[x.offset]}
,getPrototype=x=>empty(x)||typeof x.data[x.offset]!=='string'?0:' ' // todo
,strideForShape=s=>{
  asrt(s.length!=null)
  var r=Array(s.length),u=1
  for(var i=r.length-1;i>=0;i--){asrt(isInt(s[i],0));r[i]=u;u*=s[i]}
  return r
}

A.zero =new A([0],[])
A.one  =new A([1],[])
A.zilde=new A([],[0])
A.scalar=x=>new A([x],[])
A.bool=[A.zero,A.one]
