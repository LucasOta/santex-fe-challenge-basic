import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products(options: { take: 10 }) {
      items {
        id
        name
        description
        featuredAsset {
          preview
        }
        variants {
          price
        }
      }
    }
  }
`;
