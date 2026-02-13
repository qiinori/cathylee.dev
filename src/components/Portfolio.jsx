import { content } from '../content';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    // Select the "Full-Stack" category items (index 0)
    const portfolioItems = content.portfolio;

    return (
        <section style={{ display: 'contents' }}>
            {/* Page 1: Video Intro */}
            <div className="portfolio-video-intro">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                    {/* Edge/Fallback (MP4 first for better compatibility/size) */}
                    <source src="/demo_video.mp4" type="video/mp4" />
                    {/* Chrome/Safari (MOV) */}
                    <source src="/demo_video.mov" />
                </video>
            </div>

            {/* Page 2: Project Grid */}
            <section id="portfolio" className="section portfolio-section">
                <div className="container">
                    <motion.h2
                        className="mobile-section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Portfolio
                    </motion.h2>

                    {/* Grid */}
                    <motion.div
                        className="portfolio-grid"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15
                                }
                            }
                        }}
                    >
                        {portfolioItems.map((item, index) => (
                            <motion.article
                                className="portfolio-item"
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: "spring",
                                            damping: 25,
                                            stiffness: 100
                                        }
                                    }
                                }}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                            >
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <ul className="tech-stack">
                                    {item.techStack.map((tech, i) => (
                                        <li key={i}>{tech}</li>
                                    ))}
                                </ul>
                            </motion.article>
                        ))}
                    </motion.div>

                    <div className="portfolio-footer">
                        <Link to="/archive" style={{ textDecoration: 'none' }}>
                            <motion.div
                                className="portfolio-view-btn"
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                            >
                                View All Projects
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    variants={{
                                        rest: { x: 0 },
                                        hover: { x: 5 }
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </motion.svg>
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Portfolio;
