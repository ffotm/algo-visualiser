

export default function createGrid(rows, cols) {
    const arr = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push({
                row: i,
                col: j,
                isWall: false,
                isPath: false,
                isVisited: false,
                isStart: false,
                isEnd: false,
                distance: Infinity,
                previous: null
            });
        }
        arr.push(row);
    }
    return arr;
}


export function dihstra(grid, start, end) {
    console.log("start, end", start, end)
    const visitedNodes = [];
    start.isStart = true;
    end.isEnd = true;
    start.isPath = true;
    start.distance = 0;
    const unvisitedNodes = grid.flat();
    // we use .flat() instead of .slice() bc its 2D 
    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) continue;
        console.log(closestNode);
        //continue means tskipi w tdjouz ll next iteration of the loop
        if (closestNode.distance === Infinity) return visitedNodes;
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        if (closestNode === end) return visitedNodes;
        updateNeighbors(closestNode, grid);
    }
    return visitedNodes;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        const newDist = node.distance + 1;
        if (newDist < neighbor.distance) {
            neighbor.distance = newDist;
            neighbor.previous = node;
        }
    }
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}

export function getPath(endNode) {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        console.log("pathnode", currentNode);
        path.unshift(currentNode);
        currentNode = currentNode.previous;
    }
    return path;
}
