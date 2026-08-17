// TODO: think about supporting regular images e.g. google.com/my-img.jpg
export type PictureProps = {
  url?: string; // full path to img (this prop will be used prior to the relativeOrigin prop)
  relativeOrigin?: string;
  focalPointX?: number;
  focalPointY?: number;
  alt: string;
  style_320?: string;
  style_480?: string;
  style_540?: string;
  style_760?: string;
  style_960?: string;
  style_1680?: string;
  className?: string;
  disableWrapperClassName?: boolean;
  disableLineHeightResetClassName?: boolean;
  title?: string;
  height?: number;
  width?: number;
  downloadPriority?: 'high' | 'default';
  showOriginal?: boolean;
  useIntrinsicSizes?: boolean;
};
