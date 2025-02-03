import { Component } from 'react';
import styles from './loader.module.css';

interface LoaderProps {
  isLoading: boolean;
}

class Loader extends Component<LoaderProps> {
  render() {
    return (
      this.props.isLoading && (
        <div className={styles.loaderContainer}>
          <div className={styles.loader} />
        </div>
      )
    );
  }
}

export { Loader };
