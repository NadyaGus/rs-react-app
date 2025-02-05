import { CardProps } from '../../types/cardTypes';
import styles from './card.module.css';

const MAX_SYNOPSIS_LENGTH = 720;

const Card = (props: CardProps) => {
  const handleSynopsis = (str: string) => {
    if (!str) {
      return 'No synopsis yet...';
    }
    if (str.length > MAX_SYNOPSIS_LENGTH) {
      return str.slice(0, MAX_SYNOPSIS_LENGTH) + '...';
    }

    return str;
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        {props.title_english ?? props.title_japanese ?? 'No title'}
      </h2>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={props.images.webp.image_url}
            alt={props.title_english}
          />
        </div>
        <p className={styles.synopsis}>{handleSynopsis(props.synopsis)}</p>
      </div>
    </div>
  );
};

export { Card };
