import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../types/store';
import { favoritesSlice } from '../favorites/favoritesSlice';
import { CardProps } from '../../types/cardTypes';

type CheckBoxProps = {
  card: CardProps;
};

const CheckBox = (props: CheckBoxProps) => {
  const initChecked = useAppSelector((state) =>
    state.favorites.favorites.includes(props.card)
  );
  const [isChecked, setIsChecked] = useState(initChecked);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  useEffect(() => {
    setIsChecked(favorites.includes(props.card));
  }, [favorites, props.card]);

  useEffect(() => {
    if (isChecked) {
      dispatch(favoritesSlice.actions.addFavorite(props.card));
    } else {
      dispatch(favoritesSlice.actions.removeFavorite(props.card));
    }
  }, [isChecked, props.card, dispatch]);

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
