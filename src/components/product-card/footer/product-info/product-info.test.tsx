import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ProductInfo from '.';
import { darkTheme } from '../../../../theme';
import formatAsCurrency from '../../../../utils/formatAsCurrency';

describe('ProductInfo component', () => {
  const price = 100;
  it('should display the product name and price', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <ProductInfo name="Test Product" price={price} />
      </ThemeProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(formatAsCurrency(price / 100))).toBeInTheDocument();
  });
});
