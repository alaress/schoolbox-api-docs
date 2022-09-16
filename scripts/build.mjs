#!/usr/bin/env node
import { bundle, loadConfig } from '@redocly/openapi-core';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Validate there's a version number
if (process.argv.length < 3) {
    console.error("No version number provided: exiting");
    process.exit(1);
}

// Wrangling to get dirname and filename in module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Build this version
const version = process.argv[2];

async function build(version) {
    const pathToApi = __dirname + `/../docs/dist.yaml`;
    const config    = await loadConfig(__dirname + '/../.redocly.yaml');
    const { b, problems } = await bundle({ ref: pathToApi, config });
}
build(version)
    .then(r => console.log(r))
    .catch(r => console.log(r))
;

// run redocly bundle -o $1
// add a new item to a JSON file somewhere
