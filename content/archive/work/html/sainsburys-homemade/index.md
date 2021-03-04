---
description: Coming in as a front end developer, I developed new features including a major overhaul of the search / find / filter / render lifecycle for this major food portal.
date: 2015-02-28
tags:
  - front-end
  - html
  - responsive
  - javascript
  - html5
media:
  featured: ./images/homemade-02.jpg
  gallery:
    - ./images/homemade-01.jpg
    - ./images/homemade-02.jpg
    - ./images/homemade-03.jpg
    - ./images/homemade-04.jpg
    - ./images/homemade-05.jpg
    - ./images/homemade-06.jpg
    - ./images/homemade-07.jpg
    - ./images/homemade-08.jpg
    - ./images/homemade-09.jpg
    - ./images/homemade-10.jpg
    - ./images/homemade-11.jpg
    - ./images/homemade-12.jpg
---

# Sainsburys: Homemade

## Overview

Sainsburys [Homemade](http://homemadebyyou.co.uk) is a new food portal in association with Huffington Post, leveraging a variety of food networks to bring tens (if not hundreds) of thousands of recipes under the Sainsburys banner, competing with the likes of [BBC Good Food](http://www.bbcgoodfood.com/).

The site was launched in late 2014 by [Full Six](http://www.fullsixuk.com/project/homemade/), and I was brought in this year to provide some post-launch muscle, as well as develop new features and refactor some existing ones.

## Development

Apart from bug fixing, tweaking existing code, and developing new features, my main contribution to the site was the overhaul of the **search / find / filter / render** lifecycle:

### Cross-device improvements

The existing site had separate menu systems for desktop and mobile filtering / tagging. I consolidated the existing systems into a single responsive L1 and L2 menu structure that would collapse, reformat and behave differently depending on the screen size.

It used the same HTML for both formats, utilising JavaScript to make some minor under-the-hood restructuring, and media queries to swap out the styles, between devices and breakpoints.

### Functionality and interaction

The existing filtering mechanism performed an OR search on available tags, widening of the result set, and also requiring a "submit" before results could be viewed.

We switched this to an AND search, narrowing the result set, and requesting results immediately, replacing those which no longer satisfied the filter criteria, and caching those already loaded on an item-by-item basis.

Additionally, by requesting an initial map of tags > recipe ids, I was able to provide immediate feedback on the menu system upon user interaction, greying-out null matches immediately - which previously would have returned a "no matches" result from the server.

### Rendering optimisations

Additionally, I implemented a variety of search-engine and user-experience optimisations such as:

- rendering the initial results in the page as HTML, then caching them individually
- re-rendering cached results immediately
- rendering placeholder elements in lieu of new results being returned from the server
- preventing flooding and out-of-order responses in the predictive search

All this added up to a much snappier user experience, and far less load on the server.

### Additional improvements

Including:

- removing a substantial amount of duplicate or unnecessary / legacy code
- consolidating and substantially reducing the amount of HAML templates needed server-side
- moving the rendering of _all_ templates to the server
- substantially reducing client-side complexity, improving runtime performance and user experience
- applying a more rigorous OO methodology to existing / new JS components

## Impact on codebase

- The client side JavaScript was completely rewritten from 17 files and 2000 lines of code to 10 files and 1700 lines of code
- JavaScript code was clarified by increasing comments from an average of 5% per file (92 lines in total) to 35% per file (618 lines in total) - including DocComments
- The 11 server side HAML templates were reduced from 27k/575 lines to 3.5k/130 lines, a reduction of around 8/4 times
- Code clarity and intention was increased by a rigorous approach to formatting, DocComment and intentional commenting throughout

See this shared spreadsheet for an analysis:

[](./images/homemade-code-vs-comments1-580x346.png)

## Summary

The Homemade site now has a really nice lifecycle for searching, loading, filtering and re-loading results, is fully responsive across desktop and mobile devices, and has had a substantial reduction in code complexity on both the server and client side.

## Links

- [Sainsbury's Homemade](http://homemadebyyou.co.uk)
- [Full Six](http://www.fullsixuk.com/project/homemade/)
