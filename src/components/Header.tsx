import styled from 'styled-components';
import { useOrder } from '../contexts/OrderContext';

const StyledHeader = styled.div`
  padding: 16px;
`;
const LogoImage = styled.img`
  width: 100px;
  height: auto;
`;

export function Header() {
  const { order } = useOrder();

  return (
    <StyledHeader>
      <header>
        <LogoImage src={`/santex-logo-dark.svg`} alt="logo" />
        {order ? (
          <p>Order total: ${order.total}</p>
        ) : (
          <p>There's no product selected.</p>
        )}
      </header>
    </StyledHeader>
  );
}
