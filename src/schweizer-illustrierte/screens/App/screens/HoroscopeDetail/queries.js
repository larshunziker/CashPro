import { gql } from '@apollo/client';
import { articleFragment } from 'Article/fragments';

export const GET_DAILY_HOROSCOPE = gql`
  query DailyHoroscope(
    $publication: PublicationEnum
    $path: String!
    $id: Int!
    $entityQueueLimit: Int!
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ...ArticleFragment
        }
      }
    }
    dailyHoroscope(id: $id)
  }
  ${articleFragment}
`;

export const GET_YEARLY_HOROSCOPE = gql`
  query YearlyHoroscope(
    $publication: PublicationEnum
    $path: String!
    $entityQueueLimit: Int!
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ...ArticleFragment
        }
      }
    }
  }
  ${articleFragment}
`;
