import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Internship from './components/Internship';
import Contact from './components/Contact';
import Calculator from './components/Calculator';
import BlockGame from './components/BlockGame';

function App() {
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [isBlockGameOpen, setIsBlockGameOpen] = useState(false);

    const handleViewDemo = (demoKey) => {
        if (demoKey === 'calculator') setIsCalculatorOpen(true);
        if (demoKey === 'blockgame') setIsBlockGameOpen(true);
    };

    return (
        <div className="min-h-screen relative text-white selection:bg-brand-orange/30">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-10 bg-background-deep overflow-hidden">
                {/* Animated Blobs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-orange/5 blur-[150px] rounded-full"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-orange/5 blur-[150px] rounded-full"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            </div>

            <Navbar />

            <main>
                <Hero />
                <About />
                <Skills />
                <Projects onViewDemo={handleViewDemo} />
                <Internship />
                <Contact />
            </main>

            <AnimatePresence>
                {isCalculatorOpen && (
                    <Calculator
                        isOpen={isCalculatorOpen}
                        onClose={() => setIsCalculatorOpen(false)}
                    />
                )}
                {isBlockGameOpen && (
                    <BlockGame
                        isOpen={isBlockGameOpen}
                        onClose={() => setIsBlockGameOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 bg-black/40 text-center relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                        <div className="text-2xl font-black tracking-tighter flex items-center gap-1">
                            Portfolio<span className="text-brand-orange">.</span>
                        </div>
                        <div className="flex gap-6 items-center">
                            <a
                                href="https://github.com/buddhabhushan-birhade"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 glass-card flex items-center justify-center border-white/10 text-white/30 hover:text-brand-orange hover:border-brand-orange/30 transition-all"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://linkedin.com/in/buddhabhushan-birhade-97b77131b"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 glass-card flex items-center justify-center border-white/10 text-white/30 hover:text-brand-orange hover:border-brand-orange/30 transition-all"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="mailto:buddhabhushanbirhade61@gmail.com"
                                className="w-10 h-10 glass-card flex items-center justify-center border-white/10 text-white/30 hover:text-brand-orange hover:border-brand-orange/30 transition-all"
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                    <div className="h-[1px] bg-white/5 w-full mb-12" />
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/20 uppercase tracking-[0.2em]">
                        <p>&copy; {new Date().getFullYear()} Buddhabhushan Birhade. All rights reserved.</p>
                        <p>Designed for <span className="text-brand-orange">Visual Excellence</span></p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
