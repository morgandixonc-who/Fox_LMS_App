import emotionData from './emotions_data.json';

const { ranked } = emotionData;

export const getEmotion = (h: number, l: number) => {
    // Normalize Hue to 0-359
    const hue = Math.abs(h % 360);
    // Clamp Lightness 0-100
    const lightness = Math.max(0, Math.min(100, l));

    // 1. Map Lightness to the Rank Index.
    // L=100 (White) -> Index 0 (Most Positive)
    // L=0 (Black) -> Index ~394 (Most Negative/Dangerous)

    const listSize = ranked.length;

    // Invert lightness so high L is low index
    const invertedL = 100 - lightness;

    // Base index based purely on lightness
    const baseIndex = Math.floor((invertedL / 100) * listSize);

    // 2. Add variation based on Hue.
    // We don't want every color with the same lightness to be identical.
    // Hue (0-360) travels around the wheel.
    // Let's create a "jitter" or "window" around the base index.
    // A window of +/- 15 items seems reasonable (~30 total options per lightness level, roughly 8% of the list).

    const window = 15;
    // Use Hue to select an offset within [-window, +window]
    // We use a smooth sine wave or just simple mapping. 
    // Let's use simple mapping: (hue / 360) * (2 * window) - window
    // But we might want it to be deterministic and "scrambled" so adjacent Hues pick different things?
    // Actually, "similar colors" usually implies adjacent hues. So maybe a smooth walk is better.
    // Let's use a sine wave based on hue to oscillate the offset.

    const jitter = Math.floor(Math.sin((hue * Math.PI) / 180) * window);

    // 3. Add a specialized "Disorder/Dark" check? 
    // The list is already ranked, so the bottom of the list IS disorder/dark.
    // By mapping L=0 to the end, we automatically handle this.
    // However, if we want VERY dark colors to reach the VERY end, we need to make sure the mapping reaches index 394.

    let finalIndex = baseIndex + jitter;

    // Clamp to valid range
    if (finalIndex < 0) finalIndex = 0;
    if (finalIndex >= listSize) finalIndex = listSize - 1;

    return ranked[finalIndex];
};
