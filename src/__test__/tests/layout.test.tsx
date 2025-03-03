import { render, screen } from '@testing-library/react';

import { describe } from 'vitest';
import { it } from 'vitest';
import Layout from '../../app/layout';
import { expect } from 'vitest';

describe('Layout', () => {
  it('renders children', () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
