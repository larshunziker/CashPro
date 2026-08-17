import { ReactNode } from 'react';

export type HeroVideoLoopProps = {
  videoLoop: VideoLoopParagraph;
  addClass?: string;
  children?: ReactNode;
  article?: Article & { subtypeValue: string };
};
