export type ImgProps = {
  addClass?: string;
  addWrapperClass?: string;
  allowUpscaling?: boolean;
  alt: string;
  cover?: boolean;
  cropped?: boolean;
  height?: number;
  itemProp?: string;
  noWrap?: boolean;
  onLoadHandler?: () => void;
  originalUrl?: string;
  title?: string;
  url: string;
  width?: number;
  ignoreLandscapeClass?: boolean;
};
