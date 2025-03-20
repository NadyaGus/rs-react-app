import { ActionDispatch } from 'react';
import { ReducerAction } from '../../types/reducerAction';
import { isPopulation } from '../../utils/typeGuards';

export const SortByPopulation = ({
  dispatch,
}: {
  dispatch: ActionDispatch<[action: ReducerAction]>;
}) => {
  const handleClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (isPopulation(value)) {
      dispatch({ type: 'sortByPopulation', payload: value });
    }
  };

  return (
    <select
      onChange={handleClick}
      name="region"
      defaultValue="all"
      autoComplete="off"
    >
      <option value="default">Default</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  );
};
