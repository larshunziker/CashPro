import { ReactNode } from 'react';

export type HeroImageProps = {
  image: ImageParagraph;
  addClass?: string;
  children?: ReactNode;
  article?: Article & { subtypeValue: string };
};
