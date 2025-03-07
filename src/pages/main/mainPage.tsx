import { useCallback, useEffect, useState } from 'react';

import { CardProps, CardsResponse } from '../../types/cardTypes';
import { Search } from '../../components/search/search';
import { Loader } from '../../components/loader/loader';
import { Pagination } from '../../components/pagination/pagination';
import {
  Link,
  Outlet,
  useNavigation,
  useParams,
  useSearchParams,
} from 'react-router';
import styles from './mainPage.module.css';
import { CardList } from '../../components/cardList/cardList';
import { ROUTES } from '../../utils/constants';
import { useAppDispatch } from '../../types/store';
import { cardListSlice } from '../../components/cardList/cardListSlice';
import { Favorites } from '../../components/favorites/favorites';
import { ButtonChangeTheme } from '../../components/changeTheme/changeThemeButton';

export default function MainPage(loaderData: CardsResponse) {
  const data = loaderData;
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(params.animeId ? true : false);

  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
    if (navigation.state === 'loading') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [navigation.state]);

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
        <ButtonChangeTheme />
        {isLoading && <Loader />}
        {!isLoading && <CardList />}
        {!isLoading && <Pagination totalPages={totalPages} />}
      </div>
      <Outlet />
    </div>
  );
}
