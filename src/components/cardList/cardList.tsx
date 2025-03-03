import { Card } from './card/card';
import { CardProps } from '../../shared/types/cardTypes';

const CardList = ({ data }: { data: CardProps[] }) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  // useEffect(() => {
  //   router.events.on('routeChangeStart', () => {
  //     setIsLoading(true);
  //   });

  //   router.events.on('routeChangeComplete', () => {
  //     setIsLoading(false);
  //   });
  // }, [router]);

  // if (results.length === 0 && !isLoading) {
  //   return <h2>No results found</h2>;
  // }

  return (
    <>
      {data.map((item) => (
        <Card key={item.mal_id} card={item} />
      ))}
    </>
  );
};

export { CardList };
