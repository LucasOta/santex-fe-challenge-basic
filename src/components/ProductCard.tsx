import { useMutation } from '@apollo/client';
import { FC } from 'react';
import styled from 'styled-components';
import {
  AddItemToOrderMutation,
  Exact,
  GetAllProductsQuery,
} from '../generated/graphql';
import { ADD_ITEM_TO_ORDER } from '../graphql/mutations';

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

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [addItemToOrder, { loading, error }] =
    useMutation<AddItemToOrderMutation>(ADD_ITEM_TO_ORDER);

  const handlePurchase = () => {
    addItemToOrder({ variables: { id: product.id, quantity: 1 } });
  };

  return (
    <StyledProductCard>
      <StyledImage src={product?.featuredAsset?.preview} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.variants[0].price}</p>
      <button onClick={handlePurchase} disabled={loading}>
        {!loading ? 'Buy' : 'Adding to cart...'}
      </button>
      {error && <p>Error: {error}</p>}
    </StyledProductCard>
  );
};

export default ProductCard;
