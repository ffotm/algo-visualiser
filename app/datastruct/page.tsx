'use client'
import React from 'react'
import Tabss from './components/tabs'
import { useState, useEffect } from 'react'
import Tree from './components/treevis'
import { buildBST, traverseInOrder, traversePostOrder, traversePreOrder, TreeNode } from './components/tree'



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
    };

    const handlePreOrder = () => {
        if (!root || isRunning) return;
        const order = traversePreOrder(root);

        animateTraversal(order);
        setTraversalResult(order);
    };

    const handlePostOrder = () => {
        if (!root || isRunning) return;
        const order = traversePostOrder(root);
        setTraversalResult(order);
        animateTraversal(order);
    };
    const getNodeValues = (node, idList, values = []) => {
        if (!node) return values;
        if (idList.includes(node.id)) {
            values.push(node.value);
        }
        getNodeValues(node.left, idList, values);
        getNodeValues(node.right, idList, values);
        return values;
    };

    return (

        <div >
            <div className="pt-30">
                <Tabss algo={algo} setAlgo={setAlgo} />
            </div>
            <div className="flex flex-col md:flex-row">

                <div className="flex-1 items-center justify-center p-4">
                    <div className="border flex-1 border-white flex flex-row p-6 rounded-2xl bg-[var(--bg)] shadow-lg m-2 items-end justify-center"

                    >
                        <Tree root={root} highlightedNodes={highlightedNodes} speed={speed} />


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
                                            ? 'bg-yellow-500 text-gray-900'
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
                            max="25"
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

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Animation Speed: <span className="text-green-400">{speed}ms</span>
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="500"
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
                                const vals = e.target.value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));


                            }}

                        />
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