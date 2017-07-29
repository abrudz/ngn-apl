addVoc({
  'get_⎕':cps((_,_1,_2,callback)=>{
    if(typeof window!=='undefined'&&typeof window.prompt==='function'){
      setTimeout(_=>{callback(exec(prompt('⎕:')||''))},0)
    }else{
      process.stdout.write('⎕:\n')
      readline('      ',line=>{callback(exec(new A(line).toSimpleString()))})
    }
  }),
  'set_⎕':x=>{
    var s=format(x).join('\n')+'\n'
    if(typeof window!=='undefined'&&typeof window.alert==='function'){window.alert(s)}else{process.stdout.write(s)}
    return x
  },
  'get_⍞':cps((_,_1,_2,callback)=>{
    if(typeof window!=='undefined'&&typeof window.prompt==='function'){
      setTimeout(_=>{callback(new A(prompt('')||''))},0)
    }else{
      readline('',line=>{callback(new A(line))})
    }
  }),
  'set_⍞':x=>{
    var s=format(x).join('\n')
    if(typeof window!=='undefined'&&typeof window.alert==='function'){window.alert(s)}else{process.stdout.write(s)}
    return x
  },
  // The index origin is fixed at 0.  Reading it returns 0.  Attempts to set it
  // to anything other than that fail.
  //
  // ⎕IO   ←→ 0
  // ⎕IO←0 ←→ 0
  // ⎕IO←1 !!!
  'get_⎕IO':_=>A.zero,
  'set_⎕IO':x=>{if(match(x,A.zero)){return x}else{domErr('The index origin (⎕IO) is fixed at 0')}},
  '⎕DL':cps((om,al,_,callback)=>{
    var t0=+new Date;setTimeout(_=>{callback(new A([new Date-t0]))},om.unwrap())
  }),
  // 'b(c+)d'⎕RE'abcd' ←→ 1 'bcd' (,'c')
  // 'B(c+)d'⎕RE'abcd' ←→ ⍬
  // 'a(b'   ⎕RE'c'           !!! DOMAIN ERROR
  '⎕RE':(om,al)=>{
    var x=al.toSimpleString(),y=om.toSimpleString()
    try{var re=RegExp(x)}catch(e){domErr(e.toString())}
    var m=re.exec(y)
    if(!m)return A.zilde
    var r=[m.index];for(var i=0;i<m.length;i++)r.push(new A(m[i]||''))
    return new A(r)
  },
  // ⎕UCS'a' ←→ 97
  // ⎕UCS'ab' ←→ 97 98
  // ⎕UCS 2 2⍴97+⍳4 ←→ 2 2⍴'abcd'
  '⎕UCS':(om,al)=>{
    al&&nyiErr()
    return om.map(x=>
      isInt(x,0,0x10000)?String.fromCharCode(x):typeof x==='string'?x.charCodeAt(0):domErr()
    )
  },
  'get_⎕OFF':_=>{typeof process==='undefined'&&nyiErr();process.exit(0)}
})
