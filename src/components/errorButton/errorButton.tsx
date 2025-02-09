import { useState } from 'react';
import styles from './errorButton.module.css';

const ErrorButton = () => {
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('Something went wrong.');
  }

  return (
    <div className={styles.container}>
      <button onClick={() => handleClick()}>Check Error Boundary</button>
    </div>
  );
};

export { ErrorButton };
