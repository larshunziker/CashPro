import { gql } from '@apollo/client';
import { advantagesParagraphFragment } from './components/AdvantagesParagraph/fragments';
import { blockquoteParagraphFragment } from './components/BlockquoteParagraph/fragments';
import { embedParagraphFragment } from './components/EmbedParagraph/fragments';
import { entityQueueParagraphFragment } from './components/EntityQueueParagraph/fragments';
import { heroMediaParagraphFragment } from './components/HeroMediaParagraph/fragments';
import { imageGalleryParagraphFragment } from './components/ImageGalleryParagraph/fragments';
import { imageParagraphFragment } from './components/ImageParagraph/fragments';
import { infoBoxParagraphFragment } from './components/InfoBoxParagraph/fragments';
import { inputFormParagraphFragment } from './components/InputFormParagraph/fragments';
import { listicleItemParagraphFragment } from './components/ListicleItemParagraph/fragments';
import { ministageFragment } from './components/MinistageParagraph/fragments';
import { multiColumnParagraphFragment } from './components/MultiColumnParagraph/fragments';
import { parallaxImageParagraphFragment } from './components/ParallaxImageParagraph/fragments';
import { pianoTemplateParagraphFragment } from './components/PianoTemplateParagraph/fragments';
import { sectionParagraphFragment } from './components/SectionParagraph/fragments';
import { teaserParagraphFragment } from './components/TeaserParagraph/fragments';
import { teaserStageParagraphFragment } from './components/TeaserStageParagraph/fragments';
import { textParagraphFragment } from './components/TextParagraph/fragments';
import { videoParagraphFragment } from './components/VideoParagraph/fragments';

export const paragraphsFragment = gql`
  fragment ParagraphsFragment on ParagraphInterface {
    id
    ...AdvantagesParagraphFragment
    ...BlockquoteParagraphFragment
    ...EmbedParagraphFragment
    ...EntityQueueParagraphFragment
    ...HeroMediaParagraphFragment
    ...ImageGalleryParagraphFragment
    ...ImageParagraphFragment
    ...InfoBoxParagraphFragment
    ...InputFormParagraphFragment
    ...ListicleItemParagraphFragment
    ...MinistageParagraphFragment
    ...MultiColumnParagraphFragment
    ...ParallaxImageParagraphFragment
    ...PianoTemplateParagraphFragment
    ...SectionParagraphFragment
    ...TeaserParagraphFragment
    ...TeaserStageParagraphFragment
    ...TextParagraphFragment
    ...VideoParagraphFragment
  }

  ${advantagesParagraphFragment}
  ${blockquoteParagraphFragment}
  ${embedParagraphFragment}
  ${entityQueueParagraphFragment}
  ${heroMediaParagraphFragment}
  ${imageGalleryParagraphFragment}
  ${imageParagraphFragment}
  ${infoBoxParagraphFragment}
  ${inputFormParagraphFragment}
  ${listicleItemParagraphFragment}
  ${ministageFragment}
  ${multiColumnParagraphFragment}
  ${parallaxImageParagraphFragment}
  ${pianoTemplateParagraphFragment}
  ${sectionParagraphFragment}
  ${teaserParagraphFragment}
  ${teaserStageParagraphFragment}
  ${textParagraphFragment}
  ${videoParagraphFragment}
`;
