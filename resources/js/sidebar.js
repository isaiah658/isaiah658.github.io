// This file contains most of the JavaScript functions called/used by the sidebar buttons
// Documentation buttons, presets, playing and stopping the preview, and recording are not included

var sidebar = {};

// Called when the user checks the checkbox for including audio in the recording
sidebar.audio_warning = function(){
	var recordaudiocheck = document.getElementById("recordaudio").checked;
	if (recordaudiocheck){
		alert("Including audio in the recording can have a noticable effect on performance and video quality and is not recommended if trying to achieve greater than 30 FPS. Please view the documentation under the limitations page and the FAQ page for more details.");
	}
};

// Called when the user changes the zoom option
sidebar.zoom = function(){
	var zoom = Number(document.getElementById("zoom").value)/100;
	document.getElementById("visualizer").style.transform = "translateX(-50%) translateY(-50%) scale("+zoom+", "+zoom+")";
};

// Called when the user selects the background image
sidebar.set_background_image = function(selected){
	var bgimg = document.getElementById("bgimg");
	var blankimg = document.getElementById("blankimg");
	var image = selected.files;
	var url = URL.createObjectURL(image[0]);
	bgimg.onload = function (){
		if (bgimg.src != blankimg.src){
			document.getElementById("clearbackgroundimagebutton").style.display = "block";
		}
		else {
			document.getElementById("clearbackgroundimagebutton").style.display = "none";	
		}
		visualizer.update_preview_image();
	};
	bgimg.src = url;
};

sidebar.clear_background_image = function(){
	document.getElementById("backgroundimageform").reset();
	document.getElementById("bgimg").src = "resources/img/blank.png";
	document.getElementById("clearbackgroundimagebutton").style.display = "none";
};

// Called when the user selects the foreground image
sidebar.set_foreground_image = function(selected){
	var fgimg = document.getElementById("fgimg");
	var blankimg = document.getElementById("blankimg");
	var image = selected.files;
	var url = URL.createObjectURL(image[0]);
	fgimg.onload = function (){
		if (fgimg.src != blankimg.src){
			document.getElementById("foregroundpositiontopwrapper").style.display = "block";
			document.getElementById("foregroundpositionleftwrapper").style.display = "block";
			document.getElementById("clearforegroundimagebutton").style.display = "block";
		}
		else {
			document.getElementById("foregroundpositiontopwrapper").style.display = "none";
			document.getElementById("foregroundpositionleftwrapper").style.display = "none";
			document.getElementById("clearforegroundimagebutton").style.display = "none";
		}
		visualizer.update_preview_image();
	};
	fgimg.src = url;
};

sidebar.clear_foreground_image = function(){
	document.getElementById("foregroundimageform").reset();
	document.getElementById("fgimg").src = "resources/img/blank.png";
	document.getElementById("clearforegroundimagebutton").style.display = "none";
};

// Called when user selects the audio file
sidebar.set_audio = function(selectedaudio){
	var audio_file = selectedaudio.files;
	var url = URL.createObjectURL(audio_file[0]); 
	audio.player.src = url;
};

// Called when the audio seekbar is changed by the user
sidebar.move_visualizer_seekbar = function(){
	audio.player.currentTime = audio.player.duration * (document.getElementById("visualizer_seekbar").value / 100);
};

// Called when the user selects the fill pattern image
sidebar.set_fill_image = function(selected){
	var fillimg = document.getElementById("fillimg");
	var image = selected.files;
	var url = URL.createObjectURL(image[0]);
	fillimg.onload = function (){
		visualizer.update_preview_image();
	};
	fillimg.src = url; 
};

// Called when the user selects the outline pattern image
sidebar.set_outline_image = function(selected){
	var outlineimg = document.getElementById("outlineimg");
	var image = selected.files;
	var url = URL.createObjectURL(image[0]);
	outlineimg.onload = function(){
		visualizer.update_preview_image();
	};
	outlineimg.src = url;
};

// Used to hide irrelevant options when selecting visualizer types and fill types
sidebar.hide_unused_options = function(){
	var visualizertype = document.getElementById("visualizertype").value;
	var visualizershape = document.getElementById("visualizershape").value;
	var filltype = document.getElementById("filltype").value;
	var outlinetype = document.getElementById("outlinetype").value;
	
	// Set the default values
	document.getElementById("visualizerbarsalignmentwrapper").style.display = "none";
	document.getElementById("visualizerlinecapwrapper").style.display = "none";
	document.getElementById("visualizercompositemodewrapper").style.display = "none";
	document.getElementById("visualizershapewrapper").style.display = "none";
	document.getElementById("visualizerhowmanywrapper").style.display = "block";
	document.getElementById("maxvisualizerheightwrapper").style.display = "block";
	document.getElementById("minvisualizerheightwrapper").style.display = "block";
	document.getElementById("visualizerwidthwrapper").style.display = "block";
	document.getElementById("visualizerdepthwrapper").style.display = "none";
	document.getElementById("visualizeranglewrapper").style.display = "none";
	document.getElementById("visualizerminrotationspeedwrapper").style.display = "none";
	document.getElementById("visualizermaxrotationspeedwrapper").style.display = "none";
	document.getElementById("visualizerspacingwrapper").style.display = "block";
	document.getElementById("visualizerspacing2wrapper").style.display = "none";
	document.getElementById("visualizeroffsetwrapper").style.display = "block";
	document.getElementById("visualizercutoffwrapper").style.display = "block";
	document.getElementById("visualizermultiplierwrapper").style.display = "block";
	document.getElementById("minfrequencywrapper").style.display = "block";
	document.getElementById("maxfrequencywrapper").style.display = "block";
	
	// Override any default values depending on the visualizer type
	if (visualizertype == "verticalbars"){
		document.getElementById("visualizerbarsalignmentwrapper").style.display = "block";
		document.getElementById("visualizerlinecapwrapper").style.display = "block";
		document.getElementById("visualizershapewrapper").style.display = "block";
		if (visualizershape == "circle"){
			document.getElementById("visualizerspacingwrapper").style.display = "none";
		}
	}
	else if (visualizertype == "blockbars"){
		document.getElementById("visualizerbarsalignmentwrapper").style.display = "block";
		document.getElementById("visualizershapewrapper").style.display = "block";
		document.getElementById("visualizerspacing2wrapper").style.display = "block";
		if (visualizershape == "circle"){
			document.getElementById("visualizerspacingwrapper").style.display = "none";
		}
	}
	else if (visualizertype == "3dbars"){
		document.getElementById("visualizerdepthwrapper").style.display = "block";
		document.getElementById("visualizeranglewrapper").style.display = "block";
	}
	else if (visualizertype == "stretchycircle"){
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
	}
	else if (visualizertype == "timedomainline"){
		document.getElementById("visualizerhowmanywrapper").style.display = "none";
		document.getElementById("visualizershapewrapper").style.display = "block";
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
		document.getElementById("visualizercutoffwrapper").style.display = "none";
		document.getElementById("visualizermultiplierwrapper").style.display = "none";
		document.getElementById("minfrequencywrapper").style.display = "none";
		document.getElementById("maxfrequencywrapper").style.display = "none";
		if (visualizershape == "circle"){
			document.getElementById("visualizerwidthwrapper").style.display = "none";
		}
	}
	else if (visualizertype == "timedomainsquares"){
		document.getElementById("visualizerhowmanywrapper").style.display = "none";
		document.getElementById("visualizershapewrapper").style.display = "block";
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
		document.getElementById("visualizercutoffwrapper").style.display = "none";
		document.getElementById("visualizermultiplierwrapper").style.display = "none";
		document.getElementById("minfrequencywrapper").style.display = "none";
		document.getElementById("maxfrequencywrapper").style.display = "none";
		if (visualizershape == "circle"){
			document.getElementById("visualizerwidthwrapper").style.display = "none";
		}
	}
	else if (visualizertype == "spinningtriangles"){
		document.getElementById("visualizercompositemodewrapper").style.display = "block";
		document.getElementById("visualizeranglewrapper").style.display = "block";
		document.getElementById("visualizerminrotationspeedwrapper").style.display = "block";
		document.getElementById("visualizermaxrotationspeedwrapper").style.display = "block";
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
	}
	else if (visualizertype == "bubbles"){
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
	}
	else if (visualizertype == "internetgb"){
		document.getElementById("visualizerlinecapwrapper").style.display = "block";
		document.getElementById("visualizerminrotationspeedwrapper").style.display = "block";
		document.getElementById("visualizermaxrotationspeedwrapper").style.display = "block";
		document.getElementById("visualizerspacingwrapper").style.display = "none";
		document.getElementById("visualizeroffsetwrapper").style.display = "none";
	}
	
	// Changes options for the fill types
	if (filltype == "solid"){
		document.getElementById("visualizerfill1wrapper").style.display = "block";
		document.getElementById("visualizerfill2wrapper").style.display = "none";
		document.getElementById("visualizerfillimagewrapper").style.display = "none";
	}
	else if (filltype == "verticalgradient"){
		document.getElementById("visualizerfill1wrapper").style.display = "block";
		document.getElementById("visualizerfill2wrapper").style.display = "block";
		document.getElementById("visualizerfillimagewrapper").style.display = "none";
	}
	else if (filltype == "horizontalgradient"){
		document.getElementById("visualizerfill1wrapper").style.display = "block";
		document.getElementById("visualizerfill2wrapper").style.display = "block";
		document.getElementById("visualizerfillimagewrapper").style.display = "none";
	}
	else if (filltype == "image"){
		document.getElementById("visualizerfill1wrapper").style.display = "none";
		document.getElementById("visualizerfill2wrapper").style.display = "none";
		document.getElementById("visualizerfillimagewrapper").style.display = "block";
	}
	else if (filltype == "none"){
		document.getElementById("visualizerfill1wrapper").style.display = "none";
		document.getElementById("visualizerfill2wrapper").style.display = "none";
		document.getElementById("visualizerfillimagewrapper").style.display = "none";
	}
	
	// Changes options for the outline types
	if (outlinetype == "solid"){
		document.getElementById("outlinecolor1wrapper").style.display = "block";
		document.getElementById("outlinecolor2wrapper").style.display = "none";
		document.getElementById("outlineimagewrapper").style.display = "none";
	}
	else if (outlinetype == "verticalgradient"){
		document.getElementById("outlinecolor1wrapper").style.display = "block";
		document.getElementById("outlinecolor2wrapper").style.display = "block";
		document.getElementById("outlineimagewrapper").style.display = "none";
	}
	else if (outlinetype == "horizontalgradient"){
		document.getElementById("outlinecolor1wrapper").style.display = "block";
		document.getElementById("outlinecolor2wrapper").style.display = "block";
		document.getElementById("outlineimagewrapper").style.display = "none";
	}
	else if (outlinetype == "image"){
		document.getElementById("outlinecolor1wrapper").style.display = "none";
		document.getElementById("outlinecolor2wrapper").style.display = "none";
		document.getElementById("outlineimagewrapper").style.display = "block";
	}
	else if (outlinetype == "none"){
		document.getElementById("outlinecolor1wrapper").style.display = "none";
		document.getElementById("outlinecolor2wrapper").style.display = "none";
		document.getElementById("outlineimagewrapper").style.display = "none";
	}
	
	// Call the function for updating the visualizer
	visualizer.update_preview_image();
};
