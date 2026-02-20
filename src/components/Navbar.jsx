import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-black tracking-tighter text-white flex items-center gap-1"
            >
                Portfolio<span className="text-brand-orange">.</span>
            </motion.div>

            <div className="flex items-center gap-8">
                <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
                    {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                            className="hover:text-brand-orange transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all group-hover:w-full" />
                        </a>
                    ))}
                </div>
                <a href="#contact">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2.5 bg-brand-orange text-background-deep text-sm font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all"
                    >
                        Hire Me
                    </motion.button>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
