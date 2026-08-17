/**
 * @file    Video Paragraph Fragments
 * @author Pascal Tan <pascal.tan@ringieraxelspringer.ch>
 * @date    2019-05-13
 *
 */

import { gql } from '@apollo/client';

export const videoParagraphFragment = gql`
  fragment VideoParagraphFragment on VideoParagraph {
    anchorId
    id
    title
    shortTitle
    brightcoveId
    suppressSource
    caption
    credit
    duration
    image {
      id
      file(style: "large") {
        id
        alt
        relativeOriginPath
        focalPointX
        focalPointY
      }
      credit
    }
    video {
      id
      brightcoveId
      publicationDate
      preferredUri
      changeDate
      caption
      shortTitle
      title
      credit
      duration
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
`;
