---
description: Enable locally-located assets in Nuxt Content
date: 2023-04-14
tags:
  - library
  - nuxt
  - vue
github: davestewart/nuxt-content-assets
media:
  thumbnail: ./images/nuxt-content-assets.png
  featured: ./images/nuxt-content-assets.png
---
# Nuxt Content Assets

## Overview

Nuxt Content Assets enables locally-located assets in [Nuxt Content](https://content.nuxtjs.org/):

```
+- content
    +- posts
        +- 2023-01-01
            +- index.md
            +- media
                +- featured.png
                +- mountains.jpg
                +- seaside.mp4
```

In your documents, reference assets with relative paths:

```markdown
---
title: Summer Holiday
featured: media/featured.png
---

I loved being in the mountains.

![mountains](media/mountains.png)

Almost as much as being in the sea!

:video{src="media/seaside.mp4"}
```

At build time the module [collates and serves](https://github.com/davestewart/nuxt-content-assets#how-it-works) assets and content together.

## Features

Built on top of [Nuxt Content](https://github.com/nuxt/content/) and compatible with any Nuxt Content project, including [Docus](https://github.com/nuxt-themes/docus) and [Nuxt Image](https://image.nuxtjs.org/).

User experience:

- co-locate assets with content files
- reference assets using relative paths
- supports any format (image, video, doc)

Developer experience:

- works with tags and custom components
- works in markdown and frontmatter
- file watching and asset live-reload
- image size injection
- zero config

## Links

- [GitHub](https://github.com/davestewart/nuxt-content-assets)
- [Demo](https://github.com/davestewart/nuxt-content-assets/tree/main/demo)
