# Schoolbox API Reference

## Getting Started

### Install

1. Install [Node.js](https://nodejs.org/).
2. Clone this repo and run `npm ci` in the repo root.

### Usage

#### Variants

There are currently two variants of the API reference:

##### Single version

The single-version variant supports only the most recently built version of the 
API reference.

This version is the current default, but will eventually be superseded by the
multiple version variant described below.

##### Multiple version

The multi-version variant supports the most recently built version of the API
reference, and also allows selection of:
* previous versions
* pre-release versions

#### Previewing API docs locally

Start the reference docs preview server in the `docs` folder:
```bash
cd docs;
python3 -m http.server;
```

Then, visit http://127.0.0.1:8000/?debug (for the old single-version docs) or
http://127.0.0.1:8000/new.html?debug (for the new multi-version docs).

In order to view changes to the docs, run one of the "Building API docs locally"
steps provided below:

#### Building API docs locally

##### `npm run build-new --build-version=$buildVersion [--selected]`
Bundles the current definition to `docs/builds/$buildVersion.yaml`, and also
creates a dropdown option for this build so that it may be selected.

`$buildVersion` is expected to match the Schoolbox version to which the current
definition applies.

If `--selected` is passed, this build will be selected in the dropdown by
default: otherwise, the default selected build will not be changed.

##### `npm test`
Validates the definition.

## Contribution Guide

### Updating the API

When updating the API, do the following before creating a pull request:
* run `npm run build`
* commit the resultant changes to `docs/dist.yaml`

If building documentation for a new Schoolbox version:
* run `npm run build-new` for the new version
  * if the new version is not a beta: provide the `--selected` flag
* commit the changes to the builds list file `docs/builds.json`
* commit the new YAML file in `docs/builds`

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
