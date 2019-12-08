// This file contains all the JavaScript for the visualizer types

var visualizer_types = {};

// Vertical Bars
visualizer_types.vertical_bars = function(visualizercanvasctx, analyser, frequencydata, frequencyspacing, maxheightadjustment){
	var left_position;
	var top_position;
	var node_frequency;
	var height_change = 0;
	var total_height;
	var top_position_height_change;
	var left_position_width_change;
	var circle_angle;
	var i;
	
	if (config.visualizershape == "none"){
		left_position = Math.round((config.videowidth/2) - ((((config.howmany-1)*config.spacing)/2) + ((config.howmany*config.width)/2)) + config.left);
		top_position = Math.round((config.videoheight/2) + config.top);
		visualizercanvasctx.beginPath();
		for (i=0; i < config.howmany; i++){
			if (frequencydata){
				node_frequency = (frequencyspacing*i) + config.minfrequency;
				height_change = Math.max((((frequencydata[node_frequency]*maxheightadjustment) - config.cutoff)*config.multiplier), 0);
			}
			total_height = config.minheight + height_change;
			if (config.barsalignment == "bottom"){
				top_position_height_change = top_position - total_height + (config.offset * i);
			}
			else if (config.barsalignment == "middle"){
				top_position_height_change = top_position - (total_height/2) + (config.offset * i);
			}
			else if (config.barsalignment == "top"){
				top_position_height_change = top_position + (config.offset * i);
			}
			left_position_width_change = left_position + ((config.width + config.spacing) * i);
			if (config.linecap == "square"){
				visualizercanvasctx.rect(left_position_width_change, top_position_height_change, config.width, total_height);
			}
			else if (config.linecap == "round"){	
				visualizercanvasctx.moveTo(left_position_width_change, top_position_height_change);
				visualizercanvasctx.lineTo(left_position_width_change, top_position_height_change + total_height);
				visualizercanvasctx.arc(left_position_width_change + (config.width / 2), top_position_height_change + total_height, (config.width / 2), 1 * Math.PI, 0 * Math.PI, true);
				visualizercanvasctx.lineTo(left_position_width_change + config.width, top_position_height_change);
				visualizercanvasctx.arc(left_position_width_change + (config.width / 2), top_position_height_change, (config.width / 2), 0, 1 * Math.PI, true);
			}
		}
		if (config.outlinetype != "none"){
			visualizercanvasctx.globalAlpha = config.outlineopacity;
			visualizercanvasctx.stroke();	
		}
		if (config.filltype != "none"){
			visualizercanvasctx.globalAlpha = config.fillopacity;
			visualizercanvasctx.fill();
		}
	}
	else if (config.visualizershape == "circle"){
		circle_angle = 2*Math.PI/config.howmany ;
		left_position = Math.round((config.videowidth/2) + config.left);
		top_position = Math.round((config.videoheight/2) + config.top);
		visualizercanvasctx.translate(left_position,top_position);
		visualizercanvasctx.beginPath();
		for (i=1; i <= config.howmany; i++){
			if (frequencydata){
				node_frequency = (frequencyspacing*i) + config.minfrequency;
				height_change = Math.max((((frequencydata[node_frequency]*maxheightadjustment) - config.cutoff)*config.multiplier), 0);
			}
			total_height = config.minheight + height_change;
			if (config.barsalignment == "bottom"){
				top_position_height_change = config.visualizershapesize + (config.offset * i);
			}
			else if (config.barsalignment == "middle"){
				top_position_height_change = config.visualizershapesize - (total_height/2) + (config.offset * i);
			}
			else if (config.barsalignment == "top"){
				top_position_height_change = config.visualizershapesize - total_height + (config.offset * i);
			}
			visualizercanvasctx.rotate(circle_angle);
			if (config.linecap == "square"){
				visualizercanvasctx.rect((config.width*-0.5), top_position_height_change, config.width, total_height);
			}
			else if (config.linecap == "round"){
				visualizercanvasctx.moveTo((config.width*-0.5), top_position_height_change);
				visualizercanvasctx.lineTo((config.width*-0.5), top_position_height_change + total_height);
				visualizercanvasctx.arc(0, top_position_height_change + total_height, (config.width / 2), 1 * Math.PI, 0 * Math.PI, true);
				visualizercanvasctx.lineTo((config.width / 2), top_position_height_change);
				visualizercanvasctx.arc(0, top_position_height_change, (config.width / 2), 0, 1 * Math.PI, true);
			}
		}
		// Reset transform - This is slightly faster than doing save and restore
		// Need to do this before stroke and fill otherwise is effected by the translate used above
		visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
		
		if (config.outlinetype != "none"){
			visualizercanvasctx.globalAlpha = config.outlineopacity;
			visualizercanvasctx.stroke();	
		}
		if (config.filltype != "none"){
			visualizercanvasctx.globalAlpha = config.fillopacity;
			visualizercanvasctx.fill();
		}
	}
};

// Block Bars
visualizer_types.blockbars = function(visualizercanvasctx, analyser, frequencydata, frequencyspacing, maxheightadjustment){
	var left_position;
	var top_position;
	var node_frequency;
	var height_change = 0;
	var number_of_blocks;
	var top_position_height_change;
	var left_position_width_change;
	var circle_angle;
	var i;
	var i2;
	
	if (config.visualizershape == "none"){
		left_position = Math.round((config.videowidth/2) - ((((config.howmany-1)*config.spacing)/2) + ((config.howmany*config.width)/2)) + config.left);
		top_position = Math.round((config.videoheight/2) + config.top);
		visualizercanvasctx.beginPath();
		for (i=0; i < config.howmany; i++){
			if (frequencydata){
				node_frequency = (frequencyspacing*i) + config.minfrequency;
				height_change = Math.max((((frequencydata[node_frequency]*maxheightadjustment) - config.cutoff)*config.multiplier), 0);
			}
			number_of_blocks = Math.floor((height_change/(config.minheight + config.spacing2)) + 1);
			if (config.barsalignment == "bottom"){
				top_position_height_change = top_position - (number_of_blocks * config.minheight) + (config.offset * i) - (config.spacing2 * (number_of_blocks - 1));
			}
			else if (config.barsalignment == "middle"){
				top_position_height_change = top_position - (((number_of_blocks + 1) / 2) * config.minheight) + (config.minheight/2) + (config.offset * i) - ((config.spacing2/2) * (number_of_blocks - 1));
			}
			else if (config.barsalignment == "top"){
				top_position_height_change = top_position + (config.offset * i);
			}
			left_position_width_change = left_position + ((config.width + config.spacing) * i);
			for (i2=0; i2 < number_of_blocks; i2++){
				visualizercanvasctx.rect(left_position_width_change,(top_position_height_change + (config.minheight * i2) + (config.spacing2 * i2)),config.width,config.minheight);
			}
		}
		if (config.filltype != "none"){
			visualizercanvasctx.globalAlpha = config.fillopacity;
			visualizercanvasctx.fill();
		}
		if (config.outlinetype != "none"){
			visualizercanvasctx.globalAlpha = config.outlineopacity;
			visualizercanvasctx.stroke();
		}
	}
	else if (config.visualizershape == "circle"){
		circle_angle = 2*Math.PI/config.howmany ;
		left_position = Math.round((config.videowidth/2) + config.left);
		top_position = Math.round((config.videoheight/2) + config.top);
		visualizercanvasctx.translate(left_position,top_position);
		visualizercanvasctx.beginPath();
		for (i=1; i <= config.howmany; i++){
			if (frequencydata){
				node_frequency = (frequencyspacing*i) + config.minfrequency;
				height_change = Math.max((((frequencydata[node_frequency]*maxheightadjustment) - config.cutoff)*config.multiplier), 0);
			}
			number_of_blocks = Math.floor((height_change/(config.minheight + config.spacing2)) + 1);
			if (config.barsalignment == "bottom"){
				top_position_height_change = config.visualizershapesize + (config.offset * i);
			}
			else if (config.barsalignment == "middle"){
				top_position_height_change = config.visualizershapesize - (((number_of_blocks + 1) / 2) * config.minheight) + (config.minheight/2) + (config.offset * i) - ((config.spacing2/2) * (number_of_blocks - 1));
			}
			else if (config.barsalignment == "top"){
				top_position_height_change = config.visualizershapesize - (number_of_blocks * config.minheight) + (config.offset * i) - (config.spacing2 * (number_of_blocks - 1));
			}
			visualizercanvasctx.rotate(circle_angle);
			for (i2=0; i2 < number_of_blocks; i2++){
				visualizercanvasctx.rect((config.width*-0.5),(top_position_height_change + (config.minheight * i2) + (config.spacing2 * i2)),config.width,config.minheight);
			}
		}
		// Reset transform - This is slightly faster than doing save and restore
		// Need to do this before stroke and fill otherwise is effected by the translate used above
		visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
		
		if (config.filltype != "none"){
			visualizercanvasctx.globalAlpha = config.fillopacity;
			visualizercanvasctx.fill();
		}
		if (config.outlinetype != "none"){
			visualizercanvasctx.globalAlpha = config.outlineopacity;
			visualizercanvasctx.stroke();
		}
	}
};

// 3D Bars
visualizer_types.bars_3d = function(visualizercanvasctx, analyser, frequencydata, frequencyspacing, maxheightadjustment){
	var left_position;
	var top_position;
	var node_frequency;
	var height_change = 0;
	var total_height;
	var i;
	
	if (config.visualizershape == "none"){
		left_position = Math.round((config.videowidth/2) - ((((config.howmany-1)*config.spacing)/2) + ((config.howmany*config.width)/2)) + config.left);
		top_position = Math.round((config.videoheight/2) + config.top);
		// This is used to fix some jagged/pointy outlines on corners.
		visualizercanvasctx.lineJoin="bevel";
		for (i=0; i < config.howmany; i++){
			if (frequencydata){
				node_frequency = (frequencyspacing*i) + config.minfrequency;
				height_change = Math.max((((frequencydata[node_frequency]*maxheightadjustment) - config.cutoff)*config.multiplier), 0);
			}
			total_height = config.minheight + height_change;
			
			visualizercanvasctx.beginPath();
			
			visualizercanvasctx.moveTo(left_position,top_position);
			visualizercanvasctx.lineTo((left_position + config.width),(top_position + (config.width / config.angle)));
			visualizercanvasctx.lineTo((left_position + config.width),(top_position - total_height + (config.width / config.angle)));
			visualizercanvasctx.lineTo(left_position,(top_position - total_height));
			visualizercanvasctx.lineTo(left_position,top_position);
			visualizercanvasctx.closePath();

			visualizercanvasctx.moveTo(left_position,(top_position - total_height));
			visualizercanvasctx.lineTo((left_position + (config.depth/config.angle)),(top_position - total_height - config.depth));
			visualizercanvasctx.lineTo((left_position + (config.depth/config.angle) + config.width),(top_position - total_height - config.depth + (config.width / config.angle)));
			visualizercanvasctx.lineTo((left_position + config.width),(top_position - total_height + (config.width / config.angle)));

			visualizercanvasctx.moveTo((left_position + (config.depth/config.angle) + config.width),(top_position - total_height - config.depth + (config.width / config.angle)));
			visualizercanvasctx.lineTo((left_position + (config.depth/config.angle) + config.width),(top_position - config.depth + (config.width / config.angle)));
			visualizercanvasctx.lineTo((left_position + config.width),(top_position + (config.width / config.angle)));
			visualizercanvasctx.lineTo((left_position + config.width),(top_position - total_height + (config.width / config.angle)));
			visualizercanvasctx.lineTo((left_position + (config.depth/config.angle) + config.width),(top_position - total_height - config.depth + (config.width / config.angle)));
			visualizercanvasctx.closePath();

			if (config.filltype != "none"){
				visualizercanvasctx.globalAlpha = config.fillopacity;
				visualizercanvasctx.fill();
			}
			if (config.outlinetype != "none"){
				visualizercanvasctx.globalAlpha = config.outlineopacity;
				visualizercanvasctx.stroke();
			}

			left_position = left_position + (config.width + config.spacing);
			top_position = top_position + config.offset;
		}
	}	
};

// Stretchy Circle
visualizer_types.stretchy_circle = function(visualizercanvasctx, analyser, frequencydata, frequencyspacing, maxheightadjustment){
	var angle_spacing = 360/config.howmany;
	var radius = config.width/2;
	var left_position = Math.round((config.videowidth/2) + config.left);
	var top_position = Math.round((config.videoheight/2) + config.top);
	var node_frequency;
	var height_change = 0;
	var next_point_x;
	var next_point_y;
	var curve_point_x;
	var curve_point_y;
	var i;
	
	visualizercanvasctx.beginPath();
	visualizercanvasctx.moveTo((left_position+radius),top_position);
	for (i=1; i <= config.howmany; i++){
		if (frequencydata){
			node_frequency = (frequencyspacing*i) + config.minfrequency;
			height_change = Math.max((((frequencydata[node_frequency]*maxheightadjustment) - config.cutoff)*config.multiplier), 0);
		}
		next_point_x = (radius * Math.cos(angle_spacing* i * (Math.PI / 180))) + left_position;
		next_point_y = (radius * Math.sin(angle_spacing* i * (Math.PI / 180))) + top_position;
		curve_point_x = (((radius + config.minheight) + height_change) * Math.cos(((angle_spacing*i) - (angle_spacing/2)) * (Math.PI / 180))) + left_position;
		curve_point_y = (((radius + config.minheight) + height_change) * Math.sin(((angle_spacing*i) - (angle_spacing/2)) * (Math.PI / 180))) + top_position;
		visualizercanvasctx.quadraticCurveTo(curve_point_x,curve_point_y,next_point_x,next_point_y);
	}
	visualizercanvasctx.closePath();
	if (config.outlinetype != "none"){
		visualizercanvasctx.globalAlpha = config.outlineopacity;
		visualizercanvasctx.stroke();	
	}
	if (config.filltype != "none"){
		visualizercanvasctx.globalAlpha = config.fillopacity;
		visualizercanvasctx.fill();
	}
};

// Time Domain Squares
visualizer_types.time_domain_squares = function(visualizercanvasctx, analyser, frequencydata, maxheightadjustment){
	var left_position = Math.round((config.videowidth/2) - (config.width/2) + config.left);
	var top_position = Math.round((config.videoheight/2) + config.top - (config.minheight/2));
	var number_of_nodes;
	var node_width;
	var height_change = 0;
	var circle_angle;
	var seamless_change;
	var i;
	
	if (frequencydata){
		number_of_nodes = frequencydata.length;
	}
	else {
		number_of_nodes = 256;	
	}
	if (config.visualizershape == "none"){
		node_width = config.width/number_of_nodes;
		visualizercanvasctx.beginPath();
		for (i=0; i <= number_of_nodes; i++){
			if (frequencydata){
				height_change = (frequencydata[i] * maxheightadjustment) - (maxheightadjustment * 128);
			}
			visualizercanvasctx.rect(((node_width * i) + left_position), (top_position + height_change), Math.ceil(node_width), config.minheight);	
		}
		if (config.outlinetype != "none"){
			visualizercanvasctx.globalAlpha = config.outlineopacity;
			visualizercanvasctx.stroke();	
		}
		if (config.filltype != "none"){
			visualizercanvasctx.globalAlpha = config.fillopacity;
			visualizercanvasctx.fill();
		}
	}
	else if (config.visualizershape == "circle"){
		node_width = (2 * Math.PI * config.visualizershapesize)/number_of_nodes;
		visualizercanvasctx.beginPath();
		circle_angle = 2*Math.PI/number_of_nodes;
		left_position = Math.round((config.videowidth/2) + config.left);
		top_position = Math.round((config.videoheight/2) + config.top);
		if (frequencydata){
			seamless_change = ((frequencydata[0] * maxheightadjustment) - (frequencydata[255] * maxheightadjustment)) / number_of_nodes;
		}
		visualizercanvasctx.translate(left_position,top_position);
		for (i=0; i <= number_of_nodes; i++){
			if (frequencydata){
				height_change = (frequencydata[i] * maxheightadjustment) - (maxheightadjustment * 128) + (seamless_change * i);
			}
			visualizercanvasctx.rotate(circle_angle);
			visualizercanvasctx.rect((node_width*-0.5), (config.visualizershapesize + height_change), Math.ceil(node_width), config.minheight);
		}
		// Reset transform - This is slightly faster than doing save and restore
		// Need to do this before stroke and fill otherwise is effected by the translate used above
		visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
		
		if (config.outlinetype != "none"){
			visualizercanvasctx.globalAlpha = config.outlineopacity;
			visualizercanvasctx.stroke();	
		}
		if (config.filltype != "none"){
			visualizercanvasctx.globalAlpha = config.fillopacity;
			visualizercanvasctx.fill();
		}
	}
};

// Time Domain Line
visualizer_types.time_domain_line = function(visualizercanvasctx, analyser, frequencydata, maxheightadjustment){
	var left_position = Math.round((config.videowidth/2) - (config.width/2) + config.left);
	var top_position = Math.round((config.videoheight/2) + config.top);
	var number_of_nodes;
	var node_width;
	var height_change = 0;
	var circle_angle;
	var seamless_change;
	var i;
	
	if (frequencydata){
		number_of_nodes = frequencydata.length;
	}
	else {
		number_of_nodes = 256;	
	}
	node_width = config.width/number_of_nodes;
	// Draw Time Domain
	if (config.visualizershape == "none"){
		visualizercanvasctx.beginPath();
		for (i=0; i <= number_of_nodes; i++){
			if (frequencydata){
				height_change = (frequencydata[i] * maxheightadjustment) - (maxheightadjustment * 128);
			}
			visualizercanvasctx.lineTo(Math.ceil(left_position + (node_width * i)),(top_position + height_change));
		}
		// Does the stroke first for the outline effect and then another stroke to act as the main color
		if (config.outlinetype != "none"){
			visualizercanvasctx.globalAlpha = config.outlineopacity;
			visualizercanvasctx.lineWidth = config.minheight + config.outlinewidth;
			visualizercanvasctx.stroke();	
		}
		if (config.filltype != "none"){
			visualizercanvasctx.globalAlpha = config.fillopacity;
			visualizercanvasctx.lineWidth = config.minheight;
			visualizercanvasctx.strokeStyle = visualizercanvasctx.fillStyle;
			visualizercanvasctx.stroke();
		}
	}
	else if (config.visualizershape == "circle"){
		circle_angle = 2*Math.PI/number_of_nodes;
		left_position = Math.round((config.videowidth/2) + config.left);
		top_position = Math.round((config.videoheight/2) + config.top);
		// This is used to move each point slightly so the start and end point seamlessly line up on the circle
		if (frequencydata){
			seamless_change = ((frequencydata[0] * maxheightadjustment) - (frequencydata[255] * maxheightadjustment)) / number_of_nodes;
		}
		visualizercanvasctx.translate(left_position,top_position);
		visualizercanvasctx.beginPath();
		for (i=0; i <= number_of_nodes; i++){
			if (frequencydata){
				height_change = (frequencydata[i] * maxheightadjustment) - (maxheightadjustment * 128) + (seamless_change * i);
			}
			visualizercanvasctx.lineTo(0, (config.visualizershapesize + height_change));
			visualizercanvasctx.rotate(circle_angle);
		}
		visualizercanvasctx.closePath();
		// Reset transform - This is slightly faster than doing save and restore
		// Need to do this before stroke and fill otherwise is effected by the translate used above
		visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
		
		// Does the stroke first for the outline effect and then another stroke to act as the main color
		if (config.outlinetype != "none"){
			visualizercanvasctx.globalAlpha = config.outlineopacity;
			visualizercanvasctx.lineWidth = config.minheight + config.outlinewidth;
			visualizercanvasctx.stroke();	
		}
		if (config.filltype != "none"){
			visualizercanvasctx.globalAlpha = config.fillopacity;
			visualizercanvasctx.lineWidth = config.minheight;
			visualizercanvasctx.strokeStyle = visualizercanvasctx.fillStyle;
			visualizercanvasctx.stroke();
		}
	}
};

// Spinning Triangles
visualizer_types.spinning_triangles = function(visualizercanvasctx, analyser, frequencydata, frequencyspacing, maxheightadjustment, spinningtrianglesvars){
	var left_position = Math.round((config.videowidth/2) + config.left);
	var top_position = Math.round((config.videoheight/2) + config.top);
	var twopi = 2 * Math.PI;
	var angle_gap = twopi / 3;
	var angle_to_radian = Math.PI / 180;
	var new_min_rotation_speed = config.minrotationspeed * angle_to_radian;
	var new_max_rotation_speed = config.maxrotationspeed * angle_to_radian;
	var angle = config.angle * angle_to_radian;
	var total_frequency_change = 0;
	var node_frequency;
	var height_change = 0;
	var total_height;
	var outlinestyle = visualizercanvasctx.strokeStyle;
	var fillstyle = visualizercanvasctx.fillStyle;
	spinningtrianglesvars = spinningtrianglesvars ? spinningtrianglesvars : {anglestart:0};
	var triangle_angle = spinningtrianglesvars.anglestart;
	
	if (config.compositemode != "none"){
		visualizercanvasctx.globalCompositeOperation = config.compositemode;
	}
	for (var i=0; i < config.howmany; i++){
		if (frequencydata){
			node_frequency = (frequencyspacing*i) + config.minfrequency;
			height_change = Math.max((((frequencydata[node_frequency]*maxheightadjustment) - config.cutoff)*config.multiplier), 0);
		}
		total_height = config.minheight + height_change;
		triangle_angle = triangle_angle + angle;
		visualizercanvasctx.beginPath();
		visualizercanvasctx.moveTo(left_position + total_height * Math.sin(triangle_angle), top_position + total_height * Math.cos(triangle_angle));
		visualizercanvasctx.lineTo(left_position + total_height * Math.sin(triangle_angle + angle_gap), top_position + total_height * Math.cos(triangle_angle + angle_gap));
		visualizercanvasctx.lineTo(left_position + total_height * Math.sin(triangle_angle + angle_gap * 2), top_position + total_height * Math.cos(triangle_angle + angle_gap * 2));
		visualizercanvasctx.closePath();
		total_frequency_change = total_frequency_change + height_change;
		if (config.outlinetype != "none"){
			visualizercanvasctx.globalAlpha = config.outlineopacity;
			visualizercanvasctx.lineWidth = config.outlinewidth + config.width;
			visualizercanvasctx.strokeStyle = outlinestyle;
			visualizercanvasctx.stroke();
		}
		if (config.filltype != "none"){
			visualizercanvasctx.globalAlpha = config.fillopacity;
			visualizercanvasctx.lineWidth = config.width;
			visualizercanvasctx.strokeStyle = fillstyle;
			visualizercanvasctx.stroke();
		}
	}
	if (config.compositemode != "none"){
		visualizercanvasctx.globalCompositeOperation = "source-over";
	}
	spinningtrianglesvars.anglestart = (spinningtrianglesvars.anglestart + (new_min_rotation_speed / 100) + ((new_max_rotation_speed / 10000) * (total_frequency_change / (config.howmany * maxheightadjustment)))) % twopi;
	if (frequencydata){
		return spinningtrianglesvars;
	}
};

// Bubbles
visualizer_types.bubbles = function(visualizercanvasctx, analyser, frequencydata, frequencyspacing, maxheightadjustment){
	var left_position = Math.round((config.videowidth/2) + config.left);
	var top_position = Math.round((config.videoheight/2) + config.top);
	var angle = 4.1*Math.PI/config.howmany;
	var node_frequency;
	var height_change = config.minheight;
	var height_change2 = config.minheight;
	var i;
	
	visualizercanvasctx.translate(left_position,top_position);
	visualizercanvasctx.beginPath();
	for (i=0; i < config.howmany; i++){
		if (frequencydata){
			node_frequency = (frequencyspacing*i) + config.minfrequency;
			height_change = Math.max((((frequencydata[node_frequency]*maxheightadjustment) - config.cutoff)*config.multiplier), 0);
			height_change2 = Math.max((((frequencydata[node_frequency+5]*maxheightadjustment) - config.cutoff)*config.multiplier), 0);
			height_change += config.minheight;
			height_change2 += config.minheight;
		}
		visualizercanvasctx.moveTo(height_change+config.width+(height_change/2),height_change2);
        visualizercanvasctx.arc(height_change,height_change2,config.width+(height_change/2),0,2*Math.PI);
		visualizercanvasctx.rotate(angle);
	}
	
	// Reset transform - This is slightly faster than doing save and restore
	// Need to do this before stroke and fill otherwise is effected by the translate used above
	visualizercanvasctx.setTransform(1, 0, 0, 1, 0, 0);
	
	if (config.outlinetype != "none"){
		visualizercanvasctx.globalAlpha = config.outlineopacity;
		visualizercanvasctx.stroke();	
	}
	if (config.filltype != "none"){
		visualizercanvasctx.globalAlpha = config.fillopacity;
		visualizercanvasctx.fill();
	}
};

// InternetGB
visualizer_types.internetgb = function(visualizercanvasctx, analyser, frequencydata, frequencyspacing, maxheightadjustment, internetgbvars){
	var left_position = Math.round((config.videowidth/2) + config.left);
	var top_position = Math.round((config.videoheight/2) + config.top);
	var react_x = 0;
	var react_y = 0;
	var rads = 2*Math.PI / config.howmany;
	var new_min_rotation_speed = config.minrotationspeed * (Math.PI / 180) * 0.01;
	var new_max_rotation_speed = config.maxrotationspeed * (Math.PI / 180) * 0.01;
	var node_frequency;
	var height_change = 0;
	var bar_width;
	var bar_x_term;
	var bar_y_term;
	var delta_rad;
	var i;
	var outlinestyle = visualizercanvasctx.strokeStyle;
	var fillstyle = visualizercanvasctx.fillStyle;
	internetgbvars = internetgbvars ? internetgbvars : {shockwave:0, rot:0, intensity:0, center_x:left_position, center_y:top_position, radius:config.minheight};
	var radius_old = internetgbvars.radius;
	
	if (frequencydata && config.maxrotationspeed != 0){
		internetgbvars.rot = internetgbvars.rot + new_min_rotation_speed + (new_max_rotation_speed * ((internetgbvars.intensity / config.howmany) / (256 * maxheightadjustment)));
	}
	internetgbvars.intensity = 0;
	visualizercanvasctx.beginPath();
	visualizercanvasctx.lineCap = config.linecap;
	for (i = 0; i < config.howmany; i++){
		if (frequencydata){
			node_frequency = (frequencyspacing*i) + config.minfrequency;
			height_change = Math.max((((frequencydata[node_frequency]*maxheightadjustment) - config.cutoff)*config.multiplier), 0) / 2;
		}
		bar_width = height_change * 0.04;
						
		bar_x_term = internetgbvars.center_x + Math.cos(rads * i + internetgbvars.rot) * (internetgbvars.radius + height_change - 3);
		bar_y_term = internetgbvars.center_y + Math.sin(rads * i + internetgbvars.rot) * (internetgbvars.radius + height_change - 3);

		visualizercanvasctx.moveTo(internetgbvars.center_x, internetgbvars.center_y);
		visualizercanvasctx.lineTo(bar_x_term, bar_y_term);
					
		react_x += Math.cos(rads * i + internetgbvars.rot) * (internetgbvars.radius + height_change);
		react_y += Math.sin(rads * i + internetgbvars.rot) * (internetgbvars.radius + height_change);
		
		internetgbvars.intensity += height_change;
		
	}
	// Fill and outline the bars
	if (config.outlinetype != "none"){
		visualizercanvasctx.globalAlpha = config.outlineopacity;
		visualizercanvasctx.lineWidth = config.outlinewidth + config.width;
		visualizercanvasctx.strokeStyle = outlinestyle;
		visualizercanvasctx.stroke();	
	}
	if (config.filltype != "none"){
		visualizercanvasctx.globalAlpha = config.fillopacity;
		visualizercanvasctx.lineWidth = config.width;
		visualizercanvasctx.strokeStyle = fillstyle;
		visualizercanvasctx.stroke();
	}
	
	internetgbvars.center_x = config.videowidth / 2 - (react_x / config.howmany) * 4;
	internetgbvars.center_y = config.videoheight / 2 - (react_y / config.howmany) * 4;		
	internetgbvars.radius =  config.minheight + (internetgbvars.intensity / (config.howmany * 2));
	delta_rad = internetgbvars.radius / radius_old;
	
	visualizercanvasctx.beginPath();
	visualizercanvasctx.arc(internetgbvars.center_x, internetgbvars.center_y, internetgbvars.radius, 0, Math.PI * 2, false);
	
	// Fill and outline the circle
	if (config.outlinetype != "none"){
		visualizercanvasctx.globalAlpha = config.outlineopacity;
		visualizercanvasctx.lineWidth = config.outlinewidth;
		visualizercanvasctx.strokeStyle = outlinestyle;
		visualizercanvasctx.stroke();	
	}
	if (config.filltype != "none"){
		visualizercanvasctx.globalAlpha = config.fillopacity;
		visualizercanvasctx.fill();
	}
	
	// Shockwave
	if (delta_rad > 1.2 && internetgbvars.shockwave == 0){
		internetgbvars.shockwave = 1;
	}
	
	if (internetgbvars.shockwave != 0){
		internetgbvars.shockwave += (config.videowidth/640) * 10;	
		visualizercanvasctx.beginPath();
		visualizercanvasctx.arc(internetgbvars.center_x, internetgbvars.center_y, internetgbvars.shockwave + internetgbvars.radius, 0, Math.PI * 2, false);
		if (config.outlinetype != "none"){
			visualizercanvasctx.globalAlpha = config.outlineopacity;
			visualizercanvasctx.lineWidth = config.outlinewidth + (config.videowidth/640) * 15;
			visualizercanvasctx.strokeStyle = outlinestyle;
			visualizercanvasctx.stroke();	
		}
		if (config.filltype != "none"){
			visualizercanvasctx.globalAlpha = config.fillopacity;
			visualizercanvasctx.lineWidth = (config.videowidth/640) * 15;
			visualizercanvasctx.strokeStyle = fillstyle;
			visualizercanvasctx.stroke();
		}
		if ((internetgbvars.shockwave > (config.videowidth + 50)) && (internetgbvars.shockwave > (config.videoheight + 50))){
			internetgbvars.shockwave = 0;
		}
	}
	
	if (frequencydata){
		return internetgbvars;
	}
};
