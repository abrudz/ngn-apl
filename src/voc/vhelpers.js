var vocabulary={}
const addVoc=h=>{for(var k in h)vocabulary[k]=h[k]}

// pervasive() is a higher-order function
//
// Consider a function that accepts and returns only scalars.  To make it
// pervasive means to make it work with any-dimensional arrays, too.
//
// What pervasive() actually does is to take two versions of a scalar function
// (a monadic and a dyadic one), make them pervasive, and combine them into a
// single function that dispatches based on the number of arguments.
const pervasive=h=>{
  var monad=h.monad,dyad=h.dyad
  var pervadeMonadic=!monad?nyiErr:x=>{
    if(x instanceof A)return x.map(pervadeMonadic)
    var r=monad(x);typeof r==='number'&&r!==r&&domErr('NaN');return r
  }
  var pervadeDyadic=!dyad?nyiErr:(x,y)=>{
    // tx,ty: 0=unwrapped scalar; 1=singleton array; 2=non-singleton array
    var tx=x instanceof A?(x.isSingleton()?20:30):10
    var ty=y instanceof A?(y.isSingleton()? 2: 3): 1
    switch(tx+ty){ // todo: use the larger shape when tx=10 and ty=1
      case 11:        var r=dyad(x,y);typeof r==='number'&&r!==r&&domErr('NaN');return r
      case 12:case 13:return y.map(yi=>pervadeDyadic(x,yi))
      case 21:case 31:return x.map(xi=>pervadeDyadic(xi,y))
      case 23:        xi=x.data[x.offset];return y.map(yi=>pervadeDyadic(xi,yi))
      case 32:case 22:yi=y.data[y.offset];return x.map(xi=>pervadeDyadic(xi,yi))
      case 33:
        x.shape.length!==y.shape.length&&rnkErr()
        x.shape!=''+y.shape&&lenErr()
        return x.map2(y,pervadeDyadic)
      default:asrt(0)
    }
  }
  return(om,al)=>{
    asrt(om instanceof A);asrt(al instanceof A||al==null)
    return(al!=null?pervadeDyadic:pervadeMonadic)(om,al)
  }
}
const real=f=>(x,y,axis)=>
  typeof x!=='number'||y!=null&&typeof y!=='number'?domErr():f(x,y,axis)
const numeric=(f,g)=>(x,y,axis)=>
  (typeof x!=='number'||y!=null&&typeof y!=='number'?g(Zify(x),y==null?y:Zify(y),axis):f(x,y,axis))
const match=(x,y)=>{
  if(x instanceof A){
    if(!(y instanceof A)||x.shape!=''+y.shape)return 0
    var r=1;each2(x,y,(xi,yi)=>{r&=match(xi,yi)});return r
  }else{
    if(y instanceof A)return 0
    if(x instanceof Z&&y instanceof Z)return x.re===y.re&&x.im===y.im
    return x===y
  }
}
const numApprox=(x,y)=>x===y||Math.abs(x-y)<1e-11
const approx=(x,y)=>{
  // approx() is like match(), but it is tolerant to precision errors;
  // used for comparing expected and actual results in doctests
  if(x instanceof A){
    if(!(y instanceof A))return 0
    if(x.shape.length!==y.shape.length)return 0
    if(x.shape!=''+y.shape)return 0
    var r=1;each2(x,y,(xi,yi)=>{r&=approx(xi,yi)});return r
  }else{
    if(y instanceof A)return 0
    if(x==null||y==null)return 0
    if(typeof x==='number')x=new Z(x)
    if(typeof y==='number')y=new Z(y)
    if(x instanceof Z)return y instanceof Z&&numApprox(x.re,y.re)&&numApprox(x.im,y.im)
    return x===y
  }
}
const bool=x=>(x&1)!==x?domErr():x
const getAxisList=(axes,rank)=>{
  asrt(isInt(rank,0))
  if(axes==null)return[]
  asrt(axes instanceof A)
  if(axes.shape.length!==1||axes.shape[0]!==1)synErr() // [sic]
  var a=axes.unwrap()
  if(a instanceof A){
    a=a.toArray()
    for(var i=0;i<a.length;i++){
      isInt(a[i],0,rank)||domErr()
      a.indexOf(a[i])<i&&domErr('Non-unique axes')
    }
    return a
  }else if(isInt(a,0,rank)){
    return[a]
  }else{
    domErr()
  }
}
const withIdentity=(x,f)=>{f.identity=x instanceof A?x:A.scalar(x);return f}
const adverb     =f=>{f.adv =1;return f}
const conjunction=f=>{f.conj=1;return f}
const cps        =f=>{f.cps =1;return f}
