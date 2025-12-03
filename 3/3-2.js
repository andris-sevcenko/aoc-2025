import {input} from "./input.js";

const len = 12;

let p2 = 0;

for (const bank of input) {
    const locations = {
        9: [],
        8: [],
        7: [],
        6: [],
        5: [],
        4: [],
        3: [],
        2: [],
        1: [],
        0: [],
    }
    for (let i = 0; i < bank.length; i++) {
        locations[bank[i]].push(i);
    }

    const bankLen = bank.length;

    let num = '';

    const taken = new Set();
    let lastLoc = -1;
    for (let remainingLen = len; remainingLen > 0; remainingLen--) {
        let found = false;
        for (let i = 9; i >= 0; i--) {
            for (let loc of locations[i]) {
                if (bankLen - loc >= remainingLen && !taken.has(loc) && loc > lastLoc) {
                    num += i.toString();
                    found = true;
                    taken.add(loc);
                    lastLoc = loc;
                    break;
                }
            }
            if (found) {
                break;
            }
        }
    }

    p2 += parseInt(num, 10);
}

console.log('P2:', p2);

