import React from 'react';
import classNames from 'classnames';
import { VideoType } from '../../../../../../../../../shared/helpers/createVideoObjectJsonLd';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../../../shared/helpers/ensureVideo'. '/Users/bhs/code/ */
import { ensureVideoItem } from '../../../../../../../../../shared/helpers/ensureVideo';
import AuthorDateBlock from '../../../../../../components/AuthorDateBlock';
import VideoParagraph from '../../../../../../components/Paragraphs/components/VideoParagraph';
import { ARTICLE_TYPE_RATGEBER } from '../../../../../../../../../shared/constants/content';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleVideoProps } from './typings';

const ArticleVideo = ({ article, video, children }: ArticleVideoProps) => {
  if (!article) {
    return null;
  }
  const ensuredVideo: VideoParagraph = ensureVideoItem(video);

  const isRatgeberArticle = article.subtypeValue === ARTICLE_TYPE_RATGEBER;

  return (
    <div className={classNames('article-video', styles.Wrapper)}>
      {isRatgeberArticle ? (
        <div>
          {/* @ts-ignore TODO: TS2322 ->  Type 'ArticleInterface & EntityQueueReplaceableInterface & MetatagProviderInterface & NodeInterface & ... 4 more ... &  */}
          <AuthorDateBlock article={article} hasContainer={true} />
        </div>
      ) : (
        <div className={grid.Container}>
          <div className={grid.Row}>
            <div className={classNames(grid.ColSm22, grid.ColOffsetSm1)}>
              <p className={classNames(styles.Lead, grid.HiddenSmUp)}>
                {article?.lead || ''}
              </p>
              {/* @ts-ignore TODO: TS2322 ->  Type 'ArticleInterface & EntityQueueReplaceableInterface & MetatagProviderInterface & NodeInterface & ... 4 more ... &  */}
              <AuthorDateBlock article={article} hasContainer={true} />
            </div>
          </div>
        </div>
      )}
      <div
        className={classNames({
          [grid.Container]: !isRatgeberArticle,
        })}
      >
        {children}
      </div>
      <div
        className={classNames({
          [grid.Container]: !isRatgeberArticle,
        })}
      >
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <VideoParagraph
              video={ensuredVideo.video as VideoType}
              addClass={styles.Video}
              isFirst
              suppressSource={!!video.suppressSource}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleVideo;
