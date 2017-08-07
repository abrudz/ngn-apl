#!/usr/bin/env node
let s=require('fs').readFileSync(__dirname+'/../apl.js','utf8'),t=[],m,p=0
while(m=s.slice(p).match(/(?:⍝|\/\/ |⍙)([^\n⍙]*)(←→|!!!)([^\n⍙]+)/m))
 {t.push([m[1].trim(),m[2].trim(),m[3].trim()]);p+=m.index+m[0].length}
process.stdout.write('[\n'+t.map(JSON.stringify).join(',\n')+'\n]\n')
