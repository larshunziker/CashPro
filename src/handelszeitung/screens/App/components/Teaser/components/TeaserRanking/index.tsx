import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import {
  STYLE_1X1_140,
  STYLE_1X1_210,
  STYLE_1X1_250,
} from '../../../../../../../shared/constants/images';
import defaultStyles from '../../shared/defaultStyles.legacy.css';
import styles from './styles.legacy.css';

const TeaserRanking = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'preferredUri' implicitly has an 'any' type. */
  preferredUri,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'rankingPosition' implicitly has an 'any' type. */
  rankingPosition,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'teaserImage' implicitly has an 'any' type. */
  teaserImage,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'shortTitle' implicitly has an 'any' type. */
  shortTitle,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
  title,
}) => {
  return (
    <Link path={preferredUri}>
      <div className={`teaser-ranking ${styles.Wrapper}`}>
        <div className={styles.Header}>
          {rankingPosition && (
            <div className={styles.RankingPosition}>{rankingPosition}</div>
          )}
        </div>
        {teaserImage?.image?.file?.relativeOriginPath && (
          <div
            className={classNames(
              defaultStyles.TeaserImageWrapper,
              styles.TeaserImageWrapper,
            )}
          >
            <Picture
              relativeOrigin={teaserImage?.image?.file?.relativeOriginPath}
              focalPointX={teaserImage?.image?.file?.focalPointX}
              focalPointY={teaserImage?.image?.file?.focalPointY}
              style_320={STYLE_1X1_140}
              style_760={STYLE_1X1_210}
              style_960={STYLE_1X1_250}
              className={styles.Image}
              alt={shortTitle || ''}
            />
          </div>
        )}
        <div className={styles.ContentWrapper}>
          <h3>
            <div className={styles.TeaserTitle}>{title || ''}</div>
          </h3>
          {shortTitle && <p className={styles.ShortTitle}>{shortTitle}</p>}
        </div>
      </div>
    </Link>
  );
};

export default TeaserRanking;
