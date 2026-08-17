import React, { memo } from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/factory';
import { RESTRICTION_STATUS_PAID } from '../../../../../../../shared/constants/content';
import { TEASER_LAYOUT_LEGAL_ADVICE } from '../../../../../../../shared/constants/teaser';
import styles from './styles.legacy.css';

const getShortTitleElementByProps = ({
  shortTitle,
  badgeLabel,
  KMULabel,
  restrictionStatus,
}: TeaserFactoryProps) => {
  const badgeIsFree = restrictionStatus !== RESTRICTION_STATUS_PAID;
  return (
    <div className={styles.ShortTitleElement}>
      <div className={styles.BadgesWrapper}>
        {badgeLabel && <div className={styles.BadgeLabel}>{badgeLabel}</div>}
        {badgeLabel && badgeIsFree && (
          <div className={classNames(styles.BadgeLabel, styles.BadgeLabelFree)}>
            Kostenlos
          </div>
        )}
        {KMULabel && <div className={styles.KMULabel}>KMU</div>}
      </div>

      <div className={styles.ShortTitleWrapper}>
        <div className={styles.ShortTitle}>{shortTitle}</div>
      </div>
    </div>
  );
};

const TeaserLegalAdvice = teaserFactory({
  disableWrapperClassName: true,
  leadOptions: {
    suffixText: '',
  },
  shortTitleElement: getShortTitleElementByProps,
  styles: {
    Wrapper: classNames(TEASER_LAYOUT_LEGAL_ADVICE, styles.Wrapper),
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
    Lead: styles.Lead,
    Summary: styles.Lead,
    ShortTitle: styles.ShortTitle,
    BottomLine: styles.BottomLine,
  },
});

export default memo(TeaserLegalAdvice);
