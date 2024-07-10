import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import Header from '.';
import { OrderProvider } from '../../contexts/order-context';
import { GET_ACTIVE_ORDER } from '../../graphql/queries';
import useStateWithStorage from '../../hooks/useStateWithStorage';

jest.mock('../../hooks/useStateWithStorage', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: GET_ACTIVE_ORDER,
    },
    result: {
      data: {
        activeOrder: {
          id: '1',
          total: 100,
        },
      },
    },
  },
];

describe('Header component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display the logo', async () => {
    (useStateWithStorage as jest.Mock).mockReturnValue([0, jest.fn()]);

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <OrderProvider>
          <Header />
        </OrderProvider>
      </MockedProvider>
    );

    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/santex-logo-dark.svg');
  });

  it('should display "There\'s no product selected." when there is no order', async () => {
    (useStateWithStorage as jest.Mock).mockReturnValue([0, jest.fn()]);

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <OrderProvider>
          <Header />
        </OrderProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("There's no product selected.")
      ).toBeInTheDocument();
    });
  });

  it('should display the order total when there is an order', async () => {
    (useStateWithStorage as jest.Mock).mockReturnValue([100, jest.fn()]);

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <OrderProvider>
          <Header />
        </OrderProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Order total: $100')).toBeInTheDocument();
    });
  });

  it('should update the subtotal when the order changes', async () => {
    const setSubtotalMock = jest.fn();
    (useStateWithStorage as jest.Mock).mockReturnValue([0, setSubtotalMock]);

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <OrderProvider>
          <Header />
        </OrderProvider>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(setSubtotalMock).toHaveBeenCalledWith(100);
    });
  });
});
