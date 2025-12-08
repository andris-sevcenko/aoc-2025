// import {input} from "./input.js";
import {Grid} from "../utils.js";

const input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`

const gridData = input.split("\n").map((line) => line.split(''))
const grid = new Grid();
grid.setGrid(gridData);
const start = grid.find('S')[0];
start.row++;

const hashBeam = (beam) => {
    return `${beam.row},${beam.col}`;
}

const allBeams = new Set();
allBeams.add(hashBeam(start));

let beams = [start];
let p1 = 0;
let p2 = 0;

while (beams.length > 0) {
    const newBeams = [];

    for (const beam of beams) {
        if (grid.isInBounds(beam.row + 1, beam.col)) {
            const nextMove = grid.getCell(beam.row + 1, beam.col);

            if (nextMove === '^') {
                const splits = [
                    {row: beam.row, col: beam.col - 1},
                    {row: beam.row, col: beam.col + 1}
                ]
                let canBeSplit = false;
                for (const newBeam of splits) {
                    if (grid.isInBounds(newBeam.row, newBeam.col - 1)) {
                        canBeSplit = true;
                        p2++;
                        const hash = hashBeam(newBeam);
                        if (!allBeams.has(hash)) {
                            allBeams.add(hash);
                            newBeams.push(newBeam);
                        }
                    }
                }
                if (canBeSplit) {
                    p1++;
                }
            } else if (nextMove === '.') {
                beam.row++;
                const hash = hashBeam(beam);

                if (!allBeams.has(hash)) {
                    allBeams.add(hash);
                    newBeams.push(beam);
                }

            }
        }
    }
    beams = newBeams;
}

console.log('P1:', p1);
console.log('P2:', p2);