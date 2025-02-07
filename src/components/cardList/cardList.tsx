import { CardProps } from '../../types/cardTypes';
import { Card } from '../card/card';

const CardList = ({ results }: { results: CardProps[] }) => {
  if (results.length === 0) {
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
