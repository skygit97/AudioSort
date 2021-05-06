function maxHeapify(arr, num, i) {
	let largest = i;
	let leftIdx = 2 * i + 1;
	let rightIdx = 2 * i + 2;

	if (leftIdx < num && arr[leftIdx] > arr[largest]) {
		largest = leftIdx;
	}

	if (rightIdx < num && arr[rightIdx] > arr[largest]) {
		largest = rightIdx;
	}

	if (largest != i) {
		[arr[i], arr[largest]] = [arr[largest], arr[i]];

		maxHeapify(arr, num, largest);
	}
}

function heapSort(arr) {
	let num = arr.length;
	for (let i = parseInt(num / 2 - 1); i >= 0; i--) {
		maxHeapify(arr, num, i);
	}
	for (let i = num - 1; i >= 0; i--) {
		[arr[0], arr[i]] = [arr[i], arr[0]];
		maxHeapify(arr, i, 0);
	}
  return arr;
}
