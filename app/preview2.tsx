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
    const rows = 10;
    const cols = 10;


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
                // 60% chance to move towards the end 
                if (Math.random() < 0.6) {
                    if (Math.random() < 0.5) currentRow++;
                    else currentCol++;
                } else {
                    // 40% chance to move randomly (capable tani towards the end)
                    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; //(x,y) left/right/up/down
                    const [dr, dc] = directions[Math.floor(Math.random() * directions.length)]; //tkeyer b random wa7da mn hadok direction row+col
                    const newRow = currentRow + dr;
                    const newCol = currentCol + dc;

                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        currentRow = newRow;
                        currentCol = newCol;

                        //ytbedel rows wl cols ta3i
                    }
                }
            }
        }
        path.push([rows - 1, cols - 1]);


        // Add the end cell fi la fin t3 tab mor ma boclina



        let index = 0;
        const animate = () => {
            if (index < path.length) {
                const [row, col] = path[index];
                //kol i ml path 3ndha row w col 
                setGrid(prev => {
                    const newGrid = [...prev]; //ncopiyiw tab l9dim f newgrid
                    newGrid[row] = [...newGrid[row]]; //ncopyiw specific row ta3i ml path f newgrid
                    newGrid[row][col] = {
                        ...newGrid[row][col],
                        isVisited: true,
                        isPath: true
                    }; //dok nupdateiw f djdid les info t3 hadik cell 
                    return newGrid;
                    //w nreturni djdid 
                });
                setVisitedCells(prev => [...prev, `${row}-${col}`]);
                //copyi g3 les eles l9dom b ...prev + the new row w col 
                index++;
                animationRef.current = requestAnimationFrame(() => {
                    setTimeout(() => animate(), 60); // Speed of worm 
                });
            } else {
                // when path reaches end, restart 
                setTimeout(() => {
                    resetAnimation();
                    setTimeout(() => startWormAnimation(), 500);
                }, 1000);
            }
        };

        animate();
    }


    return (
        <div id="dijkstra-section" className="min-h-screen w-full p-2 flex bg-[var(--bg)] border-t-[1px] border-[var(--border)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
            >

                <div className="text-center mb-12 w-full relative top-70 left-150">
                    <h1 className="text-5xl font-bold mb-4 text-[var(--text)] float">
                        Path Finding Algorithms
                    </h1>
                </div>

                <div className="relative bg-var(--bg) m-1">
                    <div
                        className="maze-container grid gap-0.5 m-10 bg-(--text)"
                        style={{
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            gridTemplateRows: `repeat(${rows}, 1fr)`,
                            width: `${cols * 40}px`,
                            height: `${rows * 40}px`
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
                                            width: `{cols * 20}`,
                                            height: `{rows * 20}`,
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
};

export default Dihstra;