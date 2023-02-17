---
description: Web and mobile app to track, manage and discuss NFT collections
xdate: 2022-04-01
tags:
  - webapp
  - frontend
  - vue
  - ui
media:
  opengraph: ./images/metalink.png
  thumbnail: ./images/metalink.svg
  featured: ./images/metalink.svg
---

# Metalink

## Overview

Metalink is a [Web3](https://ethereum.org/en/web3/) startup operating in the [NFT](https://www.theverge.com/22310188/nft-explainer-what-is-blockchain-crypto-art-faq) space.

Their main product is a web app that enables NFT owners to keep their finger on the NFT pulse with floor price tracking, portfolio valuation, in app chat, announcements and more.

I joined Metalink to work on their reasonably mature Vue app (built primarily by React developers using Ant Fu's [Vitesse](https://github.com/antfu/vitesse) framework) with a remit to bring my deep Vue and architectural knowledge which so the product could scale going forwards. 

## Implementation

### Architecture


Things I did

Built on Ant Fu's 


Tech

- refactor folder structure
- remove bad stuff

Team

- document all findings
- put in place 

The application itself is a [Nuxt JS](https://nuxtjs.org/) build with a custom [Express JS](https://expressjs.com/) back end, hosted on Microsoft Azure.

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

The front end consists of 3 complex main modules. Building on modular techniques from [Asterisk](/work/asterisk/) and [Control Space](/products/control-space), I developed a new Nuxt plugin called [Nuxt Areas](https://github.com/davestewart/nuxt-areas) which rather than stripe dependencies across the application, co-locates code in self-contained "areas":

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


## Links

- [Metalink](https://metalink.com)
- [Twitter](https://twitter.com/metalinklabs)
- [App Store](https://apps.apple.com/us/app/metalink/id1614757016)
