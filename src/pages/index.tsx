import { NextPageWithLayout } from './_app';
import Layout from '../components/layout/layout';
import { ButtonChangeTheme } from '../components/changeTheme/changeThemeButton';
import { store } from '../store/store';
import { jikanApi } from '../api/createApi';
import { CardProps } from '../types/cardTypes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAppDispatch } from '../types/store';
import { useCallback, useEffect, useState } from 'react';
import { cardListSlice } from '../components/cardList/cardListSlice';
import { CardList } from '../components/cardList/cardList';
import { Search } from '../components/search/search';
import { useRouter } from 'next/router';
import { Loader } from '../components/loader/loader';

export const LS_KEY = 'NADYA_GUS_KEY';

export const getServerSideProps = (async (context) => {
  const { q = 'naruto', page = '1' } = context.query;
  const res = await store
    .dispatch(
      jikanApi.endpoints.getResults.initiate({
        q: [...q],
        page: [...page],
      })
    )
    .unwrap();
  const data: CardProps[] = res.data;
  return {
    props: { data },
  };
}) satisfies GetServerSideProps<{ data: CardProps[] }>;

const App: NextPageWithLayout<{ data: CardProps[] }> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  // const [searchParams] = useSearchParams();
  // const params = useParams();
  // const [isOpen, setIsOpen] = useState(params.animeId ? true : false);

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

    router.events.on('routeChangeError', () => {
      setIsLoading(false);
      setIsFetchError(true);
      setResults([]);
    });
  }, [router, setResults]);

  // const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   if (params.animeId) {
  //     setIsOpen(true);
  //   } else {
  //     setIsOpen(false);
  //   }
  // }, [params]);

  useEffect(() => {
    if (data) {
      setResults(data);
      // setTotalPages(data.pagination.last_visible_page);
    }
  }, [data, setResults]);

  return (
    <div className="app-container">
      <div>
        {/* {isOpen && (
          <Link
            to={`${ROUTES.root}?page=${searchParams.get('page') ?? '1'}`}
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          />
        )} */}
        {/* <Favorites /> */}
        <Search />
        <ButtonChangeTheme />
        {isLoading && <Loader />}
        {isFetchError && <p>Something went wrong</p>}
        {!isLoading && <CardList />}
        {/* {!isFetching && !isFetchError && <Pagination totalPages={totalPages} />} */}
      </div>
      {/* <Outlet /> */}
    </div>
  );
};

App.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default App;
