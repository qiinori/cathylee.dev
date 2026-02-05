import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

// Component that throws error
const Bomb = () => {
    throw new Error('Test Error');
};

describe('ErrorBoundary Component', () => {
    it('renders children when no error', () => {
        render(
            <ErrorBoundary>
                <div>Safe Content</div>
            </ErrorBoundary>
        );
        expect(screen.getByText('Safe Content')).toBeInTheDocument();
    });

    it('renders error message when child throws', () => {
        // Prevent console.error from cluttering test output
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        render(
            <ErrorBoundary>
                <Bomb />
            </ErrorBoundary>
        );

        expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
        expect(screen.getByText(/Test Error/)).toBeInTheDocument();

        consoleSpy.mockRestore();
    });
});
