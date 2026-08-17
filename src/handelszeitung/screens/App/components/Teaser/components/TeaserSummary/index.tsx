import React from 'react';
import Link from '../../../../../../../common/components/Link';
import ButtonWithLoading from '../../../ButtonWithLoading';
import TextParagraph from '../../../Paragraphs/components/TextParagraph';
import styles from './styles.legacy.css';
import { TeaserSummaryProps } from './typings';

const TeaserSummary = ({
  teaserSummary,
  teaserCTALabel,
  preferredUri,
}: TeaserSummaryProps) => {
  if (!teaserSummary && !teaserCTALabel && !preferredUri) {
    return null;
  }
  return (
    <Link
      data-testid="teaser-summary"
      path={preferredUri}
      className={styles.Wrapper}
    >
      {typeof teaserSummary !== 'undefined' && (
        <TextParagraph
          addClass={styles.TextParagraph}
          textParagraph={{ text: teaserSummary }}
        />
      )}
      {teaserCTALabel && (
        <ButtonWithLoading size="small" variant="secondary">
          {teaserCTALabel}
        </ButtonWithLoading>
      )}
    </Link>
  );
};

export default TeaserSummary;
