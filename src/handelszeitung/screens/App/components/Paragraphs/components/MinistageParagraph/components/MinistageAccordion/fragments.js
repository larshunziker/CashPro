import { gql } from '@apollo/client';

export const ministageAccordionFragment = gql`
  fragment MinistageAccordionFragment on MinistageAccordion {
    title
    sections {
      title
      body {
        ... on TextParagraph {
          id
          anchorId
          header
          text
          characterCount
          isLastOfGroup
          styleValue
        }
      }
    }
  }
`;
