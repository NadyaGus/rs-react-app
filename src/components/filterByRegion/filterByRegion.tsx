import { ActionDispatch, memo, useCallback } from 'react';
import { ReducerAction } from '../../types/reducerAction';
import { isRegion } from '../../utils/typeGuards';
import { regions } from '../../types/regions';

export const FilterByRegion = memo(
  ({ dispatch }: { dispatch: ActionDispatch<[action: ReducerAction]> }) => {
    const handleClick = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (isRegion(value)) {
          if (value === 'all') {
            dispatch({ type: 'all' });
          } else {
            dispatch({ type: 'filter', payload: value });
          }
        }
      },
      [dispatch]
    );

    return (
      <label className="label" htmlFor="region">
        Region:
        <select
          onChange={handleClick}
          id="region"
          defaultValue="all"
          autoComplete="off"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region.charAt(0).toUpperCase() + region.slice(1)}
            </option>
          ))}
        </select>
      </label>
    );
  }
);

FilterByRegion.displayName = 'FilterByRegion';
