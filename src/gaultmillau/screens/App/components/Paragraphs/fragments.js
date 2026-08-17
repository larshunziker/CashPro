import { gql } from '@apollo/client';
import { blockquoteParagraphFragment } from './components/BlockquoteParagraph/fragments';
import { embedParagraphFragment } from './components/EmbedParagraph/fragments';
import { entityQueueParagraphFragment } from './components/EntityQueueParagraph/fragments';
import { imageGalleryParagraphFragment } from './components/ImageGalleryParagraph/fragments';
import { imageParagraphFragment } from './components/ImageParagraph/fragments';
import { infoBoxParagraphFragment } from './components/InfoBoxParagraph/fragments';
import { inputFormParagraphFragment } from './components/InputFormParagraph/fragments';
import { linkBoxParagraphFragment } from './components/LinkBoxParagraph/fragments';
import { listicleItemParagraphFragment } from './components/ListicleItemParagraph/fragments';
import { ministageParagraphFragment } from './components/MinistageParagraph/fragments';
import { multiColumnParagraphFragment } from './components/MultiColumnParagraph/fragments';
import { teaserParagraphFragment } from './components/TeaserParagraph/fragments';
import { teaserStageParagraphFragment } from './components/TeaserStageParagraph/fragments';
import { textParagraphFragment } from './components/TextParagraph/fragments';
import { videoLoopParagraphFragment } from './components/VideoLoopParagraph/fragments';
import { videoParagraphFragment } from './components/VideoParagraph/fragments';

export const paragraphsFragment = gql`
  fragment ParagraphsFragment on ParagraphInterface {
    id
    ...BlockquoteParagraphFragment
    ...EmbedParagraphFragment
    ...EntityQueueParagraphFragment
    ...ImageGalleryParagraphFragment
    ...ImageParagraphFragment
    ...InfoBoxParagraphFragment
    ...InputFormParagraphFragment
    ...LinkBoxParagraphFragment
    ...ListicleItemParagraphFragment
    ...MinistageParagraphFragment
    ...MultiColumnParagraphFragment
    ...TeaserParagraphFragment
    ...TeaserStageParagraphFragment
    ...TextParagraphFragment
    ...VideoLoopParagraphFragment
    ...VideoParagraphFragment
  }

  ${blockquoteParagraphFragment}
  ${embedParagraphFragment}
  ${entityQueueParagraphFragment}
  ${imageGalleryParagraphFragment}
  ${imageParagraphFragment}
  ${infoBoxParagraphFragment}
  ${inputFormParagraphFragment}
  ${linkBoxParagraphFragment}
  ${listicleItemParagraphFragment}
  ${ministageParagraphFragment}
  ${multiColumnParagraphFragment}
  ${teaserParagraphFragment}
  ${teaserStageParagraphFragment}
  ${textParagraphFragment}
  ${videoLoopParagraphFragment}
  ${videoParagraphFragment}
`;
