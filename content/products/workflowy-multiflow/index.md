---
description: Multi-column view for WorkFlowy
date: 2021-03-01
tags:
  - productivity
  - chrome-extension
  - tools
  - creative
media:
  thumbnail: ./images/multiflow-thumb-01.svg
  opengraph: ./images/multiflow-featured.png
  featured: ./images/multiflow-featured.svg
---

# WorkFlowy MultiFlow

## Overview

WorkFlowy MultiFlow adds a multi-column view to WorkFlowy.

This lets you maintain an overview and manage relationships between several trees at once.

Here's a video of the 1.0 version of WorkFlowy to give you an idea of how to use it:

<MediaVideo src="https://youtube.com/embed/Iy1DuGjUhR4" width="560" height="315" />


## Contents

Learn how to use MultiFlow:

- [Installation](#installation)
- [Working with columns](#working-with-columns)
- [Moving data around](#moving-data-around)
- [Options panel](#options-panel)
- [Sessions](#sessions)

Get support:

- [Troubleshooting](#troubleshooting)
- [Extension Interoperability](#extension-interoperability)
- [Browser compatibility](#browser-compatibility)
- [Planned features](#planned-features)
- [Support](#support)
- [Links](#links)

## Installation

Visit the [Chrome Web Store](https://chrome.google.com/webstore/detail/workflowy-multiflow/khjdmjcmpolknpccmaaipmidphjokhdf?hl=en-GB) and click the "Add to Chrome" button.

When the icon pops up in the toolbar, you'll want to *pin* it:

- Click on the icon and Select "Pin"
- If you lose the icon, click on the Extensions menu, fine MultiFlow, and click the "Pin" icon

If you have any WorkFlowy tabs open, you may need to reload them.

## Working with columns

### Opening columns

You can open new columns by Cmd/Ctrl+Clicking on:

- Bullets
- Internal links to other WorkFlowy pages
- The last breadcrumb item (the page title)

The first time you open a new column, it will reload the current column and the new column into frames:

![](./screens/loading.png)

Once loaded, you should see both your previous and new column:

![](./screens/2-columns.png)

### Updating content

To change the content of the right column, Cmd+Click any link on the left to change the content (this time it should be instant):

![](./screens/2-columns-alt.png)

As you can see, I keep some links in the bullet comments at the top of my schedule to allow me to quickly jump to my "Distractions" list!

You can then use your browser's "Back" button to go back (History works as you would expect!).

Note that Cmd/Ctrl+Clicking in a column will **always** open the link / bullet in a frame on the right, so you can open as many columns as you like: 

![](./screens/3-columns-loading.png)

### Closing columns

To close a column, click the &times; button top right.

If you only have two columns, and you close one, you will be switched back to normal WorkFlowy.

Note that MultiFlow will save all frames (unless you Cmd/Ctrl click the &times; ) when you close them, so when you open new columns, they will "appear" to load instantly.

## Moving data around

Unfortunately, the limitation of HTML frames means you can't drag and drop bullets. That would be amazing, but you'll have to wait for the WorkFlowy team to build this functionality.

However, you can **cut and paste**!

Simply select one or more bullets in one panel, cut them, and paste them in another panel.

Depending on where you cut and paste to-and-from, the paste should be instant, but you may notice a short delay for related frames to update as the data is synced in the background.

## Options panel

Click the MultiFlow icon in the browser toolbar to see options:

![](./screens/options-panel.png)

The panel has been simplified in v1.6 to just Layout and Sessions.

The layout options provide various layouts, including "Left-hand navigation" which can be useful for things like boards:

![](./screens/left-layout.png)

## Sessions

You can also save and load sessions, by clicking the "Save Session" button in the panel:

![](./screens/sessions.png)

Once you have more than one session, load, update, or save new ones, as well as reorder with drag and drop.

Note that sessions are saved with the extension. Uninstalling the session will delete any saved sessions.

## Appendix

### Troubleshooting

There are a couple of issues which have come up, which are easily solved:

- **you can only open two panes**: disable the WorkFlowy setting "Open links in app"
- **you can't see sessions**: reinstall the plugin
- **clicking bullets doesn't duplicate them at all**: check the DevTools console (`Opt+Cmd+I` or `F12`) for MultiFlow logs:

```
MultiFlow: running!
MultiFlow: updating page structure
MultiFlow: loading settings
MultiFlow: checking for session...
MultiFlow: waiting for load...
MultiFlow: page ready!
```

If you don't see these logs, it means Multiflow didn't run. I'm not sure why this is, but I've tricked Chrome out of this state by by first visiting [beta.workflowy.com](https://beta.workflowy.com) then [workflowy.com](https://beta.workflowy.com).

### Extension Interoperability

As of Version 1.6, WorkFlowy [enables other extensions](https://github.com/davestewart/workflowy-multiflow#extension-interoperability) to query and even hook into MultiFlow state changes.

Extension developers will need to _opt in_ to this functionality using the [interop code](https://github.com/davestewart/workflowy-multiflow/blob/main/src/interop/multiflow.js) provided.

#### WFx users

For [WFx](https://chrome.google.com/webstore/detail/wfx-for-workflowy/jbehgpdjkcconnaagjhddddfdajbpfhi) users, whilst you wait for [RawBytz](https://twitter.com/rawbytz) to update his extensions, you can wrap your WFx scripts with the following code to make them compatible _now_:  

```js
// multiflow helper
function getWindow () {
  const body = document.body
  const mode = body.getAttribute('data-mode')
  if (mode === 'multiflow') {
    const frames = document.querySelectorAll('#multiflow iframe')
    const index = body.getAttribute('data-focused')
    return frames[Number(index) || 0].contentWindow
  }
  return window
}

with (getWindow()) {
  // paste your script here
}
```

### Browser compatibility

Right now MultiFlow only works on Chromium browsers, that is Chrome, Brave, Edge, etc.

Could I make it work on Firefox? Probably, but I don't have the time right now, sorry!

### Planned features

There are some nice-to-haves which I may (or may not) find the time to work on:

- **resizing frames**: there is a [Vue package](https://antoniandre.github.io/splitpanes/) which should make this possible
- **save single panel sessions**: so you just use one list to access favourites
- **documentation site**: it might be easier than this page

<!--
- doesn’t work as well on Beta *(fix is currently in review)*
- doesn’t work on www.workflowy (vs just [https://workflowy](https://workflowy/)) *(fix is currently in review)*
- doesn’t work in chrome app *(I think it does, so happy to shown if it’s not)*
-->


## Support

If you need help, catch me on the WorkFlowy User Group, or just [tweet](https://twitter.com/compose/tweet?text=@davestewart) me, and I'll see what I can do!

If you install WorkFlowy, and like it, please rate it and leave a nice review on the [Chrome Web Store](https://chrome.google.com/webstore/detail/workflowy-multiflow/khjdmjcmpolknpccmaaipmidphjokhdf?hl=en-GB).

You can also show support on Product Hunt:

<a href="https://www.producthunt.com/posts/workflowy-multiflow?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-workflowy-multiflow" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=286232&theme=light" alt="WorkFlowy MultiFlow - Columns view for WorkFlowy | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

I hope you enjoy using MultiFlow!

## Links

- [Chrome Web Store](https://chrome.google.com/webstore/detail/workflowy-multiflow/khjdmjcmpolknpccmaaipmidphjokhdf)
- [Indie Hackers](http://indiehackers.com/product/workflowy-multiflow)
- [Product Hunt](http://producthunt.com/posts/workflowy-multiflow)
- [Reddit](http://reddit.com/r/Workflowy/comments/l9eoqz/workflowy_multiflow_navigate_organise_maintain/)

