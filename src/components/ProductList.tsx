import { useQuery } from '@apollo/client';
import { GetAllProductsQuery } from '../generated/graphql';
import { GET_ALL_PRODUCTS } from '../graphql/queries';

export function ProductList() {
  const { loading, error, data } =
    useQuery<GetAllProductsQuery>(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="products-grid">
      {data?.products.items.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product?.featuredAsset?.preview} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.variants[0].price / 100}</p>
        </div>
      ))}
    </div>
  );
}
