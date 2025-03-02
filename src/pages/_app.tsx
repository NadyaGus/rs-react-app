import './index.css';
import { NextPage } from 'next';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import App, { AppContext, AppProps } from 'next/app';
import MainPage from '../components/mainPage/mainPage';
import { CardsResponse } from '../types/cardTypes';
import { jikanApi } from '../api/createApi';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import ErrorPage404 from './404';
import { Loader } from '../components/loader/loader';
import { useRouter } from 'next/router';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  mainPageData: CardsResponse;
};

export default function MyApp({
  Component,
  pageProps,
  mainPageData,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsLoading(false), []);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });

    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, [router]);

  if (Component === ErrorPage404) {
    return getLayout(<Component {...pageProps} />);
  }
  return getLayout(
    <Provider store={store}>
      <MainPage data={mainPageData} />
      <Loader isLoading={isLoading} />
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const mainPageData = await store
    .dispatch(
      jikanApi.endpoints.getResults.initiate({
        q: [...(appContext.ctx.query.q || '')],
        page: [...(appContext.ctx.query.page || '1')],
      })
    )
    .unwrap();

  return {
    ...appProps,
    mainPageData,
  };
};
