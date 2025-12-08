import {input} from "./input.js";
import {Grid} from "../utils.js";

// const input = `.......S.......
// ...............
// .......^.......
// ...............
// ......^.^......
// ...............
// .....^.^.^.....
// ...............
// ....^.^...^....
// ...............
// ...^.^...^.^...
// ...............
// ..^...^.....^..
// ...............
// .^.^.^.^.^...^.
// ...............`

const gridData = input.split("\n").map((line) => line.split(''))
const grid = new Grid();
grid.setGrid(gridData);
const start = grid.find('S')[0];
const beams = [start];

const memo = new Map();
const travel = (beam, grid, level) => {
    const hash = `${beam.row},${beam.col}`;
    if (memo.has(hash)) {
        return memo.get(hash);
    }
    console.log('at level', level, Math.random())
    while (grid.getCell(beam.row + 1, beam.col) === '.') {
        beam.row++;
    }
    if (!grid.isInBounds(beam.row + 1, beam.col)) {
        return 1;
    }

    let subTotal = 0;
    if (grid.isInBounds(beam.row, beam.col - 1)) {
        subTotal += travel({row: beam.row, col: beam.col - 1}, grid, level + 1);
    }
    if (grid.isInBounds(beam.row, beam.col + 1)) {
        subTotal += travel({row: beam.row, col: beam.col + 1}, grid, level + 1);
    }

    memo.set(hash, subTotal);
    return subTotal;
}

console.log(travel(start, grid, 1))