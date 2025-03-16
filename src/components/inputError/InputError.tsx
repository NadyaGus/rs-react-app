import clsx from 'clsx';
import styles from './error.module.css';

export const InputError = ({ error }: { error?: string }) => {
  return (
    <div className={clsx(styles.error, error && styles.errorActive)}>
      {error || ''}
    </div>
  );
};
