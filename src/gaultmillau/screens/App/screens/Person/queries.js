import { gql } from '@apollo/client';

export const GET_PERSON_QUERY = gql`
  query Persons(
    $path: String!
    $publication: PublicationEnum
    $overviewGridLimit: Int!
    $overviewGridOffset: Int!
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        preferred
        object {
          ... on LandingPage {
            id
            nid
            title
            lead
            shortTitle
            editRelationUri
            cloneContentUri
            editContentUri
            metaTitle
            seoTitle
            metaCanonicalUrl
            metaDescription
            grid(
              publication: $publication
              filter: ["Article", "Recipe"]
              limit: $overviewGridLimit
              offset: $overviewGridOffset
            ) {
              count
              edges {
                node {
                  ... on Article {
                    id
                    title
                    lead
                    shortTitle
                    publicationDate
                    preferredUri
                    subtypeValue: articleType
                    channel {
                      id
                      title
                    }
                    sponsor {
                      id
                    }
                    hasVideo
                    teaserImage {
                      id
                      caption
                      image {
                        id
                        file(style: "16x9_560") {
                          id
                          alt
                          relativeOriginPath
                          focalPointX
                          focalPointY
                        }
                      }
                    }
                    useAutoHyphens
                  }

                  ... on Recipe {
                    id
                    title
                    lead
                    shortTitle
                    createDate
                    preferredUri
                    recipeType
                    hasVideo
                    teaserImage {
                      id
                      caption
                      image {
                        id
                        file(style: "16x9_560") {
                          id
                          alt
                          relativeOriginPath
                          focalPointX
                          focalPointY
                        }
                      }
                    }
                    useAutoHyphens
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
