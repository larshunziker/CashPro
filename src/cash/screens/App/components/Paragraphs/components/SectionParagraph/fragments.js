import { gql } from '@apollo/client';
import { contentParagraphFragment } from '../ContentParagraph/fragments';
import { embedParagraphFragment } from '../EmbedParagraph/fragments';
import { imageParagraphFragment } from '../ImageParagraph/fragments';
import { infoBoxParagraphFragment } from '../InfoBoxParagraph/fragments';
import { inputFormParagraphFragment } from '../InputFormParagraph/fragments';
import { listicleItemParagraphFragment } from '../ListicleItemParagraph/fragments';
import { ministageParagraphFragment } from '../MinistageParagraph/fragments';
import { multiColumnParagraphFragment } from '../MultiColumnParagraph/fragments';
import { parallaxImageParagraphFragment } from '../ParallaxImageParagraph/fragments';
import { pianoTemplateParagraphFragment } from '../PianoTemplateParagraph/fragments';
import { teaserStageParagraphFragment } from '../TeaserStageParagraph/fragments';
import { textParagraphFragment } from '../TextParagraph/fragments';
import { videoParagraphFragment } from '../VideoParagraph/fragments';
import { widgetParagraphFragment } from '../WidgetParagraph/fragments';

// TODO: there are more paragraphs that can be enabled for the sectionParagraph in the cms, but these paragraphs do not exist yet. We'll have to add the fragments later (as needed)

export const sectionParagraphFragment = gql`
  fragment SectionParagraphFragment on SectionParagraph {
    anchorId
    id
    title
    link {
      path
    }
    body {
      id
      ...MultiColumnParagraphFragment
      ...ContentParagraphFragment
      ...EmbedParagraphFragment
      ...TextParagraphFragment
      ...WidgetParagraphFragment
      ...ImageParagraphFragment
      ...MinistageParagraphFragment
      ...TeaserStageParagraphFragment
      ...InputFormParagraphFragment
      ...PianoTemplateParagraphFragment
      ...VideoParagraphFragment
      ...ListicleItemParagraphFragment
      ...InfoBoxParagraphFragment
      ...ParallaxImageParagraphFragment
    }
  }
  ${multiColumnParagraphFragment}
  ${contentParagraphFragment}
  ${embedParagraphFragment}
  ${widgetParagraphFragment}
  ${textParagraphFragment}
  ${imageParagraphFragment}
  ${ministageParagraphFragment}
  ${teaserStageParagraphFragment}
  ${inputFormParagraphFragment}
  ${pianoTemplateParagraphFragment}
  ${videoParagraphFragment}
  ${listicleItemParagraphFragment}
  ${infoBoxParagraphFragment}
  ${parallaxImageParagraphFragment}
`;
