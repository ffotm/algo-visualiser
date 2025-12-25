import React from 'react'

const ANIMATION_SPEED_MS = 100;
const SECONDARY_COLOR = 'red';
const PRIMARY_COLOR = '#203b1e';


function MergeSort(array) {
    let animations = [];
    const bars = document.getElementsByClassName('array-bar');
    if (array.length <= 1) return array;
    else {
        const a = array.slice();
        //the exact copy of the array
        mergeHelper(a, 0, a.length - 1, animations)
    }
    animations.forEach((animation, i) => {
        const isColorChange = i % 3 !== 2;
        setTimeout(() => {
            const [barOne, barTwo] = animations[i];
            const [index, newHeight] = animation;

            if (isColorChange) {
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                bars[barOne].style.backgroundColor = color;
                bars[barTwo].style.backgroundColor = color;

            } else {
                bars[barOne].style.height = `${barTwo * 3}px`;
                bars[barOne].textContent = barTwo;
                bars[barOne].style.backgroundColor = PRIMARY_COLOR;

            }


        }, i * ANIMATION_SPEED_MS);
    });

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
        animations.push([start + i, mid + 1 + j]);
        animations.push([start + i, mid + 1 + j]);
        if (left[i] <= right[j]) {
            animations.push([k, left[i]]);

            a[k++] = left[i++];
        } else {
            animations.push([k, right[j]]);
            a[k++] = right[j++];
        }
    }
    while (i < left.length) {
        animations.push([start + i, start + i]);
        animations.push([start + i, start + i]);
        animations.push([k, left[i]]);
        a[k++] = left[i++];
    }

    while (j < right.length) {
        animations.push([mid + 1 + j, mid + 1 + j]);
        animations.push([mid + 1 + j, mid + 1 + j]);
        animations.push([k, right[j]]);
        a[k++] = right[j++];
    }

}




export default MergeSort;