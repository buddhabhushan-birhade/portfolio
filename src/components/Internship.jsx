import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Database, Globe, Layers, Server } from 'lucide-react';

const Internship = ({ isMobile }) => {
    const techLogos = [
        { icon: Globe, name: "React", color: "text-brand-orange" },
        { icon: Server, name: "Node.js", color: "text-brand-amber" },
        { icon: Database, name: "MongoDB", color: "text-green-500" },
        { icon: Layers, name: "Express", color: "text-white/70" }
    ];

    return (
        <section id="internship" className="py-24 px-6 relative overflow-hidden premium-scroll-fix">
            {/* Background decorative elements */}
            {!isMobile && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full -z-10" />
            )}

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black mb-6"
                    >
                        Professional <span className="text-brand-orange">Journey</span>
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        viewport={{ once: true }}
                        className="h-1 bg-brand-orange mx-auto rounded-full mb-8"
                    />
                </div>

                <div className="grid lg:grid-cols-5 gap-12 items-center">
                    {/* Left side: Content */}
                    <motion.div
                        initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 space-y-8 gpu-accel"
                    >
                        <div className="glass-card p-10 border-white/5 relative group overflow-hidden">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange shadow-[0_0_15px_rgba(245,158,11,0.5)]" />

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-brand-orange font-black tracking-widest text-xs uppercase mb-2 block bg-brand-orange/10 w-fit px-3 py-1 rounded-full">July 2024 - August 2024</span>
                                    <h3 className="text-3xl font-black text-white">MERN Stack Intern</h3>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-orange">
                                    <Briefcase size={28} />
                                </div>
                            </div>

                            <p className="text-white/40 mb-8 font-bold italic text-lg decoration-brand-orange/30 underline decoration-2 underline-offset-4">45 Days Intensive Training</p>

                            <ul className="space-y-6">
                                {[
                                    "Hands-on experience with React, Node, Express, and MongoDB.",
                                    "Architected and built a full-stack <span class='text-brand-orange font-bold'>College Management System</span>.",
                                    "Implemented secure authentication and role-based access control.",
                                    "Mastered database schema design and RESTful API development."
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4 text-white/70 leading-relaxed"
                                    >
                                        <span className="text-brand-orange font-bold mt-1.5">•</span>
                                        <span dangerouslySetInnerHTML={{ __html: item }} />
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right side: Tech Logos / Visuals */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                        {techLogos.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: "spring", bounce: 0.4 }}
                                whileHover={isMobile ? {} : { scale: 1.05, rotate: index % 2 === 0 ? 5 : -5 }}
                                className="glass-card p-8 border-white/5 flex flex-col items-center justify-center text-center group hover:border-brand-orange/30 transition-all"
                            >
                                <div className={`w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-4 ${tech.color} group-hover:scale-110 group-hover:bg-white/10 transition-all shadow-xl`}>
                                    <tech.icon size={32} />
                                </div>
                                <span className={`text-sm font-black uppercase tracking-widest transition-colors ${!isMobile ? 'text-white/50 group-hover:text-white' : 'text-white/70'}`}>
                                    {tech.name}
                                </span>
                                {/* Glow in background - Disable for mobile */}
                                {!isMobile && (
                                    <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-${tech.color.split('-')[1] || 'white'}/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Internship;
