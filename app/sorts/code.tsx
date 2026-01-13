'use client'

import React, { useState } from 'react';

type CodeLine = {
    num: number;
    indent: number;
    code: string;
};

const codeBubble: CodeLine[] = [
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

// You can type other algorithms similarly
const codeMerge: CodeLine[] = [
    { num: 1, code: 'function mergeSort(arr, start, end) {', indent: 0 },
    { num: 2, code: '  if (start >= end) return;', indent: 1 },
    { num: 3, code: '  const mid = Math.floor((start + end) / 2);', indent: 1 },
    { num: 4, code: '  mergeSort(arr, start, mid);', indent: 1 },
    { num: 5, code: '  mergeSort(arr, mid + 1, end);', indent: 1 },
    { num: 6, code: '  merge(arr, start, mid, end);', indent: 1 },
    { num: 7, code: '}', indent: 0 },
];

const codeQuick: CodeLine[] = [
    { num: 1, code: 'function quickSort(arr, low, high) {', indent: 0 },
    { num: 2, code: '  if (low < high) {', indent: 1 },
    { num: 3, code: '    pivotIndex = partition(arr, low, high);', indent: 2 },
    { num: 4, code: '    quickSort(arr, low, pivotIndex - 1);', indent: 2 },
    { num: 5, code: '    quickSort(arr, pivotIndex + 1, high);', indent: 2 },
    { num: 6, code: '}', indent: 0 },
];

interface CodeProps {
    whichcode: 'bubble' | 'merge' | 'quick' | null;
    highlightedLine?: number | null;
}

const Code: React.FC<CodeProps> = ({ whichcode, highlightedLine = null }) => {
    const [showCode, setShowCode] = useState(true);

    let codeToDisplay: CodeLine[] = [];
    if (whichcode === 'bubble') codeToDisplay = codeBubble;
    else if (whichcode === 'merge') codeToDisplay = codeMerge;
    else if (whichcode === 'quick') codeToDisplay = codeQuick;

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <button
                    onClick={() => setShowCode(!showCode)}
                    className="w-50 bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                    {showCode ? 'Hide Code' : 'Show Code'}
                    <div className="relative top-1 inline-block ml-5">
                        <svg
                            className={`w-4 h-4 transition-transform ${showCode ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>
            </div>

            {showCode && (
                <div className="relative border font-mono text-sm border-green-900/50 rounded-xl overflow-hidden bg-gradient-to-br from-green-950/40 to-black shadow-2xl shadow-green-900/20">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-green-900/50 bg-green-950/30">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <span className="text-xs text-green-400 ml-2 font-mono">
                            {whichcode === 'bubble'
                                ? 'bubbleSort.js'
                                : whichcode === 'merge'
                                    ? 'mergeSort.js'
                                    : 'quickSort.js'}
                        </span>
                    </div>

                    <div className="p-2">
                        {codeToDisplay.map((line) => (
                            <div
                                key={line.num}
                                className={`transition-all duration-200 -mx-2 px-2 py-0.5 ${highlightedLine === line.num ? 'bg-green-500/20 border-l-2 border-green-500' : ''
                                    }`}
                                style={{ paddingLeft: `${line.indent * 16}px` }}
                            >
                                <span className="text-green-700 select-none mr-4 inline-block w-6 text-right text-xs">{line.num}</span>
                                <span className="text-green-300">{line.code}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Code;
