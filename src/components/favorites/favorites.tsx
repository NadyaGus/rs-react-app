import { useAppDispatch, useAppSelector } from '../../types/store';
import { createCSV } from './createCSV';
import { favoritesSlice } from './favoritesSlice';

const Favorites = () => {
  const count = useAppSelector((state) => state.favorites.favorites.length);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const handleDownload = () => {
    const csvContent = createCSV(favorites);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    return url;
  };

  const handleUnselectAll = () => {
    dispatch(favoritesSlice.actions.clearFavorites());
  };

  return (
    <div>
      <a href={handleDownload()} download={`favorites-${favorites.length}.csv`}>
        <button>Download</button>
      </a>

      <div>favorites {count}</div>
      <button onClick={handleUnselectAll}>Unselect all</button>
    </div>
  );
};

export { Favorites };
