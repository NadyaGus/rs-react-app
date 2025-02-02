import { Component } from 'react';
import styles from './loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader} />
      </div>
    );
  }
}

export { Loader };
