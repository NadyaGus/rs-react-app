import { NextPageWithLayout } from '../_pages/_delete._app';
import { ButtonChangeTheme } from '../components/changeTheme/changeThemeButton';
// import { store } from '../store/store';
// import { jikanApi } from '../api/createApi';
import { CardsResponse } from '../types/cardTypes';
// import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
// import { useAppDispatch } from '../types/store';
// import { useCallback, useEffect, useState } from 'react';
// import { cardListSlice } from '../components/cardList/cardListSlice';
// import { CardList } from '../components/cardList/cardList';
import { Search } from '../components/search/search';
// import { useRouter } from 'next/router';
// import { Pagination } from '../components/pagination/pagination';
// import { Favorites } from '../components/mainPage/favorites/favorites';
// import Layout from './layout';
// import Link from 'next/link';

// import styles from '../components/mainPage/mainPage.module.css';

// export const getServerSideProps = (async (context) => {
//   const { q = '', page = '1' } = context.query;
//   const res = await store
//     .dispatch(
//       jikanApi.endpoints.getResults.initiate({
//         q: [...q],
//         page: [...page],
//       })
//     )
//     .unwrap();
//   const data: CardsResponse = res;
//   return {
//     props: { data },
//   };
// }) satisfies GetServerSideProps<{ data: CardsResponse }>;

const MainPage: NextPageWithLayout<{ data: CardsResponse }> = () => {
  // const router = useRouter();
  // const [isOpen, setIsOpen] = useState(() => router.route === 'details/[id]');
  // const [isFetchError, setIsFetchError] = useState(false);

  // const dispatch = useAppDispatch();
  // const setResults = useCallback(
  //   (results: CardProps[]) => {
  //     dispatch({
  //       type: cardListSlice.actions.setCardList.type,
  //       payload: results,
  //     });
  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   router.events.on('routeChangeComplete', () => {
  //     setIsFetchError(false);
  //   });

  //   router.events.on('routeChangeError', () => {
  //     setIsFetchError(true);
  //     setResults([]);
  //   });
  // }, [router, setResults]);

  // const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   if (router.route === '/details/[id]') {
  //     setIsOpen(true);
  //   } else {
  //     setIsOpen(false);
  //   }
  // }, [router.route]);

  // useEffect(() => {
  //   if (data) {
  //     setResults(data.data);
  //     setTotalPages(data.pagination.last_visible_page);
  //   }
  // }, [data, setResults]);

  return (
    <div className="app-container">
      {/* {isOpen && (
        <Link
          href={`/?q=${router.query.q || ''}&page=${router.query.page || '1'}`}
          className={styles.overlay}
        />
      )} */}
      {/* <Favorites /> */}
      <Search />
      <ButtonChangeTheme />
      {/* {isFetchError && <p>Something went wrong</p>} */}
      {/* <CardList /> */}
      {/* {!isFetchError && <Pagination totalPages={+totalPages} />} */}
    </div>
  );
};

// MainPage.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };

export default MainPage;
