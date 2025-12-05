import {input} from "./input.js";
// const input = `4-5
// 2-6
// 1-1
//
// 1`;

const [db, ingredients] = input.split("\n\n")
let p2 = 0;

const checkedRanges = [];

let allRanges = db.split("\n").map(r => r.split('-').map(Number));

for (const range of allRanges) {
    let min = range[0];
    let max = range[1];

    if (max < min) {
        continue
    }
    let valid = true;
    for (const checkedRange of checkedRanges) {
        // Checked range inside current range, split into two edge ranges
        if (checkedRange[0] >= min && checkedRange[1] <= max) {
            allRanges.push([min, checkedRange[0] - 1]);
            allRanges.push([checkedRange[1] + 1, max]);
            valid = false;
            break;
        }
        if (min <= checkedRange[0] && max >= checkedRange[0]) {
            allRanges.push([min, checkedRange[0] - 1]);
            valid = false;
            break;
        }
        if (min <= checkedRange[1] && max >= checkedRange[1]) {
            allRanges.push([checkedRange[1] + 1, max]);
            valid = false;
            break;
        }
        if (min >= checkedRange[0] && max <= checkedRange[1]) {
            // Current range fully inside checked range, skip
            valid = false;
            break;
        }
    }

    if (valid) {
        p2 += max - min + 1;
        checkedRanges.push([min, max]);

    }
}

console.log('P2:', p2);
