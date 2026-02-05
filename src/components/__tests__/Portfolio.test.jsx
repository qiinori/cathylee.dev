import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Portfolio from '../Portfolio';

describe('Portfolio Component', () => {
    it('renders the portfolio section', () => {
        render(<Portfolio />);
        const section = document.querySelector('#portfolio');
        expect(section).toBeTruthy();
    });

    it('renders exactly 4 specific portfolio items', () => {
        render(<Portfolio />);
        expect(screen.getByText('Real-time Stock Metrics Platform')).toBeDefined();
        expect(screen.getByText('Data Center AR Navigation')).toBeDefined();
        expect(screen.getByText('Custom E-commerce Solutions')).toBeDefined();
        expect(screen.getByText('IMI Employee Management App')).toBeDefined();
    });

    it('renders portfolio cards with correct structure', () => {
        const { container } = render(<Portfolio />);
        const items = container.querySelectorAll('.portfolio-item');
        expect(items.length).toBe(4);
    });
});
