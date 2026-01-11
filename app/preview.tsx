'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';

const ANIMATION_SPEED_MS = 300;
const PRIMARY_COLOR = '#15803d';
const SECONDARY_COLOR = '#16a34a';
const COMPARISON_COLOR = '#dc2626';

// Mock bubble sort animations function
const getBubbleSortAnimations = (array) => {
    const animations = [];
    const arr = array.slice();

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            animations.push({ type: 'compare', i: j, j: j + 1 });

            if (arr[j] > arr[j + 1]) {
                animations.push({ type: 'swap', i: j, j: j + 1 });
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return animations;
};

const Preview = () => {
    const [array, setArray] = useState([])
    const [isInView, setIsInView] = useState(false)
    const [highlightedLine, setHighlightedLine] = useState(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const sectionRef = useRef(null)
    const animationRef = useRef(null)

    const createArray = () => {
        const arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(Math.floor(Math.random() * 100) + 10)
        }
        return arr;
    }

    useEffect(() => {
        const newArr = createArray();
        setArray(newArr);
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isInView) {
                    setIsInView(true)
                    setTimeout(() => startBubbleSort(), 500)
                }
            },
            { threshold: 0.3 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [array, isInView])

    const animateSwap = (i, j) => {
        return new Promise((resolve) => {
            const bars = document.getElementsByClassName('array-bar');
            const bar1 = bars[i];
            const bar2 = bars[j];

            const barWidth = bar1.offsetWidth;
            const margin = 8;
            const totalWidth = barWidth + margin;

            bar1.style.backgroundColor = SECONDARY_COLOR;
            bar2.style.backgroundColor = SECONDARY_COLOR;

            bar1.style.transition = 'transform 0.3s ease';
            bar2.style.transition = 'transform 0.3s ease';
            bar1.style.transform = 'translateY(-40px)';
            bar2.style.transform = 'translateY(40px)';

            setTimeout(() => {
                bar1.style.transform = `translate(${totalWidth}px, -40px)`;
                bar2.style.transform = `translate(${-totalWidth}px, 40px)`;
            }, 300);

            setTimeout(() => {
                bar1.style.transform = `translateX(${totalWidth}px)`;
                bar2.style.transform = `translateX(${-totalWidth}px)`;
            }, 600);

            setTimeout(() => {
                bar1.style.transition = '';
                bar2.style.transition = '';
                bar1.style.transform = '';
                bar2.style.transform = '';

                setArray(prev => {
                    const newArr = [...prev];
                    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                    return newArr;
                });

                setTimeout(() => {
                    bar1.style.backgroundColor = PRIMARY_COLOR;
                    bar2.style.backgroundColor = PRIMARY_COLOR;
                    resolve();
                }, 50);
            }, 900);
        });
    };

    const startBubbleSort = async () => {
        if (isAnimating) return;
        setIsAnimating(true);

        const animations = getBubbleSortAnimations(array);
        const bars = document.getElementsByClassName('array-bar');

        Array.from(bars).forEach(bar => {
            bar.style.backgroundColor = PRIMARY_COLOR;
        });

        if (animationRef.current) {
            animationRef.current.forEach(id => clearTimeout(id));
        }
        animationRef.current = [];

        setArray([...array]);

        for (let idx = 0; idx < animations.length; idx++) {
            const step = animations[idx];

            await new Promise(resolve => {
                const timeoutId = setTimeout(() => {
                    if (step.type === 'compare') {
                        setHighlightedLine(7);

                        bars[step.i].style.backgroundColor = COMPARISON_COLOR;
                        bars[step.j].style.backgroundColor = COMPARISON_COLOR;

                        setTimeout(() => {
                            if (idx < animations.length - 1 &&
                                animations[idx + 1]?.type === 'swap') {
                                setHighlightedLine(15);
                            }
                        }, ANIMATION_SPEED_MS);

                        setTimeout(() => {
                            bars[step.i].style.backgroundColor = PRIMARY_COLOR;
                            bars[step.j].style.backgroundColor = PRIMARY_COLOR;
                            resolve();
                        }, ANIMATION_SPEED_MS);
                    }

                    if (step.type === 'swap') {
                        setHighlightedLine(17);
                        animateSwap(step.i, step.j).then(() => {
                            resolve();
                        });
                    }
                }, idx * ANIMATION_SPEED_MS / idx);

                animationRef.current.push(timeoutId);
            });
        }

        setTimeout(() => {
            setHighlightedLine(null);
            setIsAnimating(false);
        }, ANIMATION_SPEED_MS);
    };

    const handleRegenerate = async () => {
        setIsAnimating(false);
        setHighlightedLine(null);

        if (animationRef.current) {
            animationRef.current.forEach(id => clearTimeout(id));
            animationRef.current = [];
        }

        const newArr = createArray();
        setArray(newArr);

        setTimeout(() => {
            const bars = document.getElementsByClassName('array-bar');
            Array.from(bars).forEach(bar => {
                bar.style.backgroundColor = PRIMARY_COLOR;
                bar.style.transform = '';
                bar.style.transition = '';
            });

            setTimeout(() => {
                startBubbleSort();
            }, 300);
        }, 100);
    }

    const codeLines = [
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

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex items-center justify-center w-full py-20 px-4 bg-black relative overflow-hidden"
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-950/20 via-black to-emerald-950/20"></div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
            }}></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full"
            >
                <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-8 items-start">
                    {/* Visualization Section */}
                    <div className="flex flex-col items-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full"
                        >
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-8 text-center">
                                Bubble Sort Visualization
                            </h2>

                            <div className="relative border border-green-900/50 rounded-2xl bg-gradient-to-br from-green-950/40 to-black p-8 shadow-2xl shadow-green-900/20 backdrop-blur-sm">
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-xl"></div>

                                <div className="relative flex flex-row items-end justify-center gap-2">
                                    {array.map((value, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="array-bar relative group"
                                            key={idx}
                                            style={{
                                                height: `${value * 2}px`,
                                                minHeight: '40px',
                                                minWidth: '45px',
                                                transform: 'translate(0, 0)',
                                                background: 'linear-gradient(180deg, #16a34a 0%, #15803d 100%)',
                                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                                boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-lg"></div>
                                            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm">
                                                {value}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-6 w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl transition-all duration-200 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-900/50"
                                onClick={handleRegenerate}
                                disabled={isAnimating}
                            >
                                {isAnimating ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sorting...
                                    </span>
                                ) : '↻ Regenerate & Sort'}
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Code Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col space-y-4"
                    >
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            Algorithm Code
                        </h3>

                        <div className="relative border border-green-900/50 rounded-xl overflow-hidden bg-gradient-to-br from-green-950/40 to-black shadow-2xl shadow-green-900/20">
                            {/* Code header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-green-900/50 bg-green-950/30">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <span className="text-xs text-green-400 ml-2 font-mono">bubbleSort.js</span>
                            </div>

                            <div className="p-6 overflow-x-auto">
                                <pre className="text-sm font-mono">
                                    {codeLines.map((line) => (
                                        <div
                                            key={line.num}
                                            className={`transition-all duration-200 -mx-2 px-2 py-0.5 ${highlightedLine === line.num
                                                    ? 'bg-green-500/20 border-l-2 border-green-500'
                                                    : ''
                                                }`}
                                        >
                                            <span className="text-green-700 select-none mr-4 inline-block w-6 text-right text-xs">
                                                {line.num}
                                            </span>
                                            <span className="text-green-300">{line.code}</span>
                                        </div>
                                    ))}
                                </pre>
                            </div>
                        </div>

                        {/* Stats box */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            <div className="bg-gradient-to-br from-green-950/40 to-black border border-green-900/50 rounded-lg p-4 text-center">
                                <div className="text-green-400 text-xs uppercase tracking-wider mb-1">Complexity</div>
                                <div className="text-white font-bold">O(n²)</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-950/40 to-black border border-green-900/50 rounded-lg p-4 text-center">
                                <div className="text-green-400 text-xs uppercase tracking-wider mb-1">Space</div>
                                <div className="text-white font-bold">O(1)</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-950/40 to-black border border-green-900/50 rounded-lg p-4 text-center">
                                <div className="text-green-400 text-xs uppercase tracking-wider mb-1">Stable</div>
                                <div className="text-white font-bold">Yes</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default Preview