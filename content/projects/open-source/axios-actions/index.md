---
description: Bundle endpoints as callable, reusable services
date: 2018-07-01
tags:
  - library
  - javascript
  - state
github: davestewart/axios-actions
media:
  opengraph: ./images/axios-actions.png
  thumbnail: ./images/axios-actions.svg
  featured: ./images/axios-actions.svg
---

# Axios Actions

## Overview

Axios Actions simplifies the architecture of API-heavy applications.

In a Vue application for example, it moves API calls away from Vuex to small, configurable, instantiatable and transferable services.

## Background

Working at [Clear Bank](https://clear.bank) we had a large internal Vue-based system with probably 100s of global stores.

With application state being entirely driven by the API, all major components required tight coupling to a Vuex store, with associated folders, boilerplate, setup, naming, wiring, etc.

Turning the idea of "all actions must go through the store" on its head, Axios Actions allows groups of related API calls to be repackaged from *global* store actions, to *locally* configured, self-contained units, with data delivered locally or globally as required.

## Implementation

The library comprises a small set of classes which collate URLs or URL request configs as callable actions.

First, [define](https://github.com/davestewart/axios-actions/blob/master/docs/config.md) actions and endpoints:

```js
const actions = {
  search: 'products/widgets?category=:category',
  update: 'POST products/widgets/:id',
  delete: 'DELETE products/widgets/:id',
}
```

Then, encapsulate as a choice of built-in [services](https://github.com/davestewart/axios-actions/blob/master/docs/classes/README.md):

```js
const widgets = new ApiGroup(axios, actions)
```

Optionally add [plugins](https://github.com/davestewart/axios-actions/blob/master/docs/extension/plugins.md) or [event handlers](https://github.com/davestewart/axios-actions/blob/master/docs/classes/ApiGroup.md#handling-events):

```js
widgets
  .use('data')
  .when('update delete', event => console.log('something changed', event))
  .fail(error => console.log('the request failed', error))
```

Finally, [call](https://github.com/davestewart/axios-actions/blob/master/docs/classes/ApiGroup.md#usage) actions using object methods:

```js
widgets
  .search('blue')
  .then(data => {
    console.log(data)
  })
```



This service-based approach:

- removes brittle configuration from components and stores
- encapsulates additional logic (such as load state and handlers) within the service
- ensures application code stays simple and semantic
- provides a dedicated layer for API interaction

There are lots of [other goodies](https://github.com/davestewart/axios-actions/blob/master/docs/tips.md) in the library which take the drudgery out of working with APIs!

## Links

- [Demo site](https://axios-actions.netlify.com/)
- [Quick start](https://github.com/davestewart/axios-actions/blob/master/docs/quick-start.md)
- [GitHub](https://github.com/davestewart/axios-actions)
