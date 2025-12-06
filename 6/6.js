import {input} from "./input.js";
// const input = `123 328  51 64
//  45 64  387 23
//   6 98  215 314
// *   +   *   +  `

const lines = input.split('\n').filter(line => line.trim() !== '');
const expressions = [];

let first = true;
for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    for (let i = 0; i < parts.length; i++) {
        if (first) {
            expressions[i] = [];
        }
        expressions[i].push(parts[i]);
    }
    first = false;
}

let p1 = 0;

for (const expression of expressions) {
    const operation = expression.pop();
    p1 += Number(expression.reduce((acc, val) => operation === '+' ? Number(acc) + Number(val) : acc * val, operation === '+' ? 0 : 1));

    const nums = [];

}
console.log('P1:', p1);