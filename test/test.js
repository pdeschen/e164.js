/*jslint browser: true, regexp: true, nomen: true, indent:2, white:true, sloppy:true, debug:true */
/*global require*/
/* vim: set ft=javascript: */

var e164 = require('../e164'), assert = require('assert');

assert.equal("Canada", e164.lookup('15141234567'));
assert.equal("Toll Free", e164.lookup('18001231234'));
assert.equal("United States", e164.lookup('18703434345'));
assert.equal("India", e164.lookup('9191'));
assert.equal("Norfolk Island", e164.lookup('672322424'));
assert.equal("ICO Global (Mobile Satellite Service)", e164.lookup('88112311'));
assert.equal("Canada", e164.lookup('1418'));
assert.equal("United States", e164.lookup('1603'));
assert.equal("Malaysia", e164.lookup('603'));
assert.equal(undefined, e164.lookup('0'));

console.log("ok");
