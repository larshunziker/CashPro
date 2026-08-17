import React, { ReactElement, memo } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../../AppNexus';
import { isContentAd } from '../../../AppNexus/constants';
import styles from './styles.legacy.css';
import { AdZoneProps } from './typings';

const AdZone = ({ adSlots }: AdZoneProps): ReactElement => {
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  if (adSlots.length === 0) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <div className={styles.AdZone}>
      {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
      {adSlots.map((adSlot, index) => {
        return (
          <span
            className={styles.AdWrapper}
            key={`${adSlot.slotName}-${index}`}
          >
            <div
              className={classNames(
                'ad-wrapper',
                styles.AdPadding,
                (adSlot.deviceType && `ad-wrapper-${adSlot.deviceType}`) || '',
              )}
            >
              <div>
                <TestFragment
                  data-testid="paragraphsrenderer-ad-wrapper"
                  data-slot={adSlot.slotName}
                >
                  <AppNexus
                    slot={adSlot.slotName}
                    isMultiPlacement={isContentAd(adSlot.slotName)}
                    deviceType={adSlot.deviceType}
                  />
                </TestFragment>
              </div>
            </div>
          </span>
        );
      })}
    </div>
  );
};

export default memo(AdZone);
