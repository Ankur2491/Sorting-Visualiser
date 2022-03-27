export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, 0, array.length, animations);
  return animations;
}

export function bubbleSortHelper(
  array,
  startIdx,
  endIdx,
  animations
) {
  console.log(array);
  for (let i = startIdx; i < endIdx; i++) {
    for (let j = startIdx; j < endIdx - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        animations.push([j, array[j + 1]]);
        animations.push([j + 1, j]);
        animations.push([j + 1, j]);
        animations.push([j + 1, array[j]]);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  console.log(array);
}
