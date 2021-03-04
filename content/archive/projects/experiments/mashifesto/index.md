---
description: Twitter mash-up, winning 3rd place at the Digital Sizzle Art Hack 2013
date: 2013-08-12
tags:
  - api
  - html
  - javascript
  - data
  - technical
  - mashup
  - hackathon
  - award
media:
  gallery:
    - ./images/mashifesto_sizzle.jpg
    - ./images/mashifesto_beards.jpg
    - ./images/mashifesto_workspace.jpg
    - ./images/mashifesto_intro.jpg
    - ./images/mashifesto_Layer-1.jpg
    - ./images/mashifesto_mashifesto_1.jpg
    - ./images/mashifesto_mashifesto_2.jpg
    - ./images/mashifesto_mashifesto_3.jpg
    - ./images/mashifesto_posters.jpg
    - ./images/mashifesto_stickers.jpg
---

# Mashifesto

## Overview

Mashifesto was the 3rd-place winner of this year's [Digital Sizzle Art Hack](http://techcitynews.com/2013/07/29/3beards-art-hackathon-review-and-winners/) by the [3 Beards](http://www.3-beards.com/about.html). It was also exhibited with other winning entries for 2 weeks in [The Barbican](http://www.barbican.org.uk/), London, as part of the [Hack the Barbican](http://hackthebarbican.org/) festival.

The overall context for the weekend was "art meets tech" with an emphasis on data, and access to a whole host of APIs and datasets.

Our entry was a Twitter mash-up, encouraging users to tweet our Mashifesto Twitterbot which would respond by examining their Twitter feed to return a visual mash-up of 2 separate tweets, with some linking phrases to create significant-sounding nonsense, presented in the style of Russian propaganda art.

The concept was to add significance to the trivial, allowing machine intelligence to make a mockery of the billions of tweets sent per week, creating (at times) some unintentionally-amusing results.

## Implementation

The application was conceptualised and built from 8pm on a Friday through 3pm on a Sunday, by a team of 7 creatives and developers.

The back-end of the site was a Ruby on Rails app hosted on [Heroku](https://herokuapp.com/), and built mainly by Michael with input from Al. The app would process a user's twitter feed, apply some natural -language processing on the tweets, then do its best to create a new "Mashifesto". These were then stored along with data regarding the user and tweets, to be pulled from the front end.

I built the front-end of the app, which was a simple home-rolled MVC JavaScript framework, responsible for pulling and caching the Mashifestos, displaying the intro, populating animation templates, and cycling though available content.

For the Private View, I also ported the existing JavaScript app to an Adobe AIR (ActionScript) app so we could browse available Mashifestos, and successfully print Mashifesto stickers to be given away on the evening and subsequent exhibition (as good as HTML5 is, print-perfect printing is not yet viable).

Al and Romaine handled the animation side of things, with Al laying out the statements using CSS and animating using [Greensock](http://www.greensock.com/v12/), and Romaine building the intro animation in After Effects and having input on design.

Joanna took charge of the over creative direction of the project, designing the look and feel, with Annem and Sabrina working on the planning, natural-language processing, and generated output, and generally working hard to pull any loose strings together.

## Team

Our team comprised:

- [Joanna Alpe](https://twitter.com/joannaalpe), direction and design
- [Sabrina McEwan](https://twitter.com/sabrinamcewen) and [Annem Rehman](https://twitter.com/rubyannem), conceptual development and comms
- [Michael Shannon](https://twitter.com/michaelrshannon), back-end development
- [Dave Stewart](https://twitter.com/dave_stewart/), front-end development
- [Al North](https://twitter.com/al_north), front-end animation + back-end support
- [Romaine Reid](https://twitter.com/RomaineReid), motion graphics

Having attended 3 hackathons this year, I can say that this was by far the most successful in terms of delivery, for a variety of reasons:

1. It was fantastic to be part of a larger team, and distribute the work equally
2. We were all normal, friendly people, up for sharing ideas, planning, and doing
3. All members of the team fitted into clearly-defined roles, with skills-enough to deliver

With regards to the Hackathon itself, hats off to the Beards; they did an amazing job pulling so many interesting people into a single wonderful, space. And also thanks to the sponsors and [South Place Hotel](http://www.southplacehotel.com/) who helped make it all happen.

## Links

- [3 Beards Art Hackathon: Review and Winners](http://techcitynews.com/2013/07/29/3beards-art-hackathon-review-and-winners/)
- [mashifesto.org](http://www.mashifesto.org/)
- [@mashifesto](https://twitter.com/mashifesto)
