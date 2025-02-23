import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ErrorBoundary } from './errorBoundary';

const BuggyComponent = () => {
  throw new Error('Something went wrong.');
};

describe('ErrorBoundary', () => {
  it('should display fallback UI when an error is thrown', () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Sorry. Something went wrong' })
      ).toBeInTheDocument();
    });
    console.error = originalConsoleError;
  });
});
