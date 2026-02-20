import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowDown } from 'lucide-react';

const Hero = ({ isMobile }) => {
    return (
        <section className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden grid-bg premium-scroll-fix">
            {/* Decorative Blur Blobs */}
            {!isMobile && (
                <>
                    <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-orange/10 blur-[120px] rounded-full -z-10" />
                    <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-slate-800/20 blur-[100px] rounded-full -z-10" />
                </>
            )}

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center pt-24 pb-12">
                {/* Left Content */}
                <motion.div
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10 gpu-accel"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 glass-card bg-white/5 border-white/10 text-xs font-bold uppercase tracking-widest text-white/50 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                        Welcome to my portfolio
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
                        Building Digital <br />
                        <span className="text-brand-orange drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">Experiences</span>
                    </h1>

                    <p className="max-w-xl text-white/50 text-lg md:text-xl mb-12 leading-relaxed">
                        I'm <span className="text-white font-bold italic">Buddhabhushan Birhade</span>, a Full Stack Developer transforming ideas into exceptional, high-performance web applications.
                    </p>

                    <div className="flex flex-wrap gap-6 mb-16">
                        <motion.a
                            href="#projects"
                            whileHover={isMobile ? {} : { scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-brand-orange text-background-deep font-black rounded-2xl flex items-center gap-3 shadow-xl shadow-brand-orange/20 active:scale-95 uppercase tracking-widest text-xs"
                        >
                            View My Work <ArrowDown size={18} />
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={isMobile ? {} : { scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 glass-card border-white/10 uppercase tracking-widest text-xs font-black"
                        >
                            Let's Talk
                        </motion.a>
                    </div>

                    <div className="flex gap-8">
                        {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 + (i * 0.1) }}
                                className="text-white/30 hover:text-brand-orange transition-all hover:scale-125"
                            >
                                <Icon size={24} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Right Content - Character Image */}
                <motion.div
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-lg aspect-square">
                        {/* Background Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-brand-amber/10 blur-3xl opacity-50 ${!isMobile ? 'animate-pulse' : ''}`} />

                        {/* Image Placeholder Frame */}
                        <div className={`relative z-10 w-full h-full glass-card border-brand-orange/20 overflow-hidden group shadow-2xl shadow-brand-orange/10 transition-transform duration-700 ${!isMobile ? 'rotate-3 hover:rotate-0' : ''}`}>
                            <img
                                src="/myimg.jpeg"
                                alt="Buddhabhushan Birhade"
                                loading="lazy"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background-deep to-transparent opacity-60" />
                        </div>

                        {/* Float Badges */}
                        {!isMobile && (
                            <>
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -top-8 -right-8 z-20 glass-card px-6 py-4 border-brand-orange/30 shadow-2xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                                            <span className="font-bold">M</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-black">Designation</p>
                                            <p className="text-sm font-bold">Full Stack</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    className="absolute -bottom-8 -left-8 z-20 glass-card px-6 py-4 border-brand-orange/30 shadow-2xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange text-xl">
                                            🚀
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase font-black">Status</p>
                                            <p className="text-sm font-bold">Backend Expert</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20">
                <span className="text-[10px] uppercase font-black tracking-[0.3em]">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-brand-orange to-transparent" />
            </div>
        </section>
    );
};

export default Hero;
