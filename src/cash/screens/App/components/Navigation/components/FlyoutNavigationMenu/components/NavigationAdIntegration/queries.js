import { gql } from '@apollo/client';
import { embedParagraphFragment } from '../../../../../Paragraphs/components/EmbedParagraph/fragments';
import { imageParagraphFragment } from '../../../../../Paragraphs/components/ImageParagraph/fragments';
import { pianoTemplateParagraphFragment } from '../../../../../Paragraphs/components/PianoTemplateParagraph/fragments';
import { textParagraphFragment } from '../../../../../Paragraphs/components/TextParagraph/fragments';
import { widgetParagraphFragment } from '../../../../../Paragraphs/components/WidgetParagraph/fragments';

export const NAVIGATION_MENU_ROUTE = gql`
  query NavigationMenuRouteByPathIntegration(
    $publication: PublicationEnum
    $path: String!
  ) @api(name: cms) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ... on LandingPage {
            id
            body {
              ...EmbedParagraphFragment
              ...WidgetParagraphFragment
              ...TextParagraphFragment
              ...ImageParagraphFragment
              ...PianoTemplateParagraphFragment
              ... on MultiColumnParagraph {
                anchorId
                id
                style
                body {
                  ...ImageParagraphFragment
                  ...EmbedParagraphFragment
                  ...WidgetParagraphFragment
                  ...TextParagraphFragment
                  ...PianoTemplateParagraphFragment
                }
              }
            }
          }
        }
      }
    }
  }
  ${embedParagraphFragment}
  ${widgetParagraphFragment}
  ${imageParagraphFragment}
  ${textParagraphFragment}
  ${pianoTemplateParagraphFragment}
`;
