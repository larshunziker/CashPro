import { gql } from '@apollo/client';
import { embedParagraphFragment } from '../EmbedParagraph/fragments';
import { entityQueueParagraphFragment } from '../EntityQueueParagraph/fragments';
import { imageGalleryParagraphFragment } from '../ImageGalleryParagraph/fragments';
import { imageParagraphFragment } from '../ImageParagraph/fragments';
import { infoBoxParagraphFragment } from '../InfoBoxParagraph/fragments';
import { linkBoxParagraphFragment } from '../LinkBoxParagraph/fragments';
import { ministageParagraphFragment } from '../MinistageParagraph/fragments';
import { nativeAdvertisingCarouselParagraphFragment } from '../NativeAdvertisingCarouselParagraph/fragments';
import { parallaxImageParagraphFragment } from '../ParallaxImageParagraph/fragments';
import { textParagraphFragment } from '../TextParagraph/fragments';
import { videoParagraphFragment } from '../VideoParagraph/fragments';
import { listicleItemParagraphFragment } from '../ListicleItemParagraph/fragments';

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
      ...EntityQueueParagraphFragment
      ...LinkBoxParagraphFragment
      ...ListicleItemParagraphFragment
      ...MinistageParagraphFragment
      ...InfoBoxParagraphFragment
      ...VideoParagraphFragment
      ...NativeAdvertisingCarouselParagraphFragment
      ...ParallaxImageParagraphFragment
    }
  }

  ${imageParagraphFragment}
  ${imageGalleryParagraphFragment}
  ${textParagraphFragment}
  ${embedParagraphFragment}
  ${entityQueueParagraphFragment}
  ${linkBoxParagraphFragment}
  ${ministageParagraphFragment}
  ${infoBoxParagraphFragment}
  ${videoParagraphFragment}
  ${nativeAdvertisingCarouselParagraphFragment}
  ${parallaxImageParagraphFragment}
  ${listicleItemParagraphFragment}
`;
