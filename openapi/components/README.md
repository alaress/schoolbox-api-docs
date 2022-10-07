Reusable components
===========

* You can create the following folders here:
  - `schemas` - reusable [Schema Objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#schemaObject)
  - `responses` - reusable [Response Objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#responseObject)
  - `parameters` - reusable [Parameter Objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#parameterObject)
  - `examples` - reusable [Example Objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#exampleObject)
  - `headers` - reusable [Header Objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#headerObject)
  - `requestBodies` - reusable [Request Body Objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#requestBodyObject)
  - `links` - reusable [Link Objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#linkObject)
  - `callbacks` - reusable [Callback Objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#callbackObject)
  - `securitySchemes` - reusable [Security Scheme Objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#securitySchemeObject)
* Filename of files inside the folders represent the object name, e.g. `customer.yaml`


## Organization schemes

### No sub-folders underneath component folders

Component folders do not have sub-folders.

This restriction exists because the OpenAPI CLI considers files with the same
basename as the same file, and thus incorrectly builds the distributable OpenAPI
spec, even though its composite files are in different folders.

To get around this, I've adopted a loose naming convention:
* Components which are likely to be reused across multiple contexts have the
  name `$objectName.yaml` (camel-cased)
  * e.g. the schema for the ID of an object is [`schemas/id.yaml`](schemas/id.yaml)
* Components which are specific to a particular context have the name
  `$context-$objectName.yaml`
  * e.g. the parameter for a discussion thread's context ID is
   [`parameters/discussion-contextId.yaml`](parameters/discussion-contextId.yaml)


### Items and lists of items

Endpoints will generally operate either on singular items, or lists of items.

I've found it beneficial to create:
* Response objects for lists and items
  * These will be named `$objectName-item.yaml`, `$objectName-list.yaml`: e.g.
    [`responses/user-item.yaml`](responses/user-item.yaml),
    [`responses/user-list.yaml`](responses/user-list.yaml)
    * These objects will reference a read-only variant of the object in their
      schema
* Request body objects for items, and lists if any paths support them
  * As with response objects, these will be named `$objectName-item.yaml`,
    `$objectName-list.yaml`: e.g.
    [`requestBodies/user-item.yaml`](requestBodies/user-item.yaml)


### Read and write variants of items

Items may have fields which are suitable for reading only (they will be returned
in a response, but ignored or fatal when passed in the corresponding request
body),
or for writing only (they will never be returned in a response, but may be
passed in the corresponding request body).

Also, items may have a read-only and write-only variant of the same field. It is
common for a response to include an item with a fully-populated related item
(i.e. a user's role will be retrieved, and be populated with its ID, name and
type), but the corresponding request body will only accept the ID.

This distinction exists so that the API implies that the related item cannot
be updated via a request to update or create the base item.

* Fields that are common to the read and write variants will be in
  `schemas/$objectName-fields.yaml`
* Fields for the read variant will be in `schemas/$objectName-readableFields.yaml`
* Fields for the write variant will be in `schemas/$objectName-writableFields.yaml`
* The actual read and write variants are in `schemas/$objectName-{read,write}.yaml`
  * Their actual definition will reference the read/write only fields, and then
    the common fields; e.g. [`schemas/user-read.yaml`](schemas/user-read.yaml)
