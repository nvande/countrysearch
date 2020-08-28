import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';

describe('render tests', () => {
    test('renders search', () => {
        render(<Search />);
        expect(screen.getByTestId('search')).toBeTruthy();
    });

    test('renders search bar', () => {
        render(<Search />);
        expect(screen.getByTestId('search-bar')).toBeTruthy();
    });

    test('renders results', () => {
        render(<Search />);
        expect(screen.getByTestId('results')).toBeTruthy();
    });
})