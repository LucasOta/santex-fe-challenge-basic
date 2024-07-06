import styled from 'styled-components';
import { useOrder } from '../contexts/OrderContext';

const StyledHeader = styled.div`
  background-color: ${(props) => props.theme.colors.danger};
`;

export function Header() {
  const { order } = useOrder();

  return (
    <StyledHeader>
      <header>
        <img
          src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
          alt="logo"
        />
        {order ? (
          <p>Order total: ${order.total}</p>
        ) : (
          <p>There's no product selected.</p>
        )}
      </header>
    </StyledHeader>
  );
}
