import React from 'react'

function MergeSort(array) {
    let animations = [];
    if (array.length <= 1) return array;
    else {
        const a = array.slice();
        //the exact copy of the array
        mergeHelper(a, 0, a.length - 1, animations)

        return animations;
    }
}

//hadi function helper hya li te9sem
function mergeHelper(a, start, end, animations) {
    if (start === end) return;
    //ida lwl ysawi tali ykhredj ml function psq 3ndna element wa7d
    else {
        const mid = Math.floor((start + end) / 2);
        mergeHelper(a, start, mid, animations);
        mergeHelper(a, mid + 1, end, animations);
        Merge(a, start, mid, end, animations);
    }
}

function Merge(a, start, mid, end, animations) {
    const left = a.slice(start, mid + 1);
    const right = a.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            animations.push([k, left[i]]);
            a[k++] = left[i++];
        } else {
            animations.push([k, right[j]]);
            a[k++] = right[j++];
        }
    }
    while (i < left.length) {
        animations.push([k, left[i]]);
        a[k++] = left[i++];
    }

    while (j < right.length) {
        animations.push([k, right[j]]);
        a[k++] = right[j++];
    }

}

export default MergeSort