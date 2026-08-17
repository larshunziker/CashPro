import { gql } from '@apollo/client';
import { ministageSearchFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageSearch/fragments';
import { ministageGuiderFragment } from 'Paragraphs/components/MinistageParagraph/components/MinistageRechtsratgeber/fragments';
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
        form
        webform
        anchorId
      }
      ... on TextParagraph {
        id
        anchorId
        header
        text
      }
      ... on MinistageParagraph {
        id
        anchorId
        ministage {
          ...MinistageSearchFragment
          ...MinistageGuiderFragment
        }
      }
    }
  }
  ${ministageSearchFragment}
  ${ministageGuiderFragment}
`;
