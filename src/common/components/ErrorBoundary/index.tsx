import React, { Component, ErrorInfo } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<any, ErrorBoundaryState> {
  constructor(props: Record<string, any>) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (__PRODUCTION__) {
      return;
    }

    console.error(error); // eslint-disable-line no-console
    console.info(info.componentStack); // eslint-disable-line no-console
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
