import React from 'react';
import classNames from 'classnames';
import { EMAIL_ALERT_ANCHOR_ID } from '../../../../../../../common/components/AlertList/factory';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AlertList from '../../../../components/AlertList';
import { ensureAlertListInterface } from '../../../../../../../common/components/AlertList/helper';
import { TRACKING_CLASS_ARTICLE_KEYWORDS } from '../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import { ArticleFooterProps } from './typings';

type ArticleFooterPropsInner = ArticleFooterProps;

const ArticleAlerts = ({
  items = [],
  theme = 'default',
}: ArticleFooterPropsInner) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div
      id={`${EMAIL_ALERT_ANCHOR_ID}s`}
      className={classNames(TRACKING_CLASS_ARTICLE_KEYWORDS, 'article-footer')}
    >
      <div
        className={classNames(styles.Title, {
          [styles.TitleLight]: theme === 'light',
        })}
      >
        Themen per E-Mail folgen
      </div>
      <TestFragment data-testid="alertlist-wrapper">
        <AlertList items={ensureAlertListInterface(items)} theme={theme} />
      </TestFragment>
    </div>
  );
};

export default ArticleAlerts;
