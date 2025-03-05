import { NextPageWithLayout } from './_app';
import Layout from '../components/layout/layout';
import MainPage from '../components/mainPage/mainPage';
import { store } from '../store/store';
import { jikanApi } from '../api/createApi';
import { CardsResponse } from '../types/cardTypes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const LS_KEY = 'NADYA_GUS_KEY';

export const getServerSideProps = (async (context) => {
  const { q = '', page = '1' } = context.query;
  const res = await store
    .dispatch(
      jikanApi.endpoints.getResults.initiate({
        q: [...q],
        page: [...page],
      })
    )
    .unwrap();
  const data: CardsResponse = res;
  return {
    props: { data },
  };
}) satisfies GetServerSideProps<{ data: CardsResponse }>;

const App: NextPageWithLayout<{ data: CardsResponse }> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <MainPage data={data} />
    </>
  );
};

App.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default App;
