


export default function getBubbleSortAnimations(array) {
    const animations = [];
    const arr = array.slice();

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            // comparison
            animations.push({
                type: 'compare',
                i: j,
                j: j + 1,
            });

            if (arr[j] > arr[j + 1]) {
                // swap
                animations.push({
                    type: 'swap',
                    i: j,
                    j: j + 1,
                });

                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return animations;
}
