addVoc({
  //  ({'monadic'}⍠{'dyadic'})0 ←→ 'monadic'
  // 0({'monadic'}⍠{'dyadic'})0 ←→ 'dyadic'
  '⍠':conjunction((f,g)=>{
    asrt(typeof f==='function')
    asrt(typeof g==='function')
    return(om,al,axis)=>(al?f:g)(om,al,axis)
  })
})
