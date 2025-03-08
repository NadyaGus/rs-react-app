import { Link, useNavigation, useSearchParams } from 'react-router';
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
  const searchParams = useSearchParams()[0];
  const q = searchParams.get('q') ?? '';
  const page = searchParams.get('page') ?? '1';

  if (!loaderData) {
    return (
      <div className={styles.container}>
        <h2>Something went wrong...</h2>
        <Link
          className={styles.link}
          to={{ pathname: '/', search: `?q=${q}&page=${page}` }}
        >
          Go Home
        </Link>
        <button onClick={() => window.location.reload()}>Reset</button>
      </div>
    );
  }

  const data = loaderData.data;

  if (data && data.data) {
    return (
      <div className={styles.container}>
        {navigation.state === 'loading' && <Loader />}
        <div className={styles.card}>
          <Link
            className={styles.link}
            to={{ pathname: '/', search: `?q=${q}&page=${page}` }}
          >
            Go Back
          </Link>
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
  }
}
