import {input} from "./in.js";

const dial = [];
for (let i = 0; i < 100; i++) {
    dial.push(i);
}

let pos = 50;

let instructions = input;

let sum = 0;
let sum2 = 0;

for (const instruction of instructions.map((el) => el.split(''))) {
    let steps = parseInt(instruction.slice(1).join(''));

    if (instruction[0] === 'L') {
        for (; steps > 0; steps--) {
            pos--;
            if (pos % 100 === 0) {
                sum2++;
            }
        }

        while (pos < 0) {
            pos += 100;
        }
    } else {
        for (; steps > 0; steps--) {
            pos++;
            if (pos % 100 === 0) {
                sum2++;
            }
        }

        while (pos > 99) {
            pos -= 100;
        }
    }

    if (pos === 0) {
        sum++;
    }
}

console.log('P1:', sum)
console.log('P2:', sum2)
