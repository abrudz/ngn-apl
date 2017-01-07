#!/usr/bin/env node
const apl=require('../lib/apl'),{runDocTest}=require('./rundoctest'),si=process.stdin,so=process.stdout
var s='';si.resume();si.setEncoding('utf8');si.on('data',x=>s+=x)
si.on('end',_=>{
  var tests=eval(s),ne=0,nf=0,ts=0,t0=Date.now() //ne/nf:number of executed/failed tests, ts:last test timestamp
  for(var i=0;i<tests.length;i++){
    var test=tests[i],code=test[0],mode=test[1],expectation=test[2]
    ne++;var o=runDocTest(test,apl,apl.approx) //o:outcome
    if(!o.success){
      nf++;so.write('Test failed: '+JSON.stringify(code)+'\n             '+JSON.stringify(expectation)+'\n')
      o.reason&&so.write(o.reason+'\n');o.error&&so.write(o.error.stack+'\n')
    }
    if(Date.now()-ts>100){so.write(ne+'/'+tests.length+(nf?' ('+nf+' failed)':'')+'\r');ts=Date.now()}
  }
  so.write((nf?nf+' out of '+ne+' tests failed':'All '+ne+' tests passed')+' in '+(Date.now()-t0)+' ms.\n')
  process.exit(+!!nf)
})
