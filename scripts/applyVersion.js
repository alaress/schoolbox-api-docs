#!/usr/bin/env node
const fs = require("fs");

// Validate there's an input file and a version provided
if (process.argv.length < 4) {
    console.error("No input file and version provided: exiting");
    process.exit(1);
}

function main () {
    // Search for $VERSION, and replace it with the actual version
    const buildVersion = process.argv[2],
          apiFile      = process.argv[3];
    let   apiFileContents = fs.readFileSync(apiFile).toString();
    apiFileContents = apiFileContents.replace(/\$VERSION/g, buildVersion);
    fs.writeFileSync(apiFile, apiFileContents);
}
main();
