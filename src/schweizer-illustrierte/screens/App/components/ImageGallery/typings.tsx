export type ImageGalleryProps = {
  addClass?: string;
  aspectRatio: string;
  fadeInactive: boolean;
  gallery: any; // @TODO: type properly
  hasTitleOverride?: boolean;
  layout?: string;
  parentDimensions: DOMRect;
  title?: string;
  origin?: string;
};
