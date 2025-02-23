import { useAppSelector } from '../../types/store';
import { Card } from '../card/card';

const CardList = () => {
  const results = useAppSelector((state) => state.searchResults.cardList);
  const isLoading = useAppSelector((state) => state.searchResults.isLoading);

  if (results.length === 0 && !isLoading) {
    return <h2>No results found</h2>;
  }

  return (
    <>
      {results.map((result) => (
        <Card key={result.mal_id} {...result} />
      ))}
    </>
  );
};

export { CardList };
