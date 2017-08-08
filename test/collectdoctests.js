//usr/bin/env node "$0" $@;exit $?
'use strict'
const collectTests=s=>{
  let t=[],m,p=0
  while(m=s.slice(p).match(/(?:⍝|\/\/ |⍙)([^\n⍙]*)(←→|!!!)([^\n⍙]+)/m))
   {t.push([m[1].trim(),m[2].trim(),m[3].trim()]);p+=m.index+m[0].length}
  return t
}
if(typeof require!=='undefined'&&typeof module!=='undefined'&&module===require.main){
  const t=collectTests(require('fs').readFileSync(__dirname+'/../apl.js','utf8'))
  process.stdout.write('[\n'+t.map(JSON.stringify).join(',\n')+'\n]\n')
}
