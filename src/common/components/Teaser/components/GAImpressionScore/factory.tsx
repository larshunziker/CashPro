import React from 'react';
import { getCookieByName } from '../../../../../shared/helpers/utils';
import styles from './styles.legacy.css';

type GAImpressionScoreProps = { score: string };

const GAImpressionScore = ({ score }: GAImpressionScoreProps) => {
  const isPreview = global?.location?.host?.includes('preview.') || false;
  const isShowScoreEnabled =
    getCookieByName('enableGAImpressionScore') === 'true';

  if (!isPreview || !score || !isShowScoreEnabled) {
    return null;
  }

  return <div className={styles.GAScoreWrapper}>GA Impressions: {score}</div>;
};

export default GAImpressionScore;
