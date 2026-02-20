import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "QR Code Generator",
        description: "A high-performance web application that generates customizable QR codes for URLs, text, and contact info with real-time preview and multi-format download support.",
        image: "/QR Code Generator.png",
        tech: ["React", "Python", "FastAPI", "Tailwind CSS"],
        github: "https://github.com/buddhabhushan-birhade/QR-genrator/tree/accb59b21f22e4029963dfded5101a2d9615b4e9",
        live: "https://qr-genrator-r19m.onrender.com"
    },
    {
        title: "Video Downloader",
        description: "A professional video downloading tool featuring high-speed downloads, real-time progress tracking with SSE, and support for multiple video formats and quality settings.",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
        tech: ["Python", "Flask", "React", "SSE"],
        github: "https://github.com/buddhabhushan-birhade/video-downloader",
        live: "https://github.com/buddhabhushan-birhade/video-downloader"
    },
    {
        title: "Multipurpose Calculator",
        description: "A feature-rich multipurpose calculator with basic and scientific modes, calculation history, and a stunning glassmorphism interface.",
        image: "/calculator.png",
        tech: ["React", "Framer Motion", "Tailwind CSS"],
        github: "https://github.com/buddhabhushan-birhade/Multipurpose-calculator",
        live: "https://multipurpose-calculator-three.vercel.app",

    },
    {
        title: "Block Game",
        description: "An addictive 10x10 block puzzle game with real-time scoring, line clearing mechanics, and high-score tracking. Features smooth drag-and-drop gameplay.",
        image: "/block game.png",
        tech: ["React", "Framer Motion", "Game Logic"],
        github: "https://github.com/buddhabhushan-birhade/block-game",
        live: "https://block-game-topaz.vercel.app",

    }
];

const Projects = ({ onViewDemo, isMobile }) => {
    return (
        <section id="projects" className="py-24 px-6 relative premium-scroll-fix">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black mb-6"
                    >
                        Featured <span className="text-brand-orange">Projects</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 max-w-xl mx-auto font-light"
                    >
                        A selection of my recent work, showcasing my ability to build sophisticated web applications.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card flex flex-col group overflow-hidden border-white/5 hover:border-brand-orange/20 transition-all duration-500 shadow-2xl gpu-accel"
                        >
                            {/* Project Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    className={`w-full h-full object-cover transition-transform duration-700 brightness-75 group-hover:brightness-100 ${!isMobile ? 'group-hover:scale-110' : ''}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-deep via-transparent to-transparent opacity-60" />

                                {/* Links Over Image */}
                                <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${!isMobile ? 'translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100' : 'opacity-100'}`}>
                                    <a href={project.github} className="p-2 glass-card bg-white/10 hover:bg-brand-orange hover:text-background-deep transition-all">
                                        <Github size={18} />
                                    </a>
                                    {project.isDemo ? (
                                        <button
                                            onClick={() => onViewDemo?.(project.demoKey)}
                                            className="p-2 glass-card bg-white/10 hover:bg-brand-orange hover:text-background-deep transition-all cursor-pointer"
                                        >
                                            <ExternalLink size={18} />
                                        </button>
                                    ) : (
                                        <a href={project.live} className="p-2 glass-card bg-white/10 hover:bg-brand-orange hover:text-background-deep transition-all">
                                            <ExternalLink size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className={`p-8 flex-grow flex flex-col transition-transform duration-500 ${!isMobile ? 'translate-y-2 group-hover:translate-y-0' : ''}`}>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-orange transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-white/40 text-sm mb-8 line-clamp-2 leading-relaxed font-light">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((t, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] uppercase font-black tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full group-hover:border-brand-orange/30 group-hover:text-brand-orange transition-all"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
