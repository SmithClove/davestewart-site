---
description: In-house tooling to generate client bulletins and insight
date: 2020-10-01
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
  opengraph: ./images/finsbury-logo-dark.png
  thumbnail: ./images/finsbury-logo-dark.svg
  gallery:
    - ./screens/home.png
    - ./screens/search-empty.png
    - ./screens/search-simple.png
    - ./screens/search-simple-options.png
    - ./screens/search-result.png
    - ./screens/search-result-selection.png
    - ./screens/report.png
  select:
    - ./select/closed.png
    - ./select/typing.png
    - ./select/selected.png
---

# Finsbury PR

## Overview

Finsbury is a global PR firm based in London and New York specialising in financial services clients.

As part of their work for clients, they send daily and sometimes hourly news briefings using the Dow Jones [Factiva](https://professional.dowjones.com/factiva/) service. The service has many advanced features and a complex UI which although powerful, is cumbersome for this daily workflow.

Working [Studio Overberg](https://www.studio-overberg.com/) we created a lightweight Factiva client, enabling the team to more-quickly curate and send aggregated news bulletins.

## Implementation

### Architecture

The application is a [Nuxt JS](https://nuxtjs.org/) build with a custom [Express JS](https://expressjs.com/) back end, hosted on Microsoft Azure.

### Back end

There are three main search functions, all routed via the local API:

- Articles: querying the [Factiva API](https://www.factiva.com/CP_Developer/ProductHelp/FDK/FDK33/) using the SOAP protocol

- Companies and Executives: querying an [Elastic Search](https://www.elastic.co/) datastore
- Parameters: again using Elastic, called when the application starts

The main units of work were:

- building the local API on top of Express which could provide a common interface to all data

- learning and working with the legacy Factiva SOAP API and refactoring initial prototype code
- learning the elastic syntax and querying the datastore

### Front end

This ended up being one of those classic project which had hidden layers of complexity.

We worked closely with both the end users and Finsbury's Principle Data Scientists to engineer the correct search criteria, ultimetely delivering a simple but effective end-user search experience.

One of the most enjoyable bits of the project was creating a minimal UI to match the company's site. Here's our version of [Vue MultiSelect](https://vue-multiselect.js.org/) with some tight styling and boolean search options:

<MediaGallery media="select" />

## Links

- [Finsbury PR](https://finsbury.com)
- [Studio Overberg](https://www.studio-overberg.com/)
