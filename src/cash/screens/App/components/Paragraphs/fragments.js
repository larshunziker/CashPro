import { gql } from '@apollo/client';
import { advantagesParagraphFragment } from './components/AdvantagesParagraph/fragments';
import { blockquoteParagraphFragment } from './components/BlockquoteParagraph/fragments';
import { embedParagraphFragment } from './components/EmbedParagraph/fragments';
import { entityQueueParagraphFragment } from './components/EntityQueueParagraph/fragments';
import { heroMediaParagraphFragment } from './components/HeroMediaParagraph/fragments';
import { imageParagraphFragment } from './components/ImageParagraph/fragments';
import { infoBoxParagraphFragment } from './components/InfoBoxParagraph/fragments';
import { inputFormParagraphFragment } from './components/InputFormParagraph/fragments';
import { linkBoxParagraphFragment } from './components/LinkBoxParagraph/fragments';
import { listicleItemParagraphFragment } from './components/ListicleItemParagraph/fragments';
import { ministageParagraphFragment } from './components/MinistageParagraph/fragments';
import { multiColumnParagraphFragment } from './components/MultiColumnParagraph/fragments';
import { parallaxImageParagraphFragment } from './components/ParallaxImageParagraph/fragments';
import { pianoTemplateParagraphFragment } from './components/PianoTemplateParagraph/fragments';
import { sectionParagraphFragment } from './components/SectionParagraph/fragments';
import { teaserStageParagraphFragment } from './components/TeaserStageParagraph/fragments';
import { textParagraphFragment } from './components/TextParagraph/fragments';
import { videoParagraphFragment } from './components/VideoParagraph/fragments';
import { widgetParagraphFragment } from './components/WidgetParagraph/fragments';

export const paragraphsFragment = gql`
  fragment ParagraphsFragment on ParagraphInterface {
    id
    ...AdvantagesParagraphFragment
    ...BlockquoteParagraphFragment
    ...EmbedParagraphFragment
    ...EntityQueueParagraphFragment
    ...HeroMediaParagraphFragment
    ...ImageParagraphFragment
    ...InfoBoxParagraphFragment
    ...InputFormParagraphFragment
    ...ListicleItemParagraphFragment
    ...MinistageParagraphFragment
    ...MultiColumnParagraphFragment
    ...ParallaxImageParagraphFragment
    ...PianoTemplateParagraphFragment
    ...SectionParagraphFragment
    ...TeaserStageParagraphFragment
    ...TextParagraphFragment
    ...VideoParagraphFragment
    ...WidgetParagraphFragment
    ...LinkBoxParagraphFragment
  }
  ${advantagesParagraphFragment}
  ${blockquoteParagraphFragment}
  ${embedParagraphFragment}
  ${entityQueueParagraphFragment}
  ${heroMediaParagraphFragment}
  ${imageParagraphFragment}
  ${infoBoxParagraphFragment}
  ${inputFormParagraphFragment}
  ${listicleItemParagraphFragment}
  ${ministageParagraphFragment}
  ${multiColumnParagraphFragment}
  ${parallaxImageParagraphFragment}
  ${pianoTemplateParagraphFragment}
  ${sectionParagraphFragment}
  ${teaserStageParagraphFragment}
  ${textParagraphFragment}
  ${videoParagraphFragment}
  ${widgetParagraphFragment}
  ${linkBoxParagraphFragment}
`;
