import { ActionDispatch, memo, useCallback } from 'react';
import { ReducerAction } from '../../types/reducerAction';

export const Search = memo(
  ({ dispatch }: { dispatch: ActionDispatch<[action: ReducerAction]> }) => {
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        dispatch({ type: 'search', payload: value });
      },
      [dispatch]
    );

    return (
      <input
        type="text"
        placeholder="Search for a country..."
        autoComplete="off"
        name="search"
        onChange={handleChange}
      />
    );
  }
);

Search.displayName = 'Search';
