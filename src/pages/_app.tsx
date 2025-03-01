import { NextPage } from 'next';
import './index.css';
import { ReactElement, ReactNode } from 'react';
import App, { AppContext, AppProps } from 'next/app';
import MainPage from '../components/mainPage/mainPage';
import { CardsResponse } from '../types/cardTypes';
import { jikanApi } from '../api/createApi';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import ErrorPage404 from './404';

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
  if (Component === ErrorPage404) {
    return getLayout(<Component {...pageProps} />);
  }
  return getLayout(
    <Provider store={store}>
      <MainPage data={mainPageData} />
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
