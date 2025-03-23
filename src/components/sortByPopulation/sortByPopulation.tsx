import { ActionDispatch, memo, useCallback } from 'react';
import { ReducerAction } from '../../types/reducerAction';
import { isPopulation } from '../../utils/typeGuards';

export const SortByPopulation = memo(
  ({ dispatch }: { dispatch: ActionDispatch<[action: ReducerAction]> }) => {
    const handleClick = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (isPopulation(value)) {
          dispatch({ type: 'sortByPopulation', payload: value });
        }
      },
      [dispatch]
    );

    return (
      <label className="label" htmlFor="region">
        Population Order:
        <select
          onChange={handleClick}
          id="population"
          defaultValue="all"
          autoComplete="off"
        >
          <option value="default">Default</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    );
  }
);

SortByPopulation.displayName = 'SortByPopulation';
