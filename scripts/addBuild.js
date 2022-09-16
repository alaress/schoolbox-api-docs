#!/usr/bin/env node
const fs = require("fs");

// Validate there's a version number
if (process.argv.length < 3) {
    console.error("No version number provided: exiting");
    process.exit(1);
}

// Add a line to builds.json
function main () {
    const version          = process.argv[2],
        buildsFile         =  __dirname + `/../docs/builds.json`,
        buildsFileContents = fs.readFileSync(buildsFile).toString();
    let buildsData = JSON.parse(buildsFileContents);
    buildsData.push({label: version, value: version});
    fs.writeFileSync(buildsFile, JSON.stringify(buildsData));
}
main();
