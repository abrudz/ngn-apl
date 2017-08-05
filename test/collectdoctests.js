#!/usr/bin/env node
var fs=require('fs')
,f=x=>fs.lstatSync(x).isDirectory()?fs.readdirSync(x).map(y=>f(x+'/'+y)).join(''):fs.readFileSync(x)
,s=f(__dirname+'/../src'),t=[],m,p=0
while(m=s.slice(p).match(/(?:⍝|\/\/ |⍙)([^\n⍙]*)(←→|!!!)([^\n⍙]+)/m))
 {t.push([m[1].trim(),m[2].trim(),m[3].trim()]);p+=m[0].length}
process.stdout.write('[\n'+t.map(JSON.stringify).join(',\n')+'\n]\n')
