addVocabulary({
  // 1760 3 12⊤75    ←→ 2 0 3
  // 3 12⊤75         ←→ 0 3
  // 100000 12⊤75    ←→ 6 3
  // 16 16 16 16⊤100 ←→ 0 0 6 4
  // 1760 3 12⊤75.3  ←→ 2 0(75.3-72)
  // 0 1⊤75.3        ←→ 75(75.3-75)
  //
  // 2 2 2 2 2⊤1 2 3 4 5 ←→ (5 5⍴0 0 0 0 0
  // ...                         0 0 0 0 0
  // ...                         0 0 0 1 1
  // ...                         0 1 1 0 0
  // ...                         1 0 1 0 1)
  //
  // 10⊤5 15 125 ←→ 5 5 5
  // 0 10⊤5 15 125 ←→ 2 3⍴0 1 12 5 5 5
  //
  // (8 3⍴2 0 0
  // ...  2 0 0
  // ...  2 0 0
  // ...  2 0 0
  // ...  2 8 0
  // ...  2 8 0
  // ...  2 8 16
  // ...  2 8 16)⊤75
  // ... ←→ (8 3⍴0 0 0
  // ...         1 0 0
  // ...         0 0 0
  // ...         0 0 0
  // ...         1 0 0
  // ...         0 1 0
  // ...         1 1 4
  // ...         1 3 11)
  // 0j1 2j3 4j5⊤6j7 ←→ 0 ¯2j2 2j2
  '⊤':function(om,al){
    assert(al)
    var a=al.toArray(),b=om.toArray(),shape=al.shape.concat(om.shape),data=Array(prod(shape))
    var n=al.shape.length?al.shape[0]:1,m=a.length/n
    for(var i=0;i<m;i++)for(var j=0;j<b.length;j++){
      var y=typeof b[j]==='number'?Math.abs(b[j]):b[j]
      for(var k=n-1;k>=0;k--){
        var x=a[k*m+i]
        data[(k*m+i)*b.length+j]=iszero(x)?y:Z.residue(x,y)
        y=iszero(x)?0:Z.divide(Z.subtract(y,Z.residue(x,y)),x)
      }
    }
    return new A(data,shape)
  }
})
