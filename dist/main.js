/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/audio_player.js":
/*!*****************************!*\
  !*** ./src/audio_player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AudioVisualise": () => (/* binding */ AudioVisualise)
/* harmony export */ });
var AudioVisualise = function AudioVisualise() {
  var canvas = document.getElementById("canvas");
  var canvasCtx = canvas.getContext("2d"); // increase canvas resolution
  // canvas.width = canvas.clientWidth * 2;
  // canvas.height = canvas.clientHeight * 2;

  var WIDTH = canvas.width;
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
  canvasCtx.setLineDash([10]);
  canvasCtx.moveTo(0, HEIGHT / 2);
  canvasCtx.lineTo(WIDTH, HEIGHT / 2);
  canvasCtx.lineWidth = 4;
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
  var dataArray = new Uint8Array(bufferLength);
  var animateID;

  var draw = function draw() {
    animateID = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT / 2 - 4);
    canvasCtx.clearRect(0, 4 + HEIGHT / 2, WIDTH, HEIGHT / 2);
    var barWidth = WIDTH / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      var barHeight = dataArray[i];
      var y1 = HEIGHT / 2 - barHeight - 10;
      var y2 = (HEIGHT - 2) / 2 + 12;
      canvasCtx.fillStyle = gradient;
      canvasCtx.fillRect(x, y1, barWidth, barHeight);
      canvasCtx.fillRect(x, y2, barWidth, barHeight);
      x += barWidth + 10;
    }
  };

  draw();
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _audio_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio_player */ "./src/audio_player.js");

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
})();

/******/ })()
;
//# sourceMappingURL=main.js.map