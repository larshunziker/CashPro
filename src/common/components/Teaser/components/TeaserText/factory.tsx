import React, { ComponentType, ReactElement } from 'react';
import classNames from 'classnames';
import { TRACKING_CLASS_TEASER } from '../../../../../shared/constants/tracking';
import {
  ANCHOR_TITLE,
  ANCHOR_SHORT_TITLE,
} from '../../../../../shared/constants/content';
import type {
  TeaserTextFactoryOptions,
  TeaserTextFactoryOptionsStyles,
  TeaserTextFactoryProps,
} from './typings';

export const defaultStyles: TeaserTextFactoryOptionsStyles = {
  Wrapper: '',
  Title: '',
  LinkWrapper: '',
  ShortTitle: '',
  Lead: '',
};

const teaserTextFactory = ({
  Link,
  styles: appStyles,
}: TeaserTextFactoryOptions): ComponentType<TeaserTextFactoryProps> => {
  const TeaserText = (props: TeaserTextFactoryProps): ReactElement => {
    const { shortTitle, shortTitleElement, title, preferredUri, lead } = props;
    if (!title) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <Link
        className={classNames(TRACKING_CLASS_TEASER, {
          [styles.LinkWrapper || '']: preferredUri,
        })}
        path={preferredUri}
        title={title || ''}
      >
        <div id={ANCHOR_SHORT_TITLE} className={styles.Wrapper}>
          {!shortTitleElement && (
            <span className={styles.ShortTitle}>{shortTitle}</span>
          )}
          {shortTitleElement || null}

          <h1 id={ANCHOR_TITLE} className={styles.Title}>
            <span>{title}</span>
          </h1>

          {lead && <p className={styles.Lead}>{lead}</p>}
        </div>
      </Link>
    );
  };
  return TeaserText;
};

export default teaserTextFactory;
