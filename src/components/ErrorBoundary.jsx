import React from 'react'

export class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Something went wrong!</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
