import { gql } from '@apollo/client';

export const heroMediaParagraphFragment = gql`
  fragment HeroMediaParagraphFragment on HeroMediaParagraph {
    id
    title
    shortTitle
    subTitle
    lead
    background
    body {
      ... on ImageParagraph {
        id
        anchorId
        suppressSource
        image {
          id
          credit
          file(style: "large", calculateDimensions: true) {
            id
            alt
            relativeOriginPath
            focalPointX
            focalPointY
            width
            height
            origin
          }
        }
      }
    }
    content {
      ... on EmbedParagraph {
        id
        anchorId
        header
        embedCode
        autoAdjustHeight
      }
      ... on PianoTemplateParagraph {
        publication
        offerId
        templateId
        templateVariantId
        id
        anchorId
      }
      ... on InputFormParagraph {
        id
        anchorId
        form
        webform
      }
      ... on TextParagraph {
        id
        anchorId
        header
        text
      }
    }
  }
`;
