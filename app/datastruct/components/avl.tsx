'use client'
import React from 'react'
import { TreeNode, updateHeights, balanceFactor, buildAVLTree, isAvlBalanced } from './tree'

type TreeProps = {
    root: TreeNode | null
    highlightedNodes: number[]

}


const getTreeDepth = (node: TreeNode | null): number => {
    if (!node) return 0;
    return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
};





const Avl: React.FC<TreeProps> = ({ root, highlightedNodes, chosenColor }) => {
    if (!root) return null;



    const treeDepth = getTreeDepth(root);

    const TreeNodeDisplay = ({ node, depth = 0 }: { node: TreeNode; depth?: number }) => {
        const isHighlighted = highlightedNodes.includes(node.id);


        const remainingDepth = treeDepth - depth - 1;
        const baseSpacing = 30;
        const spacingMultiplier = Math.pow(2, remainingDepth);
        const horizontalSpacing = baseSpacing * spacingMultiplier;


        const svgWidth = horizontalSpacing * 2 + 60;
        const svgHeight = 40;
        const centerX = svgWidth / 2;
        const leftX = centerX - horizontalSpacing;
        const rightX = centerX + horizontalSpacing;



        return (
            <div className="relative flex flex-col items-center">
                <div
                    className={`rounded-full w-12 h-12 flex items-center justify-center font-bold border-2 shadow-lg transition-all duration-500
            ${isHighlighted
                            ? `${chosenColor} border-white scale-110`
                            : isAvlBalanced(root) ? 'bg-green-600 border-green-400' : 'bg-red-500 border-red-400'
                        } text-white`}
                >
                    <p className='relative left-6' >{node.value}</p>

                    {

                        updateHeights(node) !== null && (
                            <div className="relative left-13 p-0 m-0 text-xs font-mono text-gray-200">
                                H:{updateHeights(node)}
                            </div>
                        )
                    }
                    <div className="relative right-18 p-0 m-0 text-xs font-mono text-gray-200">
                        BF:{balanceFactor(node)}
                    </div>

                </div>

                {(node.left || node.right) && (



                    <svg
                        className="absolute top-12"
                        width={svgWidth}
                        height={svgHeight}
                        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                        style={{ overflow: 'visible' }}
                    >

                        {node.left && (
                            <line
                                x1={centerX}
                                y1="0"
                                x2={leftX + 10}
                                y2={svgHeight + 10}
                                stroke={isAvlBalanced(root) ? "#4ade80" : "#f87171"}
                                strokeWidth="2"
                            />
                        )}

                        {node.right && (
                            <line
                                x1={centerX}
                                y1="0"
                                x2={rightX - 10}
                                y2={svgHeight + 10}
                                stroke={isAvlBalanced(root) ? "#4ade80" : "#f87171"}
                                strokeWidth="2"
                            />
                        )}
                    </svg>


                )}

                {(node.left || node.right) && (
                    <div className="relative flex justify-center" style={{
                        marginTop: `${svgHeight + 8}px`,
                        gap: `${horizontalSpacing}px`
                    }}>

                        <div className="flex justify-center" style={{ width: `${horizontalSpacing}px` }}>
                            {node.left && <TreeNodeDisplay node={node.left} depth={depth + 1} />}
                        </div>


                        <div className="flex justify-center" style={{ width: `${horizontalSpacing}px` }}>
                            {node.right && <TreeNodeDisplay node={node.right} depth={depth + 1} />}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="overflow-auto max-w-full">
            <TreeNodeDisplay node={root} depth={0} />
        </div>
    )
}

export default Avl