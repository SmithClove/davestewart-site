---
description: Save thoughts where they belong to prevent clutter rather than maintain it
date: 2023-02-04
media:
  featured: ./workflowy-inboxes.png
  thumbnail: ./workflowy-inboxes.png
---

# WorkFlowy "Inboxes"

## Outline

WorkFlowy is a fantastic tool to organise everything from todos, to your personal affairs, to your work projects.

But anyone who's worked with WorkFlowy long enough will know the problem of their everyday list (such as Todos) becoming a dumping ground for a torrent of brilliant ideas and brain farts, then at some point in the future having to find a home for each of them amongst the bazillion projects you're juggling.

"Inboxes" is my solution (leveraging [mirrors](https://workflowy.com/feature/mirrors/) and [links](https://blog.workflowy.com/tag/links/)) to put stuff where it belongs in the first place, avoiding clogging up your main todo list, or wasting time navigating through increasingly distant trees.

> Note that this is a rather long post, for something that ends up being very simple to use!

## Problem

Let's take a typical WorkFlowy document – if there is such a thing!:

```
+- Todos
|  +- ...
+- Personal
|  +- ...
+- Projects
  +- Project A
    +- Section 1
    +- Section 2
    +- ...
```

If you're like me, you work across various projects, but live in your Todos.

At multiple points in the day you have ideas and thoughts for one of many projects, so you either:

- navigate to the project in question (taking time) or *more likely*
- dump it somewhere in your Todo list (saving time)

```
+- Todos
  +- ...
  +- Ideas
    +- Brilliant idea for Project A
```

The problem is it's not long before your Todo list becomes an increasingly unstructured dumping ground:

```
+- Todos
  +- ...
  +- Ideas
  | +- Brilliant idea for Project A
  | +- Another idea for Project A
  | +- ...
  +- Some thoughts about Project B
    +- ...
```

Not only are you now feeling stressed that your Todo list is huge, but your brilliant ideas are all jumbled up, and you'll have to find the time to organise and move them to the right place at *some point* in the future.

Now if only there was some way to avoid getting into this mess in the first place?

## Solution

My solution to the this chaos is a combination of [structure](#structure), [mirrors](#mirrors) and [links](#links) I call "Inboxes".

### Structure

At the **root** of all projects I create a new node called "Inbox":

```
+- Projects
  +- Project A
    +- Inbox
    +- Section 1
    +- Section 2
    +- ...
```

The point of this "inbox" is to **dump** ideas and notes about said project without clutter, stress, or distraction:

```
+- Projects
  +- Project A
    +- Inbox
    | +- Brilliant idea
    | +- Another idea
    | +- ...
    +- Section 1
    +- Section 2
    +- ...
```

Keeping ideas with the project in question keeps the rest of your tree tidy, and you can return to organise **later**, when you have the time and space to do it properly.

But are you now supposed to remember and navigate to inboxes spread across WorkFlowy?

### Mirrors

Using WorkFlowy's **mirrors** we can effectively place all inboxes in a single, centralised location, such as Todos:

```
+- Todos
  +- ...
  +- Inboxes
    +- Inbox: Project A
    +- Inbox: Project B
    +- ...
```

*Note that I added the **name** of each project to disambiguate one inbox from another.*

Now, when we want to brain dump a random thought, we can open (or click) the relevant Inbox and add it there:

```
+- Todos
  +- ...
  +- Inboxes
    +- Inbox: Project A
    | +- Brilliant idea
    | +- Another idea
    | +- Another amazing idea! I am on 🔥
    | +- ...
    +- Inbox: Project B
    +- ...
```

Now, random thoughts can be collated and organised in a common location, but *actually* stored with the relevant project!

However, there's a final problem to solve; because we mirrored only the *inbox*, how do we view the owning project? 

### Links

The final piece in the puzzle, is connecting the **Inbox** with its **Project**, and that is done very simply, with a **link**:

```
+- Todos
  +- ...
  +- Inboxes
    +- Inbox: [Project A]  <-- the name is a link
    +- Inbox: [Project B]
    +- ...
```

Clicking the link navigates to the full project tree:

```
+- Project A
  +- Inbox: [Project A]
  | +- Brilliant idea
  | +- Another idea
  | +- Another amazing idea! I am on 🔥
  | +- ...
  +- Section 1
  +- Section 2
  +- ...
```

From here you can do what you like:

- organise the inbox
- move the ideas to the correct part of the project
- or just browse the project, using the link as an entry point

## Summing up

Creating Inboxes is actually quite easy – it's just the structure that is initially a bit weird – but turning the organisation of random thoughts on its head reaps benefits.

I actually mirror Inboxes to several places:

- a root level **Inboxes** node with all active or potential projects (that I am thinking about)
- I then mirror this node to the bottom of my **Todos** list so I don't need to navigate up a level to work with them

### Steps

The steps to create a project inbox:

1. Navigate to the project itself
2. Click the project's title and copy its link using `Cmd`+`Shift`+`L`
3. Create a new node immediately beneath, named `Inbox: Project Name`
4. Select the project name and press `Cmd`+`V` to paste the link

To show the Inbox elsewhere:

1. Press `Cmd`+`Shift`+`M` to copy a reference to the Inbox
2. Press `Cmd`+`V` to paste it as a mirror somewhere else in the tree

### Code

Here's are those creation steps in code, which you can paste into a [bookmarklet](https://www.freecodecamp.org/news/what-are-bookmarklets) if you want:

```js
javascript:
var node = WF.focusedItem();
var name = node.getNameInPlainText();
var href = node.getUrl().substr(1);
var html = `Inbox: <a href="${href}">${name}</a>`;
node = WF.createItem(node);
WF.setItemName(node, html);
node = WF.createItem(node);
WF.setItemName(node, 'First item...');
```

That's it for now.

Happy inboxing!
