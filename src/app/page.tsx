import { Suspense } from 'react';
import { Loader } from '../components/loader/loader';

export default function Home() {
  return <Suspense fallback={<Loader isLoading />}></Suspense>;
}
