---
description: UX & UI improvements to the FastMail web client
date: 2022-04-16
tags:
- productivity
- chrome-extension
- tools
- email
media:
  thumbnail: ./images/better-fastmail.png
  opengraph: ./images/better-fastmail.png
  featured: ./images/better-fastmail.png
---

# Better FastMail

## Overview

The FastMail web client is fantastic, but has a few UX/UI quirks that could be improved:

- Common [keyboard shortcuts](https://www.fastmail.help/hc/en-us/articles/360058753534-Keyboard-shortcuts) are not exactly intuitive
- The editor component does not [properly support indented text](https://twitter.com/dave_stewart/status/1512472229220700171)
- The main menu takes too many clicks to switch accounts

## Improvements

### Better UI

Folders

- Nesting indentation is more obvious

Editor

- Blockquote styling has been reset so indents look like indents (and not quoted replies)

Main Menu

- Switch users directly from the main menu dropdown

### Better shortcuts

> Note that `Mod` (short for "modifier") is `Cmd` on Mac and `Ctrl` on PC

List navigation

- `Up`                          - Previous item
- `Down`                        - Next item
- `Backspace`                   - Delete item

List selection

- `Shift`+`Up/Down`             - Expand/contract selection
- `Space`                       - Toggle item selection
- `Escape`                      - Cancel selection

Archiving

- `Mod`+`Up`                    - Archive mail item and read previous
- `Mod`+`Down`                  - Archive mail item and read next

Folders

- `Alt`+`Up`                    - Previous folder
- `Alt`+`Down`                  - Next folder
- `Alt`+`Left`                  - Close folder
- `Alt`+`Right`                 - Open folder

Editor

- `Tab`                        - Indent blockquote / list item
- `Shift`+`Tab`                - Outdent blockquote / list item

Main menu

- `Mod`+`Click` "Switch Users" - add new user
- `Click` new user             - switch to user
- `Mod`+`Click` new user       - delete user

## Installation

Visit the [Better FastMail](https://chrome.google.com/webstore/detail/better-fastmail/djjbcjbeiifedilgkohllahmnjlmcnmh) page on the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) then click the "Add to Chrome" button.

_You will need to reload any loaded FastMail webmail client pages after installation._

## Links

- [Chrome Web Store](https://chrome.google.com/webstore/detail/better-fastmail/djjbcjbeiifedilgkohllahmnjlmcnmh)
- [GitHub](https://github.com/davestewart/better-fastmail)
