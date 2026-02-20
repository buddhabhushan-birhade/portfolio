import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Zap, Users } from 'lucide-react';

const features = [
    {
        title: "Clean Code",
        description: "I write maintainable, scalable code following best practices.",
        icon: Code2
    },
    {
        title: "UI/UX Design",
        description: "Creating beautiful interfaces with great user experience.",
        icon: Palette
    },
    {
        title: "Performance",
        description: "Optimizing for speed and smooth interactions.",
        icon: Zap
    },
    {
        title: "Collaboration",
        description: "Working effectively in teams and with clients.",
        icon: Users
    }
];

const About = ({ isMobile }) => {
    return (
        <section id="about" className="py-24 px-6 relative bg-slate-900/20 premium-scroll-fix">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black mb-6"
                    >
                        About <span className="text-brand-orange">Me</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 max-w-xl mx-auto"
                    >
                        Get to know more about my journey and what drives me as a developer.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Main Content Card */}
                    <motion.div
                        initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 glass-card p-12 border-white/5 flex flex-col justify-center gpu-accel"
                    >
                        <h3 className="text-3xl font-black mb-8 text-white">Who I Am</h3>
                        <div className="space-y-6 text-white/60 text-lg leading-relaxed font-light">
                            <p>
                                I'm a passionate <span className="text-white font-bold">Full Stack Developer</span> with a deep obsession for building modern web applications. I specialize in <span className="text-brand-orange font-bold">React, Node.js</span>, and cloud technologies.
                            </p>
                            <p>
                                My journey started with a curiosity for how websites work, which led me to dive deep into both frontend and backend development. Today, I help businesses bring their ideas to life through elegant, efficient code.
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={isMobile ? {} : { scale: 1.02 }}
                                className="glass-card p-6 border-white/5 flex items-center gap-6 group hover:border-brand-orange/30 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                                    <feature.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-brand-orange transition-colors">{feature.title}</h4>
                                    <p className="text-xs text-white/40">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
