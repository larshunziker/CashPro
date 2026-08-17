import React from 'react';
import classNames from 'classnames';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { TopicPageHeaderProps } from '../../typings';

export type DefaultPropsInner = TopicPageHeaderProps;

const TopicHeaderDefault = ({
  title,
  lead,
  styles,
  children,
}: DefaultPropsInner) => {
  if (!title) {
    return null;
  }

  return (
    <div
      data-testid="topic-page-header-default-wrapper"
      className={classNames(grid.Container, styles.WrapperDefault)}
    >
      <div className={grid.Row}>
        <div
          className={classNames(grid.ColXs24, grid.ColSm20, grid.ColOffsetSm2)}
        >
          <div className={styles.HeaderWrapperDefault}>
            <span className={styles.HeaderDefault}>{title}</span>
          </div>

          {children && (
            <div className={styles.SubscribeButtonWrapperDefault}>
              {children}
            </div>
          )}
        </div>
      </div>

      {lead && (
        <div data-testid="topic-page-header-default-lead" className={grid.Row}>
          <div
            className={classNames(
              grid.ColXs24,
              grid.ColSm16,
              grid.ColOffsetSm4,
              grid.ColXl12,
              grid.ColOffsetXl6,
            )}
          >
            <div
              className={styles.LeadDefault}
              dangerouslySetInnerHTML={{ __html: lead }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicHeaderDefault;
