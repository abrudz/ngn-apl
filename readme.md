**[Demo](https://n9n.gitlab.io/apl/web/index.html)**<br>

An [APL](https://en.wikipedia.org/wiki/APL_%28programming_language%29) interpreter written in JavaScript.
Runs in a browser or [NodeJS](https://nodejs.org/).

Supports: most primitives, dfns (`{⍺ ⍵}`), nested arrays, complex numbers (`1j2`), infinities (`¯` or `∞`), forks and
atops, strand assignment (`(a b)←c`), indexed assignment (`a[b]←c`), user-defined operators (`{⍺⍺ ⍵⍵}`).

Doesn't support: tradfns (`∇R←X f Y`), non-zero index origin (`⎕IO`), comparison tolerance (`⎕CT`),
prototypes, modified assignment (`x+←1`), control structures (`:If`), object-oriented features, namespaces.

Used in [Paul L Jackson's web site](https://plj541.github.io/APL.js/), [repl.it](https://repl.it/languages/APL),
and [tio.run](https://tio.run/#apl-ngn).

# Offline usage

Run `apl.js` with [Node](https://nodejs.org/) to start a REPL:

    node apl.js

An APL script can be given as argument:

    node apl.js filename.apl

`apl.js` can be `require()`d as a CommonJS module from JavaScript:

    var apl=require('./apl')
    var r=apl('1 2 3+4 5 6')

or used in an HTML page:

    <script src='apl.js'></script>
    <script>var r=apl('1 2 3+4 5 6')</script>

# Editor support

* [Vim keymap and syntax](https://gitlab.com/n9n/vim-apl)
* [baruchel/vim-notebook](https://github.com/baruchel/vim-notebook): evaluate blocks of APL code in a vim buffer
