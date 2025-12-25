const ANIMATION_SPEED_MS = 100;
const SECONDARY_COLOR = 'red';
const PRIMARY_COLOR = '#203b1e';


export default function bubbleSort(array) {
    const animations = [];
    const arr = array.slice();
    const bars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            // comparison
            animations.push([j, j + 1, false]);

            if (arr[j] > arr[j + 1]) {
                // swap
                animations.push([j, j + 1, true]);
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    animations.forEach(([i, j, isSwap], idx) => {
        setTimeout(() => {
            // highlight
            bars[i].style.backgroundColor = 'red';
            bars[j].style.backgroundColor = 'red';

            if (isSwap) {
                const h1 = bars[i].style.height;
                const h2 = bars[j].style.height;
                const w1 = bars[i].textContent;
                const w2 = bars[j].textContent;
                bars[i].style.height = h2;
                bars[j].style.height = h1;
                bars[i].textContent = w2;
                bars[j].textContent = w1;

            }

            // reset color
            setTimeout(() => {
                bars[i].style.backgroundColor = 'var(--border)';
                bars[j].style.backgroundColor = 'var(--border)';
            }, ANIMATION_SPEED_MS);

        }, idx * ANIMATION_SPEED_MS);
    });
}



