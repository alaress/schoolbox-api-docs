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

- tag against develop (for now: this may change to tag against master)
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


### Testing API responses using HTTP Client (in PHPStorm)

 * Create a new file with .http extension, then start with #Examples (top-right button that appears in PHPStorm).
 * https://www.jetbrains.com/help/phpstorm/http-client-in-product-code-editor.html
 * Example of working file using authorisation:
```
### Auth test (working)
### Bearer token found by following instructions at https://api.schoolbox.com.au
GET https://vagrant.dev.schoolbox.cloud/news/1
Accept: application/json
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ2YWdyYW50LmRldi5zY2hvb2xib3guY2xvdWQiLCJzdWIiOiJhbGFyZXNzIiwianRpIjoiYmQxNmE3NmYtZThjNS0xMWVkLWE4MWItMDQwMzAwMDAwMDAwIn0.MhWaeSX0VsotYZxLg5uIDsmziNsKiPl_KGsNFDsaxe_aSuP0Thlvtc_zxLJSqvbxSEqx4dJc-vN3Aw6vIy8-xx421gjnbmGcMj2F4tDiTD_9Nru_CvkzPtfE_gvwD_-bxlGudE0k8KaHNRCOIKv7x9aeyI36q2ILsMYl-kUAwZFh32FSideKIFb6XP6Mdut7LBDZljYLQptmwJRp2aL4Kf1hEYvutDFLSZLu1w5GmUS9fY1YVV8dr6H4ryJWO4L-HgzSyb_yiZFEzuINR-6Z-D1alYabcujwyWmNpMs5YA9B2J64iRveBKJEJ9PBW29i2bIT8j711RVJ8DzsKiCwcw
```
