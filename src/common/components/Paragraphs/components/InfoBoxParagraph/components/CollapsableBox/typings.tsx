import { ReactElement, ReactNode } from 'react';
import { IconComponent } from '../../../../../Icon/typings';
import { InfoBoxParagraphProps } from '../../typings';

export { InfoBoxParagraphProps };

export type CollapsableBoxFactoryOptionsStyles = {
  Wrapper: string;
  InnerWrapper: string;
  Container: string;
  Title: string;
  Content: string;
  ToggleWrapper: string;
  ColStyle?: string;
};

export type CollapsableBoxFactoryOptions = {
  paragraphsRenderer: (props: CollapsableBoxProps) => ReactElement;
  styles:
    | CollapsableBoxFactoryOptionsStyles
    | ((props: CollapsableBoxProps) => CollapsableBoxFactoryOptionsStyles);
  showMoreMessage?: string;
  showLessMessage?: string;
  Icon: IconComponent;
  IconTypes: {
    arrowUpIconType: string;
    arrowDownIconType: string;
  };
  getTitle?: Function;
};

export type CollapsableBoxProps = {
  infoBoxParagraph: InfoBoxParagraph;
  articleColStyle?: string;
  origin?: string;
  children?: ReactNode;
  pageLayoutType?: string;
  isSplittedPageLayout?: boolean;
};
