# Schoolbox API Reference

## Getting Started

### Install

1. Install [Node JS](https://nodejs.org/).
2. Clone this repo and run `npm install` in the repo root.

### Usage

#### `npm start`
Starts the reference docs preview server.

#### `npm run build`
Bundles the definition to the dist folder.

#### `npm test`
Validates the definition.

#### `npm run build-static`
Bundles the definition to the dist folder, and bundles a zero-dependency HTML
version of the definition to `docs/index.html`.

## Contribution Guide

### Configuration

The `.redocly.yaml` controls settings for various
tools including the lint tool and the reference
docs engine.  Open it to find examples and 
[read the docs](https://docs.redoc.ly/cli/configuration/)
for more information.


### Paths

#### Adding a Path

1. Navigate to the `openapi/paths` folder.
2. Add a new YAML file named like your URL endpoint except replacing `/` with `@` and putting path parameters into curly braces like `{example}`.
3. Add the path and a `$ref` to it inside of your `openapi.yaml` file inside of the `openapi` folder.
4. Define the parameters, request bodies, responses and schemas that the path
   uses.
  * To begin with, it is fine to define these things in the path itself; as your
    path begins to use more components in common with other paths, you may wish
    to extract the common components to the `openapi/components/` sub-folders.
    See [`openapi/components/README.md`](openapi/components/README.md) for more
    information.
