import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Portfolio from '../Portfolio';

describe('Portfolio Component', () => {
    it('renders the portfolio section', () => {
        render(
            <MemoryRouter>
                <Portfolio />
            </MemoryRouter>
        );
        const section = document.querySelector('#portfolio');
        expect(section).toBeTruthy();
        expect(screen.getByText('Portfolio')).toBeInTheDocument();
    });

    it('renders portfolio items', () => {
        render(
            <MemoryRouter>
                <Portfolio />
            </MemoryRouter>
        );
        // Check for specific project titles from content.js
        expect(screen.getByText('Stock Metrics Platform')).toBeInTheDocument();
        expect(screen.getByText('End-to-End E-Commerce Solutions')).toBeInTheDocument();
        expect(screen.getByText('Interactive Business Intelligence Dashboards')).toBeInTheDocument();
    });

    it('renders "View All Projects" link', () => {
        render(
            <MemoryRouter>
                <Portfolio />
            </MemoryRouter>
        );
        const link = screen.getByText('View All Projects');
        expect(link).toBeInTheDocument();
        expect(link.closest('a')).toHaveAttribute('href', '/archive');
    });

    it('renders correct number of items', () => {
        const { container } = render(
            <MemoryRouter>
                <Portfolio />
            </MemoryRouter>
        );
        const items = container.querySelectorAll('.portfolio-item');
        expect(items.length).toBe(4); // Based on content.js having 4 items
    });
});
