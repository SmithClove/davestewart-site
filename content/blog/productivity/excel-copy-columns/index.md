---
description: An Excel Macro to partially copy named columns between sheets
date: 2024-03-25
media:
  featured: ./excel-copy.png
  thumbnail: ./excel-copy-thumb.png
  excel:
    - ./images/excel-bank.png
    - ./images/excel-breakdown.png
tags:
  - vba
  - tools
  - productivity
---

# Excel "copy columns" macro

## Intro

As part of my home and business accounting I download CSVs from my bank.

I add the raw data to an Excel workbook, then partially-copy specific columns from `bank` to `breakdown`:

<MediaGallery media="excel" />

This allows me to categorise and sum individual cost centers, for budgeting,  accounting and tax requirements. 

Unfortunately, the column-copying step is both time-consuming and error-prone:

- identify last-updated date
- identify target columns
- insert new rows to (ensure breakdown `SUM()`s aren't broken)
- copy partial column data in order (possibly via a temporary sheet)
- review to ensure no mistakes
- repeat for each account
- repeat for each accounting period

I've been wanting to automate this for _years_, so this weekend I dusted off my ancient VBA skills and finally got to it.

## Usage

Below is the macro in action, on an example expenses sheet:

![excel copy columns macro](./images/excel-macro.gif)

Running the macro will:

- read header cells from the `target` sheet
- check for the bottom line `Date` in `target` (or copy from the current `source` row)
- grab the corresponding partial `source` data
- confirm the number of entries and sheets
- copy the values to the `target` sheet

A few nice UX touches; the macro:

- copies column data using the heading order from the `target` sheet
- inserts full rows before pasting, so any column `SUM`s are shifted down
- pastes values only, so target formatting is respected 
- shows a selection preview during confirmation
- selects the final pasted data

Excel VBA is a little tricky, but the code provides a decent amount of resilience so that it should work in most scenarios.

## Installation

The example macro-enabled workbook above can be found here:

- [expenses-example.xlsm](https://1drv.ms/x/s!AgFKfJKDVaVlly9l7JA24feSlsbX)

To download and use locally, choose:

- `File` &gt; `Save As` &gt; `Download a Copy`

To run the macro in the downloaded workbook, choose:

- `Developer` > `Macros` > `Copy_Columns` > `Run`

> Note that there is no undo for Excel macros, so be sure to save the sheet before running.

If you can't see the `Developer` ribbon entry, you may need to enable it in preferences:

![Excel preferences to enable the Developer ribbon item](./images/prefs-ribbon.png)

To make the macro globally available, you will need to copy it into a module in the global "personal" workbook:

- [Personal Macro Workbook in Excel - make macros available in all workbooks](https://www.ablebits.com/office-addins-blog/excel-personal-macro-workbook/)

The raw VBA code (should you want it) is available here:

- [excel - copy columns.vba](https://gist.github.com/davestewart/8301538c48a09162e868665ec67d6f3a)

The code is very-well commented, so take a look if you want to know what's going on under the hood.
