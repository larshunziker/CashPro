import { gql } from '@apollo/client';

export const heroMediaParagraphFragment = gql`
  fragment HeroMediaParagraphFragment on HeroMediaParagraph {
    id
    title
    shortTitle
    subTitle
    lead
    background
    anchorId
    body {
      ... on ImageParagraph {
        id
        anchorId
        format
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
