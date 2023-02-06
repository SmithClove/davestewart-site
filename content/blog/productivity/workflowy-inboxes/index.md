---
description: A WorkFlowy organisational strategy for when you've multiple projects and lots of ideas
date: 2023-02-04
media:
  featured: ./workflowy-inboxes.png
  thumbnail: ./workflowy-inboxes-thumb.png
---

# WorkFlowy "Inboxes"

## Outline

WorkFlowy is a fantastic tool to organise everything from todos, to your personal affairs, to your work projects.

But anyone who's worked with WorkFlowy long enough will know it can be difficult to stay organised when you're constantly jotting down thoughts, but don't have time to find a home for them.

I've developed a solution I call "[Inboxes](#solution)" to make it easy to save thoughts in the right place, without clogging up your main list or constantly navigating to others.

## Problem

Let's take a typical WorkFlowy document – if there is such a thing:

<img class="responsive" src="./images/01-home.png" />

If you're like me, you have multiple projects, but a "main" list you have open most the time; mine is **Todos**.

Throughout the day your brain is generating countless ideas, so you either navigate to and from the projects in question to jot them down (**taking** time) or more likely dump it at the bottom of your main list (**saving** time):

<img class="responsive" src="./images/02-first-idea.png" />

Of course, it's not long before your neat and tidy main list becomes a chaotic and unstructured brain dump:

<img class="responsive" src="./images/03-more-ideas.png" />

Not only is your main list now cluttered with fragmented ramblings, but your brilliant ideas are all jumbled up – and you'll have to find additional time to sift through and organise them. Argh!

But what if you could avoid this?

## Solution

My system of [structure](#structure), [mirrors](#mirrors) and [links](#links) is called "Inboxes" and is designed to sidestep this mess in the first place.

### Structure

At the **root** of all projects I create a new node called "Inbox":

<img class="responsive" src="./images/04-inbox.png" />

It's the place I dump ideas, notes and data relating **specifically** to the project:

<img class="responsive" src="./images/05-inbox-ideas.png" />

By storing ideas with the project, it **keeps the rest of your tree tidy** and prevents organisational debt. You can review your ideas **later**, where they'll be sitting in context to the rest of the project, and will be easier to edit and organise.

But as projects could live anywhere in WorkFlowy, how do we solve the problem of **navigating** to them?

### Mirrors

Using WorkFlowy's [mirrors](https://workflowy.com/feature/mirrors/) we can effectively teleport Inboxes to a single, **centralised** location, such as your main list:

<img class="responsive" src="./images/06-inbox-mirrors.png" />

(At this point, you'll want to add a _name_ each Inbox, so you can tell what project it belongs to).

Now, when we want to log a random (but specific) thought, we can open the relevant Inbox and add it directly:

<img class="responsive" src="./images/07-mirror-ideas.png" />

The magic is that thoughts for **multiple** projects can be managed in a **single** location, but _in reality_ live with each project!

However, there's one last problem to solve; what if we want to jump to the project itself? 

### Links

The final piece in the puzzle is to connect the Project by [linking](https://blog.workflowy.com/tag/links/) the Inbox **name**:

<img class="responsive" src="./images/08-mirror-links.png" />

Clicking the link navigates to the full project tree:

<img class="responsive" src="./images/09-project.png" />

From here you can:

- review the inbox
- migrate your ideas to the right place
- or simply browse the project!

## Wrapping up

Creating Inboxes is actually quite straightforward – even if it feels back to front – but the housekeeping benefits are real.

### Steps

To create an Inbox:

1. Navigate to the project itself
2. Click the project's title and copy its link using `Cmd`+`Shift`+`L`
3. Create a new node immediately beneath, named `Inbox: [Project Name]`
4. Select the project name and press `Cmd`+`V` to paste the link

To show the Inbox elsewhere:

1. Press `Cmd`+`Shift`+`M` to copy a reference to the Inbox
2. Press `Cmd`+`V` to paste it as a mirror somewhere else in the tree

### Code

You can automate the creation steps using JavaScript as a [bookmarklet](https://www.freecodecamp.org/news/what-are-bookmarklets) or [WFx script](https://youtu.be/KnLmOZWh3fI?t=149):

```js
javascript:
var node = WF.currentItem();
var name = node.getNameInPlainText();
var href = node.getUrl().substr(1);
var inbox = WF.createItem(node);
var note = WF.createItem(inbox);
WF.setItemName(inbox, `Inbox: <a href="${href}">${name}</a>`);
WF.setItemName(note, 'First item...');
[inbox, note].forEach(WF.expandItem);
```

### Strategies

I actually mirror Inboxes to several places:

- a global **Inboxes** node with a tree of all **Active**, **Potential** and **Other** project Inboxes
- individual **Inbox** mirrors in my main **Todo** list, so I can quickly dump ideas as I have them

Anyway, that's it for now.

If you find this works for you, perhaps leave a comment.

Happy inboxing!

<style>
img.responsive {
  max-width:640px;
  margin: -1rem 0;
}

@media (max-width: 640px) {
  img.responsive {
    width:175%;
  }
}
</style>
