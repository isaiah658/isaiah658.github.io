// Initially called when the page first loads
// It checks the browser for supported MediaRecorder video types
function initialize(){
	var video_format = document.getElementById("videofileformat");
	var format_options;
	if (!MediaRecorder){
		alert('Your web browser does not appear to support "MediaRecorder". You will be unable to record without it and this web page will most likely not load properly. Please try using Chrome/Chromium version 53 and higher or Firefox version 48 and higher.');	
	}
	if (MediaRecorder.isTypeSupported("video/webm")){
		format_options = document.createElement('option');
		format_options.appendChild( document.createTextNode("WebM") );
		format_options.value = "video/webm";
		video_format.appendChild(format_options); 
	}
	if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")){
		format_options = document.createElement('option');
		format_options.appendChild( document.createTextNode("WebM VP9") );
		format_options.value = "video/webm; codecs=vp9";
		video_format.appendChild(format_options); 
	}
	if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")){
		format_options = document.createElement('option');
		format_options.appendChild( document.createTextNode("WebM VP8") );
		format_options.value = "video/webm;codecs=vp8";
		video_format.appendChild(format_options); 
	}
	if (MediaRecorder.isTypeSupported("video/webm;codecs=h264")){
		format_options = document.createElement('option');
		format_options.appendChild( document.createTextNode("WebM H264") );
		format_options.value = "video/webm;codecs=h264";
		video_format.appendChild(format_options); 
	}
	if (MediaRecorder.isTypeSupported("video/webm;codecs=avc1")){
		format_options = document.createElement('option');
		format_options.appendChild( document.createTextNode("WebM AVC1") );
		format_options.value = "video/webm;codecs=avc1";
		video_format.appendChild(format_options); 
	}
	if (!video_format.value){
		alert('Your web browser does not appear to support any video formats for recording or does not support "MediaRecorder" altogether. You will be unable to record without it. Please try using Chrome/Chromium version 53 and higher or Firefox version 48 and higher.');	
	}
	sidebar.hide_unused_options();
}
