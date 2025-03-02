import styles from './detailsPage.module.css';
import { NextPageWithLayout } from '../_app';
import { CardProps } from '../../types/cardTypes';
import Layout from '../../components/layout/layout';
import { useRouter } from 'next/router';
import { jikanApi } from '../../api/createApi';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { store } from '../../store/store';
import Image from 'next/image';

export const getServerSideProps = (async (context) => {
  const { id = '' } = context.params ?? {};
  try {
    const res = await store
      .dispatch(
        jikanApi.endpoints.getDetails.initiate({
          id: [...id],
        })
      )
      .unwrap();
    const data = res.data;
    return {
      props: { data },
    };
  } catch {
    return {
      props: { data: null },
    };
  }
}) satisfies GetServerSideProps<{ data: CardProps | null }>;

const DetailsPage: NextPageWithLayout<{ data: CardProps }> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  if (data) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <button onClick={() => window.history.back()}>Go Back</button>
          <h2>{data.title_english ?? 'No title in english'}</h2>
          <h3>{data.title_japanese ?? 'No title in japanese'}</h3>
          <Image src={data.images.webp.image_url} alt={data.title_english} />
          <p>Status: {data.status ?? 'Unknown'}</p>
          <p> Source: {data.source ?? 'Unknown'}</p>
          <p>{data.synopsis}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h2 className={styles.errorTitle}>Something went wrong...</h2>
        <div className={styles.buttons}>
          <button onClick={() => router.back()}>Go Back</button>
          <button onClick={() => router.reload()}>Reset</button>
        </div>
      </div>
    );
  }
};

DetailsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default DetailsPage;
