import { ButtonChangeTheme } from '../../components/buttons/changeThemeButton';
import { Search } from '../../components/search/search';
import { fetchData } from '../../api/fetchData';
import { Favorites } from '../../components/favorites/favorites';
import { CardListWithPagination } from '../../components/cardListWithPagination/cardListWithPagination';

const MainPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string; page: string }>;
}) => {
  const { q = '', page = '1' } = await searchParams;
  const data = await fetchData.getResults(q, +page);

  return (
    <div className="app-container">
      <Favorites />
      <Search />
      <ButtonChangeTheme />
      <CardListWithPagination
        data={data.data}
        totalPages={+data.pagination.last_visible_page}
      />
    </div>
  );
};

export default MainPage;
