import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ProductImage from '.';
import { darkTheme } from '../../../theme';

describe('ProductImage component', () => {
  it('should display the product image', () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <ProductImage src="test-image.jpg" />
      </ThemeProvider>
    );

    const imgElement = screen.getByTestId('background-image');
    expect(imgElement).toHaveStyle(`background-image: url(test-image.jpg)`);
  });
});
