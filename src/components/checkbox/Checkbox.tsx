import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { CountryData } from '../../types/countryData';
import { toggleVisited } from '../../utils/visitedSlice';

export const Checkbox = memo(({ country }: { country: CountryData }) => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) =>
    state.visited.data.some((item) => item.cca3 === country.cca3)
  );

  const handleClick = () => {
    dispatch(toggleVisited(country));
  };

  return (
    <label htmlFor="visited">
      Visited:
      <input
        type="checkbox"
        name="visited"
        checked={state}
        onChange={handleClick}
      />
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
