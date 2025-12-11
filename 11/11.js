import {input} from "./input.js";

// const input = `aaa: you hhh
// you: bbb ccc
// bbb: ddd eee
// ccc: ddd eee fff
// ddd: ggg
// eee: out
// fff: out
// ggg: out
// hhh: ccc fff iii
// iii: out`

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

const paths = new Set();

const queue = [{node: 'you', path: ['you']}];

while (queue.length > 0) {
    const {node, path} = queue.shift();

    const next = nodes.get(node.out)

    for (const nextStep of nodes.get(node).out) {
        if (nextStep === 'out') {
            const thisPath = path + ',out';
            paths.add(thisPath)
        } else {
            queue.push({node: nextStep, path: path + ',' + nextStep});
        }
    }
}

console.log(paths.size)
