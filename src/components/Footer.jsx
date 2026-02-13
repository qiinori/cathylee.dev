import { content } from '../content';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            id="contact"
            className="footer section"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
        >
            <div className="container">
                <div className="footer-grid">
                    <motion.div
                        className="contact-links"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {content.footer.links.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.url}
                                target={link.url.startsWith('mailto') ? undefined : "_blank"}
                                rel={link.url.startsWith('mailto') ? undefined : "noopener noreferrer"}
                                className="contact-link"
                                variants={{
                                    hidden: { y: 50, opacity: 0 },
                                    show: {
                                        y: 0,
                                        opacity: 1,
                                        transition: {
                                            duration: 0.8,
                                            ease: [0.16, 1, 0.3, 1]
                                        }
                                    },
                                    hover: {
                                        scale: 1.05,
                                        x: 10,
                                        transition: { duration: 0.2 }
                                    }
                                }}
                                whileHover="hover"
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.span
                                    style={{ position: 'absolute', left: '-30px', display: 'inline-block' }}
                                    initial="hidden"
                                    variants={{
                                        hidden: { opacity: 0, x: -10 },
                                        show: { opacity: 0, x: -10 },
                                        hover: { opacity: 1, x: 5 }
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    →
                                </motion.span>
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
                <motion.p
                    className="copyright"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    {content.footer.copyright}
                </motion.p>
            </div>
        </motion.footer>
    );
};

export default Footer;
