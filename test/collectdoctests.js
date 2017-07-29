#!/usr/bin/env node
const fs=require('fs')
const t=[]
const visit=d=>{
  fs.readdirSync(d).forEach(f=>{
    const df=d+'/'+f;if(fs.lstatSync(df).isDirectory()){visit(df);return}
    const a=fs.readFileSync(df,'utf8').split('\n')
    for(var i=0;i<a.length;i++){
      const m=a[i].match(/(?:⍝|\/\/) (.*)(←→|!!!)(.+)$/);if(m)t.push([m[1].trim(),m[2].trim(),m[3].trim()])
    }
  })
}
visit(__dirname+'/../src')
process.stdout.write('[\n'+t.map(JSON.stringify).join(',\n')+'\n]\n')
