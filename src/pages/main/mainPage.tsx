import { useCallback, useEffect, useState } from 'react';

import { CardProps } from '../../types/cardTypes';
import { Search } from '../../components/search/search';
import { Loader } from '../../components/loader/loader';
import { Pagination } from '../../components/pagination/pagination';
import { Link, Outlet, useParams, useSearchParams } from 'react-router';
import styles from './mainPage.module.css';
import { CardList } from '../../components/cardList/cardList';
import { ROUTES } from '../../utils/constants';
import { useGetResultsQuery } from '../../api/createApi';
import { useAppDispatch } from '../../types/store';
import { cardListSlice } from '../../components/cardList/cardListSlice';
import { Favorites } from '../../components/favorites/favorites';

const MainPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(params.animeId ? true : false);

  const dispatch = useAppDispatch();
  const setResults = useCallback(
    (results: CardProps[]) => {
      dispatch({
        type: cardListSlice.actions.setCardList.type,
        payload: results,
      });
    },
    [dispatch]
  );

  const [totalPages, setTotalPages] = useState(1);
  const [isFetchError, setIsFetchError] = useState(false);
  const { data, isFetching, isError } = useGetResultsQuery({
    q: searchParams.get('q') ?? '',
    page: Number(searchParams.get('page')) || 1,
  });

  useEffect(() => {
    if (params.animeId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [params]);

  useEffect(() => {
    if (data) {
      setResults(data.data);
      setTotalPages(data.pagination.last_visible_page);
    }
  }, [data, setResults]);

  useEffect(() => {
    if (isError) {
      setIsFetchError(true);
      setResults([]);
    } else {
      setIsFetchError(false);
    }
  }, [isError, setResults]);

  return (
    <div className={styles.container}>
      <div>
        {isOpen && (
          <Link
            to={`${ROUTES.root}?page=${searchParams.get('page') ?? '1'}`}
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          />
        )}
        <Favorites />
        <Search />
        {isFetching && <Loader />}
        {isFetchError && <p>Something went wrong</p>}
        {!isFetching && !isFetchError && <CardList />}
        {!isFetching && <Pagination totalPages={totalPages} />}
      </div>
      <Outlet />
    </div>
  );
};

export { MainPage };
