#!/usr/bin/env node
const fs     = require("fs"),
      semver = require('semver');

// Validate there's a version number
if (process.argv.length < 3) {
    console.error("No version number provided: exiting");
    process.exit(1);
}

// Add a line to builds.json
function main () {
    const buildVersion  = process.argv[2],
          buildSelected = Boolean(process.argv[3] || false),
          buildsFile    =  __dirname + `/../docs/builds.json`;
    let buildsFileContents;
    try {
        buildsFileContents = fs.readFileSync(buildsFile).toString();
    } catch (e) {
        buildsFileContents = '[]';
    }

    let buildsData           = JSON.parse(buildsFileContents),
        thisBuildData        = {label: buildVersion, value: buildVersion};

    // Deselect all existing builds if the current is selected
    if (buildSelected) {
        buildsData = buildsData.map(function (v) {delete v.selected; return v;})
        thisBuildData.selected = true;
    }
    buildsData.unshift(thisBuildData);

    // Remove duplicates
    let addedBuilds = [];
    buildsData = buildsData.filter(function (v) {
        if (addedBuilds.indexOf(v.value) >= 0) {
            return false;
        }
        addedBuilds.push(v.value);
        return true;
    });

    // Sort by semver descending
    buildsData.sort((a, b) => semver.rcompare(a.value, b.value, true));

    // Write
    fs.writeFileSync(buildsFile, JSON.stringify(buildsData, null, 2));
}
main();
