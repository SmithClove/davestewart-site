---
description: Highly-scripted 3D animation sequence
draft: true
date: 2006-10-08
tags:
  - creative
  - animation
  - 3d
  - after-effects
  - technical
  - plugin
  - 3dsmax
  - concept
media:
  thumbnail: ./images/jetix-thumbnail.jpg
  gallery:
    - ./images/jetix-02.jpg
    - ./images/jetix-03.jpg
    - ./images/jetix-04.jpg
    - ./images/jetix-05.jpg
    - ./images/jetix-06.jpg
    - ./images/jetix-07.jpg
    - ./images/jetix-08.jpg
    - ./images/jetix-09.jpg
    - ./images/jetix-10.jpg
    - ./images/jetix-11.jpg
    - ./images/jetix-12.jpg
    - ./images/jetix-13.jpg
    - ./images/jetix-14.jpg
    - ./images/jetix-15.jpg
    - ./images/jetix-16.jpg
    - ./images/jetix-17.jpg
    - ./images/jetix-18.jpg
---

# Jetix: "My Jetix" promo

## Overview

Having done a fair bit of promo work with Jetix (formally Fox Kids) before, we were asked to produce 8 different promo spots, in 8 languages, over 8 weeks, potentially meaning 8 x 8 x 30" of animation!

Obviously, that would be completely unrealistic, so we needed to find a way to animate once, but easily change the look and feel, or swap-out elements of the final output, to scale-up the output but keep effort at a reasonable level.

## Idea

The client's idea for the weekly spot was to pitch opposing characters against each other in a kind of "battle" scenario, one of which would be shown during the next week's schedule, depending on how viewers voted via phone or web.

After working through various ideas, we submitted a roller-coaster storyboard, where opposing characters would race each other through the twists and turns of a roller-coaster track. We would build and animate the track and shots in 3D, but would composite the characters in, in post production using techniques I would pioneer over the course of the project.

## Implementation

### Building the track

The first challenge was to build an exciting 3D track using standard 3dsmax tools. Unfortunately, as the track was so twisty and turney, I had to build a new 3dsmax modifier plugin called "Twist Profile", which rotated a mesh's vertices around a central axis, using a user-defined "profile" curve to denote the amount of twist at any point.

This worked great for small amounts of vertices, but for a large, broadcast-level animation 3dsmax's scripted plugins quickly found their limits, so I got help in rebuilding it as a fully-fledged C++ plugin. The performance difference between the two plugins was like night and day! But the concept in both was solid.

### Managing the character animations

The second challenge was to setup and manage the rendering and post-production of the animated characters. This was achieved through attaching 3D, camera-facing cards to the roller-coaster cars, then mapping the physical 3D space from 3dsmax to the 2D space in After Effects, and compositing 2D animated characters onto the 3D rendered footage.

Again, this was accomplished through programming, both on the 3dsmax side to export the data, and on the After Effects side to import the data, apply a Corner-Pin to the 2D characters onto the 2.5D space, then apply the masked layers to achieve the illusion of foreground and background.

### End result

This was a really enjoyable project, and it was extremely satisfying to take responsibility for everything from storyboarding, modelling, animation, plugin-writing, compositing, and final look and feel, but especially the breaking of new technical ground, and delivering on the client's goals, whilst retaining our sanity!

## Links

- [Huge Designs](http://hugedesigns.co.uk/news)
