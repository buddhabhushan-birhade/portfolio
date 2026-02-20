import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, RotateCcw, Play, Info } from 'lucide-react';

const GRID_SIZE = 10;

const SHAPES = [
    { name: '1x1', layout: [[1]], color: 'bg-blue-400' },
    { name: '1x2', layout: [[1, 1]], color: 'bg-green-400' },
    { name: '2x1', layout: [[1], [1]], color: 'bg-green-400' },
    { name: '1x3', layout: [[1, 1, 1]], color: 'bg-yellow-400' },
    { name: '3x1', layout: [[1], [1], [1]], color: 'bg-yellow-400' },
    { name: '1x4', layout: [[1, 1, 1, 1]], color: 'bg-orange-400' },
    { name: '4x1', layout: [[1], [1], [1], [1]], color: 'bg-orange-400' },
    { name: '1x5', layout: [[1, 1, 1, 1, 1]], color: 'bg-red-400' },
    { name: '5x1', layout: [[1], [1], [1], [1], [1]], color: 'bg-red-400' },
    { name: '2x2', layout: [[1, 1], [1, 1]], color: 'bg-purple-400' },
    { name: '3x3', layout: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], color: 'bg-pink-400' },
    { name: 'L2x2', layout: [[1, 0], [1, 1]], color: 'bg-indigo-400' },
    { name: 'T3x2', layout: [[1, 1, 1], [0, 1, 0]], color: 'bg-cyan-400' },
    { name: 'Z3x2', layout: [[1, 1, 0], [0, 1, 1]], color: 'bg-emerald-400' }
];

const BlockGame = ({ isOpen, onClose }) => {
    const [grid, setGrid] = useState(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0)));
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [pieces, setPieces] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [dragOverCells, setDragOverCells] = useState([]);
    const [isValidPlacement, setIsValidPlacement] = useState(false);

    // Initialize/Reset Game
    const initGame = useCallback(() => {
        setGrid(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0)));
        setScore(0);
        setGameOver(false);
        generatePieces();
    }, []);

    const generatePieces = () => {
        const newPieces = [];
        for (let i = 0; i < 3; i++) {
            const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            newPieces.push({ ...randomShape, id: Math.random() });
        }
        setPieces(newPieces);
    };

    useEffect(() => {
        const savedHS = localStorage.getItem('block_puzzle_high_score');
        if (savedHS) setHighScore(parseInt(savedHS));
        if (isOpen) initGame();
    }, [isOpen, initGame]);

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('block_puzzle_high_score', score.toString());
        }
    }, [score, highScore]);

    // Check if game is over
    useEffect(() => {
        if (pieces.length > 0 && !gameOver) {
            const canPlaceAny = pieces.some(piece => {
                for (let r = 0; r <= GRID_SIZE - piece.layout.length; r++) {
                    for (let c = 0; c <= GRID_SIZE - piece.layout[0].length; c++) {
                        if (canPlace(piece, r, c)) return true;
                    }
                }
                return false;
            });

            if (!canPlaceAny) {
                setGameOver(true);
            }
        }
    }, [pieces, grid, gameOver]);

    const canPlace = (piece, row, col) => {
        if (!piece) return false;
        for (let r = 0; r < piece.layout.length; r++) {
            for (let c = 0; c < piece.layout[r].length; c++) {
                if (piece.layout[r][c] === 1) {
                    if (row + r >= GRID_SIZE || col + c >= GRID_SIZE || grid[row + r][col + c] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    const handlePlace = (piece, row, col) => {
        if (!canPlace(piece, row, col)) return;

        const newGrid = grid.map(r => [...r]);
        for (let r = 0; r < piece.layout.length; r++) {
            for (let c = 0; c < piece.layout[r].length; c++) {
                if (piece.layout[r][c] === 1) {
                    newGrid[row + r][col + c] = piece.color;
                }
            }
        }

        // Check for completed lines
        let rowsToClear = [];
        let colsToClear = [];

        for (let r = 0; r < GRID_SIZE; r++) {
            if (newGrid[r].every(cell => cell !== 0)) rowsToClear.push(r);
        }

        for (let c = 0; c < GRID_SIZE; c++) {
            let full = true;
            for (let r = 0; r < GRID_SIZE; r++) {
                if (newGrid[r][c] === 0) {
                    full = false;
                    break;
                }
            }
            if (full) colsToClear.push(c);
        }

        // Clear and Score
        rowsToClear.forEach(r => newGrid[r].fill(0));
        colsToClear.forEach(c => {
            for (let r = 0; r < GRID_SIZE; r++) newGrid[r][c] = 0;
        });

        const linesCleared = rowsToClear.length + colsToClear.length;
        if (linesCleared > 0) {
            setScore(prev => prev + (linesCleared * 10 * linesCleared));
        }
        setScore(prev => prev + (piece.layout.flat().filter(id => id === 1).length));

        setGrid(newGrid);
        setPieces(prev => {
            const updated = prev.filter(p => p.id !== piece.id);
            if (updated.length === 0) {
                generatePieces();
                return [];
            }
            return updated;
        });
        setSelectedPiece(null);
    };

    const handleDragOver = (e, row, col) => {
        e.preventDefault();
        if (!selectedPiece) return;

        const cells = [];
        let valid = true;

        for (let r = 0; r < selectedPiece.layout.length; r++) {
            for (let c = 0; c < selectedPiece.layout[r].length; c++) {
                if (selectedPiece.layout[r][c] === 1) {
                    const gr = row + r;
                    const gc = col + c;
                    if (gr < GRID_SIZE && gc < GRID_SIZE) {
                        cells.push(`${gr}-${gc}`);
                        if (grid[gr][gc] !== 0) valid = false;
                    } else {
                        valid = false;
                    }
                }
            }
        }

        setDragOverCells(cells);
        setIsValidPlacement(valid && cells.length === selectedPiece.layout.flat().filter(x => x === 1).length);
    };

    const handleDrop = (e, row, col) => {
        e.preventDefault();
        if (selectedPiece && isValidPlacement) {
            handlePlace(selectedPiece, row, col);
        }
        setDragOverCells([]);
        setIsValidPlacement(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-deep/90 backdrop-blur-md overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg glass-card border-white/10 p-6 md:p-8 flex flex-col items-center"
            >
                {/* Header */}
                <div className="w-full flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 flex items-center justify-center">
                            <Play className="text-brand-orange" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white leading-tight">Block Puzzle</h2>
                            <div className="flex items-center gap-2 text-xs text-brand-orange font-bold uppercase tracking-wider">
                                <Trophy size={12} />
                                <span>High Score: {highScore}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={initGame}
                            className="p-3 rounded-xl bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <RotateCcw size={20} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-3 rounded-xl bg-white/5 text-white/50 hover:bg-red-500/20 hover:text-red-500 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Score */}
                <div className="mb-8 text-center">
                    <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 mb-1">Current Score</div>
                    <div className="text-6xl font-black text-white tracking-tighter tabular-nums drop-shadow-2xl">
                        {score}
                    </div>
                </div>

                {/* Grid */}
                <div className="inline-grid grid-cols-10 gap-1 p-1 bg-white/5 rounded-xl border border-white/5 shadow-inner">
                    {grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            const isDragOver = dragOverCells.includes(`${rowIndex}-${colIndex}`);
                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    onDragOver={(e) => handleDragOver(e, rowIndex, colIndex)}
                                    onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                                    className={`w-7 h-7 md:w-9 md:h-9 rounded-md transition-all duration-200 
                                        ${cell !== 0 ? cell : 'bg-white/[0.03]'} 
                                        ${isDragOver ? (isValidPlacement ? 'bg-white/30 scale-95' : 'bg-red-500/30') : ''}
                                        ${cell !== 0 ? 'shadow-lg ring-1 ring-white/20' : ''}`}
                                />
                            );
                        })
                    )}
                </div>

                {/* Pieces */}
                <div className="mt-12 w-full grid grid-cols-3 gap-6">
                    {pieces.map((piece) => (
                        <div
                            key={piece.id}
                            className="flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 min-h-[140px]"
                        >
                            <motion.div
                                draggable
                                onDragStart={() => setSelectedPiece(piece)}
                                onDragEnd={() => setSelectedPiece(null)}
                                whileHover={{ scale: 1.1, cursor: 'grab' }}
                                whileTap={{ scale: 0.95, cursor: 'grabbing' }}
                                className="inline-grid gap-1"
                                style={{
                                    gridTemplateColumns: `repeat(${piece.layout[0].length}, minmax(0, 1fr))`
                                }}
                            >
                                {piece.layout.map((row, rIdx) =>
                                    row.map((cell, cIdx) => (
                                        <div
                                            key={`${rIdx}-${cIdx}`}
                                            className={`w-5 h-5 md:w-6 md:h-6 rounded-sm ${cell === 1 ? piece.color : 'opacity-0'}`}
                                        />
                                    ))
                                )}
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Info */}
                <div className="mt-12 flex items-center gap-2 text-white/20 text-[10px] uppercase font-bold tracking-widest">
                    <Info size={12} />
                    <span>Drag pieces to the grid to clear full lines</span>
                </div>

                {/* Game Over Overlay */}
                <AnimatePresence>
                    {gameOver && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 rounded-[inherit] bg-background-deep/90 backdrop-blur-lg flex flex-col items-center justify-center p-8 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="mb-6 p-6 rounded-full bg-red-500/20 text-red-500"
                            >
                                <X size={64} />
                            </motion.div>
                            <h3 className="text-4xl font-black text-white mb-2">Game Over!</h3>
                            <p className="text-white/40 mb-8 max-w-xs">There are no more moves available. You scored <span className="text-brand-orange font-bold">{score}</span> points.</p>
                            <button
                                onClick={initGame}
                                className="flex items-center gap-3 px-8 py-4 bg-brand-orange text-background-deep font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-xl shadow-brand-orange/10"
                            >
                                <RotateCcw size={20} />
                                Try Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Subtle Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-orange/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            </motion.div>
        </div>
    );
};

export default BlockGame;
