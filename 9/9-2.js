import {input} from "./input.js";

import {Grid} from "../utils.js";

// const input = `7,1
// 11,1
// 11,7
// 9,7
// 9,5
// 2,5
// 2,3
// 7,3`

const corners = input.split("\n").map(line => line.split(',').map(Number));

const floor = new Grid();
let minX, minY, maxX, maxY;

const connect = (grid, from, to) => {
    if (from[0] === to[0]) {
        // vertical line
        let start = Math.min(from[1], to[1]);
        let stop = Math.max(from[1], to[1]);
        for (let row = start; row <= stop; row++) {
            floor.setCell(row, to[0], '#');
        }
    } else if (from[1] === to[1]) {
        // horizontal line
        let start = Math.min(from[0], to[0]);
        let stop = Math.max(from[0], to[0]);
        for (let col = start; col <= stop; col++) {
            floor.setCell(to[1], col, '#');
        }
    }
}

const leftMap = new Map()
const rightMap = new Map()
const isInside = (grid, point) => {
    const memoKey = point[0] + '-' + point[1];
    if (leftMap.has(memoKey)) {
        return leftMap.get(memoKey)
    }
    if (rightMap.has(memoKey)) {
        return rightMap.get(memoKey)
    }

    if (grid.getCell(point[1], point[0]) === '#') {
        return true;
    }


    let isInside = false;
    let alongTheWall = false;
    let insideBefore = false;
    let cornerPointsUp = false;
    let previous = '';

    if (point[0] - grid.minGridCol < grid.maxGridCol - point[0]) {
        for (let i = grid.minGridCol; i <= point[0]; i++) {
            const cell = grid.getCell(point[1], i);

            // Meeting a wall
            if (cell === '#') {
                isInside = true; // Technically inside

                // Just met the wall
                if (previous === '.') {
                    // Gonna cross it
                    if (grid.getCell(point[1] + 1, i) !== '#') {
                        // Nothing
                    } else {
                        // Stepping on a corner
                        alongTheWall = true;
                        cornerPointsUp = grid.getCell(point[1], i + 1) !== '#';
                    }
                }
            } else {
                if (previous === '#') {
                    if (alongTheWall) {
                        if (grid.getCell(point[1] + 1, i - 1) !== '#') {
                            // Leaving the wall
                            alongTheWall = false;
                            isInside = cornerPointsUp ? insideBefore : !insideBefore;
                        }
                    } else {
                        isInside = !insideBefore
                        insideBefore = isInside;
                    }
                } else {
                    // Nothing
                }
            }

            previous = cell;
        }
        leftMap.set(memoKey, isInside);
    } else {
        for (let i = grid.maxGridCol; i >= point[0]; i--) {
            const cell = grid.getCell(point[1], i);

            // Meeting a wall
            if (cell === '#') {
                isInside = true; // Technically inside

                // Just met the wall
                if (previous === '.') {
                    // Gonna cross it
                    if (grid.getCell(point[1] - 1, i) !== '#') {
                        // Nothing
                    } else {
                        // Stepping on a corner
                        alongTheWall = true;
                        cornerPointsUp = grid.getCell(point[1], i - 1) !== '#';
                    }
                }
            } else {
                if (previous === '#') {
                    if (alongTheWall) {
                        if (grid.getCell(point[1] + 1, i + 1) !== '#') {
                            // Leaving the wall
                            alongTheWall = false;
                            isInside = cornerPointsUp ? insideBefore : !insideBefore;
                        }
                    } else {
                        isInside = !insideBefore
                        insideBefore = isInside;
                    }
                } else {
                    // Nothing
                }
            }

            previous = cell;
        }
        rightMap.set(memoKey, isInside);

    }

    return isInside;
}

for (let i = 0; i < corners.length; i++) {
    floor.setCell(corners[i][1], corners[i][0], '#');
    // Keep track of bounds
    minX = !isNaN(minX) ? Math.min(minX, corners[i][0]) : corners[i][0];
    minY = !isNaN(minY) ? Math.min(minY, corners[i][1]) : corners[i][1];
    maxX = !isNaN(maxX) ? Math.max(maxX, corners[i][0]) : corners[i][0];
    maxY = !isNaN(maxY) ? Math.max(maxY, corners[i][1]) : corners[i][1];

    if (i > 0) {
        let previous = corners[i - 1];
        connect(floor, previous, corners[i])
    }
}
floor.minGridCol = minX;
floor.maxGridCol = maxX;
floor.minGridRow = minY;
floor.maxGridRow = maxY;

connect(floor, corners[0], corners[corners.length - 1]);
let p2 = 1000000000;
let tooBig = 3000000000

for (let i = 0; i < corners.length; i++) {
    for (let j = i + 1; j < corners.length; j++) {
        const first = corners[i];
        const second = corners[j];

        let area = (Math.abs(first[0] - second[0]) + 1) * (Math.abs(first[1] - second[1]) + 1);
        if (area <= p2) {
            console.log('skip', Math.random());
            continue;
        }

        let startCol = first[0] > second[0] ? second[0] : first[0];
        let endCol = first[0] > second[0] ? first[0] : second[0];
        let startRow = first[1] > second[1] ? second[1] : first[1];
        let endRow = first[1] > second[1] ? first[1] : second[1];

        let isPointInside = true;

        for (let y = startRow; y <= endRow; y++) {
            if (!isInside(floor, [startCol, y]) || !isInside(floor, [endCol, y])) {
                isPointInside = false;
                break;
            }
        }
        if (!isPointInside) {
            continue;
        }

        for (let x = startCol; x <= endCol; x++) {
            if (!isInside(floor, [x, startRow]) || !isInside(floor, [x, endRow])) {
                isPointInside = false;
                break;
            }
        }
        if (!isPointInside) {
            continue;
        }

        p2 = area
    }
}

console.log('P2:', p2);