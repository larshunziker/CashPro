import { gql } from '@apollo/client';
// @ts-expect-error import error
import { paragraphsFragment } from '../../components/Paragraphs/fragments';

export const GET_BNP_FULLQUOTE_PAGE = gql`
  query getBNPFullquoteRouteByPath($path: String!) @api(name: cms) {
    environment(publication: CASH) {
      routeByPath(path: $path) {
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
