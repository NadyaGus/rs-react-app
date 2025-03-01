import Link from 'next/link';
import { NextPageWithLayout } from './_app';
import Layout from '../components/layout/layout';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    notFound: true,
  };
};

const ErrorPage404: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <Link href="/">Go Home</Link>
    </div>
  );
};

ErrorPage404.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ErrorPage404;
