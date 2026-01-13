import { getNeighbors, updateNeighbors } from "../dihjstra/dihjstra";

export function Bf(grid: any, start: any, end: any) {
    const visitedNodes = [];
    const queue = [];


    for (const row of grid) {
        for (const node of row) {
            node.isVisited = false;
            node.previous = null;
        }
    }

    start.isVisited = true;
    queue.push(start);

    while (queue.length > 0) {
        const current = queue.shift();
        visitedNodes.push(current);

        if (current === end) {
            return visitedNodes;
        }

        const neighbors = getNeighbors(current, grid);
        for (const neighbor of neighbors) {
            if (neighbor.isWall || neighbor.isVisited) continue;

            neighbor.isVisited = true;
            neighbor.previous = current;
            queue.push(neighbor);
        }
    }

    return visitedNodes;
}
