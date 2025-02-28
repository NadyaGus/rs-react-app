import { useRouter } from 'next/router';
import styles from './pagination.module.css';

type PaginationProps = {
  totalPages: number;
};

const Pagination = (props: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`${router.pathname}?q=${router.query.q}&page=${page}`);
    window.scrollTo(0, 0);
  };

  if (props.totalPages === 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => handlePageChange(+(router.query.page || 1) - 1)}
        disabled={+(router.query.page || 1) === 1}
      >
        Previous
      </button>
      <span>
        Page {router.query.page || 1} of {props.totalPages}
      </span>
      <button
        className={styles.button}
        onClick={() => handlePageChange(+(router.query.page || 1) + 1)}
        disabled={+(router.query.page || 1) === props.totalPages}
      >
        Next
      </button>
    </div>
  );
};

export { Pagination };
