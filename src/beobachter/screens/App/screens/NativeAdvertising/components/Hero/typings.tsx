type heroImageBody = ImageGalleryParagraph | ImageParagraph | VideoParagraph;

export type HeroProps = {
  heroImageBody: heroImageBody[];
  type?: string;
  node?: Article & { subtypeValue: string };
};
