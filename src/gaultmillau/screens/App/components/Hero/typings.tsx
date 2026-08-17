import { ReactNode } from 'react';

type heroImageBody =
  | ImageGalleryParagraph
  | ImageParagraph
  | VideoParagraph
  | VideoLoopParagraph;

export type HeroProps = {
  heroImageBody: heroImageBody[];
  type?: string;
  children?: ReactNode;
  article?: Article & { subtypeValue: string };
};
