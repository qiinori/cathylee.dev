import { content } from '../content';
import { useState, useEffect } from 'react';

const SplashScreen = ({ onFinish }) => {
    const [visible, setVisible] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const fadeTimer = setTimeout(() => {
            setOpacity(0);
            document.body.style.overflow = '';

            const removeTimer = setTimeout(() => {
                setVisible(false);
                if (onFinish) onFinish();
            }, 1000); // Transition duration

            return () => clearTimeout(removeTimer);
        }, 1500); // Display time

        return () => {
            clearTimeout(fadeTimer);
            document.body.style.overflow = '';
        };
    }, [onFinish]);

    if (!visible) return null;

    return (
        <div
            id="splash-screen"
            className="splash-screen"
            style={{ opacity: opacity, display: visible ? 'flex' : 'none' }}
        >
            <div className="splash-text">
                <span>{content.splashScreen.title}</span>
                <span className="splash-sub">{content.splashScreen.subtitle}</span>
            </div>
        </div>
    );
};

export default SplashScreen;
