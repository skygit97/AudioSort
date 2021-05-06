function merge(left, right) {
  let merged = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      merged.push(left.shift())
    } else {
      merged.push(right.shift());
    }
  }
  merged = merged.concat(left, right);
  return merged;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const midpoint = Math.floor(arr.length / 2);
  const sortedLeft = mergeSort(arr.slice(0, midpoint));
	const sortedRight = mergeSort(arr.slice(midpoint));  
  return merge(sortedLeft, sortedRight);
}