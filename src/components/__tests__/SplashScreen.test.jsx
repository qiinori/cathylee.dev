import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SplashScreen from '../SplashScreen';

describe('SplashScreen Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it('renders initially visible', () => {
        render(<SplashScreen />);
        expect(screen.getByText('Cathy Lee')).toBeInTheDocument();
        expect(screen.getByText('Portfolio 2026')).toBeInTheDocument();
    });

    it('disappears after timeout', () => {
        const { container } = render(<SplashScreen />);
        const splash = container.querySelector('#splash-screen');

        expect(splash).toBeVisible();

        // Fast-forward time (1500 + 1000 = 2500ms total logic)
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        // Component returns null when visible becomes false.
        // So the element should disappear from the DOM or at least be empty/null,
        // Depending on React Testing Library's "container".
        // React's render returns a snapshot. If re-render happens, component updates.

        // Wait, if component returns null, it's removed from DOM?
        // Let's check `container.innerHTML` or query again.
        expect(container.querySelector('#splash-screen')).toBeNull();
    });

    it('calls onFinish callback', () => {
        const onFinishMock = vi.fn();
        render(<SplashScreen onFinish={onFinishMock} />);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(onFinishMock).toHaveBeenCalled();
    });
});
