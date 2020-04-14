# e164.js [![Build Status](https://travis-ci.org/pdeschen/e164.js.png?branch=master)](https://travis-ci.org/pdeschen/e164.js)

e164.js is a browser friendly [node](http://nodejs.org) module to lookup country name
based on given international phone number complying to [E.164](http://en.wikipedia.org/wiki/E.164) format.

## How it works

e164.js doesn't check whether the phone number is a valid one or not. It simply returns the associated country based on prefix matching.
The matcher starts from the last digit and revert lookup until a number matches from the lookup hash.

If a number can't be found from the lookup hash, number is assumed to be invalid and returns undefined.

If you're into formating, parsing or validation of any sort, checkout [Google's own](https://code.google.com/p/libphonenumber/).

## Updating numberset

This module has been forked and modified by the addition of `convert_napm.js`. It works by using the npa_report.csv and generating a new set of data, then overriding the north american numbers already in the dataset. Along with additional rules for Remind (aka, seperating Peurto Rico from "US" country code and others that, unfortunately, involve extra fee's).

We have since included these controlled territories as "US".

You can download the latest CSV at the [North American Number Plan Adminstrator Site](https://nationalnanpa.com/reports/reports_npa.html) - Click on "NPA Database" for the current CSV. Replace `npa_report.csv` in the project directory and run
`./convert_napn.js`

If everything goes well then pump the version and upload back to github. At Remind we need to update https://github.com/remind101/e164.rb based off this project.

Then update the following projects: r101-postoffice, r101-vacuum, r101-api, and r101-whitepages in order to successfully update our infrastructure together (and they must be done together).

## Examples

### Node

Directly from test/test.js

    var e164 = require('../e164'), assert = require('assert');

    assert.deepEqual({country: "Canada", code: "CA"}, e164.lookup('15141234567'));
    assert.deepEqual({country: "Toll Free", code: "US"}, e164.lookup('18001231234'));
    assert.deepEqual({country: "United States", code: "US"}, e164.lookup('18703434345'));
    assert.deepEqual({country: "India", code: "IN"}, e164.lookup('9191'));
    assert.deepEqual({country: "Norfolk Island", code: "NF"}, e164.lookup('672322424'));
    assert.deepEqual({country: "ICO Global (Mobile Satellite Service)", code: "ZZ"}, e164.lookup('88112311'));
    assert.deepEqual({country: "Canada", code: "CA"}, e164.lookup('1418'));
    assert.deepEqual(undefined, e164.lookup('0'));

### Browser

Almost directly from test/index.html

    <script src="min/e164.js"></script>
    <!--
    <script src="e164.js"></script>
    -->
    <script>
      console.log(e164.lookup('15145551234'));
    </script>

## ChangeLog

### 0.0.5

- Added ISO country codes [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

### 0.0.2

- Initial release

## Installation

### Git Clone

> \$ git clone git://github.com/pdeschen/e164.js.git

### Install from npm

> \$ sudo npm install e164 [-g]

## Todo

- Support for dial out [calling prefix](http://en.wikipedia.org/wiki/International_call_prefix) could be offered directly or through options hash
- `reverse` lookup method returning a list of numbers prefixes for given country.
- `validate(number, country)` method returning true/false whether given number fits in given country.

## Contributors

- Chris Sugden (https://github.com/csugden)
- Dave Lyons (https://github.com/dalyons)

## License

(The MIT License)

Copyright 2012 Pascal Deschenes (pdeschen @ gmail . com) . All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
