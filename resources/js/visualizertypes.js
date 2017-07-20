//VERTICAL BARS--------------------------------------------------------------
function verticalbars(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, barsalignment, linecap, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment) {
	if (visualizershape == "none") {
		var leftposition = Math.round((videowidth/2) - ((((howmany-1)*spacing)/2) + ((howmany*width)/2)) + left);
		var topposition = Math.round((videoheight/2) + top);
		visualizercanvasctx.beginPath();
		for(var i=0; i < howmany; i++){
			if (frequencydata) {
				var nodefrequency = (frequencyspacing*i) + minfrequency;
				var heightchange = Math.max((((frequencydata[nodefrequency]*maxheightadjustment) - cutoff)*multiplier), 0);
			}
			else {
				var heightchange = 0;	
			}
			var totalheight = minheight + heightchange;
			if (barsalignment == "bottom") {
				var toppositionheightchange = topposition - totalheight + (offset * i);
			}
			else if (barsalignment == "middle") {
				var toppositionheightchange = topposition - (totalheight/2) + (offset * i);
			}
			else if (barsalignment == "top") {
				var toppositionheightchange = topposition + (offset * i);
			}
			var leftpositionwidthchange = leftposition + ((width + spacing) * i);
			if (linecap == "square") {
				visualizercanvasctx.rect(leftpositionwidthchange, toppositionheightchange, width, totalheight);
			}
			else if (linecap == "round") {	
				visualizercanvasctx.moveTo(leftpositionwidthchange, toppositionheightchange);
				visualizercanvasctx.lineTo(leftpositionwidthchange, toppositionheightchange + totalheight);
				visualizercanvasctx.arc(leftpositionwidthchange + (width / 2), toppositionheightchange + totalheight, (width / 2), 1 * Math.PI, 0 * Math.PI, true);
				visualizercanvasctx.lineTo(leftpositionwidthchange + width, toppositionheightchange);
				visualizercanvasctx.arc(leftpositionwidthchange + (width / 2), toppositionheightchange, (width / 2), 0, 1 * Math.PI, true);
			}
		}
		if (outlinetype != "none") {
			visualizercanvasctx.globalAlpha = outlineopacity;
			visualizercanvasctx.stroke();	
		}
		if (filltype != "none") {
			visualizercanvasctx.globalAlpha = fillopacity;
			visualizercanvasctx.fill();
		}
	}
	else if (visualizershape == "circle") {
		var angle = 2*Math.PI/howmany ;
		var leftposition = Math.round((videowidth/2) + left);
		var topposition = Math.round((videoheight/2) + top);
		visualizercanvasctx.translate(leftposition,topposition);
		visualizercanvasctx.beginPath();
		for(var i=1; i <= howmany; i++){
			if (frequencydata){
				var nodefrequency = (frequencyspacing*i) + minfrequency;
				var heightchange = Math.max((((frequencydata[nodefrequency]*maxheightadjustment) - cutoff)*multiplier), 0);
			}
			else {
				var heightchange = 0;	
			}
			var totalheight = minheight + heightchange;
			if (barsalignment == "bottom") {
				var toppositionheightchange = visualizershapesize + (offset * i);
			}
			else if (barsalignment == "middle") {
				var toppositionheightchange = visualizershapesize - (totalheight/2) + (offset * i);
			}
			else if (barsalignment == "top") {
				var toppositionheightchange = visualizershapesize - totalheight + (offset * i);
			}
			visualizercanvasctx.rotate(angle);
			if (linecap == "square") {
				visualizercanvasctx.rect((width*-0.5), toppositionheightchange, width, totalheight);
			}
			else if (linecap == "round") {
				visualizercanvasctx.moveTo((width*-0.5), toppositionheightchange);
				visualizercanvasctx.lineTo((width*-0.5), toppositionheightchange + totalheight);
				visualizercanvasctx.arc(0, toppositionheightchange + totalheight, (width / 2), 1 * Math.PI, 0 * Math.PI, true);
				visualizercanvasctx.lineTo((width / 2), toppositionheightchange);
				visualizercanvasctx.arc(0, toppositionheightchange, (width / 2), 0, 1 * Math.PI, true);
			}
		}
		if (outlinetype != "none") {
			visualizercanvasctx.globalAlpha = outlineopacity;
			visualizercanvasctx.stroke();	
		}
		if (filltype != "none") {
			visualizercanvasctx.globalAlpha = fillopacity;
			visualizercanvasctx.fill();
		}
		//Reset transform - This is slightly faster than doing save and restore
		visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
	}
}
//BLOCK BARS --------------------------------------------------------------
function blockbars(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, barsalignment, howmany, minheight, width, spacing, spacing2, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment) {
	if (visualizershape == "none") {
		var leftposition = Math.round((videowidth/2) - ((((howmany-1)*spacing)/2) + ((howmany*width)/2)) + left);
		var topposition = Math.round((videoheight/2) + top);
		visualizercanvasctx.beginPath();
		for(var i=0; i < howmany; i++){
			if (frequencydata) {
				var nodefrequency = (frequencyspacing*i) + minfrequency;
				var heightchange = Math.max((((frequencydata[nodefrequency]*maxheightadjustment) - cutoff)*multiplier), 0);
			}
			else {
				var heightchange = 0;	
			}
			var numberofblocks = Math.floor((heightchange/(minheight + spacing2)) + 1);
			if (barsalignment == "bottom") {
				var toppositionheightchange = topposition - (numberofblocks * minheight) + (offset * i) - (spacing2 * (numberofblocks - 1));
			}
			else if (barsalignment == "middle") {
				var toppositionheightchange = topposition - (((numberofblocks + 1) / 2) * minheight) + (minheight/2) + (offset * i) - ((spacing2/2) * (numberofblocks - 1));
			}
			else if (barsalignment == "top") {
				var toppositionheightchange = topposition + (offset * i);
			}
			var leftpositionwidthchange = leftposition + ((width + spacing) * i);
			for(var i2=0; i2 < numberofblocks; i2++){
				visualizercanvasctx.rect(leftpositionwidthchange,(toppositionheightchange + (minheight * i2) + (spacing2 * i2)),width,minheight);
			}
		}
		if (filltype != "none") {
			visualizercanvasctx.globalAlpha = fillopacity;
			visualizercanvasctx.fill();
		}
		if (outlinetype != "none") {
			visualizercanvasctx.globalAlpha = outlineopacity;
			visualizercanvasctx.stroke();
		}
	}
	else if (visualizershape == "circle") {
		var angle = 2*Math.PI/howmany ;
		var leftposition = Math.round((videowidth/2) + left);
		var topposition = Math.round((videoheight/2) + top);
		visualizercanvasctx.translate(leftposition,topposition);
		visualizercanvasctx.beginPath();
		for(var i=1; i <= howmany; i++){
			if (frequencydata){
				var nodefrequency = (frequencyspacing*i) + minfrequency;
				var heightchange = Math.max((((frequencydata[nodefrequency]*maxheightadjustment) - cutoff)*multiplier), 0);
			}
			else {
				var heightchange = 0;	
			}
			var numberofblocks = Math.floor((heightchange/(minheight + spacing2)) + 1);
			if (barsalignment == "bottom") {
				var toppositionheightchange = visualizershapesize + (offset * i);
			}
			else if (barsalignment == "middle") {
				var toppositionheightchange = visualizershapesize - (((numberofblocks + 1) / 2) * minheight) + (minheight/2) + (offset * i) - ((spacing2/2) * (numberofblocks - 1));
			}
			else if (barsalignment == "top") {
				var toppositionheightchange = visualizershapesize - (numberofblocks * minheight) + (offset * i) - (spacing2 * (numberofblocks - 1));
			}
			visualizercanvasctx.rotate(angle);
			for(var i2=0; i2 < numberofblocks; i2++){
				visualizercanvasctx.rect((width*-0.5),(toppositionheightchange + (minheight * i2) + (spacing2 * i2)),width,minheight);
			}
		}
		if (filltype != "none") {
			visualizercanvasctx.globalAlpha = fillopacity;
			visualizercanvasctx.fill();
		}
		if (outlinetype != "none") {
			visualizercanvasctx.globalAlpha = outlineopacity;
			visualizercanvasctx.stroke();
		}
		//Reset transform - This is slightly faster than doing save and restore
		visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
	}
}
//3D BARS -------------------------------------------------------
function bars3d(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, depth, slope, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment) {
	if (visualizershape == "none") {
		var leftposition = Math.round((videowidth/2) - ((((howmany-1)*spacing)/2) + ((howmany*width)/2)) + left);
		var topposition = Math.round((videoheight/2) + top);
		//This is used to fix some jagged/pointy outlines on corners.
		visualizercanvasctx.lineJoin="bevel";
		for(var i=0; i < howmany; i++){
			if (frequencydata) {
				var nodefrequency = (frequencyspacing*i) + minfrequency;
				var heightchange = Math.max((((frequencydata[nodefrequency]*maxheightadjustment) - cutoff)*multiplier), 0);
			}
			else {
				var heightchange = 0;	
			}
			var totalheight = minheight + heightchange;
			
			visualizercanvasctx.beginPath();
			
			visualizercanvasctx.moveTo(leftposition,topposition);
			visualizercanvasctx.lineTo((leftposition + width),(topposition + (width / slope)));
			visualizercanvasctx.lineTo((leftposition + width),(topposition - totalheight + (width / slope)));
			visualizercanvasctx.lineTo(leftposition,(topposition - totalheight));
			visualizercanvasctx.lineTo(leftposition,topposition);
			visualizercanvasctx.closePath();

			visualizercanvasctx.moveTo(leftposition,(topposition - totalheight));
			visualizercanvasctx.lineTo((leftposition + (depth/slope)),(topposition - totalheight - depth));
			visualizercanvasctx.lineTo((leftposition + (depth/slope) + width),(topposition - totalheight - depth + (width / slope)));
			visualizercanvasctx.lineTo((leftposition + width),(topposition - totalheight + (width / slope)));

			visualizercanvasctx.moveTo((leftposition + (depth/slope) + width),(topposition - totalheight - depth + (width / slope)));
			visualizercanvasctx.lineTo((leftposition + (depth/slope) + width),(topposition - depth + (width / slope)));
			visualizercanvasctx.lineTo((leftposition + width),(topposition + (width / slope)));
			visualizercanvasctx.lineTo((leftposition + width),(topposition - totalheight + (width / slope)));
			visualizercanvasctx.lineTo((leftposition + (depth/slope) + width),(topposition - totalheight - depth + (width / slope)));
			visualizercanvasctx.closePath();

			if (filltype != "none") {
				visualizercanvasctx.globalAlpha = fillopacity;
				visualizercanvasctx.fill();
			}
			if (outlinetype != "none") {
				visualizercanvasctx.globalAlpha = outlineopacity;
				visualizercanvasctx.stroke();
			}

			var leftposition = leftposition + (width + spacing);
			var topposition = topposition + offset;
		}
	}	
}

//STRETCHY CIRCLE -----------------------------------------------------
function stretchycircle(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment) {
	var anglespacing = 360/howmany;
	var radius = width/2;
	var leftposition = Math.round((videowidth/2) + left);
	var topposition = Math.round((videoheight/2) + top);
	visualizercanvasctx.beginPath();
	visualizercanvasctx.moveTo((leftposition+radius),topposition);
	for(var i=1; i <= howmany; i++){
		if (frequencydata) {
			var nodefrequency = (frequencyspacing*i) + minfrequency;
			var heightchange = Math.max((((frequencydata[nodefrequency]*maxheightadjustment) - cutoff)*multiplier), 0);
		}
		else {
			var heightchange = 0;
		}
		var nextpointx = (radius * Math.cos(anglespacing* i * (Math.PI / 180))) + leftposition;
		var nextpointy = (radius * Math.sin(anglespacing* i * (Math.PI / 180))) + topposition;
		var curvepointx = (((radius + minheight) + heightchange) * Math.cos(((anglespacing*i) - (anglespacing/2)) * (Math.PI / 180))) + leftposition;
		var curvepointy = (((radius + minheight) + heightchange) * Math.sin(((anglespacing*i) - (anglespacing/2)) * (Math.PI / 180))) + topposition;
		visualizercanvasctx.quadraticCurveTo(curvepointx,curvepointy,nextpointx,nextpointy);
	}
	visualizercanvasctx.closePath();
	if (outlinetype != "none") {
		visualizercanvasctx.globalAlpha = outlineopacity;
		visualizercanvasctx.stroke();	
	}
	if (filltype != "none") {
		visualizercanvasctx.globalAlpha = fillopacity;
		visualizercanvasctx.fill();
	}
}
//TIME DOMAIN SQUARES --------------------------------------------------------------
function timedomainsquares(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, minfrequency, maxfrequency, maxheightadjustment) {
	var leftposition = Math.round((videowidth/2) - (width/2) + left);
	var topposition = Math.round((videoheight/2) + top - (minheight/2));
	if (frequencydata){
		var length = frequencydata.length;
	}
	else {
		var length = 256;	
	}
	if (visualizershape == "none") {
		var squarewidth = width/length;
		visualizercanvasctx.beginPath();
		for(var i=0; i <= length; i++){
			if (frequencydata) {
				var heightchange = (frequencydata[i] * maxheightadjustment) - (maxheightadjustment * 128);
			}
			else {
				var heightchange = 0;
			}
			visualizercanvasctx.rect(((squarewidth * i) + leftposition), (topposition + heightchange), Math.ceil(squarewidth), minheight);	
		}
		if (outlinetype != "none") {
			visualizercanvasctx.globalAlpha = outlineopacity;
			visualizercanvasctx.stroke();	
		}
		if (filltype != "none") {
			visualizercanvasctx.globalAlpha = fillopacity;
			visualizercanvasctx.fill();
		}
	}
	else if (visualizershape == "circle") {
		var squarewidth = (2 * Math.PI * visualizershapesize)/length;
		visualizercanvasctx.beginPath();
		var angle = 2*Math.PI/length;
		var leftposition = Math.round((videowidth/2) + left);
		var topposition = Math.round((videoheight/2) + top);
		if (frequencydata){
			var seamlesschange = ((frequencydata[0] * maxheightadjustment) - (frequencydata[255] * maxheightadjustment)) / length;
		}
		visualizercanvasctx.translate(leftposition,topposition);
		for(var i=0; i <= length; i++){
			if (frequencydata){
				var heightchange = (frequencydata[i] * maxheightadjustment) - (maxheightadjustment * 128) + (seamlesschange * i);
			}
			else {
				var heightchange = 0;	
			}
			var totalheight = minheight + heightchange;
			visualizercanvasctx.rotate(angle);
			visualizercanvasctx.rect((squarewidth*-0.5), (visualizershapesize + heightchange), Math.ceil(squarewidth), minheight);
		}
		if (outlinetype != "none") {
			visualizercanvasctx.globalAlpha = outlineopacity;
			visualizercanvasctx.stroke();	
		}
		if (filltype != "none") {
			visualizercanvasctx.globalAlpha = fillopacity;
			visualizercanvasctx.fill();
		}
		//Reset transform - This is slightly faster than doing save and restore
		visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
	}
}
//TIME DOMAIN LINE --------------------------------------------------------------
function timedomainline(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, minfrequency, maxfrequency, maxheightadjustment) {
	var leftposition = Math.round((videowidth/2) - (width/2) + left);
	var topposition = Math.round((videoheight/2) + top);
	if (frequencydata){
		var length = frequencydata.length;
	}
	else {
		var length = 256;	
	}
	var nodewidth = width/length;
	//Draw Time Domain
	if (visualizershape == "none") {
		visualizercanvasctx.beginPath();
		for(var i=0; i <= length; i++){
			if (frequencydata) {
				var heightchange = (frequencydata[i] * maxheightadjustment) - (maxheightadjustment * 128);
			}
			else {
				var heightchange = 0;
			}
			visualizercanvasctx.lineTo(Math.ceil(leftposition + (nodewidth * i)),(topposition + heightchange));
		}
		//Does the stroke first for the outline effect and then another stroke to act as the main color
		if (outlinetype != "none") {
			visualizercanvasctx.globalAlpha = outlineopacity;
			visualizercanvasctx.lineWidth = minheight + outlinewidth;
			visualizercanvasctx.stroke();	
		}
		if (filltype != "none") {
			visualizercanvasctx.globalAlpha = fillopacity;
			visualizercanvasctx.lineWidth = minheight;
			visualizercanvasctx.strokeStyle = visualizercanvasctx.fillStyle;
			visualizercanvasctx.stroke();
		}
	}
	else if (visualizershape == "circle") {
		var angle = 2*Math.PI/length ;
		var leftposition = Math.round((videowidth/2) + left);
		var topposition = Math.round((videoheight/2) + top);
		//This is used to move each point slightly so the start and end point seamlessly line up on the circle
		if (frequencydata){
			var seamlesschange = ((frequencydata[0] * maxheightadjustment) - (frequencydata[255] * maxheightadjustment)) / length;
		}
		visualizercanvasctx.translate(leftposition,topposition);
		visualizercanvasctx.beginPath();
		for(var i=0; i <= length; i++){
			if (frequencydata){
				var heightchange = (frequencydata[i] * maxheightadjustment) - (maxheightadjustment * 128) + (seamlesschange * i);
			}
			else {
				var heightchange = 0;	
			}
			visualizercanvasctx.lineTo(0, (visualizershapesize + heightchange));
			visualizercanvasctx.rotate(angle);
			
		}
		visualizercanvasctx.closePath();
		//Does the stroke first for the outline effect and then another stroke to act as the main color
		if (outlinetype != "none") {
			visualizercanvasctx.globalAlpha = outlineopacity;
			visualizercanvasctx.lineWidth = minheight + outlinewidth;
			visualizercanvasctx.stroke();	
		}
		if (filltype != "none") {
			visualizercanvasctx.globalAlpha = fillopacity;
			visualizercanvasctx.lineWidth = minheight;
			visualizercanvasctx.strokeStyle = visualizercanvasctx.fillStyle;
			visualizercanvasctx.stroke();
		}
		//Reset transform - This is slightly faster than doing save and restore
		visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
	}
}
//SPINNING TRIANGLES --------------------------------------------------------------
function spinningtriangles(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, minrotationspeed, maxrotationspeed, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment, spinningtrianglesvars) {
	var leftposition = Math.round((videowidth/2) + left);
	var topposition = Math.round((videoheight/2) + top);
	if (!spinningtrianglesvars) {
		var spinningtrianglesvars = {anglestart:0};	
	}
	var twopi = 2 * Math.PI;
	var anglegap = twopi / 3;
	var angle = spinningtrianglesvars.anglestart;
	var minrotationspeed = minrotationspeed * (Math.PI / 180);
	var maxrotationspeed = maxrotationspeed * (Math.PI / 180);
	var totalfrequencychange = 0;
	//Temporary way to copy the outline and fill style
	//This visualizer strokes each shape individually to take advantage of the global composite operation effect
	var outlinestyle = visualizercanvasctx.strokeStyle;
	var fillstyle = visualizercanvasctx.fillStyle;
	for(var i=0; i < howmany; i++){
		if (frequencydata) {
			var nodefrequency = (frequencyspacing*i) + minfrequency;
			var heightchange = Math.max((((frequencydata[nodefrequency]*maxheightadjustment) - cutoff)*multiplier), 0);
		}
		else {
			var heightchange = 0;
		}
		var totalheight = minheight + heightchange;
		var angle = angle + minrotationspeed;
		visualizercanvasctx.beginPath();
		visualizercanvasctx.moveTo(leftposition + totalheight * Math.sin(angle), topposition + totalheight * Math.cos(angle));
		visualizercanvasctx.lineTo(leftposition + totalheight * Math.sin(angle + anglegap), topposition + totalheight * Math.cos(angle + anglegap));
		visualizercanvasctx.lineTo(leftposition + totalheight * Math.sin(angle + anglegap * 2), topposition + totalheight * Math.cos(angle + anglegap * 2));
		visualizercanvasctx.closePath();
		//Does the stroke first for the outline effect and then another stroke to act as the main color
		if (outlinetype != "none") {
			visualizercanvasctx.globalAlpha = outlineopacity;
			visualizercanvasctx.lineWidth = outlinewidth + width;
			visualizercanvasctx.strokeStyle = outlinestyle;
			visualizercanvasctx.stroke();	
		}
		if (filltype != "none") {
			visualizercanvasctx.globalAlpha = fillopacity;
			visualizercanvasctx.lineWidth = width;
			visualizercanvasctx.strokeStyle = fillstyle;
			visualizercanvasctx.stroke();
		}
		totalfrequencychange = totalfrequencychange + heightchange;
	}
	spinningtrianglesvars.anglestart = (spinningtrianglesvars.anglestart + ((maxrotationspeed / 10000) * (totalfrequencychange / (howmany * maxheightadjustment)))) % twopi;
	if (frequencydata) {
		return spinningtrianglesvars;
	}
}
//BUBBLES --------------------------------------------------------------
function bubbles(videowidth, videoheight, visualizerbgcolor, visualizershape, visualizershapesize, howmany, minheight, width, spacing, top, left, offset, cutoff, multiplier, filltype, fillopacity, outlinetype, outlinewidth, outlineopacity, visualizercanvasctx, analyser, frequencydata, frequencyspacing, minfrequency, maxfrequency, maxheightadjustment) {
	var leftposition = Math.round((videowidth/2) + left);
	var topposition = Math.round((videoheight/2) + top);
	var angle = 8*Math.PI/howmany;
	visualizercanvasctx.translate(leftposition,topposition);
	visualizercanvasctx.beginPath();
	for(var i=0; i < howmany; i++){
		if (frequencydata) {
			var nodefrequency = (frequencyspacing*i) + minfrequency;
			var heightchange = Math.max((((frequencydata[nodefrequency]*maxheightadjustment) - cutoff)*multiplier), 0);
			var heightchange2 = Math.max((((frequencydata[nodefrequency+5]*maxheightadjustment) - cutoff)*multiplier), 0);
		}
		else {
			var heightchange = 0;
			var heightchange2 = 0;
		}
		visualizercanvasctx.moveTo(heightchange,heightchange2);
        	visualizercanvasctx.arc(heightchange,heightchange2,10+(heightchange/2),0,2*Math.PI);
		visualizercanvasctx.rotate(angle);
	}
	if (outlinetype != "none") {
		visualizercanvasctx.globalAlpha = outlineopacity;
		visualizercanvasctx.stroke();	
	}
	if (filltype != "none") {
		visualizercanvasctx.globalAlpha = fillopacity;
		visualizercanvasctx.fill();
	}
	//Reset transform - This is slightly faster than doing save and restore
	visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
}
