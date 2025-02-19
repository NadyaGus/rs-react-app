import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../types/store';
import { favoritesSlice } from '../favorites/favoritesSlice';

type CheckBoxProps = {
  id: number;
};

const CheckBox = (props: CheckBoxProps) => {
  const initChecked = useAppSelector((state) =>
    state.favorites.favorites.includes(props.id)
  );
  const [isChecked, setIsChecked] = useState(initChecked);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  useEffect(() => {
    setIsChecked(favorites.includes(props.id));
  }, [favorites, props.id]);

  useEffect(() => {
    if (isChecked) {
      dispatch(favoritesSlice.actions.addFavorite(props.id));
    } else {
      dispatch(favoritesSlice.actions.removeFavorite(props.id));
    }
  }, [isChecked, props.id, dispatch]);

  return (
    <>
      <label>
        {isChecked ? 'Remove from favorites' : 'Add to favorites'}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          title={isChecked ? 'Remove from favorites' : 'Add to favorites'}
        />
      </label>
    </>
  );
};

export { CheckBox };
