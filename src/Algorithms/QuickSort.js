export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSort(array, 0, array.length - 1, animations);
    return animations;
}

function swap(items, leftIndex, rightIndex, animations) {
    animations.push([leftIndex, rightIndex]);
    animations.push([leftIndex, rightIndex]);
    animations.push([leftIndex, items[rightIndex]]);
    animations.push([rightIndex, leftIndex]);
    animations.push([rightIndex, leftIndex]);
    animations.push([rightIndex, items[leftIndex]]);
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;


}

function partition(items, left, right, animations) {
    const pivot = items[Math.floor((right + left) / 2)]; //middle element
    let i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j, animations); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right, animations) {
    if (items.length > 1) {
        const index = partition(items, left, right, animations); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1, animations);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right, animations);
        }
    }
    return items;
}