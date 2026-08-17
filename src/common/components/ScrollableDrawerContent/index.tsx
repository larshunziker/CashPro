import React, { memo } from 'react';
import { SCROLLABLE_DRAWER_CONTENT_ID } from './constants';
import styles from './styles.legacy.css';

type ScrollableDrawerContentProps = {
  children: any;
  stickyOffset?: number;
};

const ScrollableDrawerContent = ({
  children,
  stickyOffset = 0,
}: ScrollableDrawerContentProps) => {
  if (!children) {
    return null;
  }
  let height = (global.innerHeight / 100) * 75 - stickyOffset;

  if (global.innerWidth >= 760) {
    height = (global.innerHeight / 100) * 80 - 100 - stickyOffset;
  }

  return (
    <div
      id={SCROLLABLE_DRAWER_CONTENT_ID}
      style={{ maxHeight: height }}
      className={styles.ScrollableContentWrapper}
    >
      {children}
    </div>
  );
};

export default memo(ScrollableDrawerContent);
