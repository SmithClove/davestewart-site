---
description: Flash micro-site for HRH Prince Charles
date: 2009-03-05
tags:
  - flash
  - frontend
  - technical
  - social
  - video
media:
  thumbnail: ./images/rainforest-sos-feature-01.png
  gallery:
    - ./images/rainforest-sos-01.jpg
    - ./images/rainforest-sos-03.jpg
    - ./images/rainforest-sos-06.jpg
    - ./images/rainforest-sos-10.jpg
    - ./images/rainforest-sos-11.jpg
    - ./images/rainforest-sos-12.jpg
    - ./images/rainforest-sos-14.jpg
    - ./images/rainforest-sos-16.jpg
    - ./images/rainforest-sos-21.jpg
---

# Prince's Rainforest Project

## Overview

The Prince’s Rainforests Project is a charity set up by HRH The Prince of Wales to help tackle climate change through raising awareness of the devastating consequences of deforestation.

The Rainforest SOS campaign was backed by a host of stars, celebrities and leaders such as Daniel Craig, Harrison Ford, Pele, the Dalai Lama, who lent their time, faces and voices to the campaign. Each of the created a 10-20 second video "pledges", which were then post-produced to combine a 3D-animated frog by Framestore, the final output of which we were tasked to build an interactive application to help virally spread the Rainforest SOS message.

We empowered end users to add their own pledge via their web-cam, then create a video sequence online, mixing-in the pledges from more well-known faces, and ultimately sharing them social networks of the day.

## Implementation

The site was built in ActionScript 3 as a mainly slide/form-based application with interactive modules, such as the filming and playback components. We also used the Red5 open source video streaming server to provide playback with a mainly PHP back end to log and serve the submissions.

The main challenge in this job was getting the video to both record and play back correctly over the wide amount of connections available. Red5 was notoriously difficult to set up and get to function reliably, but we managed it in the end, and also achieved our playback goals through the use of command-line tools to generate final composited videos.

## Campaign success

The campaign has been a huge success. More than one million visitors from 209 countries/ territories have visited the project website, over ¼ million people have sent a Rainforest SOS message and the campaign has had 20,000 media mentions across TV, print, radio and online.

## Videos

<MediaVideo
  src="http://www.youtube.com/embed/boEDMVNAPk4"
  height="326"
  width="580"
/>

<MediaVideo
  src="http://www.youtube.com/embed/dIvhsp_mPOY"
  height="435"
  width="580"
/>

## Links

- [Moonshine Media](http://www.moonshinemedia.co.uk/portfolio/the-prince%E2%80%99s-rainforests-project/)
- [The Prince of Wales](http://www.princeofwales.gov.uk/the-prince-of-wales/initiatives/princes-rainforests-project)
- [Framestore](http://www.framestore.com)
