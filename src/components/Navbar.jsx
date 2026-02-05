import { content } from '../content';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        let savedTheme = null;
        try {
            savedTheme = localStorage.getItem('theme');
        } catch (e) {
            console.warn('LocalStorage access denied, using default theme behavior.');
        }

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    // Scroll Spy for Activity Highlighting
    useEffect(() => {
        const sections = document.querySelectorAll('section, footer');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: "-20% 0px -20% 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id) setActiveSection(entry.target.id);
                    if (entry.target.classList.contains('footer')) setActiveSection('contact');
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // Suppress storage errors
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <nav className="nav">
            <div className="nav-left">
                <a href="#hero" className="logo" onClick={closeMenu}>{content.navbar.logo}</a>
            </div>

            <div className="nav-right">
                <button id="theme-toggle" aria-label="Toggle Theme" onClick={toggleTheme}>
                    <span className="theme-icon">●</span>
                </button>
                <button
                    id="mobile-menu-btn"
                    className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
                    aria-label="Toggle Menu"
                    onClick={toggleMenu}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-links">
                    {content.navbar.links.map(link => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                className={activeSection === link.id ? 'active-link' : ''}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav >
    );
};

export default Navbar;
