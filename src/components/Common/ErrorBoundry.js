// ErrorBoundary.js
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, errorMessage: '' };

  // Hata yakalandığında state güncellenir
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Hata ile ilgili bilgi yakalar ve state'i günceller
  componentDidCatch(error, info) {
    this.setState({ errorMessage: error.message });
    console.error('Error caught by Error Boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // Hata durumunda kullanıcıya gösterilecek yedek içerik
      return <h2>Something went wrong: {this.state.errorMessage}</h2>;
    }
    // Hata yoksa normal içerik render edilir
    return this.props.children;
  }
}

export default ErrorBoundary;
