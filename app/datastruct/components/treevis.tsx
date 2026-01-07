'use client'
import React from 'react'
import { TreeNode } from './tree'
import { useEffect } from 'react'


type TreeProps = {
    root: TreeNode | null
    highlightedNodes: number[]
}

const Tree: React.FC<TreeProps> = ({ root, highlightedNodes }) => {
    if (!root) return null

    const TreeNodeDisplay = ({ node }: { node: TreeNode }) => {
        const isHighlighted = highlightedNodes.includes(node.id)

        return (
            <div className="relative flex flex-col items-center">
                <div
                    className={`rounded-full w-12 h-12 flex items-center justify-center font-bold border-2 shadow-lg transition-all duration-300
            ${isHighlighted
                            ? 'bg-yellow-500 border-yellow-300 scale-110'
                            : 'bg-green-600 border-green-400'
                        } text-white`}
                >
                    {node.value}
                </div>



                {(node.left || node.right) && (
                    <svg
                        className="absolute top-12"
                        width="200"
                        height="40"
                        viewBox="0 0 200 40"
                    >
                        {node.left && (
                            <line
                                x1="100"
                                y1="0"
                                x2="50"
                                y2="40"
                                stroke="#4ade80"
                                strokeWidth="2"
                            />
                        )}
                        {node.right && (
                            <line
                                x1="100"
                                y1="0"
                                x2="150"
                                y2="40"
                                stroke="#4ade80"
                                strokeWidth="2"
                            />
                        )}
                    </svg>
                )}


                {(node.left || node.right) && (

                    <div className="flex gap-6 mt-6">

                        {node.left && <TreeNodeDisplay node={node.left} />}
                        {node.right && <TreeNodeDisplay node={node.right} />}
                    </div>
                )}
            </div>
        )
    }

    return <TreeNodeDisplay node={root} />
}

export default Tree
