import { gql } from '@apollo/client';
import { imageParagraphFragment } from '../../../../../../components/Paragraphs/components/ImageParagraph/fragments';

export const heroImageFragment = gql`
  fragment HeroImageFragment on ImageParagraph {
    ...ImageParagraphFragment
  }

  ${imageParagraphFragment}
`;
