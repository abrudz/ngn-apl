//usr/bin/env node "$0" $@;exit $?
'use strict'
const collectTests=s=>{
  let t=[],m,p=0
  while(m=s.slice(p).match(/(?:⍝|\/\/ |⍙)([^\n⍙]*)(←→|!!!)([^\n⍙]+)/m))
   {t.push([m[1].trim(),m[2].trim(),m[3].trim()]);p+=m.index+m[0].length}
  return t
}
const runDocTest=(cme,exec,aprx)=>{
  let code=cme[0],mode=cme[1],expectation=cme[2],x,y
  if(mode==='←→'){
    try{y=exec(expectation)}
    catch(e){return{error:e,reason:'Cannot compute expected value '+JSON.stringify(expectation)}}
    try{x=exec(code);if(!aprx(x,y))return{reason:'Expected '+JSON.stringify(y)+' but got '+JSON.stringify(x)}}
    catch(e){return{error:e}}
  }else if(mode==='!!!'){
    try{exec(code);return{reason:"It should have thrown an error, but it didn't."}}
    catch(e){
      if(expectation&&e.name.slice(0,expectation.length)!==expectation){
        return{error:e,reason:'It should have failed with '+JSON.stringify(expectation)+
                              ', but it failed with '+JSON.stringify(e.message)}
      }
    }
  }else{
    return{reason:'Unrecognised expectation: '+JSON.stringify(expectation)}
  }
}
if(typeof require!=='undefined'&&typeof module!=='undefined'&&module===require.main){
  const t=collectTests(require('fs').readFileSync(__dirname+'/apl.js','utf8'))
  const apl=require('./apl'),so=process.stdout,t0=Date.now()
  let ne=0,nf=0,ts=0 //ne/nf:number of executed/failed tests, ts:last test timestamp
  for(let i=0;i<t.length;i++){
    let test=t[i],code=test[0],mode=test[1],expectation=test[2]
    ne++;let o=runDocTest(test,apl,apl.aprx) //o:error outcome
    if(o){
      nf++;so.write('Test failed: '+JSON.stringify(code)+'\n             '+JSON.stringify(expectation)+'\n')
      o.reason&&so.write(o.reason+'\n');o.error&&so.write(o.error.stack+'\n')
    }
    if(Date.now()-ts>100){so.write(ne+'/'+t.length+(nf?' ('+nf+' failed)':'')+'\r');ts=Date.now()}
  }
  so.write((nf?nf+' out of '+ne+' tests failed':'All '+ne+' tests passed')+' in '+(Date.now()-t0)+' ms.\n')
  process.exit(+!!nf)
}
