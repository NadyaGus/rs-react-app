import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CardProps } from '../../types/cardTypes';
import { Loader } from '../../components/loader/loader';

import styles from './detailsPage.module.css';
import { fetchData } from '../../api/fetchData';

const DetailsPage = () => {
  const params = useParams();
  const paramsId = params.animeId;
  const [data, setData] = useState<CardProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);

  const fetchCard = (id: string) => {
    setIsLoading(true);
    setIsFetchError(false);
    fetchData
      .getDetails(id)
      .then((data) => setData(data.data))
      .catch(() => setIsFetchError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchCard(paramsId ?? '');
  }, [paramsId]);

  if (isFetchError) {
    return (
      <div className={styles.container}>
        <h2>Something went wrong...</h2>
        <button onClick={() => window.history.back()}>Go Back</button>
        <button onClick={() => window.location.reload()}>Reset</button>
      </div>
    );
  }

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
        <div className={styles.card}>
          <button onClick={() => window.history.back()}>Go Back</button>
          <h2>{data.title_english ?? 'No title in english'}</h2>
          <h3>{data.title_japanese ?? 'No title in japanese'}</h3>
          <img src={data.images.webp.image_url} alt={data.title_english} />
          <p>{data.synopsis}</p>
        </div>
      )}
    </div>
  );
};

export { DetailsPage };
