/**
 * @file   queries videos
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-02-11
 *
 */
import { gql } from '@apollo/client';
import { videosOverviewTeaserFragment } from './fragments';

export const GET_VIDEO_PAGE = gql`
  query VideosPage(
    $publication: PublicationEnum
    $path: String!
    $vid: String
    $query: String!
    $limit: Int
    $offset: Int
    $videoStageLimit: Int
    $videoStageOffset: Int
    $sort: SearchOrderByField
    $contentTypes: [ContentTypeEnum]
    $channelType: [ChannelTypeEnum]
    $overviewPageVisibility: [OverviewPageVisibilityEnum]
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
            teaserImage {
              id
              image {
                id
                file(style: "16x9_1130") {
                  id
                  relativeOriginPath
                  focalPointX
                  focalPointY
                }
              }
            }
            channel {
              id
              title
            }
            changeDate: changedDate
            createDate
            publicationDate
            metaKeywords
          }
        }
      }
      termsByVocabulary(
        vid: $vid
        channelType: $channelType
        overviewPageVisibility: $overviewPageVisibility
      ) {
        count
        edges {
          node {
            id
            title
            preferredUri
            showOnVideoOverview
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
            entities(limit: 3, filter: $contentTypes) {
              items {
                ...VideosOverviewTeaserFragment
              }
            }
          }
        }
      }
      videoStageSearch: globalSearch(
        search: $query
        limit: $videoStageLimit
        offset: $videoStageOffset
        sort: $sort
        content_types: $contentTypes
      ) {
        count
        edges {
          node {
            ...VideosOverviewTeaserFragment
          }
        }
      }
      globalSearch(
        search: $query
        limit: $limit
        offset: $offset
        sort: $sort
        content_types: $contentTypes
      ) {
        count
        edges {
          node {
            ...VideosOverviewTeaserFragment
          }
        }
      }
    }
  }
  ${videosOverviewTeaserFragment}
`;
