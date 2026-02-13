import { content } from '../content';
import { useState, useEffect } from 'react';

// In-memory fallback for when sessionStorage is blocked
let hasSeenSplashSession = false;

const SplashScreen = ({ onFinish }) => {
    const [visible, setVisible] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const [text, setText] = useState('');
    const fullText = content.splashScreen.title;

    useEffect(() => {
        let hasSeenSplash = hasSeenSplashSession;

        if (!hasSeenSplash) {
            try {
                hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
            } catch (e) {
                console.warn('Session storage access denied:', e);
            }
        }

        if (hasSeenSplash) {
            if (onFinish) onFinish();
            return;
        }

        setVisible(true);
        document.body.style.overflow = 'hidden';

        // Typing animation
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);

                // Start fade out after typing is done + delay
                setTimeout(() => {
                    setOpacity(0);
                    document.body.style.overflow = '';

                    hasSeenSplashSession = true;
                    try {
                        sessionStorage.setItem('hasSeenSplash', 'true');
                    } catch (e) {
                        console.warn('Session storage access denied:', e);
                    }

                    setTimeout(() => {
                        setVisible(false);
                        if (onFinish) onFinish();
                    }, 1000); // Fade out duration
                }, 500); // Delay before fading out
            }
        }, 100); // Typing speed

        return () => {
            clearInterval(typingInterval);
            document.body.style.overflow = '';
        };
    }, [fullText, onFinish]);

    if (!visible) return null;

    return (
        <div
            id="splash-screen"
            className="splash-screen"
            style={{ opacity: opacity, display: visible ? 'flex' : 'none' }}
        >
            <div className="splash-text">
                <span>{text}<span className="cursor">|</span></span>
                <span className="splash-sub">{content.splashScreen.subtitle}</span>
            </div>
            <style>{`
                .cursor {
                    display: inline-block;
                    margin-left: 2px;
                    animation: blink 1s step-end infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;
