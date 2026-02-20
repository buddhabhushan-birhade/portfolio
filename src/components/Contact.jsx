import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-6 relative overflow-hidden premium-scroll-fix">
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-16 flex items-center justify-center gap-4"
                >
                    <div className="h-[1px] bg-white/10 flex-grow" />
                    <span className="text-brand-cyan whitespace-nowrap">Get In Touch</span>
                    <div className="h-[1px] bg-white/10 flex-grow" />
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 gpu-accel"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Let's build something <span className="neon-text italic">amazing</span> together.</h3>
                        <p className="text-white/60 leading-relaxed">
                            I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:contact@example.com" className="flex items-center gap-4 group text-white/70 hover:text-brand-cyan transition-colors">
                                <div className="w-10 h-10 glass-card flex items-center justify-center border-white/10 group-hover:neon-border transition-all">
                                    <Mail size={18} />
                                </div>
                                buddhabhushanbirhade61@gmail.com
                            </a>
                            <a href="https://www.linkedin.com/in/buddhabhushan-birhade-97b77131b" className="flex items-center gap-4 group text-white/70 hover:text-brand-cyan transition-colors">
                                <div className="w-10 h-10 glass-card flex items-center justify-center border-white/10 group-hover:neon-border transition-all">
                                    <Linkedin size={18} />
                                </div>
                                https://www.linkedin.com/in/buddhabhushan-birhade-97b77131b
                            </a>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 border-white/5 space-y-4 shadow-2xl shadow-brand-cyan/5 gpu-accel"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-cyan transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-cyan transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Your Message..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-cyan transition-colors resize-none"
                            ></textarea>
                        </div>
                        <button className="w-full py-4 bg-brand-orange text-background-deep font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                            <Send size={18} /> Send Message
                        </button>
                    </motion.form>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20 blur-[100px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-cyan rounded-full" />
            </div>
        </section>
    );
};

export default Contact;
