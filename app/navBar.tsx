'use client'
import React, { useState, useEffect } from 'react'
import { SiThealgorithms } from "react-icons/si";
import { usePathname } from 'next/navigation';
import { GiMaze } from "react-icons/gi";
import { FaSortAmountUp } from "react-icons/fa";
import { GiDatabase } from "react-icons/gi";
import { FaMoon, FaSun } from "react-icons/fa";


const NavBar = () => {
    const [theme, setTheme] = useState('dark');
    const currentPath = usePathname();
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <div className="navbar bg-white text-black p-4 border-b border-gray-200 shadow-blue-50 max-h-20px fixed z-10">
            <div className="navbar-start">
                <SiThealgorithms className="w-10 h-10 mr-5" />
                <h1 className="text-xl font-bold">Algorithm Visualizer</h1>
            </div>
            <div className="navbar-center  lg:flex dropdown-content">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                            <summary>The Sorts <FaSortAmountUp className='text-green-600' /></summary>
                            <li>

                                <ul className="p-2 w-40 z-1">
                                    <li><a href="sorts/quickSort">Quick Sort</a></li>
                                    <li><a href='sorts/mergeSort'>Merge Sort</a></li>
                                    <li><a href='sorts/bubbleSort'>Bubble Sort</a></li>
                                    <li><a href='sorts/insertionSort'>Insertion Sort</a></li>
                                    <li><a href='sorts/selectionSort'>Selection Sort</a></li>
                                    <li><a href='sorts/heapSort'>Heap Sort</a></li>
                                </ul>
                            </li>
                        </details>
                    </li>
                    <li>
                        <details>

                            <summary>The Algorithms <GiMaze className='text-green-600' /></summary>
                            <li>

                                <ul className="p-2 w-40 z-1">
                                    <li><a href='algorithms/bfs'>Breadth First Search</a></li>
                                    <li><a href='algorithms/dfs'>Depth First Search</a></li>
                                    <li><a href='algorithms/dijkstra'>Dijkstra Search</a></li>
                                </ul>
                            </li>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>Data structures <GiDatabase className='text-green-600' /></summary>
                            <li>

                                <ul className="p-2 w-40 z-1">
                                    <li><a href='datastruct/arrays'>Arrays</a></li>
                                    <li><a href='datastruct/linkedlists'>Linked Lists</a></li>
                                    <li><a href='datastruct/stacks'>Stacks</a></li>
                                    <li><a href='datastruct/queues'>Queues</a></li>
                                    <li><a href='datastruct/trees'>Trees</a></li>
                                    <li><a href='datastruct/heaps'>Heaps</a></li>
                                </ul>
                            </li>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end cursor-pointer" onClick={toggleTheme} >
                {theme === 'dark' ? (<FaMoon className="m-2" />) : (<FaSun className='m-2' />)}
                <a className="btn bg-green-600 border-0">Login</a>

            </div>

        </div>
    )
}

export default NavBar