---
description: The end-to-end solution for configuring, refactoring, maintaining and using path aliases
date: 2020-08-01
tags:
  - library
  - tools
  - node
  - creative
media:
  thumbnail: ./images/logo-3d-stripes.png
  featured: ./images/alias-gradient.gif
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

Alias HQ is a Node CLI application that aims to be the end-to-end solution for managing, maintaining and using path aliases in JavaScript and TypeScript projects.

It allows the user to:

- generate path aliases for existing projects
- convert existing relative paths in source code to aliased paths
- consume the aliased paths in dependencies, such as WebPack, Jest, etc 

Configuration piggybacks `js/tsconfig.json` files which are now standard in JavaScript projects.

## Usage

Once you have configured Alias, and run the migrations, using aliases is essentially a one-liner.

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

Alias [integrates](https://github.com/davestewart/alias-hq/blob/master/docs/integrations.md) with a variety of frameworks and packages, and makes it simple to convert existing projects: 

![cli-debug.png](./screens/cli-integrations.png)

Projects can be configured and converted in under a minute.

It's pretty close to magic.

## Links

- [GitHub](https://github.com/davestewart/alias-hq)
- [Documentation](https://github.com/davestewart/alias-hq/tree/master/docs)

