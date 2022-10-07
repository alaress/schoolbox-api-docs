Paths
=====

Organize your path definitions within this folder. You will reference your paths from your main `openapi.yaml` entrypoint file.

We have adopted these conventions:

* path separator token (`@`) or subfolders
* path parameter (e.g. `{example}`)
  * note that paths are in 
* each path in a separate file, instead of each operation in a separate file

## Each path in a separate file

Use the predefined "path separator" and keep all of your path files in the top 
level of the `paths` folder.

```
user.yaml      # /user paths, i.e. GET to search for users, POST to create user 
user@{id}.yaml # /user/{id} paths, i.e. PUT to update, DELETE to delete
```

#### Motivations

* Quickly see a list of all paths.  Many people think in terms of the "number" of "endpoints" (paths), and not the "number" of "operations" (paths * http methods).

* Only the "file-per-path" option is semantically correct with the OpenAPI Specification 3.0.2.  However, Redocly's openapi-cli will build valid bundles for any of the other options too.


#### Drawbacks

* This may require multiple definitions per http method within a single file.
* It requires settling on a path separator (that is allowed to be used in filenames) and sticking to that convention.
