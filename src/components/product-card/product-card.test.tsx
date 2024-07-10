import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ProductCard from '.';
import { ADD_ITEM_TO_ORDER } from '../../graphql/mutations';
import { GET_ACTIVE_ORDER } from '../../graphql/queries';
import { darkTheme } from '../../theme';

const mocks = [
  {
    request: {
      query: GET_ACTIVE_ORDER,
    },
    result: {
      data: {
        activeOrder: null,
      },
    },
  },
  {
    request: {
      query: ADD_ITEM_TO_ORDER,
      variables: { id: '1', quantity: 1 },
    },
    result: {
      data: {
        addItemToOrder: {
          id: '1',
          total: 100,
        },
      },
    },
  },
];

describe('ProductCard component', () => {
  const product = {
    id: '1',
    description:
      'Officia aute esse nulla excepteur sit laborum Lorem excepteur est aliqua ipsum laboris.',
    featuredAsset: { preview: 'test-image.jpg' },
    name: 'Test Product',
    variants: [{ price: 100 }],
  };

  it('should render product details and handle purchase', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThemeProvider theme={darkTheme}>
          <ProductCard product={product} />
        </ThemeProvider>
      </MockedProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$1.00 USD')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Buy'));

    await waitFor(() => {
      expect(screen.getByText('Adding to cart...')).toBeInTheDocument();
    });
  });
});
