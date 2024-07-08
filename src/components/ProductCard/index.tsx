import { useMutation } from '@apollo/client';
import { FC } from 'react';
import styled from 'styled-components';

import {
  AddItemToOrderMutation,
  Exact,
  GetAllProductsQuery,
} from '../../generated/graphql';
import { ADD_ITEM_TO_ORDER } from '../../graphql/mutations';
import ProductCardFooter from './ProductCardFooter';
import ProductImage from './ProductImage';

type ProductItem = Exact<GetAllProductsQuery>['products']['items'][number];

interface ProductCardProps {
  product: ProductItem;
}

const StyledProductCard = styled.div`
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 5px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  transition: border-color 0.3s;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [addItemToOrder, { loading, error }] =
    useMutation<AddItemToOrderMutation>(ADD_ITEM_TO_ORDER);

  const handlePurchase = () => {
    addItemToOrder({ variables: { id: product.id, quantity: 1 } });
  };

  return (
    <StyledProductCard>
      <ProductImage src={product?.featuredAsset?.preview} alt={product.name} />
      <ProductCardFooter
        name={product.name}
        price={product.variants[0].price}
        onClick={handlePurchase}
        loading={loading}
      />
      {error && <p>Error: {error.message}</p>}
    </StyledProductCard>
  );
};

export default ProductCard;
