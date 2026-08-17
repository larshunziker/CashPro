declare type Gallery = {
  body: ParagraphInterface[];
  id: string;
  items: ParagraphInterface;
  lead?: string;
  preferredUri?: string;
  shortTitle?: string;
  title?: string;
};

declare type GalleryItem = {
  gallery: Gallery;
  hasTitleOverride: boolean;
  title?: string;
};
