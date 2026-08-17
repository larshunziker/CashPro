import { gql } from '@apollo/client';
import { imageParagraphFragment } from '../../../Paragraphs/components/ImageParagraph/fragments';

export const heroImageFragment = gql`
  fragment HeroImageFragment on ImageParagraph {
    ...ImageParagraphFragment
  }

  ${imageParagraphFragment}
`;
