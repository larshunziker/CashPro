import React from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../common/components/Picture';
import { STYLE_1X1_140 } from '../../../../../../../shared/constants/images';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { TopicPageHeaderProps } from '../../typings';

export type PersonPropsInner = TopicPageHeaderProps;

const TOPIC_PAGE_HEADER_IDENTIFIER = 'person-topic-page-header';

const TopicHeaderPerson = ({
  title,
  lead,
  headerImage,
  styles,
  children,
}: PersonPropsInner) => {
  if (!title || !headerImage) {
    return null;
  }

  const imgRelativeOriginPath = headerImage?.file?.relativeOriginPath || null;
  const focalPointX = headerImage?.file?.focalPointX || null;
  const focalPointY = headerImage?.file?.focalPointY || null;
  const imgAlt = headerImage?.file?.alt || '';

  return (
    <div
      className={classNames(styles.WrapperPerson, grid.Container)}
      data-testid="topic-page-header-person-wrapper"
    >
      <div className={grid.Row}>
        <div
          className={classNames(
            grid.ColXs24,
            grid.ColSm20,
            grid.ColOffsetSm2,
            grid.ColMd18,
            grid.ColOffsetSm3,
          )}
        >
          <div className={styles.HeaderImageWrapper}>
            <div className={styles.HeaderImageWrapperInner}>
              {imgRelativeOriginPath && (
                <Picture
                  relativeOrigin={imgRelativeOriginPath}
                  /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                  focalPointX={focalPointX}
                  /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                  focalPointY={focalPointY}
                  alt={imgAlt}
                  className={classNames(
                    TOPIC_PAGE_HEADER_IDENTIFIER,
                    styles.HeaderImagePerson,
                  )}
                  style_320={STYLE_1X1_140}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.HeaderWrapperPerson}>
        <div className={grid.Row}>
          <div
            className={classNames(
              grid.ColXs24,
              grid.ColSm16,
              grid.ColOffsetSm4,
              grid.ColMd14,
              grid.ColOffsetSm5,
            )}
          >
            <span className={styles.HeaderPerson}>{title}</span>
            {children && (
              <div className={styles.SubscribeButtonWrapperPerson}>
                {children}
              </div>
            )}
            {lead && (
              <div
                data-testid="topic-page-header-person-lead"
                className={styles.LeadPerson}
                dangerouslySetInnerHTML={{ __html: lead }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicHeaderPerson;
