import { NextPageWithLayout } from './_app';
import Layout from '../components/layout/layout';

export const LS_KEY = 'NADYA_GUS_KEY';

const App: NextPageWithLayout = () => {
  return <></>;
};

App.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default App;
