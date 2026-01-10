import { type } from "os";

class TreeNode {
    id: number;
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    height: number | null;
    type: string | null;
    parent: TreeNode | null = null;
    constructor(id: number, value: number, height: number | null = null, type: string | null = null, parent: TreeNode | null = null) {
        this.id = id;
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = height;
        this.type = 'red';
        this.parent = parent;
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

const buildHeap = (values: number[], i = 0, idCounter = { current: 0 }, table: number[] = []): TreeNode | null => {
    if (i >= values.length) return null
    const node = new TreeNode(idCounter.current++, values[i])
    table.push(values[i]);
    node.left = buildHeap(values, 2 * i + 1, idCounter)
    node.right = buildHeap(values, 2 * i + 2, idCounter)
    return node;

}
const buildHeap2 = (values: number[], i = 0, idCounter = { current: 0 }, table: number[] = []) => {
    if (i >= values.length) return null
    const node = new TreeNode(idCounter.current++, values[i])
    table.push(values[i]);
    buildHeap2(values, 2 * i + 1, idCounter, table)
    buildHeap2(values, 2 * i + 2, idCounter, table)
    return table;

}

const isHeapValid = (node: TreeNode | null, heaptype: string): boolean => {
    if (!node) return true;

    if (heaptype === 'max-heap') {
        if (node.left && node.left.value > node.value) return false;
        if (node.right && node.right.value > node.value) return false;
    }

    if (heaptype === 'min-heap') {
        if (node.left && node.left.value < node.value) return false;
        if (node.right && node.right.value < node.value) return false;
    }

    return (
        isHeapValid(node.left, heaptype) &&
        isHeapValid(node.right, heaptype)
    );
};




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


// Red-Black Tree functions
const buildRnbtree = (
    values: number[],
    start: number,
    end: number,
    type: string,
    idCounter = { current: 0 }
): TreeNode | null => {
    if (start > end) return null

    const mid = Math.floor((start + end) / 2)
    const node = new TreeNode(idCounter.current++, values[mid])
    node.left = buildRnbtree(values, start, mid - 1, 'red', idCounter,)
    node.right = buildRnbtree(values, mid + 1, end, 'red', idCounter)

    return node
}

const Recoloring = (node: TreeNode | null) => {
    if (!node) return;
    if (node.type === 'red') {
        node.type = 'black';
    } else {
        node.type = 'red';
    }

}
const isRnbBalanced = (node: TreeNode | null): boolean => {
    if (!node) return true;
    const bf = node.type;
    if (bf !== 'red' && bf !== 'black') return false;
    return isRnbBalanced(node.left) && isRnbBalanced(node.right);

}





function fixViolations(node: TreeNode): TreeNode {
    let currentNode = node
    while (currentNode.parent && currentNode.parent.type === 'red') {
        let parent = currentNode.parent
        let grandParent = parent.parent
        if (!grandParent) break;
        if (parent === grandParent.left) {
            let uncle = grandParent.right

            if (uncle && uncle.type === 'red') {
                grandParent.type = 'red'
                parent.type = 'black'
                uncle.type = 'black'
                currentNode = grandParent
            } else {
                if (currentNode === parent.right) {
                    rotateLeft(parent)
                    currentNode = parent
                    parent = currentNode.parent!
                }
                rotateRight(grandParent)
                const temp = parent.type
                parent.type = grandParent.type
                grandParent.type = temp
                currentNode = parent
            }
        } else {
            let uncle = grandParent.left
            if (uncle && uncle.type === 'red') {
                grandParent.type = 'red'
                parent.type = 'black'
                uncle.type = 'black'
                currentNode = grandParent
            } else {
                if (currentNode === parent.left) {
                    rotateRight(parent)
                    currentNode = parent
                    parent = currentNode.parent!
                }
                rotateLeft(grandParent)
                const temp = parent.type
                parent.type = grandParent.type
                grandParent.type = temp
                currentNode = parent
            }
        }
    }
    let root = currentNode
    while (root.parent) root = root.parent
    root.type = 'black'
    return root
}

class RedBlackTree {
    root: TreeNode | null = null;
    idCounter = 0;

    rnbInsert(value: number): void {
        const newNode = new TreeNode(this.idCounter++, value);
        newNode.type = 'red';

        if (!this.root) {
            this.root = newNode;
            this.root.type = 'black';
            return;
        }

        // BST insert
        let current = this.root;
        let parent: TreeNode | null = null;

        while (current) {
            parent = current;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        newNode.parent = parent;
        if (value < parent!.value) {
            parent!.left = newNode;
        } else {
            parent!.right = newNode;
        }

        this.fixViolation(newNode);
    }
    private rotateLeft(node: TreeNode): void {
        const rightChild = node.right!;
        node.right = rightChild.left;

        if (rightChild.left) {
            rightChild.left.parent = node;
        }

        rightChild.parent = node.parent;

        if (!node.parent) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }

        rightChild.left = node;
        node.parent = rightChild;
    }

    private rotateRight(node: TreeNode): void {
        const leftChild = node.left!;
        node.left = leftChild.right;

        if (leftChild.right) {
            leftChild.right.parent = node;
        }

        leftChild.parent = node.parent;

        if (!node.parent) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }

        leftChild.right = node;
        node.parent = leftChild;
    }

    private fixViolation(node: TreeNode): void {
        while (node.parent && node.parent.type === 'red') {
            const parent = node.parent;
            const grandparent = parent.parent!;

            if (parent === grandparent.left) {
                const uncle = grandparent.right;

                if (uncle && uncle.type === 'red') {
                    // Case 1: Uncle is red - recolor
                    parent.type = 'black';
                    uncle.type = 'black';
                    grandparent.type = 'red';
                    node = grandparent;
                } else {
                    if (node === parent.right) {
                        // Case 2: Node is right child - left rotate
                        node = parent;
                        this.rotateLeft(node);
                    }
                    // Case 3: Node is left child - right rotate
                    node.parent!.type = 'black';
                    grandparent.type = 'red';
                    this.rotateRight(grandparent);
                }
            } else {
                const uncle = grandparent.left;

                if (uncle && uncle.type === 'red') {
                    // Case 1: Uncle is red - recolor
                    parent.type = 'black';
                    uncle.type = 'black';
                    grandparent.type = 'red';
                    node = grandparent;
                } else {
                    if (node === parent.left) {
                        // Case 2: Node is left child - right rotate
                        node = parent;
                        this.rotateRight(node);
                    }
                    // Case 3: Node is right child - left rotate
                    node.parent!.type = 'black';
                    grandparent.type = 'red';
                    this.rotateLeft(grandparent);
                }
            }
        }

        this.root!.type = 'black';
    }
}








export { RedBlackTree, isHeapValid, buildHeap, buildHeap2, TreeNode, rotateLeft, rotateRight, fixViolations, rnbInsert, buildBST, insertBST, isAvlBalanced, updateHeights, balanceFactor, buildAVLTree, traverseInOrder, traversePreOrder, traversePostOrder };

