/* istanbul ignore file */

import React, { ReactElement } from 'react';
import classNames from 'classnames';
import ContentBoxFactory from '../../../../../../../common/components/ContentBox/factory';
import { TIME_ELAPSED_FORMAT_DATE_WITH_TIME } from '../../../../../../../shared/helpers/dateTimeElapsed';
import { noop } from '../../../../../../../shared/helpers/utils';
import {
  ensureTeaserInterfaceItem,
  renderDates,
} from '../../../Teaser/shared/helpers';
import Teaser from '../../../Teaser';
import Skeleton from '../../../Teaser/components/TeaserText/components/Skeleton';
import {
  CONTENT_SOURCE_MANUAL,
  CONTENT_SOURCE_MANUAL_RANDOM,
  CONTENT_SOURCE_MOST_READ,
} from '../../../../../../../shared/constants/content';
import { PUBLICATION_GROUP_CASH } from '../../../../../../../shared/constants/publications';
import { TEASER_LAYOUT_TEXT } from '../../../../../../../shared/constants/teaser';
import { ARTICLE_ASIDE_ORIGIN } from '../../../../screens/ArticlePage/components/ArticlePageAside/constants';
import { TEASER_LAYOUT_EDITORIAL_PICKS } from '../../../Teaser/constants';
import styles from './styles.legacy.css';
import { ContentBoxProps } from '../../../../../../../common/components/ContentBox/typings';

const MOST_READ_TITLE = 'Most Read';

/* @ts-ignore TODO: TS7031 ->  Binding element 'contentBoxData' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
const TeaserRenderer = ({ contentBoxData, origin }): ReactElement => {
  if (!contentBoxData.items && !Array.isArray(contentBoxData.items)) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  const isArticleAsideOrigin = origin === ARTICLE_ASIDE_ORIGIN;

  const teaserLayout =
    (isArticleAsideOrigin && TEASER_LAYOUT_EDITORIAL_PICKS) ||
    TEASER_LAYOUT_TEXT;

  return (
    <>
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */}
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */}
      {contentBoxData.items.map((item, index) => (
        <div
          key={`content-box-item-${item.node.id}`}
          className={classNames({
            [styles.Divider]: index > 0,
          })}
        >
          <Teaser
            component={teaserLayout}
            contentBoxType={contentBoxData.contentBoxType}
            {...ensureTeaserInterfaceItem(item)}
          />
          {!isArticleAsideOrigin && (
            <div className={styles.PublicationDate}>
              {renderDates(
                item.node,
                false,
                TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const getContentBoxType = ({ component }: ContentBoxProps) => {
  switch (component) {
    case CONTENT_SOURCE_MANUAL:
      return CONTENT_SOURCE_MANUAL;
    case CONTENT_SOURCE_MANUAL_RANDOM:
      return CONTENT_SOURCE_MANUAL_RANDOM;
    case CONTENT_SOURCE_MOST_READ:
    default:
      return CONTENT_SOURCE_MOST_READ;
  }
};

const getTitleByProps = ({ node, component }: ContentBoxProps) =>
  node.title || (component === CONTENT_SOURCE_MOST_READ ? MOST_READ_TITLE : '');

const getStylesByProps = ({ node }: ContentBoxProps) => {
  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.WithHiddenTitle]: node?.hideTitle,
    }),
    Title: styles.Title,
  };
};

const MostRead = ContentBoxFactory({
  styles: getStylesByProps,
  TeaserGridRenderer: () => TeaserRenderer,
  SingleTeaser: Teaser,
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '(pageSize */
  getContentBoxRowGridOptions: noop,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
  teaserLayout: null,
  Skeleton,
  publication: PUBLICATION_GROUP_CASH,
  contentBoxType: getContentBoxType,
  title: getTitleByProps,
});

export default MostRead;
