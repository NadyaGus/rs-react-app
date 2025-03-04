'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './pagination.module.css';

type PaginationProps = {
  totalPages: number;
  setIsLoading: (loading: boolean) => void;
};

const Pagination = ({ totalPages, setIsLoading }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const q = searchParams.get('q');

  const handlePageChange = (currentPage: number) => {
    router.push(`?q=${q || ''}&page=${currentPage}`);
    setIsLoading(true);
    window.scrollTo(0, 0);
  };

  if (totalPages === 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => handlePageChange(+(page || 1) - 1)}
        disabled={+(page || 1) === 1}
      >
        Previous
      </button>
      <span>
        Page {page || 1} of {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={() => handlePageChange(+(page || 1) + 1)}
        disabled={+(page || 1) === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export { Pagination };
