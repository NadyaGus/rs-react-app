import { useRouter } from 'next/router';
import { useAppSelector } from '../../types/store';
import { Card } from '../card/card';
import { useEffect, useState } from 'react';

const CardList = () => {
  const results = useAppSelector((state) => state.searchResults.cardList);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });

    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, [router]);

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
