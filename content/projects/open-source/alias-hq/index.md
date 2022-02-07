---
description: The end-to-end solution for migrating to and using path aliases
date: 2020-08-01
tags:
  - library
  - tools
  - node
  - creative
github: davestewart/alias-hq
media:
  thumbnail: ./images/alias-thumbnail.png
  featured: ./images/alias-hq
  gallery:
    - ./images/logo-gradient.png
    - ./images/logo-3d-green.png
    - ./images/logo-3d-green-soft.png
    - ./images/logo-3d-stripes.png
    - ./images/logo-3d-yellow.png
    - ./images/logo-3d-dark.png
---
# Alias HQ

## Overview

Alias HQ makes setting up and using path aliases in JS/TS projects simple.

It takes the form of a Node CLI app and allows the user to:

- generate path aliases for existing projects
- consume the aliased paths in dependencies, such as WebPack, Jest, etc 
- convert projects from using relative paths to aliased paths

Alias works by piggybacking your project's existing `js/tsconfig.json` file and transparently converting the `compilerOptions.paths` to whatever format is required by the consuming plugin, library or application.

## Usage

Once you have configured the plugin, using aliases is essentially a one-liner.

Here's WebPack:

```js
import hq from 'alias-hq'

module.exports = {
  resolve: {
    alias: hq.get('webpack'),
  },
}
```

Here's Jest:

```js
import hq from 'alias-hq'

module.exports = {
  moduleNameMapper: hq.get('jest'),
}
```

You get the idea.

## Configuration

Alias HQ is installed as a normal project dependency, then runs as an interactive command line prompt.

It asks you sets of questions, a bit like a call waiting menu, which lead to tasks:

![cli-preview.png](./screens/cli-preview.png)

Steps are presented and confirmed in an easy to follow manner; for example, configuring paths:

![cli-paths.png](./screens/cli-paths.png)

## Integrations

Alias [integrates](https://github.com/davestewart/alias-hq/blob/master/docs/integrations.md) with a variety of frameworks and packages, and makes configuration a snap: 

![cli-debug.png](./screens/cli-debug.png)

## Source code conversion

With the "Update files" option, entire codebases can be configured and converted in *literally* seconds:

![cli-debug.png](./screens/cli-source.png)

It's pretty close to magic!

## Links

- [GitHub](https://github.com/davestewart/alias-hq)
- [Documentation](https://github.com/davestewart/alias-hq/tree/master/docs)

