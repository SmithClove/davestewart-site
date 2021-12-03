---
description: Scalable folder management for large Nuxt projects
date: 2021-11-01
tags:
  - library
  - architecture
  - nuxt
  - vue
github: davestewart/nuxt-areas
media:
  thumbnail: ./images/nuxt-areas.png
  featured: ./images/nuxt-areas.png
---
# Nuxt Areas

## Overview

[Nuxt](https://nuxtjs.org) is the main full stack framework for [Vue JS](https://vuejs.org/).

It ships out of the box with a folder structure siloed by responsibility:

```
+- src
    +- components
    |   +- product-list.vue             <- stripe 1
    |   +- user-list.vue
    +- pages
    |   +- products.vue                 <- stripe 2
    |   +- users.vue
    +- store
        +- products.js                  <- stripe 3
        +- users.js
        +- user.js
```

This results in files being "striped" across the application, and as applications grow, not only do related files get further apart, but they sit in a sea of *unrelated* files, adding a physical and cognitive overhead to working with the various subsystems of the site.

## Library

[Areas](https://github.com/davestewart/nuxt-areas) is a Nuxt module that allows you to restucture your app to group related files by "area":

```
+- src
    +- areas
        +- products                     <- area 1
        |   +- components
        |   |   +- product-list.vue
        |   +- pages
        |   |   +- index.vue
        |   +- store.js
        +- users                        <- area 2
            +- classes
            |   +- User.js
            +- components
            |   +- user-list.vue
            +- pages
            |   +- index.vue
            +- store
                +- users.js
                +- user.js
```

Co-locating files this way has various advantages:

- it's easier to work on a discrete unit of functionality, such as "products" or "users"
- it's easier to understand what the site does as a whole
- it's easier to see how related files work together
- it's less hopping about between multiple branches of the folder tree
- it's easier to find a home for components, classes, or data
- naming is easier and imports are shorter

The library is available for Vue 2 and Vue 3 and handles:

- routing (dynamic and custom)
- store registration
- component registration
- Webpack aliases
- watching and debugging

## Links

- [GitHub](https://github.com/davestewart/nuxt-areas)
- [Demo](https://github.com/davestewart/nuxt-areas-demo)

