import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export { ErrorPage };
