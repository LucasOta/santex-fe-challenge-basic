import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ProductInfo from '.';
import { darkTheme } from '../../../../theme';

describe('ProductInfo component', () => {
  it('should display the product name and price', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <ProductInfo name="Test Product" price={100} />
      </ThemeProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$1.00 USD')).toBeInTheDocument();
  });
});
