export default function getMergeSortAnimations(array: number[]) {
    const animations: any[] = [];
    if (array.length <= 1) return animations;
    const arr = array.slice();
    mergeSortHelper(arr, 0, arr.length - 1, animations);
    return animations;
}

function mergeSortHelper(arr: number[], start: number, end: number, animations: any[]) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(arr, start, mid, animations);
    mergeSortHelper(arr, mid + 1, end, animations);
    merge(arr, start, mid, end, animations);
}

function merge(arr: number[], start: number, mid: number, end: number, animations: any[]) {
    const left: number[] = [];
    const right: number[] = [];

    // Copy data to temp arrays
    for (let i = start; i <= mid; i++) {
        left.push(arr[i]);
    }
    for (let i = mid + 1; i <= end; i++) {
        right.push(arr[i]);
    }

    let i = 0, j = 0, k = start;

    // Merge the temp arrays back
    while (i < left.length && j < right.length) {
        // Compare animation
        animations.push({
            type: 'compare',
            indices: [start + i, mid + 1 + j]
        });

        if (left[i] <= right[j]) {
            // Overwrite position k with left[i]
            animations.push({
                type: 'overwrite',
                index: k,
                value: left[i]
            });
            arr[k] = left[i];
            i++;
        } else {
            // Overwrite position k with right[j]
            animations.push({
                type: 'overwrite',
                index: k,
                value: right[j]
            });
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements from left
    while (i < left.length) {
        animations.push({
            type: 'overwrite',
            index: k,
            value: left[i]
        });
        arr[k] = left[i];
        i++;
        k++;
    }

    // Copy remaining elements from right
    while (j < right.length) {
        animations.push({
            type: 'overwrite',
            index: k,
            value: right[j]
        });
        arr[k] = right[j];
        j++;
        k++;
    }
}