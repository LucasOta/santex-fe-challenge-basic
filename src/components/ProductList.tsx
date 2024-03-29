import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../graphql/queries';

export function ProductList() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data.products.items.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.variants[0].price / 100}
          </li>
        ))}
      </ul>
    </div>
  );
}
