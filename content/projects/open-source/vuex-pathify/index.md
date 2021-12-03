---
description: Vue / Vuex plugin providing a unified path syntax to Vuex stores
date: 2017-07-01
hero: featured
tags:
  - library
  - javascript
  - vue
  - state
  - architecture
  - creative
github: davestewart/vuex-pathify
media:
  thumbnail: ./images/vuex-pathify.svg
  opengraph: ./images/vuex-pathify.png
  featured: ./images/vuex-pathify.svg
---

# Vuex Pathify

## Overview

Pathify makes working with Vuex easy.

Its core mechanism is a custom [path syntax](https://davestewart.github.io/vuex-pathify/#/api/paths) which can reference any state property (and sub-property):

```js
'products/items@filters.search'
```

## Usage

Store [access](https://davestewart.github.io/vuex-pathify/#/api/accessors) and component [wiring](https://davestewart.github.io/vuex-pathify/#/api/component) are unified with `get()`, `set()`, `sync()` and `call()` methods:

```js
// global
const items = store.get('products/items')
store.set('products/items', items)

// component
computed: {
  total: get('products/total'),
  items: sync('products/items')
},

methods: {
  submit: call('products/submit')
}
```

Additional functionality includes [wildcard](https://davestewart.github.io/vuex-pathify/#/api/paths?id=wildcard-expansion) and [variable](https://davestewart.github.io/vuex-pathify/#/api/paths?id=variable-expansion) expansion:

```js
computed: {
  ...get('filters@*')
  product: get('products@items[index]')
}
```

Create store mutations in a single line (with support for sub-properties):

```js
const mutations = make.mutations(state)
```

## Impact

The overall approach results in a significant simplification of Vuex's API:

- from **4** operations, **4** helpers, **3** accessor syntaxes and **3** (or sometimes **4**) naming formats
- to **4** methods and **1** path format

The end result is a real-world reduction in setup, wiring, code and cognitive overhead. The [code comparison](https://codesandbox.io/s/github/davestewart/vuex-pathify-demos/tree/master/main?initialpath=%23%2Fcode%2Flarge) demo demonstrates reductions in LOC of between **2 to 14+ times** depending on store size and setup.

For more information, see the [Pathify 101](https://davestewart.github.io/vuex-pathify/#/intro/pathify).

## Links

- [GitHub](https://github.com/davestewart/vuex-pathify)
- [Documentation](https://davestewart.github.io/vuex-pathify)

