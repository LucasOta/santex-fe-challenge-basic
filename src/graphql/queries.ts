import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products(options: { take: 10 }) {
      items {
        id
        name
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

export const GET_ACTIVE_ORDER = gql`
  query GetActiveOrder {
    activeOrder {
      id
      total
    }
  }
`;
