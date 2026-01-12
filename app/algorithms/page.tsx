'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { dihstra } from './dihjstra/dihjstra'
import { Bf } from './bf/bf'
import { Df } from './df/df'
import Tabss from './tabs'

import { GiBrickWall } from "react-icons/gi";
import { useAlgoContext } from '../algoContext';

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
        <div className="min-h-screen bg-black text-mono text-white p-8 relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-green-950/10 via-black to-emerald-950/10"></div>
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `linear-gradient(rgba(21, 128, 61, 0.2) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(21, 128, 61, 0.2) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
            }}></div>

            <div className="max-w-7xl mx-auto mt-20 relative ">
                <Tabss algo={algo} setAlgo={setAlgo} />

                <div className="flex gap-8 items-start mt-8">

                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute inset-0 w-180 bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl rounded-full"></div>

                            <div className="relative w-180 border border-green-900/30 rounded-2xl p-1 bg-gradient-to-br from-green-950/20 to-black p-6 shadow-2xl shadow-green-900/15 backdrop-blur-sm">
                                <div
                                    className="grid gap-1 bg-black/50 rounded-lg"
                                    style={{
                                        gridTemplateColumns: `repeat(16, 1fr)`,
                                        gridTemplateRows: `repeat(12, 1fr)`,
                                    }}
                                >
                                    {grid.map((row, rowIndex) =>
                                        row.map((cell, colIndex) => {
                                            const isStart = start.row === rowIndex && start.col === colIndex;
                                            const isEnd = end.row === rowIndex && end.col === colIndex;
                                            const cellId = `node-${rowIndex}-${colIndex}`;

                                            let cellStyle: React.CSSProperties = {
                                                width: '36px',
                                                height: '36px',
                                                transition: 'all 0.3s ease',
                                                borderRadius: '4px',
                                            };

                                            if (isStart) {
                                                cellStyle.background = 'linear-gradient(135deg, #74043d, #2a0030)';
                                                cellStyle.boxShadow = '0 0 15px rgba(21, 128, 61, 0.4)';
                                            } else if (isEnd) {
                                                cellStyle.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
                                                cellStyle.boxShadow = '0 0 15px rgba(220, 38, 38, 0.4)';
                                            } else if (cell.isWall) {
                                                cellStyle.background = 'linear-gradient(135deg, #1a3a1a, #0f2a0f)';
                                                cellStyle.border = '1px solid rgba(21, 128, 61, 0.15)';

                                            } else {
                                                cellStyle.background = 'rgba(0, 0, 0, 0.6)';
                                                cellStyle.border = showGrid ? '1px solid rgba(21, 128, 61, 0.08)' : 'none';
                                            }

                                            return (
                                                <div
                                                    key={cellId}
                                                    id={cellId}
                                                    className="cursor-pointer"
                                                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                                    onMouseUp={handleMouseUp}
                                                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                                    style={cellStyle}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="mt-6 bg-gradient-to-br from-green-950/20 to-black border border-green-900/30 rounded-xl p-4 shadow-lg">
                            <h4 className="text-sm font-bold text-green-500 mb-3">Legend</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-pink-700 to-purple-700 shadow-lg shadow-pink-900/30"></div>
                                    <span className="text-xs text-gray-300">Start</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-600/30"></div>
                                    <span className="text-xs text-gray-300">End</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-green-900 to-green-950 border border-green-700/30"></div>
                                    <span className="text-xs text-gray-300">Wall</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30"></div>
                                    <span className="text-xs text-gray-300">Path</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={`w-80 bg-gradient-to-br from-green-950/20 to-black rounded-xl p-6 shadow-xl border border-green-900/30 transition-all duration-300 ${showParameters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <h3 className="text-xl font-bold mb-6 text-green-500">Controls</h3>


                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-3">Start Position</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="number"
                                    value={startrow}
                                    onChange={(e) => setStartrow(e.target.value)}
                                    className="flex-1 bg-black/50 border border-green-900/30 rounded-lg px-3 py-2 text-sm text-white focus:border-green-700 focus:outline-none"
                                    placeholder="Row"
                                    min="0"
                                    max="15"
                                />
                                <input
                                    type="number"
                                    value={startcol}
                                    onChange={(e) => setStartcol(e.target.value)}
                                    className="flex-1 bg-black/50 border border-green-900/30 rounded-lg px-3 py-2 text-sm text-white focus:border-green-700 focus:outline-none"
                                    placeholder="Col"
                                    min="0"
                                    max="19"
                                />
                            </div>
                            <button
                                onClick={handleStartChange}
                                className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
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
                                    className="flex-1 bg-black/50 border border-green-900/30 rounded-lg px-3 py-2 text-sm text-white focus:border-green-700 focus:outline-none"
                                    placeholder="Row"
                                    min="0"
                                    max="15"
                                />
                                <input
                                    type="number"
                                    value={endcol}
                                    onChange={(e) => setEndcol(e.target.value)}
                                    className="flex-1 bg-black/50 border border-green-900/30 rounded-lg px-3 py-2 text-sm text-white focus:border-green-700 focus:outline-none"
                                    placeholder="Col"
                                    min="0"
                                    max="19"
                                />
                            </div>
                            <button
                                onClick={handleEndChange}
                                className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            >
                                Set End
                            </button>
                        </div>


                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Animation Speed: <span className="text-green-500">{speed}ms</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={speed}
                                onChange={(e) => setSpeed(parseInt(e.target.value))}
                                className="w-full accent-green-600"
                            />
                        </div>


                        <div className="mb-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showGrid}
                                    onChange={(e) => setShowGrid(e.target.checked)}
                                    className="w-4 h-4 accent-green-600"
                                />
                                <span className="text-sm text-gray-300">Show Grid Lines</span>
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2 mb-6">
                            <button
                                onClick={visualize}
                                className="w-full bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 px-4 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-900/30"
                                disabled={isRunning}
                            >
                                {isRunning ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Visualizing...
                                    </span>
                                ) : `Visualize ${algo.toUpperCase()}`}
                            </button>

                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={clearPath}
                                    className="bg-black/50 hover:bg-black/70 border border-green-900/30 px-3 py-2 rounded-lg text-xs transition-all"
                                >
                                    Clear Path
                                </button>
                                <button
                                    onClick={clearWalls}
                                    className="bg-black/50 hover:bg-black/70 border border-green-900/30 px-3 py-2 rounded-lg text-xs transition-all"
                                >
                                    Clear Walls
                                </button>
                                <button
                                    onClick={clearGrid}
                                    className="bg-black/50 hover:bg-black/70 border border-green-900/30 px-3 py-2 rounded-lg text-xs transition-all"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>


                        <div className="pt-6 border-t border-green-900/30">
                            <h4 className="text-sm font-bold text-green-500 mb-3">Statistics</h4>
                            <div className="space-y-2">
                                <div className="bg-black/40 rounded-lg p-3 border border-green-900/20">
                                    <div className="text-xs text-gray-400 mb-1">Path Length</div>
                                    <div className="text-lg font-bold text-green-400">{path.length > 0 ? path.length : 'N/A'}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-black/40 rounded-lg p-3 border border-green-900/20">
                                        <div className="text-xs text-gray-400 mb-1">Start</div>
                                        <div className="text-sm font-mono text-pink-400">({start.row}, {start.col})</div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-3 border border-green-900/20">
                                        <div className="text-xs text-gray-400 mb-1">End</div>
                                        <div className="text-sm font-mono text-red-400">({end.row}, {end.col})</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <style jsx>{`
                .visited {
                    background: linear-gradient(135deg, #010220, #010220);
                    box-shadow: 0 0 12px rgba(22, 163, 74, 0.3) !important;
                    animation: visitedAnimation 0.3s ease-out forwards;
                }

                .path {
                    background: linear-gradient(135deg, #2c7a2c, #15803d) !important;
                    box-shadow: 0 0 15px rgba(34, 197, 94, 0.4) !important;
                    animation: pathAnimation 0.3s ease-out forwards;
                }
.wall {
                  
                }

                @keyframes visitedAnimation {
                    from {
                        transform: scale(0.3);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes pathAnimation {
                    0% {
                        transform: scale(0.6);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
}

export default Algopage;