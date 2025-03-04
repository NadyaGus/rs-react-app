'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CloseDetailsButton() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const q = queryParams.get('q');
  const page = queryParams.get('page');

  return (
    <button onClick={() => router.push(`/?q=${q || ''}&page=${page}`)}>
      Close
    </button>
  );
}
