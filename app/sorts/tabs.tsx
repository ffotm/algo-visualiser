'use client'
import React, { useState } from 'react'
import PillNav from '../algorithms/pillNav'
import '../algorithms/style.css'
import Code from './code'
import { complex } from 'framer-motion'



const codeBubble = [
    { num: 1, code: 'function bubbleSort(array) {', indent: 0 },
    { num: 2, code: '  const animations = [];', indent: 1 },
    { num: 3, code: '  const arr = array.slice();', indent: 1 },
    { num: 4, code: '  ', indent: 0 },
    { num: 5, code: '  for (let i = 0; i < arr.length - 1; i++) {', indent: 1 },
    { num: 6, code: '    for (let j = 0; j < arr.length - i - 1; j++) {', indent: 2 },
    { num: 7, code: '      // Compare adjacent elements', indent: 3 },
    { num: 8, code: '      animations.push({', indent: 3 },
    { num: 9, code: '        type: \'compare\',', indent: 4 },
    { num: 10, code: '        i: j,', indent: 4 },
    { num: 11, code: '        j: j + 1', indent: 4 },
    { num: 12, code: '      });', indent: 3 },
    { num: 13, code: '      ', indent: 0 },
    { num: 14, code: '      // Swap if left > right', indent: 3 },
    { num: 15, code: '      if (arr[j] > arr[j + 1]) {', indent: 3 },
    { num: 16, code: '        animations.push({', indent: 4 },
    { num: 17, code: '          type: \'swap\',', indent: 5 },
    { num: 18, code: '          i: j,', indent: 5 },
    { num: 19, code: '          j: j + 1', indent: 5 },
    { num: 20, code: '        });', indent: 4 },
    { num: 21, code: '        ', indent: 0 },
    { num: 22, code: '        [arr[j], arr[j + 1]] = ', indent: 4 },
    { num: 23, code: '          [arr[j + 1], arr[j]];', indent: 5 },
    { num: 24, code: '      }', indent: 3 },
    { num: 25, code: '    }', indent: 2 },
    { num: 26, code: '  }', indent: 1 },
    { num: 27, code: '  ', indent: 0 },
    { num: 28, code: '  return animations;', indent: 1 },
    { num: 29, code: '}', indent: 0 },
];
const codeMerge = [
    { num: 1, code: 'function mergeSort(arr, start, end) {', indent: 0 },
    { num: 2, code: '  if (start >= end) return;', indent: 1 },
    { num: 3, code: '  const mid = Math.floor((start + end) / 2);', indent: 1 },
    { num: 4, code: '  mergeSort(arr, start, mid);', indent: 1 },
    { num: 5, code: '  mergeSort(arr, mid + 1, end);', indent: 1 },
    { num: 6, code: '  merge(arr, start, mid, end);', indent: 1 },
    { num: 7, code: '}', indent: 0 },
    { num: 8, code: 'function merge(arr, start, mid, end) {', indent: 0 },
    { num: 9, code: '  while (left && right) {', indent: 1 },
    { num: 10, code: '    if (left <= right)', indent: 2 },
    { num: 11, code: '      overwrite value', indent: 3 },
    { num: 12, code: '}', indent: 0 },
];
const codeQuick = [
    { num: 1, code: 'function quickSort(arr, low, high) {', indent: 0 },
    { num: 2, code: '  if (low < high) {', indent: 1 },
    { num: 3, code: '    pivotIndex = partition(arr, low, high);', indent: 2 },
    { num: 4, code: '    quickSort(arr, low, pivotIndex - 1);', indent: 2 },
    { num: 5, code: '    quickSort(arr, pivotIndex + 1, high);', indent: 2 },
    { num: 6, code: '}', indent: 0 },
    { num: 7, code: 'function partition(arr, low, high) {', indent: 0 },
    { num: 8, code: '  pivot = arr[high];', indent: 1 },
    { num: 9, code: '  for (j = low; j < high; j++) {', indent: 1 },
    { num: 10, code: '    if (arr[j] <= pivot)', indent: 2 },
    { num: 11, code: '      swap(arr[i], arr[j])', indent: 3 },
    { num: 12, code: '  swap(arr[i + 1], arr[high])', indent: 1 },
    { num: 13, code: '}', indent: 0 },
];



const Tabss = ({ algo, setAlgo, highlightedLine }: any) => {


    const [showCode, setShowCode] = useState(false);
    const navItems = [
        { label: 'Bubble Sort', href: '#bubble-sort' },
        { label: 'Merge Sort', href: '#merge-sort' },
        { label: 'Quick Sort', href: '#quick-sort' },
        { label: 'Insertion Sort', href: '#insertion-sort' },
        { label: 'Selection Sort', href: '#selection-sort' },
        { label: 'Heap Sort', href: '#heap-sort' },
    ];

    const handleItemClick = (href: string) => {
        setAlgo(href.replace('#', ''));
    };

    const algoInfo: any = {
        'bubble-sort': {
            name: "Bubble Sort",
            description: "Simple comparison-based sort. Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
            complexity: "Time: O(n^2) | Space: O(1)",
            pseudocode: codeBubble.map(line => line.code).join('\n')
        },
        'merge-sort': {
            name: "Merge Sort",
            description: "Divide and conquer algorithm that divides the array into halves, sorts them, and merges them back.",
            complexity: "Time: O(n log n) | Space: O(n)",
            pseudocode: codeMerge.map(line => line.code).join('\n')
        },
        'quick-sort': {
            name: "Quick Sort",
            description: "Efficient sorting algorithm using divide and conquer. Selects a 'pivot' and partitions the array around the pivot.",
            complexity: "Time: O(n log n) on average | Space: O(log n)",
            pseudocode: codeQuick.map(line => line.code).join('\n')
        },
        'insertion-sort': {
            name: "Insertion Sort",
            description: "Builds the final sorted array one item at a time. Efficient for small data sets and mostly sorted arrays.",
            complexity: "Time: O(n^2) | Space: O(1)"
        }, 'selection-sort': {
            name: "Selection Sort",
            description: "Divides the input list into two parts: a sorted and an unsorted region. Repeatedly selects the smallest (or largest) element from the unsorted region and moves it to the end of the sorted region.",
            complexity: "Time: O(n^2) | Space: O(1)"
        },
        'heap-sort': {
            name: "Heap Sort",
            description: "Comparison-based sorting algorithm that uses a binary heap data structure. Builds a max heap and repeatedly extracts the maximum element to sort the array.",
            complexity: "Time: O(n log n) | Space: O(1)"
        },

    };

    const currentAlgo = algoInfo[algo];

    let whichcode = [];
    if (algo === 'bubble-sort') {
        whichcode = codeBubble;
    } else if (algo === 'merge-sort') {
        whichcode = codeMerge;
    } else if (algo === 'quick-sort') {
        whichcode = codeQuick;
    }

    return (
        <div className="w-full mb-6">

            <PillNav items={navItems} activeHref={`#${algo}`} onItemClick={handleItemClick} className='ml-35' />

            <div className="bg-green-950 rounded-xl p-6 shadow-lg border border-var(--border) ">
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
            {showCode && (

                <Code whichcode={whichcode} highlightedLine={highlightedLine} />
            )}
        </div>
    );
};
export default Tabss;