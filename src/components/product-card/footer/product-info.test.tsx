import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ProductCardFooter from '.';
import { darkTheme } from '../../../theme';
import formatAsCurrency from '../../../utils/formatAsCurrency';

describe('ProductCardFooter component', () => {
  const mockOnClick = jest.fn();
  const price = 100;

  it('should display product info and a buy button', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <ProductCardFooter
          name="Test Product"
          price={price}
          onClick={mockOnClick}
          loading={false}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(formatAsCurrency(price / 100))).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
  });

  it('should call onClick when buy button is clicked', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <ProductCardFooter
          name="Test Product"
          price={100}
          onClick={mockOnClick}
          loading={false}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Buy'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should display loading state when loading is true', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <ProductCardFooter
          name="Test Product"
          price={100}
          onClick={mockOnClick}
          loading={true}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('Adding to cart...')).toBeInTheDocument();
  });
});
