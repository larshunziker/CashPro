import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.throttle'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.t */
import throttle from 'lodash.throttle';
import { log } from './../../../shared/helpers/utils';
import { CLICK_THROTTLE_AMOUNT, REFETCH_THROTTLE_AMOUNT } from './constants';
import { LinkComponent } from '../Link/typings';
import {
  RefetchGqlDataLinkFactoryOptions,
  RefetchGqlDataLinkProps,
} from './typings';

export default ({
  Link,
  setIsRefetchingData,
  getRoutePathname,
  shouldRerender,
}: RefetchGqlDataLinkFactoryOptions<any>) => {
  class RefetchGqlDataLink extends React.Component<RefetchGqlDataLinkProps> {
    throttledRefetch: Function;
    clickHandler;

    constructor(props: RefetchGqlDataLinkProps) {
      super(props);

      this.throttledRefetch = throttle(this.refetch, REFETCH_THROTTLE_AMOUNT, {
        trailing: false,
      });
      this.clickHandler = throttle(this._clickHandler, CLICK_THROTTLE_AMOUNT, {
        trailing: false,
      });
    }

    refetch = (): void | null => {
      const { path = '' } = this.props;

      if (
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        !global.refetchGQL ||
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        typeof global.refetchGQL !== 'function' ||
        (path && path !== getRoutePathname(this.props))
      ) {
        return null;
      }

      log(
        'REFETCHING GQL DATA',
        `start refetching GQL data on: ${path || ''}`,
        'orange',
      );

      setIsRefetchingData(true, this.props);

      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'err' implicitly has an 'any' type. */
      global.refetchGQL().catch((err) => {
        log(
          'REFETCHING GQL DATA',
          `error fetching on: ${path || ''}, error: ${err}`,
          'red',
        );
        setIsRefetchingData(false, this.props);
      });
    };

    // this additional clickHandler is necessary, otherwise the refetch function can't be executed for 60sec if a user navigates to other path
    _clickHandler = (): void | null => {
      const { path = '' } = this.props;

      if (
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        !global.refetchGQL ||
        (path && path !== getRoutePathname(this.props))
      ) {
        return null;
      }

      this.throttledRefetch();
    };

    shouldComponentUpdate(nextProps: RefetchGqlDataLinkProps) {
      return shouldRerender(this.props, nextProps);
    }

    render(): ReactElement<LinkComponent> {
      const { onClick, children } = this.props;

      return (
        <Link
          {...this.props}
          onClick={(e) => {
            this.clickHandler();
            onClick && onClick(e);
          }}
        >
          {children}
        </Link>
      );
    }
  }

  return RefetchGqlDataLink;
};
