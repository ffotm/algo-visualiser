export default function getQuickSortAnimations(array: number[]) {
    const animations: any[] = [];
    const arr = array.slice();

    quickSortHelper(arr, 0, arr.length - 1, animations);
    return animations;
}

function quickSortHelper(arr: number[], low: number, high: number, animations: any[]) {
    if (low < high) {

        const pivotIdx = partition(arr, low, high, animations);


        quickSortHelper(arr, low, pivotIdx - 1, animations);
        quickSortHelper(arr, pivotIdx + 1, high, animations);
    }
}

function partition(arr: number[], low: number, high: number, animations: any[]) {
    const pivotIndex = high;
    const pivotValue = arr[high];

    animations.push({
        type: 'pivot-start',
        pivot: pivotIndex
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
        animations.push({
            type: 'compare',
            i: j,
            pivot: pivotIndex
        });

        if (arr[j] <= pivotValue) {
            i++;

            if (i !== j) {
                animations.push({
                    type: 'swap',
                    i,
                    j
                });

                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }

    // Final pivot swap
    if (i + 1 !== high) {
        animations.push({
            type: 'swap',
            i: i + 1,
            j: high
        });

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    }


    animations.push({
        type: 'pivot-end',
        pivot: i + 1
    });

    return i + 1;
}
