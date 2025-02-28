import { useAppDispatch, useAppSelector } from '../../types/store';
import { favoritesSlice } from './favoritesSlice';

import styles from './favorites.module.css';

const Favorites = () => {
  const count = useAppSelector((state) => state.favorites.favorites.length);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  // const handleDownload = () => {
  //   const csvContent = createCSV(favorites);

  //   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  //   const url = URL.createObjectURL(blob);

  //   return url;
  // };

  const handleUnselectAll = () => {
    dispatch(favoritesSlice.actions.clearFavorites());
  };

  return (
    <div className={styles.container + ' ' + (count > 0 ? styles.active : '')}>
      <div className={styles.favorites}>
        <a
          // href={handleDownload()}
          download={`favorites-${favorites.length}.csv`}
        >
          <button>Download</button>
        </a>

        <p className={styles.count}>favorites {count}</p>
        <button onClick={handleUnselectAll}>Unselect all</button>
      </div>
    </div>
  );
};

export { Favorites };
