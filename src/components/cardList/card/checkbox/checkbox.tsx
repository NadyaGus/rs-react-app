import { CardProps } from '../../../../shared/types/cardTypes';
import { useAppDispatch, useAppSelector } from '../../../../shared/types/store';
import { favoritesSlice } from '../../../favorites/favoritesSlice';

type CheckBoxProps = {
  card: CardProps;
};

const CheckBox = (props: CheckBoxProps) => {
  const dispatch = useAppDispatch();
  const isChecked = useAppSelector((state) =>
    state.favorites.favorites.some((card) => card.mal_id === props.card.mal_id)
  );

  const handleClick = () => {
    dispatch(favoritesSlice.actions.toggleFavorite(props.card));
  };

  return (
    <>
      <label>
        {isChecked ? 'Remove from favorites' : 'Add to favorites'}
        <input
          name="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={() => handleClick()}
          title={isChecked ? 'Remove from favorites' : 'Add to favorites'}
        />
      </label>
    </>
  );
};

export { CheckBox };
