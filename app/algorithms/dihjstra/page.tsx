
'use client'
import React from 'react'
import createGrid from './dihjstra'
import './style.css'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getPath, dihstra } from './dihjstra'



function animateDijkstra(visitedNodes, path) {
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
function animatePath(path) {
    for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
            const node = path[i];
            document.getElementById(`node-${node.row}-${node.col}`)?.classList.add('path');

        }, 50 * i);
    }
}



const Dihstrapage = () => {
    const [grid, setGrid] = useState(() => createGrid(16, 20));
    const [start, setStart] = useState({ row: 0, col: 0 })
    const [end, setEnd] = useState({ row: 15, col: 19 })
    const [startrow, setStartrow] = useState(0)
    const [startcol, setStartcol] = useState(0)
    const [endrow, setEndrow] = useState(15)
    const [endcol, setEndcol] = useState(19)
    const [isWall, setIsWall] = useState(false)



    const handleStartChange = () => {
        const startRow = parseInt(startrow);
        const startCol = parseInt(startcol);
        setStart({ row: startRow, col: startCol })
        console.log(start)
    }

    const handleEndChange = () => {
        const endRow = parseInt(endrow);
        const endCol = parseInt(endcol);
        setEnd({ row: endRow, col: endCol })

    }
    const visualizeDihstra = () => {
        const startNode = grid[start.row][start.col];
        const endNode = grid[end.row][end.col];
        console.log("startNode, endNode", startNode, endNode);
        const visitedNodes = dihstra(grid, startNode, endNode);
        console.log("visitedNodes", visitedNodes);
        const path = getPath(endNode);
        console.log("path", path);
        animateDijkstra(visitedNodes, path);

    }
    const handleMouseDown = (row, col) => {
        setIsWall(true);
        toggleWall(row, col);
    }

    const handleMouseUp = () => {
        setIsWall(false);
    }

    const handleMouseEnter = (row, col) => {
        if (isWall) {
            toggleWall(row, col);
        }
    }

    const toggleWall = (row, col) => {
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


            </div><div className="parameters">
                <div className="setStart p-2" >
                    <button
                        onClick={handleStartChange}
                        className="bg-green-600 px-4 py-1 m-2"
                    >
                        Set Start
                    </button>
                    <input type="number" name="startrow" id="startrow" placeholder='row = 0' value={startrow} onChange={(e) => setStartrow(e.target.value)} className='bg-green-800 m-3 w-20 ' />
                    <input type="number" name="startcol" id="startcol" placeholder='col = 0' value={startcol} onChange={(e) => setStartcol(e.target.value)} className='bg-green-800 m-3 w-20' />
                </div>

                <div className="setEnd p-2" >
                    <button
                        onClick={handleEndChange}
                        className="bg-green-600 px-4 py-1 m-2"
                    >set an End</button>
                    <input type="number" name="endrow" id="" placeholder='row = 15' value={endrow} onChange={(e) => setEndrow(e.target.value)} className='bg-green-800 m-3 w-20' />
                    <input type="number" name="endcol" id="" placeholder='col = 19' value={endcol} onChange={(e) => setEndcol(e.target.value)} className='bg-green-800 m-3 w-20' />
                </div>


                <button className="bg-green-600 px-4 py-1 m-2" onClick={visualizeDihstra} >start visualising</button>
            </div>

        </div >
    )
}

export default Dihstrapage