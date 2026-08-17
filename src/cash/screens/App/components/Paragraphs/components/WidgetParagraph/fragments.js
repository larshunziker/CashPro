import { gql } from '@apollo/client';

export const widgetParagraphFragment = gql`
  fragment WidgetParagraphFragment on WidgetParagraph {
    id
    title
    link {
      path
    }
    timePeriodValues
    subtypeValue
    valors {
      items {
        id
        fullquoteUrl
        shortName
        valorName
        valorNumber
        valorStockExchange {
          id
          originalId
        }
        valorCurrency {
          id
          originalId
        }
      }
    }
    widget {
      id
      title
      sponsor {
        teaserImage {
          image {
            file {
              relativeOriginPath
            }
          }
        }
      }
      url {
        label
        path
        routed
      }
      timePeriodValues
      subtypeValue
      valors {
        items {
          id
          fullquoteUrl
          shortName
          valorName
          valorNumber
          valorStockExchange {
            id
            originalId
          }
          valorCurrency {
            id
            originalId
          }
        }
      }
    }
  }
`;
