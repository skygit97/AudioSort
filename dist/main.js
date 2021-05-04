/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
window.addEventListener("load", function () {
  var canvas = document.getElementById("canvas");
  var canvasCtx = canvas.getContext("2d"); // increase canvas resolution

  canvas.width = Math.floor(canvas.clientWidth);
  console.log(canvas.width);
  canvas.height = canvas.clientHeight;
  var WIDTH = canvas.width;
  console.log(WIDTH);
  var HEIGHT = canvas.height; // create canvas gradient

  var gradient = canvasCtx.createLinearGradient(0, 0, WIDTH, 0);
  gradient.addColorStop(0, "red");
  gradient.addColorStop(0.16, "orange");
  gradient.addColorStop(0.32, "yellow");
  gradient.addColorStop(0.48, "green");
  gradient.addColorStop(0.64, "blue");
  gradient.addColorStop(0.8, "purple");
  gradient.addColorStop(1, "red"); // create canvas mid line

  canvasCtx.beginPath();
  canvasCtx.setLineDash([7]);
  canvasCtx.moveTo(0, HEIGHT / 2);
  canvasCtx.lineTo(WIDTH, HEIGHT / 2);
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = gradient;
  canvasCtx.stroke(); // create audio analyser node

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioCtx.createAnalyser(); // connect node to audio source

  var audio = document.getElementById("audio");
  var source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  source.connect(audioCtx.destination); // caputure audio data

  analyser.fftSize = 128;
  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);
  var dataArray = new Uint8Array(bufferLength);
  var animateID;

  var draw = function draw() {
    animateID = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT / 2 - 4);
    canvasCtx.clearRect(0, 4 + HEIGHT / 2, WIDTH, HEIGHT / 2); // let numBars = 100;

    var x = 0;
    var barWidth = WIDTH / bufferLength;

    for (var i = 0; i < bufferLength; i++) {
      var barHeight = dataArray[i] / 2;
      var y1 = HEIGHT / 2 - barHeight - 5;
      var y2 = (HEIGHT - 2) / 2 + 5;
      canvasCtx.fillStyle = gradient;
      canvasCtx.fillRect(x, y1, barWidth, barHeight);
      canvasCtx.fillRect(x, y2, barWidth, barHeight);
      x += barWidth + 1;
    }
  };

  draw();

  function bubbleSort(arr) {
    function sort() {
      var virtualArr = [arr.slice()];

      for (var i = 0; i < arr.length; i++) {
        var done = true;

        for (var j = 0; j < arr.length - i; j++) {
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
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT / 2 - 4);
      canvasCtx.clearRect(0, 4 + HEIGHT / 2, WIDTH, HEIGHT / 2);
      var barWidth = WIDTH / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        var barHeight = dataArray[i] / 2;
        var y1 = HEIGHT / 2 - barHeight - 5;
        var y2 = (HEIGHT - 2) / 2 + 5;
        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, y1, barWidth, barHeight);
        canvasCtx.fillRect(x, y2, barWidth, barHeight);
        x += barWidth + 1;
      }
    } // animation


    function animation() {
      // Call the sort method to return an array containing the contents of each step
      var virtualArr = sort();
      var interval = 1000; // Traverse the resulting array, and call the darw method every 500ms to draw a step

      virtualArr.forEach(function (item) {
        setTimeout(function () {
          return darw(item);
        }, interval);
      });
    }

    animation();
  }

  audio.addEventListener("pause", function () {
    cancelAnimationFrame(animateID);
    bubbleSort(dataArray);
  });
});
/******/ })()
;
//# sourceMappingURL=main.js.map