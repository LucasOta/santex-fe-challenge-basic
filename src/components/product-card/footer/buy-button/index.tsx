import { FC } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: linear-gradient(
    45deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.secondary}
  );

  color: ${(props) => props.theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: -4px 0 9px 0px ${(props) => props.theme.colors.primary},
      4px 0 9px 0px ${(props) => props.theme.colors.secondary};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.gray};
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

interface BuyButtonProps {
  onClick: () => void;
  loading: boolean;
}

const BuyButton: FC<BuyButtonProps> = ({ onClick, loading, children }) => (
  <StyledButton onClick={onClick} disabled={loading}>
    {children}
  </StyledButton>
);

export default BuyButton;
