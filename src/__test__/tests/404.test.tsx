import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/dom';
import ErrorPage404, { getServerSideProps } from '../../pages/404';
import { render } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    route: '/non-existent-route',
    asPath: '/non-existent-route',
    isFallback: false,
  })),
}));

describe('404', async () => {
  it('should render 404 page with no existing route', async () => {
    const context = {} as GetServerSidePropsContext;
    const response = await getServerSideProps(context);

    expect(response).toEqual({
      notFound: true,
    });

    render(<ErrorPage404 />);

    expect(
      screen.getByRole('heading', { name: 'Something went wrong' })
    ).toBeInTheDocument();
  });
});
