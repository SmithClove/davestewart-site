---
description: Bundle endpoints as callable, reusable services
date: 2018-07-01
tags:
  - library
  - javascript
  - state
media:
  thumbnail: ./images/axios-actions.svg
  featured: ./images/axios-actions.svg
---

# Axios Actions

## Overview

Axios Actions simplifies the architecture of API-heavy Vue applications by moving calls away from Vuex an into small, configurable, instantiatable services.

## Background

Working at [Clear Bank](https://clear.bank) we had a large internal Vue-based system with probably 100s of global stores.

As all data was driven by API interactions this resulted in any (local) component requiring a tight-coupling to a (global) Vuex store with associated wiring, boilerplate and naming system.

Turning the idea of "all actions must go through the store" on its head component-relative API calls could be configured to run as self-contained units, with data delivered locally or globally as required.

## Implementation

The library comprises a small set of classes which collate URLs or URL request configs as callable actions.

First, endpoints are [defined](https://github.com/davestewart/axios-actions/blob/master/docs/config.md):

```js
const actions = {
  <action>: '<url>',
  <action>: '<config>',
  ...
}
```

Then, they are encapsulated as built-in [services](https://github.com/davestewart/axios-actions/blob/master/docs/classes/README.md):

```js
const service = new <ApiClass>(axios, actions)
```

Finally, they can be [called](https://github.com/davestewart/axios-actions/blob/master/docs/classes/ApiGroup.md#usage):

```js
service
  .<action>(<data>)
  .then(<handler>)
```

This service-based approach:

- removes brittle configuration from components and stores
- encapsulates additional logic (such as load state and handlers) within the service
- ensures application code stays simple and semantic
- provides a dedicated layer for API interaction

There are lots of [other goodies](https://github.com/davestewart/axios-actions/blob/master/docs/tips.md) in the library which take the drudgery out of working with APIs!

## Links

- [GitHub](https://github.com/davestewart/axios-actions)

- [Quick start](https://github.com/davestewart/axios-actions/blob/master/docs/quick-start.md)