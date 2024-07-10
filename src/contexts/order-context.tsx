import { useQuery } from '@apollo/client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { GET_ACTIVE_ORDER } from '../graphql/queries';

interface OrderContextProps {
  order: {
    id: string;
    total: number;
  } | null;
  refetchOrder: () => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { data, refetch } = useQuery(GET_ACTIVE_ORDER);
  const [order, setOrder] = useState<OrderContextProps['order']>(null);

  useEffect(() => {
    if (data && data.activeOrder) {
      setOrder(data.activeOrder);
    }
  }, [data]);

  const refetchOrder = () => {
    refetch();
  };

  return (
    <OrderContext.Provider value={{ order, refetchOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
