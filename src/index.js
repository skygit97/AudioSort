window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const WIDTH = canvas.width;
	const HEIGHT = canvas.height;
	const canvasCtx = canvas.getContext("2d");

	const audio = document.getElementById("audio");
	audio.src = "../dist/assets/songs/Said The Sky - Show & Tell.mp3";
	const audioCtx = new (AudioContext || webkitAudioContext)();
	const analyser = audioCtx.createAnalyser();

	const source = audioCtx.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(audioCtx.destination);

	analyser.fftSize = 256;
	const bufferLength = analyser.frequencyBinCount;
	console.log(bufferLength);
	const dataArray = new Uint8Array(bufferLength);

	analyser.getByteTimeDomainData(dataArray);

	canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

	audio.play();
	function animate() {
		requestAnimationFrame(animate);
		analyser.getByteFrequencyData(dataArray);

		canvasCtx.fillStyle = "rgb(0, 0, 0)";
		canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

		let barWidth = (WIDTH / bufferLength) ;

		let x = 0;
		for (let i = 0; i < bufferLength; i++) {
			let barHeight = dataArray[i] / 1.5;

			const gradient = canvasCtx.createLinearGradient(0, 0, WIDTH, 0);
			gradient.addColorStop(0, "red");
			gradient.addColorStop(0.25, "orange");
			gradient.addColorStop(0.3, "yellow");
			gradient.addColorStop(0.5, "green");
			gradient.addColorStop(0.75, "blue");
			gradient.addColorStop(0.9, "purple");
			// gradient.addColorStop(0.75, "purple");
			gradient.addColorStop(1, "red");
			canvasCtx.fillStyle = gradient;

			// canvasCtx.fillStyle = gradient
			// canvasCtx.fillStyle = "rgb(" + 450 + "," + 255 + "," + 128 + ")";
			canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

			// canvasCtx.fillStyle = gradient;

			// canvasCtx.fillStyle = "rgb(" + (barHeight + 10) + ",30,50)";
			// canvasCtx.fillRect(x, HEIGHT - barHeight / 1.5, barWidth, barHeight);

			x += barWidth + 1;
		}
	}

	animate();
});
