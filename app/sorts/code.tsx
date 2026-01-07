'use client'
import React, { useState } from 'react'

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




const Code = ({ whichcode, highlightedLine }) => {
    const [showCode, setShowCode] = useState(true);

    if (whichcode === 'bubble') {
        whichcode = codeBubble;
    } else if (whichcode === 'merge') {
        whichcode = codeMerge;
    }
    else if (whichcode === 'quick') {
        whichcode = codeQuick;
    }

    return (
        <div className="">
            <div className="flex items-center justify-between mb-2">
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




            {showCode && (

                <div className="mt-4 p-4 rounded-lg bg-gray-900 border border-gray-700 overflow-x-auto">

                    {whichcode.map((line) => (
                        <div
                            key={line.num}
                            className={`transition-colors duration-200 ${highlightedLine === line.num
                                ? 'bg-yellow-500/30 -mx-2 px-2'
                                : ''
                                }`}
                        >
                            <span className="text-gray-500 select-none mr-4 inline-block w-6 text-right">
                                {line.num}
                            </span>
                            <span>{line.code}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>);
}



export default Code