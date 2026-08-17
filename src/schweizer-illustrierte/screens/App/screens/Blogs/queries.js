import { gql } from '@apollo/client';

export const GET_BLOGS_PAGE = gql`
  query BlogsRouteByPath(
    $publication: PublicationEnum
    $path: String!
    $vid: String
    $channelType: [ChannelTypeEnum]
    $overviewPageVisibility: [OverviewPageVisibilityEnum]
    $overviewPageSize: Int!
    $overviewPageOffset: Int!
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ... on LandingPage {
            id
            nid
            gcid
            title
            metaTitle
            metaDescription
            metaOgTitle
            metaOgDescription
            metaCanonicalUrl
            lead
            preferredUri
            activeMenuTrail {
              edges {
                node {
                  id
                  label
                  link
                }
              }
            }
            channel {
              id
              title
            }
            createDate
            metaKeywords
            teaserImage {
              id
              image {
                id
                file(style: "16x9_560") {
                  id
                  relativeOriginPath
                  focalPointX
                  focalPointY
                }
              }
            }
          }
        }
      }
      termsByVocabulary(
        vid: $vid
        channelType: $channelType
        overviewPageVisibility: $overviewPageVisibility
        limit: $overviewPageSize
        offset: $overviewPageOffset
      ) {
        count
        edges {
          node {
            id
            title
            preferredUri
            showOnBlogsOverview
            landingPage {
              id
              title
              lead
              preferredUri
            }
            settings {
              lead
            }
            authors(limit: 1) {
              edges {
                node {
                  id
                  name
                  imageParagraph {
                    id
                    image {
                      id
                      file(style: "large") {
                        id
                        alt
                        relativeOriginPath
                        focalPointX
                        focalPointY
                      }
                    }
                  }
                }
              }
            }
            entities(limit: 3) {
              items {
                ... on Article {
                  id
                  nid
                  title
                  preferredUri
                  shortTitle
                  hasVideo
                  teaserImage {
                    id
                    image {
                      id
                      file(style: "large") {
                        id
                        alt
                        relativeOriginPath
                        focalPointX
                        focalPointY
                      }
                    }
                  }
                  authors(limit: 1) {
                    edges {
                      node {
                        id
                        name
                        imageParagraph {
                          id
                          image {
                            id
                            file(style: "large") {
                              id
                              alt
                              relativeOriginPath
                              focalPointX
                              focalPointY
                            }
                          }
                        }
                      }
                    }
                  }
                  channel {
                    id
                    title
                    authors(limit: 1) {
                      edges {
                        node {
                          id
                          name
                          imageParagraph {
                            id
                            image {
                              id
                              file(style: "large") {
                                id
                                alt
                                relativeOriginPath
                                focalPointX
                                focalPointY
                              }
                            }
                          }
                        }
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
`;
