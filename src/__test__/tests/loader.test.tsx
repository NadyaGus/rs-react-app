import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import styles from '../../components/loader/loader.module.css';
import { Loader } from '../../components/loader/loader';

describe('Loader', () => {
  it('should render the loader when isLoading is true', () => {
    render(<Loader isLoading={true} />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

    const container = loader.parentElement;
    expect(container).not.toHaveClass(styles.hidden);
  });

  it('should hide the loader when isLoading is false', () => {
    render(<Loader isLoading={false} />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

    const container = loader.parentElement;
    expect(container).toHaveClass(styles.hidden);
  });
});
