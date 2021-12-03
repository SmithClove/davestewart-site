---
description: A 'pick and mix' library that simplifies writing Elasticsearch code
date: 2021-12-01
tags:
  - library
  - node
  - elasticsearch
github: davestewart/es-kit
media:
  thumbnail: ./images/es-kit.svg
  featured: ./images/es-kit.svg
---
# ES Kit

## Overview

ES Kit is an in-Alpha library which makes it easer to get started with [Elasticsearch](https://www.elastic.co/).

Elasticsearch is a enterprise-grade document store and search engine based on the Apache Lucene library. It specialises in free text search using an [inverted index](https://www.knowi.com/blog/what-is-elastic-search/) to score documents against input search queries.

Elasticsearch's [JavaScript Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html) is used to call its [APIs](https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html) but its inherent flexibility can be overwhelming for beginners:

- complex request and response formats can lead to verbose, duplicate or fragile application code
- if you're new to the API, documentation or terminology, it's difficult to know what code to write

## Library

To address this, ES Kit provides a constrained "kit of parts" in the form of reusable, atomic helper functions which fit together to reliably abstract the API lifecycle, making it quick, easy (and reasonably obvious how) to write clean, trial-and-error-free client code.

The kits comprises 4 main areas:

- [Queries](https://github.com/davestewart/es-kit/blob/main/docs/utilities/queries.md) – build Elastic queries using simple functions
- [Helpers](https://github.com/davestewart/es-kit/blob/main/docs/utilities/helpers.md) – abstract key parts of the Elastic API lifecycle
- [Scripts](https://github.com/davestewart/es-kit/blob/main/docs/utilities/scripts.md) – build Elastic scripts from JavaScript functions
- [Api](https://github.com/davestewart/es-kit/blob/main/docs/api/README.md) – simplified interaction with Elasticsearch's APIs

These modules tread a carefully-planned line between:

- **abstraction** – they abstract the request config and response data only
- **knowledge** – you're required to understand the basics of using the client 

The helpers themselves address a core subset of the API which creates a much shallower learning curve. 

Along with the code, the library ships with what amounts to a [beginners guide](https://github.com/davestewart/es-kit/blob/main/docs/elastic/README.md) to Elastic to help new users get up to speed and prevent the library from reinventing the wheel solely for the purpose of making new users productive.

## Comparison

As an example of Elastic's verbosity, here's a simple search querying an `id` and the text `cat` across multiple fields: 

```js
import { client } from './client'

// query is verbose with difficult to remember syntax
const params = {
  index: 'contacts',
  query: {
    bool: {
      must: [
        {
          match: {
            groups: req.params.id,
          },
        },
        {
          multi_match: {
            query: req.query.filter,
            fields: [
              '*',
            ],
            type: 'phrase_prefix',
          },
        },
      ],
    },
  },
}

try {
  const res = await client.search(params)
  if (res.body.hits) {
    // response is complex with deeply nested properties
    return res.body.hits.hits.map(hit => {
      return { _id: hit._id, ...hit._source }
    })    
  }
}
catch (err) {
  console.log(err)
  throw err
}
```

As a new user, it is difficult to know where to start; the whole process is time-consuming and error-prone.

ES Kit provides various ways to simplify this.

Firstly, using [utilities](https://github.com/davestewart/es-kit/tree/main/docs/utilities) which provide typed functions with clear arguments:

```js
import { client } from './client'
import { Queries as _, Helpers as $ } from '@davestewart/es-kit'

// use helpers to build the query
const params = {
  index: 'contacts',
  query: _.must([
    _.match('groups', req.params.id),
    _.multiMatch('*', req.query.filter),
  ])
}

try {
  const res = await client.search(params)
  return $.results(res) // convert results to something usable
}
catch (err) {
  throw $.error(err) // logs and throws a simplified error structure
}
```

Or, using the [Api](https://github.com/davestewart/es-kit/tree/main/docs/api) (which uses the utilities internally) which wraps everything up into one easy call:

```js
import { Api, Helpers as $ } from '@davestewart/es-kit'

// create query, parse results, handle errors, paginate, and more...
return Api.search('contacts', { query: $.query.request(req) })
```

The approach is designed to let users augment existing code, completely replace it, or find a sweet spot inbetween.

## Links

- [GitHub](https://github.com/davestewart/es-kit)
- [Documentation](https://github.com/davestewart/es-kit/tree/master/docs)
- [Code examples](https://github.com/davestewart/es-kit/tree/master/docs/examples.md)

