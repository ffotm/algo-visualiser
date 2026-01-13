
import { getNeighbors } from "../dihjstra/dihjstra";


export function Df(grid: any, start: any, end: any) {
    const visitedNodes = [];
    const stack = [];

    // reset nodes
    for (const row of grid) {
        for (const node of row) {
            node.isVisited = false;
            node.previous = null;
        }
    }

    stack.push(start);

    while (stack.length > 0) {
        const current = stack.pop();

        if (current.isWall || current.isVisited) continue;

        current.isVisited = true;
        visitedNodes.push(current);

        if (current === end) {
            return visitedNodes;
        }

        const neighbors = getNeighbors(current, grid);

        // IMPORTANT: reverse to control direction visually
        for (const neighbor of neighbors.reverse()) {
            if (!neighbor.isVisited) {
                neighbor.previous = current;
                stack.push(neighbor);
            }
        }
    }

    return visitedNodes;
}
