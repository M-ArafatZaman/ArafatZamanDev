import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

// Test that component render
test('The whole app renders', () => {
  render(<App />);
});
