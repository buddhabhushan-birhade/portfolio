import React from 'react';
import { motion } from 'framer-motion';
import {
    Code2, Database, Globe, Layout, Cpu, Cloud,
    Wind, Box, Zap, Share2, MousePointer2, Smartphone
} from 'lucide-react';

const skills = [
    {
        name: "React",
        description: "Building interactive UIs",
        level: "95%",
        category: "Expert",
        color: "#00d8ff",
        icon: Layout,
        lightColor: "bg-cyan-500/20",
        iconColor: "text-cyan-400"
    },
    {
        name: "TypeScript",
        description: "Type-safe development",
        level: "90%",
        category: "Advanced",
        color: "#3178c6",
        icon: Code2,
        lightColor: "bg-blue-500/20",
        iconColor: "text-blue-400"
    },
    {
        name: "Node.js",
        description: "Scalable backend systems",
        level: "88%",
        category: "Advanced",
        color: "#339933",
        icon: Globe,
        lightColor: "bg-green-500/20",
        iconColor: "text-green-400"
    },
    {
        name: "Tailwind CSS",
        description: "Rapid UI styling",
        level: "95%",
        category: "Expert",
        color: "#06b6d4",
        icon: Wind,
        lightColor: "bg-teal-500/20",
        iconColor: "text-teal-400"
    },
    {
        name: "Next.js",
        description: "Full-stack React framework",
        level: "85%",
        category: "Advanced",
        color: "#ffffff",
        icon: Layers, // Using Layers as an alternative for Next.js layout
        lightColor: "bg-white/10",
        iconColor: "text-white"
    },
    {
        name: "MongoDB",
        description: "NoSQL database solutions",
        level: "80%",
        category: "Int.",
        color: "#47a248",
        icon: Database,
        lightColor: "bg-emerald-500/20",
        iconColor: "text-emerald-400"
    },
    {
        name: "PostgreSQL",
        description: "Relational data management",
        level: "75%",
        category: "Intermediate",
        color: "#336791",
        icon: Database,
        lightColor: "bg-blue-600/20",
        iconColor: "text-blue-500"
    },
    {
        name: "Python",
        description: "Scripting & automation",
        level: "70%",
        category: "Intermediate",
        color: "#3776ab",
        icon: Zap,
        lightColor: "bg-yellow-500/20",
        iconColor: "text-yellow-400"
    },
    {
        name: "Docker",
        description: "Containerization",
        level: "72%",
        category: "Intermediate",
        color: "#2496ed",
        icon: Box,
        lightColor: "bg-blue-400/20",
        iconColor: "text-blue-300"
    },
    {
        name: "AWS",
        description: "Cloud infrastructure",
        level: "65%",
        category: "Basic",
        color: "#ff9900",
        icon: Cloud,
        lightColor: "bg-orange-500/20",
        iconColor: "text-orange-400"
    },
    {
        name: "GraphQL",
        description: "Efficient API queries",
        level: "82%",
        category: "Advanced",
        color: "#e10098",
        icon: Share2,
        lightColor: "bg-pink-500/20",
        iconColor: "text-pink-400"
    },
    {
        name: "Framer Motion",
        description: "Complex animations",
        level: "92%",
        category: "Expert",
        color: "#0055ff",
        icon: Cpu,
        lightColor: "bg-purple-500/20",
        iconColor: "text-purple-400"
    }
];

// Need to import Layers specifically for Next.js
import { Layers } from 'lucide-react';

const Skills = ({ isMobile }) => {
    return (
        <section id="skills" className="py-24 px-6 relative overflow-hidden bg-[#02040a]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black mb-6"
                    >
                        Technical <span className="text-brand-orange">Proficiency</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 max-w-2xl mx-auto font-light"
                    >
                        A curated stack of modern technologies I use to build scalable, high-performance applications.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={isMobile ? {} : { y: -8, transition: { duration: 0.3 } }}
                            className="glass-card p-6 border-white/5 relative group overflow-hidden bg-slate-900/40"
                        >
                            {/* Individual Color Glow on Hover - Disable for mobile */}
                            {!isMobile && (
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at 50% 50%, ${skill.color}33 0%, transparent 70%)`
                                    }}
                                />
                            )}

                            <div className="flex justify-between items-start mb-6">
                                {/* Icon with colored background */}
                                <div className={`w-12 h-12 rounded-xl ${skill.lightColor} flex items-center justify-center ${skill.iconColor} shadow-lg shadow-black/20`}>
                                    <skill.icon size={26} strokeWidth={2.5} />
                                </div>
                                {/* Category Badge */}
                                <span className="text-[10px] font-black uppercase tracking-wider text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                    {skill.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-black text-white mb-1">{skill.name}</h3>
                            <p className="text-xs text-white/30 mb-8 font-medium">
                                {skill.description}
                            </p>

                            <div className="space-y-3">
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: skill.level }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                        className="h-full relative"
                                        style={{ backgroundColor: skill.color }}
                                    >
                                        {/* Progress Bar Glow - Disable for mobile */}
                                        {!isMobile && (
                                            <div
                                                className="absolute inset-0 blur-[4px] opacity-100"
                                                style={{ backgroundColor: skill.color }}
                                            />
                                        )}
                                    </motion.div>
                                </div>
                                <div className={`flex justify-end pr-1 transition-transform ${!isMobile ? 'group-hover:translate-x-1' : ''}`}>
                                    <span className={`text-[10px] font-black transition-colors ${!isMobile ? 'text-white/20 group-hover:text-white/40' : 'text-white/40'}`}>
                                        {skill.level}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
