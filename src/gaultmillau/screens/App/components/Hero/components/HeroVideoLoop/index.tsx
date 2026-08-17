/**
 * @file   Hero Video Loop
 * @author Remo Vetere <remo.vetere@ringieraxelspringer.ch>
 * @date   2017-07-28
 */

import React, { ReactElement } from 'react';
import { injectIntl } from 'react-intl';
import compose from 'recompose/compose';
import classNames from 'classnames';
import {
  TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
  getFormattedElapsedDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import { getArticleDate } from '../../../../../../../shared/helpers/utils';
import {
  getAllAuthors,
  renderSponsoredOrShortTitle,
} from '../../../../screens/Article/shared/helpers';
import VideoLoopParagraph from '../../../Paragraphs/components/VideoLoopParagraph';
import {
  ANCHOR_TITLE,
  ANCHOR_SHORT_TITLE,
} from '../../../../../../../shared/constants/content';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { HeroVideoLoopProps } from './typings';

type HeroVideoLoopPropsInner = HeroVideoLoopProps & {
  intl: any;
};

const HeroVideoLoop = ({
  videoLoop,
  article,
  children,
  intl,
}: HeroVideoLoopPropsInner): ReactElement | null => {
  const authors: Array<ReactElement> | null =
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    (article?.authors?.edges?.length > 0 &&
      /* @ts-ignore TODO: TS2345 ->  Argument of type '(ArticleInterface & EntityQueueReplaceableInterface & MetatagProviderInterface & NodeInterface & ...  */
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      getAllAuthors(article, article.authors.edges, intl)) ||
    null;

  return (
    <div className={classNames('hero-video-loop', styles.Wrapper)}>
      <VideoLoopParagraph videoLoopParagraph={videoLoop} />

      <div className={classNames(styles.TitleWrapper, grid.HiddenSmDown)}>
        <div id={ANCHOR_SHORT_TITLE}>
          {/* @ts-ignore TODO: TS2345 ->  Argument of type '(ArticleInterface & EntityQueueReplaceableInterface & MetatagProviderInterface & NodeInterface & ...  */}
          {renderSponsoredOrShortTitle(article, styles.Channel)}
        </div>
        <div id={ANCHOR_TITLE} className={styles.Title}>
          {(article && article.title) || ''}
        </div>
        <p className={styles.Lead}>{(article && article.lead) || ''}</p>
      </div>

      {children}

      <div className={styles.AuthorWrapper}>
        {authors}
        <span className={styles.CreateDate}>
          {authors && <span>&nbsp;|&nbsp;</span>}
          {getFormattedElapsedDate({
            /* @ts-ignore TODO: TS2345 ->  Argument of type '(ArticleInterface & EntityQueueReplaceableInterface & MetatagProviderInterface & NodeInterface & ...  */
            createDate: getArticleDate(article),
            format: TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
          })}
        </span>
      </div>
    </div>
  );
};

export default compose<any, any>(injectIntl)(HeroVideoLoop);
