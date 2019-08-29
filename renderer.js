// In the renderer process.
const { desktopCapturer } = require('electron');

desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
	for (const source of sources) {
		console.log(sources);
		if (source.name === 'Entire screen') {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: false,
					video: {
						mandatory: {
							chromeMediaSource: 'desktop',
							chromeMediaSourceId: source.id,
							minWidth: 1280,
							maxWidth: 1280,
							minHeight: 720,
							maxHeight: 720,
						},
					},
				});
				handleStream(stream);
				console.log(stream);
			} catch (e) {
				handleError(e);
			}
			return;
		}
	}
});

function handleStream(stream) {
	const video = document.querySelector('video');
	video.srcObject = stream;
	video.onloadedmetadata = e => video.play();
}

function handleError(e) {
	console.log(e);
}
