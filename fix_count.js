const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/lib/emotions_data.json');
const rawData = fs.readFileSync(dataPath);
const data = JSON.parse(rawData);
const originalRanked = data.ranked;

console.log(`Original count: ${originalRanked.length}`);

// Target: 395
const TARGET = 395;

if (originalRanked.length === TARGET) {
    console.log("Already 395. Exiting.");
} else {
    // Downsample
    // We want to keep index 0 and index Length-1.
    // And pick 393 items from the middle.

    const newRanked = [];
    newRanked.push(originalRanked[0]); // First

    // We need target-2 more items from the middle (which has length-2 items)
    // Step size
    const availableMiddle = originalRanked.length - 2;
    const neededMiddle = TARGET - 2;

    for (let i = 0; i < neededMiddle; i++) {
        // Map i (0 to needed-1) to original middle index
        // We want to distribute evenly.
        // position in original = (i / (needed-1)) * (available-1)
        // Offset by 1 because we skip index 0
        const percent = i / (neededMiddle - 1);
        const originalIndex = 1 + Math.floor(percent * (availableMiddle - 1));
        newRanked.push(originalRanked[originalIndex]);
    }

    newRanked.push(originalRanked[originalRanked.length - 1]); // Last

    console.log(`New count: ${newRanked.length}`);
    console.log(`First: ${newRanked[0]}`);
    console.log(`Last: ${newRanked[newRanked.length - 1]}`);

    data.ranked = newRanked;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log("Saved.");
}
