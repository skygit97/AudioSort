function quickSort(arr) {
	if (arr.length < 2) return arr;

	const pivot = arr[0];
	let left = arr.slice(1).filter((el) => (el < pivot));
	let right = arr.slice(1).filter((el) => (el >  pivot));
	left = quickSort(left);
	right = quickSort(right);

	return left.concat([pivot]).concat(right);
}
