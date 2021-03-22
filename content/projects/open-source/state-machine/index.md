---
description: A powerful yet simply-configured JavaScript finite-state machine
date: 2016-10-01
tags:
  - library
  - javascript
  - state
github: davestewart/javascript-state-machine
media:
  thumbnail: ./images/state-machine-thumb.svg
  featured:
    src: https://statemachine.davestewart.io/
    width: 960
    height: 500
    type: embed
---

# State Machine

## Overview

State Machine is a powerful yet simply-configured state machine.

Its [intuitive](https://statemachine.davestewart.io/html/api/transitions/advanced.html) [yet](https://statemachine.davestewart.io/html/api/transitions/wildcards.html) [powerful](https://statemachine.davestewart.io/html/api/transitions/separators.html) DSL can describe states and transitions succinctly whilst its [JavaScript API](https://statemachine.davestewart.io/html/api/index.html) hooks into transitions with a rich [event syntax](https://statemachine.davestewart.io/html/api/events/interactive.html) to build complex [application flows](https://statemachine.davestewart.io/html/examples/index.html):

```js
const transitions: [
    "warn  : green > yellow",
    "panic : green   yellow > red",
    "calm  :         yellow < red",
    "clear : green < yellow   red"
]
```

The **interactive** demo above shows-off many of StateMachine's features. Visit the [site itself](http://statemachine.davestewart.io) and view the source code directly in the page, or open the console here to see the application log updates as it transitions between states and fires events.

## Implementation

The library itself is built as a stand-alone library with two component parts:

- the DSL lexer and parser
- the state machine engine

The syntax of the library consists of the transition setup (text or object format) and *optional* handlers:

```js
const config = {

  transitions: [
    'warn  : green > yellow',
    'panic : green   yellow > red',
    'calm  :         yellow < red',
    'clear : green < yellow   red',
  ],

  handlers: {
    'action:end': function (event) {
      console.info(event.transition)
    },
    'red:leave': function (event, fsm) {
      console.log(event)
      fsm.pause()
      setTimeout(function () {
        fsm.resume()
      }, 1000)
    },
  },

}

const fsm = new StateMachine(config)
```

The above is the classic [traffic light](https://statemachine.davestewart.io/html/examples/flows/branching.html) example, with some additional handlers to show off the API.

The library can be used on its own (as per most of the examples) or with helpers to power [jQuery](https://statemachine.davestewart.io/html/setup/helpers/jquery.html), [Angular](https://statemachine.davestewart.io/html/setup/helpers/object.html) or [Vue](https://statemachine.davestewart.io/html/examples/vue/vue-router.html).

## Thoughts

I built State Machine after becoming interested in state machines as a potential solution to complex user flows such as checkouts or multi-step forms.

As it happens, I've never used it in production, and it's just ended up as a cool technology investigation.

If I had the time and inclination to continue this project, the main aims would be:

- decouple the notation DSL from the core library
- add support for nested state machines

 I would imagine these days if you wanted to use state machines, you would look at [X State](https://xstate.js.org/). A fun next step  for this library would be enabling the DSL to build state machines for that library. 

## Links

- [statemachine.davestewart.io](http://statemachine.davestewart.io/)
- [GitHub](https://github.com/davestewart/javascript-state-machine)

