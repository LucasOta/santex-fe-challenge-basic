import styled from 'styled-components';

const StyledProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.black};
  padding: 0.25rem;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 9999px;
`;

const StyledName = styled.span`
  padding-left: 0.5rem;
  margin: 0;
  margin-right: 1rem;
`;

const StyledPrice = styled.span`
  border-radius: 9999px;
  padding: 0.5rem;
  background: linear-gradient(
    45deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.secondary}
  );
`;

interface ProductInfoProps {
  name: string;
  price: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ name, price }) => (
  <StyledProductInfo>
    <StyledName>{name}</StyledName>
    <StyledPrice>${(price / 100).toFixed(2)} USD</StyledPrice>
  </StyledProductInfo>
);

export default ProductInfo;
