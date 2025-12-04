import {Grid} from "../utils.js";

import {input} from "./input.js";

const grid = new Grid();
grid.setGrid(input)

let p2 = 0;

let removed = false;

do {
    removed = false;
    for (let row = 0; row <= grid.maxGridRow; row++) {
        for (let col = 0; col <= grid.maxGridCol; col++) {
            if (grid.getCell(row, col) !== '@') {
                continue;
            }

            if (grid.getAdjacent(row, col, true).filter(c => c.value === '@').length < 4) {
                grid.setCell(row, col, 'X');
                p2++;
                removed++;
            }
        }
    }
} while (removed);

grid.print(true)
console.log('P2:', p2);