import { content } from '../content';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/sections/archive.css'; // Will create this

const Archive = () => {
    // Flatten and Sort items by date (descending)
    // Note: Years are strings like "2023 — 2025" or "2021". We sort by the first 4 digits.
    const allProjects = content.archive
        .sort((a, b) => {
            const yearA = parseInt(a.year.substring(0, 4));
            const yearB = parseInt(b.year.substring(0, 4));
            return yearB - yearA;
        });

    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        // Calculate total animation time: (last index * 100ms delay) + 500ms duration
        const totalDuration = (allProjects.length * 100) + 500;

        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, totalDuration);

        return () => clearTimeout(timer);
    }, [allProjects]);

    return (
        <section className="archive-section">
            <div className="archive-container">
                <header className="archive-header">
                    <Link to="/#portfolio" state={{ preventAnimation: true }} className="back-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </Link>
                </header>

                <div className="archive-table-container">
                    <table className="archive-table">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Project</th>
                                <th className="hide-on-mobile">Made at</th>
                                <th className="hide-on-mobile">Built with</th>
                            </tr>
                        </thead>
                        <tbody style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}>
                            {allProjects.map((project, index) => (
                                <tr
                                    key={index}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    className="archive-row"
                                >
                                    <td className="year-col">{project.year}</td>
                                    <td className="title-col">{project.title}</td>
                                    <td className="company-col hide-on-mobile">{project.madeAt}</td>
                                    <td className="tech-col hide-on-mobile">
                                        <div className="tech-stack-archive">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="tech-pill">{tech}</span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Archive;
