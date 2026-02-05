import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Services from '../Services';

describe('Services Component', () => {
    it('renders the services section', () => {
        render(<Services />);
        const section = document.querySelector('#services');
        expect(section).toBeTruthy();
    });

    it('displays the correct service titles', () => {
        render(<Services />);
        expect(screen.getByText('Scalable Full-Stack Engineering')).toBeDefined();
        expect(screen.getByText('Mobile Product Development')).toBeDefined();
        expect(screen.getByText('Data Intelligence & Real-Time Visualization')).toBeDefined();
        expect(screen.getByText('Performance & Latency Optimization')).toBeDefined();
        expect(screen.getByText('Cloud Architecture & DevOps Automation')).toBeDefined();
        expect(screen.getByText('Legacy Modernization & API Strategy')).toBeDefined();
    });

    it('renders exactly 6 service cards', () => {
        const { container } = render(<Services />);
        const cards = container.querySelectorAll('.service-card');
        expect(cards.length).toBe(6);
    });
});
