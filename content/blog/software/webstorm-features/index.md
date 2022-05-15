---
description: The WebStorm features and tools I use everyday to write better code and build bigger apps 
date: 2022-04-22
media:
  thumbnail: ./webstorm-splash.png
  opengraph: ./webstorm-splash.png
  video:
    src: https://www.youtube.com/embed/JlyMK-3peeo
---

# WebStorm Power User Manual 

## Intro

### Overview

In April 2022 I did a Webinar with JetBrains titled [WebStorm's Power User Manual](https://blog.jetbrains.com/webstorm/2022/04/webstorms-power-user-manual/).

Along with [Margaux Flores](https://twitter.com/mrgxflrs) we shared some of our favourite WebStorm features in a fairly freewheeling discussion.

This article accompanied the webinar and is what I was using to make sure I'd covered as much as I could in the time, as well as giving attendees a prompt to ask questions or request demos.

For JetBrains' own one-page intro to WebStorm, see their excellent [Getting Started](https://www.jetbrains.com/help/webstorm/getting-started-with-webstorm.html) article.

Thanks again to [JetBrains](https://twitter.com/jetbrains), [Paul Everitt](https://twitter.com/paulweveritt) and [Aleksandra Aganezova](https://blog.jetbrains.com/author/aleksandra-aganezova-jetbrains-com/).

### Content 

Because WebStorm is already so well documented, so I've listed _only_ the features rather than adding screenshots, etc.

For each feature there's:

- the feature name / purpose
- a link to the docs
- a short description / tips
- any shortcut key

If you want to get the most out of WebStorm, I recommend trying each of these features for yourself. If you have any questions or comments, I'd be glad to answer them below.

See my article on WebStorm's [keyboard shortcuts](/blog/webstorm-shortcuts/) to get _way_ more done without taking your hands off the keyboard.

### Quick links

<NavToc exclude="intro" />

## UI

General

- [Get to know](https://www.jetbrains.com/help/webstorm/guided-tour-around-the-user-interface.html) the user interface so you don't feel overwhelmed
- [Arrange tool windows](https://www.jetbrains.com/help/idea/manipulating-the-tool-windows.html) in one of 8 dock locations that makes sense to you
- [Pin or unpin](https://www.jetbrains.com/help/idea/viewing-modes.html) tool windows so they stay prominent (**Dock Pinned**) or get out of your way (**Dock Unpinned**)
- [Save and restore](https://www.jetbrains.com/help/idea/manipulating-the-tool-windows.html#restore) your ideal arrangement so you don't need to set up each individual project

Tabs

- [Configure tabs](https://www.jetbrains.com/help/webstorm/settings-editor-tabs.html) to show more of them vertically
- [Split views](https://www.jetbrains.com/help/webstorm/using-code-editor.html#split_screen) to work on multiple files simultaneously

Lists

- [Type in any list](https://www.jetbrains.com/help/idea/speed-search-in-the-tool-windows.html) (Project, Recent Files, Find in Files, etc) to filter / highlight entries


## Project

Projects

- [Manage Projects](https://www.jetbrains.com/help/webstorm/opening-reopening-and-closing-projects.html#removing_project_from_recents) (add `Cmd` + `Shift` + `P`) using the popup to quickly view, filter and open projects

Scopes

- [Configure scopes](https://www.jetbrains.com/help/webstorm/configuring-scopes-and-file-colors.html) to limit operations to [files and folders](https://www.jetbrains.com/help/webstorm/scope-language-syntax-reference.html) using a special scope path syntax
- [Filter Project by Scope](https://www.jetbrains.com/help/webstorm/project-tool-window.html#views) (including [open and changed files](https://www.jetbrains.com/help/webstorm/configuring-scopes-and-file-colors.html#predefined-scopes-list)) using the dropdown in the Project view toolbar
- [Search within Scope](https://www.jetbrains.com/help/webstorm/finding-and-replacing-text-in-project.html#limit_search) using the Scope option in the [Find in Files](https://www.jetbrains.com/help/webstorm/finding-and-replacing-text-in-project.html) dialog

Folders

- [Mark as Excluded](https://www.jetbrains.com/help/webstorm/indexing.html#exclude) so their content isn't indexed and doesn't clutter search results
- [Mark as Resource Root](https://www.jetbrains.com/help/webstorm/configuring-project-structure.html#content-root) to hint WebStorm into providing path auto-completion for assets 

Files

- [Search for files](https://www.jetbrains.com/help/webstorm/searching-everywhere.html#ws_search_files) (`Cmd` + `Shift` + `O`) and type to filter and press `Enter` to open
- [Open recent files](https://www.jetbrains.com/help/webstorm/navigating-through-the-source-code.html#recent_files) (`Cmd` + `E`) and type to filter then press `Enter` to open
- [Locate current file](https://www.jetbrains.com/help/webstorm/navigating-through-the-source-code.html#scroll_to_from_source)  in the Project view by clicking the cross-hairs icon in the Project view toolbar

Scratch files

- [Scratch Files](https://www.jetbrains.com/help/webstorm/scratches.html) (`Cmd` + `Shift` + `N`) let you work on temporary notes, code, styles, or any other file type!
- [Run or debug](https://www.jetbrains.com/help/webstorm/scratches.html#ws_scratches_run_debug) the scratch file by `Right Click` then choose "Run Scratch" or "Debug"
- Use the [Quokka](#plugins) plugin (free and paid versions available) for additional code insight

## Editing

Cursor

- [Navigate edits](https://www.jetbrains.com/help/webstorm/navigating-through-the-source-code.html#find_cursor_edit) (`Cmd` + `[` / `]` ) to go to and from last edit locations, even across files
- [Multiple carets](https://www.jetbrains.com/help/webstorm/multicursor.html) (`Alt` + `Click` / `Drag`) allow you to make multiple simultaneous edits and selections
- [Copy and paste](https://www.jetbrains.com/help/webstorm/multicursor.html#copy-and-paste-multiple-selection-ranges) to and from multiple carets to manipulate code like a pro!

Selection

- [Extend / shrink](https://www.jetbrains.com/help/webstorm/working-with-source-code.html#editor_code_selection) the selection (`Alt` + `Up` / `Down`) to intelligently select by context boundaries
- [Select multiple occurrences](https://www.jetbrains.com/help/webstorm/multicursor.html#multiple_words) (`Ctrl` + `G` / `Shift` + `Ctrl` + `G`) as an interactive alternative to Find and Replace

Manipulation

- [Manipulate lines and selections](https://www.jetbrains.com/help/webstorm/working-with-source-code.html) (move, duplicate, delete, etc) with intuitive keyboard shortcuts
- [Move blocks](https://www.jetbrains.com/help/webstorm/working-with-source-code.html#move-statements) up and down (`Cmd` + `Shift` + `Up` / `Down`) with intelligent positioning and reformatting

Find and replace

- [Use regular expressions](https://www.jetbrains.com/help/webstorm/tutorial-finding-and-replacing-text-using-regular-expressions.html) for exacting search as well as replacement preview [including capture references](https://www.jetbrains.com/help/webstorm/tutorial-finding-and-replacing-text-using-regular-expressions.html#capture_groups_and_backreference)
- [Edit code directly](https://www.jetbrains.com/help/idea/finding-and-replacing-text-in-project.html#work_find_tool_window) in the code preview window! Incredibly useful when you want to manually edit multiple files.
- [Narrow your search](https://www.jetbrains.com/help/idea/finding-and-replacing-text-in-project.html#limit_search) with additional filters, file type or scope

## Coding

Code style

- [Configure code style](https://www.jetbrains.com/help/webstorm/configuring-code-style.html) for any language or markup, globally, per-project, or per-folder (with unbelievable options!)
- [Reformat](https://www.jetbrains.com/help/webstorm/reformat-and-rearrange-code.html) code on the fly (`Cmd` + `Alt` + `L`) according to your configured code style

Intentions

- Use [Code completion](https://www.jetbrains.com/help/webstorm/auto-completing-code.html) (`Ctrl` + `Space`) to show completion suggestions for code and markup
- Use [Intention actions](https://www.jetbrains.com/help/webstorm/intention-actions.html) (`Alt` + `Enter`) on any code or markup member to get a list of clever things you can do
- For the full list, see _Preferences > Editor > Intentions_

Navigation

- [Go to declaration](https://www.jetbrains.com/help/webstorm/typescript-support.html#typescript_code_navigation_go_to_declaration) (`Cmd` + `B` / `Cmd` + `Click`) on any keyword (component, import, tag, CSS class)
- [Show usages](https://www.jetbrains.com/help/webstorm/typescript-support.html#typescript_code_navigation_go_to_usages) popup (`Cmd` + `B` / `Cmd` + `Click`) on any declaration (variable, class) 
- [Find usages](https://www.jetbrains.com/help/webstorm/find-highlight-usages.html) (`Alt` + `F7` / `Right Click` > `Find Usages`) on any file in the Project View

Importing

- Imports are [added automatically](https://www.jetbrains.com/help/webstorm/creating-and-optimizing-imports.html) by simply typing the symbol name and hitting `Tab`
- For existing code, use [Intention actions](https://www.jetbrains.com/help/webstorm/intention-actions.html) (`Alt` + `Enter`) then choose "Import..." to generate the imports

Refactoring

- In the Project view, drag or [move files](https://www.jetbrains.com/help/webstorm/refactoring-source-code.html#ws_refactoring_context_independent_refactorings_copy_rename_move_file_folder) (`F5`) to automatically update imports for the file and its usages 
- Use [move refactoring](https://www.jetbrains.com/help/webstorm/specific-javascript-refactorings.html#javascript_move_refactorings) (`F6`) to move declarations to other files and automatically update imports
- Use [rename refactoring](https://www.jetbrains.com/help/webstorm/specific-javascript-refactorings.html#javascript_rename_refactorings) (`Shift` + `F6`) to rename symbols and automatically update imports
- Use [extract refactorings](https://www.jetbrains.com/help/webstorm/specific-javascript-refactorings.html#javascript_extract_refactorings) to introduce variables, constants, parameters, fields, methods, and functions
- Use [change signature](https://www.jetbrains.com/help/webstorm/specific-javascript-refactorings.html#javascript_change_signature) (`Cmd` + `F6`) to update the function name, params and order, and all calls to that function
- Use the [Refactor This](https://www.jetbrains.com/help/webstorm/refactoring-source-code.html#ws_refactoring_general_procedure_invoke_refactoring) popup (`Ctrl` + `T`) **to get access to all these refactorings** in a single list

Code generation

- [Generate code](https://www.jetbrains.com/help/webstorm/generating-code.html#ws_generating_code_generating_constructors) such as constructors, accessors, and interface implementations automatically
- [Live Templates](https://www.jetbrains.com/help/webstorm/using-live-templates.html) insert code snippets with placeholders, ([intelligent](https://www.jetbrains.com/help/webstorm/template-variables.html)!) variables and `Tab`-completion
- [Postfix Completion](https://www.jetbrains.com/help/webstorm/using-postfix-templates.html) lets you do things like type `value.log` + `Tab` to enter `console.log(value)` 

Smart Keys

- **Anywhere:**
  - Type `< ( { [  " ' ` to insert the corresponding pair
  - Surround selection on typing quote or brace, i.e. hit `[` to get `[selection]`

- **HTML:**
  - Within tags, type `=` to automatically add `""` and place the caret in between
  - Change one tag to automatically [update the other](https://www.jetbrains.com/webstorm/guide/tips/rename-closing-tag/)

- **JavaScript:**
  - Start template string interpolation on typing `$`
  - Convert attributes when pasting HTML into JSX files

- _See the [Smart Keys](https://www.jetbrains.com/help/webstorm/settings-smart-keys.html) help for the full list of languages and smarts_

Language injection

- WebStorm automatically recognises [languages within other languages](https://www.jetbrains.com/help/webstorm/using-language-injections.html) and provides support as the context changes


## Tooling

Commands

- [Search actions](https://www.jetbrains.com/help/webstorm/searching-everywhere.html#ws_search_actions) (`Cmd` + `Shift` + `A`) when you can't quite remember the name of the thing you need to do
- [Search everywhere](https://www.jetbrains.com/help/webstorm/searching-everywhere.html#ws_search_abbreviations) (`Shift` + `Shift`) to find files, actions, panels, preferences, etc

Change lists

- [Manage changelists](https://www.jetbrains.com/help/webstorm/managing-changelists.html) to group changes related to different tasks and commit these sets of changes independently
- [Shelve and unshelve](https://www.jetbrains.com/help/webstorm/shelving-and-unshelving-changes.html) changelists to easily switch tasks and work on them later

Version control

- Powerful and integrated [version control](https://www.jetbrains.com/help/webstorm/version-control-integration.html) including full [repository management](https://www.jetbrains.com/help/webstorm/investigate-changes.html).
- [Track changes](https://www.jetbrains.com/help/webstorm/viewing-changes-information.html#local_changes) from the margin indicators and select, copy, or revert code as needed
- [Compare files](https://www.jetbrains.com/help/webstorm/comparing-files-and-folders.html) and [resolve conflicts](https://www.jetbrains.com/help/webstorm/resolving-conflicts.html#vcs-resolve-conflicts) with the best in the business file comparison tool
- View [version history](https://www.jetbrains.com/help/webstorm/viewing-changes-information.html#changes_history) as well as [local history](https://www.jetbrains.com/help/webstorm/local-history.html) for both files and selections

NPM support

- [Run and debug NPM scripts](https://www.jetbrains.com/help/webstorm/installing-and-removing-external-software-using-node-package-manager.html#ws_npm_run_debug_scripts_from_npm_tool_window) from the dedicated NPM panel
- and jump directly to packages from the JSON

Debugging code

- [Debug NPM scripts](https://www.jetbrains.com/help/webstorm/installing-and-removing-external-software-using-node-package-manager.html#ws_npm_debug_single_script) right from `package.json` or the NPM script panel
- [Debug Node applications](https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html) including [Express servers](https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html#debugLocal)
- Use the [Debugger](https://blog.jetbrains.com/webstorm/2018/01/how-to-debug-with-webstorm/) to stop, inspect and change your code:
  - Add [breakpoints](https://www.jetbrains.com/help/webstorm/using-breakpoints.html#exception-breakpoints) right in the margin
  - [View values inline](https://www.jetbrains.com/help/webstorm/examining-suspended-program.html#inline-view) or [inspect variables](https://www.jetbrains.com/help/webstorm/examining-suspended-program.html) whilst the program is paused
  - [Set variable values](https://www.jetbrains.com/help/webstorm/examining-suspended-program.html#setting-variable-values) in the panel or use the [built-in console](https://www.jetbrains.com/help/webstorm/interactive-debugger-console.html)
  - [Step through](https://www.jetbrains.com/help/webstorm/stepping-through-the-program.html) the code to see what is actually happening
 
Test support

- [Run individual tests](https://www.jetbrains.com/help/webstorm/performing-tests.html) from the margin of the code itself  
- [Explore test results](https://www.jetbrains.com/help/webstorm/viewing-and-exploring-test-results.html) tests from a convenient panel
- View [code coverage](https://www.jetbrains.com/help/webstorm/code-coverage.html) results in both a panel and [the editor](https://www.jetbrains.com/help/webstorm/code-coverage.html#ws_coverage_results_editor)

Web development tools

- [Markdown editor](https://www.jetbrains.com/help/webstorm/markdown.html)
- [Database](https://www.jetbrains.com/help/webstorm/relational-databases.html) (via the [DataGrip](https://www.jetbrains.com/help/datagrip/meet-the-product.html) plugin)
- [CSV Editor](https://www.jetbrains.com/help/webstorm/table-editor.html)
- [HTTP Client](https://www.jetbrains.com/help/webstorm/http-client-in-product-code-editor.html)


## Plugins

Because WebStorm has so much functionality built-in, I don't use that many plugins, but here are some I like: 

- [Quokka](http://quokkajs.com/)

  Run JavaScript and TypeScript directly in WebStorm with instant feedback and live values

- [Awesome Console](https://plugins.jetbrains.com/plugin/7677-awesome-console)

  Displays links to local files (including errors) and opens them in an editor pane

- [DataGrip](https://plugins.jetbrains.com/plugin/10925-database-tools-and-sql-for-webstorm)

  An outrageously good database editing tool, directly in WebStorm  

- [String Manipulation](https://plugins.jetbrains.com/plugin/2162-string-manipulation)

  Case switching, sorting, filtering, incrementing, aligning to columns, grepping, escaping, encoding...
