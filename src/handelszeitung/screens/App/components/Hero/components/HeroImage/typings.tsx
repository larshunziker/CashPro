import { ReactNode } from 'react';

export type HeroImageProps = {
  image: ImageParagraph;
  sponsor: Sponsor;
  addClass?: string;
  children?: ReactNode;
};
