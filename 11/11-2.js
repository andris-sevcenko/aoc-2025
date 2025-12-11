import {input} from "./input.js";

class Node {
    id = '';
    out = [];

    constructor(id, out) {
        this.id = id;
        this.out = out;
    }
}

const nodes = new Map();

input.split("\n").map(line => {
    const [key, vals] = line.split(": ");
    nodes.set(key, new Node(key, vals.split(" ")));
});


const countPaths = (start, end, limit, filter = '') => {
    const paths = new Set();
    const visited = new Set();
    const pushed = new Set();

    const queue = [{node: start, path: [start]}];

    while (queue.length > 0) {
        const {node, path} = queue.shift();
        const pathKey = path.join('-');

        if (visited.has(pathKey)) {
            continue;
        }

        visited.add(pathKey)

        const next = nodes.get(node.out)

        for (const nextStep of nodes.get(node).out) {
            const newPath = [...path];
            newPath.push(nextStep)

            if (newPath.length > limit) {
                continue;
            }

            if (nextStep === end) {
                paths.add(newPath)
            } else {
                if (path.includes(nextStep) || pushed.has(path.join('-') + nextStep)) {
                    continue;
                }
                pushed.add(path.join('-') + nextStep)
                // console.log(queue.length)
                queue.push({node: nextStep, path: newPath});
            }
        }
    }

    if (filter.length) {
        for (const p of Array.from(paths)) {
            if (!p.includes(filter)) {
                paths.delete(p);
            }
        }
    }

    return paths.size;
}

// Level computpation data, based on the graph structure
const levels = [
    {next: ['pzi', 'zyi', 'muy'], limit: 8},
    {next: ['edr', 'ehw', 'vht', 'vjh', 'kqn'], filter: 'fft', limit: 7},
    {next: ['rpn', 'apc', 'lpz'], limit: 8},
    {next: ['tql', 'jvl', 'cix', 'jyw', 'xct'], limit: 7},
    {next: ['qdo', 'sdo', 'ire', 'you'], filter: 'dac', limit: 7},
    {next: ['out'], limit: 8}
]

let nextOutcomes = {'svr': 1}

for (const level of levels) {
    const previousOutcomes = {...nextOutcomes};
    nextOutcomes = {}
    for (const [prev, prevPaths] of Object.entries(previousOutcomes)) {
        for (const next of level.next) {
            const subtotal = nextOutcomes[next] ?? 0
            nextOutcomes[next] = subtotal + (prevPaths * countPaths(prev, next, level.limit, level.filter));
        }
    }
    console.log(nextOutcomes)
}
