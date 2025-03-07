import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ErrorPage } from './errorPage';

describe('error page tests', () => {
  it('should render with error route', () => {
    render(
      <MemoryRouter initialEntries={['/error']}>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: 'Something went wrong' })
    ).toBeInTheDocument();
  });
});
