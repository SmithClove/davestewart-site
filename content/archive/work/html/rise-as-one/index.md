---
description: Front end development for Rise as One World Cup campaign
shortTitle: Rise As One
date: 2014-06-12
tags:
  - webapp
  - html
  - responsive
  - javascript
  - video
media:
  thumbnail: ./images/budweiser-feature.png
  gallery:
    - ./images/rise-as-one-01.jpg
    - ./images/rise-as-one-02.jpg
    - ./images/rise-as-one-03.jpg
    - ./images/rise-as-one-04.jpg
    - ./images/rise-as-one-05.jpg
    - ./images/rise-as-one-06.jpg
    - ./images/rise-as-one-07.jpg
    - ./images/rise-as-one-08.jpg
    - ./images/rise-as-one-09.jpg
    - ./images/rise-as-one-10.jpg
    - ./images/rise-as-one-11.jpg
    - ./images/rise-as-one-12.jpg
    - ./images/rise-as-one-13.jpg
    - ./images/rise-as-one-14.jpg
---

# Budweiser: Rise As One

## Overview

Budweiser's Rise as One campaign is a celebration of the often unseen sides of footballing culture throughout the world, and in collaboration with Vice and Fox Sports we helped to tell some truly amazing and personal stories from around the globe:

- [Palestine's First Female Football League](https://youtube.com/watch?v=Y5Zp55tEAa4)
- [Chinese Man Digs Football Pitches by Hand](https://youtube.com/watch?v=o2SIaOE74CY)
- [Breaking Barriers: United States vs. Iran, 1998 World Cup](https://riseasone.com/en/us#!/en/us/Detail/63308)

This final phase of the The Rise as One campaign's site, in the lead-up and over the World Cup, site is a mash-up of YouTube, Facebook, Twitter and user generated content in a portal-style environment.

For this project, I worked in-house as the front-end lead at [Grand Union](https://thegrandunion.com/) in a team of around 6.

## Implementation

The site's design and development was an organic process, and it ended up as a single page application, though without using a framework like Backbone. At the time of redesign we anticipated have separate pages and URLs like the existing site, but as new client amends were taken into consideration, it became obvious that treating the grid as a single, fluid entity for displaying content was the way forward.

Each of the grid items in the grid layout was designed as a card with 2 faces - the front showing the content preview, then flipping over when clicked to reveal the back, which would then load in the content from whatever internal or external APIs it needed to. Once the content was loaded, the card back would expand to show the content, and in the case of video content, would allow additional content to be loaded by clicking on additional video thumbnails.

The separate content types were powered by custom jQuery widgets, and I developed a custom [Packery](https://packery.metafizzy.co) implementation for the grid layout, that featured auto-focus, scrolling, keyboard navigation, and tile transitions. CSS 3D transforms and image filters were added to add a bit of flair to the user experience, degrading on less-capable and mobile browsers.

The back end was powered by .net, but most interestingly, I developed the prototype of the site using [Mixture](https://mixture.io), a rapid front-end development toolset for Mac and Windows that allowed me to quickly build and test ideas, all on the front end, and without the need to customise the existing back end.

The final site was released over 4 "hubs" (locales) and featured 5 different content types: Image, Video, Facebook, Twitter and Gallery.

## Links

- [riseasone.com](https://riseasone.com)
