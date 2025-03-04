import { Card } from './card/card';
import { CardProps } from '../../shared/types/cardTypes';

const CardList = ({ data }: { data: CardProps[] }) => {
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   router.events.on('routeChangeStart', () => {
  //     setIsLoading(true);
  //   });

  //   router.events.on('routeChangeComplete', () => {
  //     setIsLoading(false);
  //   });

  //   return () => {
  //     router.events.off('routeChangeStart', () => {});
  //     router.events.off('routeChangeComplete', () => {});
  //   };
  // });

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
