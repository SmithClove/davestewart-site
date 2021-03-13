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
  - creative
media:
  thumbnail: ./images/vue-class-store.svg
  featured: ./images/vue-class-store.svg
  video: https://youtube.com/embed/uBrh_2BIIAM&t=2425s
---

# Vue Class Store

## Overview

View Class Store is universal store format for Vue.

It lets you write Vue-compatible stores as JavaScript or TypeScript classes, which are instantiated with fully reactive data, computed properties and watches.

There's no setup or boilerplate, and you can use VCS stores globally, locally, in componets, anywhere. Additionally because they're classes, you can even inherit from other classes:

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

  // you can even drill into sub properties!
  'on:some.other.value' = 'log'

  // class methods are added as methods
  log () {
    console.log('value is:', this.value)
  }
}
```

However, the main difference between VCS and other store APIs is that *abstraction is delayed until run time*; so your IDE treats the store as a class (so, full autocompletion, etc) but at runtime, it becomes a fully reactive Vue object!

## Background

Vue Class Store was born out of the frustration of writing, using and migrating multiple state formats in Vue applications:

- Components: Options API *(data, computed, methods)*
- Vuex: Store API *(state, getters, mutations, actions)*
- Vue 3: Reactivity API *(computed, refs, etc)*
- Vue Models: factory + Options API
- Models: Class syntax

Additionally, many have verbose boilerplate, and most are not TypeScript-friendly. 

Like [Vuex Pathify](../vuex-pathify) before it, it's the result of several years of thinking, and an attempt to simplify the drudgery of abstraction when working with state in Vue.

## How it works

You probably noticed the `@VueStore` decorator at the top of the file, and this is where the magic happens.

When the project is compiled, the class is converted into a Vue Model (Vue 2) or a Proxy object (Vue 3).

The compiled target then runs in the application as the platform-specific target, but thanks to source maps and is fully useable as simple classes in both the IDE and the debugger!

![](https://github.com/davestewart/vue-class-store/raw/master/docs/devtools.png)

I've been making heavy use of Vue Class Store in various commerical projects as well as [Control Space](https://controlspace.app) to manage deep hierarchies of objects which [would have been problematic](https://forum.vuejs.org/t/data-sync-on-deeply-nested-structures/40099/6) in native Vuex.

## Video

In October 2020 I did a short presentation for World Vue:

<MediaVideo media="video" />

## Links

- [GitHub](https://github.com/davestewart/vue-class-store)
- [YouTube](https://youtube.com/watch?v=uBrh_2BIIAM&t=2425s)
- [Demos](https://github.com/davestewart/vue-class-store-demos)
