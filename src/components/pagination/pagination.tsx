import { useNavigate } from 'react-router';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const navigate = useNavigate();
  const handlePageChange = (page: number) => {
    props.handlePageChange(page);
    navigate(`?page=${page}`);
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(props.currentPage - 1)}
        disabled={props.currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {props.currentPage} of {props.totalPages}
      </span>
      <button
        onClick={() => handlePageChange(props.currentPage + 1)}
        disabled={props.currentPage === props.totalPages}
      >
        Next
      </button>
    </div>
  );
};

export { Pagination };
