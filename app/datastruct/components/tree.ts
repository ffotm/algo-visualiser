class TreeNode {
    id: number;
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    height: number | null;
    type: string;
    constructor(id: number, value: number, height: number | null = null) {
        this.id = id;
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = height;
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

const buildAVLTree = (
    values: number[],
    start: number,
    end: number,
    idCounter = { current: 0 }
): TreeNode | null => {
    if (start > end) return null
    const mid = Math.floor((start + end) / 2)
    const node = new TreeNode(idCounter.current++, values[mid])
    node.left = buildAVLTree(values, start, mid - 1, idCounter)
    node.right = buildAVLTree(values, mid + 1, end, idCounter)
    const leftHeight = node.left ? (node.left.height ?? 0) : 0
    const rightHeight = node.right ? (node.right.height ?? 0) : 0
    node.height = 1 + Math.max(leftHeight, rightHeight)
    return node
}

function updateHeights(node: TreeNode | null): number {
    if (!node) return 0
    const leftHeight = updateHeights(node.left)
    const rightHeight = updateHeights(node.right)
    node.height = Math.max(leftHeight, rightHeight) + 1
    return node.height
}

function balanceFactor(node: TreeNode | null): number {
    if (!node) return 0
    const leftHeight = node.left ? node.left.height ?? 0 : 0
    const rightHeight = node.right ? node.right.height ?? 0 : 0
    return leftHeight - rightHeight
}


function isAvlBalanced(node: TreeNode | null): boolean {
    if (!node) return true
    const bf = balanceFactor(node)
    if (bf > 1 || bf < -1) return false
    return isAvlBalanced(node.left) && isAvlBalanced(node.right)


}

// In tree.ts, modify rotateRight and rotateLeft to preserve IDs:
function rotateRight(y: TreeNode): TreeNode {
    const x = y.left!;
    const T2 = x.right;

    // Swap IDs to maintain identity
    const tempId = y.id;
    y.id = x.id;
    x.id = tempId;

    // Swap values if you want the values to move with the nodes
    const tempValue = y.value;
    y.value = x.value;
    x.value = tempValue;

    // Now rotate the structure
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(y.left ? y.left.height ?? 0 : 0, y.right ? y.right.height ?? 0 : 0) + 1;
    x.height = Math.max(x.left ? x.left.height ?? 0 : 0, x.right ? x.right.height ?? 0 : 0) + 1;

    return x;
}

function rotateLeft(x: TreeNode): TreeNode {
    const y = x.right!;
    const T2 = y.left;

    // Swap IDs to maintain identity
    const tempId = x.id;
    x.id = y.id;
    y.id = tempId;

    // Swap values
    const tempValue = x.value;
    x.value = y.value;
    y.value = tempValue;

    // Now rotate
    y.left = x;
    x.right = T2;

    // Update heights
    x.height = Math.max(x.left ? x.left.height ?? 0 : 0, x.right ? x.right.height ?? 0 : 0) + 1;
    y.height = Math.max(y.left ? y.left.height ?? 0 : 0, y.right ? y.right.height ?? 0 : 0) + 1;

    return y;
}
function updateTreeStructure(root: TreeNode | null, unbalancedNode: TreeNode, newRoot: TreeNode): TreeNode | null {
    if (!root) return null;

    if (root === unbalancedNode) {
        return newRoot;
    }

    // Recursively search for the unbalanced node in the tree
    if (root.left && root.left === unbalancedNode) {
        root.left = newRoot;
    } else if (root.right && root.right === unbalancedNode) {
        root.right = newRoot;
    } else {
        updateTreeStructure(root.left, unbalancedNode, newRoot);
        updateTreeStructure(root.right, unbalancedNode, newRoot);
    }

    return root;
}
function insertBST(node: TreeNode | null, value: number): TreeNode {
    if (!node) return new TreeNode(Date.now(), value)

    if (value < node.value) node.left = insertBST(node.left, value)
    else node.right = insertBST(node.right, value)

    return node
}



export { TreeNode, rotateLeft, rotateRight, buildBST, insertBST, isAvlBalanced, updateHeights, balanceFactor, buildAVLTree, traverseInOrder, traversePreOrder, traversePostOrder };

