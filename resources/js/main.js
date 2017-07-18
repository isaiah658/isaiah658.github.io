//Set up audio stuff - Used for playing the chosen audio file and getting the data for the visualizer
var audioplayer = new Audio();
var audioctx = new AudioContext();
var audiosource = audioctx.createMediaElementSource(audioplayer);
var audioctxmediastream = audioctx.createMediaStreamDestination();
//This is used to pause the audio player when the song is finished which also triggers the visualizer to stop the preview/recording
audioplayer.addEventListener("ended", function(){
	audioplayer.pause();
	audioplayer.currentTime = 0;
});

//Initially called when the page first loads - Currently it checks the browser for supported MediaRecorder video types and then calls a function to hide unused options which also updates other visualizer options at the end of it
function initialize(){
	var videofileformat = document.getElementById("videofileformat");
	if (!MediaRecorder) {
		alert('Your web browser does not appear to support "MediaRecorder". You will be unable to record without it and this web page will most likely not load properly. Please try using Chrome/Chromium version 53 and higher or Firefox version 48 and higher.');	
	}
	if (MediaRecorder.isTypeSupported("video/webm")) {
		var option1 = document.createElement('option');
		option1.appendChild( document.createTextNode("WebM") );
		option1.value = "video/webm";
		videofileformat.appendChild(option1); 
	}
	if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
		var option2 = document.createElement('option');
		option2.appendChild( document.createTextNode("WebM VP9") );
		option2.value = "video/webm; codecs=vp9";
		videofileformat.appendChild(option2); 
	}
	if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
		var option3 = document.createElement('option');
		option3.appendChild( document.createTextNode("WebM VP8") );
		option3.value = "video/webm; codecs=vp8";
		videofileformat.appendChild(option3); 
	}
	if (MediaRecorder.isTypeSupported("video/webm;codecs=h264")) {
		var option4 = document.createElement('option');
		option4.appendChild( document.createTextNode("WebM H264") );
		option4.value = "video/webm; codecs=h264";
		videofileformat.appendChild(option4); 
	}
	if (MediaRecorder.isTypeSupported("video/webm;codecs=avc1")) {
		var option5 = document.createElement('option');
		option5.appendChild( document.createTextNode("WebM AVC1") );
		option5.value = "video/webm; codecs=avc1";
		videofileformat.appendChild(option5); 
	}
	/*if (MediaRecorder.isTypeSupported("video/x-matroska;codecs=avc1")) {
		var option6 = document.createElement('option');
		option6.appendChild( document.createTextNode("X-Matroska AVC1") );
		option6.value = "video/x-matroska; codecs=avc1";
		videofileformat.appendChild(option6); 
	}*/
	if (!videofileformat.value) {
		alert('Your web browser does not appear to support any video formats for recording or does not support "MediaRecorder" altogether. You will be unable to record without it. Please try using Chrome/Chromium version 53 and higher or Firefox version 48 and higher.');	
	}

	hideunusedoptions();
}

function includeaudiowarning() {
	var recordaudiocheck = document.getElementById("recordaudio").checked;
	if (recordaudiocheck) {
		alert("Including audio in the recording has a noticable effect on performance and video quality and is not recommended. Please view the documentation under the limitations page and the FAQ page for more details.");
	}
}

function showdocumentation(){
	document.getElementById("documentation").style.display = "block";
	document.getElementById("opendocumentationbutton").style.display = "none";
	document.getElementById("closedocumentationbutton").style.display = "block";
}

function closedocumentation(){
	document.getElementById("documentation").style.display = "none";
	document.getElementById("opendocumentationbutton").style.display = "block";
	document.getElementById("closedocumentationbutton").style.display = "none";
}

function showoptiondescriptions(){
	document.getElementById("optiondescriptions").style.display = "block";
	document.getElementById("limitations").style.display = "none";
	document.getElementById("faq").style.display = "none";
	document.getElementById("credits").style.display = "none";
}

function showlimitations(){
	document.getElementById("optiondescriptions").style.display = "none";
	document.getElementById("limitations").style.display = "block";
	document.getElementById("faq").style.display = "none";
	document.getElementById("credits").style.display = "none";
}

function showfaq(){
	document.getElementById("optiondescriptions").style.display = "none";
	document.getElementById("limitations").style.display = "none";
	document.getElementById("faq").style.display = "block";
	document.getElementById("credits").style.display = "none";
}

function showcredits(){
	document.getElementById("optiondescriptions").style.display = "none";
	document.getElementById("limitations").style.display = "none";
	document.getElementById("faq").style.display = "none";
	document.getElementById("credits").style.display = "block";
}

function loadpreset(selectedfile){
	var file = selectedfile.files[0];
	var reader = new FileReader();
	reader.onload = function(progressEvent){
		var lines = this.result.split('\n');
		document.getElementById("foregroundpositiontop").value = lines[0];
		document.getElementById("foregroundpositionleft").value = lines[1];
		document.getElementById("videowidth").value = lines[2];
		document.getElementById("videoheight").value = lines[3];
		document.getElementById("videomaxfps").value = lines[4];
		document.getElementById("backgroundcolor").value = lines[5];
		document.getElementById("visualizertype").value = lines[6];
		document.getElementById("visualizerbarsalignment").value = lines[7];
		document.getElementById("visualizerlinecap").value = lines[8];
		document.getElementById("visualizershape").value = lines[9];
		document.getElementById("visualizershapesize").value = lines[10];
		document.getElementById("visualizerhowmany").value = lines[11];
		document.getElementById("maxvisualizerheight").value = lines[12];
		document.getElementById("minvisualizerheight").value = lines[13];
		document.getElementById("visualizerwidth").value = lines[14];
		document.getElementById("visualizerdepth").value = lines[15];
		document.getElementById("visualizerslope").value = lines[16];
		document.getElementById("visualizerminrotationspeed").value = lines[17];
		document.getElementById("visualizermaxrotationspeed").value = lines[18];
		document.getElementById("visualizerspacing").value = lines[19];
		document.getElementById("visualizerspacing2").value = lines[20];
		document.getElementById("visualizertop").value = lines[21];
		document.getElementById("visualizerleft").value = lines[22];
		document.getElementById("visualizerrotation").value = lines[23];
		document.getElementById("visualizeroffset").value = lines[24];
		document.getElementById("visualizeropacity").value = lines[25];
		document.getElementById("visualizercutoff").value = lines[26];
		document.getElementById("visualizermultiplier").value = lines[27];
		document.getElementById("filltype").value = lines[28];
		document.getElementById("visualizerfill1").value = lines[29];
		document.getElementById("visualizerfill2").value = lines[30];
		document.getElementById("fillopacity").value = lines[31];
		document.getElementById("outlinetype").value = lines[32];
		document.getElementById("outlinecolor1").value = lines[33];
		document.getElementById("outlinecolor2").value = lines[34];
		document.getElementById("outlinewidth").value = lines[35];
		document.getElementById("outlineopacity").value = lines[36];
		onchangeoptions();
	};
	reader.readAsText(file);	
}

function savepreset(){
	var foregroundpositiontop = document.getElementById("foregroundpositiontop").value;
	var foregroundpositionleft = document.getElementById("foregroundpositionleft").value;
	var videowidth = document.getElementById("videowidth").value;
	var videoheight = document.getElementById("videoheight").value;
	var videomaxfps = document.getElementById("videomaxfps").value;
	var visualizerbgcolor = document.getElementById("backgroundcolor").value;
	var visualizertype = document.getElementById("visualizertype").value;
	var barsalignment = document.getElementById("visualizerbarsalignment").value;
	var linecap = document.getElementById("visualizerlinecap").value;
	var visualizershape = document.getElementById("visualizershape").value;
	var visualizershapesize = document.getElementById("visualizershapesize").value;
	var howmany = document.getElementById("visualizerhowmany").value;
	var maxheight = document.getElementById("maxvisualizerheight").value;
	var minheight = document.getElementById("minvisualizerheight").value;
	var width = document.getElementById("visualizerwidth").value;
	var depth = document.getElementById("visualizerdepth").value;
	var slope = document.getElementById("visualizerslope").value;
	var minrotationspeed = document.getElementById("visualizerminrotationspeed").value;
	var maxrotationspeed = document.getElementById("visualizermaxrotationspeed").value;
	var spacing = document.getElementById("visualizerspacing").value;
	var spacing2 = document.getElementById("visualizerspacing2").value;
	var top = document.getElementById("visualizertop").value;
	var left = document.getElementById("visualizerleft").value;
	var rotation = document.getElementById("visualizerrotation").value;
	var offset = document.getElementById("visualizeroffset").value;
	var opacity = document.getElementById("visualizeropacity").value;
	var cutoff = document.getElementById("visualizercutoff").value;
	var multiplier = document.getElementById("visualizermultiplier").value;
	var filltype = document.getElementById("filltype").value;
	var fill1 = document.getElementById("visualizerfill1").value;
	var fill2 = document.getElementById("visualizerfill2").value;
	var fillopacity = document.getElementById("fillopacity").value;
	var outlinetype = document.getElementById("outlinetype").value;
	var outlinecolor1 = document.getElementById("outlinecolor1").value;
	var outlinecolor2 = document.getElementById("outlinecolor2").value;
	var outlinewidth = document.getElementById("outlinewidth").value;
	var outlineopacity = document.getElementById("outlineopacity").value;
	
	document.getElementById("savepresettextarea").value = foregroundpositiontop + "\n" + foregroundpositionleft + "\n" + videowidth + "\n" + videoheight + "\n" + videomaxfps + "\n" + visualizerbgcolor + "\n" + visualizertype + "\n" + barsalignment + "\n" + linecap + "\n" + visualizershape + "\n" + visualizershapesize + "\n" + howmany + "\n" + maxheight + "\n" + minheight + "\n" + width + "\n" + depth + "\n" + slope + "\n" + minrotationspeed + "\n" + maxrotationspeed + "\n" + spacing + "\n" + spacing2 + "\n" + top + "\n" + left + "\n" + rotation + "\n" + offset + "\n" + opacity + "\n" + cutoff + "\n" + multiplier + "\n" + filltype + "\n" + fill1 + "\n" + fill2 + "\n" + fillopacity + "\n" + outlinetype + "\n" + outlinecolor1 + "\n" + outlinecolor2 + "\n" + outlinewidth + "\n" + outlineopacity;
	var text = document.getElementById("savepresettextarea").value;
	var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "preset.txt");
}

function zoom(){
	var zoom = Number(document.getElementById("zoom").value)/100;
	document.getElementById("visualizer").style.transform = "translateX(-50%) translateY(-50%) scale("+zoom+", "+zoom+")";
}

//Called when the user selects the background image - Then it calls the function for options and updating the visualizer
function onchangebackgroundimage(selected) {
	var bgimg = document.getElementById("bgimg");
	var blankimg = document.getElementById("blankimg");
	var image = selected.files;
	var url = URL.createObjectURL(image[0]);
	bgimg.onload = function () {
		if (bgimg.src != blankimg.src) {
			document.getElementById("clearbackgroundimagebutton").style.display = "block";
		}
		else {
			document.getElementById("clearbackgroundimagebutton").style.display = "none";	
		}
		onchangeoptions();
	}
	bgimg.src = url;
}

function clearbackgroundimage() {
	document.getElementById("backgroundimageform").reset();
	document.getElementById("bgimg").src = "resources/img/blank.png";
	document.getElementById("clearbackgroundimagebutton").style.display = "none";
}

//Called when the user selects the foreground image - Then it calls the function for options and updating the visualizer
function onchangeforegroundimage(selected) {
	var fgimg = document.getElementById("fgimg");
	var blankimg = document.getElementById("blankimg");
	var image = selected.files;
	var url = URL.createObjectURL(image[0]);
	fgimg.onload = function () {
		if (fgimg.src != blankimg.src) {
			document.getElementById("foregroundpositiontopwrapper").style.display = "block";
			document.getElementById("foregroundpositionleftwrapper").style.display = "block";
			document.getElementById("clearforegroundimagebutton").style.display = "block";
		}
		else {
			document.getElementById("foregroundpositiontopwrapper").style.display = "none";
			document.getElementById("foregroundpositionleftwrapper").style.display = "none";
			document.getElementById("clearforegroundimagebutton").style.display = "none";
		}
		onchangeoptions();
	}
	fgimg.src = url;
}

function clearforegroundimage() {
	document.getElementById("foregroundimageform").reset();
	document.getElementById("fgimg").src = "resources/img/blank.png";
	document.getElementById("clearforegroundimagebutton").style.display = "none";
}

//Called when user selects the audio file
function onchangeaudio(selectedaudio) {
	var audio = selectedaudio.files;
	var url = URL.createObjectURL(audio[0]); 
	audioplayer.src = url;
}

//Called when the audio seekbar is changed by the user
function onchangevisualizerseekbar() {
	audioplayer.currentTime = audioplayer.duration * (document.getElementById("visualizerseekbar").value / 100);
}

//Called when the audio is playing and updates the seekbar to the current time
audioplayer.addEventListener("timeupdate", function() {
  document.getElementById("visualizerseekbar").value = (100 / audioplayer.duration) * audioplayer.currentTime;
});

//Called when the user selects the fill pattern image - Then it calls the function for options and updating the visualizer
function onchangefillimage(selected) {
	var fillimg = document.getElementById("fillimg");
	var image = selected.files;
	var url = URL.createObjectURL(image[0]);
	fillimg.onload = function () {
		onchangeoptions();
	}
	fillimg.src = url; 
}

//Called when the user selects the outline pattern image - Then it calls the function for options and updating the visualizer
function onchangeoutlineimage(selected) {
	var outlineimg = document.getElementById("outlineimg");
	var image = selected.files;
	var url = URL.createObjectURL(image[0]);
	outlineimg.onload = function () {
		onchangeoptions();
	}
	outlineimg.src = url; 
}

//Used to hide irrelevant options when selecting visualizer types and fill types - Then it calls the function for options and updating the visualizer
function hideunusedoptions() {
	var visualizertype = document.getElementById("visualizertype").value;
	var visualizershape = document.getElementById("visualizershape").value;
	var filltype = document.getElementById("filltype").value;
	var outlinetype = document.getElementById("outlinetype").value;
	
	//Set the default values
	document.getElementById("visualizerbarsalignmentwrapper").style.display = "none";
	document.getElementById("visualizerlinecapwrapper").style.display = "none";
	document.getElementById("visualizershapewrapper").style.display = "none";
	document.getElementById("visualizerhowmanywrapper").style.display = "block";
	document.getElementById("maxvisualizerheightwrapper").style.display = "block";
	document.getElementById("minvisualizerheightwrapper").style.display = "block";
	document.getElementById("visualizerwidthwrapper").style.display = "block";
	document.getElementById("visualizerdepthwrapper").style.display = "none";
	document.getElementById("visualizerslopewrapper").style.display = "none";
	document.getElementById("visualizerminrotationspeedwrapper").style.display = "none";
	document.getElementById("visualizermaxrotationspeedwrapper").style.display = "none";
	document.getElementById("visualizerspacingwrapper").style.display = "block";
	document.getElementById("visualizerspacing2wrapper").style.display = "none";
	document.getElementById("visualizeroffsetwrapper").style.display = "block";
	document.getElementById("visualizercutoffwrapper").style.display = "block";
	document.getElementById("visualizermultiplierwrapper").style.display = "block";
	document.getElementById("minfrequencywrapper").style.display = "block";
	document.getElementById("maxfrequencywrapper").style.display = "block";
	
	//Override any default values depending on the visualizer type
	if (visualizertype == "verticalbars") {
		document.getElementById("visualizerbarsalignmentwrapper").style.display = "block";
		document.getElementById("visualizerlinecapwrapper").style.display = "block";
		document.getElementById("visualizershapewrapper").style.display = "block";
		if (visualizershape == "circle") {
			document.getElementById("visualizerspacingwrapper").style.display = "none";
		}
	}
	else if (visualizertype == "blockbars") {
		document.getElementById("visualizerbarsalignmentwrapper").style.display = "block";
		document.getElementById("visualizershapewrapper").style.display = "block";
		document.getElementById("visualizerspacing2wrapper").style.display = "block";
		if (visualizershape == "circle") {
			document.getElementById("visualizerspacingwrapper").style.display = "none";
		}
	}
	else if (visualizertype == "3dbars") {
		document.getElementById("visualizerdepthwrapper").style.display = "block";
		document.getElementById("visualizerslopewrapper").style.display = "block";
	}
	else if (visualizertype == "stretchycircle") {
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
	}
	else if (visualizertype == "timedomainline") {
		document.getElementById("visualizerhowmanywrapper").style.display = "none";
		document.getElementById("visualizershapewrapper").style.display = "block";
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
		document.getElementById("visualizercutoffwrapper").style.display = "none";
		document.getElementById("visualizermultiplierwrapper").style.display = "none";
		document.getElementById("minfrequencywrapper").style.display = "none";
		document.getElementById("maxfrequencywrapper").style.display = "none";
		if (visualizershape == "circle") {
			document.getElementById("visualizerwidthwrapper").style.display = "none";
		}
	}
	else if (visualizertype == "timedomainsquares") {
		document.getElementById("visualizerhowmanywrapper").style.display = "none";
		document.getElementById("visualizershapewrapper").style.display = "block";
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
		document.getElementById("visualizercutoffwrapper").style.display = "none";
		document.getElementById("visualizermultiplierwrapper").style.display = "none";
		document.getElementById("minfrequencywrapper").style.display = "none";
		document.getElementById("maxfrequencywrapper").style.display = "none";
		if (visualizershape == "circle") {
			document.getElementById("visualizerwidthwrapper").style.display = "none";
		}
	}
	else if (visualizertype == "spinningtriangles") {
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
		document.getElementById("visualizerminrotationspeedwrapper").style.display = "block";
		document.getElementById("visualizermaxrotationspeedwrapper").style.display = "block";
	}
	else if (visualizertype == "bubbles") {
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
	}
	
	//Changes options for the fill types
	if (filltype == "solid") {
		document.getElementById("visualizerfill1wrapper").style.display = "block";
		document.getElementById("visualizerfill2wrapper").style.display = "none";
		document.getElementById("visualizerfillimagewrapper").style.display = "none";
	}
	else if (filltype == "verticalgradient") {
		document.getElementById("visualizerfill1wrapper").style.display = "block";
		document.getElementById("visualizerfill2wrapper").style.display = "block";
		document.getElementById("visualizerfillimagewrapper").style.display = "none";
	}
	else if (filltype == "horizontalgradient") {
		document.getElementById("visualizerfill1wrapper").style.display = "block";
		document.getElementById("visualizerfill2wrapper").style.display = "block";
		document.getElementById("visualizerfillimagewrapper").style.display = "none";
	}
	else if (filltype == "image") {
		document.getElementById("visualizerfill1wrapper").style.display = "none";
		document.getElementById("visualizerfill2wrapper").style.display = "none";
		document.getElementById("visualizerfillimagewrapper").style.display = "block";
	}
	else if (filltype == "none") {
		document.getElementById("visualizerfill1wrapper").style.display = "none";
		document.getElementById("visualizerfill2wrapper").style.display = "none";
		document.getElementById("visualizerfillimagewrapper").style.display = "none";
	}
	
	//Changes options for the outline types
	if (outlinetype == "solid") {
		document.getElementById("outlinecolor1wrapper").style.display = "block";
		document.getElementById("outlinecolor2wrapper").style.display = "none";
		document.getElementById("outlineimagewrapper").style.display = "none";
	}
	else if (outlinetype == "verticalgradient") {
		document.getElementById("outlinecolor1wrapper").style.display = "block";
		document.getElementById("outlinecolor2wrapper").style.display = "block";
		document.getElementById("outlineimagewrapper").style.display = "none";
	}
	else if (outlinetype == "horizontalgradient") {
		document.getElementById("outlinecolor1wrapper").style.display = "block";
		document.getElementById("outlinecolor2wrapper").style.display = "block";
		document.getElementById("outlineimagewrapper").style.display = "none";
	}
	else if (outlinetype == "image") {
		document.getElementById("outlinecolor1wrapper").style.display = "none";
		document.getElementById("outlinecolor2wrapper").style.display = "none";
		document.getElementById("outlineimagewrapper").style.display = "block";
	}
	else if (outlinetype == "none") {
		document.getElementById("outlinecolor1wrapper").style.display = "none";
		document.getElementById("outlinecolor2wrapper").style.display = "none";
		document.getElementById("outlineimagewrapper").style.display = "none";
	}
	
	//Call the function for updating the visualizer
	onchangeoptions();
}

//This basically updates the preview/first frame by getting all the options and redrawing the preview - This is NOT used for playing or recording animations
function onchangeoptions() {
	//User options
	var foregroundpositiontop = Number(document.getElementById("foregroundpositiontop").value);
	var foregroundpositionleft = Number(document.getElementById("foregroundpositionleft").value);
	var videowidth = Number(document.getElementById("videowidth").value);
	var videoheight = Number(document.getElementById("videoheight").value);
	var visualizerbgcolor = document.getElementById("backgroundcolor").value;
	var visualizershape = document.getElementById("visualizershape").value;
	var visualizershapesize = Number(document.getElementById("visualizershapesize").value);
	var visualizertype = document.getElementById("visualizertype").value;
	var barsalignment = document.getElementById("visualizerbarsalignment").value;
	var linecap = document.getElementById("visualizerlinecap").value;
	var howmany = Number(document.getElementById("visualizerhowmany").value);
	var maxheight = Number(document.getElementById("maxvisualizerheight").value);
	var minheight = Number(document.getElementById("minvisualizerheight").value);
	var width = Number(document.getElementById("visualizerwidth").value);
	var depth = Number(document.getElementById("visualizerdepth").value);
	var slope = Number(document.getElementById("visualizerslope").value);
	var minrotationspeed = document.getElementById("visualizerminrotationspeed").value;
	var maxrotationspeed = document.getElementById("visualizermaxrotationspeed").value;
	var spacing = Number(document.getElementById("visualizerspacing").value);
	var spacing2 = Number(document.getElementById("visualizerspacing2").value);
	var top = Number(document.getElementById("visualizertop").value);
	var left = Number(document.getElementById("visualizerleft").value);
	var rotation = Number(document.getElementById("visualizerrotation").value);
	var offset = Number(document.getElementById("visualizeroffset").value);
	var cutoff = Number(document.getElementById("visualizercutoff").value);
	var multiplier = Number(document.getElementById("visualizermultiplier").value);
	var filltype = document.getElementById("filltype").value;
	var fill1 = document.getElementById("visualizerfill1").value;
	var fill2 = document.getElementById("visualizerfill2").value;
	var fillopacity = document.getElementById("fillopacity").value;
	var outlinetype = document.getElementById("outlinetype").value;
	var outlinecolor1 = document.getElementById("outlinecolor1").value;
	var outlinecolor2 = document.getElementById("outlinecolor2").value;
	var outlinewidth = Number(document.getElementById("outlinewidth").value);
	var outlineopacity = Number(document.getElementById("outlineopacity").value);
	
	//These are the x and y coordinates of the center point of the visualizer - It starts at the center of the video and moves according to what the user has chosen for positions
	var leftposition = Math.round((videowidth/2) + left);
	var topposition = Math.round((videoheight/2) + top);
	
	//User selected images for the background and fill pattern
	var bgimg = document.getElementById("bgimg");
	var fgimg = document.getElementById("fgimg");
	var fillimg = document.getElementById("fillimg");
	var outlineimg = document.getElementById("outlineimg");
	var blankimg = document.getElementById("blankimg");
	
	//Canvas contexts for the visualizer and the hidden canvas used to "cache" the background for supposedly faster drawing speed when copying to the visualizer instead of directly from the image each time
	var visualizercanvas = document.getElementById("visualizer");
	var visualizercanvasctx = visualizercanvas.getContext("2d");
	var cachedbgimgcanvas = document.getElementById("cachedbgimg");
	var cachedbgimgcanvasctx = cachedbgimgcanvas.getContext("2d");
	
	//Set the visualizer and cached background canvas width and height
	document.getElementById('visualizer').setAttribute('width', videowidth);
	document.getElementById('visualizer').setAttribute('height', videoheight);
	document.getElementById('visualizer').style.width = videowidth+"px";
	document.getElementById('visualizer').style.height = videoheight+"px";
	document.getElementById('cachedbgimg').setAttribute('width', videowidth);
	document.getElementById('cachedbgimg').setAttribute('height', videoheight);
	document.getElementById('cachedbgimg').style.width = videowidth+"px";
	document.getElementById('cachedbgimg').style.height = videoheight+"px";
	
	//Reset opacity to 1 - Since global alpha can be changed for the fill, stroke, and foreground image it needs to be reset before drawing the background color and background image
	visualizercanvasctx.globalAlpha = 1;
	
	//Reset transform - This is slightly faster than doing save and restore
	visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
	
	//Fill the background color of the visualizer
	visualizercanvasctx.fillStyle = visualizerbgcolor;
	visualizercanvasctx.fillRect(0,0,videowidth,videoheight);
	
	//Fill the background image of the visualizer if specified
	if (bgimg.src != blankimg.src) {
		cachedbgimgcanvasctx.drawImage(bgimg,0,0);
		visualizercanvasctx.drawImage(cachedbgimgcanvas,0,0);
	}
	
	//Set the rotation
	if (rotation != 0) {
		visualizercanvasctx.translate(leftposition,topposition);
		visualizercanvasctx.rotate(rotation * (Math.PI / 180));
		visualizercanvasctx.translate(-leftposition,-topposition);
	}
	
	//Set the fill type
	if (filltype == "solid") {
		visualizercanvasctx.fillStyle = fill1;
	}
	else if (filltype == "verticalgradient") {
		var gradient = visualizercanvasctx.createLinearGradient(0, videoheight, 0, 0);
		gradient.addColorStop(0, fill1);
		gradient.addColorStop(1, fill2);
		visualizercanvasctx.fillStyle = gradient;
	}
	else if (filltype == "horizontalgradient") {
		var gradient = visualizercanvasctx.createLinearGradient(0, 0, videowidth, 0);
		gradient.addColorStop(0, fill1);
		gradient.addColorStop(1, fill2);
		visualizercanvasctx.fillStyle = gradient;
	}
	else if (filltype == "image") {
		if (fillimg.src != blankimg.src) {
			var pattern = visualizercanvasctx.createPattern(fillimg,"repeat");
			visualizercanvasctx.fillStyle = pattern;
		}
		else {
			visualizercanvasctx.fillStyle = 'rgba(0, 0, 0, 0)';	
		}
	}
	
	//Set the outline type
	if (outlinetype == "solid") {
		visualizercanvasctx.lineWidth = outlinewidth;
		visualizercanvasctx.strokeStyle = outlinecolor1;
	}
	else if (outlinetype == "verticalgradient") {
		var gradient = visualizercanvasctx.createLinearGradient(0, videoheight, 0, 0);
		gradient.addColorStop(0, outlinecolor1);
		gradient.addColorStop(1, outlinecolor2);
		visualizercanvasctx.strokeStyle = gradient;
	}
	else if (outlinetype == "horizontalgradient") {
		var gradient = visualizercanvasctx.createLinearGradient(0, 0, videowidth, 0);
		gradient.addColorStop(0, fill1);
		gradient.addColorStop(1, fill2);
		visualizercanvasctx.strokeStyle = gradient;
	}
	else if (outlinetype == "image") {
		if (outlineimg.src != blankimg.src) {
			var pattern = visualizercanvasctx.createPattern(outlineimg,"repeat");
			visualizercanvasctx.lineWidth = outlinewidth;
			visualizercanvasctx.strokeStyle = pattern;
		}
		else {
			visualizercanvasctx.strokeStyle = 'rgba(0, 0, 0, 0)';	
		}
	}
	
	//Visualizer Types
	if (visualizertype == "verticalbars") {
		verticalbars(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, barsalignment, linecap, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx);
	}
	else if (visualizertype == "blockbars") {
		blockbars(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, barsalignment, howmany, minheight, width, spacing, spacing2, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx);
	}
	else if (visualizertype == "3dbars") {
		bars3d(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, depth, slope, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx);
	}
	else if (visualizertype == "stretchycircle") {
		stretchycircle(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx);
	}
	else if (visualizertype == "timedomainline") {
		timedomainline(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx);
	}
	else if (visualizertype == "timedomainsquares") {
		timedomainsquares(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx);
	}
	else if (visualizertype == "spinningtriangles") {
		spinningtriangles(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, minrotationspeed, maxrotationspeed, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx);
	}
	else if (visualizertype == "bubbles") {
		bubbles(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx);
	}
	else if (visualizertype == "internetgb") {
		internetgb(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx);
	}
	
	//Fill the foreground image of the visualizer if specified
	if (fgimg.src != blankimg.src) {
		//Reset the opacity
		visualizercanvasctx.globalAlpha = 1;
		//Reset transform - This is slightly faster than doing save and restore
		visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
		var cachedfgimgcanvas = document.getElementById("cachedfgimg");
		var cachedfgimgcanvasctx = cachedfgimgcanvas.getContext("2d");
		var fgimgwidth = fgimg.width;
		var fgimgheight = fgimg.height;
		
		document.getElementById('cachedfgimg').setAttribute('width', fgimgwidth);
		document.getElementById('cachedfgimg').setAttribute('height', fgimgheight);
		document.getElementById('cachedfgimg').style.width = fgimgwidth+"px";
		document.getElementById('cachedfgimg').style.height = fgimgheight+"px";
		
		cachedfgimgcanvasctx.drawImage(fgimg,0,0);
		visualizercanvasctx.drawImage(cachedfgimgcanvas, leftposition - (fgimgwidth/2) + foregroundpositionleft, topposition - (fgimgheight/2) + foregroundpositiontop);
	}
}

//This is used to play the audio and record the visualizer animation
function startvisualizer(recording) {
	//User options
	var foregroundpositiontop = Number(document.getElementById("foregroundpositiontop").value);
	var foregroundpositionleft = Number(document.getElementById("foregroundpositionleft").value);
	var videowidth = Number(document.getElementById("videowidth").value);
	var videoheight = Number(document.getElementById("videoheight").value);
	var videomaxfps = Number(document.getElementById("videomaxfps").value);
	var visualizerbgcolor = document.getElementById("backgroundcolor").value;
	var visualizershape = document.getElementById("visualizershape").value;
	var visualizershapesize = Number(document.getElementById("visualizershapesize").value);
	var visualizertype = document.getElementById("visualizertype").value;
	var barsalignment = document.getElementById("visualizerbarsalignment").value;
	var linecap = document.getElementById("visualizerlinecap").value;
	var howmany = Number(document.getElementById("visualizerhowmany").value);
	var maxheight = Number(document.getElementById("maxvisualizerheight").value);
	var minheight = Number(document.getElementById("minvisualizerheight").value);
	var width = Number(document.getElementById("visualizerwidth").value);
	var depth = Number(document.getElementById("visualizerdepth").value);
	var slope = Number(document.getElementById("visualizerslope").value);
	var minrotationspeed = document.getElementById("visualizerminrotationspeed").value;
	var maxrotationspeed = document.getElementById("visualizermaxrotationspeed").value;
	var spacing = Number(document.getElementById("visualizerspacing").value);
	var spacing2 = Number(document.getElementById("visualizerspacing2").value);
	var top = Number(document.getElementById("visualizertop").value);
	var left = Number(document.getElementById("visualizerleft").value);
	var rotation = Number(document.getElementById("visualizerrotation").value);
	var offset = Number(document.getElementById("visualizeroffset").value);
	var cutoff = Number(document.getElementById("visualizercutoff").value);
	var multiplier = Number(document.getElementById("visualizermultiplier").value);
	var minfrequency = Number(document.getElementById("minfrequency").value);
	var maxfrequency = Number(document.getElementById("maxfrequency").value);
	var filltype = document.getElementById("filltype").value;
	var fill1 = document.getElementById("visualizerfill1").value;
	var fill2 = document.getElementById("visualizerfill2").value;
	var fillopacity = document.getElementById("fillopacity").value;
	var outlinetype = document.getElementById("outlinetype").value;
	var outlinecolor1 = document.getElementById("outlinecolor1").value;
	var outlinecolor2 = document.getElementById("outlinecolor2").value;
	var outlinewidth = Number(document.getElementById("outlinewidth").value);
	var outlineopacity = Number(document.getElementById("outlineopacity").value);
	
	//These are the x and y coordinates of the center point of the visualizer - It starts at the center of the video and moves according to what the user has chosen for positions
	var leftposition = Math.round((videowidth/2) + left);
	var topposition = Math.round((videoheight/2) + top);
	
	//Canvas contexts for the visualizer and the hidden canvas used to "cache" the background for supposedly faster drawing speed when copying to the visualizer instead of directly from the image each time
	var visualizercanvas = document.getElementById("visualizer");
	var visualizercanvasctx = visualizercanvas.getContext("2d");
	var cachedbgimgcanvas = document.getElementById("cachedbgimg");
	var cachedbgimgcanvasctx = cachedbgimgcanvas.getContext("2d");
	var cachedfgimgcanvas = document.getElementById("cachedfgimg");
	var cachedfgimgcanvasctx = cachedfgimgcanvas.getContext("2d");
	
	//Misc options
	var bgimg = document.getElementById("bgimg");
	var fgimg = document.getElementById("fgimg");
	var fgimgwidth = fgimg.width;
	var fgimgheight = fgimg.height;
	var fillimg = document.getElementById("fillimg");
	var outlineimg = document.getElementById("outlineimg");
	var blankimg = document.getElementById("blankimg");
	var maxheightadjustment = maxheight/256;
	
	//Audio analyzer frequency data
	var analyser = audioctx.createAnalyser();
	analyser.fftSize = 512;
	audiosource.connect(analyser);
	audiosource.connect(audioctx.destination);
	audiosource.connect(audioctxmediastream);
	var frequencydata = new Uint8Array(analyser.frequencyBinCount);
	var frequencyspacing = Math.round((maxfrequency-minfrequency)/(howmany+1));
	
	//These are used for visualizers that need variables that retain their values outside of the rendering loop
	//A common use for these are for motion and movements that get updated each loop
	var spinningtrianglesvars = {anglestart:0};
	var internetgbvars = {shockwave:0, rot:0, intensity:0, center_x:0, center_y:0, radius:width};
	
	if (recording) {
		if (videomaxfps > 0) {
			var canvasstream = visualizercanvas.captureStream(videomaxfps);
		}
		else {
			var canvasstream = visualizercanvas.captureStream();
		}
		var recordaudiocheck = document.getElementById("recordaudio").checked;
		if (recordaudiocheck && navigator.userAgent.search("Firefox")) {
			//Hack to mix video and audio for firefox without .addTrack due to a bug in firefox - Huge thanks to Kaiido on stackoverflow for the solution
			//Without this the audio will not record in firefox
			var audiostream = audioctxmediastream.stream;
			var mixedstream = new MediaStream([canvasstream.getVideoTracks()[0], audiostream.getAudioTracks()[0]]);
			var videofileformat = document.getElementById("videofileformat").value;
			var options = {mimeType: videofileformat};
			var recorder = new MediaRecorder(mixedstream, options);
		}
		else if (recordaudiocheck) {
			canvasstream.addTrack(audioctxmediastream.stream.getAudioTracks()[0]);
			var videofileformat = document.getElementById("videofileformat").value;
			var options = {mimeType: videofileformat};
			var recorder = new MediaRecorder(canvasstream, options);
		}
		else {
			var videofileformat = document.getElementById("videofileformat").value;
			var options = {mimeType: videofileformat};
			var recorder = new MediaRecorder(canvasstream, options);	
		}
		recorder.addEventListener('dataavailable', finishCapturing);
		recorder.start();
		function finishCapturing(e) {
			capturing = false;
			var videoData = [ e.data ];
			var blob = new Blob(videoData, { 'type': 'video/webm' });
			saveAs(blob,"video.webm");
			//var videoURL = URL.createObjectURL(blob);
			//window.URL.revokeObjectURL(videoURL);
			//document.getElementById('visualizer').style.display = "none";
			//document.getElementById('videooutput').style.display = "block";
			//videooutput.src = videoURL;
			//videooutput.play();
		}
		//Display recording message
		document.getElementById("recordingmessage").style.display = "block";
	}
	else {
		//If not recording then show the audio seekbar
		document.getElementById("visualizerseekbar").style.display = "block";
	}
	
	//Start Playing Audio
	audioplayer.currentTime = 0;
	audioplayer.play();
	
	function renderframe() {
		if (!audioplayer.paused){
			requestAnimationFrame(renderframe);
			
			//Reset opacity to 1 - Since global alpha can be changed for the fill, stroke, and foreground image it needs to be reset before drawing the background color and background image
			visualizercanvasctx.globalAlpha = 1;
			
			//Reset transform - This is slightly faster than doing save and restore
			visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
			
			//Fill the background color of the visualizer
			visualizercanvasctx.fillStyle = visualizerbgcolor;
			visualizercanvasctx.fillRect(0,0,videowidth,videoheight);
			
			//Fill the background image of the visualizer if specified
			if (bgimg.src != blankimg.src) {
				visualizercanvasctx.drawImage(cachedbgimgcanvas,0,0);
			}

			//Set the rotation
			if (rotation != 0) {
				visualizercanvasctx.translate(leftposition,topposition);
				visualizercanvasctx.rotate(rotation * (Math.PI / 180));
				visualizercanvasctx.translate(-leftposition,-topposition);
			}
			
			//Set the line cap type
			if (linecap == "round") {
				visualizercanvasctx.lineCap = "round";
			}

			//Set the fill type
			if (filltype == "solid") {
				visualizercanvasctx.fillStyle = fill1;
			}
			else if (filltype == "verticalgradient") {
				var gradient = visualizercanvasctx.createLinearGradient(0, videoheight, 0, 0);
				gradient.addColorStop(0, fill1);
				gradient.addColorStop(1, fill2);
				visualizercanvasctx.fillStyle = gradient;
			}
			else if (filltype == "horizontalgradient") {
				var gradient = visualizercanvasctx.createLinearGradient(0, 0, videowidth, 0);
				gradient.addColorStop(0, fill1);
				gradient.addColorStop(1, fill2);
				visualizercanvasctx.fillStyle = gradient;
			}
			else if (filltype == "image") {
				if (fillimg.src != blankimg.src) {
					var pattern = visualizercanvasctx.createPattern(fillimg,"repeat");
					visualizercanvasctx.fillStyle = pattern;
				}
				else {
					visualizercanvasctx.fillStyle = 'rgba(0, 0, 0, 0)';	
				}
			}

			//Set the outline type
			if (outlinetype == "solid") {
				visualizercanvasctx.lineWidth = outlinewidth;
				visualizercanvasctx.strokeStyle = outlinecolor1;
			}
			else if (outlinetype == "verticalgradient") {
				var gradient = visualizercanvasctx.createLinearGradient(0, videoheight, 0, 0);
				gradient.addColorStop(0, outlinecolor1);
				gradient.addColorStop(1, outlinecolor2);
				visualizercanvasctx.lineWidth = outlinewidth;
				visualizercanvasctx.strokeStyle = gradient;
			}
			else if (outlinetype == "horizontalgradient") {
				var gradient = visualizercanvasctx.createLinearGradient(0, 0, videowidth, 0);
				gradient.addColorStop(0, fill1);
				gradient.addColorStop(1, fill2);
				visualizercanvasctx.lineWidth = outlinewidth;
				visualizercanvasctx.strokeStyle = gradient;
			}
			else if (outlinetype == "image") {
				if (outlineimg.src != blankimg.src) {
					var pattern = visualizercanvasctx.createPattern(outlineimg,"repeat");
					visualizercanvasctx.lineWidth = outlinewidth;
					visualizercanvasctx.strokeStyle = pattern;
				}
				else {
					visualizercanvasctx.strokeStyle = 'rgba(0, 0, 0, 0)';	
				}
			}
			
			//Visualizer Types
			if (visualizertype == "verticalbars") {
				analyser.getByteFrequencyData(frequencydata);
				verticalbars(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, barsalignment, linecap, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment);
			}
			else if (visualizertype == "blockbars") {
				analyser.getByteFrequencyData(frequencydata);
				blockbars(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, barsalignment, howmany, minheight, width, spacing, spacing2, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment);
			}
			else if (visualizertype == "3dbars") {
				analyser.getByteFrequencyData(frequencydata);
				bars3d(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, depth, slope, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment);
			}
			else if (visualizertype == "stretchycircle") {
				analyser.getByteFrequencyData(frequencydata);
				stretchycircle(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment);
			}
			else if (visualizertype == "timedomainline") {
				analyser.getByteTimeDomainData(frequencydata);
				timedomainline(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, minfrequency, maxfrequency, maxheightadjustment);
			}
			else if (visualizertype == "timedomainsquares") {
				analyser.getByteTimeDomainData(frequencydata);
				timedomainsquares(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, minfrequency, maxfrequency, maxheightadjustment);
			}
			else if (visualizertype == "spinningtriangles") {
				analyser.getByteFrequencyData(frequencydata);
				spinningtrianglesvars = spinningtriangles(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, minrotationspeed, maxrotationspeed, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment, spinningtrianglesvars);
			}
			else if (visualizertype == "bubbles") {
				analyser.getByteFrequencyData(frequencydata);
				bubbles(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment);
			}
			else if (visualizertype == "internetgb") {
				analyser.getByteFrequencyData(frequencydata);
				internetgbvars = internetgb(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment, internetgbvars);
			}
			
			//Fill the foreground image of the visualizer if specified
			if (fgimg.src != blankimg.src) {
				//Reset the opacity
				visualizercanvasctx.globalAlpha = 1;
				//Reset transform - This is slightly faster than doing save and restore
				visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
				visualizercanvasctx.drawImage(cachedfgimgcanvas, leftposition - (fgimgwidth/2) + foregroundpositionleft, topposition - (fgimgheight/2) + foregroundpositiontop);
			}
		}
		else if (recording) {
			//Hide recording message
			document.getElementById("recordingmessage").style.display = "none";
			recorder.stop();
			//stream.getVideoTracks()[0].stop();
			//stream.getAudioTracks()[0].stop();
			audiosource.disconnect();
		}
		else {
			//If not recording then hide the audio seekbar since the preview is done
			document.getElementById("visualizerseekbar").style.display = "none";
		}
	};
	//Start rendering frames
	renderframe();
}
function stoppreview(){
	audioplayer.pause();
	audioplayer.currentTime = 0;
}
