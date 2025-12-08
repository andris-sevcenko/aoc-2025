import {input} from "./input.js";

// const input = `162,817,812
// 57,618,57
// 906,360,560
// 592,479,940
// 352,342,300
// 466,668,158
// 542,29,236
// 431,825,988
// 739,650,466
// 52,470,668
// 216,146,977
// 819,987,18
// 117,168,530
// 805,96,715
// 346,949,466
// 970,615,88
// 941,993,340
// 862,61,35
// 984,92,344
// 425,690,689`

class JunctionBox {
    id = null;
    x = 0;
    circuit = '';

    constructor(x, y, z) {
        this.id = x + '-' + y + '-' + z;
        this.x = x;
    }

    setCircuit(circuit) {
        this.circuit = circuit;
    }
}
const junctions = input.split("\n").map(line => line.split(",").map(Number));

const junctionCollection = new Map();

const getDistance = (a, b) => {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

const distanceMap = new Map()
const distances = [];

for (let i = 0; i < junctions.length; i++) {
    const junction1 = new JunctionBox(junctions[i][0], junctions[i][1], junctions[i][2])
    junctionCollection.set(junction1.id, junction1);

    for (let j = i + 1; j < junctions.length; j++) {
        const junction2 = new JunctionBox(junctions[j][0], junctions[j][1], junctions[j][2])
        junctionCollection.set(junction2.id, junction2);
        const dist = getDistance(junctions[i], junctions[j]);
        const comboKey = `${junction1.id},${junction2.id}`;
        distanceMap.set(dist, comboKey)
        distances.push(dist)
    }
}

const circuitCollection = new Map();
const sorted = distances.sort((a, b) => a - b);

let circuitIdx = 0;

let iter = 0;
for (const dist of sorted) {
    const box1 = junctionCollection.get(distanceMap.get(dist).split(",")[0]);
    const box2 = junctionCollection.get(distanceMap.get(dist).split(",")[1]);

    // Connect
    if (box1.circuit.length && !box2.circuit.length) {
        box2.circuit = box1.circuit
    } else if (!box1.circuit.length && box2.circuit.length) {
        box1.circuit = box2.circuit
    } else if (!box1.circuit.length &&! box2.circuit.length) {
        const circuit = 'circuit-' + circuitIdx++;
        box1.circuit = circuit;
        box2.circuit = circuit;
    // Merge circuits
    } else if (box1.circuit !== box2.circuit) {
        circuitCollection.set(box1.circuit, new Set([...circuitCollection.get(box1.circuit), ...circuitCollection.get(box2.circuit)]));
        const deleteCircuit = box2.circuit;

        for (const boxId of circuitCollection.get(box2.circuit)) {
            const box = junctionCollection.get(boxId);
            box.circuit = box1.circuit;
        }

        circuitCollection.delete(deleteCircuit);
    }

    // In case this was a new connection, make it
    const circuitSet = circuitCollection.get(box1.circuit) ?? new Set();
    circuitSet.add(box1.id);
    circuitSet.add(box2.id);
    circuitCollection.set(box1.circuit, circuitSet);
    if (circuitCollection.get(box1.circuit).size === junctionCollection.size) {
        console.log('P2:', box1.x * box2.x);
        break;
    }

    if (++iter === 1000) {
        const circuitSizes = [];
        for (const [circuitId, boxSet] of circuitCollection) {
            circuitSizes.push(boxSet.size)
        }
        console.log('P1:', circuitSizes.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1));
    }
}
