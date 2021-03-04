---
description: Social networking & mapping experiment
date: 2007-04-05
order: 2
tags:
  - api
  - back-end
  - creative
  - front-end
  - html
  - php
  - featured
  - javascript
  - data
  - technical
  - mashup
  - social
  - concept
  - mapping
media:
  thumbnail: ./images/balham-night.png
  gallery:
    - ./images/balham-night-01.jpg
    - ./images/balham-night-02.jpg
    - ./images/balham-night-03.jpg
    - ./images/balham-night-04.jpg
    - ./images/balham-night-05.jpg
    - ./images/balham-night-06.jpg
    - ./images/balham-night-07.jpg
    - ./images/balham-night-08.jpg
    - ./images/balham-night-09.jpg
    - ./images/balham-night-10.jpg
---

# Balham Night

## Overview

I'd just moved to a new part of London, and I wanted to know what would happen if I got together friends of friends of friends, on the pretext that a) they all lived locally (within a 2 mile radius) and b) everyone potentially knew each other by connection.

The result was Balham Night! Two real-life get-togethers organised entirely via the web, with 40 people at the first, 130 people at the second, and 300 on the mailing list by the end.

## Process

The Balham Night site required 4 pieces of information about someone in order for them to participate:

- Their name
- Their email
- Their postcode
- The person who had invited them

With this information I was able to:

- Place the person on a Google Map
- Insert the person into the tree of relationships
- Email them about the physical event

Users were able to watch the map in the run-up to the event to see if any new people from their area were coming, then locate them in the relationship tree, seeing if they had any friends in common.

As well as this, a week before the event, I would process all users by location, and email each person the names of the 5 closest people to them, setting them the goal of finding those people on the night and introducing themselves.

On the night itself, everyone would be given a coloured name badge, indicating their relative distance to Balham, so folks could again, more easily discover new aquaintences.

## Implementation

The site was a PHP/SQL and HTML/JavaScript Google Maps mashup. I learnt a lot about complex hierarchies, creation and traversal of data structures, and use of APIs, as well as about running events, and frankly... how much effort it takes to do it well!
