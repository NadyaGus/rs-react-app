import { ButtonChangeTheme } from '../components/changeTheme/changeThemeButton';
// import { store } from '../store/store';
// import { jikanApi } from '../api/createApi';
// import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
// import { useAppDispatch } from '../types/store';
// import { useCallback, useEffect, useState } from 'react';
// import { cardListSlice } from '../components/cardList/cardListSlice';
import { CardList } from '../components/cardList/cardList';
import { Search } from '../components/search/search';
import { fetchData } from '../api/fetchData';
import { Pagination } from '../components/pagination/pagination';
// import { useRouter } from 'next/navigation';
// import { Pagination } from '../components/pagination/pagination';
// import { Favorites } from '../components/favorites/favorites';
// import Layout from './layout';
// import Link from 'next/link';

// import styles from '../components/mainPage/mainPage.module.css';

const MainPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string; page: string }>;
}) => {
  const { q = '', page = '1' } = await searchParams;
  const data = await fetchData.getResults(q, +page);
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
          className="overlay"
        />
      )} */}
      {/* <Favorites /> */}
      <Search />
      <ButtonChangeTheme />
      {/* {isFetchError && <p>Something went wrong</p>} */}
      <CardList data={data.data} />
      {/* {!isFetchError && <Pagination totalPages={+totalPages} />} */}
      <Pagination totalPages={+data.pagination.last_visible_page} />
    </div>
  );
};

export default MainPage;
