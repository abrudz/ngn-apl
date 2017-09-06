//usr/bin/env node "$0" $@;exit $?
'use strict'
const S=JSON.stringify
,collectTests=s=>s.split('\n').filter(x=>x)
                  .map(x=>{let m=x.match(/^(.+)(←→|!!)(.*)$/);return[m[1].trim(),m[2].trim(),m[3].trim()]})
,runDocTest=([s,m,exp],exec,aprx)=>{ // s:code, m:mode, exp:expectation
  let x,y
  if(m==='←→'){
    try{y=exec(exp)}catch(e){return{e,m:'cannot compute expected value '+S(exp)}}
    try{x=exec(s);if(!aprx(x,y))return{m:' actual:   '+S(x)+'\n expected: '+S(y)}}catch(e){return{e}}
  }else{
    try{exec(s);return{m:"should have thrown but didn't"}}catch(e){
      if(exp&&e.name.slice(0,exp.length)!==exp)return{e,m:' actual:   '+S(e.name)+'\n expected: '+S(exp)}
    }
  }
}
if(typeof require!=='undefined'&&typeof module!=='undefined'&&module===require.main){
  const t=collectTests(require('fs').readFileSync(__dirname+'/t.apl','utf8'))
  const apl=require('./apl'),so=process.stdout,t0=Date.now()
  let ne=0,nf=0,ts=0 //ne/nf:number of executed/failed tests, ts:last test timestamp
  for(let i=0;i<t.length;i++){
    ne++;let[s,m,exp]=t[i],o=runDocTest(t[i],apl,apl.aprx) //o:error outcome
    if(o){nf++;so.write('failed: '+s+m+exp+'\n');o.m&&so.write(o.m+'\n');o.e&&so.write(o.e.stack+'\n')}
    if(Date.now()-ts>100){so.write(ne+'/'+t.length+(nf?' ('+nf+' failed)':'')+'\r');ts=Date.now()}
  }
  so.write((nf?nf+'/'+ne+' tests failed':ne+' tests passed')+' in '+(Date.now()-t0)+' ms\n')
  process.exit(+!!nf)
}
