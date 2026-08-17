import React from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../components/Picture';
import {
  STYLE_2X1_1280,
  STYLE_2X1_800,
} from '../../../../../../../shared/constants/images';
import grid from '../../../../../../assets/styles/grid.legacy.css';
import { TopicPageHeaderProps } from '../../typings';

export type KeywordPropsInner = TopicPageHeaderProps;

const TOPIC_PAGE_HEADER_IDENTIFIER = 'keyword-topic-page-header';

const TopicHeaderKeyword = ({
  title,
  lead,
  headerImage,
  styles,
  children,
}: KeywordPropsInner) => {
  if (!title || !headerImage) {
    return null;
  }

  const imgRelativeOriginPath = headerImage?.file?.relativeOriginPath || '';
  const focalPointX = headerImage?.file?.focalPointX || null;
  const focalPointY = headerImage?.file?.focalPointY || null;
  const imgAlt = headerImage?.file?.alt || '';
  const imageStyles = {
    style_320: STYLE_2X1_800,
    style_1680: STYLE_2X1_1280,
  };

  return (
    <>
      <div className={classNames(styles.WrapperKeyword, grid.Container)}>
        {(imgRelativeOriginPath && (
          <Picture
            relativeOrigin={imgRelativeOriginPath}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointX={focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointY={focalPointY}
            alt={imgAlt}
            className={classNames(
              TOPIC_PAGE_HEADER_IDENTIFIER,
              styles.HeaderImageKeyword,
            )}
            disableWrapperClassName
            {...imageStyles}
          />
        )) ||
          null}
        <div className={styles.HeaderWrapperKeyword}>
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.ColXs24,
                grid.ColSm20,
                grid.ColOffsetSm2,
              )}
            >
              <span className={styles.HeaderKeyword}>{title}</span>
              {lead && (
                <div
                  className={classNames(styles.LeadKeyword, grid.HiddenSmDown)}
                  dangerouslySetInnerHTML={{ __html: lead }}
                />
              )}
              {children && (
                <div className={styles.SubscribeButtonWrapperKeyword}>
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {lead && (
        <div
          className={classNames(
            styles.LeadKeyword,
            grid.Container,
            grid.HiddenSmUp,
          )}
          dangerouslySetInnerHTML={{ __html: lead }}
        />
      )}
    </>
  );
};

export default TopicHeaderKeyword;
