import { ReactElement } from 'react';
import { LinkComponent, LinkProps } from '../Link/typings';

export type RefetchGqlDataLinkFactoryOptions<T> = {
  Link: LinkComponent;
  setIsRefetchingData: (isRefetching: boolean, props: T) => void;
  getRoutePathname: (props: T) => string;
  shouldRerender: (props: T, nextProps: T) => boolean;
};

export type RefetchGqlDataLinkProps = LinkProps & {
  children: ReactElement;
  className?: string;
};
