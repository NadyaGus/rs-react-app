import styles from './loader.module.css';

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      className={
        styles.loaderContainer + ' ' + (isLoading ? '' : styles.hidden)
      }
    >
      <div className={styles.loader} data-testid="loader" />
    </div>
  );
};

export { Loader };
