import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../common/components/Picture';
import { STYLE_1X1_140 } from '../../../../../../../shared/constants/images';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { OverviewPageHeaderProps } from '../../typings';

export type VideoBlogPropsInner = OverviewPageHeaderProps;

const OVERVIEW_PAGE_HEADER_IDENTIFIER = 'video-blog-overview-page-header';

const VideoBlog = ({
  title,
  lead,
  headerImage,
}: VideoBlogPropsInner): ReactElement | null => {
  if (!title || !headerImage) {
    return null;
  }

  const imgRelativeOriginPath = headerImage?.file?.relativeOriginPath || '';
  const focalPointX = headerImage?.file?.focalPointX || null;
  const focalPointY = headerImage?.file?.focalPointY || null;
  const imgAlt = headerImage?.file?.alt || '';

  return (
    <div
      className={classNames(styles.Wrapper, grid.Container)}
      data-testid="overview-page-header-video-blog-wrapper"
    >
      <div
        data-testid="overview-page-header-video-blog-image"
        className={styles.HeaderImageWrapper}
      >
        {(imgRelativeOriginPath && (
          <Picture
            relativeOrigin={imgRelativeOriginPath}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointX={focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointY={focalPointY}
            alt={imgAlt}
            className={classNames(
              OVERVIEW_PAGE_HEADER_IDENTIFIER,
              styles.HeaderImage,
            )}
            disableWrapperClassName
            downloadPriority="high"
            style_320={STYLE_1X1_140}
          />
        )) ||
          null}
      </div>

      <div className={styles.ContentWrapper}>
        <h1 className={styles.Title}>{title}</h1>
        {lead && (
          <div
            data-testid="overview-page-header-video-blog-lead"
            className={styles.Lead}
          >
            {lead}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoBlog;
