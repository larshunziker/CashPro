import { ReactElement } from 'react';

export type HeaderInnerProps = {
  isSticky: boolean;
  isVisible: boolean;
  publication: string;
};

export type HeaderInnerComponent = (props: HeaderInnerProps) => ReactElement;
