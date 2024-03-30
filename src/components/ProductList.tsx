import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { GetAllProductsQuery } from '../generated/graphql';
import { GET_ALL_PRODUCTS } from '../graphql/queries';
import ProductCard from './ProductCard';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export function ProductList() {
  const { loading, error, data } =
    useQuery<GetAllProductsQuery>(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid>
      {data?.products.items.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Grid>
  );
}
