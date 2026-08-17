import React from 'react';
import UtilityBar from '../../../../../UtilityBar';
import {
  UTILITY_BAR_ORIGIN_INLINE_OVERLAY,
  UTILITY_BAR_ORIGIN_OVERLAY,
} from '../../../../../../../../../shared/constants/utilitybar';
import styles from './styles.legacy.css';

const Default = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'overlayTitle' implicitly has an 'any' type. */
  overlayTitle,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'enabledUtilities' implicitly has an 'any' type. */
  enabledUtilities,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'hasStickyness' implicitly has an 'any' type. */
  hasStickyness,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'shareUrl' implicitly has an 'any' type. */
  shareUrl,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
  title,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'shortTitle' implicitly has an 'any' type. */
  shortTitle,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'lead' implicitly has an 'any' type. */
  lead,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'socialMediaTitle' implicitly has an 'any' type. */
  socialMediaTitle,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'imageUrl' implicitly has an 'any' type. */
  imageUrl,
}) => (
  <>
    {overlayTitle && (
      <p className={styles.Title} data-testid="utility-overlay-title-wrapper">
        {overlayTitle}
      </p>
    )}
    {enabledUtilities &&
      Array.isArray(enabledUtilities) &&
      enabledUtilities.length > 0 && (
        <div className={styles.UtilityBarWrapper}>
          <UtilityBar
            shareUrl={shareUrl || ''}
            title={title || ''}
            shortTitle={shortTitle || ''}
            lead={lead || ''}
            socialMediaTitle={socialMediaTitle || ''}
            imageUrl={imageUrl || ''}
            enabledUtilities={enabledUtilities}
            origin={
              (!hasStickyness && UTILITY_BAR_ORIGIN_INLINE_OVERLAY) ||
              UTILITY_BAR_ORIGIN_OVERLAY
            }
          />
        </div>
      )}
  </>
);

export default Default;
