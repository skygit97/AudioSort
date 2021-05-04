
export const AudioVisualise = () => {
	const canvas = document.getElementById("canvas");
	const canvasCtx = canvas.getContext("2d");

	// increase canvas resolution
	// canvas.width = canvas.clientWidth * 2;
	// canvas.height = canvas.clientHeight * 2;
	const WIDTH = canvas.width;
	const HEIGHT = canvas.height;

	// create canvas gradient
	const gradient = canvasCtx.createLinearGradient(0, 0, WIDTH, 0);
	gradient.addColorStop(0, "red");
	gradient.addColorStop(0.16, "orange");
	gradient.addColorStop(0.32, "yellow");
	gradient.addColorStop(0.48, "green");
	gradient.addColorStop(0.64, "blue");
	gradient.addColorStop(0.8, "purple");
	gradient.addColorStop(1, "red");

	// create canvas mid line
	canvasCtx.beginPath();
	canvasCtx.setLineDash([10]);
	canvasCtx.moveTo(0, HEIGHT / 2);
	canvasCtx.lineTo(WIDTH, HEIGHT / 2);
	canvasCtx.lineWidth = 4;
	canvasCtx.strokeStyle = gradient;
	canvasCtx.stroke();

	// create audio analyser node
	const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	const analyser = audioCtx.createAnalyser();

	// connect node to audio source
	const audio = document.getElementById("audio");
	const source = audioCtx.createMediaElementSource(audio);
	source.connect(analyser);
	source.connect(audioCtx.destination);

	// caputure audio data
	analyser.fftSize = 128;
	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);

	let animateID;

	const draw = () => {
		animateID = requestAnimationFrame(draw);
		analyser.getByteFrequencyData(dataArray);

		canvasCtx.clearRect(0, 0, WIDTH, HEIGHT / 2 - 4);
		canvasCtx.clearRect(0, 4 + HEIGHT / 2, WIDTH, HEIGHT / 2);

		let barWidth = WIDTH / bufferLength;
		let x = 0;
		for (let i = 0; i < bufferLength; i++) {
			let barHeight = dataArray[i];
			let y1 = HEIGHT / 2 - barHeight - 10;
			let y2 = (HEIGHT - 2) / 2 + 12;

			canvasCtx.fillStyle = gradient;

			canvasCtx.fillRect(x, y1, barWidth, barHeight);
			canvasCtx.fillRect(x, y2, barWidth, barHeight);
			x += barWidth + 10;
		}
	};
	draw();
};
