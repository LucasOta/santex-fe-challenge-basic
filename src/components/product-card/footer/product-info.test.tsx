import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ProductCardFooter from '.';
import { darkTheme } from '../../../theme';

describe('ProductCardFooter component', () => {
  const mockOnClick = jest.fn();

  it('should display product info and a buy button', () => {
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

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$1.00 USD')).toBeInTheDocument();
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
