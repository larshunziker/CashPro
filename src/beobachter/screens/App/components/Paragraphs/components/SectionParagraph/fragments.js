import { gql } from '@apollo/client';
import { embedParagraphFragment } from '../EmbedParagraph/fragments';
import { imageGalleryParagraphFragment } from '../ImageGalleryParagraph/fragments';
import { infoBoxParagraphFragment } from '../InfoBoxParagraph/fragments';
import { inputFormParagraphFragment } from '../WebformParagraph/fragments';
import { linkBoxParagraphFragment } from '../LinkBoxParagraph/fragments';
import { ministageParagraphFragment } from '../MinistageParagraph/fragments';
import { nativeAdvertisingCarouselParagraphFragment } from '../NativeAdvertisingCarouselParagraph/fragments';
import { teaserParagraphFragment } from '../TeaserParagraph/fragments';
import { textParagraphFragment } from '../TextParagraph/fragments';
import { videoParagraphFragment } from '../VideoParagraph/fragments';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import parallaxImageParagraphFragment from '../ParallaxImageParagraph/fragments';
import { listicleItemParagraphFragment } from '../ListicleItemParagraph/fragments';
import { multiColumnParagraphFragment } from '../MultiColumnParagraph/fragments';
import { pianoTemplateParagraphFragment } from '../PianoTemplateParagraph/fragments';

export const sectionParagraphFragment = gql`
  fragment SectionParagraphFragment on SectionParagraph {
    anchorId
    id
    title
    link {
      path
    }
    body(processors: [TextSplit]) {
      ...ImageParagraphFragment
      ...ImageGalleryParagraphFragment
      ...TextParagraphFragment
      ...EmbedParagraphFragment
      ...LinkBoxParagraphFragment
      ...ListicleItemParagraphFragment
      ...TeaserParagraphFragment
      ...MinistageParagraphFragment
      ...InfoBoxParagraphFragment
      ...InputFormParagraphFragment
      ...VideoParagraphFragment
      ...NativeAdvertisingCarouselParagraphFragment
      ...ParallaxImageParagraphFragment
      ...MultiColumnParagraphFragment
      ...PianoTemplateParagraphFragment
    }
  }

  ${imageParagraphFragment}
  ${imageGalleryParagraphFragment}
  ${textParagraphFragment}
  ${embedParagraphFragment}
  ${linkBoxParagraphFragment}
  ${ministageParagraphFragment}
  ${infoBoxParagraphFragment}
  ${teaserParagraphFragment}
  ${inputFormParagraphFragment}
  ${videoParagraphFragment}
  ${nativeAdvertisingCarouselParagraphFragment}
  ${parallaxImageParagraphFragment}
  ${listicleItemParagraphFragment}
  ${multiColumnParagraphFragment}
  ${pianoTemplateParagraphFragment}
`;
