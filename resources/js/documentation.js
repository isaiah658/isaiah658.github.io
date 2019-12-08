// This file contains all the JavaScript related to controlling the documention buttons and pages

var documentation = {};

documentation.reset_buttons = function(){
	document.getElementById("visualizer").style.display = "none";
	document.getElementById("documentation").style.display = "none";
	document.getElementById("opendocumentationbutton").style.display = "none";
	document.getElementById("closedocumentationbutton").style.display = "none";
};

documentation.reset_pages = function(){
	document.getElementById("documentation_options").style.display = "none";
	document.getElementById("documentation_visualizers").style.display = "none";
	document.getElementById("documentation_limitations").style.display = "none";
	document.getElementById("faq").style.display = "none";
	document.getElementById("credits").style.display = "none";
};

documentation.show = function(){
	documentation.reset_buttons();
	document.getElementById("documentation").style.display = "block";
	document.getElementById("closedocumentationbutton").style.display = "block";
};

documentation.hide = function(){
	documentation.reset_buttons();
	document.getElementById("opendocumentationbutton").style.display = "block";
	document.getElementById("visualizer").style.display = "block";
};

documentation.options = function(){
	documentation.reset_pages();
	document.getElementById("documentation_options").style.display = "block";
};

documentation.visualizers = function(){
	documentation.reset_pages();
	document.getElementById("documentation_visualizers").style.display = "block";
};

documentation.limitations = function(){
	documentation.reset_pages();
	document.getElementById("documentation_limitations").style.display = "block";
};

documentation.faq = function(){
	documentation.reset_pages();
	document.getElementById("faq").style.display = "block";
};

documentation.credits = function(){
	documentation.reset_pages();
	document.getElementById("credits").style.display = "block";
};
