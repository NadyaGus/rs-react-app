import { useAppDispatch, useAppSelector } from '../../types/store';
import { favoritesSlice } from './favoritesSlice';

const Favorites = () => {
  const count = useAppSelector((state) => state.favorites.favorites.length);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(favoritesSlice.actions.clearFavorites());
  };

  return (
    <div>
      <div>favorites {count}</div>
      <button onClick={handleClick}>Unselect all</button>
    </div>
  );
};

export { Favorites };
