import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SplashScreen, { resetSessionState } from '../SplashScreen';
describe('SplashScreen Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        resetSessionState();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
        sessionStorage.clear();
    });

    it('renders initially visible', async () => {
        render(<SplashScreen />);

        // Advance timers to let typing animation finish and component update
        act(() => {
            vi.advanceTimersByTime(1200);
        });

        expect(screen.getByText(/Cathy Lee/)).toBeInTheDocument();
        expect(screen.getByText(/Portfolio 2026/)).toBeInTheDocument();
    });

    it('disappears after timeout', async () => {
        let container;
        act(() => {
            const result = render(<SplashScreen />);
            container = result.container;
        });

        // Wait for it to appear first
        expect(container.querySelector('#splash-screen')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(container.querySelector('#splash-screen')).not.toBeInTheDocument();
    });

    it('calls onFinish callback', async () => {
        const onFinishMock = vi.fn();
        render(<SplashScreen onFinish={onFinishMock} />);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(onFinishMock).toHaveBeenCalled();
    });
});
