import { Component } from 'react';
import styles from './errorButton.module.css';

export class ErrorButton extends Component {
  state = { hasError: false };

  handleClick(): void {
    this.setState({ hasError: true });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      throw new Error('Something went wrong.');
    }
    return (
      <div className={styles.container}>
        <button onClick={() => this.handleClick()}>Check Error Boundary</button>
      </div>
    );
  }
}
