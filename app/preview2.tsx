'use client'
import { style } from 'framer-motion/client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Dihstra = () => {
    const [grid, setGrid] = useState([]);
    const [visitedCells, setVisitedCells] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    //for it to not start on render and its set on false
    const observerRef = useRef(null);
    //react hook ref to store the intersection observer 
    const animationRef = useRef(null);
    const rows = 15;
    const cols = 15;


    useEffect(() => {
        const newGrid = [];
        for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < cols; c++) {
                const isWall = Math.random() < 0.15;
                //tdecider b random win plaset lwall w 3ndo 15% bch yban
                //ida iswall>0.15 m3netha true else false
                row.push({
                    isWall,
                    isPath: false,
                    isVisited: false
                });
                //each cell 3ndha 3boleans to define it
            }
            newGrid.push(row);
        }
        setGrid(newGrid);
    }, []);

    useEffect(() => {
        //IntersectionObserver howa api ichof ida hadik section rahi fl viewport
        observerRef.current = new IntersectionObserver(
            (entries) => { //parametre t3 IntersectionObserver
                if (entries[0].isIntersecting) { //ida visible ele t3na
                    setIsVisible(true);
                    startWormAnimation();
                } else {
                    setIsVisible(false);
                    resetAnimation();
                }
            },
            { threshold: 0.3 } //triggers ki tkon visible a 30%
        );
        //creayina objet 

        if (observerRef.current) {
            observerRef.current.observe(document.getElementById('dijkstra-section'));
        }
        //ida objet t3na true m3netha nrenderiw l'ele t3na b observe

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            //ida luser yscrolli w ydkhol lsection m3netha n3awdou lanimation 
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);


    // Reset animation when leaving view
    const resetAnimation = () => {
        setVisitedCells([]);
        //nfergho tableau t3 visited
        setGrid(prev => prev.map(row =>
            row.map(cell => ({ ...cell, isVisited: false, isPath: false }))
        ));
        //nredo g3 cells t3na kima kano lwl
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const startWormAnimation = () => {
        const path = [];
        let currentRow = 0;
        let currentCol = 0;


        while (currentRow < rows - 1 || currentCol < cols - 1) {
            path.push([currentRow, currentCol]);
            //push current position 

            if (currentRow === rows - 1) {
                currentCol++;
            } else if (currentCol === cols - 1) {
                currentRow++;
            } else {
                // 60% chance to move toward end, 40% to wander
                if (Math.random() < 0.6) {
                    // Move toward end
                    if (Math.random() < 0.5) currentRow++;
                    else currentCol++;
                } else {
                    // Wander randomly
                    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
                    const [dr, dc] = directions[Math.floor(Math.random() * directions.length)];
                    const newRow = currentRow + dr;
                    const newCol = currentCol + dc;

                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        currentRow = newRow;
                        currentCol = newCol;
                    }
                }
            }
        }

        // Add the end point
        path.push([rows - 1, cols - 1]);

        // Animate the path
        let index = 0;
        const animate = () => {
            if (index < path.length) {
                const [row, col] = path[index];

                setGrid(prev => {
                    const newGrid = [...prev];
                    newGrid[row] = [...newGrid[row]];
                    newGrid[row][col] = {
                        ...newGrid[row][col],
                        isVisited: true,
                        isPath: true
                    };
                    return newGrid;
                });

                setVisitedCells(prev => [...prev, `${row}-${col}`]);

                index++;
                animationRef.current = requestAnimationFrame(() => {
                    setTimeout(() => animate(), 50); // Speed of worm movement
                });
            } else {
                // When path reaches end, restart after a delay
                setTimeout(() => {
                    resetAnimation();
                    setTimeout(() => startWormAnimation(), 500);
                }, 1000);
            }
        };

        animate();
    };

    return (
        <div id="dijkstra-section" className="min-h-screen flex flex-col items-center justify-center w-full py-20 px-4 bg-[var(--bg)] border-t-[1px] border-[var(--border)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
            >

                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 text-[var(--bg2)]">
                        Dijkstra's Algorithm
                    </h1>

                </div>

                <div className="relative bg-var(--bg) border-2 border-[var(--border)] ">
                    <div
                        className="maze-container grid gap-0.5 bg-(--bg2)"
                        style={{
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            width: `${cols * 30}px`,
                            height: `${rows * 28}px`



                        }}
                    >
                        {grid.map((row, r) =>
                            row.map((cell, c) => {
                                const isStart = r === 0 && c === 0;
                                const isEnd = r === rows - 1 && c === cols - 1;
                                const cellId = `${r}-${c}`;
                                const isWormHead = visitedCells.length > 0 && cellId === visitedCells[visitedCells.length - 1];

                                let cellClass = 'cell ';

                                if (isStart) cellClass += 'start ';
                                else if (isEnd) cellClass += 'end ';
                                else if (cell.isWall) cellClass += 'wall ';
                                else if (isWormHead) cellClass += 'worm-head ';
                                else if (cell.isPath) cellClass += 'path ';
                                else cellClass += 'empty ';

                                return (
                                    <div
                                        key={cellId}
                                        className={cellClass}
                                        style={{
                                            width: `{cols * 15}`,
                                            height: `{rows * 15}`,
                                            transition: 'all 0.3s ease',
                                            animation: isWormHead ? 'pulse 0.5s infinite' : 'none'
                                        }}
                                    />
                                );
                            })
                        )}
                    </div>


                </div>
            </motion.div> </div >
    )
}

export default Dihstra;