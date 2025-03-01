import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <Link href="/">Go Home</Link>
    </div>
  );
};

export { ErrorPage };
