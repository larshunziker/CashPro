import React, { ReactElement, memo, useMemo } from 'react';
import styles from './styles.legacy.css';
import { WidgetParagraphProps } from '../../../../Paragraphs/components/WidgetParagraph/typings';

const AD_SRC_BASE =
  'https://ad.doubleclick.net/ddm/adi/N92802.149273CASH.CH/B36175519.451847813;sz=300x250';

const SponsorIntegrationVanguard = (): ReactElement => {
  // Cache-busting ordinal; keep stable across re-renders so the ad does not reload.
  const adSrc = useMemo(
    () =>
      `${AD_SRC_BASE};ord=${Date.now()};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;dc_sdk_apis=;dc_omid_p=;gdpr=\${GDPR};gdpr_consent=\${GDPR_CONSENT_755};dc_tdv=1?`,
    [],
  );

  return (
    <div className={styles.Wrapper}>
      <iframe src={adSrc} title="Vanguard" width={300} height={250} />
    </div>
  );
};

export default memo<WidgetParagraphProps>(SponsorIntegrationVanguard);
