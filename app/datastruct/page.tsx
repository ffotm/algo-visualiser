'use client'
import React from 'react'
import Tabss from './components/tabs'
import { useState, useEffect } from 'react'
import Tree from './components/treevis'
import { buildBST, traverseInOrder, rotateLeft, rotateRight, insertBST, traversePostOrder, traversePreOrder, TreeNode, balanceFactor, updateHeights, buildAVLTree, isAvlBalanced } from './components/tree'
import Avl from './components/avl'





const datapage = () => {
    const [root, setRoot] = useState(null);
    const [treeSize, setTreeSize] = useState(7);
    const [speed, setSpeed] = useState(500);
    const [isRunning, setIsRunning] = useState(false);
    const [manualInput, setManualInput] = useState('');
    const [highlightedNodes, setHighlightedNodes] = useState([]);
    const [traversalResult, setTraversalResult] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [algo, setAlgo] = useState('bst-tree');
    const [showParameters, setShowParameters] = useState(true);
    const [chosenColor, setChosenColor] = useState('bg-yellow-500');
    const [balance, setBalance] = useState(0);
    const [animatedNodes, setAnimatedNodes] = useState<{ [key: number]: { x: number; y: number } }>({});
    const [isAnimating, setIsAnimating] = useState(false);



    const inorderColor = 'bg-yellow-500';
    const preorderColor = 'bg-purple-600';
    const postorderColor = 'bg-pink-600';

    const calculateBalance = (node: TreeNode | null): number => {
        if (!node) return 0;
        return balanceFactor(node);
    }

    const check = () => {
        if (isAvlBalanced(root)) {
            return true
        } else {
            return false
        }
    }


    const generateRandomtree = () => {
        const values: number[] = [];

        for (let i = 0; i < treeSize; i++) {
            values.push(Math.floor(Math.random() * 100) + 1);
        }

        values.sort((a, b) => a - b);

        const newRoot = buildBST(values, 0, values.length - 1);
        setRoot(newRoot);
        resetTraversal();



    };
    useEffect(() => {
        generateRandomtree()
    }, [])

    const resetTraversal = () => {
        setHighlightedNodes([]);
        setTraversalResult([]);
        setCurrentStep(0);
    };

    const animateTraversal = async (nodeOrder: number[]) => {
        setIsRunning(true)
        setHighlightedNodes([])
        setCurrentStep(0)

        for (let i = 0; i < nodeOrder.length; i++) {
            setHighlightedNodes([nodeOrder[i]])
            setCurrentStep(i + 1)

            await new Promise(resolve => setTimeout(resolve, speed))
        }

        setHighlightedNodes([])
        setIsRunning(false)
    }


    const handleInOrder = () => {
        if (!root || isRunning) return;
        const order = traverseInOrder(root);
        animateTraversal(order);
        setTraversalResult(order);
        setChosenColor(inorderColor);

    };

    const handlePreOrder = () => {
        if (!root || isRunning) return;
        const order = traversePreOrder(root);
        setChosenColor(preorderColor);
        animateTraversal(order);
        setTraversalResult(order);
    };

    // Add these utility functions
    const getNodePositions = (root: TreeNode | null) => {
        const positions: { [key: number]: { x: number; y: number } } = {};

        const traverse = (node: TreeNode | null, x: number, y: number, spacing: number) => {
            if (!node) return;

            positions[node.id] = { x, y };

            traverse(node.left, x - spacing, y + 100, spacing / 2);
            traverse(node.right, x + spacing, y + 100, spacing / 2);
        };

        if (root) {
            traverse(root, 0, 0, 300);
        }

        return positions;
    };

    // Helper to find a node by ID
    const findNodeById = (root: TreeNode | null, id: number): TreeNode | null => {
        if (!root) return null;
        if (root.id === id) return root;

        const left = findNodeById(root.left, id);
        if (left) return left;

        return findNodeById(root.right, id);
    };

    const handlePostOrder = () => {
        if (!root || isRunning) return;
        const order = traversePostOrder(root);
        setTraversalResult(order);
        animateTraversal(order);
        setChosenColor(postorderColor);
    };


    const getNodeValues = (node, idList) => {
        if (!node) return [];
        const idToValue = {};
        const buildMap = (n) => {
            if (!n) return;
            idToValue[n.id] = n.value;
            buildMap(n.left);
            buildMap(n.right);
        };
        buildMap(node);

        console.log(idToValue);

        return idList.map(id => idToValue[id]);
    };
    const animateRotation = async () => {
        if (!root || isRunning) return;

        setIsRunning(true);

        // Find unbalanced node
        const findUnbalanced = (node: TreeNode | null): TreeNode | null => {
            if (!node) return null;
            const bf = balanceFactor(node);
            if (Math.abs(bf) > 1) return node;

            const leftResult = findUnbalanced(node.left);
            if (leftResult) return leftResult;

            return findUnbalanced(node.right);
        };

        const unbalancedNode = findUnbalanced(root);

        if (!unbalancedNode) {
            setIsRunning(false);
            return;
        }

        // Step 1: Highlight
        setHighlightedNodes([unbalancedNode.id]);
        await new Promise(resolve => setTimeout(resolve, speed));

        const bf = balanceFactor(unbalancedNode);
        let animationTargets = {};

        // Calculate animation distances based on depth
        const depth = Math.floor(Math.log2(unbalancedNode.id + 1));
        const horizontalDistance = 100 * Math.pow(0.7, depth); // Reduce distance for deeper nodes
        const verticalDistance = 60;

        if (bf > 1) {
            // Left heavy
            if (balanceFactor(unbalancedNode.left!) < 0) {
                // LR case
                const leftChild = unbalancedNode.left!;
                const leftRightChild = leftChild.right!;

                // First rotation (left rotation on left child)
                animationTargets = {
                    [leftChild.id]: { x: horizontalDistance, y: verticalDistance },
                    [leftRightChild.id]: { x: -horizontalDistance, y: -verticalDistance }
                };

                setAnimatedNodes(animationTargets);
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Update structure
                unbalancedNode.left = rotateLeft(leftChild);
                updateHeights(unbalancedNode);

                // Reset for next animation
                setAnimatedNodes({});
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            // Second rotation (right rotation on unbalanced node)
            const leftChild = unbalancedNode.left!;
            animationTargets = {
                [unbalancedNode.id]: { x: horizontalDistance, y: verticalDistance },
                [leftChild.id]: { x: -horizontalDistance, y: -verticalDistance }
            };

        } else if (bf < -1) {
            // Right heavy
            if (balanceFactor(unbalancedNode.right!) > 0) {
                // RL case
                const rightChild = unbalancedNode.right!;
                const rightLeftChild = rightChild.left!;

                // First rotation (right rotation on right child)
                animationTargets = {
                    [rightChild.id]: { x: -horizontalDistance, y: verticalDistance },
                    [rightLeftChild.id]: { x: horizontalDistance, y: -verticalDistance }
                };

                setAnimatedNodes(animationTargets);
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Update structure
                unbalancedNode.right = rotateRight(rightChild);
                updateHeights(unbalancedNode);

                // Reset for next animation
                setAnimatedNodes({});
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            // Second rotation (left rotation on unbalanced node)
            const rightChild = unbalancedNode.right!;
            animationTargets = {
                [unbalancedNode.id]: { x: -horizontalDistance, y: verticalDistance },
                [rightChild.id]: { x: horizontalDistance, y: -verticalDistance }
            };
        }

        // Apply main animation
        setAnimatedNodes(animationTargets);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Perform the actual rotation
        let newRoot;
        if (bf > 1) {
            newRoot = rotateRight(unbalancedNode);
        } else {
            newRoot = rotateLeft(unbalancedNode);
        }

        // IMPORTANT: Use a deep copy to trigger re-render while preserving animation
        const updatedRoot = JSON.parse(JSON.stringify(root));

        // Replace the unbalanced node in the copied tree
        const replaceNode = (node: TreeNode | null, targetId: number, newNode: TreeNode): TreeNode | null => {
            if (!node) return null;
            if (node.id === targetId) return newNode;

            node.left = replaceNode(node.left, targetId, newNode);
            node.right = replaceNode(node.right, targetId, newNode);
            return node;
        };

        const finalRoot = replaceNode(updatedRoot, unbalancedNode.id, newRoot);
        updateHeights(finalRoot);

        // Update tree AFTER animation
        setRoot(finalRoot);

        // Clean up
        await new Promise(resolve => setTimeout(resolve, 300));
        setAnimatedNodes({});
        setHighlightedNodes([]);
        setIsRunning(false);
    };
    return (

        <div >
            <div className="pt-30">
                <Tabss algo={algo} setAlgo={setAlgo} />
            </div>
            <div className="flex flex-col md:flex-row">

                <div className="flex-1 items-center justify-center p-4">
                    <div className="border border-white py-10 rounded-2xl bg-[var(--bg)] shadow-lg items-end justify-center"

                    >
                        {algo === 'bst-tree' && (
                            <Tree root={root} highlightedNodes={highlightedNodes} chosenColor={chosenColor} />
                        )}
                        {algo === 'avl-tree' && (
                            <Avl root={root} highlightedNodes={highlightedNodes} animatingNodes={animatedNodes} chosenColor={chosenColor} />
                        )}



                    </div>
                    {traversalResult.length > 0 && (
                        <div className="mt-8 p-4 bg-gray-700 rounded-lg m-2" style={{ width: `${traversalResult.length * 60}px` }}>
                            <h4 className="text-sm font-bold text-green-400 mb-2">
                                Traversal Progress ({currentStep}/{traversalResult.length})
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {getNodeValues(root, traversalResult).map((val, idx) => (
                                    <span
                                        key={idx}
                                        className={`px-3 py-1 rounded ${idx < currentStep
                                            ? `${chosenColor} text-gray-900`
                                            : 'bg-gray-600 text-gray-300'
                                            } font-bold transition-all duration-300`}
                                    >
                                        {val}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className={`w-80 bg-green-950 rounded-xl p-6 shadow-xl border border-var(--border) transition-all duration-300 ${showParameters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <h3 className="text-xl font-bold mb-6 text-green-800">Controls</h3>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Tree Size: <span className="text-green-400">{treeSize}</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="15"
                            value={treeSize}
                            onChange={(e) => setTreeSize(parseInt(e.target.value))}
                            className="w-full"
                            disabled={isRunning}

                        />
                    </div>

                    <div className="mb-6">
                        <button
                            onClick={generateRandomtree}
                            className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                            disabled={isRunning}
                        >
                            Generate New Tree
                        </button>
                    </div>
                    {algo === 'avl-tree' && (
                        <div className="mb-6">

                            <button
                                onClick={() => animateRotation(root)}
                                className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                                disabled={isRunning}
                            >
                                Perform Rotation
                            </button>
                        </div>)}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Animation Speed: <span className="text-green-400">{speed}ms</span>
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="1000"
                            value={speed}
                            onChange={(e) => setSpeed(parseInt(e.target.value))}
                            className="w-full"
                            disabled={isRunning}
                        />
                    </div>

                    <div className="mb-6">
                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                            Set values manually:
                        </label>
                        <input
                            type="text"
                            className='ml-2 bg-green-800 p-1 w-48 rounded-l'
                            placeholder='separate values with ,'
                            disabled={isRunning}
                            onChange={(e) => {
                                const vals = e.target.value
                                    .split(',')
                                    .map(v => parseInt(v.trim()))
                                    .filter(v => !isNaN(v))

                                if (vals.length === 0) return

                                let newRoot: TreeNode | null = null


                                vals.forEach(value => {
                                    newRoot = insertBST(newRoot, value)
                                })

                                setRoot(newRoot)
                                resetTraversal()
                            }}></input>
                        <button
                            className='bg-green-600 px-2 py-1 rounded-r hover:bg-green-500'
                            disabled={isRunning}>
                            Set

                        </button>
                    </div>
                    {root && (
                        <>
                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-green-400 mb-3">Traversals</h4>
                                <div className="space-y-2">
                                    <button
                                        onClick={handleInOrder}
                                        className="w-full bg-amber-400 hover:bg-amber-500 px-2 py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
                                        disabled={isRunning}
                                    >
                                        In-Order (Left → Root → Right)
                                    </button>
                                    <button
                                        onClick={handlePreOrder}
                                        className="w-full bg-purple-600 hover:bg-purple-700 px-2 py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
                                        disabled={isRunning}
                                    >
                                        Pre-Order (Root → Left → Right)
                                    </button>
                                    <button
                                        onClick={handlePostOrder}
                                        className="w-full bg-pink-600 hover:bg-pink-700 px-2 py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
                                        disabled={isRunning}
                                    >
                                        Post-Order (Left → Right → Root)
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-700 rounded-lg">
                                <h4 className="text-sm font-bold text-green-400 mb-2">Tree Info</h4>
                                <p className="text-xs text-gray-300">Root: {root.value}</p>
                                <p className="text-xs text-gray-300 mt-1">
                                    Balanced BST structure
                                </p>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>

    )
}

export default datapage