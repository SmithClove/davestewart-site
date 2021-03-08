---
description: Ground-breaking video application that allows everyday users to sing along to and star in their own pop music videos
date: 2014-10-21
tags:
  - flash
  - frontend
  - as3
  - ui
  - api
  - video
  - ugc
media:
  thumbnail: ./images/mixoff-featured.png
  gallery:
    - ./images/mixoff-01.jpg
    - ./images/mixoff-02.jpg
    - ./images/mixoff-03.jpg
    - ./images/mixoff-04.jpg
    - ./images/mixoff-05.jpg
    - ./images/mixoff-06.jpg
    - ./images/mixoff-07.jpg
    - ./images/mixoff-08.jpg
    - ./images/mixoff-09.jpg
    - ./images/mixoff-10.jpg
    - ./images/mixoff-11.jpg
    - ./images/mixoff-12.jpg
    - ./images/mixoff-13.jpg
    - ./images/mixoff-14.jpg
    - ./images/mixoff-15.jpg
    - ./images/mixoff-16.jpg
---

# TalkTalk / X Factor - Mix Off

## Overview

TalkTalk’s Mix Off is a ground-breaking new app in association with X Factor, that lets anyone create amazing music videos, with the best ones shown on TV:

<MediaVideo
  src="https://youtube.com/embed/eydJ_ZYGLvY?list=PLMxe_u2iNeIkwp945hbOYrivGJYxUiu0j"
  width="560"
  height="315"
/>

The user picks from a selection of chart-topping audio tracks and professionally-created video styles, and can even customize the appearance of the video with additional options. After recording themselves via their web cam or phone, they can sing, dance and get creative, then preview their work, and even add friends to the same mix.

Once complete, their recordings can be shared on social media via a special [Mix-Off URL](https://mixoff.tv/pMmT2QW) and are shown on the [Mix Off  gallery page](https://mixoff.tv/?page=gallery).

## Implementation

Working in-house at [MPC ](https://moving-picture.com/), I was tasked with building the desktop app (the Android and iOS apps having already been built) in Flash, being the only logical choice as it required use of a webcam and needed to work on an average home computer.

We used the [Wowza](https://wowza.com/) streaming video service to record the videos. These were then processed by a custom back end, logged in the CMS, then sent to a dedicated render farm to be composited into the final videos the user sees.

Being an ambitious turnaround of 4 weeks, the time was broken down as follows:

- Asset build
- Component build
- Wowza / webcam testing
- API integration and testing
- Application build
- User journey
- Polishing
- Testing and deployment

The app had several notable components which took up the majority of ActionScript development cycle:

- Video player & recorder
- API (REST client, services, models)
- Configuration and bootstrap
- Form validation
- Custom UI elements

The build pipeline was fairly typical: assets were created in Flash Pro and exported in SWC format, then built into the app along with the core classes which (along with other Flash code from previous projects) will form my new Open Source [Flash Core](https://github.com/davestewart/flash-core) repository.

Having worked on a [similar project](http://davestewart.co.uk/work/flash/rainforest-sos/ "Prince’s Rainforest Project") a few years ago, there were no real show-stoppers, it was just a case of staying organised, building robust code, and working well with the rest of the (excellent) team.

## Bop Heads

Update: I also worked on the following year's Bop Heads app.

## Links

Mix Off app

- [Flash app](http://mixoff.tv/webapp)
- [Main Site](http://mixoff.tv/)
- [Gallery](http://mixoff.tv/?page=gallery)
- [On-air spot](https://youtube.com/watch?v=eydJ_ZYGLvY)

Bop Heads app

- [MPC](http://moving-picture.com/work/talktalk-x-factor-bopheads)
- [AOL](http://aol.co.uk/entertainment/2015/09/01/talktalk-tv-s-new-x-factor-app-will-give-fans-a-taste-of-super-s/)

Press

- [TalkTalk X Factor channel](https://youtube.com/user/TalkTalkXFactor)
- [Digital Arts Online](http://digitalartsonline.co.uk/news/mobile-creativity/mpc-creatives-mix-off-app-puts-x-factor-viewers-in-frame/)
- [The Drum](http://thedrum.com/news/2014/08/30/x-factor-fans-will-be-able-star-shows-sponsorship-idents-thanks-talktalk)
- [Mobile Marketing](http://mobilemarketingmagazine.com/talktalk-xfactor)

Related

- [MPC](http://moving-picture.com/work/talktalk-x-factor-bopheads)
- [X Factor](http://itv.com/xfactor)
- [TalkTalk](http://talktalk.co.uk/)
- [CHI](http://chiandpartners.com/our-work)
