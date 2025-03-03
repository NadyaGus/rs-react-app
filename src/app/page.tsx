import { ButtonChangeTheme } from '../components/changeTheme/changeThemeButton';
import { CardList } from '../components/cardList/cardList';
import { Search } from '../components/search/search';
import { fetchData } from '../api/fetchData';
import { Pagination } from '../components/pagination/pagination';
import { Favorites } from '../components/favorites/favorites';
// import Link from 'next/link';

const MainPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string; page: string }>;
}) => {
  const { q = '', page = '1' } = await searchParams;
  const data = await fetchData.getResults(q, +page);
  // const router = useRouter();
  // const [isOpen, setIsOpen] = useState(() => router.route === 'details/[id]');
  // const [isFetchError, setIsFetchError] = useState(false);

  // useEffect(() => {
  //   router.events.on('routeChangeComplete', () => {
  //     setIsFetchError(false);
  //   });

  //   router.events.on('routeChangeError', () => {
  //     setIsFetchError(true);
  //     setResults([]);
  //   });
  // }, [router, setResults]);

  // useEffect(() => {
  //   if (router.route === '/details/[id]') {
  //     setIsOpen(true);
  //   } else {
  //     setIsOpen(false);
  //   }
  // }, [router.route]);

  return (
    <div className="app-container">
      {/* {isOpen && (
        <Link
          href={`/?q=${router.query.q || ''}&page=${router.query.page || '1'}`}
          className="overlay"
        />
      )} */}
      <Favorites />
      <Search />
      <ButtonChangeTheme />
      {/* {isFetchError && <p>Something went wrong</p>} */}
      <CardList data={data.data} />
      {/* {!isFetchError && <Pagination totalPages={+totalPages} />} */}
      <Pagination totalPages={+data.pagination.last_visible_page} />
    </div>
  );
};

export default MainPage;
