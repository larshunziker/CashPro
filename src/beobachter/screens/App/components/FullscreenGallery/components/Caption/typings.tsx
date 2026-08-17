import { FunctionComponent, ReactNode } from 'react';

type ScrollableContentProps = {
  children?: ReactNode;
};

export type CaptionRenderProps = {
  ScrollableContent: FunctionComponent<ScrollableContentProps>;
};

export type CaptionProps = {
  children?: (props: CaptionRenderProps) => ReactNode;
  activeIndex: number | string;
};
