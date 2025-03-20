import { ActionDispatch } from 'react';
import { ReducerAction } from '../../types/reducerAction';
import { isRegion } from '../../utils/typeGuards';
import { regions } from '../../types/regions';

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
      {regions.map((region) => (
        <option key={region} value={region}>
          {region.charAt(0).toUpperCase() + region.slice(1)}
        </option>
      ))}
    </select>
  );
};
