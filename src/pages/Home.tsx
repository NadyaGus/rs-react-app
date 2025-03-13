import { Link } from 'react-router';

export const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/controlled-form">Controlled Form</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
