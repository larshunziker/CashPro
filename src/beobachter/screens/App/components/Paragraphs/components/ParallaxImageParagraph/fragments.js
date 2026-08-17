/**
 *
 */

import { gql } from '@apollo/client';

export default gql`
  fragment ParallaxImageParagraphFragment on ParallaxImageParagraph {
    id
    suppressSource
    image {
      id
      credit
      file(style: "large") {
        id
        alt
        relativeOriginPath
        focalPointX
        focalPointY
      }
    }
  }
`;
