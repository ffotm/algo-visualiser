

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


export function dijkstra(grid, start, end) {
    const path = [];
    const visitedNodes = [];
    start.isStart = true;
    end.isEnd = true;
    start.isVisited = true;
    start.isPath = true;
    start.distance = 0;
    const unvisitedNodes = grid.slice();
    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodes;
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        if (closestNode === end) return visitedNodes;
        updateNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previous = node;
    }
}
