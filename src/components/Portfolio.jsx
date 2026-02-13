import { content } from '../content';
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
                    {/* Chrome/Safari */}
                    <source src="/demo_video.mov" />
                    {/* Edge/Fallback */}
                    <source src="/demo_video.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Page 2: Project Grid */}
            <section id="portfolio" className="section portfolio-section">
                <div className="container">
                    <h2 className="mobile-section-title animate-on-scroll">Portfolio</h2>

                    {/* Grid */}
                    <div className="portfolio-grid">
                        {portfolioItems.map((item, index) => (
                            <article
                                className="portfolio-item animate-on-scroll"
                                key={index}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <ul className="tech-stack">
                                    {item.techStack.map((tech, i) => (
                                        <li key={i}>{tech}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>

                    <div className="portfolio-footer">
                        <Link to="/archive" className="portfolio-view-btn">
                            View All Projects
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </Link>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Portfolio;
