import React, { Component, ReactElement } from 'react';
import TestFragment from '../../../shared/tests/components/TestFragment';
import {
  ShareLinkFactoryOptions,
  ShareLinkFactoryOptionsStyles,
  ShareLinkProps,
} from './typings';

export type ShareLinkPropsInner = ShareLinkProps;

const ShareLinkFactory = ({
  getTargetTypeByProps,
  generateIconByProps,
  Link,
  styles: appStyles,
}: ShareLinkFactoryOptions<any>) => {
  class ShareLink extends Component<ShareLinkPropsInner> {
    render(): ReactElement | null {
      const defaultStyles: ShareLinkFactoryOptionsStyles = {
        SharePanelItem: '',
      };

      const getStyles = (): ShareLinkFactoryOptionsStyles => {
        const factoryStyles: ShareLinkFactoryOptionsStyles =
          (typeof appStyles === 'function' && appStyles(this.props)) ||
          (typeof appStyles === 'object' && appStyles) ||
          defaultStyles;

        return factoryStyles;
      };

      const styles = getStyles();
      const icon = generateIconByProps(this.props);
      const targetType: string =
        typeof getTargetTypeByProps === 'function'
          ? getTargetTypeByProps(this.props)
          : '_blank';

      if (!icon || !this.props.url) return null;

      return (
        <TestFragment data-testid="sharelink-wrapper">
          <Link
            path={this.props.url}
            className={styles.SharePanelItem}
            target={targetType}
            aria-label={this.props.ariaLabel}
          >
            {icon}
          </Link>
        </TestFragment>
      );
    }
  }
  return ShareLink;
};

export default ShareLinkFactory;
