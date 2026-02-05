import { content } from '../content';

const Footer = () => {
    return (
        <footer id="contact" className="footer section">
            <div className="container">
                <div className="footer-grid">
                    <div className="contact-links">
                        {content.footer.links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target={link.url.startsWith('mailto') ? undefined : "_blank"}
                                rel={link.url.startsWith('mailto') ? undefined : "noopener noreferrer"}
                                className="contact-link"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
                <p className="copyright">{content.footer.copyright}</p>
            </div>
        </footer>
    );
};

export default Footer;
