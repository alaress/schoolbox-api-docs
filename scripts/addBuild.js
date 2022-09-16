#!/usr/bin/env node
const fs = require("fs");

// Validate there's a version number
if (process.argv.length < 3) {
    console.error("No version number provided: exiting");
    process.exit(1);
}

// Add a line to builds.json
function main () {
    const buildVersion       = process.argv[2],
          buildSelected      = Boolean(process.argv[3] ?? false),
          buildsFile         =  __dirname + `/../docs/builds.json`,
          buildsFileContents = fs.readFileSync(buildsFile).toString();
    let buildsData    = JSON.parse(buildsFileContents),
        thisBuildData = {label: buildVersion, value: buildVersion};

    // Deselect all existing builds if the current is selected
    if (buildSelected) {
        buildsData = buildsData.map(function (v) {delete v.selected; return v;})
        thisBuildData.selected = true;
    }
    buildsData.push({label: buildVersion, value: buildVersion});

    // Order the new list


    fs.writeFileSync(buildsFile, JSON.stringify(buildsData));
}
main();
