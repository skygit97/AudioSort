// export default function AudioVisualiser() {
	
// 	const WIDTH = topCanvas.width;
// 	const HEIGHT = bottomCanvas.height;
// 	const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// 	const analyser = audioCtx.createAnalyser();
// 	const source = audioCtx.createMediaElementSource(audio);

// 	source.connect(analyser);
// 	analyser.connect(audioCtx.destination);
// 	analyser.fftSize = 256;
// 	const bufferLength = analyser.frequencyBinCount;

// 	const dataArray = new Uint8Array(bufferLength);

// 	analyser.getByteTimeDomainData(dataArray);

// 	let barHeight;
// 	let x = 0;

// 	const draw = () => {
// 		requestAnimationFrame(draw);
// 		analyser.getByteFrequencyData(dataArray);

// 		topCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
// 		bottomCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

// 		topCanvasCtx.fillStyle = "rgb(0, 0, 0)";
// 		bottomCanvasCtx.fillStyle = "rgb(0, 0, 0)";

// 		topCanvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
// 		bottomCanvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

// 		let barWidth = WIDTH / bufferLength;
// 		x = 0;

// 		for (let i = 0; i < bufferLength; i++) {
// 			barHeight = dataArray[i] / 1.5;
// 			let y = HEIGHT - barHeight / 2;

// 			const gradient =
// 				topCanvasCtx.createLinearGradient(0, 0, WIDTH, 0) &&
// 				bottomCanvasCtx.createLinearGradient(0, 0, WIDTH, 0);
// 			gradient.addColorStop(0, "red");
// 			gradient.addColorStop(0.16, "orange");
// 			gradient.addColorStop(0.32, "yellow");
// 			gradient.addColorStop(0.48, "green");
// 			gradient.addColorStop(0.64, "blue");
// 			gradient.addColorStop(0.8, "purple");
// 			gradient.addColorStop(1, "red");

// 			topCanvasCtx.fillStyle = gradient;
// 			bottomCanvasCtx.fillStyle = gradient;

// 			topCanvasCtx.fillRect(x, y, barWidth, barHeight / 2);
// 			bottomCanvasCtx.fillRect(x, 0, barWidth, barHeight / 2);

// 			x += barWidth + 1.5;
// 		}
// 	};
// 	draw();
// }
