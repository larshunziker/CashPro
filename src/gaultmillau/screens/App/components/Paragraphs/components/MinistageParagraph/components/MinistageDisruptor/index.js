import React from 'react';
import classNames from 'classnames';
import Link from 'Link';
import {
  TRACKING_CLASS_MINISTAGE_DISRUPTOR_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from 'constants/tracking';
import styles from './styles.legacy.css';
import grid from '@grid.legacy.css';

const MinistageDisruptor = ({ ministageDisruptor }) => {
  if (!ministageDisruptor) {
    return null;
  }

  const imageAltTagHover =
    (ministageDisruptor.link &&
      ministageDisruptor.link.label &&
      ministageDisruptor.link.label) ||
    '';

  return (
    <div className={classNames(grid.Container, styles.DisruptorWrapper)}>
      <div
        data-testid="ministage-disruptor-wrapper"
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_MINISTAGE_DISRUPTOR_PARAGRAPH,
          'ministage-disruptor',
          styles.Wrapper,
        )}
      >
        {ministageDisruptor.link && (
          <Link {...ministageDisruptor.link} className={styles.Inner}>
            {ministageDisruptor.image && ministageDisruptor.image.source && (
              <img
                src={ministageDisruptor.image.source}
                className={styles.Image}
                alt={ministageDisruptor?.link?.label || 'MinistageDisruptor'}
              />
            )}
            {ministageDisruptor.imageHover &&
              ministageDisruptor.imageHover.source && (
                <img
                  src={ministageDisruptor.imageHover.source}
                  className={styles.Image}
                  alt={
                    `${imageAltTagHover} Hover` || 'MinistageDisruptor Hover'
                  }
                />
              )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default MinistageDisruptor;
