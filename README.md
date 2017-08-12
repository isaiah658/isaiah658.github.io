# isaiah658.github.io #

# Introduction #
This is an audio visualizer video maker / creator that uses HTML5 only. It has a sidebar which has options for picking the background image, visualizer type, color, etc. In the main area the visualizer is a canvas element. The animation is drawn using requestAnimationFrame to update the canvas. The canvas is recorded using captureStream and MediaRecorder. There are some limitations and caveats due to it being HTML5. I've included them along with other documentation inside the web page itself. Just click the open documentation button on the very top of the sidebar which gives details on options, limitations, credits, etc. You can also view the same info on the wiki: https://github.com/isaiah658/isaiah658.github.io/wiki

Here is the website link to use the video maker: https://isaiah658.github.io or you can download this project/repository and open the index.html file.

Here is a video demonstration of some visualizations I made to try and showcase what is possible: https://youtu.be/CDO8nstm4I0

# Credits #
A huge thank you must be given to apprentice.craic.com and patrick-wied.at. Both of these people/websites gave the the initial guidiance to understand how to work with audio data in HTML5 and how to use the data for visualizations. Also shoutout to Kaiido on stackoverflow for posting a solution to make audio recording work in Firefox.

An additional thank you goes out to Willian Justen and InternetGB for allowing me to use and adapt their visualizers into this project. Willian Justen made the original spinning triangles visualizer and InternetGB made the InternetGB visualizer (it's unique and hard to name so I named it after the creator).

In regards to the licensing, please keep in mind that this project includes a font called Nunito by Veron Adams and is licensed under the SIL Open Font License Version 1.1. In no way am I claiming that I made it nor is it licensed under the MIT license. The SIL Open Font License allows for redistribution and bundling with other software. The license is included in the resources/fonts folder as a text file called open-font-license.txt.

This project also uses a JavaScript library called FileSaver.js which is used for automatically triggering a file download for blob files and text files. FileSaver.js just so happens to also be licensed under the MIT license, but I want to make it clear that I did not make it nor do I take any credit for it.

# Changelogs #
Version 1.1.1
 - Made a small change for how the outline is drawn for the bubbles visualizer to fix an issue where a line was appearing inside the circle which was visible when the fill type was set to none.
 
Version 1.1.0
 - Made a few changes to the sidebar to better accomodate setting names that will take up multiple lines. Also added an outline effect to hopefully make it easier on the eyes to tell which box releates to which setting.
 
 - Added in three new visualizers! One is called spinning triangles and was made by Willian Justen who allowed me to take his code and adapt it as needed for this project. The second one is called InternetGB and is named after the user InternetGB (Internet Good Boy) who originally made the visualizer. He also was very kind and allowed me to adapt and use his code in this project. The third visualizer is called bubbles and was made by me.
 
 - Added in a slider that allows you to jump to any point in the song while playing the preview. Very useful if you are messing with settings to try and get a specific part of the song to look right in the visualizer. You can also go forward or backwards allowing you to preview the same thing multiple times.
 
 - A few more visualizer options were added due to needing to address some customization aspects that both the Spinning Triangles and InternetGB visualizers needed. They will also be useful for future visualizers.
 
 - Reworked the load preset option to allow for having built-in presets in addition to loading user presets from files.
 
 - Fixed a bug with certain visualizers messing up the origin point for the fill style and stroke style. Wouldn't make a difference for solid colors but was noticeable right away when using a gradient or image.
 
 - Added in checks that set a video bit rate determined by the video width and height. This solved some of the issues where Firefox was having far more compression artifacts than Chrome/Chromium.
 
 - Discovered a bug in Chrome/Chromium that makes recording at high resolutions and high fps eat up an incredible amount of RAM causing the "Aww snap" error message to appear. Around 1920 x 1080 at 60 fps was causing the issues. Found that the bug was already reported on crbug.com and that the issue is being addressed. A work around was thankfully found and posted by one of the people working on the issue. Essentially what is happening is the encoder at some point can't keep up with the amount of frames coming in. This causes a buffer. The buffer fills and fills and then "Aww snap"! Setting your canvas context to canvas.getContext('2d', {alpha: false}); helps aleviate the issue becuase Chrome/Chromium supposedly has to do something twice due to alpha transparency. Setting the alpha to false makes it only need to do whatever it is once. Huge performance gains by doing this. Also for those curious the alpha false only seems to refer to all the pixels on the canvas having full opacity. You can still have transparency in things that you put over the background though. This was not an issue for myself because I always fill the entire canvas with either the background color and/or a background image. Here is the link to the bug report if interested: https://bugs.chromium.org/p/chromium/issues/detail?id=735984&q=mediarecorder%20memory&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified
 
 - Fixed (I think) a few oversights with the audio recording workaround for Firefox. Mainly it was things like not removing the audio and video tracks from the media stream after recording and the fact that the audio was always connecting to the audio stream even if it wasn't needed.
 
 - Probably some other things that I did and forgot. Oh I was also able to record at 3840 × 2160 at 50 fps without causing the memory issue in Chrome/Chromium. And yes the recording actually was 50 fps in the video file and the quality looked sharp. :) Of course the recording can't be too long due to the video itself needing to fit under the 500MB RAM limit in Chrome/Chromium. Maybe one day 7680 × 4320 will be possible?

Version 1.0.1
 - Fixed a bug where saving a preset didn't work.

Version 1.0.0
 - Initial public release.
