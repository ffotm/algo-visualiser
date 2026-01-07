class TreeNode {
    id: number;
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    type: string;
    constructor(id: number, value: number, type: string) {
        this.id = id;
        this.value = value;
        this.left = null;
        this.right = null;
        this.type = type;
    }
}

const traverseInOrder = (node: TreeNode | null, result: number[] = []): number[] => {
    if (node) {
        traverseInOrder(node.left, result);
        result.push(node.id);
        traverseInOrder(node.right, result);
    }
    return result;
};

const traversePreOrder = (node: TreeNode | null, result: number[] = []): number[] => {
    if (node) {
        result.push(node.id);
        traversePreOrder(node.left, result);
        traversePreOrder(node.right, result);
    }
    return result;
}

const traversePostOrder = (node: TreeNode | null, result: number[] = []): number[] => {
    if (node) {
        traversePostOrder(node.left, result);
        traversePostOrder(node.right, result);
        result.push(node.id);
    }
    return result;
}


const buildBST = (
    values: number[],
    start: number,
    end: number,
    idCounter = { current: 0 }
): TreeNode | null => {
    if (start > end) return null

    const mid = Math.floor((start + end) / 2)
    const node = new TreeNode(idCounter.current++, values[mid])

    node.left = buildBST(values, start, mid - 1, idCounter)
    node.right = buildBST(values, mid + 1, end, idCounter)

    return node
}




export { TreeNode, buildBST, traverseInOrder, traversePreOrder, traversePostOrder };

