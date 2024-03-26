---
description: An Excel Macro to partially copy named columns between sheets
date: 2024-03-25
media:
  featured: ./featured.png
  thumbnail: ./featured.png
  opengraph: ./featured.png
  excel:
    - ./images/excel-bank.png
    - ./images/excel-breakdown-01.png
    - ./images/excel-breakdown-02.png
tags:
  - vba
  - tools
  - productivity
---

# Excel "copy columns" macro

## Intro

As part of my bookkeeping process I download CSVs and copy selected columns to a more simplified sheet, before moving the individual values into categorised columns to help with budging and accounting requirements:

<MediaGallery media="excel" />

The most time-consuming and error-prone part of this process is selecting and copying the CSV data:

![](./images/copy-example.png)

To do this I have to:

- identify source and target columns
- identify previous and current dates
- review and reconcile incomplete date ranges
- insert correct number of target rows (so any target `SUM()`s are pushed down)
- select and copy partial source column data, in target column order (possibly via a temporary sheet)
- review / redo if I made any mistakes
- repeat for each account
- repeat for each accounting period

I've been wanting to automate this for _years_, so this weekend I dusted off my ancient VBA skills and finally got to it.

## Usage

Below is the macro in action, on an example expenses sheet:

![excel copy columns macro](./images/excel-macro.gif)

Running the macro will:

- read header cells from the `target` sheet
- read the bottom line `Date` in the `target` sheet
- grab the corresponding partial `source` columns, from the next full day
- confirm the number of entries and sheets
- copy the values to the `target` sheet

A few nice UX touches; the macro:

- uses `target` sheet headings to determine required data
- will start from the active `source` row, if no `Date` column or matched date
- inserts full rows before pasting, so any column `SUM`s are shifted down
- pastes values only, so target formatting is respected 
- shows a selection preview during confirmation
- selects the final pasted data

Note that if there is a mismatch between the number of starting date entries between the source and target sheets, the macro will warn – and if continuing – will create duplicates in the target sheet which can be manually edited.

## Installation

### Download

The example macro-enabled workbook above can be found here:

- [expenses-example.xlsm](https://1drv.ms/x/s!AgFKfJKDVaVlly9l7JA24feSlsbX)

To download and use locally, choose:

- `File` &gt; `Save As` &gt; `Download a Copy`

### Running the macro

To run the macro in the downloaded workbook, choose:

- `Developer` > `Macros` > `Copy_Columns` > `Run`

> Note that there is no undo for Excel macros, so be sure to save the sheet before running.

If you can't see the `Developer` ribbon entry, you may need to enable it in preferences:

![Excel preferences to enable the Developer ribbon item](./images/prefs-ribbon.png)

To make the macro globally available, you will need to copy it into a module in the global "personal" workbook:

- [Personal Macro Workbook in Excel - make macros available in all workbooks](https://www.ablebits.com/office-addins-blog/excel-personal-macro-workbook/)

### The VBA code

A copy of the code (should you not want to install) is available here:

- [excel - copy columns.vba](https://gist.github.com/davestewart/8301538c48a09162e868665ec67d6f3a)

It's very-well commented, so take a look if you want to know what's going on under the hood.

Excel VBA is a little tricky, but I've hopefully iterated on it enough times to identify the footguns, and there's hopefully a certain level of resilience that it should now work in most scenarios. Feel free to leave a comment if you spot any bugs, or need help to understand the code.

FWIW [I used Chat GPT](https://chat.openai.com/share/8f534429-f345-434e-8262-073f6b83465b) to help me work out a lot of it!

## Summary

The end result should mean when I need to do my accounts, I can just:

- paste in the new CSV rows
- run the macro to copy values
- just get on with categorising

I'm publishing online for both reference and backup; hopefully it will be useful to others too.
