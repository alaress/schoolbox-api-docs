# Schoolbox API Reference

## Getting Started

### Install

1. Install [Node.js](https://nodejs.org/).
2. Clone this repo and run `npm ci` in the repo root.

### Usage

#### Previewing API docs locally

Build an example doc locally:
```bash
npm run build --build-version=0.0.1 --selected
```

Then, start the reference docs preview server in the `docs` folder:
```bash
python3 -m http.server --directory docs;
```

Then, visit http://127.0.0.1:8000/?debug.

Note the version selector at the top-left of the page, under the Schoolbox logo.  This allows selection of:
* previous versions
* pre-release versions

#### Building API docs locally

##### `npm run build --build-version=$buildVersion [--selected]`
Bundles the current definition to `docs/builds/$buildVersion.yaml`, and also
creates a dropdown option for this build so that it may be selected.
(The set of options is stored in `docs/builds.json`.)

`$buildVersion` is expected to match the Schoolbox version to which the current
definition applies.

If `--selected` is passed, this build will be selected in the dropdown by
default: otherwise, the default selected build will not be changed.

##### `npm run rebuild-builds-list`
Recreates `docs/builds.json` with the builds which already exist in
`docs/builds`.

##### `npm test`
Validates the definition.

## Contribution Guide

### Updating the document

See:
- [./openapi/README.md](./openapi/README.md) for a guide on updating the
  document
- [./openapi/paths/README.md](/openapi/paths/README.md) for a guide on adding
  paths to the API
- [./openapi/components/README.md](/openapi/components/README.md) for a guide on
  adding components to the API, for reuse within multiple paths

### Committing changes

If the change is a new feature or will be available in a future major release make your changes against the `develop` 
branch and create a pull request against `develop`.

If the change is a bug fix or will be available in a future minor release make your changes against the `master` 
branch and also create a pull request to merge the changes into the `develop` branch.

### Updating the API

Create a new release whose version number matches the Schoolbox version number
you wish to create a release for.

Releases may be created at
https://github.com/alaress/schoolbox-api-docs/releases.

#### Beta releases

- tag against develop
- include the beta number, e.g. 22.1.0-beta3
- check the pre-release checkbox

#### Stable releases

- tag against `master`
- do not include the beta number, e.g. 22.1.0
- leave the pre-release checkbox unchecked


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
