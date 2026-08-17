import { gql } from '@apollo/client';
import { contentParagraphFragment } from '../ContentParagraph/fragments';
import { embedParagraphFragment } from '../EmbedParagraph/fragments';
// import { imageGalleryParagraphFragment } from '../ImageGalleryParagraph/fragments';
import { imageParagraphFragment } from '../ImageParagraph/fragments';
import { inputFormParagraphFragment } from '../InputFormParagraph/fragments';
// import { infoBoxParagraphFragment } from '../InfoBoxParagraph/fragments';
// import { linkBoxParagraphFragment } from '../LinkBoxParagraph/fragments';
import { ministageParagraphFragment } from '../MinistageParagraph/fragments';
// import { multiColumnParagraphFragment } from '../MultiColumnParagraph/fragments';
import { pianoTemplateParagraphFragment } from '../PianoTemplateParagraph/fragments';
import { teaserStageParagraphFragment } from '../TeaserStageParagraph/fragments';
// import { nativeAdvertisingCarouselParagraphFragment } from '../NativeAdvertisingCarouselParagraph/fragments';
// import { parallaxImageParagraphFragment } from '../ParallaxImageParagraph/fragments';
import { textParagraphFragment } from '../TextParagraph/fragments';
import { videoParagraphFragment } from '../VideoParagraph/fragments';
import { widgetParagraphFragment } from '../WidgetParagraph/fragments';

// TODO: there are more paragraphs that can be enabled for the sectionParagraph in the cms, but these paragraphs do not exist yet. We'll have to add the fragments later (as needed)

export const sectionInMulticolumnParagraphFragment = gql`
  fragment SectionInMulticolumnParagraphFragment on SectionParagraph {
    anchorId
    id
    title
    link {
      path
    }
    body {
      id
      # ...ContentParagraphFragment
      # ...EmbedParagraphFragment
      ...TextParagraphFragment
      # ...WidgetParagraphFragment
      ...ImageParagraphFragment
      # ...MinistageParagraphFragment
      # ...TeaserStageParagraphFragment
      # ...InputFormParagraphFragment
      # ...PianoTemplateParagraphFragment
      ...VideoParagraphFragment
    }
  }
  # ${contentParagraphFragment}
  # ${embedParagraphFragment}
  # ${widgetParagraphFragment}
  ${textParagraphFragment}
  ${imageParagraphFragment}
  # ${ministageParagraphFragment}
  # ${teaserStageParagraphFragment}
  # ${inputFormParagraphFragment}
  # ${pianoTemplateParagraphFragment}
  ${videoParagraphFragment}
`;
