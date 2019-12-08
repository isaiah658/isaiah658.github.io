// This file contains the JavaScript for updating the visualizer preview image, playing the preview, and recording

var visualizer = {};

// This updates the visualizer preview image to show what the visualizer looks like when the audio is not playing / silent
// This is NOT used for playing or recording animations
visualizer.update_preview_image = function(){
	config.update_values();
	
	// These are the x and y coordinates of the center point of the visualizer - It starts at the center of the video and moves according to what the user has chosen for positions
	var leftposition = Math.round((config.videowidth/2) + config.left);
	var topposition = Math.round((config.videoheight/2) + config.top);
	
	// Canvas contexts for the visualizer
	var visualizercanvas = document.getElementById("visualizer");
	var visualizercanvasctx = visualizercanvas.getContext('2d', {alpha: false});
	
	// Used for fill color and outline color
	var gradient;
	var pattern;
	
	// Set the visualizer and cached background canvas width and height
	document.getElementById('visualizer').setAttribute('width', config.videowidth);
	document.getElementById('visualizer').setAttribute('height', config.videoheight);
	document.getElementById('visualizer').style.width = config.videowidth+"px";
	document.getElementById('visualizer').style.height = config.videoheight+"px";
	document.getElementById('cachedbgimg').setAttribute('width', config.videowidth);
	document.getElementById('cachedbgimg').setAttribute('height', config.videoheight);
	document.getElementById('cachedbgimg').style.width = config.videowidth+"px";
	document.getElementById('cachedbgimg').style.height = config.videoheight+"px";
	
	// Reset opacity to 1 - Since global alpha can be changed for the fill, stroke, and foreground image it needs to be reset before drawing the background color and background image
	visualizercanvasctx.globalAlpha = 1;
	
	// Fill the background color of the visualizer
	visualizercanvasctx.fillStyle = config.visualizerbgcolor;
	visualizercanvasctx.fillRect(0,0,config.videowidth,config.videoheight);
	
	// Fill the background image of the visualizer if specified
	if (config.bgimg.src != config.blankimg.src){
		config.cachedbgimgcanvasctx.drawImage(config.bgimg,0,0);
		visualizercanvasctx.drawImage(config.cachedbgimgcanvas,0,0);
	}
	
	// Set the rotation
	if (config.rotation != 0){
		visualizercanvasctx.translate(leftposition,topposition);
		visualizercanvasctx.rotate(config.rotation * (Math.PI / 180));
		visualizercanvasctx.translate(-leftposition,-topposition);
	}
	
	// Set the fill type
	if (config.filltype == "solid"){
		visualizercanvasctx.fillStyle = config.fill1;
	}
	else if (config.filltype == "verticalgradient"){
		gradient = visualizercanvasctx.createLinearGradient(0, config.videoheight, 0, 0);
		gradient.addColorStop(0, config.fill1);
		gradient.addColorStop(1, config.fill2);
		visualizercanvasctx.fillStyle = gradient;
	}
	else if (config.filltype == "horizontalgradient"){
		gradient = visualizercanvasctx.createLinearGradient(0, 0, config.videowidth, 0);
		gradient.addColorStop(0, config.fill1);
		gradient.addColorStop(1, config.fill2);
		visualizercanvasctx.fillStyle = gradient;
	}
	else if (config.filltype == "image"){
		if (config.fillimg.src != config.blankimg.src){
			pattern = visualizercanvasctx.createPattern(config.fillimg,"repeat");
			visualizercanvasctx.fillStyle = pattern;
		}
		else {
			visualizercanvasctx.fillStyle = 'rgba(0, 0, 0, 0)';	
		}
	}
	
	// Set the outline type
	if (config.outlinetype == "solid"){
		visualizercanvasctx.lineWidth = config.outlinewidth;
		visualizercanvasctx.strokeStyle = config.outlinecolor1;
	}
	else if (config.outlinetype == "verticalgradient"){
		gradient = visualizercanvasctx.createLinearGradient(0, config.videoheight, 0, 0);
		gradient.addColorStop(0, config.outlinecolor1);
		gradient.addColorStop(1, config.outlinecolor2);
		visualizercanvasctx.strokeStyle = gradient;
	}
	else if (config.outlinetype == "horizontalgradient"){
		gradient = visualizercanvasctx.createLinearGradient(0, 0, config.videowidth, 0);
		gradient.addColorStop(0, config.fill1);
		gradient.addColorStop(1, config.fill2);
		visualizercanvasctx.strokeStyle = gradient;
	}
	else if (config.outlinetype == "image"){
		if (config.outlineimg.src != config.blankimg.src){
			pattern = visualizercanvasctx.createPattern(config.outlineimg,"repeat");
			visualizercanvasctx.lineWidth = config.outlinewidth;
			visualizercanvasctx.strokeStyle = pattern;
		}
		else {
			visualizercanvasctx.strokeStyle = 'rgba(0, 0, 0, 0)';	
		}
	}
	
	// Visualizer Types
	if (config.visualizertype == "verticalbars"){
		visualizer_types.vertical_bars(visualizercanvasctx);
	}
	else if (config.visualizertype == "blockbars"){
		visualizer_types.blockbars(visualizercanvasctx);
	}
	else if (config.visualizertype == "3dbars"){
		visualizer_types.bars_3d(visualizercanvasctx);
	}
	else if (config.visualizertype == "stretchycircle"){
		visualizer_types.stretchy_circle(visualizercanvasctx);
	}
	else if (config.visualizertype == "timedomainline"){
		visualizer_types.time_domain_line(visualizercanvasctx);
	}
	else if (config.visualizertype == "timedomainsquares"){
		visualizer_types.time_domain_squares(visualizercanvasctx);
	}
	else if (config.visualizertype == "spinningtriangles"){
		visualizer_types.spinning_triangles(visualizercanvasctx);
	}
	else if (config.visualizertype == "bubbles"){
		visualizer_types.bubbles(visualizercanvasctx);
	}
	else if (config.visualizertype == "internetgb"){
		visualizer_types.internetgb(visualizercanvasctx);
	}
	
	// If the rotation was set then clear it
	if (config.rotation != 0){
		visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
	}
	
	// Fill the foreground image of the visualizer if specified
	if (config.fgimg.src != config.blankimg.src){
		// Reset the opacity
		visualizercanvasctx.globalAlpha = 1;
		document.getElementById('cachedfgimg').setAttribute('width', config.fgimg.width);
		document.getElementById('cachedfgimg').setAttribute('height', config.fgimg.height);
		document.getElementById('cachedfgimg').style.width = config.fgimg.width+"px";
		document.getElementById('cachedfgimg').style.height = config.fgimg.height+"px";
		config.cachedfgimgcanvasctx.drawImage(config.fgimg,0,0);
		visualizercanvasctx.drawImage(config.cachedfgimgcanvas, leftposition - (config.fgimg.width/2) + config.foregroundpositionleft, topposition - (config.fgimg.height/2) + config.foregroundpositiontop);
	}
};

// This is used to play the audio and record the visualizer animation
visualizer.start = function(recording){
	config.update_values();
	
	// These are the x and y coordinates of the center point of the visualizer - It starts at the center of the video and moves according to what the user has chosen for positions
	var leftposition = Math.round((config.videowidth/2) + config.left);
	var topposition = Math.round((config.videoheight/2) + config.top);
	
	// Canvas contexts for the visualizer
	var visualizercanvas = document.getElementById("visualizer");
	var visualizercanvasctx = visualizercanvas.getContext('2d', {alpha: false});
	
	// Misc options
	var maxheightadjustment = config.maxheight/256;
	var canvasstream;
	var videobitrate;
	var options;
	var recorder;
	var videoData;
	var blob;
	var gradient;
	var pattern;
	
	// These are used for visualizers that need variables that retain their values outside of the rendering loop
	// A common use for these are for motion and movements that get updated each loop
	var spinningtrianglesvars = {anglestart:0};
	var internetgbvars = {shockwave:0, rot:0, intensity:0, center_x:0, center_y:0, radius:config.minheight};
	
	audio.set_up_analyzer(recording);
	
	if (recording){
		// Hide Canvas if recording for small performance gain
		document.getElementById("visualizer").style.display = "none";
		// Start the canvas capturestream
		if (config.videomaxfps > 0){
			canvasstream = visualizercanvas.captureStream(config.videomaxfps);
		}
		else {
			canvasstream = visualizercanvas.captureStream();
		}
		// A bunch of checks to set an appropriate video bit rate
		// Chrome/Chromium currently ignores the video bit rate and automatically sets its own
		// Firefox defaults to 2.5Mbps if no bit rate is set
		// 640 x 360 or less
		if (config.videowidth * config.videoheight <= 230400){
			videobitrate = 1500000;
		}
		// 854 x 480 or less
		else if (config.videowidth * config.videoheight <= 409920){
			if (config.videomaxfps <= 30 && config.videomaxfps != ""){
				videobitrate = 2500000;
			}
			else {
				videobitrate = 3500000;
			}
		}
		// 1280 x 720 or less
		else if (config.videowidth * config.videoheight <= 921600){
			if (config.videomaxfps <= 30 && config.videomaxfps != ""){
				videobitrate = 4500000;
			}
			else {
				videobitrate = 7000000;
			}
		}
		// 1920 x 1080 or less
		else if (config.videowidth * config.videoheight <= 2073600){
			if (config.videomaxfps <= 30 && config.videomaxfps != ""){
				videobitrate = 8000000;
			}
			else {
				videobitrate = 10000000;
			}
		}
		// 2048 × 1280 or less
		else if (config.videowidth * config.videoheight <= 2621440){
			if (config.videomaxfps <= 30 && config.videomaxfps != ""){
				videobitrate = 10000000;
			}
			else {
				videobitrate = 12000000;
			}
		}
		// 3840 × 2160 or less
		else if (config.videowidth * config.videoheight <= 8294400){
			if (config.videomaxfps <= 30 && config.videomaxfps != ""){
				videobitrate = 12000000;
			}
			else {
				videobitrate = 15000000;
			}
		}
		// 7680 × 4320 or less
		else if (config.videowidth * config.videoheight <= 33177600){
			if (config.videomaxfps <= 30 && config.videomaxfps != ""){
				videobitrate = 16000000;
			}
			else {
				videobitrate = 20000000;
			}
		}
		var recordaudiocheck = document.getElementById("recordaudio").checked;
		if (recordaudiocheck && navigator.userAgent.search("Firefox")){
			// Hack to mix video and audio for firefox without .addTrack due to a bug in firefox - Huge thanks to Kaiido on stackoverflow for the solution
			// Without this the audio will not record in firefox
			audio.source.connect(audio.ctxmediastream);
			audio.stream = audio.ctxmediastream.stream;
			audio.mixed_stream = new MediaStream([canvasstream.getVideoTracks()[0], audio.stream.getAudioTracks()[0]]);
			options = {mimeType: config.videofileformat, videoBitsPerSecond : videobitrate};
			recorder = new MediaRecorder(audio.mixed_stream, options);
		}
		else if (recordaudiocheck){
			canvasstream.addTrack(audio.ctxmediastream.stream.getAudioTracks()[0]);
			options = {mimeType: config.videofileformat, videoBitsPerSecond : videobitrate};
			recorder = new MediaRecorder(canvasstream, options);
		}
		else {
			options = {mimeType: config.videofileformat, videoBitsPerSecond: videobitrate};
			recorder = new MediaRecorder(canvasstream, options);	
		}
		recorder.addEventListener('dataavailable', visualizer.finishCapturing);
		recorder.start();
		// Display recording message
		document.getElementById("recording_message_wrapper").style.display = "block";
	}
	else {
		// If not recording then show the audio seekbar
		document.getElementById("visualizer_seekbar").style.display = "block";
	}
	
	// Start Playing Audio
	audio.player.currentTime = 0;
	audio.player.play();
	
	function renderframe(){
		if (!audio.player.paused){
			requestAnimationFrame(renderframe);
			
			// Reset opacity to 1 - Since global alpha can be changed for the fill, stroke, and foreground image it needs to be reset before drawing the background color and background image
			visualizercanvasctx.globalAlpha = 1;
			
			// Fill the background color of the visualizer
			visualizercanvasctx.fillStyle = config.visualizerbgcolor;
			visualizercanvasctx.fillRect(0,0,config.videowidth,config.videoheight);
			
			// Fill the background image of the visualizer if specified
			if (config.bgimg.src != config.blankimg.src){
				visualizercanvasctx.drawImage(config.cachedbgimgcanvas,0,0);
			}

			// Set the rotation
			if (config.rotation != 0){
				visualizercanvasctx.translate(leftposition,topposition);
				visualizercanvasctx.rotate(config.rotation * (Math.PI / 180));
				visualizercanvasctx.translate(-leftposition,-topposition);
			}
			
			// Set the line cap type
			if (config.linecap == "round"){
				visualizercanvasctx.lineCap = "round";
			}

			// Set the fill type
			if (config.filltype == "solid"){
				visualizercanvasctx.fillStyle = config.fill1;
			}
			else if (config.filltype == "verticalgradient"){
				gradient = visualizercanvasctx.createLinearGradient(0, config.videoheight, 0, 0);
				gradient.addColorStop(0, config.fill1);
				gradient.addColorStop(1, config.fill2);
				visualizercanvasctx.fillStyle = gradient;
			}
			else if (config.filltype == "horizontalgradient"){
				gradient = visualizercanvasctx.createLinearGradient(0, 0, config.videowidth, 0);
				gradient.addColorStop(0, config.fill1);
				gradient.addColorStop(1, config.fill2);
				visualizercanvasctx.fillStyle = gradient;
			}
			else if (config.filltype == "image"){
				if (config.fillimg.src != config.blankimg.src){
					pattern = visualizercanvasctx.createPattern(config.fillimg,"repeat");
					visualizercanvasctx.fillStyle = pattern;
				}
				else {
					visualizercanvasctx.fillStyle = 'rgba(0, 0, 0, 0)';	
				}
			}

			// Set the outline type
			if (config.outlinetype == "solid"){
				visualizercanvasctx.lineWidth = config.outlinewidth;
				visualizercanvasctx.strokeStyle = config.outlinecolor1;
			}
			else if (config.outlinetype == "verticalgradient"){
				gradient = visualizercanvasctx.createLinearGradient(0, config.videoheight, 0, 0);
				gradient.addColorStop(0, config.outlinecolor1);
				gradient.addColorStop(1, config.outlinecolor2);
				visualizercanvasctx.lineWidth = config.outlinewidth;
				visualizercanvasctx.strokeStyle = gradient;
			}
			else if (config.outlinetype == "horizontalgradient"){
				gradient = visualizercanvasctx.createLinearGradient(0, 0, config.videowidth, 0);
				gradient.addColorStop(0, config.fill1);
				gradient.addColorStop(1, config.fill2);
				visualizercanvasctx.lineWidth = config.outlinewidth;
				visualizercanvasctx.strokeStyle = gradient;
			}
			else if (config.outlinetype == "image"){
				if (config.outlineimg.src != config.blankimg.src){
					pattern = visualizercanvasctx.createPattern(config.outlineimg,"repeat");
					visualizercanvasctx.lineWidth = config.outlinewidth;
					visualizercanvasctx.strokeStyle = pattern;
				}
				else {
					visualizercanvasctx.strokeStyle = 'rgba(0, 0, 0, 0)';	
				}
			}
			
			// Visualizer Types
			if (config.visualizertype == "verticalbars"){
				audio.analyzer.getByteFrequencyData(audio.frequency_data);
				visualizer_types.vertical_bars(visualizercanvasctx, audio.analyzer, audio.frequency_data, audio.frequency_spacing, maxheightadjustment);
			}
			else if (config.visualizertype == "blockbars"){
				audio.analyzer.getByteFrequencyData(audio.frequency_data);
				visualizer_types.blockbars(visualizercanvasctx, audio.analyzer, audio.frequency_data, audio.frequency_spacing, maxheightadjustment);
			}
			else if (config.visualizertype == "3dbars"){
				audio.analyzer.getByteFrequencyData(audio.frequency_data);
				visualizer_types.bars_3d(visualizercanvasctx, audio.analyzer, audio.frequency_data, audio.frequency_spacing, maxheightadjustment);
			}
			else if (config.visualizertype == "stretchycircle"){
				audio.analyzer.getByteFrequencyData(audio.frequency_data);
				visualizer_types.stretchy_circle(visualizercanvasctx, audio.analyzer, audio.frequency_data, audio.frequency_spacing, maxheightadjustment);
			}
			else if (config.visualizertype == "timedomainline"){
				audio.analyzer.getByteTimeDomainData(audio.frequency_data);
				visualizer_types.time_domain_line(visualizercanvasctx, audio.analyzer, audio.frequency_data, maxheightadjustment);
			}
			else if (config.visualizertype == "timedomainsquares"){
				audio.analyzer.getByteTimeDomainData(audio.frequency_data);
				visualizer_types.time_domain_squares(visualizercanvasctx, audio.analyzer, audio.frequency_data, maxheightadjustment);
			}
			else if (config.visualizertype == "spinningtriangles"){
				audio.analyzer.getByteFrequencyData(audio.frequency_data);
				spinningtrianglesvars = visualizer_types.spinning_triangles(visualizercanvasctx, audio.analyzer, audio.frequency_data, audio.frequency_spacing, maxheightadjustment, spinningtrianglesvars);
			}
			else if (config.visualizertype == "bubbles"){
				audio.analyzer.getByteFrequencyData(audio.frequency_data);
				visualizer_types.bubbles(visualizercanvasctx, audio.analyzer, audio.frequency_data, audio.frequency_spacing, maxheightadjustment);
			}
			else if (config.visualizertype == "internetgb"){
				audio.analyzer.getByteFrequencyData(audio.frequency_data);
				internetgbvars = visualizer_types.internetgb(visualizercanvasctx, audio.analyzer, audio.frequency_data, audio.frequency_spacing, maxheightadjustment, internetgbvars);
			}
			
			// If the rotation was set then clear it
			if (config.rotation != 0){
				visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
			}
			
			// Fill the foreground image of the visualizer if specified
			if (config.fgimg.src != config.blankimg.src){
				// Reset the opacity
				visualizercanvasctx.globalAlpha = 1;
				visualizercanvasctx.drawImage(config.cachedfgimgcanvas, leftposition - (config.fgimg.width/2) + config.foregroundpositionleft, topposition - (config.fgimg.height/2) + config.foregroundpositiontop);
			}
		}
		else if (recording){
			// Hide recording message
			document.getElementById("recording_message_wrapper").style.display = "none";
			// Stop the MediaRecorder
			recorder.stop();
			// If we were recording audio in firefox, stop the streams that were used for the workaround
			if (recordaudiocheck && navigator.userAgent.search("Firefox")){
				audio.mixed_stream.getVideoTracks()[0].stop();
				audio.mixed_stream.getAudioTracks()[0].stop();
			}
			audio.source.disconnect();
			audio.remove_event_listeners(recording);
			// There's apparently a bug with reusing MediaStreamDestination; clearing it is necessary
			// Without clearing it, the audio will not be recorded any time after the first recording with audio
			audio.ctxmediastream = null;
			// Show visualizer again after recording
			document.getElementById("visualizer").style.display = "block";
		}
		else {
			// If not recording then hide the audio seekbar since the preview is done
			document.getElementById("visualizer_seekbar").style.display = "none";
			audio.source.disconnect();
			audio.remove_event_listeners(recording);
		}
	}
	// Start rendering frames
	renderframe();
};

visualizer.stop = function(){
	audio.player.pause();
	audio.player.currentTime = 0;
};

visualizer.finishCapturing = function(e){
	capturing = false;
	videoData = [ e.data ];
	blob = new Blob(videoData, { 'type': 'video/webm' });
	saveAs(blob,"video.webm");
};
