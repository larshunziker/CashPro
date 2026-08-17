import React from 'react';
import classNames from 'classnames';
import { VideoType } from '../../../../../../../../../shared/helpers/createVideoObjectJsonLd';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../../../shared/helpers/ensureVideo'. '/Users/bhs/code/ */
import { ensureVideoItem } from '../../../../../../../../../shared/helpers/ensureVideo';
import VideoParagraph from '../../../../../../components/Paragraphs/components/VideoParagraph';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleVideoProps } from './typings';

const VideoHero = ({ article, video }: ArticleVideoProps) => {
  if (!article) {
    return null;
  }
  const ensuredVideo: VideoParagraph = ensureVideoItem(video);

  return (
    <div className={classNames('article-video', styles.Wrapper)}>
      <div className={grid.Container}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <VideoParagraph
              video={ensuredVideo.video as VideoType}
              addClass={styles.Video}
              isFirst
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
