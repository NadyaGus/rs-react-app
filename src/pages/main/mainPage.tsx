import { useEffect, useState } from 'react';

import { CardProps } from '../../types/cardTypes';
import { Search } from '../../components/search/search';
import { Loader } from '../../components/loader/loader';
import { ErrorButton } from '../../components/errorButton/errorButton';
import { fetchData } from '../../api/fetchData';
import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { Pagination } from '../../components/pagination/pagination';
import { Link, Outlet, useNavigate, useParams } from 'react-router';
import styles from './mainPage.module.css';
import { ROUTES } from '../../App';
import { CardList } from '../../components/cardList/cardList';

export const LS_KEY = 'NADYA_GUS_KEY';

const MainPage = ({ localStorageKey }: { localStorageKey: string }) => {
  const [storedValue, setStoredValue] = useLocalStorage(localStorageKey);
  const [search, setSearch] = useState(storedValue);
  const [results, setResults] = useState<CardProps[]>([]);

  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('page') ? Number(params.get('page')) : 1;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);

  const params = useParams();
  const [isOpen, setIsOpen] = useState(params.animeId ? true : false);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.animeId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [params]);

  useEffect(() => {
    handleFetch(search, page);
  }, [search, page]);

  const handleSubmitForm = (searchValue: string) => {
    setSearch(searchValue);
    setStoredValue(searchValue);
    setPage(1);
    navigate(`?page=1`);
  };

  const handleFetch = (value: string, page = 1) => {
    setIsLoading(true);
    setIsFetchError(false);
    setResults([]);

    const data = fetchData.getPageForSearch(value, page);
    data
      .then((results) => {
        setResults(results.data);
        setPage(results.pagination.current_page);
        setTotalPages(results.pagination.last_visible_page);
      })
      .catch(() => {
        setIsFetchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="content">
      <div>
        {isOpen && (
          <Link
            to={`${ROUTES.root}?page=${page}`}
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          />
        )}
        <Search handleSubmitForm={handleSubmitForm} value={search} />
        {isLoading && <Loader />}
        {isFetchError && <p>Something went wrong</p>}
        {results && <CardList results={results} isLoading={isLoading} />}
        {!isLoading && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            handlePageChange={setPage}
          />
        )}
        <ErrorButton />
      </div>
      <div className="sidebar">
        <Outlet />
      </div>
    </div>
  );
};

export { MainPage };
