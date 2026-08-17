import { gql } from '@apollo/client';

export const GET_SPONSORS = gql`
  query RouteByPathBrandReport @api(name: cms) {
    environment(publication: BEO) {
      routeByPath(path: "brandreport") {
        preferred
        canonical
        object {
          ... on LandingPage {
            id
            nid
            title
            lead
            changeDate: changedDate
            createDate
            shortTitle
            metaTitle
            metaCanonicalUrl
            metaDescription
            activeMenuTrail {
              count
              edges {
                node {
                  label
                  link
                }
              }
            }
            teaserImage {
              id
              caption
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

      sponsors {
        edges {
          node {
            ... on Sponsor {
              id
              title
              description
              preferredUri
              teaserImage {
                id
                title
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
    }
  }
`;
