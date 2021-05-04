import React, { createRef } from "react";

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.audio = new Audio(
			"../../dist/assets/songs/Cybergirlfriend - Every Little Thing.mp3"
		);
		this.canvas = createRef();
	}

	componentDidMount() {
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		this.source = this.audioCtx.createMediaElementSource(this.audio);

		this.analyser = this.audioCtx.createAnalyser();
		this.source.connect(this.analyser);
		this.analyser.connect(this.audioCtx.destination);
		this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
	}

	togglePlay() {
		const { audio } = this;
		if (audio.paused) {
			audio.play();
			this.animateID = requestAnimationFrame(() => this.animate);
		} else {
			audio.pause();
			cancelAnimationFrame(this.animateID);
		}
	}

	animate() {
		this.draw(this.canvas.current);
    	this.analyser.getByteTimeDomainData(this.dataArray);

		this.animateID = requestAnimationFrame(this.animate);
	}

	draw(canvas) {
		let canvasCtx = canvas.getContext("2d");

		const WIDTH = Math.floor(this.canvas.clientWidth);
		const HEIGHT = this.canvas.clientHeight;
		const barWidth = 2;
		let x;
		let y;

		for (let i = 0; i < 100; i++) {
			let barHeight = this.dataArray[i] / 2;
			x = i * 3;
			y = HEIGHT - barHeight;

			const gradient = canvasCtx.createLinearGradient(0, 0, WIDTH, HEIGHT);
			gradient.addColorStop(0, "red");
			gradient.addColorStop(1 / 6, "orange");
			gradient.addColorStop(2 / 6, "yellow");
			gradient.addColorStop(3 / 6, "green");
			gradient.addColorStop(4 / 6, "blue");
			gradient.addColorStop(5 / 6, "purple");
			gradient.addColorStop(1, "red");

			canvasCtx.fillStyle = gradient;

			canvasCtx.fillRect(x, y, barWidth, barHeight);
		}
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.animateID);
		this.analyser.disconnect();
		this.source.disconnect();
	}

	render() {
		return (
			<>
				<canvas ref={this.canvas} />
				<button onClick={() => this.togglePlay()}>Play/Pause</button>
				{/* <audio id="audio" controls onClick={() => this.togglePlay()}></audio> */}
			</>
		);
	}
}

export default Canvas;
