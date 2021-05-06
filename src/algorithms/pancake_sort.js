function pancakeSort(arr) {
	for (let i = arr.length - 1; i >= 1; i--) {
		let maxIdx = 0;
		let max = arr[0];
		for (let j = 1; j <= i; j++) {
			if (arr[j] > max) {
				max = arr[j];
				maxIdx = j;
			}
		}

		if (maxIdx == i) continue; 

		let sliced;
		if (maxIdx > 0) {
			sliced = arr.slice(0, maxIdx + 1).reverse();
			for (j = 0; j <= maxIdx; j++) arr[j] = sliced[j];
		}

		// then flip the max element to its place
		sliced = arr.slice(0, i + 1).reverse();
		for (j = 0; j <= i; j++) arr[j] = sliced[j];
	}
	return arr;
}

var arra = [3, 0, 2, 5, -1, 4, 1];
console.log("Original Array Elements");
console.log(arra);
console.log("Sorted Array Elements");
console.log(pancake_sort(arra, 0, 5));
