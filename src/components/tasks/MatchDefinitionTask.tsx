import React, { useState, useEffect } from 'react';

// New prop structure based on prompt update
interface MatchDefinitionTaskProps {
    pairs?: Array<{ term: string, definition: string }>;
    // Fallback for old simple generation
    term?: string;
    definition?: string;
    onComplete?: (success: boolean) => void;
}

interface Tile {
    id: string;
    text: string;
    type: 'term' | 'definition';
    matchId: string; // The ID of its partner
    isMatched: boolean;
    state: 'default' | 'selected' | 'matched' | 'error';
}

export default function MatchDefinitionTask({ pairs, term, definition, onComplete }: MatchDefinitionTaskProps) {
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [selectedTileId, setSelectedTileId] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Initialize Game Board
        let gamePairs: Array<{ term: string, definition: string }> = [];

        if (pairs && pairs.length > 0) {
            gamePairs = pairs;
        } else if (term && definition) {
            // Fallback for old single pair
            gamePairs = [{ term, definition }];
            // To make it a "game", maybe add some dummy distractors? 
            // Or just let it be a single pair match (boring but functional)
        }

        const newTiles: Tile[] = [];

        // Create Terms and Definitions arrays
        const termTiles: Tile[] = [];
        const defTiles: Tile[] = [];

        gamePairs.forEach((pair, idx) => {
            // Term Tile
            termTiles.push({
                id: `term-${idx}`,
                text: pair.term,
                type: 'term',
                matchId: `def-${idx}`,
                isMatched: false,
                state: 'default'
            });
            // Definition Tile
            defTiles.push({
                id: `def-${idx}`,
                text: pair.definition,
                type: 'definition',
                matchId: `term-${idx}`,
                isMatched: false,
                state: 'default'
            });
        });

        // Shuffle independently
        const shuffledTerms = termTiles.sort(() => Math.random() - 0.5);
        const shuffledDefs = defTiles.sort(() => Math.random() - 0.5);

        // Concatenate for state (order in array doesn't matter for rendering as we filter by type now, 
        // but we normally wan to keep them together if we were mapping directly. 
        // Since we filter in render, just concat is fine)
        setTiles([...shuffledTerms, ...shuffledDefs]);
        setSelectedTileId(null);
        setShowSuccess(false);
    }, [pairs, term, definition]);

    const handleTileClick = (clickedTile: Tile) => {
        if (isChecking) return;
        if (clickedTile.isMatched) return;
        if (clickedTile.state === 'selected') {
            // Deselect
            setTiles(prev => prev.map(t => t.id === clickedTile.id ? { ...t, state: 'default' } : t));
            setSelectedTileId(null);
            return;
        }

        // Select
        if (!selectedTileId) {
            // First selection
            setTiles(prev => prev.map(t => t.id === clickedTile.id ? { ...t, state: 'selected' } : t));
            setSelectedTileId(clickedTile.id);
        } else {
            // Second selection (Check Match)
            const firstTile = tiles.find(t => t.id === selectedTileId);
            if (!firstTile) return;

            // Visual update for second selection
            setTiles(prev => prev.map(t => t.id === clickedTile.id ? { ...t, state: 'selected' } : t));
            setIsChecking(true);

            // Logic Check
            const isMatch = firstTile.matchId === clickedTile.id;

            if (isMatch) {
                // Success State
                setTimeout(() => {
                    setTiles(prev => prev.map(t =>
                        (t.id === firstTile.id || t.id === clickedTile.id)
                            ? { ...t, state: 'matched', isMatched: true }
                            : t
                    ));
                    setSelectedTileId(null);
                    setIsChecking(false);
                    checkWin();
                }, 500);
            } else {
                // Failure State
                setTiles(prev => prev.map(t =>
                    (t.id === firstTile.id || t.id === clickedTile.id)
                        ? { ...t, state: 'error' }
                        : t
                ));

                setTimeout(() => {
                    // Reset
                    setTiles(prev => prev.map(t =>
                        (t.id === firstTile.id || t.id === clickedTile.id)
                            ? { ...t, state: 'default' }
                            : t
                    ));
                    setSelectedTileId(null);
                    setIsChecking(false);
                }, 1000);
            }
        }
    };

    const checkWin = () => {
        // We need to check state AFTER the update, but state updates are async.
        // Better: Check if all *other* tiles are matched + the current 2 just matched.
        // Actually, simplest is to check in a useEffect or just check count.
        // If we just matched 2, and total matched count becomes total tiles...
        // Let's use useEffect to watch 'tiles' for victory condition.
    };

    // Watch for win
    useEffect(() => {
        if (tiles.length > 0 && tiles.every(t => t.isMatched)) {
            // Win!
            if (!showSuccess) {
                setShowSuccess(true);
                if (onComplete) setTimeout(() => onComplete(true), 1500);
            }
        }
    }, [tiles, onComplete]);

    return (
        <div style={{
            padding: '30px',
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            border: '1px solid #f3f4f6',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{
                color: '#db2777',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '0.9rem',
                fontWeight: '800'
            }}>
                Match the Pairs
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '40px',
                flex: 1,
                width: '100%',
                alignItems: 'start'
            }}>
                {/* Column 1: Terms */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Terms</div>
                    {tiles.filter(t => t.type === 'term').map((tile) => {
                        let bg = 'white';
                        let border = '#e5e7eb';
                        let color = '#4b5563';
                        let shadow = '0 2px 4px rgba(0,0,0,0.02)';
                        let scale = 'scale(1)';

                        if (tile.state === 'selected') {
                            bg = '#eff6ff';
                            border = '#3b82f6';
                            color = '#1d4ed8';
                            shadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
                            scale = 'scale(1.02)';
                        } else if (tile.state === 'matched') {
                            bg = '#ecfdf5';
                            border = '#10b981';
                            color = '#047857';
                            scale = 'scale(0.95)';
                            // opacity = 0.8;
                        } else if (tile.state === 'error') {
                            bg = '#fef2f2';
                            border = '#ef4444';
                            color = '#b91c1c';
                        }

                        return (
                            <button
                                key={tile.id}
                                onClick={() => handleTileClick(tile)}
                                disabled={tile.isMatched || (isChecking && tile.state !== 'selected' && tile.state !== 'error')}
                                style={{
                                    padding: '20px',
                                    borderRadius: '16px',
                                    border: `2px solid ${border}`,
                                    background: bg,
                                    color: color,
                                    cursor: tile.isMatched ? 'default' : 'pointer',
                                    fontSize: '1.rem',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: scale,
                                    boxShadow: shadow,
                                    minHeight: '80px',
                                    opacity: tile.isMatched ? 0.6 : 1,
                                    width: '100%'
                                }}
                            >
                                {tile.text}
                            </button>
                        )
                    })}
                </div>

                {/* Column 2: Definitions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Definitions</div>
                    {tiles.filter(t => t.type === 'definition').map((tile) => {
                        let bg = 'white';
                        let border = '#e5e7eb';
                        let color = '#4b5563';
                        let shadow = '0 2px 4px rgba(0,0,0,0.02)';
                        let scale = 'scale(1)';

                        if (tile.state === 'selected') {
                            bg = '#eff6ff';
                            border = '#3b82f6';
                            color = '#1d4ed8';
                            shadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
                            scale = 'scale(1.02)';
                        } else if (tile.state === 'matched') {
                            bg = '#ecfdf5';
                            border = '#10b981';
                            color = '#047857';
                            scale = 'scale(0.95)';
                            // opacity = 0.8;
                        } else if (tile.state === 'error') {
                            bg = '#fef2f2';
                            border = '#ef4444';
                            color = '#b91c1c';
                        }

                        return (
                            <button
                                key={tile.id}
                                onClick={() => handleTileClick(tile)}
                                disabled={tile.isMatched || (isChecking && tile.state !== 'selected' && tile.state !== 'error')}
                                style={{
                                    padding: '20px',
                                    borderRadius: '16px',
                                    border: `2px solid ${border}`,
                                    background: bg,
                                    color: color,
                                    cursor: tile.isMatched ? 'default' : 'pointer',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center', // Left align logic for definitions is sometimes better, but center is safer for varying lengths
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: scale,
                                    boxShadow: shadow,
                                    minHeight: '80px',
                                    opacity: tile.isMatched ? 0.6 : 1,
                                    width: '100%'
                                }}
                            >
                                {tile.text}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Win Overlay */}
            {showSuccess && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div style={{ fontSize: '5rem', marginBottom: '20px', animation: 'bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                        🧩
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        color: '#db2777',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        Matched!
                    </div>
                </div>
            )}
        </div>
    );
}
