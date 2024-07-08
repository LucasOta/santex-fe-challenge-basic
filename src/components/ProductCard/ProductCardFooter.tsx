import styled from 'styled-components';
import BuyButton from './BuyButton';
import ProductInfo from './ProductInfo';

const StyledProductDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

interface ProductDescriptionProps {
  name: string;
  price: number;
  onClick: () => void;
  loading: boolean;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  name,
  price,
  onClick,
  loading,
}) => (
  <StyledProductDescription>
    <ProductInfo name={name} price={price} />
    <BuyButton onClick={onClick} loading={loading}>
      {!loading ? 'Buy' : 'Adding to cart...'}
    </BuyButton>
  </StyledProductDescription>
);

export default ProductDescription;
