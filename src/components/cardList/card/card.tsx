import Image from 'next/image';
import { CardProps } from '../../../types/cardTypes';
import styles from './card.module.css';
import { CheckBox } from './checkbox/checkbox';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MAX_SYNOPSIS_LENGTH = 720;

const Card = (props: CardProps) => {
  const router = useRouter();

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
      <div className={styles.headerAndCheckbox}>
        <h2 className={styles.title}>
          {props.title_english ?? props.title_japanese ?? 'No title'}
        </h2>
        <CheckBox card={props} />
      </div>

      <Link
        href={`/details/${props.mal_id}?q=${router.query.q || ''}&page=${router.query.page || '1'}`}
      >
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              width={220}
              height={300}
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
