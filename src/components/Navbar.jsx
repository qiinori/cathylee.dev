import ScrambleText from './ScrambleText';
import { useState, useEffect } from 'react';
import { content } from '../content.js';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        let savedTheme = null;
        try {
            savedTheme = localStorage.getItem('theme_v2');
        } catch (e) {
            console.warn('LocalStorage access denied, using default theme behavior.');
        }

        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Default to dark mode if no preference saved
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
            localStorage.setItem('theme_v2', newTheme);
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
                <a href="#hero" className="logo" onClick={closeMenu}>
                    <ScrambleText
                        text={content.navbar.logo}
                        triggerOnMount={true}
                        delay={2800} // Wait for splash screen (~2.5s)
                    />
                </a>
            </div>

            <div className="nav-right">
                <button id="theme-toggle" aria-label="Toggle Theme" onClick={toggleTheme} className="theme-toggle-btn">
                    {theme === 'dark' ? (
                        <svg className="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    ) : (
                        <svg className="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    )}
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
