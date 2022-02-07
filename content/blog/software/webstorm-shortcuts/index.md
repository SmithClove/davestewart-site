---
description: Learn the essential WebStorm keyboard shortcuts to make you the most productive developer in the office
date: 2022-02-07
media:
  thumbnail: webstorm.png
  featured: webstorm.png
---

# WebStorm shortcuts for lightning productivity

WorkFlowy is the most powerful web development IDE there is. If you want to match power with speed get your hands on WebStorm's powerful and intuitive keyboard shortcuts.

<NavToc />

## Editing

### Selection

Selection

- `Alt` + `Up`/`Down` - expand / reduce selection hierarchy
- `Alt` + `drag` vertically - select multiple blocks or starts/ends of lines
- `Alt` + `double-click` - multiple selection
- `Ctrl` + `G` - select next same word (forward)
- `Ctrl` + `Shift` + `G` - deselect next same word (backward)

Multi-caret operations (video [here](https://www.youtube.com/watch?v=PIqBf7Ekjgk))

- _Start typing to modify text on all lines_
- `Arrow` keys to move carets around
- `Home` / `End` - jump to home / end on all lines
- `Cmd` + `C` - copy ranges
- `Cmd` + `V` - paste into / over ranges`
- `Delete` - pull all lines onto one line
- `Esc` / `Click` - clear selection

Modifications once selected

- Type `< ( { [  " '` - wrap the word with the corresponding pair, i.e. hit `[` to get `[selection]`

### Modification

Whole-line modification

- _Place caret anywhere within line then_
- `Cmd` + `C` - copy whole line
- `Cmd` + `X` - cut whole line
- `Cmd` + `D` - duplicate selection / line
- `Cmd` + `Backspace` - Delete whole line

Move text

- `Cmd` + `Alt` + `Up`/`Down` - move selection/line up/down
- `Cmd` + `Shift` + `Up`/`Down` - move statement (function, tag block) up/down

Formatting

- `Cmd` + `Alt` + `L` - reformat code
- `Cmd` + `Shift` + `U` - toggle case

## Assistance

### Intelligence

Coding assistance

- `Cmd` + `P` - show function parameters
- `Alt` + `Enter` - Show intentions
- `Ctrl` + `Space` - show completions

Refactoring

- `F6` - Move file / namespace / function
- `Shift` + `F6` - Rename file / namespace / function / variable
- `Cmd` + `Alt` + `V` (then `Up` / `Down`) - Extract variable
- `Cmd` + `Alt` + `C` (then `Up` / `Down`) - Extract constant
- `Ctrl` + `T` - Refactor this... (all these commands and more)

### Code generation

Live templates

- `Cmd` + `J` - show available templates, then `Tab` to insert
- Or simply type template key (i.e. `forin`) + `Tab` - add template with placeholders 
- _See all, enable / disable, or add your own via `Cmd` + `,` + type `live`_

Postfix completion

- Type `.log` + `Tab` - convert expression to `console.log(<expr>)` 
- Type `.if` + `Tab` - convert expression to `if (<text>) { ... }`
- _See all, enable / disable, or add your own via `Cmd` + `,` + type `postfix`_

## Navigation

### Editor

Code / Markup

- _Works in JavaScript, HTML, CSS, anywhere, and across domains! Pretty-much everything is clickable_ 
- `Cmd` + `Click` symbol name - go to declaration
- `Cmd` + `Click` declaration - see all usages

Cursor

- `Cmd` + `[` - Go to previous edit point
- `Cmd` + `]` - Go to next edit point

### Project

Files

- `Cmd` + `Shift` + `O` - Open file
- `Cmd` + `Shift` + `N` - create scratch file

Windows

- `Cmd` + `E` - show recently opened files
- `Alt` + `F1` - go to current file in... (project, explorer, changes, browser, etc)
- `Ctrl` + `Tab` - quick-switch editor panes

### Text

Find text in project

- `Cmd` + `Shift` + `F` - find text in path
- `Cmd` + `Shift` + `R` - replace text in path
- `Alt` + `F7` - find usages (whilst a file is selected)

Find in project / application

- `Shift` + `Shift` - Find anything (files, classes, shortcuts, preferences, etc)
- `Cmd` + `Shift` + `A` - find action
- `Cmd` + `Alt` + `O` - find symbol
- `Cmd` + `O` - find class


## Application

Click any list (Project hierarchy, Code Structure, Find Results, etc) then

- Start typing to filter / highlight
- Use wildcards to filter, like `*.jpg`
- Use fuzzy matching, i.e. `pn` to find `[P]age[N]ode`
- Use partial completion, like `su na fe`
- Use `/` to disambiguate folders, like `s/c/app`

Preferences

- `Cmd` + `,` - Show preferences dialog
- Type anything - find preference

## Touchbar

### Custom touchbar icons

For touchbar Macs, unfortunately it's impossible to use the F-keys mentioned above, so instead you can configure touchbar icons and use the touchbar instead:

<img src="./touchbar.png" style="margin-left: 1rem; max-width: 700px;">

Download the icons here:

- [touchbar-icons.zip](https://github.com/davestewart/davestewart-site/tree/main/content/blog/software/webstorm-shortcuts/touchbar-icons.zip)

Thanks to [Iconscout](https://iconscout.com/unicons/explore/line) for their excellent free icons which let me get started with this.

### Configuration

<img src="./touchbar-config.png" style="margin-left: 1rem; max-width: 270px;">

To add the icons:

- Go to **Preferences** > **Appearance & Behavior** > **Menus and Toolbars**
- Choose **Touch bar** > **Default**
- Click the `+` button
- Choose which actions to add

Once done:

- Select each action individually
- Click the `Edit` icon in the toolbar
- Pick the appropriate icon from your hard disk 

### Debugger touchbar bug

Because of a bug in WebStorm, if you use the Node Debugger, the debugger touchbar overrides the default touchbar, hiding the project shortcuts.

To fix this, go to the preferences, and simply delete the touchbar folder. Don't worry! The debugger controls are easily available via the main Debugger UI.
