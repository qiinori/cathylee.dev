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
        expect(screen.getByText('E-Commerce & Web Solutions')).toBeDefined();
        // Fintech should no longer exist
        expect(screen.queryByText('Fintech & Data Observability')).toBeNull();
        expect(screen.getByText('IOS Innovation')).toBeDefined();
    });

    it('displays default category content (E-Commerce)', () => {
        render(<Portfolio />);
        // Default category should be E-Commerce
        expect(screen.getByText('Integrated Shopify & Local Retail Ecosystems')).toBeDefined();
        // Stock Metrics is now in E-Commerce
        expect(screen.getByText('Real-time Stock Metrics Platform')).toBeDefined();
        // API Integrations should be replaced
        expect(screen.queryByText('Custom API Integrations & Performance Tuning')).toBeNull();
    });

    it('switches content when clicking tabs', () => {
        render(<Portfolio />);

        // Click IOS tab
        const iosTab = screen.getByText('IOS Innovation');
        fireEvent.click(iosTab);

        // Now should see IOS content (e.g., new AI item)
        expect(screen.getByText('AI-Powered Gaming Analytics Assistant [WIP]')).toBeDefined();
        // And NOT E-commerce content
        expect(screen.queryByText('Integrated Shopify & Local Retail Ecosystems')).toBeNull();
    });

    it('renders correct number of items for default category', () => {
        const { container } = render(<Portfolio />);
        const items = container.querySelectorAll('.portfolio-item');
        expect(items.length).toBe(4); // E-Commerce has 4 items
    });
});
