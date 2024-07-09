import { FC } from 'react';
import styled from 'styled-components';
import BuyButton from './buy-button';
import ProductInfo from './product-info';

const StyledProductCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

interface ProductCardFooterProps {
  name: string;
  price: number;
  onClick: () => void;
  loading: boolean;
}

const ProductCardFooter: FC<ProductCardFooterProps> = ({
  name,
  price,
  onClick,
  loading,
}) => (
  <StyledProductCardFooter>
    <ProductInfo name={name} price={price} />
    <BuyButton onClick={onClick} loading={loading}>
      {!loading ? 'Buy' : 'Adding to cart...'}
    </BuyButton>
  </StyledProductCardFooter>
);

export default ProductCardFooter;
