import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Capabilities from '../Capabilities';

describe('Capabilities Component', () => {
    it('renders the capabilities section', () => {
        render(<Capabilities />);
        const section = document.querySelector('#capabilities');
        expect(section).toBeTruthy();
    });

    it('displays the correct service titles', () => {
        render(<Capabilities />);
        expect(screen.getByText(/Full-Stack Application Development/i)).toBeInTheDocument();
        expect(screen.getByText(/Native iOS & Mobile Engineering/i)).toBeInTheDocument();
        expect(screen.getByText(/Real-Time Monitoring & Data Visualization/i)).toBeInTheDocument();
        expect(screen.getByText(/Performance Engineering & Optimization/i)).toBeInTheDocument();
        expect(screen.getByText(/Cloud Infrastructure & CI\/CD Automation/i)).toBeInTheDocument();
        expect(screen.getByText(/Legacy Modernization & API Architecture/i)).toBeInTheDocument();
    });

    it('renders exactly 6 capability cards', () => {
        const { container } = render(<Capabilities />);
        const cards = container.querySelectorAll('.capability-card');
        expect(cards.length).toBe(6);
    });
});
