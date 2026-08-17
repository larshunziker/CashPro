/**
 * @file   videos graphql fragments
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-04-30 13:45:43
 *
 */

import { gql } from '@apollo/client';

export const videosOverviewTeaserFragment = gql`
  fragment VideosOverviewTeaserFragment on Video {
    id
    gcid
    title
    preferredUri
    shortTitle
    changeDate
    metaDescription
    metaKeywords
    metaTitle
    metaCanonicalUrl
    caption
    publicationDate
    brightcoveId
    credit
    hasVideo
    teaserImage {
      id
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
`;
