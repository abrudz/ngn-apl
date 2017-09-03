//usr/bin/env node "$0" $@;exit $?
'use strict'
const repr=JSON.stringify
,collectTests=s=>{
  let t=[],m,p=0
  while(m=s.slice(p).match(/(?:⍝|\/\/ |⍙)([^\n⍙]*)(←→|!!)([^\n⍙]+)/m))
   {t.push([m[1].trim(),m[2].trim(),m[3].trim()]);p+=m.index+m[0].length}
  return t
}
,runDocTest=(cme,exec,aprx)=>{
  let[s,m,exp]=cme,x,y // s:code, m:mode, exp:expectation
  if(m==='←→'){
    try{y=exec(exp)}catch(e){return{e,m:'cannot compute expected value '+repr(exp)}}
    try{x=exec(s);if(!aprx(x,y))return{m:'expected '+repr(y)+' but got '+repr(x)}}catch(e){return{e}}
  }else{
    try{exec(s);return{m:"should have thrown but didn't"}}catch(e){
      if(exp&&e.name.slice(0,exp.length)!==exp)return{e,m:'expected '+repr(exp)+' but got '+repr(e.message)}
    }
  }
}
if(typeof require!=='undefined'&&typeof module!=='undefined'&&module===require.main){
  const t=collectTests(require('fs').readFileSync(__dirname+'/apl.js','utf8'))
  const apl=require('./apl'),so=process.stdout,t0=Date.now()
  let ne=0,nf=0,ts=0 //ne/nf:number of executed/failed tests, ts:last test timestamp
  for(let i=0;i<t.length;i++){
    ne++;let[s,m,exp]=t[i],o=runDocTest(t[i],apl,apl.aprx) //o:error outcome
    if(o){nf++;so.write('Test failed: '+repr(s)+'\n             '+repr(exp)+'\n')
          o.m&&so.write(o.m+'\n');o.e&&so.write(o.e.stack+'\n')}
    if(Date.now()-ts>100){so.write(ne+'/'+t.length+(nf?' ('+nf+' failed)':'')+'\r');ts=Date.now()}
  }
  so.write((nf?nf+'/'+ne+' tests failed':ne+' tests passed')+' in '+(Date.now()-t0)+' ms\n')
  process.exit(+!!nf)
}
