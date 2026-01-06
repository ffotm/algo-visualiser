'use client'
import React, { useState } from 'react'
import PillNav from './pillNav'



const Tabss = ({ algo, setAlgo }: any) => {


    const [showCode, setShowCode] = useState(false);
    const navItems = [
        { label: 'Dijkstra', href: '#dijkstra' },
        { label: 'BFS', href: '#bfs' },
        { label: 'DFS', href: '#dfs' }
    ];

    const handleItemClick = (href: string) => {
        setAlgo(href.replace('#', ''));
    };

    const algoInfo: any = {
        dijkstra: {
            name: "Dijkstra's Algorithm",
            description: "Finds the shortest path between nodes using weighted edges. Guarantees the shortest path.",
            complexity: "Time: O((V + E) log V) | Space: O(V)",
            pseudocode: `function dijkstra(graph, start, end):
    distances[start] = 0
    unvisited = all nodes in graph
    
    while unvisited is not empty:
        current = node in unvisited with minimum distance
        if current == end: break
        remove current from unvisited
        
        for each neighbor of current:
            alt = distances[current] + weight(current, neighbor)
            if alt < distances[neighbor]:
                distances[neighbor] = alt
                previous[neighbor] = current
    
    return path from start to end`
        },
        bfs: {
            name: "Breadth First Search",
            description: "Explores graph level by level. Guarantees shortest path in unweighted graphs.",
            complexity: "Time: O(V + E) | Space: O(V)",
            pseudocode: `function bfs(graph, start, end):
    queue = [start]
    visited = set()

    while queue is not empty:
        current = queue.dequeue()
        if current == end: break

        for each neighbor of current:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)

    return path from start to end`
        },
        dfs: {
            name: "Depth First Search",
            description: "Explores as far as possible along each branch before backtracking. Does not guarantee shortest path.",
            complexity: "Time: O(V + E) | Space: O(V)",
            pseudocode: `function dfs(graph, start, end):
    stack = [start]
    visited = set()

    while stack is not empty:
        current = stack.pop()
        if current == end: break

        if current not in visited:
            visited.add(current)
            for each neighbor of current:
                if neighbor not in visited:
                    stack.push(neighbor)

    return path from start to end`
        }
    };

    const currentAlgo = algoInfo[algo];

    return (
        <div className="w-full mb-6">
            <PillNav items={navItems} activeHref={`#${algo}`} onItemClick={handleItemClick} className='ml-120' />

            <div className="bg-green-950 rounded-xl p-6 shadow-lg border border-var(--border) ">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">{currentAlgo.name}</h2>
                        <p className="text-gray-300 text-sm mb-3">{currentAlgo.description}</p>
                        <p className="text-green-400 text-xs font-mono">{currentAlgo.complexity}</p>
                    </div>

                    <button
                        onClick={() => setShowCode(!showCode)}
                        className="ml-4 bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                        {showCode ? 'Hide Code' : 'Show Code'}
                        <svg
                            className={`w-4 h-4 transition-transform ${showCode ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {showCode && (
                    <div className="mt-4 p-4 rounded-lg bg-gray-900 border border-gray-700 overflow-x-auto">
                        <pre className="text-sm font-mono text-gray-200 whitespace-pre-wrap">
                            {currentAlgo.pseudocode}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Tabss;