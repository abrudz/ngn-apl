addVoc({
  // (÷∘-)2     ←→ ¯0.5
  // 8(÷∘-)2    ←→ ¯4
  // ÷∘-2       ←→ ¯0.5
  // 8÷∘-2      ←→ ¯4
  // ⍴∘⍴2 3⍴⍳6  ←→ ,2
  // 3⍴∘⍴2 3⍴⍳6 ←→ 2 3 2
  // 3∘-1       ←→ 2
  // (-∘2)9     ←→ 7
  '∘':conjunction((g,f)=>{
    if(typeof f==='function'){
      if(typeof g==='function'){
        return(om,al)=>f(g(om),al) // f∘g
      }else{
        return(om,al)=>{al==null||synErr('The function does not take a left argument');return f(g,om)} // f∘B
      }
    }else{
      asrt(typeof g==='function')
      return(om,al)=>{al==null||synErr('The function does not take a left argument');return g(om,f)} // A∘g
    }
  })
})
