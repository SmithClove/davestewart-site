---
description: A bunch of lesser-known strategies and tips to make working with the Mac Finder less of a pain
date: 2022-02-01
media:
  featured: ./mac-finder.png
  thumbnail: ./mac-finder.svg
---

# 25 Finder tips & tricks to speed up your workflow

## Intro

The Mac Finder is strangely named, as to actually _find_ things Apple invented Spotlight, perhaps acknowledging that as a piece of software, it has its shortcomings (ironically, as too does Spotlight!).

However, there are some hidden gems and tricks which make it suck _a lot_ less, so read on and I'll share this buried treasure with you.


## Strategies

Coming from Windows with its File Explorer, to Mac with its Finder, was especially galling; it took me years to accept Apple's way of doing things and develop strategies to make managing files on the Mac not a total freaking shit show.

Here's what works for me:

- ***Keep a Finder window open***

  If you need to access files all day, keep a Finder window open and configured and don't close it. The easiest way to get back to it will be to hit `Cmd` + `Tab` (multiple times if you need to) and select the Finder icon from the list. 

- ***Add folders to the sidebar***

  You can add your must-access folders to the sidebar, by simply dragging them in. Note that if you rename the original folder, or the item in the sidebar, its counterpart will be renamed too.

- ***Make use of tabs***

  Without Window's excellent window management, Mac OS's tabs are the next best thing. Hit `Cmd` + `T` to open a new tab, and use one per project / task / domain rather than going forward and back within the same tab. See the tips below on [managing windows](#managing-windows) if you end up with too many tabs in multiple windows!

- ***Set List view as the default***

  The Finder's **"List"** view is the closest thing the Mac has to Windows Explorer, so it's easiest to set it as the default view. To do this:

  - go **View** > **List** (or `Cmd` + `2`)
  - go **View** > **Show View Options** (or `Cmd` + `J`)
  - Click **Use as Defaults**

- ***Split Finder left / Terminal right***

  As a developer, the Terminal is the yang to the Finder's yin. I like to have both open side by side (on a separate desktop) so I can grab paths from the Finder and user them in Terminal (see below for specific [Developer tips](#developer-tips)).

- ***Use window management software***

  Although Mac OS has gained some tiling tools of late, it uses the somewhat clumsy full screen mode. Instead, use an app like [Spectacle](https://www.spectacleapp.com/) or [Moom](https://manytricks.com/moom/) so you can put those windows in their place.

## The tips

A couple of the items below you will find by trawling the Finder menus, but most you will not. I found most of these out through trial and error, or over the years via seasoned Mac users.

You may know some, but I'm guessing there's at least a few you won't!

### Open / save dialogs

- ***Reveal the dialog's location***

  With a dialog open, hit `Cmd` + `R` to "reveal" the currently visible folder in a new Finder window. Make any updates there and see changes reflected instantly in the dialog.


- ***Change dialog's the location*** 

  With a dialog open, `drag` a folder or file from the Finder and drop it on the dialog window. The dialog will update its location to that of the dropped item, selecting the item as well.

### Moving around

- ***Navigate using the keyboard***

  In **List** mode, move the focus with:

  - `Up`/`Down` to move through the visible folders
  - `Left`/`Right` to open closed / close open folders
  
  In all modes:

  - `Cmd` + `Up` / `Down` to move up / down a folder level
  - `Cmd` + `Down` on a file to open it

- ***View / navigate to ancestor folder***

  `Cmd` + `Up` to go up one level. Alternatively, `Right Click` on the title of the folder in the Finder's toolbar, it will display a dropdown of the parent folders, and `Click` any folder to navigate to it.

- ***View / navigate to previous folders***

  `Cmd` + `[` / `]` to go back / forward. Alternatively, `Long press` the **"Back"** or **"Forward"** buttons to reveal the history of folders you have visited, and `Click` any folder to navigate to it.

### File operations

- ***Move (vs copy) files***

  Use the normal `Cmd` + `C` to copy, then either `Opt` + `Cmd` + `V` to move. Alternatively, use the `Right Click` menu, hold `Opt` and choose **"Move Item Here"**.

- ***View additional menu options***

  Wherever a file or context menu is shown, hold `Opt` and optionally `Shift` to display additional menu options.

- ***Use spring-loaded folders***

  You can `Drag` files or folders onto other folders and pause for a split second to reveal the content of that folder. You can continue to do this to any depth, then:

  - `Drop` the item to move (hold `Opt` to copy)
  - `Drag` the folder outside of the Finder window to return to the original folder
  - Hit `Esc` to cancel the operation

- ***Batch rename files***

  Select multiple files then `Right Click` and choose **"Rename..."**. A dialog will appear with options to rename the selected files by:

  - Replacing text
  - Adding text
  - Using a custom format:
    - Name and index
    - Name and counter
    - Name and date

### Developer tips

- ***Toggle hidden files***

  `Cmd` + `Shift` + `.` to toggle display of hidden files (works in windows and dialogs). 

- ***Get the path of the any folder***

  There are two ways to do this:

  - Use `Cmd` + `C` to copy a file or folder, then `Cmd` + `V` to paste the path into a text-based app
  - Or, `Right Click` any file or folder, hold `Opt` and choose **"Copy [name of the file] as Pathname"**

- ***Get the path of the current folder***

  If you hover over the title of the folder in the Finder's toolbar, it will reveal an icon. `Click` and `Drag` the icon wherever you need it (for example a terminal window) to insert the full path.


### Managing windows

This should work in _all_ applications.

- ***Cycle through windows***

  Hit `Cmd` + `` ` `` / `Cmd` + `Shift` + `` ` `` to cycle to the next / previous application window.

- ***Merge all windows***

  From the **Window** menu of any application, choose **"Merge All Windows"** to add all open windows to a single window with tabs for each window.

## Bonus tips!

You may already know some of these.

- ***Resize a column automatically***

  `Double Click` a column border to automatically resize it to fit the content.

- ***Resize a window from the center***

  `Alt` + `Drag` a window edge to resize it from the center.

- ***Use the Inspector as live "Get info"***

  `Right Click` any Finder item, hold `Opt` and choose Show Inspector to get instant information on subsequent selections.

- ***Paste files to other applications***

  Depending on the target application, directly copying and pasting a file to another application can do different things:

  - in text editors, it will paste the path
  - in Photoshop, it will paste a high resolution image of the icon
  - in WebStorm:
    - in the project tree, it will copy the file
    - in a Markdown document, it will copy a PNG file of the icon and insert the path
  - in Keynote or Word, it will paste the file's content directly into the document

  In other apps, who knows!? It's not as consistent as Windows, so experiment to find out.
