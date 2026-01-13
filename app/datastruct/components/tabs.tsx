'use client'
import React, { useState } from 'react'
import PillNav from '../../algorithms/pillNav'
import '../../algorithms/style.css'
import { complex } from 'framer-motion'


const Tabss = ({ algo, setAlgo }: any) => {

    const [showCode, setShowCode] = useState(false);


    const navItems = [
        { label: 'BST Tree', href: '#bst-tree' },
        { label: 'AVL Tree', href: '#avl-tree' },
        { label: 'Red-Black Tree', href: '#red-black-tree' },
        { label: 'Heap', href: '#heap' },
        { label: 'Hash Table', href: '#hash-table' }

    ];

    const handleItemClick = (href: string) => {
        setAlgo(href.replace('#', ''));
    };

    const algoInfo: any = {
        'bst-tree': {
            name: "BST Tree",
            description: "Binary Search Tree is a node-based binary tree data structure which has the following properties: The left subtree of a node contains only nodes with keys lesser than the node’s key. The right subtree of a node contains only nodes with keys greater than the node’s key.",
            complexity: "Time: O(log n) | Space: O(n)",
        },
        'avl-tree': {
            name: "AVL Tree",
            description: "An AVL tree is a self-balancing Binary Search Tree (BST) where the difference between heights of left and right subtrees cannot be more than one for all nodes.",
            complexity: "Time: O(log n) | Space: O(n)",
        },
        'red-black-tree': {
            name: "Red-Black Tree",
            description: "A Red-Black tree is a self-balancing binary search tree where each node has an extra bit for storing color information. The color of each node is either red or black.",
            complexity: "Time: O(log n) | Space: O(n)",
        },
        'heap': {
            name: "Heap",
            description: "A heap is a specialized tree-based data structure that satisfies the heap property. It's commonly used in priority queues and heap sort.",
            complexity: "Time: O(log n) | Space: O(n)",
        },
        'hash-table': {
            name: "Hash Table",
            description: "A hash table (or hash map) is a data structure that implements an associative array abstract data type, a structure that maps keys to values.",
            complexity: "Time (average): O(1) | Space: O(n)",
        }
    };

    const currentAlgo = algoInfo[algo];


    return (
        <div className="w-full mb-6">

            <PillNav items={navItems} activeHref={`#${algo}`} onItemClick={handleItemClick} className='ml-70' />

            <div className="bg-gradient-to-r from-green-950 to-emerald-900 rounded-xl p-6 shadow-lg border border-var(--border) ">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">{currentAlgo.name}</h2>
                        <p className="text-gray-300 text-sm mb-3">{currentAlgo.description}</p>
                        <p className="text-green-400 text-xs font-mono">{currentAlgo.complexity}</p>

                    </div>

                    <button
                        onClick={() => setShowCode(!showCode)}
                        className="ml-4 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                        {showCode ? 'Hide Code' : 'Show Code'}
                        <svg
                            className={`w-4 h-4 transition-transform ${showCode ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>


            </div>

        </div>
    );
};
export default Tabss;

