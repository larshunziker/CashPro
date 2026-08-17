import { gql } from '@apollo/client';

export const GET_WIKIFOLIO = gql`
  query GetWikifolio($rankingType: RankingTypeEnum!, $limit: Float)
  @api(name: "graphql-service") {
    integration {
      wikifolio {
        portfolios(rankingType: $rankingType, limit: $limit) {
          shortDescription
          fullquoteUri
          rankings {
            name
            value
          }
        }
      }
    }
  }
`;
