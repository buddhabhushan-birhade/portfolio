import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, Trash2, ChevronRight, ChevronLeft, Calculator as CalcIcon } from 'lucide-react';

const Calculator = ({ isOpen, onClose }) => {
    const [display, setDisplay] = useState('0');
    const [formula, setFormula] = useState('');
    const [history, setHistory] = useState([]);
    const [isScientific, setIsScientific] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    // Load history from local storage
    useEffect(() => {
        const savedHistory = localStorage.getItem('calc_history');
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    // Save history to local storage
    useEffect(() => {
        localStorage.setItem('calc_history', JSON.stringify(history));
    }, [history]);

    const handleNumber = (num) => {
        if (display === '0' || display === 'Error') {
            setDisplay(num);
        } else {
            setDisplay(display + num);
        }
    };

    const handleOperator = (op) => {
        setFormula(display + ' ' + op + ' ');
        setDisplay('0');
    };

    const calculate = () => {
        try {
            let result;
            const fullExpression = formula + display;

            // Basic math parsing (simplified for demo)
            // In a real app, use a library like mathjs or a safer custom parser
            // Using eval safely-ish by replacing operators and validating
            const safeExpr = fullExpression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/sin\(/g, 'Math.sin(')
                .replace(/cos\(/g, 'Math.cos(')
                .replace(/tan\(/g, 'Math.tan(')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/ln\(/g, 'Math.log(')
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E');

            result = eval(safeExpr);

            if (!isFinite(result)) result = 'Error';
            else result = Number(result.toFixed(8)).toString();

            const newHistory = [{
                expr: fullExpression,
                result: result,
                timestamp: new Date().toLocaleTimeString()
            }, ...history].slice(0, 10);

            setHistory(newHistory);
            setDisplay(result);
            setFormula('');
        } catch (err) {
            setDisplay('Error');
        }
    };

    const handleScientific = (func) => {
        if (func === 'C') {
            setDisplay('0');
            setFormula('');
        } else if (func === 'DEL') {
            setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
        } else if (func === '±') {
            setDisplay((parseFloat(display) * -1).toString());
        } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(func)) {
            setFormula(func + '(' + display + ')');
            calculateFunc(func, display);
        }
    };

    const calculateFunc = (func, val) => {
        let result;
        const v = parseFloat(val);
        switch (func) {
            case 'sin': result = Math.sin(v * Math.PI / 180); break;
            case 'cos': result = Math.cos(v * Math.PI / 180); break;
            case 'tan': result = Math.tan(v * Math.PI / 180); break;
            case 'log': result = Math.log10(v); break;
            case 'ln': result = Math.log(v); break;
            case 'sqrt': result = Math.sqrt(v); break;
            default: result = v;
        }
        const finalRes = Number(result.toFixed(8)).toString();
        setHistory([{
            expr: func + "(" + val + ")",
            result: finalRes,
            timestamp: new Date().toLocaleTimeString()
        }, ...history].slice(0, 10));
        setDisplay(finalRes);
        setFormula('');
    }

    const clearHistory = () => setHistory([]);

    const Button = ({ children, onClick, className = "", variant = "number" }) => {
        const variants = {
            number: "bg-white/5 hover:bg-white/10 text-white",
            operator: "bg-brand-orange/20 hover:bg-brand-orange/30 text-brand-orange",
            action: "bg-white/10 hover:bg-white/20 text-white/70",
            equals: "bg-brand-orange hover:bg-brand-amber text-background-deep font-bold"
        };

        return (
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className={`h-14 rounded-xl flex items-center justify-center text-lg transition-colors ${variants[variant]} ${className}`}
            >
                {children}
            </motion.button>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-background-deep/80 backdrop-blur-sm"
            />

            {/* Calculator Container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md glass-card border-white/10 overflow-hidden shadow-2xl flex flex-col"
                style={{ minHeight: '600px' }}
            >
                {/* Header */}
                <div className="p-6 flex justify-between items-center border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center">
                            <CalcIcon className="text-brand-orange" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white tracking-tight">Pro Calculator</h3>
                            <p className="text-[10px] uppercase tracking-widest text-white/30 font-black">Multipurpose</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className={`p-2 rounded-lg transition-colors ${showHistory ? 'bg-brand-orange text-background-deep' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                        >
                            <History size={18} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-white/5 text-white/50 hover:bg-red-500/20 hover:text-red-500 transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Display */}
                <div className="p-8 flex flex-col items-end justify-end flex-grow bg-black/20">
                    <div className="text-sm text-white/30 font-medium mb-1 h-6">
                        {formula}
                    </div>
                    <motion.div
                        key={display}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-black text-white tracking-tighter"
                    >
                        {display}
                    </motion.div>
                </div>

                {/* Controls/History Toggle */}
                <div className="relative flex-grow flex flex-col">
                    <AnimatePresence mode="wait">
                        {showHistory ? (
                            <motion.div
                                key="history"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="absolute inset-0 p-6 flex flex-col bg-background-deep/40 backdrop-blur-md"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/50">Recent Calculations</h4>
                                    {history.length > 0 && (
                                        <button onClick={clearHistory} className="text-xs text-red-500/70 hover:text-red-500 flex items-center gap-1 transition-colors">
                                            <Trash2 size={12} /> Clear
                                        </button>
                                    )}
                                </div>
                                <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                    {history.length > 0 ? history.map((item, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={i}
                                            className="text-right border-b border-white/5 pb-3"
                                        >
                                            <div className="text-xs text-white/20 mb-1">{item.timestamp}</div>
                                            <div className="text-sm text-white/40 mb-1">{item.expr}</div>
                                            <div className="text-lg font-bold text-brand-orange">= {item.result}</div>
                                        </motion.div>
                                    )) : (
                                        <div className="h-full flex flex-col items-center justify-center text-white/20 italic">
                                            No history yet
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="keypad"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-6 grid grid-cols-4 gap-3"
                            >
                                {/* Scientific toggle tab */}
                                <button
                                    onClick={() => setIsScientific(!isScientific)}
                                    className="col-span-4 flex items-center justify-center gap-2 py-1 mb-2 text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 hover:text-brand-orange transition-colors"
                                >
                                    {isScientific ? <ChevronLeft size={12} /> : null}
                                    {isScientific ? 'Show Basic' : 'Show Scientific'}
                                    {!isScientific ? <ChevronRight size={12} /> : null}
                                </button>

                                {isScientific ? (
                                    <>
                                        <Button onClick={() => handleScientific('sin')} variant="action">sin</Button>
                                        <Button onClick={() => handleScientific('cos')} variant="action">cos</Button>
                                        <Button onClick={() => handleScientific('tan')} variant="action">tan</Button>
                                        <Button onClick={() => handleScientific('C')} variant="operator">C</Button>

                                        <Button onClick={() => handleScientific('log')} variant="action">log</Button>
                                        <Button onClick={() => handleScientific('ln')} variant="action">ln</Button>
                                        <Button onClick={() => handleScientific('sqrt')} variant="action">√</Button>
                                        <Button onClick={() => handleOperator('÷')} variant="operator">÷</Button>

                                        <Button onClick={() => handleScientific('π')} variant="action">π</Button>
                                        <Button onClick={() => handleScientific('e')} variant="action">e</Button>
                                        <Button onClick={() => handleScientific('^')} variant="action">xʸ</Button>
                                        <Button onClick={() => handleOperator('×')} variant="operator">×</Button>

                                        <Button onClick={() => handleNumber('7')}>7</Button>
                                        <Button onClick={() => handleNumber('8')}>8</Button>
                                        <Button onClick={() => handleNumber('9')}>9</Button>
                                        <Button onClick={() => handleOperator('-')} variant="operator">-</Button>

                                        <Button onClick={() => handleNumber('4')}>4</Button>
                                        <Button onClick={() => handleNumber('5')}>5</Button>
                                        <Button onClick={() => handleNumber('6')}>6</Button>
                                        <Button onClick={() => handleOperator('+')} variant="operator">+</Button>

                                        <Button onClick={() => handleNumber('1')}>1</Button>
                                        <Button onClick={() => handleNumber('2')}>2</Button>
                                        <Button onClick={() => handleNumber('3')}>3</Button>
                                        <Button onClick={calculate} className="row-span-2 h-auto" variant="equals">=</Button>

                                        <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
                                        <Button onClick={() => handleNumber('.')}>.</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => handleScientific('C')} variant="action">C</Button>
                                        <Button onClick={() => handleScientific('±')} variant="action">±</Button>
                                        <Button onClick={() => handleScientific('DEL')} variant="action">DEL</Button>
                                        <Button onClick={() => handleOperator('÷')} variant="operator">÷</Button>

                                        <Button onClick={() => handleNumber('7')}>7</Button>
                                        <Button onClick={() => handleNumber('8')}>8</Button>
                                        <Button onClick={() => handleNumber('9')}>9</Button>
                                        <Button onClick={() => handleOperator('×')} variant="operator">×</Button>

                                        <Button onClick={() => handleNumber('4')}>4</Button>
                                        <Button onClick={() => handleNumber('5')}>5</Button>
                                        <Button onClick={() => handleNumber('6')}>6</Button>
                                        <Button onClick={() => handleOperator('-')} variant="operator">-</Button>

                                        <Button onClick={() => handleNumber('1')}>1</Button>
                                        <Button onClick={() => handleNumber('2')}>2</Button>
                                        <Button onClick={() => handleNumber('3')}>3</Button>
                                        <Button onClick={() => handleOperator('+')} variant="operator">+</Button>

                                        <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
                                        <Button onClick={() => handleNumber('.')}>.</Button>
                                        <Button onClick={calculate} variant="equals">=</Button>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Subtle Bottom Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-brand-orange/40 blur-lg rounded-full" />
            </motion.div>
        </div>
    );
};

export default Calculator;
