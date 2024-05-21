---
description: Build sites that scale by organising code by domain, not concern
date: 2024-05-14
media:
  opengraph: ./images/featured.png
  featured: ./images/featured.png
  thumbnail: ./images/thumb.png
---

# Modular site architecture with Nuxt layers

## Intro

Nuxt 3 introduces a new paradigm called "Layers" that the docs describe as "[a powerful system that allows you to extend the default files, configs, and much more](https://nuxt.com/docs/getting-started/layers)". Whilst this explanation is _technically_ accurate, the emphasis on "extending defaults" overlooks another perhaps more impactful use case – that of logically reorganising your application.

### Overview

To get you up-to-speed on the concepts, I'll begin with some theory:

- [Site organisation](#site-organisation)<br>
  A comparison of organising by concern vs by domain
- [Nuxt layers intro](#nuxt-layers-intro)<br>
  A brief intro to Nuxt layers and how they work

Then, I'll share actionable steps to migrate an existing Nuxt application: 

- [Nuxt concerns](#nuxt-concerns)<br>
  How individual Nuxt concerns work or need to be reconfigured when moved to layers
- [Site migration](#site-migration)<br>
  Advice and steps to successfully migrate your own Nuxt 3 site to layers
- [Demo](#demo)<br>
  A demo repo with tagged commits following a layers migration

You might also want to skim the official Layers docs before continuing:

- [Get Started » Layers](https://nuxt.com/docs/getting-started/layers)
- [Guide » Authoring Nuxt Layers](https://nuxt.com/docs/guide/going-further/layers)

### Contents

It's a long article (!) so here's the full table of contents if you want to skip:

<NavToc type="list"
        exclude="intro"
        prompt=""
/>

## Site organisation

Let's take a look at two main ways to organise sites and apps; by [concern](#by-concern) and by [domain](#by-domain).

> Note that the choice of words "domain" and "concern" could easily be "feature" and "responsibility".
>
> *Feel free to use whatever terms make the most sense to you.*

### By concern

Most Vue and Nuxt projects are born of simple starter templates, which group files by *concern* (`pages`, `components`, etc):

```
+- src
    +- components
    |   +- blog
    |   |   +- ...
    |   +- home
    |       +- ...
    +- content
    |   +- blog
    |       +- ...
    +- pages
    |   +- blog.vue
    |   +- index.vue
    +- ...
```

This folder structure is simple to understand and somewhat invisible when your site or application is small.

However, as sites grow in size, this grouping obfuscates more *natural* relationships (i.e. everything related to `blog`) which makes it hard to understand what your site or application actually *does*.

### By domain

At a certain size of site (and actually, not that big!) it becomes more intuitive to silo files by *domain* (`blog`, `home`, etc):

```
+- src
    +- blog
    |   +- components
    |   |   +- ...
    |   +- content
    |   |   +- ...
    |   +- pages
    |       +- blog.vue
    +- home
    |   +- components
    |   |   +- ...
    |   +- pages
    |       +- index.vue
    +- ...
```

Transposing physical locations has tangible benefits...

File management:

- domains (`blog`, `home`, etc) become self-contained units
- related code will generally be located in a sibling folder
- less open folders / scrolling / jumping in your IDE

Configuration and settings:

- domain config is discrete from from global config
- simpler, smaller, domain entry points, rather than one huge config file
- minimal mixing of global and local concerns

Developer experience:

- PRs are simpler as most files will exist downstream from a common folder
- you can more easily develop new features or site sections
- you can more easily turn complete features on / off
- domains can be broken out further if they get too large

The conceptual shift from concern to domain may feel familiar to you [if you moved](https://vuejs.org/guide/extras/composition-api-faq.html#more-flexible-code-organization) from Vue's Options API to the Composition API; rather than concerns being striped across a sprawling `options` structure, they can be more naturally grouped as composables.

##  Nuxt layers intro

So it turns out that Nuxt Layers are perfect to restructure and reorganise a site by domain.

Layers can be viewed as "mini" applications which are stitched together to create the "full" application.

Each folder:

- may contain `pages`, `components`, `server` sub-folders, etc
- identifies it's a layer using a `nuxt.config.ts` file

A small personal site might be organised as follows:

```
+- src
    +- base                          <-- global, shared or one-off functionality
    |   +- ...
    +- blog                          <-- nuxt content configuration, markdown articles
    |   +- ...
    +- home                          <-- one-off components, animation plugin and configuration
    |   +- components
    |   |   +- Hero.vue
    |   |   +- Services.vue
    |   |   +- Testimonials.vue
    |   |   +- ...
    |   +- pages
    |   |   +- index.vue
    |   +- plugins
    |   |   +- ...
    |   +- nuxt.config.ts
    +- ...
    +- nuxt.config.ts 
```

The top-level layers silo related `pages`, `components`, `plugins`, even `config`.

Finally, the root-level `nuxt.config.ts` combines these layers via [unjs/c12](https://github.com/unjs/c12?tab=readme-ov-file#extending-configuration)'s `extends` keyword:

```ts
export default defineNuxtConfig({
  extends: [
    './base',
    './blog',
    './home',
  ]
})
```

Note that c12 can also extend from [packages and repos](https://nuxt.com/docs/getting-started/layers#usage) – but for the sake of this article, I'm only covering folders.

## Nuxt concerns

Now that you understand how a layer-based site is structured, let's review some specifics for Nuxt's concerns to work correctly under this new paradigm:

- [Framework folders](#framework-folders)
- [Pages and routes](#pages-and-routes)
- [Components](#components)
- [Auto-imports](#auto-imports)
- [Nuxt Content](#nuxt-content)
- [Tailwind](#tailwind)
- [Config](#config)
- [Imports and exports](#imports-and-exports)

> Note that this section is effectively a **sanity check** for layer-related configuration, and:
> - sets you up for the [site migration](#site-migration) section which takes you through full layers refactor
> - provides lots of tips and tricks for configuration in general

### Framework folders

#### Layer folders

Core framework folders [within layers](https://nuxt.com/docs/guide/going-further/layers) are auto scanned build the full app.

Additionally, many of these entities can be further modified using [config](https://nuxt.com/docs/api/nuxt-config):

| Folder                                                                            | Config                                                           |     | Notes                                         |
|-----------------------------------------------------------------------------------|------------------------------------------------------------------|-----|-----------------------------------------------|
| [`./components`](https://nuxt.com/docs/guide/directory-structure/components)      | [`components`](https://nuxt.com/docs/api/nuxt-config#components) |     | Auto-imported (nested, renamed by default 🙁) |
| [`./composables`](https://nuxt.com/docs/guide/directory-structure/composables)    | [`imports`](https://nuxt.com/docs/api/nuxt-config#imports)       |     | Auto-imported (top-level only)                |
| [`./layouts`](https://nuxt.com/docs/guide/directory-structure/layouts)            |                                                                  |     | Auto-imported (nested)                        |
| [`./pages`](https://nuxt.com/docs/guide/directory-structure/pages)                | [`pages`](https://nuxt.com/docs/api/nuxt-config#pages)           |     | Generates routes                              |
| [`./plugins`](https://nuxt.com/docs/guide/directory-structure/plugins)            | [`plugins`](https://nuxt.com/docs/api/nuxt-config#plugins-1)     |     | Auto-registered (top-level only)              |
| [`./public`](https://nuxt.com/docs/guide/directory-structure/public)              | [`dir.public`](https://nuxt.com/docs/api/nuxt-config#dir)        |     | Copied to `./output`                          |
| [`./server`](https://nuxt.com/docs/guide/directory-structure/server)              | [`serverDir`](https://nuxt.com/docs/api/nuxt-config#serverdir)   |     | Adds middleware, api routes, etc              |
| [`./utils`](https://nuxt.com/docs/guide/directory-structure/utils)                | [`imports`](https://nuxt.com/docs/api/nuxt-config#imports)       |     | Auto-imported (top-level only)                |
| [`./nuxt.config.ts`](https://nuxt.com/docs/guide/directory-structure/nuxt-config) |                                                                  |     | Config merged with root `nuxt.config.ts`      |
| [`./app.config.ts`](https://nuxt.com/docs/guide/directory-structure/app-config)   |                                                                  |     | Config merged with root `app.config.ts`       |

This means you can generally break out concerns across layers as you see fit – and Nuxt will take care of the loading, registering, and the splicing together of the files.

However, note that same-named files from different layers **will** overwrite each other, i.e. if you have two `<layer>/pages/index.vue` files, then the second layer will overwrite the first.

> ***Note***: I'm going to further investigate the behaviour of overlapping _core_ folders like `public` and `server` as I've had different results in different projects (probably human error!) so check back soon as I'll document my findings.

#### Core folders

Nuxt's default / global folder locations can also be moved to layers:

- [`/assets`](https://nuxt.com/docs/guide/directory-structure/assets)        
- [`/layouts`](https://nuxt.com/docs/guide/directory-structure/layouts)      
- [`/middleware`](https://nuxt.com/docs/guide/directory-structure/middleware)
- [`/modules`](https://nuxt.com/docs/guide/directory-structure/modules)      
- [`/pages`](https://nuxt.com/docs/guide/directory-structure/pages)          
- [`/plugins`](https://nuxt.com/docs/guide/directory-structure/plugins)      
- [`/public`](https://nuxt.com/docs/guide/directory-structure/public)

However, you will need to, update Nuxt's [`dir`](https://nuxt.com/docs/api/nuxt-config#dir) config settings:

```ts
// src/nuxt.config.ts
export default defineNuxtConfig({
  dir: {
    // core
    assets: 'core/assets',
    modules: 'core/modules',
    middleware: 'core/middleware',
    plugins: 'core/plugins',
    
    // site
    layouts: 'layers/site/layouts',
    pages: 'layers/site/pages',
    public: 'layers/site/public',
  },
})
```

See [Global Concerns](#global-concerns) section for rationale on tidying up your project's root.

#### Programmatic options

Beyond layer folders and config, you have options to add or modify concerns programmatically.

See:

- [Authoring Nuxt Layers](https://nuxt.com/docs/guide/going-further/layers) for full layers information including support in modules
- [Module Author Guide](https://nuxt.com/docs/guide/going-further/modules#injecting-vue-components-with-addcomponent) for examples of adding and modifying resources through code
- [Nuxt Kit](https://nuxt.com/docs/api/kit/modules) which provides a set of utilities to help you create and use modules
- [Lifecycle Hooks](https://nuxt.com/docs/api/advanced/hooks) which allow you to hook into teh application build and runtime process


### Pages and routes

Layers can happily contain their own pages and define navigable routes.

However, any `pages` folders must contain **full folder paths** – as the layer name is **not** automatically prepended:

```ts
+- src
    +- blog
    |   +- pages
    |       +- blog             <-- route starts here, i.e. /blog
    |           +- index.vue
    |           +- ...
    +- home
        +- pages
            +- index.vue        <-- route starts here, i.e. /
```

<!--
I looked into whether it would be possible using the [`pages:extend`](https://nuxt.com/docs/guide/going-further/custom-routing#pages-hook) hook, but unfortunately in Nuxt's own internal [`resolvePagesRoutes`](https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/pages/utils.ts#L51-L66) function overwrites same-named pages in separate folders. I suspect the only way round this would be a new layer-specific option such as `pagesPrefix`.
-->

### Components

> ***Warning!*** Side-rant ahead! 😖

Nuxt's components [auto-importing and auto-registering rules](https://nuxt.com/docs/guide/directory-structure/components#component-names) are IMHO [unnecessarily complex and opaque](https://stackblitz.com/edit/nuxt3-component-config) – and considering this article is about helping you organise your Nuxt app at scale – I wanted to comment on what I see as a major anti-pattern, too much magic, and something to avoid.

The thing is, Nuxt's default auto-import settings do scan `components` folders recursively, however:

- **top-level** components import using their given names
- but **nested** components are _prefixed_ with the path's segments

As such, out-of-the-box component "auto-importing" is **also** component "_auto-renaming_":

| Folder             | Component        | AutoImport       |
|--------------------|------------------|------------------|
| `components`       | `Input.vue`      | `Input.vue`      |
| `components`       | `FormsInput.vue` | `FormsInput.vue` |
| `components/forms` | `Input.vue`      | `FormsInput.vue` |
| `components/forms` | `FormsInput.vue` | `FormsInput.vue` |

My problems with this are:

- if you miss this (or misunderstand this) things break real quick
- it's completely unintuitive for any (let alone Vue) developers new to Nuxt
- it's just a workaround to avoid collisions in the global namespace
- it's inconsistent between root and child folders
- you can't organise components without the imported component being renamed
- thus, moving components to subfolders will inexplicably break your app
- then you have to manually find and replace component names in your markup
- you can potentially have _multiple_ components overwriting the _same_ auto-import 
- you don't know what components are used, where, or how many times
- there are no explicit imports for your IDE to track and update
- you lose the ability to navigate to a component via its import
- both VSCode and WebStorm add import statements _anyway_
- ESLint can remove unused import statements if you forget
- it's apparently a [misuse of `d.ts` files](https://www.youtube.com/watch?v=zu-EgnbmcLY) anyway
- it's on by default

Given the above, it's arguable that it _saves_ you any time – but can absolutely **cost** you time! And the larger your application gets, the **less magic** you want and the **more safety** you need.

> _I will concede that there are differences in how the two main IDEs support both component navigation and refactoring, and there is no best-fit between the two, as yet. I'm a WebStorm user, so my views are biased due to its superior refactoring abilities._

But with that said and done, your options for component auto-importing are:

```ts
// src/nuxt.config.ts
export default defineNuxtConfig({
  components: [
    // use defaults: use path prefix
    '~/core/components',
          
    // override defaults: no path prefix
    { path: '~/layers/site/components', pathPrefix: false },

    // override defaults: no path prefix, register all globally (for Nuxt Content)
    { path: '~/layers/blog/components', pathPrefix: false, global: true },
  ]
})
```

Note that `components` config supports folder names (useful in layers):

```ts
// src/layers/site/nuxt.config.ts
export default defineNuxtConfig({
  components: [
    { path: 'components', pathPrefix: false },
  ]
})
```

You can also [disable component auto-import](https://nuxt.com/docs/guide/concepts/auto-imports#auto-imported-components) entirely, including any default `components` folder:

```ts
// root or layer nuxt.config.ts
export default defineNuxtConfig({
  components: []
})
```

You can also [disable _any_ auto-importing](https://nuxt.com/docs/guide/concepts/auto-imports#disabling-auto-imports) but then you lose the benefit of importing the boring stuff:

```ts
export default defineNuxtConfig({
  imports: {
    autoImport: false
  }
})
```

### Auto-imports

I wanted to cover so-called [auto-imports](https://nuxt.com/docs/guide/directory-structure/composables) functionality, specifically to disambiguate from [components](#components).

In Nuxt, the `composables` and `utils` folders are imported automatically, at least at the [top-level](https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned).

However, there is nothing _special_ about the naming (as in, there is [no enforcement](https://vuejs.org/guide/reusability/composables) of the files within) and you could (should!) add more-specifically named folders, whether-or-not you want them auto-imported. Don't just throw arbitrary code into these folders; if it's `/services`, `/stores` or additional `/config` give it a home to make the intended use _clear_. 

To add additional folders, add them to the `imports.dirs` config, and decide how you want them scanned:

```ts
// src/nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    dirs: [
      // add core services
      'core/services',

      // add specific files in core composables in subfolders
      'core/composables/**/*.{ts,js,mjs,mts}',

      // autoload all stores in all layers
      '**/stores'
    ]
  }
})
```

A couple of other things to note about `imports` config:

- it can be an `array` of `strings` (just the paths) or an `object` (additional options; use `dirs` for paths)
- the paths format [supports globs](https://nuxt.com/docs/guide/directory-structure/composables#how-files-are-scanned) whereas `components` does not

See the [path configuration](#path-configuration) section for detailed information about how Nuxt handles paths.

### Nuxt Content

Nuxt Content plays nicely with Nuxt Layers.

#### Local sources

You can have more than one content source, meaning you can silo domain-specific content along with its related `pages`, `components`, etc. – which might suit if your site has multiple content-driven sections such as Blog, Guide, etc.:

```
+- src
    +- blog
    |   +- ...
    +- guide
        +- components
        |   +- ...
        +- content
        |   +- index.md
        |   +- ...
        +- pages
        |   +- ...
        +- nuxt.config.ts

```

Note that unlike [pages](#pages-and-routes) you **can** configure content without re-nesting the folder:

```ts
// src/blog/nuxt.config.ts
export default defineNuxtConfig({
  content: {
    sources: {
      blog: {
        prefix: '/blog',
        base: './blog/content', // referenced from root
        driver: 'fs',
      }
    }
  }
})
```

#### Remote sources

If you want to include content from a [remote source](https://content.nuxt.com/get-started/configuration#sources) such as GitHub, [unjs/unstorage](https://unstorage.unjs.io/drivers/github) makes it possible:

```ts
// src/blog/nuxt.config.ts
export default defineNuxtConfig({
  content: {
    sources: {
      blog: {
        prefix: `/blog`,
        dir: 'content',
        repo: '<owner>/<repo>',
        branch: 'main',
        driver: 'github',
      }
    }
  }
})
```

For a private repositories, add your credentials (thanks to [@Atinux](https://twitter.com/Atinux) and [@_pi0_](https://twitter.com/_pi0_) for the [tip](https://twitter.com/Atinux/status/1765059244305383656)):

```ts
export default defineNuxtConfig({
  extends: [
    ['gh:<owner>/<repo>', { giget: { auth: process.env.GH_TOKEN }}]
  ]
})
```

Remember to add [your token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) to your project's `.env` file or CI settings like so:

```dotenv
# .env
GH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Content components

Bonus component tip: you don't have to use the suggested [global components content folder](https://content.nuxt.com/get-started/from-v1#global-components) to make components accessible from within Markdown documents, you could also:

- configure _any_ component folder as global using the [components](#components) config `global` flag
- mark specific components as global by renaming them with the `.global.vue` suffix

### Tailwind

At the time of writing, Nuxt's [Tailwind module](https://github.com/nuxt-modules/tailwindcss) does not pick up layers (though it's a [simple](https://nuxt.com/docs/guide/going-further/layers#multi-layer-support-for-nuxt-modules) PR).

> Note: [@atinux](https://twitter.com/atinux) tells me this is not the case; I'll investigate and update this section in due course

But you can easily tell Tailwind where your CSS classes can be found:

```js
// tailwind.config.ts
export default {
  content: [
    './core/components/**/*.vue',
    './layers/**/pages/**/*.vue',
    './layers/**/components/**/*.vue',
    ...
	],
  ...
}
```

### Config

There are a few things to think about regarding config:

- where to locate each file
- what each file should contain
- how to correctly resolve paths
- keeping code clean (see [global concerns](#global-concerns) and [tips](#tips))

#### Layer configs

Layers allow you to move domain-specific config to the individual layer config files:

```ts
// src/blog/nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'markdown-tools'
  ],
  markdownTools: {
    ...
  }
})
```

This can be great for isolating domain specific functionality, and at the same time simplifying your root config.

Your final config will be intelligently-merged (via [unjs/defu](https://github.com/unjs/defu)).

#### Path resolution

Note that path resolution in layers can be tricky, because of context, targets and formats:

```ts
export default {
  foo: resolve('../some-folder'),
  bar: 'some-layer/some-folder',
  baz: '~/other-layer',
  qux: './other-layer',
}
```

See the [path configuration](#path-configuration) section in the [site migration](#site-migration) section for a full breakdown of the options.

### Imports and exports

Given that layers are generally self-contained, importing is simplified:

```ts
// src/dashboard/components/User.vue
import { queryUser } from '../services'
```

If you want to import from another layer (and you opted for a [flat](#folder-structure) layer structure) you essentially get aliases for free:

```ts
// src/profile/components/User.ts
import { queryUser } from '~/dashboard/services'
```

Otherwise, you can set up [aliases](https://nuxt.com/docs/api/nuxt-config#alias) manually:

```ts
// src/layers/profile/components/User.ts
import { queryUser } from '#dashboard/services'
```

If you want to expose only certain dependencies from a layer, consider an index file:

```ts
// src/dashboard/index.ts
export * from './services/foo'
export * from './utils/bar'
```
```ts
// src/profile/components/User.ts
import { queryUser } from '~/dashboard'
```

And regarding [auto-imports](https://nuxt.com/docs/guide/concepts/auto-imports) – remember they only import  `components`, `composables` and `utils` folders.

You may need to configure additional imports using [`config.imports.dirs`](https://nuxt.com/docs/api/nuxt-config#dirs).


## Site migration

So you now understand the concepts, you have an idea of the updates to make, but you need a plan to do it.

Below, I've outlined my best advice, including:

- [Folder structure](#folder-structure)
- [Global concerns](#global-concerns)
- [Path configuration](#path-configuration)
- [Migration steps](#migration-steps)
- [Tips](#tips)

### Folder structure

The first thing to decide when migrating your site to layers is your ideal folder structure.

You can move some or all concerns to layers:

<div style="overflow-x: auto;">
<table style="margin: 0 !important">
<thead>
<tr>
<th style="text-align:center">Partial</th>
<th style="text-align:center">Hybrid</th>
<th style="text-align:center">Flat</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<pre class="language-text"><code>+- src
    +- assets
    |
    +- layers
    |   +- blog
    |   |   +- ...
    |   +- home
    |       +- ...
    |
    +- layouts
    +- plugins
    +- components
    +- nuxt.config.ts
</code></pre>
</td>
<td>
<pre class="language-text"><code>+- src
    +- core
    |   +- ...
    |
    +- layers
    |   +- blog
    |   |   +- ...
    |   +- home
    |       +- ...
    |
    +- nuxt.config.ts
</code></pre>
</td>
<td>
<pre class="language-text"><code>+- src
    +- blog
    |   +- ...
    +- core
    |   +- ...
    +- home
    |   +- ...
    |
    +- nuxt.config.ts
</code></pre>
</td>
</tr>
</tbody>
</table>
</div>

I prefer the flat or hybrid structure, as it significantly de-clutters the project outline.

### Global concerns

#### Folders

As outlined above, you might consider moving infrequently-accessed concerns to a `base` or `core` layer:

```
+- src
    +- core
    |   +- middleware
    |   +- modules
    |   +- plugins
    |   +- utils
    +- ... 
```

If a concern spans multiple domains, or isn't specific enough to get its own domain, `site` feels like a nice bucket:

```
+- src
    +- ... 
    +- site
        +- assets
        |   +- ...
        +- components
        |   +- Footer.vue
        |   +- Header.vue
        +- pages
        |   +- about.vue
        |   +- contact.vue
        +- public
        |   +- ...
        +- ...
```

#### Config

Moving infrequently-accessed config to layers makes it easier to get and stay organised (see [tips](#tips) for more suggestions!):

```ts
// src/core/nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: { ... },
  modules: [ ... ],
  plugins: [ ... ],
  nitro: { ... },
  ...
})
```

Note that if you move default folders you will need to reconfigure Nuxt's [dir](#core-folders) config.

### Path configuration

The correct path configurations (**target** and **format**) are _critical_ to Nuxt locating refactored layer-based concerns.

#### A review of Nuxt's path-related config

Nuxt's path config options can be driven by a variety of path formats:

| Type           | Code                                | Notes                                   |
|----------------|-------------------------------------|-----------------------------------------|
| Absolute       | `Path.resolve('layers/some-layer')` | You can also use `import.meta.url`      |
| Root-relative  | `layers/some-layer`                 |                                         |
| Layer-relative | `some-folder`                       | Relative to `some-layer/nuxt.config.ts` |
| Alias          | `~/layers/some-layer`               | Expands internally to absolute path     |
| Glob           | `some-layer/**/*.vue`               | Expands to an array of paths            |

Additionally, some config options scan **nested** folders, providing glob-like functionality.

Here's a sample of the differences between some of [25+ path-related](https://github.com/davestewart/nuxt-layers-utils#nuxt-config) config options (along with their quirks):

| Name                                                             | Abs | Root-rel | Layer-rel | Alias | Nest | Glob | Notes                                                             |
|------------------------------------------------------------------|:---:|:--------:|:---------:|:-----:|:----:|:----:|-------------------------------------------------------------------|
| [`extends`](https://nuxt.com/docs/api/nuxt-config#extends)       |  ●  |    ●     |     ●     |       |      |      | Layers can be nested (mainly useful for modules)                  |
| [`dir.*`](https://nuxt.com/docs/api/nuxt-config#dir)             |  ●  |    ●     |           |       |      |      |                                                                   |
| [`dir.public`](https://nuxt.com/docs/api/nuxt-config#public)     |  ●  |    ●     |           |       |      |      | First public folder found wins                                    |
| [`imports.dirs`](https://nuxt.com/docs/api/nuxt-config#dirs)     |  ●  |    ●     |     ●     |       |  ●   |  ●   |                                                                   |
| [`components`](https://nuxt.com/docs/api/nuxt-config#components) |  ●  |    ●     |     ●     |   ●   |  ●   |      | Components are [prefixed by default](#components) (based on path) |
| [`modules`](https://nuxt.com/docs/api/nuxt-config#modules)       |  ●  |          |           |       |      |      |                                                                   |
| [`plugins`](https://nuxt.com/docs/api/nuxt-config#plugins-1)     |  ●  |    ●     |           |   ●   |      |      |                                                                   |
| [`ignore`](https://nuxt.com/docs/api/nuxt-config#ignore)         |     |          |           |       |      |  ●   |                                                                   |

#### Advice on configuring paths

There is also the question of _where_ to configure your paths; in the **root** and/or **layer** configuration?

I think for **smaller** sites, it's fine to configure paths in the layer config.

But for **larger** sites, I've come to the conclusion that ***it's just simpler to configure all path-related config in the root***:

- you're not searching through multiple folders and layer config files
- it's easier to compare and copy/paste paths between options
- path resolution is consistent between layers of differing depths
- you limit any repetition or duplication to a single file

As such, your core `nuxt.config.ts` file might look something like this:

```ts
import { resolve } from 'pathe'

export default definedNuxtConfig({
  extends: [
    'core',
    'layers/blog',
    'layers/site'
  ],

  alias: {
    '#core': resolve('core'),
    '#blog': resolve('layers/blog'),
    '#site': resolve('layers/site'),
  },

  dir: {
    assets: 'core/assets',
    modules: 'core/modules',
    middleware: 'core/middleware',
    public: 'layers/site/public',
  },

  components: [
    { path: '~/layers/site/components', pathPrefix: false }, // disable path-prefixing
  ]
})
```

Although this looks a little repetitive and verbose – it is much easier to debug with paths in one place.

To simplify and have the correct config generated automatically, use [Nuxt Layers Utils](https://github.com/davestewart/nuxt-layers-utils):

```ts
{
  extends: layers.extends(),
  alias: layers.alias(),
  ...
}
```

See the [Tips](#tips) section for a full example.

### Migration steps

#### Overview

Migrating an existing site isn't difficult, but it can be a little risky and frustrating. 

You should treat it like any other major refactor and aim to go slow; migrate feature-by-feature, folder-by-folder, or file-by-file – as your build **will** break – and there will be times when you don't know why.

Set aside a few hours for a small site, and a day or more for a larger, in-production one.

> You can review the [demo](#demo) at the end for a real-world example

#### Steps

Before you start:

- review key [Nuxt concerns](#nuxt-concerns) to get a good overview of each
- create a `migration` branch to isolate your updates from your working code

Make a plan to work on:

- global concerns, such as `base`
- specific domains, such as `blog`, `home`, etc 

To start:

- create aliases for all layers
- use an IDE like Webstorm which rewrites your paths as you move files
- run the app in `dev` mode, so you can see when changes break the app

Then, tackle a single domain / layer at a time:

- create the new layer:
  - add a top-level folder
  - add the `nuxt.config.ts`
  - update the root `alias` hash (so that moves are rewritten using aliases)
  - update the root `extends` array
- move concerns so that you're only likely to break one thing at a time:
  - [Config](#config):
    - moving settings and modules should be straightforward
    - some configuration (i.e. [`dir`](#global-concerns), [`content`](#nuxt-content)) may need reconfiguring
  - [Pages](#pages):
    - remember routes are not prefixed with the layer name
    - check file imports as you move 
  - [Components](#components):
    - if imported, review paths
    - if auto-imported, should just work (unless components themselves moved to sub-folders!)
    - if not, you may need to add specific components folder paths to the `components` config
  - [Content](#nuxt-content)
    - decide whether [Nuxt Content]() will be global or local
    - remember Nuxt Content components need to live in `components/content`
- the things to check as you move are:
  - [Paths](#config):
    - remember `Path.resolve()`'s context whilst consuming `config` is your project's root folder
    - layer-level paths may still need to be `./<layer>/<concern>` vs `./<concern>`
  - [Imports](#imports-and-exports):
    - global imports may flip from `~/<concern>/<domain>` to `~/<layer>/<concern>`
    - local imports may become `../<concern>`
  - [Config imports](#consider-layer-helpers):
    - config `import` statements **cannot** use path aliases; you may need to use `../layer/concern`

#### Points to think about

As you make changes:

- restart the server _often_
- manually check related pages, components, modules, plugins, etc
- commit your changes after each successful update or set of updates

When errors occur:

- it may not be immediately clear why or _where_ the error happened (i.e. Nuxt, Vite, etc)
- make sure to properly **read** and try to _understand_ terminal and browser console errors
- if you find later something is broken, go back through your commits until you find the bug

Gotchas:

- layer config watching is buggy (intermittent at best)
- restart the dev server for missing pages, components, errors
- missing components don't error in the browser (update `components` config)

<!--
Errors:

```
no such file or directory, open '/Volumes/Data/Work/OpenSource/JavaScript/NuxtLayersDemo/nuxt-layers-demo/site/components/ColorModeSwitch.vue'
```
-->

### Tips

#### Use Nuxt Layers Utils

To simplify path-related configuration, use [Nuxt Layers Utils](https://github.com/davestewart/nuxt-layers-utils) to declare your layers **once** then auto-generate config:

```ts
// /<your-project>/nuxt.config.ts
import { useLayers } from 'nuxt-layers-utils'

const layers = useLayers(__dirname, {
  core: 'core',
  blog: 'layers/blog',
  site: 'layers/site',
})

export default defineNuxtConfig({
  extends: layers.extends(),
  alias: layers.alias('#'),
  ...
})
```

#### Group related config

Lean on [unjs/defu](https://github.com/unjs/defu) to configure smaller subsets of related options, then merge them together on export:

```ts
// src/core/nuxt.config.ts
const config = defineNuxtConfig({ ... })
const modules = defineNuxtConfig({ ... })
const build = defineNuxtConfig({ ... })
const ui = defineNuxtConfig({ ... })

export default defu(
  config,
  modules,
  build,
  ui,
)
```

For a complete example, check the demo's [core config](https://github.com/davestewart/nuxt-layers-demo/blob/e022ec2f995128a4287ffa5bbedccbf40ec77594/core/nuxt.config.ts).

#### Consider layer helpers

For complex configuration that may differ only _slightly_ across layers (such as [hooks](https://nuxt.com/docs/api/nuxt-config#hooks)) you might consider helpers:

```ts
// src/base/utils/layers.ts
export function defineLayerConfig (path: string, options?: LayerOptions) {
  const output: ReturnType<typeof defineNuxtConfig> = {}
  if (options.hooks) { ... }
  if (options.thing) { ... }
  return output
}
```

Call from layers like so:

```ts
// src/blog/nuxt.config.ts
import { defineLayerConfig } from '../base/utils/layers'

export default defineNuxtConfig ({
  ...defineLayerConfig(__dirname, {
    hooks: [ 'foo', 'bar'],
    thing: true 
  })
})
```

> Note that you **cannot use path aliases** such as `~` in config `import` statements – because Nuxt will not yet have compiled them into its own`.nuxt/tsconfig.json` file.

#### Isolate layers

Use comments or conditionals to toggle layers:

```ts
// src/nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    './base',
    // './home',
    isDev && './blog',
  ]
})
```

#### Nuxt 2 users

You can use Nuxt Areas to get layers-like functionality in Nuxt 2: 

- [github.com/davestewart/nuxt-areas](https://github.com/davestewart/nuxt-areas)

## Demo

So that's a lot of theory; how about some code?

Well, I've taken Sébastian Chopin's [Alpine](https://github.com/nuxt-themes/alpine/) demo and migrated it from a _concern_-based to a _domain_-based setup.

The idea is to demonstrate a **real-world** migration using the **actual** advice given above.

The tagged [milestones](https://github.com/davestewart/nuxt-layers-demo/commits/main/) in this migration are / will be:

- `0.1.0` – **[Alpine starter repo](https://github.com/davestewart/nuxt-layers-demo/tree/16f9e7a0a9555d889d236d2f36f8a7f040105d4a)**<br>
  Local content extending external theme
- `0.5.0` – **[Combined theme and content](https://github.com/davestewart/nuxt-layers-demo/tree/8eb099e84d89204466e9ac7c8b3eb74eabc100af)**<br>
  Local content and theme, with a traditional flat folder structure (by concern)
- `1.0.0` – **[Refactor to flat layers](https://github.com/davestewart/nuxt-layers-demo/tree/a9345e527f340c71a5de286a19e19b90edc2d25c)**<br>
  Repackage to core, site and articles layers (by domain)
- `1.1.0` – **[Refactor layers to subfolder](https://github.com/davestewart/nuxt-layers-demo/tree/e022ec2f995128a4287ffa5bbedccbf40ec77594)**<br>
  Move site and articles to sub-folder (by domain, but neater)
- `1.2.0` – **Refactor using Nuxt Layers Utils** (WIP)<br>
  Migrate path configuration to root (by domain, but simpler)
- `1.3.0` – **Advanced layer functionality** (WIP)<br>
  Push layers to see how far we can go!

You can clone or browse the repo from here:

- [github.com/davestewart/nuxt-layers-demo](https://github.com/davestewart/nuxt-layers-demo)

## Resources

In the interest of completeness, here are some links to other resources worth looking at:

- [Nuxt Layers Unwrapped](https://krutiepatel.com/blog/nuxt-layers-unwrapped)<br>
  [Krutie Patel](https://x.com/KrutiePatel)'s article supporting her talk at Nuxt Nation 2023
- [Nuxt Monorepo for Large-Scale Vue Web Application](https://serko.dev/post/nuxt-3-monorepo#nuxt-layers)<br>
  In-depth article by [SerKo](https://x.com/serkodev) on using a monorepo and layers to build Nuxt apps
- [Nuxt 3 monorepo example -- Basic example](https://dev.to/leamsigc/nuxt-3-monorepo-example-basic-example-1d61)<br>
  Simpler example of how to get started with a Nuxt 3 layers monorepo
- [Authoring Nuxt Layers](https://nuxt.com/docs/guide/going-further/layers)<br>
  Nuxt's own documentation regarding authoring layers
- [Google search](https://www.google.com/search?q=nuxt+layers)<br>
  Google's results for "nuxt layers"

Also, various posts referring to this post, some of which have useful comments or discussion:

- [Reddit r/Nuxt](https://www.reddit.com/r/Nuxt/comments/1ctd4mb/article_modular_site_architecture_with_nuxt_layers/)
- [Reddit r/VueJS](https://www.reddit.com/r/vuejs/comments/1ctgsu8/modular_site_architecture_with_nuxt_layers/)
- [Twitter](https://x.com/dave_stewart/status/1791098742373781943)

## Last words

Hopefully this article gives you some solid ideas on how to modularise your site or app – and if I've skipped over anything – ideas on how to approach it. Layers are generally quite logical and predicable, with a minor tradeoff of a little more configuration.

FWIW I have a bit of a love/hate relationship with Nuxt, so if you think some of this is wrong or inaccurate, do please drop a comment and I can update the article accordingly.

And lastly, kudos to the UnJS and Nuxt team for the work they've done 🙏.

<!--
## Resources

Links to resources here
-->
