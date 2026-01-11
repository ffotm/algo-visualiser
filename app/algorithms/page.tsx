'use client'
import React, { useState, useCallback } from 'react'
import { dihstra } from './dihjstra/dihjstra'
import { Bf } from './bf/bf'
import { Df } from './df/df'
import Tabss from './tabs'
import './style.css'
import { GiBrickWall } from "react-icons/gi";
import { useAlgoContext } from '../algoContext';
import { useEffect } from 'react';







const createGrid = (rows: number, cols: number) => {
    const arr = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push({
                row: i,
                col: j,
                isWall: false,
                isPath: false,
                isVisited: false,
                isStart: false,
                isEnd: false,
                distance: Infinity,
                previous: null
            });
        }
        arr.push(row);
    }
    return arr;
}

const getPath = (endNode: any) => {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previous;
    }
    return path;
}

const Algopage = () => {
    const [grid, setGrid] = useState(() => createGrid(12, 16));
    const [start, setStart] = useState({ row: 0, col: 0 });
    const [end, setEnd] = useState({ row: 11, col: 15 });
    const [startrow, setStartrow] = useState("0");
    const [startcol, setStartcol] = useState("0");
    const [endrow, setEndrow] = useState("11");
    const [endcol, setEndcol] = useState("15");
    const [isWall, setIsWall] = useState(false);
    const [algo, setAlgo] = useState<string>("dijkstra");
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(10);
    const [showGrid, setShowGrid] = useState(true);
    const [showParameters, setShowParameters] = useState(true);
    const { setAlgoContext } = useAlgoContext();

    const path = getPath(grid[end.row][end.col]);

    const handleMouseDown = (row: number, col: number) => {
        setIsWall(true);
        toggleWall(row, col);
    }

    useEffect(() => {
        setAlgoContext({
            section: "algorithms",
            algo: algo,
            table: grid,
        });
    }, [algo, grid]);


    const handleMouseUp = () => {
        setIsWall(false);
    }

    const handleMouseEnter = (row: number, col: number) => {
        if (isWall) {
            toggleWall(row, col);
        }
    }

    const toggleWall = useCallback((row: number, col: number) => {
        setGrid(prevGrid =>
            prevGrid.map((r, rowIndex) =>
                r.map((node, colIndex) => {
                    if (rowIndex === row && colIndex === col) {
                        return { ...node, isWall: !node.isWall };
                    }
                    return node;
                })
            )
        );
    }, []);

    const handleStartChange = () => {
        const startRow = parseInt(startrow);
        const startCol = parseInt(startcol);
        if (startRow >= 0 && startRow < 16 && startCol >= 0 && startCol < 20) {
            setStart({ row: startRow, col: startCol });
        }
    }

    const handleEndChange = () => {
        const endRow = parseInt(endrow);
        const endCol = parseInt(endcol);
        if (endRow >= 0 && endRow < 16 && endCol >= 0 && endCol < 20) {
            setEnd({ row: endRow, col: endCol });
        }
    }

    const clearGrid = () => {
        setGrid(createGrid(12, 16));
        setStart({ row: 0, col: 0 });
        setEnd({ row: 11, col: 15 });
        setStartrow("0");
        setStartcol("0");
        setEndrow("11");
        setEndcol("15");
    };

    const clearPath = () => {
        setGrid(prevGrid =>
            prevGrid.map(row =>
                row.map(node => ({
                    ...node,
                    isVisited: false,
                    isPath: false,
                    distance: Infinity,
                    previous: null
                }))
            )
        );

        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const element = document.getElementById(`node-${rowIndex}-${colIndex}`);
                if (element) {
                    element.classList.remove('visited', 'path');
                }
            });
        });
    };

    const clearWalls = () => {
        setGrid(prevGrid =>
            prevGrid.map(row =>
                row.map(node => ({
                    ...node,
                    isWall: false
                }))
            )
        );
    };

    const animateAlgo = (visitedNodes: any[], path: any[]) => {
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const element = document.getElementById(`node-${rowIndex}-${colIndex}`);
                if (element) {
                    element.classList.remove('visited', 'path');
                }
            });
        });

        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animatePath(path);
                }, speed * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) {
                    element.classList.add('visited');
                }
            }, speed * i);
        }
    }

    const animatePath = (path: any[]) => {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const node = path[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) {
                    element.classList.add('path');
                }
            }, 50 * i);
        }
    }

    const visualize = async () => {
        if (isRunning) return;

        setIsRunning(true);

        setGrid(prevGrid =>
            prevGrid.map(row =>
                row.map(node => ({
                    ...node,
                    isVisited: false,
                    isPath: false,
                    distance: Infinity,
                    previous: null
                }))
            )
        );

        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const element = document.getElementById(`node-${rowIndex}-${colIndex}`);
                if (element) {
                    element.classList.remove('visited', 'path');
                }
            });
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        const startNode = grid[start.row][start.col];
        const endNode = grid[end.row][end.col];
        let visited;

        try {
            if (algo === "dijkstra") {
                visited = dihstra(grid, startNode, endNode);
            } else if (algo === "bfs") {
                visited = Bf(grid, startNode, endNode);
            } else if (algo === "dfs") {
                visited = Df(grid, startNode, endNode);
            } else {
                console.error("Unknown algorithm:", algo);
                setIsRunning(false);
                return;
            }

            if (visited && endNode.previous) {
                const path = getPath(endNode);
                await animateAlgo(visited, path);
            }
        } catch (error) {
            console.error(error);
        }

        setIsRunning(false);
    }


    return (
        <div className="min-h-screen bg-var(--bg) text-white p-8 ">
            <div className="max-w-7xl mx-auto mt-20">
                <Tabss algo={algo} setAlgo={setAlgo} />

                <div className="flex gap-8 items-start">
                    {/* Grid Section */}
                    <div className="flex-1 bg-black rounded-xl p-6 shadow-xl border border-var(--border) mx-20">
                        <div className="grid gap-0" style={{ gridTemplateRows: `repeat(12, minmax(0, 1fr))` }}>
                            {grid.map((row, rowIndex) => (
                                <div key={rowIndex} className="grid gap-0" style={{ gridTemplateColumns: `repeat(16, minmax(0, 1fr))` }}>
                                    {row.map((cell, colIndex) => (
                                        <div
                                            key={colIndex}
                                            id={`node-${rowIndex}-${colIndex}`}
                                            className={`aspect-square cursor-pointer transition-colors duration-150
                        ${cell.isWall ? 'wall' : 'bg-green-950'} 
                        ${start.row === rowIndex && start.col === colIndex ? 'start' : ''} 
                        ${end.row === rowIndex && end.col === colIndex ? 'end' : ''}`}
                                            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                            onMouseUp={handleMouseUp}
                                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                            style={{ border: showGrid ? '1px solid #052402' : 'none' }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className={`w-80 bg-green-950 rounded-xl p-6 shadow-xl border border-var(--border) transition-all duration-300 ${showParameters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <h3 className="text-xl font-bold mb-6 text-green-800">Controls</h3>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-3">Start Position</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="number"
                                    value={startrow}
                                    onChange={(e) => setStartrow(e.target.value)}
                                    className="flex-1 bg-green-900 border border-green-800 rounded-lg px-3 py-2 text-sm"
                                    placeholder="Row"
                                    min="0"
                                    max="15"
                                />
                                <input
                                    type="number"
                                    value={startcol}
                                    onChange={(e) => setStartcol(e.target.value)}
                                    className="flex-1 bg-green-900 border border-green-800 rounded-lg px-3 py-2 text-sm"
                                    placeholder="Col"
                                    min="0"
                                    max="19"
                                />
                            </div>
                            <button
                                onClick={handleStartChange}
                                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Set Start
                            </button>
                        </div>


                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-3">End Position</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="number"
                                    value={endrow}
                                    onChange={(e) => setEndrow(e.target.value)}
                                    className="flex-1 bg-green-900 border border-green-800 rounded-lg px-3 py-2 text-sm"
                                    placeholder="Row"
                                    min="0"
                                    max="15"
                                />
                                <input
                                    type="number"
                                    value={endcol}
                                    onChange={(e) => setEndcol(e.target.value)}
                                    className="flex-1 bg-green-900 border border-green-800 rounded-lg px-3 py-2 text-sm"
                                    placeholder="Col"
                                    min="0"
                                    max="19"
                                />
                            </div>
                            <button
                                onClick={handleEndChange}
                                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Set End
                            </button>
                        </div>


                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Animation Speed: <span className="text-green-400">{speed}ms</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={speed}
                                onChange={(e) => setSpeed(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>


                        <div className="mb-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showGrid}
                                    onChange={(e) => setShowGrid(e.target.checked)}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm text-gray-300">Show Grid Lines</span>
                            </label>
                        </div>


                        <div className="space-y-2 mb-6">
                            <button
                                onClick={visualize}
                                className="w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isRunning}
                            >
                                {isRunning ? 'Visualizing...' : `Visualize ${algo.toUpperCase()}`}
                            </button>

                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={clearPath} className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm transition-colors">
                                    Clear Path
                                </button>
                                <button onClick={clearWalls} className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm transition-colors">
                                    Clear Walls
                                </button>
                                <button onClick={clearGrid} className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm transition-colors">
                                    Clear All
                                </button>
                            </div>
                        </div>


                        <div className="pt-6 border-t border-gray-700">
                            <h4 className="text-sm font-bold text-gray-300 mb-3">Statistics</h4>
                            <div className="space-y-2 text-sm text-gray-400">
                                <div className="flex justify-between">
                                    <span>Path Length:</span>
                                    <span className="text-green-400 font-mono">{path.length > 0 ? path.length : 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Start:</span>
                                    <span className="text-green-400 font-mono">({start.row}, {start.col})</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>End:</span>
                                    <span className="text-blue-400 font-mono">({end.row}, {end.col})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <button
                    onClick={() => setShowParameters(!showParameters)}
                    className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                    <span className="font-medium">{showParameters ? 'Hide' : 'Show'} Controls</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showParameters ? "M10 19l-7-7m0 0l7-7m-7 7h18" : "M14 5l7 7m0 0l-7 7m7-7H3"} />
                    </svg>
                </button>
            </div>

        </div>
    );
}

export default Algopage;