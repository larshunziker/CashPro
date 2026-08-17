import React, { FC, memo } from 'react';
import classNames from 'classnames';
import { truncateByWord } from '../../../../../../../shared/helpers/utils';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import { STYLE_SCALEH_120 } from '../../../../../../../shared/constants/images';
import {
  TEASER_SPONSOR_IDENTIFIER,
  TEASER_TITLE_LENGTH,
} from '../../constants';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../typings';

const TeaserSponsor: FC<TeaserProps> = ({
  preferredUri,
  teaserImage,
  title,
  addClass,
}) => {
  return (
    <div
      className={classNames(TEASER_SPONSOR_IDENTIFIER, styles.Wrapper, {
        addClass: !!addClass,
      })}
    >
      <Link path={preferredUri}>
        {teaserImage?.image?.file?.relativeOriginPath && (
          <div className={styles.ImageWrapper}>
            <Picture
              relativeOrigin={teaserImage.image.file.relativeOriginPath}
              className={styles.Image}
              alt={teaserImage.image.file?.alt || title || ''}
              style_320={STYLE_SCALEH_120}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX={teaserImage?.image?.file?.focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY={teaserImage?.image?.file?.focalPointY}
            />
          </div>
        )}
      </Link>
      <div className={styles.TeaserBody}>
        <h2 className={styles.TeaserTitleWrapper}>
          <span className={styles.TeaserTitle}>
            {
              /* Shows the article's title */
              truncateByWord(title || '', TEASER_TITLE_LENGTH)
            }
          </span>
        </h2>
        <Link path={preferredUri}>
          <div className={styles.Label}>Zum Channel</div>
        </Link>
      </div>
    </div>
  );
};

export default memo<TeaserProps>(TeaserSponsor);
