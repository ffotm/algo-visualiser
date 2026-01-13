'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type Cell = {
    isWall: boolean;
    isPath: boolean;
    isVisited: boolean;
};

const rows = 12;
const cols = 12;
const ANIMATION_SPEED = 20;

const Dihstra: React.FC = () => {
    const [grid, setGrid] = useState<Cell[][]>([]);
    const [visitedCells, setVisitedCells] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const newGrid: Cell[][] = [];
        for (let r = 0; r < rows; r++) {
            const row: Cell[] = [];
            for (let c = 0; c < cols; c++) {
                const isWall = Math.random() < 0.15;
                row.push({
                    isWall,
                    isPath: false,
                    isVisited: false,
                });
            }
            newGrid.push(row);
        }
        setGrid(newGrid);
    }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    startWormAnimation();
                } else {
                    setIsVisible(false);
                    resetAnimation();
                }
            },
            { threshold: 0.3 }
        );

        const section = document.getElementById('dijkstra-section');
        if (observerRef.current && section) {
            observerRef.current.observe(section);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, []);

    const resetAnimation = () => {
        setVisitedCells([]);
        setGrid(prev =>
            prev.map(row =>
                row.map(cell => ({ ...cell, isVisited: false, isPath: false }))
            )
        );
        if (animationRef.current) clearTimeout(animationRef.current);
    };

    const startWormAnimation = () => {
        const path: [number, number][] = [];
        let currentRow = 0;
        let currentCol = 0;

        while (currentRow < rows - 1 || currentCol < cols - 1) {
            path.push([currentRow, currentCol]);

            if (currentRow === rows - 1) {
                currentCol++;
            } else if (currentCol === cols - 1) {
                currentRow++;
            } else {
                if (Math.random() < 0.6) {
                    if (Math.random() < 0.5) currentRow++;
                    else currentCol++;
                } else {
                    const directions: [number, number][] = [
                        [0, 1],
                        [1, 0],
                        [0, -1],
                        [-1, 0],
                    ];
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
        path.push([rows - 1, cols - 1]);

        let index = 0;
        const animate = () => {
            if (index < path.length) {
                const [row, col] = path[index];

                setGrid(prev => {
                    const newGrid = prev.map(r => r.map(c => ({ ...c })));
                    newGrid[row][col].isVisited = true;
                    newGrid[row][col].isPath = true;
                    return newGrid;
                });

                setVisitedCells(prev => [...prev, `${row}-${col}`]);
                index++;

                animationRef.current = setTimeout(() => {
                    animate();
                }, ANIMATION_SPEED);
            } else {
                animationRef.current = setTimeout(() => {
                    resetAnimation();
                    setTimeout(() => startWormAnimation(), 100);
                }, 300);
            }
        };

        animate();
    };

    return (
        <div
            id="dijkstra-section"
            className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden py-20"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/10 via-black to-green-950/10"></div>

            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(rgba(21, 128, 61, 0.2) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(21, 128, 61, 0.2) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
            ></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-6xl mx-auto px-4"
            >
                {/* Title */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold bg-gradient-to-r from-green-700 via-emerald-700 to-green-600 bg-clip-text text-transparent mb-4"
                    >
                        Pathfinding Algorithms
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-green-400/60 text-md"
                    >
                        Watch the algorithm navigate through obstacles in real-time
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="flex flex-col lg:flex-row gap-30 items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl rounded-full"></div>

                        <div className="relative border border-green-900/30 rounded-2xl bg-gradient-to-br from-green-950/20 to-black p-6 shadow-2xl shadow-green-900/15 backdrop-blur-sm">
                            <div
                                className="grid gap-1 bg-black/50 p-2 rounded-lg"
                                style={{
                                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                                }}
                            >
                                {grid.map((row, r) =>
                                    row.map((cell, c) => {
                                        const isStart = r === 0 && c === 0;
                                        const isEnd = r === rows - 1 && c === cols - 1;
                                        const cellId = `${r}-${c}`;
                                        const isWormHead =
                                            visitedCells.length > 0 &&
                                            cellId === visitedCells[visitedCells.length - 1];

                                        let cellStyle: React.CSSProperties = {
                                            width: '28px',
                                            height: '28px',
                                            transition: 'all 0.3s ease',
                                            borderRadius: '4px',
                                        };

                                        if (isStart) {
                                            cellStyle.background = 'linear-gradient(135deg, #15803d, #14532d)';
                                            cellStyle.boxShadow = '0 0 15px rgba(21, 128, 61, 0.4)';
                                        } else if (isEnd) {
                                            cellStyle.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
                                            cellStyle.boxShadow = '0 0 15px rgba(220, 38, 38, 0.4)';
                                        } else if (cell.isWall) {
                                            cellStyle.background = 'linear-gradient(135deg, #1a3a1a, #0f2a0f)';
                                            cellStyle.border = '1px solid rgba(21, 128, 61, 0.15)';
                                        } else if (isWormHead) {
                                            cellStyle.background = 'linear-gradient(135deg, #16a34a, #15803d)';
                                            cellStyle.boxShadow = '0 0 20px rgba(22, 163, 74, 0.6)';
                                            cellStyle.transform = 'scale(1.1)';
                                        } else if (cell.isPath) {
                                            cellStyle.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                                            cellStyle.boxShadow = '0 0 12px rgba(34, 197, 94, 0.3)';
                                        } else {
                                            cellStyle.background = 'rgba(0, 0, 0, 0.6)';
                                            cellStyle.border = '1px solid rgba(21, 128, 61, 0.08)';
                                        }

                                        return (
                                            <motion.div
                                                key={cellId}
                                                style={cellStyle}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: (r + c) * 0.01 }}
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Legend & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col gap-4 max-w-md"
                    >
                        <div className="bg-gradient-to-br from-green-950/20 to-black border border-green-900/30 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-green-500 mb-4">Legend</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-green-700 to-green-800 shadow-lg shadow-green-700/30"></div>
                                    <span className="text-green-100 ">Start Node</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6  rounded bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-600/30"></div>
                                    <span className="text-green-100">Target Node</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30"></div>
                                    <span className="text-green-100">Current Path</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6  rounded bg-gradient-to-br from-green-900 to-green-950 border border-green-700/20"></div>
                                    <span className="text-green-100">Obstacle</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-950/20 to-black border border-green-900/30 rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-green-500 mb-4">Algorithm Stats</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-black/40 rounded-lg p-3 border border-green-900/20">
                                    <div className="text-xs text-green-500 uppercase tracking-wider mb-1">Complexity</div>
                                    <div className="text-white font-bold">O(V + E)</div>
                                </div>
                                <div className="bg-black/40 rounded-lg p-3 border border-green-900/20">
                                    <div className="text-xs text-green-500 uppercase tracking-wider mb-1">Grid Size</div>
                                    <div className="text-white font-bold">{rows}×{cols}</div>
                                </div>
                                <div className="bg-black/40 rounded-lg p-3 border border-green-900/20">
                                    <div className="text-xs text-green-500 uppercase tracking-wider mb-1">Visited</div>
                                    <div className="text-white font-bold">{visitedCells.length}</div>
                                </div>
                                <div className="bg-black/40 rounded-lg p-3 border border-green-900/20">
                                    <div className="text-xs text-green-500 uppercase tracking-wider mb-1">Type</div>
                                    <div className="text-white font-bold text-xs">BFS</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dihstra;
