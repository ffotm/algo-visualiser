import React from 'react'
import { SiThealgorithms } from "react-icons/si";
import { usePathname } from 'next/navigation';



const NavBar = () => {
    const currentPath = usePathname();
    return (


        <div className="navbar bg-white text-black p-4 border-b border-gray-200 shadow-sm max-h-20px">
            <div className="navbar-start">
                <SiThealgorithms className="w-10 h-10 mr-5" />
                <h1 className="text-xl font-bold">Algorithm Visualizer</h1>
            </div>
            <div className="navbar-center  lg:flex dropdown-content">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                            <summary>The Sorts</summary>
                            <li>

                                <ul className="p-2 w-40 z-1">
                                    <li><a>Quick Sort</a></li>
                                    <li><a>Merge Sort</a></li>
                                    <li><a>Bubble Sort</a></li>
                                    <li><a>Insertion Sort</a></li>
                                    <li><a>Selection Sort</a></li>
                                    <li><a>Heap Sort</a></li>

                                </ul>
                            </li>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>The Algorithms</summary>
                            <li>

                                <ul className="p-2 w-40 z-1">
                                    <li><a>Breadth First Search</a></li>
                                    <li><a>Depth First Search</a></li>
                                    <li><a>Dijkstra Search</a></li>
                                </ul>
                            </li>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>Data structures</summary>
                            <li>

                                <ul className="p-2 w-40 z-1">
                                    <li><a>Arrays</a></li>
                                    <li><a>Linked Lists</a></li>
                                    <li><a>Stacks</a></li>
                                    <li><a>Queues</a></li>
                                    <li><a>Trees</a></li>
                                    <li><a>Heaps</a></li>
                                </ul>
                            </li>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Login</a>
            </div>
        </div>
    )
}

export default NavBar