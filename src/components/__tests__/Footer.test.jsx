import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';

describe('Footer Component', () => {
    it('renders the footer structure', () => {
        const { container } = render(<Footer />);
        const footer = container.querySelector('footer#contact');
        expect(footer).toBeTruthy();
    });

    it('contains valid social links', () => {
        render(<Footer />);
        const linkedin = screen.getByText('LinkedIn');
        const github = screen.getByText('GitHub');
        const email = screen.getByText('Email');

        expect(linkedin.closest('a')).toHaveAttribute('href', 'https://linkedin.com/in/icathy');
        expect(github.closest('a')).toHaveAttribute('href', 'https://github.com/qiinori');
        expect(email.closest('a')).toHaveAttribute('href', 'mailto:qiinori@gmail.com');
    });

    it('displays copyright information', () => {
        render(<Footer />);
        expect(screen.getByText(/© 2026 Cathy Lee/i)).toBeInTheDocument();
    });
});
