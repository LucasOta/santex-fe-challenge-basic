import { MockedProvider } from '@apollo/client/testing';
import { act, renderHook } from '@testing-library/react-hooks';
import { GET_ACTIVE_ORDER } from '../graphql/queries';
import { OrderProvider, useOrder } from './order-context';

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

describe('OrderContext', () => {
  it('should provide the initial order value as null', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[]} addTypename={false}>
        <OrderProvider>{children}</OrderProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useOrder(), {
      wrapper,
    });

    expect(result.current.order).toBeNull();

    await waitForNextUpdate();
  });

  it('should provide the order data after fetching', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <OrderProvider>{children}</OrderProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useOrder(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.order).toEqual({
      id: '1',
      total: 100,
    });
  });

  it('should call refetchOrder and update the order', async () => {
    const refetchMocks = [
      ...mocks,
      {
        request: {
          query: GET_ACTIVE_ORDER,
        },
        result: {
          data: {
            activeOrder: {
              id: '2',
              total: 200,
            },
          },
        },
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={refetchMocks} addTypename={false}>
        <OrderProvider>{children}</OrderProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useOrder(), {
      wrapper,
    });

    await waitForNextUpdate();

    act(() => {
      result.current.refetchOrder();
    });

    await waitForNextUpdate();

    expect(result.current.order).toEqual({
      id: '2',
      total: 200,
    });
  });
});
