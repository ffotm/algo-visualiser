'use client'
import React from 'react'
import createGrid from '../dihjstra/dihjstra'
import '../style.css'
import { useState } from 'react'
import { getPath } from '../dihjstra/dihjstra'
import { Bf } from './bf'




const bfpage = () => {
    const [grid, setGrid] = useState(() => createGrid(16, 20));
    const [start, setStart] = useState({ row: 0, col: 0 })
    const [end, setEnd] = useState({ row: 15, col: 19 })
    const [startrow, setStartrow] = useState(0)
    const [startcol, setStartcol] = useState(0)
    const [endrow, setEndrow] = useState(15)
    const [endcol, setEndcol] = useState(19)
    const [isWall, setIsWall] = useState(false)
    const path = getPath(grid[end.row][end.col]);

    const handleMouseDown = (row: number, col: number) => {
        setIsWall(true);
        toggleWall(row, col);
    }

    const handleMouseUp = () => {
        setIsWall(false);
    }

    const handleMouseEnter = (row: number, col: number) => {
        if (isWall) {
            toggleWall(row, col);
        }
    }

    const toggleWall = (row: number, col: number) => {
        const newGrid = grid.map((r, rowIndex) =>
            r.map((node, colIndex) => {
                if (rowIndex === row && colIndex === col) {
                    return { ...node, isWall: !node.isWall };
                }
                return node;
            })
        );
        setGrid(newGrid);
    };
    const handleStartChange = () => {
        const startRow = startrow;
        const startCol = startcol;
        setStart({ row: startRow, col: startCol })
        console.log(start)
    }

    const handleEndChange = () => {
        const endRow = endrow;
        const endCol = endcol;
        setEnd({ row: endRow, col: endCol })

    }
    const clearGrid = () => {
        console.log("clearGrid");
        const newGrid = grid.map((r) =>
            r.map((node) => ({
                ...node,
                isWall: false,
                isVisited: false,
                isPath: false,
                distance: Infinity,
                previous: null
            }
            ))
        );

        setGrid(newGrid);

    };

    const visualizeBf = () => {
        const startNode = grid[start.row][start.col];
        const endNode = grid[end.row][end.col];
        console.log("startNode, endNode", startNode, endNode);
        const visitedNodes = Bf(grid, startNode, endNode);
        console.log("visitedNodes", visitedNodes);
        const path = getPath(grid[end.row][end.col]);
        console.log("path", path);
        animateBf(visitedNodes, path);

    }

    function animateBf(visitedNodes: any[], path: any[]) {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animatePath(path);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`)?.classList.add('visited');

            }, 10 * i);
        }
    }
    function animatePath(path: any[]) {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const node = path[i];
                document.getElementById(`node-${node.row}-${node.col}`)?.classList.add('path');

            }, 50 * i);
        }
    }


    return (
        <div className='container w-full pt-25'>
            <div className=" gridd">
                {
                    grid.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {row.map((cell, colIndex) => (
                                <div
                                    key={colIndex}
                                    id={`node-${rowIndex}-${colIndex}`}
                                    className={`cell ${cell.isWall ? 'wall' : ''} ${cell.isPath ? 'path' : ''} ${cell.isVisited ? 'visited' : ''} ${start.row === rowIndex && start.col === colIndex ? 'start' : ''} ${end.row === rowIndex && end.col === colIndex ? 'end' : ''} `}
                                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}   //ki t93od mcliki 3la lmouse
                                    onMouseUp={() => handleMouseUp()}
                                    // li ttla9 lmouse
                                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                //hover bl mouse
                                ></div>

                            ))}

                        </div>
                    ))
                }

            </div>
            <div className="parameters">
                <div className="setStart p-2" >
                    <button
                        onClick={handleStartChange}
                        className="bg-green-600 px-4 py-1 m-2 rounded"
                    >
                        Set Start
                    </button>
                    <input type="number" name="startrow" id="startrow" placeholder='row = 0' value={startrow} onChange={(e) => setStartrow(parseInt(e.target.value))} className='bg-green-800 m-3 w-20 ' />
                    <input type="number" name="startcol" id="startcol" placeholder='col = 0' value={startcol} onChange={(e) => setStartcol(parseInt(e.target.value))} className='bg-green-800 m-3 w-20' />
                </div>

                <div className="setEnd p-2" >
                    <button
                        onClick={handleEndChange}
                        className="bg-green-600 px-4 py-1 m-2 rounded"
                    >set an End</button>
                    <input type="number" name="endrow" id="" placeholder='row = 15' value={endrow} onChange={(e) => setEndrow(parseInt(e.target.value))} className='bg-green-800 m-3 w-20 rounded' />
                    <input type="number" name="endcol" id="" placeholder='col = 19' value={endcol} onChange={(e) => setEndcol(parseInt(e.target.value))} className='bg-green-800 m-3 w-20 rounded' />
                </div>

                <button onClick={visualizeBf} className="bg-green-600 px-4 py-1 m-2 rounded">Visualize </button>
                <button onClick={clearGrid} className="bg-green-600 px-4 py-1 m-2 rounded">Clear Grid</button>

                <div className="logs">
                    <p>final path</p>

                    {path.map((node, index) => (
                        <p key={index} className='grid grid-cols-3'>
                            ({node.row}, {node.col})
                        </p>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default bfpage