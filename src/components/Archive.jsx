import { content } from '../content';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/sections/archive.css';

const Archive = () => {
    // Flatten and Sort items by date (descending)
    const allProjects = content.archive
        .sort((a, b) => {
            const yearA = parseInt(a.year.substring(0, 4));
            const yearB = parseInt(b.year.substring(0, 4));
            return yearB - yearA;
        });

    const [isInteractive, setIsInteractive] = useState(false);

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
                        <motion.tbody
                            className={isInteractive ? "interactive" : ""}
                            initial="hidden"
                            animate="show"
                            onAnimationComplete={() => setIsInteractive(true)}
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.05
                                    }
                                }
                            }}
                        >
                            {allProjects.map((project, index) => (
                                <motion.tr
                                    key={index}
                                    className="archive-row"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
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
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Archive;
