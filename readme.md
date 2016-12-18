**[Demo](https://ngn.github.com/apl/web/index.html)**<br>

An [APL](https://en.wikipedia.org/wiki/APL_%28programming_language%29) interpreter written in JavaScript.
Runs in a browser or on [NodeJS](https://nodejs.org/).

Supports: most primitives, dfns (`{⍺ ⍵}`), nested arrays, complex numbers (`1j2`), infinities (`¯` or `∞`), forks and
atops, strand assignment (`(a b)←c`), indexed assignment (`a[b]←c`), user-defined operators (`{⍺⍺ ⍵⍵}`)

Doesn't support: traditional functions (`∇R←X f Y`), non-zero index origin (`⎕IO`), comparison tolerance (`⎕CT`),
prototypes, NaN-s, modified assignment (`x+←1`), control structures (`:If`), object-oriented features, namespaces

Used in [Paul L Jackson's web site](https://plj541.github.io/APL.js/) and [repl.it](https://repl.it/languages/APL)

#Offline usage

Download [apl.js](https://ngn.github.io/apl/apl.js) and run it with [NodeJS](https://nodejs.org/) to start a session:

    node apl.js

Running it with an argument executes an APL script:

    node apl.js filename.apl

`apl.js` can be `require()`d as a CommonJS module from JavaScript:

    var apl=require('./apl')
    console.log(apl('1 2 3+4 5 6').toString())

or used in an HTML page:

    <script src="https://ngn.github.io/apl/apl.js"></script>
    <script>
      var result=apl('1 2 3+4 5 6') //apl() is exported as a global variable
    </script>

#Editor support

* [Vim keymap and syntax](https://github.com/ngn/vim-apl)
* [baruchel/vim-notebook](https://github.com/baruchel/vim-notebook): evaluate blocks of APL code in a vim buffer
