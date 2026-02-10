import { render, screen } from '@testing-library/react';
import Experience from '../Experience';

describe('Experience Component', () => {
    // Title was removed from UI, so we don't test for it anymore
    /*
    test('renders experience section title', () => {
        render(<Experience />);
        const title = screen.getByText(/Experience/i);
        expect(title).toBeInTheDocument();
    });
    */

    test('renders specific company names', () => {
        render(<Experience />);
        const companyNames = screen.getAllByText('Morgan Stanley');
        expect(companyNames.length).toBeGreaterThan(0);
        expect(screen.getByText('Freelance')).toBeInTheDocument();
        expect(screen.getByText('IMI - A Global People Company')).toBeInTheDocument();
    });

    test('renders job titles and locations correctly', () => {
        render(<Experience />);
        // Check for separate role and location elements as per user's current code
        expect(screen.getByText(/Software Developer II/i)).toBeInTheDocument();
        const locations = screen.getAllByText(/Montreal, Canada/i);
        expect(locations.length).toBeGreaterThan(0);
    });

    test('renders dates correctly', () => {
        render(<Experience />);
        expect(screen.getByText(/2022 — 2025/i)).toBeInTheDocument();
    });
});
