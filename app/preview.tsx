'use client'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import getBubbleSortAnimations from './sorts/bubbleSort'
import { motion } from 'framer-motion';
import Squares from './ui/squares';
import { FaArrowRight } from "react-icons/fa";

const ANIMATION_SPEED_MS = 300;
const PRIMARY_COLOR = '#2a4b27';
const SECONDARY_COLOR = 'green';
const COMPARISON_COLOR = 'red';

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
            className="min-h-screen flex items-center justify-center w-full py-20 px-4 bg-[var(--bg)] text-[var(--text)] "
        ><motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
                <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-start m-2 page">
                    {/* Visualization Section */}
                    <div className="flex flex-col items-center space-y-6 m-2">
                        <h2 className="text-3xl font-bold">Bubble Sort Visualization</h2>

                        <div className="border-2 border-[var(--border)] flex flex-row p-6 rounded-2xl bg-[var(--bg)] shadow-lg m-2 items-end justify-center">
                            {array.map((value, idx) => (
                                <div
                                    className="p-3 font-bold border border-[var(--border)] rounded-xl m-1 bg-[var(--bg2)] flex items-end justify-center array-bar transition-all duration-300"
                                    key={idx}
                                    style={{
                                        height: `${value}px`,
                                        minHeight: '40px',
                                        minWidth: '40px',
                                        transform: 'translate(0, 0)'
                                    }}
                                >
                                    <span className="mt-2">{value}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            className="px-6 py-3 bg-[var(--bg2)] text-white font-semibold rounded-lg transition-colors duration-200 hover:opacity-90 disabled:opacity-50"
                            onClick={handleRegenerate}
                            disabled={isAnimating}
                        >
                            {isAnimating ? 'Sorting...' : 'Regenerate & Sort'}
                        </button>



                    </div>

                    {/* Code Section */}
                    <div className="flex flex-col space-y-4 m-1 page">
                        <h3 className="text-2xl font-bold">Bubble Sort Algorithm</h3>
                        <div className="border-1 border-[var(--border)] rounded-xl p-6 bg-[var(--code)] overflow-x-auto" style={{ color: '#ffffff' }}>
                            <pre className="text-sm font-mono">
                                {codeLines.map((line) => (
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
                            </pre>
                        </div>

                    </div>


                </div>
            </motion.div></section>
    )
}

export default Preview