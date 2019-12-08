// This file contains all the JavaScript related to saving and loading presets

var preset = {};

// Determines if it should show the load file button, load values from a built in preset, or nothing if the none option is selected
preset.dropdown = function(){
	var built_in_preset;
	var loadpreset = document.getElementById("loadpreset").value;
	
	// If the user chose to load a preset from a file, show it, otherwise hide it
	if (loadpreset == "loadpresetfromafile"){
		document.getElementById("loadpresetfromfilewrapper").style.display = "block";
	}
	else {
		document.getElementById("loadpresetfromfilewrapper").style.display = "none";	
	}
	
	// Loads built in presets if chosen
	if (loadpreset == "redline"){
		built_in_preset = ["0", "0", "1920", "1080", "", "#e8e8e8", "timedomainline", "bottom", "square", "none", "100", "17", "1050", "10", "1920", "10", "2", "2", "4", "0", "0", "0", "0", "35", "1.2", "solid", "#e97669", "#000000", "1.0", "solid", "#c61c1c", "#000000", "8", "1.0", "11", "11", "10", "70", "none"];
	}
	else if (loadpreset == "greenbubbles"){
		built_in_preset = ["0", "0", "1920", "1080", "", "#e8e8e8", "bubbles", "bottom", "square", "none", "100", "17", "250", "0", "20", "10", "2", "2", "4", "0", "0", "0", "0", "35", "1.2", "solid", "#24dd76", "#000000", "1.0", "solid", "#318d14", "#000000", "35", "1.0", "11", "11", "10", "70", "none"];
	}
	else if (loadpreset == "bubblebars"){
		built_in_preset = ["0", "0", "1920", "1080", "", "#e8e8e8", "internetgb", "bottom", "round", "none", "100", "50", "400", "50", "6", "10", "2", "2", "4", "0", "0", "0", "0", "40", "2", "solid", "#1865b1", "#000000", "1.0", "none", "#000000", "#000000", "5", "1", "10", "50", "10", "160", "none"];
	}
	else if (loadpreset == "glowinggreentriangles"){
		built_in_preset = ["0", "0", "1920", "1080", "", "#454545", "spinningtriangles", "bottom", "square", "none", "100", "35", "300", "40", "20", "10", "20", "2", "4", "0", "0", "0", "0", "35", "1.2", "solid", "#1d6734", "#000000", "0.2", "none", "#000000", "#000000", "0", "1.0", "30", "200", "0", "80", "lighter"];
	}
	else if (loadpreset == "hypnotictriangles"){
		built_in_preset = ["0", "0", "1920", "1080", "", "#999999", "spinningtriangles", "bottom", "square", "none", "100", "25", "350", "40", "14", "10", "0", "2", "4", "0", "0", "0", "0", "35", "1.2", "solid", "#2954a8", "#000000", "0.6", "solid", "#000000", "#000000", "4", "0.1", "0", "0", "0", "70", "xor"];
	}
	else if (loadpreset == "strippedbars"){
		built_in_preset = ["0", "0", "1920", "1080", "", "#e8e8e8", "blockbars", "bottom", "square", "none", "100", "50", "450", "10", "46", "10", "2", "-8", "4", "200", "0", "0", "0", "35", "1.2", "verticalgradient", "#609aff", "#ff2b00", "1.0", "none", "#000000", "#000000", "1", "1.0", "10", "30", "0", "160", "none"];
	}
	else if (loadpreset == "drippingslime"){
		built_in_preset = ["0", "0", "1920", "1080", "", "#e8e8e8", "verticalbars", "top", "round", "none", "100", "50", "400", "10", "46", "10", "2", "-8", "4", "-550", "0", "0", "0", "35", "1.2", "solid", "#35d363", "#000000", "1.0", "solid", "#428158", "#000000", "19", "0.8", "10", "30", "0", "160", "none"];
	}
	
	if (built_in_preset){
		preset.load(built_in_preset);
	}
};

// This loads a preset from a text file and puts it into an array
preset.load_file = function(selectedfile){
	var file = selectedfile.files[0];
	var reader = new FileReader();
	reader.onload = function(progressEvent){
		var lines = this.result.split('\n');
		preset.load(lines);
	};
	reader.readAsText(file);
};

// This takes an array of preset values and applies it to each of the corresponding options
preset.load = function(lines){
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
	document.getElementById("visualizerangle").value = lines[16];
	document.getElementById("visualizerspacing").value = lines[17];
	document.getElementById("visualizerspacing2").value = lines[18];
	document.getElementById("visualizertop").value = lines[19];
	document.getElementById("visualizerleft").value = lines[20];
	document.getElementById("visualizerrotation").value = lines[21];
	document.getElementById("visualizeroffset").value = lines[22];
	document.getElementById("visualizercutoff").value = lines[23];
	document.getElementById("visualizermultiplier").value = lines[24];
	document.getElementById("filltype").value = lines[25];
	document.getElementById("visualizerfill1").value = lines[26];
	document.getElementById("visualizerfill2").value = lines[27];
	document.getElementById("fillopacity").value = lines[28];
	document.getElementById("outlinetype").value = lines[29];
	document.getElementById("outlinecolor1").value = lines[30];
	document.getElementById("outlinecolor2").value = lines[31];
	document.getElementById("outlinewidth").value = lines[32];
	document.getElementById("outlineopacity").value = lines[33];
	// These options were added after version 1.0.0 thus checks are added to only load values if they exist. Older presets won't have them.
	if (lines[34]){document.getElementById("visualizerminrotationspeed").value = lines[34];}
	if (lines[35]){document.getElementById("visualizermaxrotationspeed").value = lines[35];}
	if (lines[36]){document.getElementById("minfrequency").value = lines[36];}
	if (lines[37]){document.getElementById("maxfrequency").value = lines[37];}
	if (lines[38]){document.getElementById("visualizercompositemode").value = lines[38];}
	sidebar.hide_unused_options();
};

preset.save = function(){
	config.update_values();
	document.getElementById("savepresettextarea").value = config.foregroundpositiontop + "\n" + config.foregroundpositionleft + "\n" + config.videowidth + "\n" + config.videoheight + "\n" + config.videomaxfps + "\n" + config.visualizerbgcolor + "\n" + config.visualizertype + "\n" + config.barsalignment + "\n" + config.linecap + "\n" + config.visualizershape + "\n" + config.visualizershapesize + "\n" + config.howmany + "\n" + config.maxheight + "\n" + config.minheight + "\n" + config.width + "\n" + config.depth + "\n" + config.angle + "\n" + config.spacing + "\n" + config.spacing2 + "\n" + config.top + "\n" + config.left + "\n" + config.rotation + "\n" + config.offset + "\n" + config.cutoff + "\n" + config.multiplier + "\n" + config.filltype + "\n" + config.fill1 + "\n" + config.fill2 + "\n" + config.fillopacity + "\n" + config.outlinetype + "\n" + config.outlinecolor1 + "\n" + config.outlinecolor2 + "\n" + config.outlinewidth + "\n" + config.outlineopacity + "\n" + config.minrotationspeed + "\n" + config.maxrotationspeed + "\n" + config.minfrequency + "\n" + config.maxfrequency + "\n" + config.compositemode;
  var text = document.getElementById("savepresettextarea").value;
	var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "preset.txt");
};
