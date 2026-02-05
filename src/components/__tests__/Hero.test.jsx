import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero Component', () => {
    it('renders the hero section', () => {
        render(<Hero />);
        const section = document.querySelector('#hero');
        expect(section).toBeTruthy();
    });

    it('displays the correct Role and Specialization', () => {
        render(<Hero />);
        expect(screen.getByText('Role')).toBeDefined();
        expect(screen.getByText('Software Developer')).toBeDefined();
        expect(screen.getByText('Specialization')).toBeDefined();
        expect(screen.getByText('Full-Stack Architecture')).toBeDefined(); // Updated content
    });
});
