// import { Outlet } from 'react-router';
// import styles from './mainPage.module.css';
// import { ButtonChangeTheme } from '../../components/changeTheme/changeThemeButton';
// import { NextPageWithLayout } from '../_app';
// import Layout from '../../components/layout/layout';

// const MainPage: NextPageWithLayout = () => {
//   // const [searchParams] = useSearchParams();
//   // const params = useParams();
//   // const [isOpen, setIsOpen] = useState(params.animeId ? true : false);

//   // const dispatch = useAppDispatch();
//   // const setResults = useCallback(
//   //   (results: CardProps[]) => {
//   //     dispatch({
//   //       type: cardListSlice.actions.setCardList.type,
//   //       payload: results,
//   //     });
//   //   },
//   //   [dispatch]
//   // );

//   // const [totalPages, setTotalPages] = useState(1);
//   // const [isFetchError, setIsFetchError] = useState(false);
//   // const { data, isFetching, isError } = useGetResultsQuery({
//   //   q: searchParams.get('q') ?? '',
//   //   page: Number(searchParams.get('page')) || 1,
//   // });

//   // useEffect(() => {
//   //   if (params.animeId) {
//   //     setIsOpen(true);
//   //   } else {
//   //     setIsOpen(false);
//   //   }
//   // }, [params]);

//   // useEffect(() => {
//   //   if (data) {
//   //     setResults(data.data);
//   //     setTotalPages(data.pagination.last_visible_page);
//   //   }
//   // }, [data, setResults]);

//   // useEffect(() => {
//   //   if (isError) {
//   //     setIsFetchError(true);
//   //     setResults([]);
//   //   } else {
//   //     setIsFetchError(false);
//   //   }
//   // }, [isError, setResults]);

//   return (
//     <div className={styles.container}>
//       <div>
//         {/* {isOpen && (
//           <Link
//             to={`${ROUTES.root}?page=${searchParams.get('page') ?? '1'}`}
//             className={styles.overlay}
//             onClick={() => setIsOpen(false)}
//           />
//         )} */}
//         {/* <Favorites /> */}
//         {/* <Search /> */}
//         <ButtonChangeTheme />
//         {/* {isFetching && <Loader />} */}
//         {/* {isFetchError && <p>Something went wrong</p>} */}
//         {/* {!isFetching && !isFetchError && <CardList />}
//         {!isFetching && !isFetchError && <Pagination totalPages={totalPages} />} */}
//       </div>
//       <Outlet />
//     </div>
//   );
// };

// MainPage.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };
// export default MainPage;
