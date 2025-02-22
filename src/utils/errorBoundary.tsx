import { Component } from 'react';
import { type ErrorInfo } from 'react-dom/client';

interface Props {
  children?: React.ReactNode;
}

interface State {
  error: Error | null;
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { error: null, hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>
            Sorry. Something went wrong...
            <br />
            Please, reload the page
          </h1>
          <button onClick={() => window.location.reload()}>Reset</button>
        </div>
      );
    }

    return this.props.children;
  }
}
