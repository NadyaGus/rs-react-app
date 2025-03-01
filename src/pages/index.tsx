import { NextPageWithLayout } from './_app';
import Layout from '../components/layout/layout';
import { CardsResponse } from '../types/cardTypes';

export const LS_KEY = 'NADYA_GUS_KEY';

const App: NextPageWithLayout<CardsResponse> = () => {
  return <></>;
};

App.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default App;
