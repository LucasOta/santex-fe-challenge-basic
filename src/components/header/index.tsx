import { useEffect } from 'react';
import styled from 'styled-components';
import { useOrder } from '../../contexts/order-context';
import useStateWithStorage from '../../hooks/useStateWithStorage';
import formatAsCurrency from '../../utils/formatAsCurrency';

const StyledHeader = styled.div`
  padding: 16px;
`;
const LogoImage = styled.img`
  width: 100px;
  height: auto;
`;

const Header = () => {
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
          <p>Order total: {formatAsCurrency(subtotal / 100)}</p>
        ) : (
          <p>There's no product selected.</p>
        )}
      </header>
    </StyledHeader>
  );
};

export default Header;
