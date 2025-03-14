import { Item } from '@/components/item/item';
import { useAppSelector } from '@/shared/store/store';
import { Link } from 'react-router';
import styles from './styles/home.module.css';

export const Home = () => {
  const data = useAppSelector((state) => state.forms.form);

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

      <ul className={styles.list}>
        {data.map((form, i) => (
          <Item key={i} {...form} />
        ))}
      </ul>
    </>
  );
};
