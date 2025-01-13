## The `openapi` folder

This folder contains your entrypoint `openapi.yaml`, which contains references
to the entire API definition.

Here are some sections within `openapi.yaml` to pay attention to:

* Description: will be rendered at the top of the docs.
* [Paths](paths/README.md): this defines each endpoint.
  A path can have one operation per http method.
* [Components](components/README.md): this defines the reusable parts which each
  path uses (e.g. headers, parameters, request bodies, responses, schemas).
* Tags: used for organising paths into sections.
  Each tag can have a description: this is used as a section description within
  the reference docs.
