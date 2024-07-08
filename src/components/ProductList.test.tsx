import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { GET_ALL_PRODUCTS } from '../graphql/queries';
import { darkTheme } from '../theme';
import { ProductList } from './ProductList';

const mockProducts = {
  request: {
    query: GET_ALL_PRODUCTS,
  },
  result: {
    data: {
      products: {
        items: [
          {
            id: '1',
            name: 'Product 1',
            featuredAsset: {
              preview: 'image1.jpg',
            },
            variants: [
              {
                price: 100,
              },
            ],
          },
          {
            id: '2',
            name: 'Product 2',
            featuredAsset: {
              preview: 'image2.jpg',
            },
            variants: [
              {
                price: 200,
              },
            ],
          },
        ],
      },
    },
  },
};

// Mock error
const mockError = {
  request: {
    query: GET_ALL_PRODUCTS,
  },
  error: new Error('An error occurred'),
};

describe('ProductList', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ThemeProvider theme={darkTheme}>
          <ProductList />
        </ThemeProvider>
      </MockedProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    render(
      <MockedProvider mocks={[mockError]} addTypename={false}>
        <ThemeProvider theme={darkTheme}>
          <ProductList />
        </ThemeProvider>
      </MockedProvider>
    );
    expect(
      await screen.findByText('Error: An error occurred')
    ).toBeInTheDocument();
  });

  it('renders product list', async () => {
    render(
      <MockedProvider mocks={[mockProducts]} addTypename={false}>
        <ThemeProvider theme={darkTheme}>
          <ProductList />
        </ThemeProvider>
      </MockedProvider>
    );
    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(await screen.findByText('Product 2')).toBeInTheDocument();
  });
});
