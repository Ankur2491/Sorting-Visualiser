export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    selectionSortHelper(array, 0, array.length, animations);
    return animations;
  }
  
  export function selectionSortHelper(
    array,
    startIdx,
    endIdx,
    animations
  ) {
    for (let i = startIdx; i < endIdx-1; i++) {
        let min = i;
      for (let j = i+1; j < endIdx; j++) {
        if (array[j] < array[min]){
            animations.push([j, min]);
            animations.push([j, min]);
            animations.push([min, array[j]]);
            min = j;
        }
        }
        animations.push([i, min]);
        animations.push([i, min]);
        animations.push([i, array[min]]);
        animations.push([min, i]);
        animations.push([min, i]);
        animations.push([min, array[i]]);
        let temp = array[i];
        array[i] = array[min];
        array[min] = temp;
      }
    }
  
  