#!/usr/bin/env node
import { bundle, loadConfig } from '@redocly/openapi-core';

// Validate there's a version number
if (process.argv.length < 3) {
    console.error("No version number provided: exiting");
    process.exit(1);
}

// Build this version
const version = process.argv[2],
      cwd     = process.cwd();

console.log("Current directory:", process.cwd());

async function build(version) {
    const pathToApi = cwd + `/docs/dist.yaml`;
    const config    = await loadConfig(cwd + '/.redocly.yaml');
    const { b, problems } = await bundle({ ref: pathToApi, config });
    console.log(b);
}
build(version)
    .then(r => console.log(r))
    .catch(r => console.log(r))
;

// run redocly bundle -o $1
// add a new item to a JSON file somewhere
