function bubbleSort(arr) {
	let sortedArr = arr.slice();
	let sorted = false;
	while (!sorted) {
		sorted = true;
		for (let i = 0; i < sortedArr.length - 1; i++) {
			if (sortedArr[i] > sortedArr[i + 1]) {
				[sortedArr[i], sortedArr[i + 1]] = [sortedArr[i + 1], sortedArr[i]];
				sorted = false;
			}
		}
	}
	return sortedArr;
};