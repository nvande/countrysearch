import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('render tests', () => {
    test('renders footer', () => {
        render(<Footer />);
        expect(screen.getByTestId('footer')).toBeTruthy();
    });

    test('renders footer body as expected', () => {
        const footerBody = "Created by Nick Vander Woude, 2020";
        render(<Footer />);
        expect(screen.getByTestId('footer-body')).toHaveTextContent(footerBody);
    });
  })