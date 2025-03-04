import { Card } from './card/card';
import { CardProps } from '../../../shared/types/cardTypes';

const CardList = ({ data }: { data: CardProps[] }) => {
  if (data.length === 0) {
    return <h2>No results found</h2>;
  }

  return (
    <>
      {data.map((item) => (
        <Card key={item.mal_id} card={item} />
      ))}
    </>
  );
};

export { CardList };
