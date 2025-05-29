import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('React ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h2 style={{ margin: '0 0 16px 0' }}>Something went wrong!</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginBottom: '16px' }}>
            <summary style={{ marginBottom: '8px' }}>Error details (click to expand)</summary>
            <p style={{ fontSize: '14px', margin: '8px 0' }}>
              <strong>Error:</strong> {this.state.error && (this.state.error.toString() || 'Unknown error')}
            </p>
            {this.state.errorInfo && (
              <pre style={{ 
                fontSize: '12px',
                overflow: 'auto',
                maxHeight: '300px',
                backgroundColor: '#f1f1f1',
                padding: '8px',
                borderRadius: '4px'
              }}>
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
