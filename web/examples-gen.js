#!/usr/bin/env node
// Collect data from ../examples and generate examples.js for inclusion into index.html
var fs=require('fs')
fs.writeFileSync(__dirname+'/examples.js',
  '//generated code, do not edit\nvar examples=[\n'+
  fs.readdirSync(__dirname+'/../examples')
    .sort()
    .filter(function(f){return/^\w.+\.apl$/.test(f)})
    .map(function(f){
      return'  '+JSON.stringify([
        f.replace(/^\d+-|\.apl$/g,''),
        fs.readFileSync(__dirname+'/../examples/'+f,'utf8')
          .replace(/^#!.*\n+|\n+$/g,'')
          .replace(/\n* *⎕ *← *(.*)$/,'\n$1')
      ])
    })
    .join(',\n')+'\n];\n'
)
