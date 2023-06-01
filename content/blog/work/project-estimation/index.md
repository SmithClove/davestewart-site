---
description: A deep dive on why projects always overrun and a framework to improve future estimation
permalink: /blog/the-work-is-never-just-the-work
media:
  featured: ./images/estimation-featured.png
  thumbnail: ./images/estimation-thumbnail.png
  comparison:
    - images/compare-01.png
    - images/compare-02.png
    - images/compare-03.png
    - images/compare-04.png
    - images/compare-05.png
    - images/compare-06.png
    - images/compare-07.png
---

# The work is never just “the work”

## Intro

If you're like me, you're maybe a jobbing dev taking on contracts and occasionally your own gigs (and by-and-large this works out OK) but _maybe_ you secretly hate yourself for being **terrible** at estimation, and wish you were better at it. 

If that sounds like you, read on!

## Background

Last year I took on what seemed like a short, easy-to-deliver project, which over the course of a year turned into the kind of "night of the living dead" slog and because of a variety of factors has _never_ been easy to estimate.

With the latest phase finally delivered, I wanted to conduct a detailed postmortem to understand why my perception of the _actual_ work was so off, and in the process reevaluate everything I know about assumptions and estimation.

In the rest of the article I'll deep dive my own shortcomings around estimation, as well as present a framework to plan and visualise estimates, hopefully helping both of us clear those lurking feelings of confusion and guilt.

<NavToc exclude="intro,background,thanks" type="list" prompt="Table of contents" />

## Why is estimating hard?

Estimating is hard because you can't predict the future.

Some of the strategies I've heard or have tried:

- ***Add on 30% for project management.***
  <br>I don't get this at all; firstly, there's no way I do that amount of project management, and secondly, it doesn't cover or tackle the real causes of a bad estimate.

- ***Double or triple your estimate***
  <br>This is actually one of mine, and based on at least a couple of projects I've quoted for, is approaching something accurate – though again – no real insight as to _why_ the original estimate was not fit for purpose.

- ***Double it, then double it again (4x-it)***
  <br>Sounds crazy at first but the initial estimate is the **work**, the first double is the **details and changes**, and the second double is **problems and bugs**. This kind-of makes sense to me, assuming everything _does_ take twice as long; otherwise, do we _triple_ i.e. 9x-it? (thanks to [@panphora](https://twitter.com/panphora) for this one)

Note that in the above points I was careful to avoid using the word "overrun". 

Overrun implies that the estimate was **sound** and it was the _execution_ that was not. However, we know this is generally **not** the case; you don't take on work just to do **more**, so the **real** problem is being unable to predict what you will need to do, and how long it will take you to do it.

## Breaking it down

To uncover my estimation blind spots, I set out to dissect the previous months' effort with clear and unbiased honesty.

I aimed to:

- review the work completed and contrast it to original estimates
- root out failings in areas such as planning, skills, communication, etc
- dig into the mental and technical incongruity between plan and eventuality
- ponder previous projects and compare previous failings
- identify generic patterns I could apply to future situations

I reviewed the project's notes, files and code, mentally reliving the process of working on each, documenting what I remembered. Whilst recalling the overall thrust of each unit of work, I attempted to keep my observations generic – so specifics around a particular technology for example – wouldn't muddy the underlying causes for any overrun.

Building on my notes, I shared the observations on [Twitter](https://twitter.com/dave_stewart/status/1471451034593771523) and encouraged others to comment:

[![gist screenshot](./images/gist-screenshot.png)](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443)

Do click and have a read though; there's lots of interesting recollections and observations. I'm sure you'll be nodding along and thinking "yeah, that's got me before too!".

## Reviewing the findings

The first major takeaway was that the actual process of **writing the postmortem** was extremely valuable.

I had been aware during the project that there seemed to be a lot of "extra work", but putting it down on paper highlighted the multitude of "invisible" tasks and challenges which every web development project has.

There were two common threads:

- much of the work was the "work to do the work" rather than the "actual" work
- most of the work was under- or un-estimated because it wasn't the "actual" work

***This was in equal parts both **shocking** _and_ **enlightening**.***

I couldn't believe I had been so blind to this, up until now:

- perhaps I considered this unplanned work as just something you have to do?
- perhaps I thought my attention-to-detail style was somehow my cross to bear?

Reflecting on this, I think most likely it's a mix of misplaced professional pride and a level of cognitive dissonance around how quickly I think professional work _should_ be completed, rather than how long it takes to actually complete; I was effectively _ignoring_ the additional time because "it didn't feel correct".

An analogy that sprang to mind was that of [dark matter](https://www.google.com/search?q=dark+matter); it's invisible (like much of a project's work) but by its gravitational influence, scientists know it makes up the majority of the mass of the universe.

But dark matter aside, the upshot is that this effort – my effort – was not being considered, estimated or paid for!

## Building it back up

It was clear that this "happy path" thinking was not only costly in financial terms, but probably explained the various issues I've had with over-running or over-working over the years – at either mine or sometimes my client's expense.

And though the observations themselves felt extremely valuable, they needed fleshing out and pulling together.

Moving forwards, I wanted to:

- start thinking about some kind of "framework" to fit them in or around
- use them as building blocks to break down any future work, maybe even adding timings 
- shine a light on the overall structure and nature of projects, and their estimation 

The distinction of the work "before / between / around" the work felt like the beginnings of said framework, and I eventually settled on:

| Analogy                                                                      | Real world                                                                 |
|------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| <span class="swatch" style="background: #CCCCCC"/> The work around the work  | ***Admin***<br>Meetings, reviews, project management, etc                  |
| <span class="swatch" style="background: #EF8F8F"/> The work to get the work  | ***Acquisition***<br>Research, experimentation, scoping, quoting, pitching |
| <span class="swatch" style="background: #FCB17F"/> The work before the work  | ***Preparation***<br>Configuration, setup, services, infrastructure        |
| <span class="swatch" style="background: #FBDA7F"/> The work                  | ***Execution***<br>The actual build, product, design, etc                  |
| <span class="swatch" style="background: #C4EF93"/> The work between the work | ***Iteration***<br>Iteration, debugging, refactoring, maintenance, tooling |
| <span class="swatch" style="background: #A1EBDA"/> The work beyond the work  | ***Changes***<br>Changes, omissions, nice-to-haves, scope creep            |
| <span class="swatch" style="background: #98E2FF"/> The work outside the work | ***Problems***<br>Surprises, contingency, disasters, mission creep         |
| <span class="swatch" style="background: #7FBAE7"/> The work after the work   | ***Support***<br>Hosting, deployment, security, support, updates, fixes    |

Whilst the above analogies roughly align with real world project phases, reframing the effort in such an abstract manner felt helpful in decoupling the true nature of the work from my idealised optimism.

## Visualisation

During this investigation, I had begun to wonder if I could represent the findings **graphically**.

The following graphic is **not** an accurate representation of the work, or to scale regarding the work there was to do, but is an initial attempt to view "the work" compared to the **overall** scope of an entire project lifecycle:

![infographic showing how a development project's phases can be broken down and estimated](./images/estimation-crop.png)



When I designed the graphic, I didn't really have in my head how much effort each square represented, but in hindsight for a small or medium project, it could be a day. Each line could be a week, with the smaller grey dots as weekly meetings, and the smaller green dots evenings and weekends.

But again, this isn't scientific, more a "finger in the air" visualisation.

It's interesting to note:

- the relatively small proportion of "the work" to the overall effort, aka [planning fallacy](https://en.wikipedia.org/wiki/Planning_fallacy)
- the amount and proportion of work "between" the work, aka [project complexity](*https://en.wikipedia.org/wiki/Project_complexity*)
- the amount of work "outside" the project, aka [unknown unknowns](https://en.wikipedia.org/wiki/There_are_known_knowns)

## Analysis

Breaking this (again, inaccurate) diagram down by area (again, units do not represent effort 1:1) provides a little numerical perspective:

<div class="centered">
  <img alt="project breakdown by numbers" src="./images/estimation-breakdown.png">
</div>

Comparing both the numbers and relationships, one could postulate that:

- the "planned work" may be as little as a fifth (20%) of the total project effort
- there is much work "between" the work; the kind of invisible stuff which _will_ happen
- the "extra work" could be as much work (or more) as the planned work (22%)
- the "extra work" increases proportionally to the complexity of the work (compare yellow to turquoise and blue)
- changes (22%) must be accounted for, though there will always be things you did not account for (min 12%)
- all these seemingly small changes have a large *overall* impact on time and cost

## Scenarios

Of course, every project is different; in fact, the difficult project I spoke about at the start had three distinct phases, each of which threw up different estimation challenges and realities.

Phase 1 required building a prototype around a partner's legacy technology. Phase 2 threw up issues around migrating the prototype to a more mature architecture whilst delivering a raft of new features. In Phase 3 we realised the database (supplied by the company's now-departed data scientist) wouldn't be appropriate going forward and the "work outside the work" ended up being nearly _double_ the originally-planned work.

Below is a simplified imagination of all three phases which you can **click through** to get a feel:

<MediaGallery media="comparison" prev-text="Earlier" next-text="Later" :wrap="false" />

As you click, imagine it's one or some of *your* previous projects, and see if it triggers any painful recollections. Perhaps the proportions are different, perhaps the tasks are different, but maybe it's a similar picture of idealism vs reality worth bearing in mind next time you think a project will be just "the work".

## Reflection

### On the framework

Well, it's been fun to explore the dark side of estimation with a combination of anecdotal evidence and visualisation.

I've had various thoughts about taking the ideas forwards; here are just a few:

- could work be represented proportionally; that is, more complex tasks as bigger squares?
- could some kind of checklist help create charts which *actually* could help with estimation?
- could there be a formula for the "work between the work"?
- could multiple charts represent cumulative effort by UX, Design and Development?
- how would the shape of charts vary between project, discipline or person?

There are also myriad considerations and constraints regarding the _mechanics_ of project management such as project size, duration, phase and maturity, or team size, experience, optimism or biases.

Whilst I would love to spend more time on this, for now it will have to remain a thought experiment!

### On estimation

As I've mentioned various times throughout this article, I may have taken some numerical and artistic license.

However the aim of this exercise was to get to grips with the distortion field around accurately estimating projects when our brains are wired to ignore the detail – and there is *so much* detail.

Yes, there are estimation frameworks such as T-shirt sizes, and yes one can work agile, but the problem still remains to be solved – as humans and developers, how can we take responsibility for more accurately gauging **all** "the work" to be done?


## Takeaway

The key takeaway is that even a detailed estimate of "the work" may only be a fraction of "the project".

Without building up a record of tasks and times, it is impossible to accurately quantify how long work takes over the longer term, but given the breakdowns above "double it and double it again" doesn't seem so farfetched; at the very least it makes a good first marker to sanity-check your next estimation, be it a sprint or a project.

However, a few things to think about going forward:

- Postmortem or audit past projects to anchor yourself to reality
- Consider timing and logging future work to equip yourself for the future
- Get familiar with, and work to improve, your own estimation biases and weak spots
- Remember every type of project has the potential for all those pesky "work" types
- If you end up in trouble, consider raising flags vs doubling down
- Beware fixed-price projects!

### Downloads

- Downloadable version of the [infographic](./images/estimation.png)
- Link to the [estimation document](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443)

## Thanks

I hope you found this article useful and / or enjoyable.

If so, I'd love to exchange thoughts / ideas in the comments, or perhaps on [Twitter](https://twitter.com/dave_stewart).

Other than that, bye for now!
