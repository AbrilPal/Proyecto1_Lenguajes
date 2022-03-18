import TreeNode from "./TreeNode";

export const tree_to_afn = (treeNode: TreeNode, links:Array<Array<string|undefined>>, initialState: number, finalState: number):Array<Array<string|undefined>> => {
    let newLinks = [...links];

    if (treeNode.isLeaf()) {
        newLinks[initialState][finalState] = treeNode.value;
    } else if (treeNode.type === 2) { 
        newLinks = addStateToLinks(newLinks);
        const concatNodeState = newLinks.length - 1;

        if (treeNode.leftChild !== null) {
            newLinks = tree_to_afn(treeNode.leftChild, newLinks, initialState, concatNodeState);
        }

        if (treeNode.rightChild !== null) {
            newLinks = tree_to_afn(treeNode.rightChild, newLinks, concatNodeState, finalState);
        }
    } else if (treeNode.type === 1) {
        newLinks = addStateToLinks(newLinks);
        const r1LeftState = newLinks.length - 1;

        newLinks = addStateToLinks(newLinks);
        const r1RightState = newLinks.length - 1;

        newLinks = addStateToLinks(newLinks);
        const r2LeftState = newLinks.length - 1;

        newLinks = addStateToLinks(newLinks);
        const r2RightState = newLinks.length - 1;

        newLinks[initialState][r1LeftState] = 'ε';
        newLinks[initialState][r2LeftState] = 'ε';
        newLinks[r1RightState][finalState] = 'ε';
        newLinks[r2RightState][finalState] = 'ε';

        if (treeNode.leftChild !== null) {
            newLinks = tree_to_afn(treeNode.leftChild, newLinks, r1LeftState, r1RightState);
        }

        if (treeNode.rightChild !== null) {
            newLinks = tree_to_afn(treeNode.rightChild, newLinks, r2LeftState, r2RightState);
        }
    } else if (treeNode.type === 3) {
        newLinks = addStateToLinks(newLinks);
        const rLeftState = newLinks.length - 1;
        
        newLinks = addStateToLinks(newLinks);
        const rRightState = newLinks.length - 1;

        newLinks[initialState][rLeftState] = 'ε';
        newLinks[initialState][finalState] = 'ε';
        newLinks[rRightState][finalState] = 'ε';
        newLinks[rRightState][rLeftState] = 'ε';

        if (treeNode.rightChild !== null) {
            newLinks = tree_to_afn(treeNode.rightChild, newLinks, rLeftState, rRightState);
        }
    } else if (treeNode.type === 4) {
        newLinks = addStateToLinks(newLinks);
        const rState = newLinks.length - 1;
        
        newLinks = addStateToLinks(newLinks);
        const rSelfLoopState = newLinks.length - 1;

        newLinks[initialState][rState] = 'ε';
        newLinks[rState][finalState] = 'ε';
        newLinks[rSelfLoopState][rState] = 'ε';

        if (treeNode.rightChild !== null) {
            newLinks = tree_to_afn(treeNode.rightChild, newLinks, rState, rSelfLoopState);
        }
    } else if (treeNode.type === 5) {
        newLinks = addStateToLinks(newLinks);
        const r1LeftState = newLinks.length - 1;

        newLinks = addStateToLinks(newLinks);
        const r1RightState = newLinks.length - 1;

        newLinks[initialState][finalState] = 'ε';
        newLinks[initialState][r1LeftState] = 'ε';
        newLinks[r1RightState][finalState] = 'ε';

        if (treeNode.rightChild !== null) {
            newLinks = tree_to_afn(treeNode.rightChild, newLinks, r1LeftState, r1RightState);
        }

    }

    return newLinks;
}

const addStateToLinks = (links:Array<Array<string|undefined>>): Array<Array<string|undefined>> => {
    let newLinks = [...links];

    newLinks = [...newLinks, []]

    newLinks.forEach((node, i) => {
        newLinks[i][newLinks.length - 1] = undefined;
    });

    return newLinks;
}

export const convert_matrix_to_d3_graph = (matrix: Array<Array<string|undefined>>): object => {
    let nodes: Array<object> = [];
    let links: Array<object> = [];

    matrix.forEach((nodeLinks, i) => {
        nodes.push({id: i, label: i, isInitial: i === 0, isFinal: i === 1});

        nodeLinks.forEach((link, j) => {
            if (link !== undefined) {
                links.push({source: i, target: j, label: link})
            }
        })
    });

    return { nodes: nodes, links: links }
}