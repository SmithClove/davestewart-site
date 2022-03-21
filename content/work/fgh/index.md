---
description: In-house tooling for global strategic communications consultancy
date: 2021-10-01
tags:
  - webapp
  - frontend
  - backend
  - elasticsearch
  - node
  - nuxt
  - vue
  - api
  - ui
media:
  opengraph: ./images/fgh-dark.png
  thumbnail: ./images/fgh-dark.png
  gallery:
    - ./images/fgh-featured.png
    - ./screens/01-02-home-roxhill-login.png
    - ./screens/02-03-news-selection.png
    - ./screens/02-04-news-report.png
    - ./screens/03-02-mentions-chart.png
    - ./screens/04-01-contacts-index.png
    - ./screens/04-06-contacts-paste.png
    - ./screens/05-04-extension-browse-roxhill.png
    - ./screens/05-05-extension-add-contact.png
  select:
    - ./select/closed.png
    - ./select/typing.png
    - ./select/selected.png
---

# FGH Lexicon

## Overview

FGH is a global strategic communications consultancy (a PR firm to you and I) specialising in financial services clients.

As part of their work, associates have various tasks such as preparing daily and hourly news briefings for clients, work for presentations, and press releases for journalists. This is done using tools such as the Dow Jones [Factiva](https://professional.dowjones.com/factiva/) service, [Google Sheets](https://www.google.co.uk/sheets/about/), [Roxhill](https://roxhillmedia.com/) and [Gmail](https://www.google.com/intl/en-GB/gmail/about/).

Having to jump between various tools and complex UIs is time-consuming and inefficient so I lead the effort over several phases to build a suite of in-house tools to enable the team to move more-quickly.

## Implementation

### Architecture

Whilst the project aims changed over the various phases, the application itself is a [Nuxt JS](https://nuxtjs.org/) build with a custom [Express JS](https://expressjs.com/) back end, hosted on Microsoft Azure.

The back end manages and marshals calls to [Factiva API](https://www.factiva.com/CP_Developer/ProductHelp/FDK/FDK33/) and [Elastic Search](https://www.elastic.co/elasticsearch/), collating, transforming and returning data in frontend-friendly JSON formats:

```
+- api
|   +- modules
|   |   +- contacts
|   |   +- mentions
|   |   +- news
|   |   +- ...
|   +- services
|   |   +- factiva
|   |   +- elastic
|   +- ...
+- client
    +- ...
```

The front consists of 3 complex main modules. Building on modular techniques from [Asterisk](/work/asterisk/) and [Control Space](/products/control-space), I developed a new Nuxt plugin called [Nuxt Areas](https://github.com/davestewart/nuxt-areas) which rather than stripe dependencies across the application, co-locates code in self-contained "areas":

```
+- client
    +- areas
        +- app
        +- journalists
        +- mentions
        +- news
            +- components
            |   +- ...
            +- pages
            |   +- ...
            +- store
            +- ...
```


### Modules

#### News Search

The News Search was designed to provide a simplified UI to the more complex Factiva API / UI, allowing associates to search and compile news bulletins for clients. The final report was formatted specifically to be copied and emailed in plain text email.

Getting up to speed with Factiva and its API (and in Phase 2, Elastic Search) was a lot of work, and is the last time I will underestimate working with unknown 3rd party technologies and services! Not only was Factiva a legacy SOAP API, but it had 1000s of formal and custom parameters that needed to be scraped, stored and supplied to our local API to allow us to build a meaningful and useful UI when the application loaded.

This work in Phase 1 was on top of speccing and building a greenfield project and all the associated backend and frontend architecture and UI from scratch.

#### Journalists

The Journalists module introduced in Phase 2 was initially briefed as a set of in-app spreadsheets compiled by each associate, but it became clear that due to redundancy, it would be better to build a Gmail-style contacts database using information from both Factiva and Roxhill. This would allow journalists to be stored once, and be added to "distribution lists" in the same was as the "labels" functionality works in Google Contacts.

Additional features such as bulk import and Roxhill integration were also completed as the first step in a more advanced contact management system.

#### Roxhill bridge

FGH use a 3rd party service called Roxhill in order to contact journalists for tasks such as press releases, and the hope was that Roxhill data could be integrated with application.

However, two main problems existed; 1) Roxhill does not have an API 2) Factiva and Roxhill do not share common formats. To answer this, I built a Chrome extension to bridge communications between the application and Roxhill, and initial strategies to compare journalists by source and desk.

Associates could click a button in the application to search for a journalist by targeting an open Roxhill Media tab, then send journalist information back to Lexicon (by way of a right click menu) to be stored in Lexicon's own database. The two-way communication also allowed any journalist to be searched, viewed, or updated from the application or Roxhill.

#### Media Mentions

Media mentions was the last tool in the suite, which leverages the existing work from the News Search to search for keywords over time and collate the data into charts, with breakdowns by country, publication, journalist, etc.

This module was built on top of the existing architecture, and completed by [Ruud Niew](https://twitter.com/ruudniew).

## Links

People:

- [FGH](https://fgh.com)
- [Studio Overberg](https://www.studio-overberg.com/)
- [Ruud Niew](https://twitter.com/ruudniew)

Open Source:
 
- [Nuxt Areas](https://github.com/davestewart/nuxt-areas)
- [ES Kit](https://github.com/davestewart/es-kit)
