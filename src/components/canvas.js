export default class AudioVisualiser {
	constructor(canvas) {
		this.canvasCtx = canvas.getContext("2d");
		this.width = this.canvasCtx.width;
		this.height = this.canvasCtx.height;
	}

  play() {
    this.playing = true;
    this.animate();
  }

	animate() {
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		const analyser = audioCtx.createAnalyser();
		const source = audioCtx.createMediaElementSource(audio);
		const dataArray = new Uint8Array(bufferLength);
		analyser.getByteTimeDomainData(dataArray);
		source.connect(analyser);
		analyser.connect(audioCtx.destination);
		analyser.fftSize = 128;
		const bufferLength = analyser.frequencyBinCount;

    if (this.playing) {
      this.draw();
    }



  }
	draw() {
		requestAnimationFrame(this.animate.bind(this));
			this.canvasCtx.clearRect(0, 0, this.width, this.height);
			this.canvasCtx.fillStyle = "rgb(0, 0, 0)";
			for (let i = 0; i < bufferLength; i++) {
				let barHeight = dataArray[i];
				let y = this.height - barHeight / 2;
				const gradient = this.canvasCtx.createLinearGradient(
					0,
					0,
					this.width,
					0
				);
				gradient.addColorStop(0, "red");
				gradient.addColorStop(0.16, "orange");
				gradient.addColorStop(0.32, "yellow");
				gradient.addColorStop(0.48, "green");
				gradient.addColorStop(0.64, "blue");
				gradient.addColorStop(0.8, "purple");
				gradient.addColorStop(1, "red");

				this.canvasCtx.fillStyle = gradient;

				this.canvasCtx.fillRect(x, y, barWidth, barHeight / 2);

				x += barWidth;
			}
		};
	
}
