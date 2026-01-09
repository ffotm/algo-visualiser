import { TreeNode, balanceFactor,rotateLeft,rotateRight} from './tree'

type AnimateRotationParams = {
    root: TreeNode
    speed: number
    setRoot: (root: TreeNode) => void
    setHighlightedNodes: (ids: number[]) => void
    setIsRunning: (v: boolean) => void
}

export async function animateRotationWithQueue({
    root,
    speed,
    setRoot,
    setHighlightedNodes,
    setIsRunning
}: AnimateRotationParams) {

    setIsRunning(true)

    const findUnbalanced = (node: TreeNode | null, parent: TreeNode | null = null, isLeft: boolean = false): { node: TreeNode, parent: TreeNode | null, isLeft: boolean } | null => {
        if (!node) return null
        if (Math.abs(balanceFactor(node)) > 1) return { node, parent, isLeft }
        return findUnbalanced(node.left, node, true) || findUnbalanced(node.right, node, false)
    }

    const result = findUnbalanced(root)
    if (!result) {
        setIsRunning(false)
        return
    }

    const { node: unbalanced, parent, isLeft } = result
    setHighlightedNodes([unbalanced.id])
    await sleep(speed)

    const bf = balanceFactor(unbalanced)
    let newSubtreeRoot = unbalanced

    if (bf > 1) {
        // Left heavy
        if (balanceFactor(unbalanced.left!) < 0) {
            // LR case - rotate left on left child first
            await performRotation(unbalanced, 'left-on-child', speed, setRoot, root, parent, isLeft)
            await sleep(speed)
        }
        // Then rotate right on unbalanced node
        newSubtreeRoot = await performRotation(unbalanced, 'right', speed, setRoot, root, parent, isLeft)

    } else if (bf < -1) {
        // Right heavy
        if (balanceFactor(unbalanced.right!) > 0) {
            // RL case - rotate right on right child first
            await performRotation(unbalanced, 'right-on-child', speed, setRoot, root, parent, isLeft)
            await sleep(speed)
        }
        // Then rotate left on unbalanced node
        newSubtreeRoot = await performRotation(unbalanced, 'left', speed, setRoot, root, parent, isLeft)
    }

    setHighlightedNodes([])
    setIsRunning(false)
}

async function performRotation(
    node: TreeNode,
    rotationType: 'left' | 'right' | 'left-on-child' | 'right-on-child',
    speed: number,
    setRoot: (root: TreeNode) => void,
    root: TreeNode,
    parent: TreeNode | null,
    isLeft: boolean
): Promise<TreeNode> {

    // Determine which node to rotate and collect affected nodes
    let rotateNode: TreeNode
    let affectedIds: number[]

    if (rotationType === 'left-on-child') {
        rotateNode = node.left!
        affectedIds = collectSubtree(rotateNode)
        // Capture positions before rotation
        const beforePositions = capturePositions(affectedIds)

        // Perform actual rotation
        node.left = rotateLeft(rotateNode)

        // Update DOM to reflect new structure
        setRoot({ ...root })
        await sleep(50) // Let DOM update

        // Animate from old to new positions
        await animatePositions(affectedIds, beforePositions, speed)
        return node

    } else if (rotationType === 'right-on-child') {
        rotateNode = node.right!
        affectedIds = collectSubtree(rotateNode)
        const beforePositions = capturePositions(affectedIds)

        node.right = rotateRight(rotateNode)
        setRoot({ ...root })
        await sleep(50)
        await animatePositions(affectedIds, beforePositions, speed)
        return node

    } else if (rotationType === 'left') {
        affectedIds = collectSubtree(node)
        const beforePositions = capturePositions(affectedIds)

        const newRoot = rotateLeft(node)

        // Update the tree structure
        if (parent) {
            if (isLeft) parent.left = newRoot
            else parent.right = newRoot
        } else {
            setRoot(newRoot)
        }
        setRoot(parent ? { ...root } : newRoot)
        await sleep(50)
        await animatePositions(affectedIds, beforePositions, speed)
        return newRoot

    } else { // 'right'
        affectedIds = collectSubtree(node)
        const beforePositions = capturePositions(affectedIds)

        const newRoot = rotateRight(node)

        if (parent) {
            if (isLeft) parent.left = newRoot
            else parent.right = newRoot
        } else {
            setRoot(newRoot)
        }
        setRoot(parent ? { ...root } : newRoot)
        await sleep(50)
        await animatePositions(affectedIds, beforePositions, speed)
        return newRoot
    }
}

function capturePositions(ids: number[]): Map<number, DOMRect> {
    const positions = new Map<number, DOMRect>()
    ids.forEach(id => {
        const el = getEl(id)
        if (el) {
            positions.set(id, el.getBoundingClientRect())
        }
    })
    return positions
}

async function animatePositions(
    ids: number[],
    beforePositions: Map<number, DOMRect>,
    speed: number
) {
    const elements = ids.map(id => getEl(id)).filter(Boolean) as HTMLElement[]

    // Get current positions (after rotation)
    const afterPositions = new Map<number, DOMRect>()
    elements.forEach(el => {
        const id = parseInt(el.dataset.nodeId!)
        afterPositions.set(id, el.getBoundingClientRect())
    })

    // Apply inverse transform (move elements back to where they were)
    elements.forEach(el => {
        const id = parseInt(el.dataset.nodeId!)
        const before = beforePositions.get(id)
        const after = afterPositions.get(id)

        if (before && after) {
            const dx = before.left - after.left
            const dy = before.top - after.top

            el.style.transition = 'none'
            el.style.transform = `translate(${dx}px, ${dy}px)`
        }
    })

    // Force reflow
    elements[0]?.offsetHeight

    // Animate to final position
    await new Promise<void>(resolve => {
        requestAnimationFrame(() => {
            elements.forEach(el => {
                el.style.transition = `transform ${speed}ms ease-in-out`
                el.style.transform = 'translate(0, 0)'
            })
            setTimeout(resolve, speed + 50)
        })
    })

    // Cleanup
    elements.forEach(el => {
        el.style.transition = ''
        el.style.transform = ''
    })
}

function sleep(ms: number) {
    return new Promise(res => setTimeout(res, ms))
}

function getEl(id: number) {
    return document.querySelector(
        `[data-node-id="${id}"]`
    ) as HTMLElement | null
}

function collectSubtree(node: TreeNode): number[] {
    const ids: number[] = []
    const dfs = (n: TreeNode | null) => {
        if (!n) return
        ids.push(n.id)
        dfs(n.left)
        dfs(n.right)
    }
    dfs(node)
    return ids
}