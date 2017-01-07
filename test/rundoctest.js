#!/usr/bin/env node
this.runDocTest=function(cme,exec,approx){
  var code=cme[0],mode=cme[1],expectation=cme[2],x,y
  if(mode==='←→'){
    try{
      y=exec(expectation)
    }catch(e){
      return{success:0,error:e,reason:'Cannot compute expected value '+JSON.stringify(expectation)}
    }
    try{
      x=exec(code)
      if(!approx(x,y))return{success:0,reason:'Expected '+JSON.stringify(y)+' but got '+JSON.stringify(x)}
    }catch(e){
      return{success:0,error:e}
    }
  }else if(mode==='!!!'){
    try{
      exec(code)
      return{success:0,reason:"It should have thrown an error, but it didn't."}
    }catch(e){
      if(expectation&&e.name.slice(0,expectation.length)!==expectation){
        return{success:0,error:e,
               reason:'It should have failed with '+JSON.stringify(expectation)+
                      ', but it failed with '+JSON.stringify(e.message)}
      }
    }
  }else{
    return{success:0,reason:'Unrecognised expectation: '+JSON.stringify(expectation)}
  }
  return{success:1}
}
