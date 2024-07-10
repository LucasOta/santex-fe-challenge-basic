import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import BuyButton from '.';
import { darkTheme } from '../../../../theme';

describe('BuyButton component', () => {
  const mockOnClick = jest.fn();

  it('should render with correct text and style', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <BuyButton onClick={mockOnClick} loading={false}>
          Buy
        </BuyButton>
      </ThemeProvider>
    );

    const button = screen.getByText('Buy');
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle('text-transform: uppercase');
  });

  it('should call onClick when clicked', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <BuyButton onClick={mockOnClick} loading={false}>
          Buy
        </BuyButton>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Buy'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should display loading text when loading is true', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <BuyButton onClick={mockOnClick} loading={true}>
          Adding to cart...
        </BuyButton>
      </ThemeProvider>
    );

    const button = screen.getByText('Adding to cart...');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
