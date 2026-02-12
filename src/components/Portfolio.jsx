import { content } from '../content';
import { useState } from 'react';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState(0);

    return (
        <section id="portfolio" style={{ display: 'contents' }}>
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

            {/* Page 2: Existing Grid with Tabs */}
            <div className="section" style={{
                minHeight: '100vh',
                scrollSnapAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <div className="container">
                    {/* Tab Bar */}
                    <div className="portfolio-tabs">
                        {content.portfolio.categories.map((category, index) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(index)}
                                className={`tab-btn ${activeCategory === index ? 'active' : ''}`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="portfolio-grid">
                        {content.portfolio.categories[activeCategory].items.map((item, index) => (
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
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
