import React from 'react';
import classNames from 'classnames';
import { EMAIL_ALERT_ANCHOR_ID } from '../../../../../../../common/components/AlertList/factory';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AlertList from '../../../../components/AlertList';
import { ensureAlertListInterface } from '../../../../../../../common/components/AlertList/helper';
import { TRACKING_CLASS_ARTICLE_KEYWORDS } from '../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleAlertsProps } from './typings';

const ArticleAlerts = ({ items, isLongRead = false }: ArticleAlertsProps) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <section
      id={`${EMAIL_ALERT_ANCHOR_ID}s`}
      className={classNames(
        TRACKING_CLASS_ARTICLE_KEYWORDS,
        'article-alerts',
        grid.HideForPrint,
      )}
      data-testid="article-alerts"
    >
      <div className={grid.Row}>
        <div className={grid.ColSm24}>
          <div className={styles.AlertListTitle}>Themen per E-Mail folgen</div>
        </div>
      </div>
      <TestFragment data-testid="alertlist-wrapper">
        <AlertList
          items={ensureAlertListInterface(items)}
          isLongRead={isLongRead}
        />
      </TestFragment>
    </section>
  );
};

export default ArticleAlerts;
