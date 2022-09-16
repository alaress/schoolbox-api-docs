# Schoolbox API Reference

## Getting Started

### Install

1. Install [Node.js](https://nodejs.org/).
2. Clone this repo and run `npm ci` in the repo root.

### Usage

#### To start a test server 2 steps
`cd docs && python3 -m http.server`
`http://127.0.0.1:8000/?debug`
Starts the reference docs preview server.
and in a second terminal run `npm run build-static` after making changes to the code

#### `npm run build`
#### `npm run build-static`
Bundles the definition to `docs/dist.yaml`.

#### `npm test`
Validates the definition.

## Contribution Guide

### Updating the API

When updating the API, do the following before creating a pull request:
* increment the version number in both `openapi/openapi.yaml` and `package.json`
  according to [Semantic Versioning](https://semver.org/#summary):
  * increment the major version when making a backwards-incompatible functional
    change (e.g. removing a property from a response or request body)
  * increment the minor version when making a backwards-compatible functional
    change (e.g. adding a property to a response or request body)
  * increment the patch version when making a non-functional change
    (e.g. fixing a spelling or grammar mistake)
* update `openapi/openapi.yaml` path `info.description` with the Schoolbox
  version which this version of the API applies for
* run `npm run build-static`, and commit the resultant changes to
  `docs/index.html`

### Configuration

Design and layout options are configurable using attributes within the `rapi-doc` tag in `/docs/index.html`

More information is available at https://rapidocweb.com/api.html


### Paths

#### Adding a Path

1. Navigate to the [`openapi/paths`](openapi/paths) folder.
2. Add a new YAML file named like your URL endpoint, except replacing
   `/` with `@` and putting path parameters into curly braces like `{example}`.
3. Add the path and a `$ref` to it inside of your
   [`openapi/openapi.yaml`](openapi/openapi.yaml) file.
4. Define the parameters, request bodies, responses and schemas that the path
   uses.
  * To begin with, it is fine to define these things in the path itself; as your
    path begins to use more components in common with other paths, you may wish
    to extract the common components to the
    [`openapi/components/`](openapi/components) sub-folders.
    See [`openapi/components/README.md`](openapi/components/README.md) for more
    information.
