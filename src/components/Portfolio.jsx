import { content } from '../content';
import { useState } from 'react';

const Portfolio = () => {
    // Select the "Full-Stack" category items (index 0)
    const portfolioItems = content.portfolio.categories[0].items;

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
                        <button
                            className="portfolio-view-btn"
                            style={{ mixBlendMode: 'difference' }}
                            onClick={() => window.location.href = '/projects'}
                        >
                            View All Projects
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Portfolio;
