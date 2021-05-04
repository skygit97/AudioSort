let audioCtx;

if (!audioCtx) {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

let audio = new Audio();
audio.src = "../dist/assets/songs/Cybergirlfriend - Every Little Thing.mp3";

const topCanvas = document.getElementById("top-canvas");
const topCanvasCtx = topCanvas.getContext("2d");

const bottomCanvas = document.getElementById("bottom-canvas");
const bottomCanvasCtx = bottomCanvas.getContext("2d");


topCanvas.width = Math.floor(topCanvas.clientWidth);
topCanvas.height = topCanvas.clientHeight;
const WIDTH = topCanvas.width;
const HEIGHT = topCanvas.height;

let source;
let analyser;

audio.onplaying = () => {
  if (!source) {
    source = audioCtx.createMediaElementSource(audio);
  }
  analyser = audioCtx.createAnalyser();
  source.connect(analyser);
  source.connect(audioCtx.destination);
  analyser.fftSize = 128;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  let barWidth = (WIDTH / bufferLength);
  let barHeight;
  let x;

  let animateID;
	const draw = () => {
		topCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    bottomCanvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

		analyser.getByteFrequencyData(dataArray);

    x = 0;
		for (let i = 0; i < bufferLength; i++) {
			barHeight = dataArray[i] / 2;

    const gradient = topCanvasCtx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1/6, "orange");
    gradient.addColorStop(2/6, "yellow");
    gradient.addColorStop(3/6, "green");
    gradient.addColorStop(4/6, "blue");
    gradient.addColorStop(5/6, "purple");
    gradient.addColorStop(1, "red");

		topCanvasCtx.fillStyle = gradient;
		topCanvasCtx.fillRect(x, y1, barWidth, barHeight);
		topCanvasCtx.fillRect(x, y2,  HEIGHT / 2 - barHeight, barHeight);
    bottomCanvasCtx.drawImage(topCanvas, 0, 0);

		x += barWidth + 1;
		}
    animateID = requestAnimationFrame(draw);

	};
	draw();


}

const audio = document.getElementById("audio");






let animateID
function draw() {
  animateID = requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);

  if (audio.paused) {
    cancelAnimationFrame(animateID);
  } else {
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.fillStyle = "rgb(0, 0, 0)";
    
    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
  }


  for (let i = 0; i < bufferLength; i++) {
			barHeight = dataArray[i] / 2;

			const gradient =
				canvasCtx.createLinearGradient(0, 0, WIDTH, 0)
			gradient.addColorStop(0, "red");
			gradient.addColorStop(0.16, "orange");
			gradient.addColorStop(0.32, "yellow");
			gradient.addColorStop(0.48, "green");
			gradient.addColorStop(0.64, "blue");
			gradient.addColorStop(0.8, "purple");
			gradient.addColorStop(1, "red");

			canvasCtx.fillStyle = gradient;

      let y = HEIGHT - barHeight;
			canvasCtx.fillRect(x, y, barWidth, barHeight);
			x += barWidth + 1;
		}
	};



		canvasCtx.clearRect(i, 0, 1 + lineWidth, canvas.height);
		canvasCtx.beginPath();
		canvasCtx.lineWidth = lineWidth;
		canvasCtx.strokeStyle = `rgba(${r},${g},${b},1)`;
		canvasCtx.moveTo(i, 0);
		canvasCtx.lineTo(i, 0 + valuesT[i]);
		canvasCtx.stroke();
		canvasCtx.closePath();

		canvasCtx.beginPath();
		canvasCtx.lineWidth = lineWidth;
		canvasCtx.strokeStyle = `rgba(${r},${g},${b},1)`;
		canvasCtx.moveTo(i, canvas.height);
		canvasCtx.lineTo(i, canvas.height - valuesB[i]);
		canvasCtx.stroke();
		canvasCtx.closePath();

	}
};
requestAnimationFrame(lines);
