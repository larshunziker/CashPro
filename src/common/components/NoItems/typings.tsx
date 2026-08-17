import { ReactElement } from 'react';

export type NoItemsFactoryOptions = {
  styles: {
    NoItemsWrapper: string;
    InnerWrapper: string;
    Text: string;
    Icon: string;
    Wrapper?: string;
  };
  Icon: any;
  button?: ReactElement;
  text?: string;
  iconType?: string;
};

export type NoItemsComponent = (props: NoItemsProps) => ReactElement;

export type NoItemsProps = {};
