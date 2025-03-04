import { Params } from 'next/dist/server/request/params';
import styles from '../detailsPage.module.css';
import { fetchData } from '../../../api/fetchData';
import Image from 'next/image';
import BackButton from '../../../components/buttons/closeDetailsButton';

const DetailsPage = async ({ params }: { params: Promise<Params> }) => {
  try {
    const { id } = await params;

    if (id) {
      const res = await fetchData.getDetails([id].join(''));
      const data = res.data;

      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <BackButton />
            <h2>{data.title_english ?? 'No title in english'}</h2>
            <h3>{data.title_japanese ?? 'No title in japanese'}</h3>
            <Image
              width={400}
              height={550}
              src={data.images.webp.image_url}
              alt={data.title_english ?? data.title_japanese ?? 'No title'}
            />
            <p>Status: {data.status ?? 'Unknown'}</p>
            <p> Source: {data.source ?? 'Unknown'}</p>
            <p>{data.synopsis}</p>
          </div>
        </div>
      );
    }
  } catch {
    return (
      <div className={styles.container}>
        <h2 className={styles.errorTitle}>Something went wrong...</h2>
        <div className={styles.buttons}>
          <BackButton />
        </div>
      </div>
    );
  }
};

export default DetailsPage;
