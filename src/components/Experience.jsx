import { content } from '../content';
import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <section id="experience" className="section">
            <div className="container">
                <motion.h2
                    className="mobile-section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Experience
                </motion.h2>
                <motion.div
                    className="experience-grid"
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
                    {content.experience.items.map((item, index) => (
                        <motion.div
                            className="experience-item"
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
                                x: 10,
                                scale: 1.01,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="exp-row">
                                <h3 className="exp-company">{item.company}</h3>
                                <span className="exp-date">{item.date}</span>
                            </div>
                            <div className="exp-row">
                                <p className="exp-role">{item.role}</p>
                                <span className="exp-location">{item.location}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
