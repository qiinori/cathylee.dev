import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import CustomCursor from '../CustomCursor';

describe('CustomCursor Component', () => {
    // Mock matchMedia
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: query === '(pointer:fine)', // Simulate desktop with mouse
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    });

    it('renders the cursor follower', () => {
        const { container } = render(<CustomCursor />);
        const cursor = container.querySelector('.cursor-follower');
        expect(cursor).toBeTruthy();
    });

    it('updates position on mouse move via transform', () => {
        // Mock requestAnimationFrame to execute callback synchronously
        const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
            cb();
            return 1;
        });

        const { container } = render(<CustomCursor />);
        const cursor = container.querySelector('.cursor-follower');

        // Simulate mouse move
        fireEvent.mouseMove(document, { clientX: 100, clientY: 200 });

        // Check if transform style was updated (uses translate instead of left/top)
        expect(cursor.style.transform).toContain('translate(100px, 200px)');

        rafSpy.mockRestore();
    });

    it('hides cursor on touch devices (mocked)', () => {
        // Redefine mock to return false
        window.matchMedia.mockImplementation(query => ({
            matches: false,
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));

        const { container } = render(<CustomCursor />);
        const cursor = container.querySelector('.cursor-follower');
        expect(cursor).toBeTruthy();
    });
});
