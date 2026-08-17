import { gql } from '@apollo/client';

export const ministageDisruptorFragment = gql`
  fragment MinistageDisruptorFragment on MinistageDisruptor {
    link {
      label
      path
      routed
    }
    image {
      source
    }
    imageHover {
      source
    }
  }
`;
