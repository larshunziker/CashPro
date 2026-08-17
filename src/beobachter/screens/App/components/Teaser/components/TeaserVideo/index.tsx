import React, { ReactElement, memo } from 'react';
import classNames from 'classnames';
import CSSPicture from '../../../../../../../common/components/CSSPicture';
import Link from '../../../../../../../common/components/Link';
import PaidArticleBadge from '../../shared/components/PaidArticleBadge';
import { RESTRICTION_STATUS_PAID } from '../../../../../../../shared/constants/content';
import {
  STYLE_TEASER_S_1200,
  STYLE_TEASER_S_480,
  STYLE_TEASER_S_760,
  STYLE_TEASER_S_960,
} from '../../../../../../../shared/constants/images';
import { TEASER_VIDEO_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../typings';

type TeaserVideoPropsInner = TeaserProps;

const TeaserVideo = ({
  addClass,
  isActive = false,
  restrictionStatus,
  preferredUri,
  teaserImage,
  channel,
  shortTitle,
  title,
}: TeaserVideoPropsInner): ReactElement => {
  const isPaidArticle = restrictionStatus === RESTRICTION_STATUS_PAID;

  return (
    <Link path={preferredUri}>
      <>
        <div className={styles.PlayerWrapper}>
          {isPaidArticle && <PaidArticleBadge />}
          {teaserImage?.image?.file?.relativeOriginPath && (
            <CSSPicture
              relativeOriginPath={teaserImage.image.file.relativeOriginPath}
              style_320={STYLE_TEASER_S_480}
              style_760={STYLE_TEASER_S_760}
              style_960={STYLE_TEASER_S_960}
              style_1680={STYLE_TEASER_S_1200}
            >
              {({ className }) => {
                return (
                  <div
                    className={classNames(
                      TEASER_VIDEO_IDENTIFIER,
                      styles.Wrapper,
                      className,
                      {
                        addClass: !!addClass,
                      },
                    )}
                  />
                );
              }}
            </CSSPicture>
          )}

          <span
            className={classNames(styles.Button, {
              [styles.ActiveButton]: isActive,
            })}
          />
        </div>
        <div>
          <span
            className={classNames(styles.TeaserShortTitle, {
              [styles.IsActive]: isActive,
            })}
          >
            {shortTitle || channel?.title}
          </span>
          <div
            className={classNames(styles.TeaserTitle, {
              [styles.IsActive]: isActive,
            })}
          >
            {title}
          </div>
        </div>
      </>
    </Link>
  );
};

export default memo<TeaserVideoPropsInner>(TeaserVideo);
