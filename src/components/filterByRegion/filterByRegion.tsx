import { ActionDispatch } from 'react';
import { ReducerAction } from '../../types/reducerAction';
import { isRegion } from '../../utils/typeGuards';

export const FilterByRegion = ({
  dispatch,
}: {
  dispatch: ActionDispatch<[action: ReducerAction]>;
}) => {
  const handleClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (isRegion(value)) {
      if (value === 'all') {
        dispatch({ type: 'all' });
      } else {
        dispatch({ type: 'filter', payload: value });
      }
    }
  };

  return (
    <select
      onChange={handleClick}
      name="region"
      defaultValue="all"
      autoComplete="off"
    >
      <option value="all">All</option>
      <option value="africa">Africa</option>
      <option value="americas">Americas</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="oceania">Oceania</option>
    </select>
  );
};
