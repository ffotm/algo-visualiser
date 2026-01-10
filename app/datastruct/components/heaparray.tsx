'use client'
import React from 'react';
import { TreeNode } from './tree';


type HeapArrayProps = {
    heapArray: number[];
    highlight?: number[];
    heaptype: string;
};

const HeapArray: React.FC<HeapArrayProps> = ({ heaptype, heapArray, highlight = [] }) => {
    const getNodeIndex = (node: TreeNode) => node.id;
    return (
        <div className="flex flex-col items-center mt-6">

            <h3 className="text-green-400 font-bold mb-2">Heap Array Representation</h3>

            <div className="flex gap-4">
                {heapArray.map((val, idx) => {
                    const isHighlighted = highlight.includes(idx);
                    console.log("Rendering index:", idx, "Highlighted:", isHighlighted);
                    console.log("Value at index:", val);
                    return (
                        <div key={idx} className="flex flex-col items-center">

                            <div
                                className={`w-12 h-12 flex items-center justify-center font-bold rounded-lg border-2 transition-colors ${isHighlighted
                                    ? 'bg-green-500 border-white text-white'
                                    : 'bg-green-700 border-green-500 text-green-200'
                                    }`}
                            >
                                {val}
                            </div>


                            <div className="mt-1 text-sm text-gray-400">{idx}</div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 bg-gray-800 p-4 rounded-lg w-full max-w-md font-mono text-sm">
                {heaptype === 'min-heap' ? (
                    <div className="text-red-400">
                        <p className="text-red-400 font-bold">Min-Heapify (Parent &lt; Child)</p>
                        <p className="text-pink-400">&nbsp;n is a sorted array from smallest to largest</p>
                        <p className="text-yellow-400 font-extrabold">for i = (n/2)-1 downto 0:</p>
                        <p className="text-blue-400">&nbsp;&nbsp;&nbsp;&nbsp;node.left = 2*i + 1</p>
                        <p className="text-blue-400">&nbsp;&nbsp;&nbsp;&nbsp;node.right = 2*i + 2</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-red-400 font-bold">Max-Heapify (Parent &gt; Child)</p>
                        <p className="text-pink-400">&nbsp;n is a sorted array from largest to smallest</p>
                        <p className="text-yellow-400 font-extrabold">for i = (n/2)-1 downto 0:</p>
                        <p className="text-blue-400">&nbsp;&nbsp;&nbsp;&nbsp;node.left = 2*i + 1</p>
                        <p className="text-blue-400">&nbsp;&nbsp;&nbsp;&nbsp;node.right = 2*i + 2</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default HeapArray;
