---
description: Interactive prototype for broadcast chess
shortTitle: World Chess
date: 2012-08-05
tags:
  - flash
  - frontend
  - data
  - api
  - as3
  - technical
  - concept
media:
  thumbnail: ./images/world-chess-logo.png
  gallery:
    - ./images/world-chess-game-1a.png
    - ./images/world-chess-game-1b.png
    - ./images/world-chess-game-1c.png
    - ./images/world-chess-game-1d.png
    - ./images/world-chess-game-1e.png
    - ./images/world-chess-moves-1a.png
    - ./images/world-chess-moves-1b.png
    - ./images/world-chess-moves-1c.png
    - ./images/world-chess-baord-1b.png
    - ./images/world-chess-board-1a.png
    - ./images/world-chess-timeline-1a.png
    - ./images/world-chess-timeline-1b.png
---

# World Chess: ChessCasting

## Overview

World Chess is American entrepreneur [Andrew Paulson](https://en.wikipedia.org/wiki/Andrew_Paulson)'s foray into the world of commercial chess, having bought the rights to develop and market the [World Chess Championship](https://google.co.uk/search?q=World+Chess+Championship&tbm=nws) for the next 11 years

The project's ultimate aim is to broadcast the performance of chess, combining it with web technology to reach a wider audience, and expert opinion to demystify the game for the wider public.

As part of the development process, I was brought in by Vibeke Hanson (ex BBC) to work on the technical side of the early prototyping, to develop designs and illustrate ideas and concepts with stakeholders and significant interested parties.

## Development

Initially we focussed on the playback of previously-recorded games using existing chess notation, working with [Matt Biddulph](https://hackdiary.com/) of Dopplr who developed up a Ruby/Heroku application to do just this. This allowed us to study the ebb and flow of games, as well as get to intimately know the main events and constructs which make up games.

From here, we worked as a team to break down all aspects of the game and work out interesting areas to concentrate on and potentially explain, for example:

- state whether opening, mid game, end game
- graph of time each move takes (moves / time)
- chart of moves (time / moves)
- future moves / past moves
- moves split into predictive / analytical / historical / comparative
- fork / pin / skewer / revealed check / check / checkmate
- opening / midgame / endgame

Developing a visual style in tandem, we then looked to implement some of these ideas from both traditional and data-visualisation perspectives.

## Implementation

Building a chess engine from scratch, in such a short timeframe was never going to be viable, so I set about finding an open source chess engine in ActionScript 3, which ended up being ChessFlash.

The core engine code was superb, however the implementation of the engine within a very opinionated web-based playback engine needed about a week of refactoring to make it flexible enough to be used outside of that context.

Once refactored, I was ready to roll with a wider application. The main concepts I focussed on were:

- An overall MVC architecture
- Interfacing with the Heroku application, including moves and predicted moves
- Interpretation of standard chess notation data into AS3
- Visual layout: board, timeline, moves
- Game playback, both on the board, and the timeline
- Timeline layout and interaction
- Additional board notation

As part of the process we also met and spoke to a variety of influential people in the chess world, over a weekend, which informed our process and implementation.

The final project prototype took about 3 weeks start to finish, with some additional time for tweaks.

## Links

Press

- [Adweek: American Entrepreneur Andrew Paulson Plans on Putting the World Chess Federation Back on the Map](https://adweek.com/news/advertising-branding/media-moguls-daring-move-make-chess-big-141168)
- [Guardian Online: Chess impresario hopes to bring back the Fischer v Spassky glory days](https://theguardian.com/sport/2012/jul/12/chess-impresario-fischer-spassky)
- [Daily Mail: Can this man do for chess what Bernie Ecclestone did for Formula 1?](https://dailymail.co.uk/home/moslive/article-2229987/Can-Andrew-Paulson-chess-Bernie-Ecclestone-did-Formula-1.html)
- [Chess Magazine: An interview with... Andrew Paulson](https://en.chessbase.com/home/TabId/211/PostId/4008589)
- [Design Week: Pentagram brings chess into a new era](https://designweek.co.uk/news/pentagram-brings-chess-into-a-new-era/3035344.article)

Implementation

- [Pentagram - World Chess](https://new.pentagram.com/2012/10/new-work-world-chess/)
- [Chess Casting](https://chessbase.com/Home/TabId/211/PostId/4009254/chesscasting--making-the-invisible-visible-240313.aspx)
- [Matt Biddulph](https://hackdiary.com/)
