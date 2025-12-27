export default function createGrid(rows, cols) {
    const arr = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.floor(Math.random() * 100))
        }
        arr.push(row)
    }
    return arr;
};
