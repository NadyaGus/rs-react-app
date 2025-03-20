import { ActionDispatch } from 'react';
import { ReducerAction } from '../../types/reducerAction';

export const Search = ({
  dispatch,
}: {
  dispatch: ActionDispatch<[action: ReducerAction]>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch({ type: 'search', payload: value });
  };

  return (
    <input
      type="text"
      placeholder="Search for a country..."
      autoComplete="off"
      name="search"
      onChange={handleChange}
    />
  );
};
