import { gql } from '@apollo/client';

export const widgetParagraphFragment = gql`
  fragment WidgetParagraphFragment on WidgetParagraph {
    id
    title
    timePeriodValues
    subtypeValue
    link {
      path
    }
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
      timePeriodValues
      subtypeValue
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
