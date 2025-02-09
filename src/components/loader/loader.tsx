import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} data-testid="loader" />
    </div>
  );
};

export { Loader };
