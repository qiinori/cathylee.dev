import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Portfolio from '../Portfolio';

describe('Portfolio Component', () => {
    it('renders the portfolio section', () => {
        render(<Portfolio />);
        const section = document.querySelector('#portfolio');
        expect(section).toBeTruthy();
    });

    it('renders category tabs', () => {
        render(<Portfolio />);
        expect(screen.getByText('Full-Stack Web & E-Commerce')).toBeDefined();
        // Fintech should no longer exist
        expect(screen.queryByText('Fintech & Data Observability')).toBeNull();
        expect(screen.getByText('Mobile & iOS Development')).toBeDefined();
    });

    it('displays default category content (E-Commerce)', () => {
        render(<Portfolio />);
        // Default category should be Full-Stack
        expect(screen.getByText('End-to-End E-Commerce Solutions & Brand Platforms')).toBeDefined();
        // Stock Metrics is now in Full-Stack
        expect(screen.getByText('Stock Metrics Platform')).toBeDefined();
    });

    it('switches content when clicking tabs', () => {
        render(<Portfolio />);

        // Click iOS tab
        const iosTab = screen.getByText('Mobile & iOS Development');
        fireEvent.click(iosTab);

        // Now should see iOS content
        expect(screen.getByText('ML-Powered Gaming Performance Analyzer [Beta]')).toBeDefined();
        // And NOT E-commerce content
        expect(screen.queryByText('End-to-End E-Commerce Solutions & Brand Platforms')).toBeNull();
    });

    it('renders correct number of items for default category', () => {
        const { container } = render(<Portfolio />);
        const items = container.querySelectorAll('.portfolio-item');
        expect(items.length).toBe(4); // E-Commerce has 4 items
    });
});
