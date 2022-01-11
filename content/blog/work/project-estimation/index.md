---
description: An investigation into why projects take longer than you expect and how to get better at estimating
date: 2022-01-02
preview: true
permalink: /blog/the-work-is-never-just-the-work
media:
  featured: ./images/estimation-featured.png
  thumbnail: ./images/estimation-thumbnail.png
---

# The work is never just “the work”

## Abstract

This article digs into the difficulties and pitfalls of project estimation and offers some hard-won realisations and insights on how to better-estimate web development projects.

You'll take away:

- a categorised [breakdown](#breakdown) of development tasks and things to consider
- a graphic [visualisation](#visualisation) to highlight cognitive dissonance around comfortable estimation
- some final [reflection](#reflection) to help estimate and improve numbers over time

## Background

I recently completed what started as a small, client web application build, and with the addition of a second phase, morphed into a medium-sized project. Both phases turned out to be more complex than briefed or planned, and significantly overran.

***I wish I could say "this has never happened before!" but of course it has and I know it, and I hate it.***

To give some context to the rest of the article, I'm going to share some detail:

- Phase 1 used a 3rd-party API that was much more difficult to work with than expected and required us to build an intermediate back end on what should have been a basic single page app
- Phase 2 expanded the use of Elasticsearch and as the client's technical lead had left the company after Phase 1, we had to invest time in mastering it (and ultimately concluding that ES was absolutely wrong for the project) 
- The expansion of the codebase from Phase 1 to Phase 2 was much more time-consuming than anticipated; both rearchitecting the application for scale and refactoring legacy issues to provide stability at this new size  

The way I handled it was to double-down and complete the work. Whilst the client did agree to pay more for Phase 1, Phase 2 has been much more difficult and we haven't had those conversations yet. With the buck stopping with me as a lone developer, this is not a position I want to find myself in.

Thinking about quoting for future projects, options could be:

1. change the way the job is planned and quoted for, for example Agile
2. plan in such a way to account for these kinds of difficulties and quote accordingly
3. predict and reject projects with too many unknowns in the first place

As many clients prefer at least ballpark costs, this article will explore ideas based on quoting accordingly.

I hope the results surprise and interest you!

## Postmortem

While the reasons for overruns generally always feels unique and impossible to preempt, my gut feeling was there was something about my approach to estimating – rather than what needed to be done – which which was the problem.

It seemed clear to me that to uncover my estimation blind spots, I should break down and analyse the last couple of months' effort with clear and unbiased honesty:

- to review the work completed and contrast it to the work estimated
- to delve into the mental and technical disconnects between the two
- to think about previous projects and compare previous failings
- to identify generic patterns I could apply to future situations

I went over the project's notes, files and code, mentally reliving the process of working on each, documented what I remembered over several days and weeks.

Whilst recalling the overall thrust of each unit of work, I kept my observations as generic as possible – so specifics around a particular technology for example – wouldn't muddy the underlying causes for any overrun.

Click below to link to the document and cast your mind back to your last problem project; what would you have added or left out!?

[![gist screenshot](./images/gist-screenshot.png)](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443)

*Just to reiterate before we continue: the notes, discussion, charts, and numbers in this article are based around this type of project; a small to medium-sized, web application build, by a single freelancer for a commercial client.*

## Findings

The first thing to note is that the process of writing the postmortem was extremely valuable.

I was aware when doing the work that there seemed to be a lot of "extra work", but putting it all down on paper was a brilliant way to shine a light on my own biases around time and expectations, as well as to permanently record the multitude of "invisible" tasks and challenges which every web development project has.

It wasn't long before some common themes appeared:

- The majority of the work was "the work to do the work" rather than "the work"
- most of the work was under- or un-estimated because it wasn't what I considered the "actual" work
- I didn't have proper systems in place to handle contingency *or* the communication around it

***Uncovering these truths felt shocking – but at the same time, enlightening.***

The distinction of the work "before / between / around" the work felt like the beginnings of a framework to understand the "real" nature of a project and vanquish "happy path" thinking once and for all. 

## Breakdown

Up until now, what I had was a huge brain dump with some anecdotal insight, and I felt I needed to pull back and gain some high-level clarity.

In an attempt to corral the postmortem into something more structured, I began to group the observations by project phase, and with a little poetic license expanded on the "&lt;relation to&gt; the work" analogy for each section: 


| Project phase                                                | Nature of the work                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <span class="swatch" style="background: #CCCCCC"/>[Admin](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443#admin) | **The work around the work**<br>Meetings, reviews, project management, etc |
| <span class="swatch" style="background: #EF8F8F"/>[Acquisition](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443#acquisition) | **The work to get the work**<br>Research, experimentation, scoping, quoting, pitching |
| <span class="swatch" style="background: #FCB17F"/>[Preparation](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443#preparation) | **The work before the work**<br>Configuration, setup, services, infrastructure |
| <span class="swatch" style="background: #FBDA7F"/>[Execution](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443#execution) | **The work**<br>The actual build, product, design, etc |
| <span class="swatch" style="background: #C4EF93"/>[Iteration](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443#iteration) | **The work between the work**<br>Development, polish, debugging, refactoring, tooling |
| <span class="swatch" style="background: #A1EBDA"/>[Changes](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443#changes) | **The work beyond the work**<br>Changes, omissions, nice-to-haves, scope creep |
| <span class="swatch" style="background: #98E2FF"/>[Problems](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443#problems) | **The work outside the work**<br>Surprises, contingency, disasters, mission creep |
| <span class="swatch" style="background: #7FBAE7"/>[Support](https://gist.github.com/davestewart/643ffc55aa7c173618d2707b776a1443#support) | **The work after the work**<br>Hosting, deployment, security, support, updates, fixes |

Whilst the grouping might not be right for every project, this pulling together of the strings felt like the first step in seeing "the work" in context to the more invisible intricacies and tasks in building and delivering a web application.

However, what was gained with the simply-digestible format, was lost from the detail and insight of the text.

## Visualisation

But what if we represented the tasks graphically?

What you see below is not necessarily an accurate or to-scale representation of this project (if it was, the blue section would be much bigger!) but an initial "finger in the air" attempt to visualise and understand the **nature and proportions of work** for a project of this nature:

<div style="overflow: hidden;"><img src="./images/estimation.png" style="margin-top: -150px; margin-bottom: -80px;"></div>

The more interesting things to note are:

- the relatively small proportion of "the work" to the overall effort, aka [planning fallacy](https://en.wikipedia.org/wiki/Planning_fallacy)
- the amount and proportion of work "between" the work, aka [project complexity](https://en.wikipedia.org/wiki/Project_complexity)
- the amount of work "outside" the project, aka [unknown unknowns](https://en.wikipedia.org/wiki/There_are_known_knowns)

## Analysis

As I mentioned, the proportions above are guesstimates, but they're likely close enough to break down for a little numerical perspective:

<div class="centered">
  <img alt="project breakdown by numbers" src="./images/estimation-breakdown.png">
</div>


Comparing both the numbers and relationships, one could postulate that:

- the "planned work" may be as little as a fifth (20%) of the total project effort
- there is much work "between" the work; the kind of invisible stuff which _will_ happen
- the "extra work" could be as much work (or more) as the planned work (22%)
- the "extra work" increases proportionally to the complexity of the work (compare yellow to turquoise to blue)
- changes (22%) must be accounted for, though there will always be things you did not account for (min 12%)
- all these seemingly small changes have a large *overall* impact on time and cost

## Reflection

<Quote text="Dammit Jim, I'm a programmer not a psychologist / project manager!" name="Dave Stewart, Jan 2022" size="1.3" hero/>

As a sometimes-solo developer – even an experienced one – I don't have the foresight of a psychologist or the training of a project manager, and can suffer from well-understood biases and may fall into domain-specific traps.

But the point of this investigation was to uncover these assumptions and subsequent poor planning, and it *feels like* it's been successful in that aim. I've had to face up to the demons of and the  

consequences of optimistic thinking, and  

However, it doesn't feel like the end of the road; rather, the first step to recognising unhelpful biases, mitigating "happy path" thinking, and objectively determining estimates.



- Postmortem = framework
- Numbers prove themselves
- Daily rate = padding / bad way to mitigate
- Working late / unfair on client
- Client vs enterprise
- Short job vs longer job



Think about other projects:

- package
- Web app
- mvp
- Etc



The next thing is; I am not a project manager, and I don't know if I am reinventing the wheel, or if there are better, more established, and possibly more successful ways to go this.

Reflecting back on 

As I see it, these are the successes:

- the postmortem lead to valuable documentation and introspection on the building blocks of an application build 
- the visualisation helped significantly with coming to terms with how much time things actually take

And these are the areas which need work:

- recognising the potential problem areas
- having a framework for flagging and communicating problems 

Going forward, I think the next steps should be:







Bear in mind that these figures are themselves based on an estimate, so think of them as conjecture, a starting point from which to think about future project estimation, rather than a set of hard and fast rules which will give you the magic number.

In past projects I have likely cushioned what would probably be the real time  

Having taken the time to properly audit the project and its overruns, I see the problem as a mix of cognitive biases, inadequate planning, and a lack of project management chops.

In the words of McCoy, the Enterprise's eponymous doctor:  



A waterfall of classic biases and 

This article about estimation is *in part* an estimation; perhaps it would be more accurate to call it *conjecture*, but l think as an exercise overall it is extremely valuable. Additionally 



Vs original project

Consider:

- a client web development project
- a personal website
- an open source library or package 
- an MVP for Product Hunt
- a legacy project migration

## Takeaways

### Optimism

We always think it will be easy

We think of POC as the final thing (it isn't)

Polish takes a long time

We think it shouldn't take that long

We don't fully think it through

There isn't a framework to help with this

### Traps 

At every stage!

Small projects turn into bigger projects and need to be upgraded

Some technology is hard to quote for

The client may think it's finished, but it isn't (badly done electrics; who is the work actually for?)

Frameworks save you time, but there is still a lot of work to be done

You won't know everything

## Moving forward

Review your last project and make some estimates

Log all time against clearly defined units of work

Determine if the work is the work, or somehow before, beyond, outside, etc.

## Thanks

I hope you found this article useful and / or enjoyable.

If so, consider following me on [Twitter](https://twitter.com/dave_stewart).

Bye for now!
