# e164.js

e164.js is a browser friendly [node](http://nodejs.org) module to lookup country name based on given international phone number complying to
[E.164](http://en.wikipedia.org/wiki/E.164) format. 

## How it works

e162.js doesn`t check whether the phone number is a valid one or not. It simply returns the associated country based on prefix matching. The matcher starts from the last digit and revert lookup until a number matches from the lookup hash.

If a number can`t be found from the lookup hash, number is assumed to be invalid and returns undefined.

## Examples

### Node

Directly from test/test.js

    var e164 = require('e164'), assert = require('assert');

    assert.equal("Canada", e164.lookup('15141234567'));
    assert.equal("Toll Free", e164.lookup('18001231234'));
    assert.equal("United State", e164.lookup('18703434345'));
    assert.equal("India", e164.lookup('9191'));
    assert.equal("Norfolk Island", e164.lookup('672322424'));
    assert.equal("ICO Global (Mobile Satellite Service)", e164.lookup('88112311'));
    assert.equal("Canada", e164.lookup('1418'));
    assert.equal(undefined, e164.lookup('0'));

### Browser

Almost directly from test/index.html

    <script src="e164.min.js"></script>
    <!--
    <script src="e164.js"></script>
    -->
    <script>
      console.log(e164.lookup('15145551234'));
    </script>

## ChangeLog

### 0.0.2

* Initial release

## Installation

### Git Clone

> $ git clone git://github.com/pdeschen/e164.js.git

### Install from npm

> $ sudo npm install e164 [-g]

## Todo

* return object of the form {country: "", code: ""}

## License

(The MIT License)

Copyright 2012 Pascal Deschenes (pdeschen @ gmail . com) . All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
