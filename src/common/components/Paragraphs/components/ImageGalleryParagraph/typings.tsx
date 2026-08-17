export type ImageGalleryParagraphProps = {
  gallery: ImageGalleryParagraph & {
    gallery: ImageGallery & { items: ParagraphInterface[] };
  };
  origin?: string;
};

export type GetComponentSwitchValueByProps = (
  props: ImageGalleryParagraphProps,
) => string;

export type ImageGalleryParagraphFactoryOptions = {
  ImageGallery: any; // TODO: use ImageGalleryComponent typing as soon as its available
  getComponentSwitchValueByProps?: GetComponentSwitchValueByProps | noop;
};
