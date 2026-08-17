import { gql } from '@apollo/client';
import { advantagesParagraphFragment } from './components/AdvantagesParagraph/fragments';
import { blockquoteParagraphFragment } from './components/BlockquoteParagraph/fragments';
import { contentStageParagraphFragment } from './components/ContentStageParagraph/fragments';
import { embedParagraphFragment } from './components/EmbedParagraph/fragments';
import { entityQueueParagraphFragment } from './components/EntityQueueParagraph/fragments';
import { heroMediaParagraphFragment } from './components/HeroMediaParagraph/fragments';
import { imageGalleryParagraphFragment } from './components/ImageGalleryParagraph/fragments';
import { imageParagraphFragment } from './components/ImageParagraph/fragments';
import { infoBoxParagraphFragment } from './components/InfoBoxParagraph/fragments';
import { inputFormParagraphFragment } from './components/InputFormParagraph/fragments';
import { linkBoxParagraphFragment } from './components/LinkBoxParagraph/fragments';
import { listicleItemParagraphFragment } from './components/ListicleItemParagraph/fragments';
import { ministageParagraphFragment } from './components/MinistageParagraph/fragments';
import { multiColumnParagraphFragment } from './components/MultiColumnParagraph/fragments';
import { nativeAdvertisingCarouselParagraphFragment } from './components/NativeAdvertisingCarouselParagraph/fragments';
import { parallaxImageParagraphFragment } from './components/ParallaxImageParagraph/fragments';
import { pianoTemplateParagraphFragment } from './components/PianoTemplateParagraph/fragments';
import { rankingListParagraphFragment } from './components/RankingListParagraph/fragments';
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
    ...ContentStageParagraphFragment
    ...EmbedParagraphFragment
    ...EntityQueueParagraphFragment
    ...HeroMediaParagraphFragment
    ...ImageGalleryParagraphFragment
    ...ImageParagraphFragment
    ...InfoBoxParagraphFragment
    ...InputFormParagraphFragment
    ...LinkBoxParagraphFragment
    ...ListicleItemParagraphFragment
    ...MinistageParagraphFragment
    ...MultiColumnParagraphFragment
    ...NativeAdvertisingCarouselParagraphFragment
    ...ParallaxImageParagraphFragment
    ...PianoTemplateParagraphFragment
    ...RankingListParagraphFragment
    ...SectionParagraphFragment
    ...TeaserStageParagraphFragment
    ...TextParagraphFragment
    ...VideoParagraphFragment
    ...WidgetParagraphFragment
  }

  ${advantagesParagraphFragment}
  ${blockquoteParagraphFragment}
  ${contentStageParagraphFragment}
  ${embedParagraphFragment}
  ${entityQueueParagraphFragment}
  ${heroMediaParagraphFragment}
  ${imageGalleryParagraphFragment}
  ${imageParagraphFragment}
  ${infoBoxParagraphFragment}
  ${inputFormParagraphFragment}
  ${inputFormParagraphFragment}
  ${linkBoxParagraphFragment}
  ${listicleItemParagraphFragment}
  ${ministageParagraphFragment}
  ${multiColumnParagraphFragment}
  ${nativeAdvertisingCarouselParagraphFragment}
  ${parallaxImageParagraphFragment}
  ${pianoTemplateParagraphFragment}
  ${rankingListParagraphFragment}
  ${sectionParagraphFragment}
  ${teaserStageParagraphFragment}
  ${textParagraphFragment}
  ${videoParagraphFragment}
  ${widgetParagraphFragment}
`;
