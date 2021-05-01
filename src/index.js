import VisualizerSample from "./components/audi_analyser";

window.addEventListener("load", () => {
	const topCanvas = document.getElementById("top-canvas");
	const bottomCanvas = document.getElementById("bottom-canvas");
	const audio = document.getElementById("audio");

	const topCanvasCtx = topCanvas.getContext("2d");
	const bottomCanvasCtx = bottomCanvas.getContext("2d");

	const WIDTH = topCanvas.width;
	const HEIGHT = bottomCanvas.height;
	const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	const analyser = audioCtx.createAnalyser();
	const source = audioCtx.createMediaElementSource(audio);

	source.connect(analyser);
	analyser.connect(audioCtx.destination);
	analyser.fftSize = 128;
	const bufferLength = analyser.frequencyBinCount;

	const dataArray = new Uint8Array(bufferLength);

	analyser.getByteTimeDomainData(dataArray);

	let barHeight;
	let x = 0;

	let animateID;
	const draw = () => {
		animateID = requestAnimationFrame(draw);
		analyser.getByteFrequencyData(dataArray);

		topCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
		bottomCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

		topCanvasCtx.fillStyle = "rgb(0, 0, 0)";
		bottomCanvasCtx.fillStyle = "rgb(0, 0, 0)";

		topCanvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
		bottomCanvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

		let barWidth = WIDTH / bufferLength;
		x = 0;

		for (let i = 0; i < bufferLength; i++) {
			barHeight = dataArray[i];
			let y = HEIGHT - barHeight / 2;

			const gradient =
				topCanvasCtx.createLinearGradient(0, 0, WIDTH, 0) &&
				bottomCanvasCtx.createLinearGradient(0, 0, WIDTH, 0);
			gradient.addColorStop(0, "red");
			gradient.addColorStop(0.16, "orange");
			gradient.addColorStop(0.32, "yellow");
			gradient.addColorStop(0.48, "green");
			gradient.addColorStop(0.64, "blue");
			gradient.addColorStop(0.8, "purple");
			gradient.addColorStop(1, "red");

			topCanvasCtx.fillStyle = gradient;
			bottomCanvasCtx.fillStyle = gradient;

			topCanvasCtx.fillRect(x, y, barWidth, barHeight / 2);
			bottomCanvasCtx.fillRect(x, 0, barWidth, barHeight / 2);

			x += barWidth + 2.5;
		}
	};
	draw();

	function bubbleSort(arr) {
		function sort() {
			let virtualArr = [arr.slice()];
			for (var i = 0; i < arr.length; i++) {
				var done = true;
				for (var j = 0; j < max - i; j++) {
					if (arr[j] > arr[j + 1]) {
						var temp = arr[j];
						arr[j] = arr[j + 1];
						arr[j + 1] = temp;
						done = false;
						virtualArr.push(arr.slice());
					}
				}
				if (done) {
					break;
				}
			}
			return virtualArr;
		}

		function darw(dataArray) {
			topCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

			topCanvasCtx.fillStyle = "rgb(0, 0, 0)";

			topCanvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

			let barWidth = WIDTH / bufferLength;
			let x = 0;

			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i];
				let y = HEIGHT - barHeight / 2;

				const gradient = topCanvasCtx.createLinearGradient(0, 0, WIDTH, 0);
				gradient.addColorStop(0, "red");
				gradient.addColorStop(0.16, "orange");
				gradient.addColorStop(0.32, "yellow");
				gradient.addColorStop(0.48, "green");
				gradient.addColorStop(0.64, "blue");
				gradient.addColorStop(0.8, "purple");
				gradient.addColorStop(1, "red");

				topCanvasCtx.fillStyle = gradient;

				topCanvasCtx.fillRect(x, y, barWidth, barHeight / 2);

				x += barWidth;
			}
		}

		// animation
		function animation() {
			// Call the sort method to return an array containing the contents of each step
			var virtualArr = sort();
			var interval = 2000;
			// Traverse the resulting array, and call the darw method every 500ms to draw a step
			virtualArr.forEach((item) => {
				setTimeout(() => darw(item), interval);
			});
		}

		animation();
	}
	audio.addEventListener("pause", () => {
		cancelAnimationFrame(animateID);
		bubbleSort(dataArray);
	});
});
