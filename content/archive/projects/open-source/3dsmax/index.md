---
description: An extensive collection of plugins and scripts for 3dsmax
date: 2001-01-01
tags:
  - 3dsmax
  - plugin
  - framework
  - ui
media:
  opengraph: ./3dsmax.png
  thumbnail: ./3dsmax.png
  featured: ./3dsmax.png
---

# 3dsmax plugins

## Overview

A collection of MaxScripts written over an 8 year period for Autodesk's [3dsmax](https://www.autodesk.co.uk/products/3ds-max/overview) which I used both in my own work and sharing with the amazing 3dsmax community:

- check the original posts and comments [here](https://davestewart-io.vercel.app/category/3dsmax) or browse below
- view the code at [github.com/davestewart/maxscript](https://github.com/davestewart/maxscript)

## Plugins

### Animation

- **Transform Presets**<br>
  Save and restore transformations as presets to objects such as cameras, IK handles, etc.
- **Particle Visualizer and Papervision3D Exporter**<br>
  A script to visualize particle motion and export particle and camera data to Flash's Papervision 3D
- **After Effects Tracker**<br>
  Export 3dsmax objects' tracking data (4-corner pin, 2 point track, position) directly to After Effects
- **Camera Animator**<br>
  Animates a master camera thourgh a series of locked-off shots, and user-defined times
- **Path Controller 2**<br>
  A scripted controller setup that allows you to animate the distance along a path in real-world units
- **Filter Trackbar Keys**<br>
  Show only specific keys / tracks on the trackbar
- **Animated Surface Align**<br>
  Stick one animated object to the animated surface of another, maintaining orientation in 3 axis
- **Scripted Look-at Controller**<br>
  A 1-dimensional look-at; useful for trees, billboards, etc.

### Cameras

- **Transform Presets**<br>
  Save and restore transformations as presets to objects such as cameras, IK handles, etc.
- **Network-Render all Cameras**<br>
  Automatically submit all cameras to a network render, rendering the correct frames, and save the output to the correct directories
- **Camera Animator**<br>
  Animates a master camera thourgh a series of locked-off shots, and user-defined times
- **Vertigo**<br>
  The classic Hitchcock "Vertigo" effect

### Development Tools

- **"List" struct**<br>
  Easily create associative array-like structures in 3dsmax
- **Time Stamper**<br>
  A struct to make light work of timing tasks, benchmarking, etc
- **Progress Bar Updater**<br>
  A struct to simply and easily update a progress bar by providing just start and end values, and calling update()
- **UI Manager**<br>
  Save and load rollout settings, such as size, position, control states, items, etc to a preferences file
- **ActiveX Inspector**<br>
  Lists all ActiveX controls, and lets you interactively test their methods and properties
- **VMS Tidy**<br>
  Re-arranges and beautifies Visual MaxScript output
- **Excel Functions**<br>
  A set of functions to get you started with communication with Excel

### Fun

- **MAXSnake!**<br>
  Use your mouse to play a variation on the classic arcade game 'Snake'!
- **Spherical Spline**<br>
  Create a perfect sphere using just one spline
- **Z-buffer to boxes**<br>
  Visualize the z-buffer of an image using boxes
- **Random 3D Spline**<br>
  A bit of fun that animates a line!

### Functions

- **"List" struct**<br>
  Easily create associative array-like structures in 3dsmax
- **Time Stamper**<br>
  A struct to make light work of timing tasks, benchmarking, etc
- **Multimaterial From Folder**<br>
  Create a set of multimaterials from a folder of textures

### Materials

- **Multimaterial From Folder**<br>
  Create a set of multimaterials from a folder of textures
- **Random Multimaterial**<br>
  Creates families of slightly-random multimaterials
- **MultiMaterial Propogator**<br>
  Creates a multimaterial from a folder of bitmaps, based on a template material
- **Plane from bitmap**<br>
  Builds both planes and materials from a folder of images
- **Default Material**<br>
  Applies a default material to objects on creation

### Modelling

- **Spline Tools**<br>
  Tools for easily editing the in and out tangents of a spline shape
- **Spherical Spline**<br>
  Create a perfect sphere using just one spline
- **Collapse and Replace**<br>
  Collapse multiple objects into one mesh, preserving materials, and optionally replace a single target object.
- **Twist Profile**<br>
  Apply a curve-defined twist to any geometry

### Particles

- **Particle Visualizer and Papervision3D Exporter**<br>
  A script to visualize particle motion and export particle and camera data to Flash's Papervision 3D

### Rendering

- **Network-Render all Cameras**<br>
  Automatically submit all cameras to a network render, rendering the correct frames, and save the output to the correct directories
- **Render Size Presets**<br>
  A dockable toolbar providing controls to quickly render different sized images
- **RenderWanger**<br>
  Save and load render presets

### Text

- **Text LOD**<br>
  Toggle the geometry of a text object with a bitmap for lightening-quick viewport updates
- **Simple Credits**<br>
  Creates sequential text objects. Useful for credits, etc.
- **Text Layout Tools**<br>
  Tools for quickly laying out (and naming) text shapes for modelling and animation

### UI Design

- **Progress Bar Updater**<br>
  A struct to simply and easily update a progress bar by providing just start and end values, and calling update()
- **UI Manager**<br>
  Save and load rollout settings, such as size, position, control states, items, etc to a preferences file
- **ActiveX TreeView Functions**<br>
  A set of functions for manipulating ActiveX Treeviews
- **HTML Help Template**<br>
  An HTML template for a good-looking help system for your scripts
- **Flash UI Examples**<br>
  Character select, graphing and joystick control examples of using Flash as a rich interface to 3dsmax
- **HTML Interface**<br>
  A set of functions that allow you to run any MaxScript command from a rollout's ActiveX HTML control
- **Easy Icons**<br>
  A range of code-only icons to spice-up your UI and minimize distribution files

### Utilities

- **Soft Instance**<br>
  Instance an object leaving certain properties un-instanced. Useful to create families of objects with variations upon a theme
- **Copy Hierarchy Names**<br>
  Copies names from one hierarchy to another, replacing text such as 'left' to 'right'
- **3ds Converter**<br>
  Batch-converts 3ds files to max format

### Widgets

- **Copy Object Properties**<br>
  A quad-menu shortcut to quickly copy properties from another object
- **Hide Objects According to Visibility**<br>
  Make objects properly "invisible" in the viewports when their visibility is 0
- **AutoZoom**<br>
  Auto-zooms the display to the selected object
- **Open all groups**<br>
  Recursively set all groups open or closed.
- **Spinner Precision**<br>
  Quickly set the spinner precision

### Workflow

- **Show Last-hidden**<br>
  Unhide geometry in the order it was hidden
- **Viewport Layout Manager**<br>
  Adds a toolbar that allows you to swap between viewport layouts on the fly, remembering settings per viewport between layouts.
- **Open Most-recent File**<br>
  Opens the most recent file, be it an autobackup or a saved file
- **Get Unmapped Objects**<br>
  Selects all objects without proper mapping co-ordinates
- **Macro Lister**<br>
  Scans all installed macros by category, and creates a dockable tree-view
- **Flash UI Examples**<br>
  Character select, graphing and joystick control examples of using Flash as a rich interface to 3dsmax
- **Set and get paths**<br>
  Assign default paths to both scene and MAXScript directories
