import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const GET_QUOTELIST_PAGE = gql`
  query getQuoteListPage(
    $quoteListSubtype: String!
    $quoteListSubPage: String!
    $publication: PublicationEnum
  ) @api(name: cms) {
    environment(publication: $publication) {
      quoteListSubPage: routeByPath(path: $quoteListSubPage) {
        id
        canonical
        preferred
        statusCode
        object {
          ... on LandingPage {
            id
            nid
            gcid
            title
            preferredUri
            seoTitle
            metaTitle
            metaOgTitle
            metaDescription
            metaOgDescription
            canonicalUri
            editContentUri
            editRelationUri
            cloneContentUri
            shortTitle
            subtypeValue
            channel {
              id
              title
              suppressAds
            }
            publication
            restrictionStatus
            sponsor {
              id
              title
            }
            body(processors: [TextSplit]) {
              ...ParagraphsFragment
            }
          }
        }
      }
      routeByPath(path: $quoteListSubtype) {
        id
        canonical
        preferred
        statusCode
        object {
          ... on LandingPage {
            id
            nid
            title
            preferredUri
            seoTitle
            metaTitle
            metaOgTitle
            metaDescription
            metaOgDescription
            canonicalUri
            editContentUri
            editRelationUri
            cloneContentUri
            shortTitle
            subtypeValue
            channel {
              id
              title
              suppressAds
            }
            publication
            restrictionStatus
            sponsor {
              id
              title
            }
            body(processors: [TextSplit]) {
              ...ParagraphsFragment
            }
          }
        }
      }
    }
  }

  ${paragraphsFragment}
`;
