---
description: Online application allowing you to play along on the BBC website with grunting tennis players to the sounds of Angry Birds
date: 2011-06-05
tags:
  - creative
  - javascript
  - game
  - api
  - technical
  - mashup
  - concept
media:
  thumbnail: ./images/angry-tennis-birds.png
  video:
    src: http://youtube.com/embed/4zaDB_1PFrA
    width: 526
    height: 360
  images:
    - ./images/the-sun.png
---

# Angry Tennis Birds

## Overview

Let's face it: grunting tennis players are _incredibly_ annoying, and it seems to be getting more and more common in the women's game. So in the spirit of "if you can't beat them, join them" I created this mash-up to vent some of my vexation, write some fun code, have a giggle, and share with the world.

The app allows the user to "Angry Birds-ize" any external website, such as BBC Tennis, and "play along" to live tennis games using their keyboard, which trigger the comedic sounds from the Angry Birds games.

Playing [Angry Tennis Birds](http://angrytennisbirds.com/) makes any tennis match a fully interactive experience, with separate effects for shots (backswing and foreswing), victories, and crowd noises!

## Implementation

The HTML5 Google Chrome release of Angry Birds effectively open-sourced the game assets, so it wasn't too much of a stretch to use them in a mash-up.

The app is run on external sites using a JavaScript injection via a JavaScript bookmarklet, dragged from an original source on the Angry Tennis Birds website.

The application itself is JavaScript, with a tiny visual front-end, and a Flash audio player.

## Press

Interestingly, after releasing Angry Tennis Birds at the start of the 2011 Wimbledon championship and publicising it as much as I possibly could on twitter, facebook, and via friends, a week or so later an article appeared in the Sun newspaper titled "Angry Birds - Grunting girls noisier than creatures on app" :

![](./images/the-sun.png)

I emailed the paper subsequent times... but as soon as the topic came up, communication stopped. Read into that what you will!

## Links

- [Angry Tennis Birds](http://angrytennisbirds.com/)
- [The Sun: Angry Birds - Grunting girls noisier than creatures on app](http://thesun.co.uk/sol/homepage/news/3671271/Grunting-girls-make-racket-at-Wimbledon.html)
