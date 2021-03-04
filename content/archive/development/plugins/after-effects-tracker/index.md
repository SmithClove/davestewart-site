---
description: Export 3dsmax objects' tracking data (4-corner pin, 2 point track, position) directly to After Effects
date: 2006-10-10
tags:
  - after-effects
  - creative
  - 3d
  - 3dsmax
media:
  thumbnail: ./images/3dsmax-plugins-feature-01.png
  featured: ./images/3dsmax-plugins_afx-tracker.png
  compare:
    - ./images/afx_tracker_render.jpg
    - ./images/afx_tracker_viewport.jpg

---

# After Effects Tracker

As part of a [series of promos](/archive/work/animation/jetix/) commissioned by Jetix, we ([Huge Designs](http://www.hugedesigns.co.uk) and I) needed to incorporate up to 15 different characters into a reusable promo "base" that could be changed each month to provide variety. Our storyboard demanded 3D, yet the characters were 2D, and rendering the same complex sequences, re-comping and outputting would have been an impossible task from both time, budget and sanity perspectives!

So, the plan was to render out one complex 3D sequence, do all the sexy post-production in After Effects, then comp-in the characters, as quick post-process, so the whole thing appeared seamless.

## Enter After Effects Tracker...

After Effects Tracker is designed to compliment the tracking tools found in After Effects, by transforming and exporting 3D data (world-space) to 2D data (screen-space) that After Effects can use. The following data can be exported:

- One-point track (position)
- Two-point track (position and rotation)
- Four-point track (corner pin effect)
- Depth (Z-buffer information)

After processing an object in the 3dsmax scene, After Effects-compatible data is copied to the clipboard, that can simply be pasted onto an After Effects layer as key frames, mirroring the 3dsmax scene verbatim

## End result

<MediaGallery media="compare" />

## Interface

Below you can see how it's a simple case of selecting the appropriate objects and clicking "Export".

Where needed, the vertex positions can be visualized and compared to the After Effects scene to make sure any corner pinning is achieved the right way round, and not mirrored or rotated.

![](./images/afx_tracker_ui.gif)

## From 3dsmax to After Effects

In the case of getting our 2D characters existing believably within the scene, I knew I would be able to achieve the effect using combination of corner pinning and Z-buffer information, along with a little matting where needed. The process was as follows:

1. **Animating and exporting the 3dsmax scene data:**
    - Build, animate and render the 3dsmax scene
    - Position the 3D planes for each shot to face the camera as directly as possible
    - **Export** the corner-pinning and depth data
2. **Positioning the character layer within the After Effects composition:**
    - Within the After Effects comp, place a 2D character on the top layer of the rendered footage
    - Apply the **Corner Pin** effect to the character layer and paste the corner pin data to give the illusion of the character being positioned correctly in 3D space
3. **Matting in the character so it doesn't appear to float on top of the footage:**
    - Duplicate and isolate the roller coaster car layers using an **ID-matte**, then place above the character layers
    - Apply the **depth information** exported earlier to any foreground elements, such as roller coaster cars or the track itself, to isolate only the foreground of each layer

## Data

Below is a sample of the exported data:

```
Adobe After Effects 7.0 Keyframe Data

	Units Per Second	25
	Source Width	0.0
	Source Height	0.0
	Source Pixel Aspect Ratio	1
	Comp Pixel Aspect Ratio	1

Transform	Position

	Frame	X pixels	Y pixels	Z pixels
		0	0	0	

Transform	Anchor Point
	Frame	X pixels	Y pixels	Z pixels
		0	0	0	

Effects	Corner Pin #1	Upper Left #2
	Frame	X pixels	Y pixels
	0	-53.172	-31.8445
	1	-52.9779	-35.3856
	2	-52.7437	-38.9376
	3	-52.4771	-42.5169
	4	-52.1589	-46.1085
	5	-51.8003	-49.7146
	6	-51.4037	-53.3403
	7	-50.9531	-56.9749
```

## Download

This plugin is not available for download, however please contact me if you wish to discuss custom 3dsmax / After Effects or any other development.
