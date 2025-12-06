import {input} from "./input.js";
// const input = `
// 123 328  51 64
//  45 64  387 23
//   6 98  215 314
// *   +   *   +  `

const lines = input.split('\n').filter(line => line.trim() !== '');
const expressions = [];
const maxDigits = lines.length - 1;

const opLine = lines[maxDigits]
const regex = /([*+])(\s+)/gm;
const matches = opLine.matchAll(regex);

for (const ops of matches) {
    expressions.push([ops[1], ops[2].length]);
}

let p2 = 0;
const fullExpressions = [];

let idx = 0;

for (const expression of expressions) {
    // Read chunks and shorten strings
    const chunks = [];

    let modifier = ++idx === expressions.length ? 1 : 0;

    for (let i = 0; i < maxDigits; i++) {
        chunks.push(lines[i].slice(0, expression[1] + modifier));
        lines[i] = lines[i].slice(expression[1] + 1);
    }

    const operation = expression[0];

    let subtotal = operation === '+' ? 0 : 1;

    // Construct numbers
    for (let pos = chunks[0].length - 1; pos >= 0; pos--) {
        let num = '';

        for (let idx = 0; idx < maxDigits; idx++) {
            const char = chunks[idx][pos];
            if (char !== ' ') {
                num += char;
            }
        }

        // Mathy time
        subtotal = operation === '+' ? subtotal + Number(num) : subtotal * Number(num);
    }

    p2 += subtotal;
}
console.log('P2:', p2);