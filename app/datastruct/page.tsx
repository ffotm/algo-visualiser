'use client'
import React, { use, useRef } from 'react'
import Tabss from './components/tabs'
import { useState, useEffect } from 'react'
import Tree from './components/treevis'
import { buildBST, fixViolations, buildHeap, RedBlackTree, traverseInOrder, rotateLeft, rotateRight, insertBST, traversePostOrder, traversePreOrder, TreeNode, balanceFactor, updateHeights, buildAVLTree, isAvlBalanced, isHeapValid, buildHeap2 } from './components/tree'
import Avl from './components/avl'
import { animateRotationWithQueue } from './components/animate'
import Rnb from './components/rnb'
import Heap from './components/heap'
import { head } from 'framer-motion/client'
import build from 'next/dist/build'
import { Checkbox } from 'radix-ui'
import HeapArray from './components/heaparray'
import { useAlgoContext } from '../algoContext'






const datapage = () => {
    const [root, setRoot] = useState<TreeNode | null>(null);
    const [treeSize, setTreeSize] = useState(7);
    const [speed, setSpeed] = useState(500);
    const [isRunning, setIsRunning] = useState(false);
    const [manualInput, setManualInput] = useState('');
    const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
    const [traversalResult, setTraversalResult] = useState<number[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [algo, setAlgo] = useState('bst-tree');
    const [showParameters, setShowParameters] = useState(true);
    const [chosenColor, setChosenColor] = useState('bg-gradient-to-r from-yellow-400 to-yellow-800');
    const treeRef = useRef<RedBlackTree | null>(null)
    const [inputValue, setInputValue] = useState('');
    const [heaptype, setHeaptype] = useState('max-heap');
    const [showIndex, setShowIndex] = useState(true);
    const [indices, setIndices] = useState<number[] | any>([]);
    const [heapArray, setHeapArray] = useState<number[]>([]);

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

        // bch ndjibo function m class
        setRoot(treeRef.current.root)
    }
    const clearRnb = () => {
        treeRef.current = new RedBlackTree()
        setRoot(null)

    }


    const { setAlgoContext } = useAlgoContext();

    useEffect(() => {
        setAlgoContext({
            section: "datastructs",
            algo: algo,
            table: indices,
        });
    }, [algo, indices]);

    const inorderColor = 'bg-gradient-to-r from-yellow-400 to-yellow-800';
    const preorderColor = 'bg-gradient-to-r from-purple-600 to-purple-800';
    const postorderColor = 'bg-gradient-to-r from-pink-600 to-pink-800';

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



        if (algo == 'heap' && heaptype == 'min-heap') {
            values.sort((a, b) => a - b);
            const newRoot = buildHeap(values);
            setRoot(newRoot);
            resetTraversal();
            console.log("heap");
            console.log(algo);
        }
        else if (algo == 'heap' && heaptype == 'max-heap') {
            values.sort((a, b) => b - a);
            const newRoot = buildHeap(values);
            setRoot(newRoot);
            resetTraversal();
            console.log("heap");
            console.log(algo);

        } else {
            values.sort((a, b) => a - b);
            const newRoot = buildBST(values, 0, values.length - 1);
            setRoot(newRoot);
            resetTraversal();
            console.log("bst");
            console.log(algo);

        }



    };
    useEffect(() => {
        generateRandomtree()
    }, [])



    const resetTraversal = () => {
        setHighlightedNodes([]);
        setTraversalResult([]);
        setCurrentStep(0);

    };

    const animateTraversal = async (nodeOrder: any[]) => {
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


    const getNodeValues = (node: TreeNode | null, idList: number[]) => {
        if (!node) return [];
        const idToValue: { [key: number]: number } = {};
        const buildMap = (n: TreeNode | null) => {
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

    const getredNodes = (node: TreeNode | null): number[] => {
        const redNodes: number[] = [];

        if (!node) return [];
        if (node.type === 'red') {
            redNodes.push(node.id);
        }
        getredNodes(node.left);
        getredNodes(node.right);
        return redNodes;
    }

    const generateRandomrnb = () => {
        treeRef.current = new RedBlackTree() || null;
        const values = Array.from({ length: treeSize }, () => Math.floor(Math.random() * 100) + 1);
        values.forEach(v => treeRef.current!.rnbInsert(v));
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
        const i: number[] | any = [];
        const h: number[] = [];
        let t: number[] | null = null;



        if (algo === 'red-black-tree') {
            i.push(...vals);
            treeRef.current = new RedBlackTree();
            vals.forEach(value => {
                treeRef.current!.rnbInsert(value);

            });
            setRoot({ ...treeRef.current.root! });
        } else if (algo === 'heap' && heaptype === 'min-heap') {
            i.push(...vals);
            vals.sort((a, b) => a - b);
            h.push(...vals);
            const newRoot = buildHeap(vals);
            t = buildHeap2(vals);
            setRoot(newRoot);


        } else if (algo === 'heap' && heaptype === 'max-heap') {
            i.push(...vals);
            vals.sort((a, b) => b - a);
            h.push(...vals);
            const newRoot = buildHeap(vals);
            t = buildHeap2(vals);
            setRoot(newRoot);


        }


        else {

            let newRoot: TreeNode | null = null;
            vals.forEach(value => {

                newRoot = insertBST(newRoot, value);

            }); i.push(...vals);
            setRoot(newRoot);

        }
        setIndices(i);
        resetTraversal();
        setHeapArray(t);


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
                    {!isHeapValid(root, heaptype) && algo === 'heap' &&
                        <h1 className='font-bold text-red-700'>Heap Structure is not Valid</h1>}
                    {!isAvlBalanced(root) && (algo === 'avl-tree') &&
                        <h1 className='font-bold text-red-700'>AVL Tree is Unbalanced</h1>
                    }
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
                        {algo === 'heap' && (
                            <div className="">
                                <Heap root={root} highlightedNodes={highlightedNodes} chosenColor={chosenColor} showIndex={showIndex} heaptype={heaptype} indices={indices} />
                                <HeapArray heaptype={heaptype} heapArray={heapArray} highlight={[]} /></div>)}



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
                <div className={`w-80 bg-gradient-to-br from-green-950/20 to-black rounded-xl p-6 shadow-xl border border-green-900/30 transition-all duration-300 ${showParameters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
                                className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                disabled={isRunning}
                            >
                                Generate New Tree
                            </button>

                        ) : (
                            <div className="">
                                <button
                                    onClick={generateRandomtree}
                                    className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                    disabled={isRunning}
                                >
                                    Generate New Tree
                                </button>
                                <select
                                    value={heaptype}
                                    onChange={(e) => setHeaptype(e.target.value)}
                                    disabled={isRunning}
                                    hidden={algo !== 'heap'}

                                    className="mt-4 w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="min-heap">Min-Heap</option>
                                    <option value="max-heap">Max-Heap</option>

                                </select>
                                <input
                                    type="checkbox"
                                    className="mt-6"
                                    checked={showIndex}
                                    hidden={algo !== 'heap'}
                                    onChange={(e) => setShowIndex(e.target.checked)}
                                />                                <label hidden={algo !== 'heap'} className="ml-2 text-gray-300 font-bold ">Show Indices</label>
                            </div>
                        )

                        }


                    </div>
                    {algo === 'avl-tree' && (
                        <div className="mb-6">

                            <button
                                onClick={handleRotate}

                                className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                disabled={isRunning}
                            >
                                Perform Rotation
                            </button>
                        </div>)}
                    {algo === 'red-black-tree' && (
                        <div className="mb-6">
                            <button
                                onClick={generateRandomrnb}
                                className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                disabled={isRunning}
                            >
                                Recolor
                            </button>
                        </div>)}{
                        algo === 'heap' && !isHeapValid(root, heaptype) && (
                            <div className="mb-6">
                                <button
                                    onClick={generateRandomtree}
                                    className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                    disabled={isRunning}
                                >
                                    Heapify
                                </button>

                            </div>
                        )
                    }

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
                            className='bg-gradient-to-r from-green-700 to-emerald-800 p-2 w-48 rounded-l flex-grow'
                            placeholder='separate values with ,'
                            disabled={isRunning}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleManualInsert();
                                }

                            }}
                        />

                            <button
                                className="bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 h-10 rounded-r text-sm font-medium transition-all"
                                disabled={isRunning}
                                onClick={handleManualInsert}
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

                                        className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                        disabled={isRunning}
                                    >
                                        In-Order (Left → Root → Right)
                                    </button>
                                    <button
                                        onClick={handlePreOrder}

                                        className="w-full bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-600 hover:to-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                        disabled={isRunning}
                                    >
                                        Pre-Order (Root → Left → Right)
                                    </button>
                                    <button
                                        onClick={handlePostOrder}
                                        className="w-full bg-gradient-to-r from-pink-600 to-pink-800 hover:from-pink-600 hover:to-pink-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                        disabled={isRunning}
                                    >
                                        Post-Order (Left → Right → Root)
                                    </button>
                                </div>
                            </div>


                            <div className="pt-6 border-t border-green-900/30">
                                <h4 className="text-sm font-bold text-green-500 mb-3">Tree Info</h4>
                                <div className="bg-black/40 rounded-lg p-3 border border-green-900/20">
                                    <p className="text-xs text-gray-300">Root: {root.value}</p></div>
                                <div className="bg-black/40 rounded-lg p-3 border border-green-900/20">
                                    <p className="text-xs text-gray-300 mt-1">
                                        Balanced BST structure
                                    </p></div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>

    )
}

export default datapage