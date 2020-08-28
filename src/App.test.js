import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('render tests', () => {
  test('renders header', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeTruthy();
  });

  test('renders search', () => {
    render(<App />);
    expect(screen.getByTestId('search')).toBeTruthy();
  });

  test('renders footer', () => {
    render(<App />);
    expect(screen.getByTestId('footer')).toBeTruthy();
  });
})

