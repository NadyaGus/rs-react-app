import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CardProps } from '../../types/cardTypes';
import { Loader } from '../../components/loader/loader';

import styles from './detailsPage.module.css';

const DetailsPage = () => {
  const params = useParams();
  const [data, setData] = useState<CardProps>();
  const [isLoading, setIsLoading] = useState(false);

  // use timeout for debounce request to api (api limit is 3 requests per second)
  // TODO: use api function
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/anime/${params.animeId}`)
        .then((res) => res.json())
        .then((data) => setData(data.data))
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }, 1500);
  }, [params.animeId]);

  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <>
          <button onClick={() => window.history.back()}>Go Back</button>
          <h2>{data.title_english ?? 'No title in english'}</h2>
          <h3>{data.title_japanese ?? 'No title in japanese'}</h3>
          <img src={data.images.webp.image_url} alt={data.title_english} />
          <p>{data.synopsis}</p>
        </>
      )}
    </div>
  );
};

export { DetailsPage };
