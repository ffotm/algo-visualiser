'use client'
import React, { useEffect, useRef } from 'react'
import Tabss from './tabs'
import { useState } from 'react'
import '../algorithms/style.css'
import '../globals.css'
import getBubbleSortAnimations from './bubbleSort'
import getMergeSortAnimations from './mergeSort'
import animateSwap from './bubble'
import getQuickSortAnimations from './quickSort'
import Code from './code'
import { useAlgoContext } from '../algoContext'


const PRIMARY_COLOR = 'linear-gradient(to right, #16a34a, #047857)'; // unsorted
const COMPARE_COLOR = 'linear-gradient(to right, #fbbf24, #f59e0b)';
const PIVOT_COLOR = 'linear-gradient(to right, #a855f7, #7c3aed)';
const ACTIVE_COLOR = 'linear-gradient(to right, #3b82f6, #2563eb)';
const SORTED_COLOR = 'linear-gradient(to right, #22c55e, #16a34a)';
const SWAP_COLOR = 'linear-gradient(to right, #ef4444, #dc2626)';



const Sortspage = () => {
    const [algo, setAlgo] = useState('bubble-sort');
    const [array, setArray] = useState<number[]>([]);
    const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false)
    const sectionRef = useRef(null)
    const animationRef = useRef(null)
    const [l, setL] = useState(20);
    const whichcode = algo === 'bubble-sort' ? 'bubble' : algo === 'merge-sort' ? 'merge' : 'quick';
    const [input, setInput] = useState("");


    const { setAlgoContext } = useAlgoContext();

    useEffect(() => {
        setAlgoContext({
            section: "sorts",
            algo: algo,
            table: input,
        });
    }, [algo, input]);


    const createArray = (l: number) => {
        const arr = []
        for (let i = 0; i < l; i++) {
            arr.push(Math.floor(Math.random() * 100) + 10)

        }
        setInput(arr.toString());
        return arr;
    }

    React.useEffect(() => {
        setArray(createArray(l));

    }, [l]);

    const width = 600 / l - 4;

    const [showParameters, setShowParameters] = useState(true);
    const [speed, setSpeed] = useState(250);

    const [isRunning, setIsRunning] = useState(false);

    const visualize = () => {
        if (isRunning) return;

        setIsRunning(true);
        const bars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < bars.length; i++) {
            const barE = bars[i] as HTMLElement;
            barE.style.backgroundImage = PRIMARY_COLOR;
        }

        switch (algo) {
            case 'bubble-sort':
                const bubbleSortAnimations = getBubbleSortAnimations(array);
                animateBubbleSort(bubbleSortAnimations, bars);
                break;
            case 'merge-sort':
                const mergeSortAnimations = getMergeSortAnimations(array);
                animateMergeSort(mergeSortAnimations, bars);
                break;
            case 'quick-sort':
                const quickSortAnimations = getQuickSortAnimations(array);
                animateQuickSort(quickSortAnimations, bars);
                break;
            default:
                break;
        }
    }
    const quickLineMap = {
        pivotStart: 8,   // pivot = arr[high]
        compare: 10,     // if (arr[j] <= pivot)
        swap: 11,        // swap(arr[i], arr[j])
        pivotEnd: 12,    // final pivot swap
    };


    const animateQuickSort = (animations: any[], bars: HTMLCollectionOf<HTMLElement> | any) => {
        animations.forEach((animation, idx) => {
            setTimeout(() => {
                const { type } = animation;

                if (type === 'pivot-start') {
                    setHighlightedLine(quickLineMap['pivotStart']);
                    const { pivot } = animation;
                    bars[pivot].style.backgroundImage = PIVOT_COLOR;
                }

                else if (type === 'pivot-end') {
                    setHighlightedLine(quickLineMap['pivotEnd']);
                    const { pivot } = animation;
                    bars[pivot].style.backgroundImage = SORTED_COLOR;
                }

                else if (type === 'compare') {
                    setHighlightedLine(quickLineMap['compare']);
                    const { i } = animation;
                    bars[i].style.backgroundImage = COMPARE_COLOR;

                    setTimeout(() => {
                        bars[i].style.backgroundImage = PRIMARY_COLOR;
                    }, speed);
                }

                else if (type === 'swap') {
                    setHighlightedLine(quickLineMap['swap']);
                    const { i, j } = animation;

                    setArray(prev => {
                        const newArr = [...prev];
                        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                        return newArr;
                    });
                }

                if (idx === animations.length - 1) {
                    setHighlightedLine(null);
                    setTimeout(() => setIsRunning(false), speed);

                }

            }, idx * speed);
        });
    };

    const bubbleLineMap = {
        compare: 7,   // "// Compare adjacent elements"
        swap: 15,     // "if (arr[j] > arr[j + 1])"
    };


    const animateBubbleSort = async (animations: any[], bars: HTMLCollectionOf<HTMLElement> | any) => {
        for (let idx = 0; idx < animations.length; idx++) {
            const animation = animations[idx];
            const { type, i, j } = animation;

            await new Promise<void>(resolve => {
                if (type === 'compare') {
                    const highlighted = bubbleLineMap['compare'];
                    setHighlightedLine(highlighted);

                    bars[i].style.backgroundImage = COMPARE_COLOR;
                    bars[j].style.backgroundImage = COMPARE_COLOR;
                    setTimeout(() => {
                        bars[i].style.backgroundImage = PRIMARY_COLOR;
                        bars[j].style.backgroundImage = PRIMARY_COLOR;
                        resolve();
                    }, speed);

                } else if (type === 'swap') {
                    const highlighted = bubbleLineMap['swap'];
                    setHighlightedLine(highlighted);

                    animateSwap(i, j, speed, () => {
                        setArray(prev => {
                            const newArr = [...prev];
                            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                            return newArr;
                        });
                        setHighlightedLine(null);
                        resolve();
                    });
                }
            });
        }

        setIsRunning(false);
    }
    const mergeLineMap = {
        range: 6,       // merge(arr, start, mid, end)
        compare: 10,    // if (left <= right)
        overwrite: 11,  // overwrite value
    };



    const animateMergeSort = async (animations: any[], bars: HTMLCollectionOf<HTMLElement> | any) => {
        for (let idx = 0; idx < animations.length; idx++) {
            const animation = animations[idx];
            const { type } = animation;

            if (type === 'range') {
                setHighlightedLine(mergeLineMap['range']);
                const { start, end } = animation;
                for (let i = start; i <= end; i++) {
                    bars[i].style.backgroundImage = ACTIVE_COLOR;
                }
            }

            else if (type === 'compare') {
                setHighlightedLine(mergeLineMap['compare']);
                const [i, j] = animation.indices;
                bars[i].style.backgroundImage = COMPARE_COLOR;
                bars[j].style.backgroundImage = COMPARE_COLOR;

                await new Promise<void>(resolve =>
                    setTimeout(() => {

                        bars[i].style.backgroundImage = ACTIVE_COLOR;
                        bars[j].style.backgroundImage = ACTIVE_COLOR;
                        resolve();
                    }, speed)
                );
            }

            else if (type === 'overwrite') {
                const { index, value } = animation;
                setHighlightedLine(mergeLineMap['overwrite']);
                bars[index].style.backgroundImage = SWAP_COLOR;

                await new Promise<void>(resolve =>
                    setTimeout(() => {
                        setArray(prev => {
                            const newArr = [...prev];
                            newArr[index] = value;
                            return newArr;
                        });
                        bars[index].style.backgroundImage = ACTIVE_COLOR;
                        setHighlightedLine(null);
                        resolve();
                    }, speed)
                );
            }
        }

        setIsRunning(false);
    };


    return (
        <div className="min-h-screen bg-var(--bg) text-white p-8 ">
            <div className="max-w-7xl  mt-20 ">
                <Tabss algo={algo} setAlgo={setAlgo} highlightedLine={highlightedLine} />
            </div>
            <div className="flex gap-8 items-start">
                <div className="border flex-1 border-white flex flex-row p-6 rounded-2xl bg-[var(--bg)] shadow-lg m-2 items-end justify-center">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar m-1 rounded-l bg-gradient-to-r from-green-600 to-emerald-700 shadow-2xl  flex items-end justify-center transition-all duration-300"
                            key={idx}
                            style={{
                                height: `${value}px`,
                                minHeight: '40px',
                                width: `${700 / l - 3}px`
                            }}
                        >
                            <span className="m-2">{width > 20 ? value : ''}</span>
                        </div>
                    ))}
                </div>
                <div className={`w-80 bg-gradient-to-br from-green-950/20 to-black rounded-xl p-6 shadow-xl border border-green-900/30 transition-all duration-300 ${showParameters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <h3 className="text-xl font-bold mb-6 text-green-800">Controls</h3>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Array Size: <span className="text-green-400">{l}</span>
                        </label>
                        <input
                            type="range"
                            min="5"
                            max="100"
                            value={l}
                            onChange={(e) => setL(parseInt(e.target.value))}
                            className="w-full"
                            disabled={isRunning}
                        />
                    </div>

                    <div className="mb-6">
                        <button
                            onClick={() => setArray(createArray(l))}
                            className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            disabled={isRunning}
                        >
                            Generate New Array
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
                            className='bg-gradient-to-r from-green-700 to-emerald-800 p-2 w-48 rounded-l flex-grow'
                            placeholder='separate values with ,'
                            disabled={isRunning}
                            onChange={(e) => {
                                const vals = e.target.value.split(',').map(Number).filter(num => !isNaN(num));
                                setInput(e.target.value);
                                setArray(vals);
                            }}

                        />
                        <button
                            className="bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 h-10 rounded-r text-sm font-medium transition-all"
                            disabled={isRunning}>
                            Set

                        </button>
                    </div>

                    <div className="space-y-2 mb-6">
                        <button
                            onClick={visualize}
                            className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            disabled={isRunning}
                        >
                            {isRunning ? 'Visualizing...' : `Visualize ${algo.replace('-', ' ').toUpperCase()}`}
                        </button>
                    </div>
                </div>

            </div>
            <div className="relative w-80 bg-green-950 rounded-xl p-6 shadow-xl border border-var(--border) m-2 mt-10 bottom-70">
                <h2 className='font-bold mb-4'>color guide</h2>
                <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 bg-${PRIMARY_COLOR} rounded mr-2`} style={{ backgroundImage: `${PRIMARY_COLOR}` }}></div>
                    <span className="text-sm">Primary Color</span>
                </div>
                <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 bg-${SWAP_COLOR} rounded mr-2`} style={{ backgroundImage: `${SWAP_COLOR}` }}></div>
                    <span className="text-sm">Swap Color</span>
                </div>
                <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 bg-${COMPARE_COLOR} rounded mr-2`} style={{ backgroundImage: `${COMPARE_COLOR}` }}></div>
                    <span className="text-sm">Compare Color</span>
                </div>
                <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 bg-${ACTIVE_COLOR} rounded mr-2`} style={{ backgroundImage: `${ACTIVE_COLOR}` }}></div>
                    <span className="text-sm">Active Color</span>
                </div>
                <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded mr-2`} style={{ backgroundImage: `${PIVOT_COLOR}` }}></div>
                    <span className="text-sm">Pivot Color</span>
                </div>
                <div className="flex items-center mb-2">
                    <div className={`w-4 h-4 rounded mr-2`} style={{ backgroundImage: `${SORTED_COLOR}` }}></div>
                    <span className="text-sm">Sorted Color</span>
                </div>
            </div>
            <div className="m-4 bottom-150 relative w-120 left-85 ">
                <Code whichcode={whichcode} highlightedLine={highlightedLine} />
            </div>
        </div>
    )
}

export default Sortspage