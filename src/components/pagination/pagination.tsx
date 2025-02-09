import { useNavigate } from 'react-router';
import styles from './pagination.module.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const navigate = useNavigate();
  const handlePageChange = (page: number) => {
    props.handlePageChange(page);
    window.scrollTo(0, 0);
    navigate(`?page=${page}`);
  };

  if (props.totalPages === 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => handlePageChange(props.currentPage - 1)}
        disabled={props.currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {props.currentPage} of {props.totalPages}
      </span>
      <button
        className={styles.button}
        onClick={() => handlePageChange(props.currentPage + 1)}
        disabled={props.currentPage === props.totalPages}
      >
        Next
      </button>
    </div>
  );
};

export { Pagination };
