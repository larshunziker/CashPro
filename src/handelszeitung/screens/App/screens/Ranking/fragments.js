/**
 * @file   ranking screen fragments
 * @author Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date   2019-09-24
 *
 */

import { gql } from '@apollo/client';
import { infoBoxParagraphFragment } from 'Paragraphs/components/InfoBoxParagraph/fragments';
import { ministageParagraphFragment } from 'Paragraphs/components/MinistageParagraph/fragments';

export const rankingFragment = gql`
  fragment RankingFragment on Ranking {
    id
    createDate
    changeDate: changedDate
    title
    year
    lead
    publication
    rankingType
    shortTitle
    preferredUri
    metaTitle
    metaDescription
    metaCanonicalUrl
    restrictionStatus
    activeMenuTrail {
      count
      edges {
        node {
          label
          link
        }
      }
    }
    body {
      ...MinistageParagraphFragment
      ...InfoBoxParagraphFragment
    }
    rankings {
      count
      edges {
        node {
          ... on Rankings {
            rankingIndustry
            rankingState
            rankingPosition
            rankingValue
            rankingTrend
            ranking {
              id
              title
              year
              rankingType
              preferredUri
            }
            person {
              id
              body
              createDate
              changeDate: changedDate
              description
              isWoman
              name
              personType
              preferredUri
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
      }
    }
    teaserImage {
      id
      image {
        id
        file {
          id
          relativeOriginPath
          focalPointX
          focalPointY
          alt
        }
      }
    }
  }

  ${infoBoxParagraphFragment}
  ${ministageParagraphFragment}
`;
