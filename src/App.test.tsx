import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Test that component render
test('renders', () => {
  render(<App />);
});
