import { FormType } from '@/shared/types/form';
import styles from './item.module.css';

export const Item = (form: FormType) => {
  const image = form.image;
  let protectedImage = '';

  if (typeof image === 'string') {
    protectedImage = image;
  }

  return (
    <li className={styles.item}>
      <p>Name: {form.name}</p>
      <p>Email: {form.email}</p>
      <p>Password:{form.password}</p>
      <p>Gender: {form.gender}</p>
      <p>Country: {form.country}</p>
      {protectedImage && (
        <div className={styles.imageContainer}>
          <img src={protectedImage} alt="image" />
        </div>
      )}
    </li>
  );
};
