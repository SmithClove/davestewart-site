---
description: Manage monorepo workspaces with a prompt-based CLI
date: 2022-10-01
tags:
  - library
  - tools
  - node
  - creative
github: davestewart/spaceman
media:
  thumbnail: ./images/spaceman-thumb.png
  featured: ./images/spaceman-light.png
  gallery:
    - ./images/spaceman-light.png
    - ./images/spaceman-dark.png
---

# Spaceman

## Overview

[NPM](https://docs.npmjs.com/cli/v7/using-npm/workspaces) [PNPM](https://pnpm.io/workspaces) or [Yarn](https://classic.yarnpkg.com/lang/en/docs/workspaces/) workspaces provide a streamlined workflow to manage multiple packages within a single repository, but require a certain amount of knowledge, configuration and terminal-fu for everyday tasks.

Spaceman makes running complex or multistep tasks easier by wrapping them in prompts, and batching commands on confirmation.

Why read the docs when you can just answer questions?

## Usage

Once installed, run the package by typing `spaceman` then pick the task you want to run:

![cli-preview.png](./screens/tasks.png)

For example, creating new workspaces is easy; just answer the prompts and Spaceman will create all folders, package files, stub files and install dependencies:

![cli-preview.png](./screens/workspace.png)

Once created, it's easy to share with other workspaces too; just follow the prompts:

![cli-preview.png](./screens/share.png)

## Tasks

Spaceman simplifies managing scripts, packages and workspaces:

**Scripts**

- [Run](https://github.com/davestewart/spaceman#run)<br>
  Run any root or package script

**Packages**

- [Install](https://github.com/davestewart/spaceman#install)<br>
  Install one or more packages to a workspace
- [Uninstall](https://github.com/davestewart/spaceman#uninstall)<br>
  Uninstall one or more packages from a workspace
- [Update](https://github.com/davestewart/spaceman#update)<br>
  Update one or more packages in a workspace
- [Reset](https://github.com/davestewart/spaceman#reset)<br>
  Remove all Node modules-related files in root and all workspaces, and reinstall

**Workspaces**

- [Share](https://github.com/davestewart/spaceman#share)<br>
  Make a workspace available for use within another workspace
- [Group](https://github.com/davestewart/spaceman#group)<br>
  Add a new workspace group
- [Add](https://github.com/davestewart/spaceman#add)<br>
  Add a new workspace
- [Remove](https://github.com/davestewart/spaceman#remove)<br>
  Remove an existing workspace

No more navigating folder structures and rewriting configs; Spaceman does it all from one simple CLI!

## Links

- [GitHub](https://github.com/davestewart/spaceman)
- [NPM](https://www.npmjs.com/package/spaceman)

