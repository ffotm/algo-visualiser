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

function rotateLeft(node: TreeNode): TreeNode {
    const newRoot = node.right!
    node.right = newRoot.left
    newRoot.left = node
    return newRoot
}

function rotateRight(node: TreeNode): TreeNode {
    const newRoot = node.left!
    node.left = newRoot.right
    newRoot.right = node
    return newRoot
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
let NODE_ID = 0

function insertBST(node: TreeNode | null, value: number): TreeNode {
    if (!node) return new TreeNode(++NODE_ID, value)

    if (value < node.value) node.left = insertBST(node.left, value)
    else node.right = insertBST(node.right, value)

    return node
}

// tree.ts
export const getHeight = (node: TreeNode | null): number => {
    if (!node) return 0
    return 1 + Math.max(getHeight(node.left), getHeight(node.right))
}




export { TreeNode, rotateLeft, rotateRight, buildBST, insertBST, isAvlBalanced, updateHeights, balanceFactor, buildAVLTree, traverseInOrder, traversePreOrder, traversePostOrder };

