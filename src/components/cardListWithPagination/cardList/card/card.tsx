'use client';
import Image from 'next/image';
import { CardProps } from '../../../../shared/types/cardTypes';
import styles from './card.module.css';
import { CheckBox } from './checkbox/checkbox';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const MAX_SYNOPSIS_LENGTH = 720;

const Card = ({ card }: { card: CardProps }) => {
  const query = useSearchParams();
  const q = query.get('q');
  const page = query.get('page');

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
          {card.title_english ?? card.title_japanese ?? 'No title'}
        </h2>
        <CheckBox card={card} />
      </div>

      <Link href={`/details/${card.mal_id}?q=${q || ''}&page=${page || '1'}`}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              width={220}
              height={300}
              className={styles.image}
              src={card.images.webp.image_url}
              alt={card.title_english ?? card.title_japanese ?? 'No title'}
            />
          </div>
          <p className={styles.synopsis}>{handleSynopsis(card.synopsis)}</p>
        </div>
      </Link>
    </article>
  );
};

export { Card };
