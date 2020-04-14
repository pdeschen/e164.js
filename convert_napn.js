const neatCsv = require("neat-csv");
const csvlint = require("csvlint")();
const _ = require("lodash");

const fs = require("fs");

// these are the country strings we expect for countries in the NAPN dataset
const COUNTRY_TO_EXPECTED_FORMAT = {
  US: ["US", "United States"],
  CANADA: ["CA", "Canada"],
  BAHAMAS: ["BS", "Bahamas"],
  ANGUILLA: ["AI", "Anguilla"],
  "ANTIGUA/BARBUDA": ["AG", "Antigua and Barbuda"],
  "BRITISH VIRGIN ISLANDS": ["VG", "British Virgin Islands"],
  "CAYMAN ISLANDS": ["KY", "Cayman Islands"],
  DOMINICA: ["DM", "Dominica"],
  "DOMINICAN REPUBLIC": ["DO", "Dominican Republic"],
  GRENADA: ["GD", "Grenada"],
  JAMAICA: ["JM", "Jamaica"],
  MONTSERRAT: ["MS", "Montserrat"],
  "SINT MAARTEN": ["SX", "Sint Maarten (Dutch)"],
  "ST. KITTS AND NEVIS": ["KN", "Saint Kitts and Nevis"],
  "ST. LUCIA": ["LC", "Saint Lucia"],
  "ST. VINCENT & GRENADINES": ["VC", "Saint Vincent and the Grenadines"],
  "TRINIDAD AND TOBAGO": ["TT", "Trinidad and Tobago"],
  "TURKS & CAICOS ISLANDS": ["TC", "Turks and Caicos Islands"],
  BARBADOS: ["BB", "Barbados"],
  BERMUDA: ["BM", "Bermuda"],
  "BRITISH VIRGIN ISLANDS": ["VG", "British Virgin Islands"],
};

// Making sure that we report these as inside the US so we can use them as valid numbers.  Everything that isn't "US" or "CA" is excluded from being contactable.
const LOCATION_OVERRIDE = {
  "PUERTO RICO": ["US", "Puerto Rico"],
  USVI: ["US", "Virgin Islands, US"],
  GU: ["US", "Guam"],
  AS: ["US", "American Samoa"],
  CNMI: ["US", "Northern Mariana Islands"],
};

console.log("reading CSV file");
const npaData = fs.readFileSync("./npa_report.csv");

console.log("checking and fixing headers");
const npaDataString = npaData.toString();
// get the headers, then count how many there are based on number of ','
const firstEndLine = npaDataString.indexOf("\n");
const csvHeaders = npaDataString.slice(0, firstEndLine);
const csvBody = npaDataString.slice(firstEndLine + 1, npaDataString.length);

const numberOfHeaders = csvHeaders.split(",").length;

// we dont have enough headers for some of the incorrect data.. so lets fix it
const correctedHeaders =
  numberOfHeaders < 33 ? csvHeaders + ', "extra"\n' : csvHeaders + "\n";

console.log("attempting to parse CSV file");

neatCsv(correctedHeaders + csvBody).then((npaData) => {
  const created_table = npaData.reduce((prev, row) => {
    if (!_.isEmpty(row.COUNTRY)) {
      // here we have to mark some places like Puerto Rico as not a part of the US, solely because of charges via our sms service.
      if (LOCATION_OVERRIDE[row.LOCATION]) {
        prev[`1${row.NPA_ID}`] = LOCATION_OVERRIDE[row.LOCATION];
      } else {
        prev[`1${row.NPA_ID}`] = COUNTRY_TO_EXPECTED_FORMAT[row.COUNTRY];
      }
    }

    return prev;
  }, {});

  console.log("reading and parsing world e164 numbers from e164-world.json");

  const e164World = JSON.parse(fs.readFileSync("e164-world.json"));

  const allNumbers = { ...created_table, ...e164World };

  // re sorting into the original format (1200 < 200)...
  const numberKeysArr = Object.keys(allNumbers).sort((key1, key2) => {
    for (let i = 0; i < key1.length; i++) {
      if (key1[i] !== key2[i]) {
        return key1[i] > key2[i] ? 1 : -1;
      }
    }
    return 0;
  });

  const numbersInOrderStr = numberKeysArr
    .map(
      (numberKey) => `"${numberKey}": ${JSON.stringify(allNumbers[numberKey])}`
    )
    .join();
  // inserting this directly into the e164.js file using regex, so not really json
  const npaJson = "\n" + numbersInOrderStr + "\n";

  // this finds(and inserts) all the places we should put endlines to have it formated like the js file
  const formatedJSON = npaJson.replace(
    /(?:{)|(?:\"\d*\")|(?:],)|(?:})/g,
    (substrmatch) => {
      if (substrmatch[0] === '"') {
        return `\t${substrmatch}`;
      }
      return `${substrmatch}\n`;
    }
  );

  console.log("reading e164.js");

  const e164File = fs.readFileSync("e164.js").toString();

  // regex to replace phone number data in the js file
  const e164FileReplaceStr = e164File.replace(
    /(var lookup, prefixes = {)(.*?)(};)/gms,
    `$1${formatedJSON}$3`
  );
  console.log("writing e164-new.js for testing purposes");
  fs.writeFileSync("./e164-new.js", e164FileReplaceStr);

  console.log("requireing files and running validation tests");

  const e164 = require("./e164");
  const e164New = require("./e164-new");

  const tester = require("./test/newDataValidator");

  try {
    tester(e164.prefixes, e164New.prefixes);
  } catch (err) {
    console.log("TESTING FAILED ON NEW e164");
    console.log(err);
    return -1;
  }

  console.log("testing succeeded, overwriting e164.js");
  fs.writeFileSync("./e164.js", e164FileReplaceStr);

  console.log("overwrite complete, cleaning up files");
  fs.unlinkSync("./e164-new.js");
  console.log(
    "upgrade completed.  Please run:\n./node_modules/.bin/gulp compress\n\nThen update version in package.json and push to github."
  );
});
