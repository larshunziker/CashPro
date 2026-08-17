import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { EMAIL_ALERT_ANCHOR_ID } from '../../../../../../../common/components/AlertList/factory';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AlertList from '../../../../components/AlertList';
import { ensureAlertListInterface } from '../../../../../../../common/components/AlertList/helper';
import { TRACKING_CLASS_ARTICLE_KEYWORDS } from '../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import { ArticleAlertsProps } from './typings';

const ArticleAlerts = ({
  items = [],
  isLongRead = false,
}: ArticleAlertsProps) => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state)?.isHybridApp || false,
  );

  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }
  return (
    <div
      id={`${EMAIL_ALERT_ANCHOR_ID}s`}
      className={classNames(
        { [styles.AlertListWrapper]: isLongRead },
        TRACKING_CLASS_ARTICLE_KEYWORDS,
        'article-footer',
      )}
    >
      <div className={styles.AlertListTitle}>
        {isHybridApp ? 'Themen per Push folgen' : 'Themen per E-mail folgen'}
      </div>
      <TestFragment data-testid="alertlist-wrapper">
        <AlertList
          items={ensureAlertListInterface(items)}
          isLongRead={isLongRead}
        />
      </TestFragment>
    </div>
  );
};

export default ArticleAlerts;
