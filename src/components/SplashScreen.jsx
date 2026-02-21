import { useEffect } from 'react';

// In-memory fallback for when sessionStorage is blocked
let hasSeenSplashSession = false;

export const resetSessionState = () => {
    hasSeenSplashSession = false;
};

const SplashScreen = () => {
    useEffect(() => {
        // The splash screen is rendered in index.html for instant display.
        // This component handles cleanup once React mounts.
        const el = document.getElementById('splash-screen');
        if (el && el.style.display === 'none') {
            el.remove();
        }

        hasSeenSplashSession = true;
    }, []);

    return null;
};

export default SplashScreen;
