import { FC } from 'react';
import styled from 'styled-components';
import { Exact, GetAllProductsQuery } from '../generated/graphql';

type ProductItem = Exact<GetAllProductsQuery>['products']['items'][number];

interface ProductCardProps {
  product: ProductItem;
}

const StyledProductCard = styled.div`
  border: 1px solid ${(props) => props.theme.colors.fg};
  border-radius: 5px;
  padding: 10px;
  text-align: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: 10rem;
  border-radius: 5px;
`;

const ProductCard: FC<ProductCardProps> = ({ product }) => (
  <StyledProductCard key={product.id}>
    <StyledImage src={product?.featuredAsset?.preview} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p>${product.variants[0].price}</p>
  </StyledProductCard>
);

export default ProductCard;
