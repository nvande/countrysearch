import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('render tests', () => {
    test('renders header', () => {
        render(<Header />);
        expect(screen.getByTestId('header')).toBeTruthy();
    });

    test('renders footer body as expected', () => {
        const title = "Country Search";
        render(<Header />);
        expect(screen.getByTestId('header-title')).toHaveTextContent(title);
    });
})