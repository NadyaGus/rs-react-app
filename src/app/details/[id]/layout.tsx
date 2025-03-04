import { Suspense } from 'react';
import Loading from './loader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
