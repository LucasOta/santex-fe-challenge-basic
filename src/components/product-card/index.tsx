import { useMutation, useQuery } from '@apollo/client';
import { FC } from 'react';
import styled from 'styled-components';
import {
  AddItemToOrderMutation,
  Exact,
  GetAllProductsQuery,
  Order,
} from '../../generated/graphql';
import { ADD_ITEM_TO_ORDER } from '../../graphql/mutations';
import { GET_ACTIVE_ORDER } from '../../graphql/queries';
import ProductCardFooter from './footer';
import ProductImage from './product-image';

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
  const { refetch } = useQuery(GET_ACTIVE_ORDER);
  const [addItemToOrder, { loading, error }] =
    useMutation<AddItemToOrderMutation>(ADD_ITEM_TO_ORDER, {
      update(cache, { data }) {
        if (!data) return;

        const { addItemToOrder } = data;

        const existingData = cache.readQuery<{ activeOrder: Order } | null>({
          query: GET_ACTIVE_ORDER,
        });

        if (!existingData) return;

        cache.writeQuery({
          query: GET_ACTIVE_ORDER,
          data: {
            activeOrder: {
              ...existingData.activeOrder,
              ...addItemToOrder,
            },
          },
        });
      },
    });

  const handlePurchase = async () => {
    await addItemToOrder({ variables: { id: product.id, quantity: 1 } });
    refetch();
  };

  return (
    <StyledProductCard>
      <ProductImage src={product?.featuredAsset?.preview} />
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
