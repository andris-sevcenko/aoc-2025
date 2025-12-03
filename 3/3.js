import {input} from "./input.js";

let p1 = 0;

for (const bank of input) {
    let l = bank[0];
    let r = bank[1];
    let max = bank[0] * 10 + bank[1];

    for (let i = 1; i < bank.length; i++) {
        const it = bank[i]

        if (bank[i] > l && i !== bank.length - 1) {
            max = bank[i] * 10 + bank[i + 1];
            l = bank[i];
            r = bank[i + 1];
        } else if (bank[i] > r) {
            max = l * 10 + bank[i];
            r = bank[i];

        }
    }

    p1 += max;
}

console.log('P1:', p1);

