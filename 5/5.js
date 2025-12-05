import {input} from "./input.js";
// const input = `3-5
// 10-14
// 16-20
// 12-18
//
// 1
// 5
// 8
// 11
// 17
// 32`;

const [db, ingredients] = input.split("\n\n")

const prodDb = new Set();
for (const range of db.split("\n")) {
    const [min, max] = range.split('-').map(Number);
    for (const ingredient of ingredients.split("\n").map(Number)) {
        if (ingredient >= min && ingredient <= max) {
            prodDb.add(ingredient);
        }
    }
}
console.log(prodDb.size)