---
description: Universal Vue stores you write once and use anywhere
date: 2020-05-01
hero: featured
tags:
  - library
  - javascript
  - typescript
  - vue
  - state
  - architecture
  - creative
github: davestewart/vue-class-store
media:
  opengraph: ./images/vue-class-store.png
  thumbnail: ./images/vue-class-store.svg
  featured: ./images/vue-class-store.svg
  video: https://www.youtube.com/embed/uBrh_2BIIAM?start=2425
---

# Vue Class Store

## Overview

View Class Store is universal store format for Vue.

It has some key advantages over Vuex and other libraries:

- native JavaScript syntax (no library-specific API)
- at authoring time, stores are just classes (so full autocompletion, etc)
- at runtime, stores are fully-reactive Vue objects (with computed properties, watches, etc)
- TypeScript support, class [inheritance](https://github.com/davestewart/vue-class-store#inheritance) and full debugging comes for free
- stores are local by default; but you can use them locally *or* [globally](https://github.com/davestewart/vue-class-store#global--shared-state)

## Setup

There's no setup or boilerplate, and stores and models are written the same way:

```js
import VueStore from 'vue-class-store'

@VueStore
export class Store {
  // properties are rebuilt as reactive data values
  public value: number

  // getters are converted to (cached) computed properties
  public get double (): number {
    return this.value * 2
  }

  // constructor parameters serve as props
  constructor (value: number = 1) {
    // constructor function serves as the created hook
    this.value = value
  }

  // prefix properties with `on:` to convert to watches
  'on:value' () {
    console.log('value changed to:', this.value)
  }

  // you can even watch nested properties!
  'on:some.other.value' = 'log'

  // class methods are added as methods
  log () {
    console.log('value is:', this.value)
  }
}
```

You can even upgrade or extend existing models to stores in one line:

```typescript
import Square from './Square'

const model: Square = VueStore.create(new Square(10))
```

See the [repository](https://github.com/davestewart/vue-class-store) for proper documentation.

## Background

Vue Class Store was born out of the frustration of writing, using and *migrating* multiple state formats in Vue applications:

- Components: Options API *(data, computed, methods)*
- Vuex: Store API *(state, getters, mutations, actions)*
- Vue 3: Reactivity API *(computed, refs, etc)*
- Vue Models: factory + Options API
- Models: Class syntax

Additionally, many have verbose boilerplate, and most are not TypeScript-friendly. 

Like [Vuex Pathify](../vuex-pathify) before it, it's the result of several years of [thinking about state](/search/?tags=state) and another attempt to simplify the tyranny of abstraction when working with state in JavaScript / Vue.

## How it works

You probably noticed the `@VueStore` decorator at the top of the file, and this is where the magic happens.

When the project is compiled, the decorator iterates over class properties and rebuilds them as either a new Vue (Vue 2) or a Proxy object (Vue 3).

*It's not even that magical*; you can check the source code for [Vue 2](https://github.com/davestewart/vue-class-store/blob/master/src/index.ts#L28) and [Vue 3](https://github.com/davestewart/vue-class-store/blob/feature/vue-3/src/index.ts#L36). Simple, right?

The resulting object then runs happily in the compiled application but thanks to source maps is also fully debuggable as the *original* class code!

![](https://github.com/davestewart/vue-class-store/raw/master/docs/devtools.png)

I've been making heavy use of Vue Class Store in various commerical projects as well as [Control Space](https://controlspace.app) to manage deep hierarchies of objects which [would have been problematic](https://forum.vuejs.org/t/data-sync-on-deeply-nested-structures/40099/6) in native Vuex.

## Video

In October 2020 I did a short presentation for World Vue:

<MediaVideo media="video" />

## Links

- [GitHub](https://github.com/davestewart/vue-class-store)
- [YouTube](https://youtube.com/watch?v=uBrh_2BIIAM&t=2425s)
- [Demos](https://github.com/davestewart/vue-class-store-demos)

