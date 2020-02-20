const assert = require("assert");

// things we ignore because they have changed or they shouldn't be used
const IGNORE_NUMBERS = {
  "1579": true, // this was misabled in the old data set, it's actualy canadian
  "1456": true, // this was removed in 2017
  "1500": true, // paid number, new data says not in use.
  "1533": true, // also a non-geo service area code
  "1544": true, // also a non-geo service area code
  "1566": true, // also a non-geo service area code
  "1577": true, // also a non-geo service area code
  "1700": true, // also a non-geo service area code
  "1800": true, // toll free...
  "1844": true, // also toll free
  "1855": true, // also toll free
  "1866": true, // also toll free
  "1877": true, // also toll free
  "1888": true, // also toll free
  "1900": true, // we dont actually want pay lines
  "1911": true // we should never hit emergency services
};

const isNotIgnoreNumber = num => {
  return num in IGNORE_NUMBERS === false;
};

module.exports = function tester(original_e164, new_e164) {
  // assert that nothing in new_e164 contradicts anything in original_e164

  console.log(
    "testing new entries comply with old entries, ignoring anything that didn't already exist"
  );
  for (let [number, country] of Object.entries(new_e164)) {
    const originalCountry = original_e164[number];
    if (originalCountry && isNotIgnoreNumber(number)) {
      assert.deepEqual(
        originalCountry,
        country,
        `new entry didnt match old entry:number: ${number} new - ${country}  old - ${originalCountry}`
      );
    }
  }

  console.log("verifying that all old numbers are represented in new data set");

  for (let [number, country] of Object.entries(original_e164)) {
    const newCountry = new_e164[number];
    if (isNotIgnoreNumber(number)) {
      assert.deepEqual(
        newCountry,
        country,
        `new entry didnt match old entry:number: ${number} new - ${newCountry}  old - ${country}`
      );
    }
  }
};
