import { useEffect, useState } from 'react';

import { CardProps } from '../../types/cardTypes';
import { Search } from '../../components/search/search';
import { Loader } from '../../components/loader/loader';
import { Pagination } from '../../components/pagination/pagination';
import { Link, Outlet, useParams, useSearchParams } from 'react-router';
import styles from './mainPage.module.css';
import { CardList } from '../../components/cardList/cardList';
import { ROUTES } from '../../utils/constants';
import { useGetResultsQuery } from '../../api/createApi';

const MainPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const [results, setResults] = useState<CardProps[]>([]);

  const [totalPages, setTotalPages] = useState(1);
  const [isFetchError, setIsFetchError] = useState(false);
  const { data, isFetching, isError } = useGetResultsQuery({
    q: searchParams.get('q') ?? '',
    page: Number(searchParams.get('page')) || 1,
  });

  const [isOpen, setIsOpen] = useState(params.animeId ? true : false);

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
  }, [data]);

  useEffect(() => {
    if (isError) {
      setIsFetchError(true);
      setResults([]);
    } else {
      setIsFetchError(false);
    }
  }, [isError]);

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
        <Search />
        {isFetching && <Loader />}
        {isFetchError && <p>Something went wrong</p>}
        {results && !isFetching && !isFetchError && (
          <CardList results={results} isLoading={isFetching} />
        )}
        {!isFetching && <Pagination totalPages={totalPages} />}
      </div>
      <Outlet />
    </div>
  );
};

export { MainPage };
