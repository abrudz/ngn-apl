#!/usr/bin/env apl

⍝ Sierpinski's triangle
f←{(⍵,(⍴⍵)⍴0)⍪⍵,⍵}
S←{' #'[(f⍣⍵)1 1⍴1]}
⎕←S 5
