import { useNavigation } from 'react-router';
import { Loader } from '../../components/loader/loader';
import styles from './detailsPage.module.css';
import { jikanApi } from '../../api/createApi';
import { store } from '../../store/store';
import { Route } from './+types/detailsPage';

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const q = params.animeId ?? '';
    const data = await store
      .dispatch(jikanApi.endpoints.getDetails.initiate(q))
      .unwrap();
    return {
      data,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

export default function DetailsPage({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();

  if (!loaderData) return null;

  const data = loaderData.data;

  if (data && data.data) {
    return (
      <div className={styles.container}>
        {navigation.state === 'loading' && <Loader />}
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
}
