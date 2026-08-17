import React, { memo } from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/factory';
import { TEASER_LAYOUT_WIDE } from '../../../../../../../shared/constants/teaser';
import styles from './styles.legacy.css';

const getShortTitleElementByProps = ({ shortTitle }: TeaserFactoryProps) => {
  return (
    <div className={styles.ShortTitleElement}>
      <div className={classNames(styles.BadgeLabel)}>Rechtsratgeber</div>
      <div className={styles.ShortTitleWrapper}>
        <div className={styles.ShortTitle}>{shortTitle}</div>
      </div>
    </div>
  );
};

const TeaserTool = teaserFactory({
  disableWrapperClassName: true,
  shortTitleElement: getShortTitleElementByProps,
  styles: {
    Wrapper: classNames(TEASER_LAYOUT_WIDE, styles.Wrapper),
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
    ShortTitle: styles.ShortTitle,
  },
  isAuthorVisible: false,
});

export default memo(TeaserTool);
