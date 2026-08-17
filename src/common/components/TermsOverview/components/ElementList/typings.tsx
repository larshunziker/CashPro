import { ReactElement } from 'react';
import { LinkComponent } from 'src/common/components/Link/typings';

export type ElementListProps = {
  data: Array<ElementItem>;
};

export type ElementItem = Pick<Keyword, 'preferredUri' | 'label'>;

export type ElementListFactoryOptionsStyles = {
  ListItem: string;
  Wrapper: string;
  Link?: string;
};

export type ElementListFactoryOptions = {
  Link: LinkComponent;
  icon?: ReactElement;
  styles:
    | ElementListFactoryOptionsStyles
    | ((props: ElementListProps) => ElementListFactoryOptionsStyles);
};
