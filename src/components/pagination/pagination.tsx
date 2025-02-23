import { useSearchParams } from 'react-router';
import styles from './pagination.module.css';

type PaginationProps = {
  totalPages: number;
};

const Pagination = (props: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    setSearchParams({ q: searchParams.get('q') ?? '', page: String(page) });
    window.scrollTo(0, 0);
  };

  if (props.totalPages === 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {props.totalPages}
      </span>
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === props.totalPages}
      >
        Next
      </button>
    </div>
  );
};

export { Pagination };
