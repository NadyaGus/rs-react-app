import { NextPage } from 'next';
import './index.css';
import { ReactElement, ReactNode } from 'react';
import App, { AppContext, AppProps } from 'next/app';
import MainPage from './main/mainPage';
import { CardsResponse } from '../types/cardTypes';
import { jikanApi } from '../api/createApi';
import { store } from '../store/store';

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
  return getLayout(
    <>
      <MainPage data={mainPageData} />
      <Component {...pageProps} />
    </>
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
