import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../common/components/Picture';
import {
  STYLE_1X1_140,
  STYLE_1X1_210,
} from '../../../../../../../shared/constants/images';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { OverviewPageHeaderProps } from '../../typings';

export type BlogPropsInner = OverviewPageHeaderProps;

const OVERVIEW_PAGE_HEADER_IDENTIFIER = 'blog-overview-page-header';

const Blog = ({
  title,
  lead,
  headerImage,
}: BlogPropsInner): ReactElement | null => {
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
      data-testid="overview-page-header-blog-wrapper"
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
          style_760={STYLE_1X1_210}
        />
      )) ||
        null}
      <div className={styles.ContentWrapper}>
        <h1 className={styles.Title}>{title}</h1>
        {lead && (
          <div
            data-testid="overview-page-header-blog-lead"
            className={styles.Lead}
          >
            {lead}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
