import { ReactElement } from 'react';

export type CSSPictureProps = {
  children: ({ className }: { className: string }) => ReactElement;
  relativeOriginPath: string;
  style_320: string;
  style_480?: string;
  style_540?: string;
  style_760?: string;
  style_960?: string;
  style_1680?: string;
  focalPointX?: number;
  focalPointY?: number;
};
