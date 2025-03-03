'use client';
import { useAppDispatch, useAppSelector } from '../../shared/types/store';
import { favoritesSlice } from './favoritesSlice';

import styles from './favorites.module.css';
import { createCSV } from '../../shared/utils/createCSV';
import { useEffect, useState } from 'react';

const Favorites = () => {
  const count = useAppSelector((state) => state.favorites.favorites.length);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (favorites.length > 0) {
      const csvContent = createCSV(favorites);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [favorites]);

  const handleUnselectAll = () => {
    dispatch(favoritesSlice.actions.clearFavorites());
  };

  return (
    <div className={styles.container + ' ' + (count > 0 ? styles.active : '')}>
      <div className={styles.favorites}>
        <a
          href={downloadUrl || ''}
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
