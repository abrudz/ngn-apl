#!/usr/bin/env node
const fs=require('fs')
const trim=x=>x.replace(/(^ +| +$)/g,'')
var t=[] //tests
const visit=d=>{
  fs.readdirSync(d).forEach(f=>{
    const df=d+'/'+f;if(fs.lstatSync(df).isDirectory()){visit(df);return}
    if(!/^(\w|\.)+$/.test(f))return
    var a=fs.readFileSync(df,'utf8').split('\n'),i=0
    while(i<a.length){
      var s=a[i++],m
      while(i<a.length&&(m=a[i].match(/^ *(?:#|⍝|\/\/) *\.\.\.(.*)$/))){s+='\n'+m[1];i++}
      if(m=s.match(/^ *(?:#|⍝|\/\/) ([^]*)(←→|!!!)([^]+)$/))t.push([trim(m[1]),trim(m[2]),trim(m[3])])
    }
  })
}
visit(__dirname+'/../src')
process.stdout.write('[\n'+t.map(JSON.stringify).join(',\n')+'\n]\n')
