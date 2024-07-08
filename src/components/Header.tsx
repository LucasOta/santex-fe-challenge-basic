import { useEffect } from 'react';
import styled from 'styled-components';
import { useOrder } from '../contexts/OrderContext';
import useStateWithStorage from '../hooks/useStateWithStorage';

const StyledHeader = styled.div`
  padding: 16px;
`;
const LogoImage = styled.img`
  width: 100px;
  height: auto;
`;

export function Header() {
  const { order } = useOrder();
  const [subtotal, setSubtotal] = useStateWithStorage('subtotal', 0);

  useEffect(() => {
    if (order) {
      setSubtotal(order.total);
    }
  }, [order, setSubtotal]);

  return (
    <StyledHeader>
      <header>
        <LogoImage src={`/santex-logo-dark.svg`} alt="logo" />
        {order ? (
          <p>Order total: ${subtotal}</p>
        ) : (
          <p>There's no product selected.</p>
        )}
      </header>
    </StyledHeader>
  );
}
