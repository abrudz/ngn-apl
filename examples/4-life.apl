#!/usr/bin/env apl

⍝ Conway's game of life
⍝ This example was inspired by the impressive demo at
⍝ https://www.youtube.com/watch?v=a9xAKttWgP4

⍝ 0 1 1
⍝ 1 1 0
⍝ 0 1 0
c←(3 3⍴⍳9)∊1 2 3 4 7 ⍝ original creature from demo
c←(3 3⍴⍳9)∊1 3 6 7 8 ⍝ glider

b←¯1⊖¯2⌽5 7↑c ⍝ place the creature on a larger board, near the centre
life←{⊃1⍵∨.∧3 4=+/+⌿1 0¯1∘.⊖1 0¯1⌽¨⊂⍵} ⍝ function to compute next generation
gen←{' #'[(life⍣⍵)b]} ⍝ n-th generation as a character matrix
⎕←gen¨1+⍳3 ⍝ show first few generations
