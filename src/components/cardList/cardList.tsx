import { CardProps } from '../../types/cardTypes';
import { Card } from '../card/card';

const CardList = ({ results }: { results: CardProps[] }) => {
  return (
    <>
      {results.map((result) => (
        <Card key={result.mal_id} {...result} />
      ))}
    </>
  );
};

export { CardList };
