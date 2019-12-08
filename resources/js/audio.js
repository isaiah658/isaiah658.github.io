// This file contains the JavaScript for playing the audio, analyzing it for the visualizer, etc
// Changes had to be made to this for CORS and the new Chrome autoplay policies hence not defining the audio context until later

var audio = {};

audio.player = new Audio();
audio.player.crossOrigin = "anonymous";
audio.ctx = null;
audio.source = null;
audio.ctxmediastream = null;
audio.analyzer = null;
audio.frequency_data = null;
audio.frequency_spacing = null;
audio.stream = null;
audio.mixed_stream = null;

// Create audio context, audio source, and audio context media stream if they haven't been created yet
// Creating it this way is required due to Chrome autoplay policy changes
audio.set_up_analyzer = function(recording){
	if (audio.ctx === null){
		audio.ctx = new AudioContext();
	}
	if (audio.source === null){
		audio.source = audio.ctx.createMediaElementSource(audio.player);
	}
	if (audio.ctxmediastream === null){
		audio.ctxmediastream = audio.ctx.createMediaStreamDestination();
	}

	// Audio analyzer frequency data and other audio settings
	audio.analyzer = audio.ctx.createAnalyser();
	audio.analyzer.fftSize = 512;
	audio.source.connect(audio.analyzer);
	if (!recording){
		audio.source.connect(audio.ctx.destination);
	}
	audio.frequency_data = new Uint8Array(audio.analyzer.frequencyBinCount);
	audio.frequency_spacing = Math.round((config.maxfrequency - config.minfrequency) / (config.howmany + 1));
	
	audio.create_event_listeners(recording);
};

audio.player_ended = function(){
	audio.player.pause();
	audio.player.currentTime = 0;
};

audio.player_seekbar_update = function(){
	document.getElementById("visualizer_seekbar").value = (100 / audio.player.duration) * audio.player.currentTime;
};

audio.player_percentage_update = function(){
	document.getElementById("recording_percentage").innerHTML = Math.ceil((100 / audio.player.duration) * audio.player.currentTime) + "%";
};

audio.create_event_listeners = function(recording){
	audio.player.addEventListener("ended", audio.player_ended);
	if (!recording){
		audio.player.addEventListener("timeupdate", audio.player_seekbar_update);
	}
	else {
		audio.player.addEventListener("timeupdate", audio.player_percentage_update);
	}
};

audio.remove_event_listeners = function(recording){
	audio.player.removeEventListener("ended", audio.player_ended);
	if (!recording){
		audio.player.removeEventListener("timeupdate", audio.player_seekbar_update);
	}
	else {
		audio.player.removeEventListener("timeupdate", audio.player_percentage_update);
	}
};
