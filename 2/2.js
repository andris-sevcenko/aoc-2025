import {input} from "./input.js";

let p1 = 0;
let p2 = 0;

for (const sample of input) {;
    for (let id = sample[0]; id <= sample[1]; id++) {
        const idStr = id.toString();
        const len = idStr.length;

        // P1
        if (len % 2 === 0 && idStr.slice(0, len / 2) === idStr.slice(len / 2)) {
            p1 += id;
        }

        // P2
        let found = false;
        for (let possibleSegmentSize = Math.floor(len / 2); possibleSegmentSize > 0; possibleSegmentSize--) {
            if (len % possibleSegmentSize !== 0) {
                continue;
            }

            let checkableString = idStr;
            const check = checkableString.slice(0, possibleSegmentSize);

            while (checkableString.length) {
                if (checkableString.substring(0, possibleSegmentSize) !== check) {
                    break;
                }
                checkableString = checkableString.substring(possibleSegmentSize);
                if (checkableString.length === 0) {
                    p2 += id;
                    found = true;
                    break;
                }
            }

            if (found) {
                break;
            }
        }
    }
}

console.log('P1:', p1);
console.log('P2:', p2);