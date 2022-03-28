export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    insertionSortHelper(array, array.length, animations);
    return animations;
}

export function insertionSortHelper(
    array,
    endIdx,
    animations
) {
    //in case the first element is already in its correct place.
    let aux = array.slice();
    aux.sort((a,b)=>{return a-b});
    if(aux[0] === array[0]){
        animations.push([0,0]);
        animations.push([0,0]);
        animations.push([0, array[0]]);
    }
    for (let j = 1; j < endIdx; j++) {
        let key = array[j];
        let i = j - 1;
        while (i >=0 && array[i] > key) {
            animations.push([i,j]);
            animations.push([i,j]);
            animations.push([i+1,array[i]]);
            array[i + 1] = array[i];
            i--;
        }
        animations.push([i+1,j]);
        animations.push([i+1,j]);
        animations.push([i+1, key]);
        array[i + 1] = key;
        
    }
}
