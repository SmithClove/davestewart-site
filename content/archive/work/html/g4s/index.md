---
description: Cross-device HTML5 story-style animation
date: 2014-08-01
tags:
  - frontend
  - javascript
  - animation
  - html
media:
  thumbnail: ./images/g4s-feature.png
  gallery:
    - ./images/g4s-01.png
    - ./images/g4s-02.png
    - ./images/g4s-03.png
    - ./images/g4s-04.png
    - ./images/g4s-04a.png
    - ./images/g4s-05.png
    - ./images/g4s-06.png
    - ./images/g4s-07.png
    - ./images/g4s-08.png
    - ./images/g4s-09.png
---

# G4S: "How it Works" Animation

## Overview

I worked with [Skylark Creative](http://www.skylarkcreative.co.uk) to build a cross-device story-style animation in HTML5, to show how G4S's cash collection service represents good value for money for the small business.

The story illustrates the journey of a cash bundle, from the customer's till, then safe-and-secure to the G4S depot, and finally the digital step to their bank account.

## Implementation

_"Look Ma, no Flash!"_

The animation was built entirely in HTML5 and JavaScript powered by GreenSock's TimelineMax, and a custom framework I developed over a few weeks called GreenSock Scene Manager, which mirrors the Flash authoring environment with named scenes, layers, sprites, etc.

The purpose of the framework was to provide an easy way to setup and manage the many on-screen elements within the JavaScript code, and reuse elements across scenes without having redundant duplication.

Along with this, I developed a fairly robust visual GSAP Controller element, which can be included in any GSAP animation just by including the script on the page.

The final animation took much longer to set up that I could have imagined before tackling this kind of project, unfortunately, ultimately taking weeks not days. A lot of time was spent getting to know the GSAP framework, along with some (though very few!) of its idiosyncrasies, and leveraging the power within. however, once the overall code structure and numerous refactorings (7 at the last count) had taken place, things really started to flow!

Around the physical animation was structured the rest of the functionality, including the navigational elements, informational elements, and popovers, all responsive, of course.

## Links

The final animation:

- [g4scashcollections.com/static/business-benefits/how-it-works/](https://g4scashcollections.com/static/business-benefits/how-it-works/)

Technical elements:

- [davestewart.io/plugins/gsap/gsap-scene-manager/](http://davestewart.io/plugins/gsap/gsap-scene-manager/)
- [davestewart.io/plugins/gsap/gsap-controller/](http://davestewart.io/plugins/gsap/gsap-controller/)
