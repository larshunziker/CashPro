/**
 * @file   linkbox paragraph
 */

import React, { memo } from 'react';
import classNames from 'classnames';
import {
  TRACKING_CLASS_LINK_BOX_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import {
  LinkBoxParagraphFactoryOptions,
  LinkBoxParagraphProps,
} from './typings';

type LinkBoxParagraphPropsInner = LinkBoxParagraphProps;

const LinkBoxParagraphFactory = ({
  styles,
  Link,
}: LinkBoxParagraphFactoryOptions) => {
  const LinkBoxParagraph = ({ linkBox }: LinkBoxParagraphPropsInner) => {
    if (
      !linkBox?.links?.edges ||
      !Array.isArray(linkBox.links.edges) ||
      linkBox.links.edges.length === 0
    ) {
      return null;
    }

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_LINK_BOX_PARAGRAPH,
        )}
      >
        <div className={styles.GroupWrapper}>
          <div className={styles.Title}>{linkBox?.title || ''}</div>
        </div>
        <div className={styles.GroupWrapper}>
          {/* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<LinkEdge>'. */}
          {linkBox.links.edges.map(({ node }, index) => {
            return (
              <Link
                key={`linkbox-link-${index}`}
                {...node}
                className={styles.Link}
              />
            );
          })}
        </div>
      </div>
    );
  };
  return memo<LinkBoxParagraphProps>(LinkBoxParagraph);
};

export default LinkBoxParagraphFactory;
