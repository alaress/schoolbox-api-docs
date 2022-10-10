#!/usr/bin/env node
const fs     = require("fs"),
      path   = require('path'),
      semver = require('semver');

// Rebuild builds.json:
// set the selected build as the most recent non-beta
function main () {
    const buildsFile           =  __dirname + `/../docs/builds.json`,
          buildsFolder         =  __dirname + `/../docs/builds/`,
          buildsFolderContents = fs.readdirSync(buildsFolder);
    let buildsData = buildsFolderContents
        .filter(file => path.extname(file) === '.yaml')
        .map(function (file) {
            let buildVersion = path.basename(file, '.yaml');
            return {label: buildVersion, value: buildVersion};
        });

    // Sort by semver descending
    buildsData.sort((a, b) => semver.rcompare(a.value, b.value, true));

    // Set first non-beta build as the selected one
    let hasSelectedBuild = false;
    buildsData = buildsData.map(
        function (v) {
            delete v.selected;
            if (!hasSelectedBuild) {
                if (semver.prerelease(v.value, true) === null) {
                    hasSelectedBuild = true
                    v.selected       = true;
                }
            }
            return v;
        }
    );

    // Write
    fs.writeFileSync(buildsFile, JSON.stringify(buildsData, null, 2));
}
main();
