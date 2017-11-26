;(_=>{
const a=document.body.querySelectorAll('[id]'),I={};for(let i=0;i<a.length;i++)I[a[i].id]=a[i]
const hp={} // hash params
if(location.hash){const a=location.hash.substring(1).split(',');for(let i=0;i<a.length;i++){const[k,v]=a[i].split('=')
                  hp[k]=unescape(v)}}
I.code.value=hp.code||'';I.code.focus()
I.perm.onmouseover=I.perm.onfocus=_=>{I.perm.href='#code='+escape(I.code.value);return!1}
I.go.onclick=_=>{
  try{const s=I.code.value;I.rslt.classList.remove('err')
      if(s===')t'){I.rslt.textContent='Running tests...\n';setTimeout(runDocTests,1)}
      else{I.rslt.textContent=apl.fmt(apl(s)).join('\n')+'\n'}}
  catch(e){console&&console.error&&console.error(e.stack);I.rslt.classList.add('err');I.rslt.textContent=e}
  return!1
}
hp.run&&I.go.click()
I.code.focus()
let bqm=0
I.code.onkeydown=x=>{
  const k=x.ctrlKey+2*x.shiftKey+4*x.altKey+8*x.metaKey+100*x.which
  if(bqm){
    const e=I.code,i=e.selectionStart,v=e.value,c=bqc[x.key]
    if(x.which>31){bqm=0;e.classList.remove('bq')}
    if(c){e.value=v.slice(0,i)+c+v.slice(i);e.selectionStart=e.selectionEnd=i+1;return!1}
  }
  switch(k){
    case  1301:{I.go.click();return!1} // ctrl-enter
  }
}
const get=(x,f)=>{const r=new XMLHttpRequest;r.open('get',x)
                  r.onreadystatechange=x=>{r.readyState===4&&f(r.responseText)};r.send()}
,runDocTests=_=>{get('../t.apl',x=>{
  const t=collectTests(x)
  I.rslt.classList.remove('err');I.rslt.textContent=''
  let ne=0,nf=0,t0=+new Date // ne:number of executed, nf:number of failed
  for(let i=0;i<t.length;i++){
    ne++;let x=t[i],o=runDocTest(x,apl,apl.aprx)
    if(o){nf++;I.rslt.textContent+='Test failed: '+JSON.stringify(x[0])+'\n'+
                                   '             '+JSON.stringify(x[2])+'\n'+
                                   (o.m?o.m+'\n':'')+(o.e?o.e.stack+'\n':'')}
  }
  I.rslt.textContent+=(nf?nf+' out of '+ne+' tests failed':'All '+ne+' tests passed')+' in '+(new Date-t0)+' ms.\n'
})}
})();
