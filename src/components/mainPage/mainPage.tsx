import { NextPageWithLayout } from '../../pages/_app';
import { ButtonChangeTheme } from '../changeTheme/changeThemeButton';
import { store } from '../../store/store';
import { jikanApi } from '../../api/createApi';
import { CardProps, CardsResponse } from '../../types/cardTypes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAppDispatch } from '../../types/store';
import { useCallback, useEffect, useState } from 'react';
import { cardListSlice } from '../cardList/cardListSlice';
import { CardList } from '../cardList/cardList';
import { Search } from '../search/search';
import { useRouter } from 'next/router';
import { Loader } from '../loader/loader';
import { Pagination } from '../pagination/pagination';
import { Favorites } from '../favorites/favorites';
import Layout from '../layout/layout';
import Link from 'next/link';

import styles from './mainPage.module.css';

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

const MainPage: NextPageWithLayout<{ data: CardsResponse }> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(() => router.route === 'details/[id]');
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);

  const dispatch = useAppDispatch();
  const setResults = useCallback(
    (results: CardProps[]) => {
      dispatch({
        type: cardListSlice.actions.setCardList.type,
        payload: results,
      });
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });

    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
      setIsFetchError(false);
    });

    router.events.on('routeChangeError', () => {
      setIsLoading(false);
      setIsFetchError(true);
      setResults([]);
    });
  }, [router, setResults]);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (router.route === '/details/[id]') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [router.route]);

  useEffect(() => {
    if (data) {
      setResults(data.data);
      setTotalPages(data.pagination.last_visible_page);
    }
  }, [data, setResults]);

  return (
    <div className="app-container">
      {isOpen && (
        <Link
          href={`/?q=${router.query.q || ''}&page=${router.query.page || '1'}`}
          className={styles.overlay}
        />
      )}
      <Favorites />
      <Search />
      <ButtonChangeTheme />
      {isLoading && <Loader />}
      {isFetchError && <p>Something went wrong</p>}
      {!isLoading && <CardList />}
      {!isLoading && !isFetchError && <Pagination totalPages={+totalPages} />}
    </div>
  );
};

MainPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default MainPage;
