import { gql } from '@apollo/client';
import { contentParagraphFragment } from '../ContentParagraph/fragments';
import { embedParagraphFragment } from '../EmbedParagraph/fragments';
import { imageParagraphFragment } from '../ImageParagraph/fragments';
import { pianoTemplateParagraphFragment } from '../PianoTemplateParagraph/fragments';
import { sectionInMulticolumnParagraphFragment } from '../SectionParagraph/fragments2';
import { teaserParagraphFragment } from '../TeaserParagraph/fragments';
import { textParagraphFragment } from '../TextParagraph/fragments';
import { widgetParagraphFragment } from '../WidgetParagraph/fragments';

export const multiColumnParagraphFragment = gql`
  fragment MultiColumnParagraphFragment on MultiColumnParagraph {
    anchorId
    id
    style
    body {
      ...ImageParagraphFragment
      ...EmbedParagraphFragment
      ...WidgetParagraphFragment
      ...ContentParagraphFragment
      ...TextParagraphFragment
      ...TeaserParagraphFragment
      ...PianoTemplateParagraphFragment
      ...SectionInMulticolumnParagraphFragment
    }
  }

  ${imageParagraphFragment}
  ${embedParagraphFragment}
  ${widgetParagraphFragment}
  ${contentParagraphFragment}
  ${textParagraphFragment}
  ${teaserParagraphFragment}
  ${pianoTemplateParagraphFragment}
  ${sectionInMulticolumnParagraphFragment}
`;
