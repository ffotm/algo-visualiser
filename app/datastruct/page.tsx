'use client'
import React, { use, useRef } from 'react'
import Tabss from './components/tabs'
import { useState, useEffect } from 'react'
import Tree from './components/treevis'
import { buildBST, fixViolations, rnbInsert, RedBlackTree, traverseInOrder, rotateLeft, rotateRight, insertBST, traversePostOrder, traversePreOrder, TreeNode, balanceFactor, updateHeights, buildAVLTree, isAvlBalanced } from './components/tree'
import Avl from './components/avl'
import { animateRotationWithQueue } from './components/animate'
import Rnb from './components/rnb'





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
    const treeRef = useRef<RedBlackTree | null>(null)
    const [inputValue, setInputValue] = useState('');

    const initRBT = () => {
        treeRef.current = new RedBlackTree()
        setRoot(null)
    }
    const insertRBTValues = (vals: number[]) => {
        if (!treeRef.current) {
            treeRef.current = new RedBlackTree()
        }

        vals.forEach(v => {
            treeRef.current!.rnbInsert(v)
        })

        // IMPORTANT: do NOT spread the root
        setRoot(treeRef.current.root)
    }
    const clearRnb = () => {
        treeRef.current = new RedBlackTree()
        setRoot(null)

    }


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


    const handleRotate = () => {
        if (!root || isRunning) return

        animateRotationWithQueue({
            root,
            speed: speed * 2,
            setRoot,
            setHighlightedNodes,
            setIsRunning
        })
    }

    const getredNodes = (node: TreeNode | null) => {
        const redNodes = [];

        if (!node) return;
        if (node.type === 'red') {
            redNodes.push(node.id);
        }
        getredNodes(node.left);
        getredNodes(node.right);
        return redNodes;
    }

    const generateRandomrnb = () => {
        treeRef.current = new RedBlackTree();
        const values = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
        values.forEach(v => treeRef.current.rnbInsert(v));
        setRoot({ ...treeRef.current.root! });
    };
    let NODE_ID = 0;

    const handleManualInsert = () => {
        if (!inputValue.trim()) return;

        const vals = inputValue
            .split(',')
            .map(v => parseInt(v.trim()))
            .filter(v => !isNaN(v));

        if (vals.length === 0) return;

        if (algo === 'red-black-tree') {

            treeRef.current = new RedBlackTree();
            vals.forEach(value => {
                treeRef.current!.rnbInsert(value);
            });
            setRoot({ ...treeRef.current.root! });
        } else {

            let newRoot: TreeNode | null = null;
            vals.forEach(value => {
                newRoot = insertBST(newRoot, value);
            });
            setRoot(newRoot);
        }

        resetTraversal();
        setInputValue(''); // Clear input
    };

    useEffect(() => {
        if (algo === 'red-black-tree') {
            generateRandomrnb();
        }
    }, [algo]);

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
                            <Avl root={root} highlightedNodes={highlightedNodes} chosenColor={chosenColor} />
                        )}
                        {algo === 'red-black-tree' && (
                            <Rnb root={root} highlightedNodes={getredNodes(root)} chosenColor={chosenColor} />
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
                        {algo === 'red-black-tree' ? (
                            <button
                                onClick={generateRandomrnb}
                                className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                                disabled={isRunning}
                            >
                                Generate New Tree
                            </button>
                        ) : (<button
                            onClick={generateRandomtree}
                            className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                            disabled={isRunning}
                        >
                            Generate New Tree
                        </button>

                        )

                        }


                    </div>
                    {algo === 'avl-tree' && (
                        <div className="mb-6">

                            <button
                                onClick={handleRotate}
                                className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                                disabled={isRunning}
                            >
                                Perform Rotation
                            </button>
                        </div>)}
                    {algo === 'red-black-tree' && (
                        <div className="mb-6">
                            <button
                                onClick={() => setRoot({ ...treeRef.current!.root! })}
                                className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                                disabled={isRunning}
                            >
                                Recolor
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
                        <div className="">     <input
                            type="text"
                            className='bg-green-800 p-2 w-48 rounded-l flex-grow'
                            placeholder='separate values with ,'
                            disabled={isRunning}
                            value={inputValue} // Controlled input
                            onChange={(e) => setInputValue(e.target.value)} // Only update state
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleManualInsert();
                                }

                            }}
                        />
                            <button
                                className='bg-green-600 px-4 py-2 rounded-r hover:bg-green-500'
                                disabled={isRunning}
                                onClick={handleManualInsert} // Handle click
                            >
                                Set
                            </button>
                        </div>
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