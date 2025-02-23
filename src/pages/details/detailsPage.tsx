import { useParams } from 'react-router';
import { Loader } from '../../components/loader/loader';

import styles from './detailsPage.module.css';
import { useGetDetailsQuery } from '../../api/createApi';

const DetailsPage = () => {
  const params = useParams();
  const paramsId = params.animeId;
  const { data, isFetching } = useGetDetailsQuery(paramsId ?? '');

  if (isFetching) {
    return (
      <div className={styles.container}>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </div>
    );
  }

  if (data && data.data) {
    return (
      <div className={styles.card}>
        <button onClick={() => window.history.back()}>Go Back</button>
        <h2>{data.data.title_english ?? 'No title in english'}</h2>
        <h3>{data.data.title_japanese ?? 'No title in japanese'}</h3>
        <img
          src={data.data.images.webp.image_url}
          alt={data.data.title_english}
        />
        <p>Status: {data.data.status ?? 'Unknown'}</p>
        <p> Source: {data.data.source ?? 'Unknown'}</p>
        <p>{data.data.synopsis}</p>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h2>Something went wrong...</h2>
        <button onClick={() => window.history.back()}>Go Back</button>
        <button onClick={() => window.location.reload()}>Reset</button>
      </div>
    );
  }
};

export { DetailsPage };
