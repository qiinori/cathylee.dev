import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PixelBackground from '../PixelBackground';

describe('PixelBackground Component', () => {
    it('renders a canvas element', () => {
        // Mock getContext because JSDOM doesn't implement it
        HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
            clearRect: vi.fn(),
            save: vi.fn(),
            translate: vi.fn(),
            rotate: vi.fn(),
            fillRect: vi.fn(),
            restore: vi.fn(),
        }));

        const { container } = render(<PixelBackground />);
        const canvas = container.querySelector('canvas#pixel-bg');
        expect(canvas).toBeTruthy();
    });
});
