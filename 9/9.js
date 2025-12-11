import {input} from "./input.js";

// const input = `7,1
// 11,1
// 11,7
// 9,7
// 9,5
// 2,5
// 2,3
// 7,3`

const corners = input.split("\n").map(line => line.split(',').map(Number));

let p1 = 0;
for (let i = 0; i < corners.length; i++) {
    for (let j = i + 1; j < corners.length; j++) {
        let area = (Math.abs(corners[i][0] - corners[j][0]) + 1) * (Math.abs(corners[i][1] - corners[j][1]) + 1);
        if (area > p1) {
            p1 = area
            console.log(area, corners[i], corners[j]);
        }
    }
}
console.log('P1:', p1);