import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SplashScreen, { resetSessionState } from '../SplashScreen';

describe('SplashScreen Component', () => {
    beforeEach(() => {
        resetSessionState();
        // Create the splash-screen element that would exist in index.html
        const splash = document.createElement('div');
        splash.id = 'splash-screen';
        document.body.appendChild(splash);
    });

    afterEach(() => {
        sessionStorage.clear();
        const splash = document.getElementById('splash-screen');
        if (splash) splash.remove();
    });

    it('renders null (splash is handled by index.html)', () => {
        const { container } = render(<SplashScreen />);
        expect(container.innerHTML).toBe('');
    });

    it('removes splash element if it is already hidden', () => {
        const splash = document.getElementById('splash-screen');
        splash.style.display = 'none';

        render(<SplashScreen />);

        expect(document.getElementById('splash-screen')).toBeNull();
    });

    it('keeps splash element if it is still visible', () => {
        render(<SplashScreen />);

        // Splash element should still exist since it hasn't been hidden yet
        expect(document.getElementById('splash-screen')).not.toBeNull();
    });
});
