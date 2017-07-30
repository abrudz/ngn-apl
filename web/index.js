$($=>{
  var a=document.body.querySelectorAll('[id]'),I={};for(var i=0;i<a.length;i++)I[a[i].id]=a[i]

  // bookmarkable source code
  var hashParams={}
  if(location.hash){
    var a=location.hash.substring(1).split(',')
    for(var i=0;i<a.length;i++){var b=a[i].split('=');hashParams[b[0]]=unescape(b[1])}
  }
  I.code.value=hashParams.code||'';I.code.focus()
  $(I.permalink).tipsy({gravity:'e',opacity:1,delayIn:1000}).bind('mouseover focus',_=>{
    $(this).attr('href','#code='+escape($('#code').val()));return!1
  })

  const execute=_=>{
    try{
      var s=I.code.value;I.result.classList.remove('error')
      if(s===')t'){I.result.textContent='Running tests...';setTimeout(runDocTests,1)}
      else{I.result.textContent=apl.format(apl(s)).join('\n')+'\n'}
    }catch(e){
      console&&console.error&&console.error(e.stack)
      I.result.classList.add('error');I.result.textContent=e
    }
  }

  $(I.go).tipsy({gravity:'e',opacity:1,delayIn:1000}).closest('form').submit(_=>{execute();return!1})
  hashParams.run&&I.go.click()

  var hSymbolDefs={
    '+':'Conjugate, Add',
    '-':'Negate, Subtract',
    '×':'Sign of, Multiply',
    '÷':'Reciprocal, Divide',
    '⌈':'Ceiling, Greater of',
    '⌊':'Floor, Lesser of',
    '|':'Absolute value, Residue',
    '⍳':'Index generator, Index of',
    '?':'Roll, Deal',
    '*':'Exponential, To the power of',
    '⍟':'Natural logarithm, Logarithm to the base',
    '○':'Pi times, Circular and hyperbolic functions',
    '!':'Factorial, Binomial',
    '⌹':'Matrix inverse, Matrix divide',
    '⍠':'Variant operator',
    '<':'Less than',
    '≤':'Less than or equal',
    '=':'Equal',
    '≥':'Greater than or equal',
    '>':'Greater than',
    '≠':'Not equal',
    '≡':'Depth, Match',
    '≢':'Tally, Not match',
    '∊':'Enlist, Membership',
    '⍷':'Find',
    '∪':'Unique, Union',
    '∩':'Intersection',
    '~':'Not, Without',
    '∨':'Or (Greatest Common Divisor)',
    '∧':'And (Least Common Multiple)',
    '⍱':'Nor',
    '⍲':'Nand',
    '⍴':'Shape of, Reshape',
    ',':'Ravel, Catenate',
    '⍪':'First axis catenate',
    '⌽':'Reverse, Rotate',
    '⊖':'First axis rotate',
    '⍉':'Transpose',
    '↑':'First, Take',
    '↓':'Drop',
    '⊂':'Enclose, Partition',
    '⊃':'Mix, Pick',
    '⌷':'Index',
    '⍋':'Grade up',
    '⍒':'Grade down',
    '⊤':'Encode',
    '⊥':'Decode',
    '⍕':'Format, Format by specification',
    '⍎':'Execute',
    '⊣':'Stop, Left',
    '⊢':'Pass, Right',
    '⎕':'Evaluated input, Output with a newline',
    '⍞':'Character input, Bare output',
    '¨':'Each',
    '∘':'Compose',
    '/':'Reduce',
    '⌿':'1st axis reduce',
    '\\':'Scan',
    '⍀':'1st axis scan',
    '⍣':'Power operator',
    '⍨':'Commute',
    '¯':'Negative number sign',
    '∞':'Infinity',
    '⍝':'Comment',
    '←':'Assignment',
    '⍬':'Zilde',
    '⋄':'Statement separator',
    '⍺':'Left formal parameter',
    '⍵':'Right formal parameter',
    APL:'Press backquote (`) followed by another key to insert an APL symbol, e.g. `r inserts rho (⍴)'
  }

  // Keyboard
  var layout={
    'default':[
      '` 1 2 3 4 5 6 7 8 9 0 - =',
      'q w e r t y u i o p [ ] \\',
      'a s d f g h j k l ; \' {enter}',
      '{shift} z x c v b n m , . / {bksp}',
      '{alt} {space} {exec!!}'
    ],
    shift:[
      '~ ! @ # $ % ^ & * ( ) _ +',
      'Q W E R T Y U I O P { } |',
      'A S D F G H J K L : " {enter}',
      '{shift} Z X C V B N M < > ? {bksp}',
      '{alt} {space} {exec!!}'
    ],
    alt:[
      '{empty} ¨ ¯ < ≤ = ≥ > ≠ ∨ ∧ ÷ ×',
      '{empty} ⍵ ∊ ⍴ ~ ↑ ↓ ⍳ ○ ⍟ ← → ⍀',
      '⍺ ⌈ ⌊ ⍫ ∇ ∆ ∘ {empty} ⎕ ⋄ {empty} {enter}',
      '{shift} ⊂ ⊃ ∩ ∪ ⊥ ⊤ | ⍪ {empty} ⌿ {bksp}',
      '{alt} {space} {exec!!}'
    ],
    'alt-shift':[
      '⍨ ∞ ⍁ ⍂ ⍠ ≈ ⌸ ⍯ ⍣ ⍱ ⍲ ≢ ≡',
      '⌹ ⍹ ⍷ ⍤ {empty} ⌶ ⊖ ⍸ ⍬ ⌽ ⊣ ⊢ ⍉',
      '⍶ {empty} {empty} {empty} ⍒ ⍋ ⍝ {empty} ⍞ {empty} {empty} {enter}',
      '{shift} ⊆ ⊇ ⋔ ⍦ ⍎ ⍕ ⌷ « » ↗ {bksp}',
      '{alt} {space} {exec!!}'
    ]
  }

  // Key mappings
  var combos={'`':{}}
  var asciiKeys=layout['default'].concat(layout.shift).join(' ').split(' ')
  var aplKeys=layout.alt.concat(layout['alt-shift']).join(' ').split(' ')
  for(var i=0;i<asciiKeys.length;i++){
    var k=asciiKeys[i],v=aplKeys[i]
    if(!/^\{\w+\}$/.test(k)&&!/^\{\w+\}$/.test(v))combos['`'][k]=v
  }

  $.keyboard.keyaction.exec=execute
  $.keyboard.defaultOptions.combos={}
  $.keyboard.comboRegex=/(`)(.)/mig
  $(I.code).addTyping().keyboard({
    layout:'custom',useCombos:false,autoAccept:true,usePreview:false,customLayout:layout,useCombos:true,combos:combos,
    display:{bksp:'Bksp',shift:'⇧',alt:'APL',enter:'Enter',exec:'⍎'}
  })
  I.code.focus()
  I.code.onkeydown=x=>{if(x.which===13&&x.ctrlKey){I.go.click();return!1}}

  var tipsyOpts={gravity:'s',delayIn:1000,opacity:1,title:_=>hSymbolDefs[$(this).text()]||''}
  $('.ui-keyboard').on('mouseover','.ui-keyboard-button',event=>{
    var $b=$(event.target).closest('.ui-keyboard-button')
    if(!$b.data('tipsyInitialised'))$b.data('tipsyInitialised',1).tipsy(tipsyOpts).tipsy('show')
    return!1
  })

  // Tests
  const runDocTests=_=>{
    I.result.classList.remove('error');I.result.classList.textContent=''
    var nExecuted=0,nFailed=0,t0=+new Date
    for(var i=0;i<aplTests.length;i++){
      var x=aplTests[i],code=x[0],mode=x[1],expectation=x[2]
      nExecuted++
      var outcome=runDocTest([code,mode,expectation],apl,apl.approx)
      if(!outcome.success){
        nFailed++
        var s='Test failed: '+JSON.stringify(code)+'\n'+
              '             '+JSON.stringify(expectation)+'\n'
        if(outcome.reason)s+=outcome.reason+'\n'
        if(outcome.error)s+=outcome.error.stack+'\n'
        $('#result').text($('#result').text()+s)
      }
    }
    I.result.textContent+=(nFailed?nFailed+' out of '+nExecuted+' tests failed':'All '+nExecuted+' tests passed')
                          +' in '+(new Date-t0)+' ms.\n'
  }
})
