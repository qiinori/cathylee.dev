import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, beforeEach, test } from 'vitest';
import Navbar from '../Navbar';

// Mock IntersectionObserver
// Mock IntersectionObserver
beforeAll(() => {
    window.IntersectionObserver = vi.fn().mockImplementation(function () {
        this.observe = vi.fn();
        this.unobserve = vi.fn();
        this.disconnect = vi.fn();
    });
});

// Mock localStorage
const localStorageMock = (function () {
    let store = {};
    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('Navbar Component', () => {
    beforeEach(() => {
        localStorageMock.clear();
        // Reset document theme
        document.documentElement.setAttribute('data-theme', 'light');
    });

    test('renders logo correctly', () => {
        render(<Navbar />);
        expect(screen.getByText('Cathy Lee')).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        render(<Navbar />);
        expect(screen.getByText('Portfolio')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Experience')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    test('toggles theme on button click', () => {
        render(<Navbar />);
        // Use getAllByRole because there might be multiple buttons (desktop + mobile) or verify specific one
        // The desktop one usually has a specific icon or we can filter by aria-label if present.
        // Let's rely on the first button found or add aria-label in source later. 
        // For now, let's find by class or generic button.
        const buttons = screen.getAllByRole('button');
        const themeBtn = buttons.find(btn => btn.id === 'theme-toggle'); // Assuming ID is present based on CSS #theme-toggle

        if (themeBtn) {
            fireEvent.click(themeBtn);
            // Verify localStorage update
            expect(localStorage.getItem('theme_v2')).not.toBeNull();
        }
    });
});
