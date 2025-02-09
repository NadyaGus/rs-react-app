import { Link, useSearchParams } from 'react-router';
import { CardProps } from '../../types/cardTypes';
import styles from './card.module.css';
import { endPoints } from '../../api/fetchData';

const MAX_SYNOPSIS_LENGTH = 720;

const Card = (props: CardProps) => {
  const searchParams = useSearchParams()[0];
  const page = searchParams.get('page') ?? '1';

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
    <article className={styles.card}>
      <Link to={`${endPoints.details}${props.mal_id}?page=${page}`}>
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
      </Link>
    </article>
  );
};

export { Card };
