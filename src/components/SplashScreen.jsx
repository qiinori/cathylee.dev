import { content } from '../content';
import { useState, useEffect } from 'react';

const SplashScreen = ({ onFinish }) => {
    const [visible, setVisible] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [text, setText] = useState('');
    const fullText = content.splashScreen.title;

    useEffect(() => {
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
