import { gql } from '@apollo/client';

export const horoscopeStageParagraphFragment = gql`
  fragment HoroscopeStageParagraphFragment on MinistageHoroscopes {
    name
    shortTitle
  }
`;
