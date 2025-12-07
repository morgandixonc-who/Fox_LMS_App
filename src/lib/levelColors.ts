export const LEVEL_COLORS: string[] = [
    // 1. White
    "#ffffff",

    // 2-29 Spectrum (approx 28 steps across 360 hues)
    // We want a nice rainbow. 
    // Let's use HSL to Hex conversion or just hardcode representative hexes for stability.
    // Actually, generating them is safer to ensure smooth transition.
];

export function getLevelColor(levelId: number): string {
    if (levelId === 1) return "#ffffff";
    if (levelId === 30) return "#000000"; // Pitch black might be hard to see things on, but user requested black.

    // 2-29: Map to Hue
    if (levelId > 1 && levelId < 30) {
        // 28 steps.
        // Hue 0 (Red) to Hue 270 (Purple) or 360 (Red again)?
        // User mentioned the palette "linear-gradient" which is full spectrum.
        // Let's go 0 to 300 (Red to Magenta) to avoid double Red.
        const step = (levelId - 2) / (29 - 2); // 0 to 1
        const hue = Math.floor(step * 360); // Full spectrum might be nice for "rainbow", moving to 360 covers it all
        // Lightness gradient: Start bright (near white) -> End dark (near black)
        // Level 1 is 100% (White), Level 30 is 0% (Black).
        // So Level 2 should be ~95%, Level 29 should be ~5-10%.
        const lightness = 90 - (step * 70); // 90% down to 20%
        return `hsl(${hue}, 90%, ${lightness}%)`;
    }

    // Fallback for > 30 
    return "#cccccc";
}

export function getLevelHue(levelId: number): number {
    if (levelId <= 1) return 0; // White
    if (levelId === 30) return 0; // Black

    if (levelId > 1 && levelId < 30) {
        const step = (levelId - 2) / (29 - 2);
        return Math.floor(step * 300);
    }

    return 0;
}
