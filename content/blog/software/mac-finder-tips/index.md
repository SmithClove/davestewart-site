---
description: A treasure trove of solid strategies and hidden gems to wrangle those windows and fly through folders  
date: 2022-02-01
media:
  featured: ./mac-finder.png
  thumbnail: ./mac-finder.svg
---

# 25 Finder tips & tactics to speed up your workflow

## Intro

The Mac Finder is strangely named, as to actually _find_ things Apple invented Spotlight, perhaps acknowledging that as a piece of software, it has its shortcomings (ironically, as too does Spotlight!).

However, there are some hidden gems which make it bearable, so read on and I'll share this buried treasure with you.


## Tactics

Coming from Windows with its File Explorer, to Mac with its Finder, was especially galling; it took me years to accept Apple's way of doing things and develop strategies to make managing files on the Mac not a bit of a shit show.

Here's what works for me:

- ***Keep a Finder window open***

  If you're using the Finder all day, keep a window open and don't close it (use `Cmd` + `Tab` to return to it quickly). 

- ***Add folders to the sidebar***

  You can add your must-access folders to the sidebar, by simply dragging them in. Note that if you rename the original folder, or the item in the sidebar, its counterpart will be renamed too.

- ***Make use of tabs***

  Without Window's excellent window management, Mac OS's tabs are the next best thing. Hit `Cmd` + `T` to open a new tab, and use one per project / task / domain rather than going forward and back within the same tab. See the tips below on [managing windows](#managing-windows) if you end up with too many tabs in multiple windows!

- ***Set List view as the default***

  The Finder's **"List"** view is the closest thing the Mac has to Windows Explorer, so it's easiest to set it as the default view. To do this:

  - Go **View** > **List** (or `Cmd` + `2`)
  - Go **View** > **Show View Options** (or `Cmd` + `J`)
  - Click **Use as Defaults**

- ***Split Finder left / Terminal right***

  As a developer, the Terminal is the yang to the Finder's yin. I like to have both open side by side (on a separate desktop) so I can grab paths from the Finder and use them in Terminal (see below for specific [Developer tips](#developer-tips)).

- ***Use window management software***

  Although Mac OS has gained some tiling tools of late, it uses the somewhat clumsy full screen mode. Instead, use an app like [Spectacle](https://www.spectacleapp.com/) or [Moom](https://manytricks.com/moom/) so you can put those windows in their place.

## Tips

A couple of the items below you will find by trawling the Finder menus, but most you will not. I discovered most through trial and error, or from watching seasoned Mac users over the years.

You may know some, but I'm guessing there's at least a few you won't!

### Open / save dialogs

- ***Reveal the dialog's location***

  With a dialog open, hit `Cmd` + `R` to "reveal" the containing folder in a new Finder window. Make any updates there and see changes reflected instantly in the dialog.


- ***Change dialog's the location*** 

  With a dialog open, `drag` a folder or file from the Finder and drop it on the dialog window. The dialog will update its location to that of the dropped item, selecting the item (and taking its name if saving).

### Moving around

- ***Navigate using the keyboard***

  In **List** view:

  - `Up`/`Down` to move through the visible folders
  - `Left`/`Right` to open closed / close open folders

  In all views:

  - `Cmd` + `Up` / `Down` to move up / down a folder level
  - `Cmd` + `Down` on a file to choose / open it
  
  This is especially useful in Open / Save dialogs!

- ***View / navigate to ancestor folder***

  `Right Click` the title of the folder in the toolbar to reveal parent folders, then `Click` any folder to navigate to it.

- ***View / navigate to previous folders***

  Two ways to do this:

  - `Cmd` + `[` / `]` to go back / forward in history
  - `Long press` the **"Back"** or **"Forward"** buttons to reveal the history of folders, then `Click` any folder to navigate to it

- ***Use spring-loaded folders***

  You can `Drag` files or folders onto other folders (or tabs!) and pause for a split second to reveal their content, then:

  - `Drop` the item to move (hold `Opt` to copy)
  - `Drag` the folder outside of the Finder window to return to the original folder
  - Repeat the process for nested folders
  - Hit `Esc` to cancel
  
### File operations

- ***Move (vs copy) files***

  Use the normal `Cmd` + `C` to copy, then either `Opt` + `Cmd` + `V` to move. Alternatively, use the `Right Click` menu, hold `Opt` and choose **"Move Item Here"**.

- ***View additional menu options***

  Wherever a file or context menu is shown, hold `Opt` and optionally `Shift` to display additional / alternate options.

- ***Batch rename files***

  You can batch rename files by replacing text, adding text, or using a custom format:

  - Select multiple files
  - `Right Click` and choose **"Rename..."** 
  - In the popup that appears, choose your options then click **"Rename"**

### Developer tips

- ***Toggle hidden files***

  `Cmd` + `Shift` + `.` to toggle display of hidden files (works in windows and dialogs). 

- ***Grab the path of any folder***

  There are two ways to do this:

  - Use `Cmd` + `C` to copy a file or folder, then `Cmd` + `V` to paste the path into a text-based app
  - Or, `Right Click` any file or folder, hold `Opt` and choose **"Copy [name of the file] as Pathname"**

- ***Drag the path of the current folder***

  If you hover over the title of the folder in the Finder's toolbar, it will reveal an icon. `Click` and `Drag` the icon wherever you need it (for example a terminal window) to drop the full path.


### Managing windows

This should work in _all_ applications.

- ***Cycle through windows***

  `Cmd` + `` ` `` / `Cmd` + `Shift` + `` ` `` to cycle to the next / previous application window.

- ***Merge all windows***

  From the **Window** menu choose **"Merge All Windows"** to replace all open windows with a single window of tabs.

## Bonus tips!

You may already know some of these.

- ***Resize a column automatically***

  `Double Click` a column border to automatically resize it to fit the content.

- ***Resize a window from the center***

  `Alt` + `Drag` a window edge to resize it from the center.

- ***Preview file content***

  - Hit `Space` to pop up a window with the file's content
  - Hit `Opt` + `Space` to start a slideshow
  - Use `Left` / `Right` to cycle through files

- ***Use the Inspector as live "Get info"***

  `Right Click` any item, hold `Opt` and choose **"Show Inspector"** to get live info on files, selections, folder sizes, etc.

- ***Paste files to other applications***

  Depending on the target application, copying and pasting a file to another application can do different things:

  - in text editors, it will paste the path
  - in Keynote or Word, it will paste the file's content directly into the document
  - in Photoshop, it will paste a high resolution image of the icon
  - in WebStorm:
    - in the project tree, it will copy the file
    - in a Markdown document, it will copy a PNG file of the icon and insert the path

  In other apps, who knows!? It's not as consistent as Windows, so experiment to find out.
