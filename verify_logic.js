const fs = require('fs');
const path = require('path');

// Load Data
const dataPath = path.join(__dirname, 'src/lib/emotions_data.json');
const rawData = fs.readFileSync(dataPath);
const { ranked } = JSON.parse(rawData);

console.log(`Loaded ${ranked.length} emotions.`);

// Logic from src/lib/emotions.ts
const getEmotion = (h, l) => {
    const hue = Math.abs(h % 360);
    const lightness = Math.max(0, Math.min(100, l));

    const listSize = ranked.length;
    const invertedL = 100 - lightness;
    const baseIndex = Math.floor((invertedL / 100) * listSize);

    const window = 15;
    const jitter = Math.floor(Math.sin((hue * Math.PI) / 180) * window);

    let finalIndex = baseIndex + jitter;
    if (finalIndex < 0) finalIndex = 0;
    if (finalIndex >= listSize) finalIndex = listSize - 1;

    return {
        emotion: ranked[finalIndex],
        index: finalIndex,
        baseIndex
    };
};

// Test Cases
const testCases = [
    { name: "White (Positive)", h: 0, l: 100 },
    { name: "Light Blue (Positive)", h: 200, l: 90 },
    { name: "Mid Grey (Neutral)", h: 0, l: 50 },
    { name: "Dark Red (Negative)", h: 0, l: 20 },
    { name: "Black (Disorder)", h: 0, l: 0 },
    { name: "Black with Hue (Disorder)", h: 120, l: 0 }
];

testCases.forEach(tc => {
    const result = getEmotion(tc.h, tc.l);
    console.log(`${tc.name} [H:${tc.h}, L:${tc.l}] -> Index: ${result.index} (Base: ${result.baseIndex}) -> Emotion: "${result.emotion}"`);
});
