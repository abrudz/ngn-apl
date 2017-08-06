const Zify=x=>typeof x==='number'?new Z(x,0):x instanceof Z?x:domErr() // complexify
const simplify=(re,im)=>im===0?re:new Z(re,im)
function Z(re,im){asrt(typeof re==='number');asrt(typeof im==='number'||im==null)
  if(re!==re||im!==im)domErr('NaN'); this.re=re;this.im=im||0}
Z.prototype.toString=function(){return fmtNum(this.re)+'J'+fmtNum(this.im)}
Z.prototype.repr=function(){return'new Z('+repr(this.re)+','+repr(this.im)+')'}

Z.exp=x=>{x=Zify(x);let r=Math.exp(x.re);return simplify(r*Math.cos(x.im),r*Math.sin(x.im))}
Z.log=x=>{if(typeof x==='number'&&x>0){return Math.log(x)}
          else{x=Zify(x);return simplify(Math.log(Math.sqrt(x.re*x.re+x.im*x.im)),Z.dir(x))}}
Z.cjg=x=>new Z(x.re,-x.im)
Z.neg=x=>new Z(-x.re,-x.im)
Z.add=(x,y)=>{x=Zify(x);y=Zify(y);return simplify(x.re+y.re,x.im+y.im)}
Z.sub=(x,y)=>{x=Zify(x);y=Zify(y);return simplify(x.re-y.re,x.im-y.im)}
Z.mul=(x,y)=>{x=Zify(x);y=Zify(y);return simplify(x.re*y.re-x.im*y.im,x.re*y.im+x.im*y.re)}
Z.div=(x,y)=>{x=Zify(x);y=Zify(y);const d=y.re*y.re+y.im*y.im
              return simplify((x.re*y.re+x.im*y.im)/d,(y.re*x.im-y.im*x.re)/d)}
Z.itimes   =x=>{x=Zify(x);return simplify(-x.im,x.re)}
Z.negitimes=x=>{x=Zify(x);return simplify(x.im,-x.re)}

// ¯1 ¯2 ¯3 ¯4*2 ←→ 1 4 9 16
// 0j1*2 ←→ ¯1
// 1j2*3 ←→ ¯11j¯2
// .5j1.5*5 ←→ 9.875j¯0.375
// 9 4 0 ¯4 ¯9*.5 ←→ 3 2 0 0j2 0j3
Z.pow=(x,y)=>{
  if(typeof x==='number'&&typeof y==='number'&&(x>=0||isInt(y)))return Math.pow(x,y)
  if(typeof y==='number'&&isInt(y,0)){let r=1;while(y){(y&1)&&(r=Z.mul(r,x));x=Z.mul(x,x);y>>=1};return r}
  if(typeof x==='number'&&y===.5)return x<0?new Z(0,Math.sqrt(-x)):Math.sqrt(x)
  return Z.exp(Z.mul(y,Z.log(x)))
}
Z.sqrt=x=>Z.pow(x,.5)
Z.mag=x=>Math.sqrt(x.re*x.re+x.im*x.im) // magnitude
Z.dir=x=>Math.atan2(x.im,x.re) // direction
Z.sin=x=>Z.negitimes(Z.sinh(Z.itimes(x)))
Z.cos=x=>Z.cosh(Z.itimes(x))
Z.tan=x=>Z.negitimes(Z.tanh(Z.itimes(x)))

// arcsin x = -i ln(ix + sqrt(1 - x^2))
// arccos x = -i ln(x + i sqrt(x^2 - 1))
// arctan x = (i/2) (ln(1-ix) - ln(1+ix))
Z.asin=x=>{x=Zify(x);return Z.negitimes(Z.log(Z.add(Z.itimes(x),Z.sqrt(Z.sub(1,Z.pow(x,2))))))}
Z.acos=x=>{
  x=Zify(x);const r=Z.negitimes(Z.log(Z.add(x,Z.sqrt(Z.sub(Z.pow(x,2),1)))))
  // TODO look up the algorithm for determining the sign of arccos; the following line is dubious
  return r instanceof Z&&(r.re<0||(r.re===0&&r.im<0))?Z.neg(r):r
}
Z.atan=x=>{
  x=Zify(x);const ix=Z.itimes(x)
  return Z.mul(new Z(0,.5),Z.sub(Z.log(Z.sub(1,ix)),Z.log(Z.add(1,ix))))
}

Z.sinh=x=>{let a=Z.exp(x);return Z.mul(.5,Z.sub(a,Z.div(1,a)))}
Z.cosh=x=>{let a=Z.exp(x);return Z.mul(.5,Z.add(a,Z.div(1,a)))}
Z.tanh=x=>{let a=Z.exp(x),b=Z.div(1,a);return Z.div(Z.sub(a,b),Z.add(a,b))}

// arcsinh x =     i arcsin(-ix)
// arccosh x = +/- i arccos(x)
// arctanh x =     i arctan(-ix)
Z.asinh=x=>Z.itimes(Z.asin(Z.negitimes(x)))
Z.acosh=x=>{x=Zify(x);let sign=x.im>0||(!x.im&&x.re<=1)?1:-1;return Z.mul(new Z(0,sign),Z.acos(x))}
Z.atanh=x=>Z.itimes(Z.atan(Z.negitimes(x)))

Z.floor=x=>{
  if(typeof x==='number')return Math.floor(x)
  x=Zify(x)
  let re=Math.floor(x.re),im=Math.floor(x.im),r=x.re-re,i=x.im-im
  if(r+i>=1)r>=i?re++:im++
  return simplify(re,im)
}
Z.ceil=x=>{
  if(typeof x==='number')return Math.ceil(x)
  x=Zify(x)
  let re=Math.ceil(x.re),im=Math.ceil(x.im),r=re-x.re,i=im-x.im
  if(r+i>=1)r>=i?re--:im--
  return simplify(re,im)
}

const iszero=x=>!x||(x instanceof Z&&!x.re&&!x.im)
Z.residue=(x,y)=>typeof x==='number'&&typeof y==='number'?(x?y-x*Math.floor(y/x):y)
                 :iszero(x)?y:Z.sub(y,Z.mul(x,Z.floor(Z.div(y,x))))
Z.isint=x=>typeof x==='number'?x===Math.floor(x):x.re===Math.floor(x.re)&&x.im===Math.floor(x.im)

const firstquadrant=x=>{ // rotate into first quadrant
  if(typeof x==='number'){return Math.abs(x)}
  else{x.re<0&&(x=Z.neg(x));x.im<0&&(x=Z.itimes(x));return x.re?x:x.im}
}
Z.gcd=(x,y)=>{
  if(typeof x==='number'&&typeof y==='number'){
    while(y){let z=y;y=x%y;x=z}
    return Math.abs(x)
  }else{
    while(!iszero(y)){let z=y;y=Z.residue(y,x);x=z}
    return firstquadrant(x)
  }
}
Z.lcm=(x,y)=>{let p=Z.mul(x,y);return iszero(p)?p:Z.div(p,Z.gcd(x,y))}
