import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  INDEX_AD_1,
  TOP_AD_1,
} from '../../../../../../../shared/constants/adZone';
import { TEASER_LAYOUT_WIDE } from '../../../../../../../shared/constants/teaser';
import { LANDING_PAGE_GRID_PAGE_SIZE } from '../../../../screens/LandingPage/constants';

type GridItemConfig = {
  type: string;
  teaserType?: string;
  downloadPriority?: string;
  adConfig?: Array<{
    slot: string;
    isMultiPlacement: boolean;
    deviceType: 'mobile' | 'tabletDesktop';
  }>;
};

// Additional display inventory on article teaser lists: insert an extra ad on
// desktop (and tablet) after every Nth teaser
const DESKTOP_AD_INTERVAL = 6;

// Mobile ad positions (teaser number => ad config).
// TOP_AD_1 is rendered only once per page, whereas INDEX_AD_1 is a content ad
// that appears several times and therefore needs a unique container id.
const MOBILE_ADS_BY_TEASER: Record<
  number,
  { slot: string; isMultiPlacement: boolean }
> = {
  2: { slot: TOP_AD_1, isMultiPlacement: false },
  6: { slot: INDEX_AD_1, isMultiPlacement: true },
  10: { slot: INDEX_AD_1, isMultiPlacement: true },
};

const buildLandingPageDefaultItems = (): GridItemConfig[] => {
  const items: GridItemConfig[] = [];

  for (let teaserNr = 1; teaserNr <= LANDING_PAGE_GRID_PAGE_SIZE; teaserNr++) {
    items.push({
      type: TYPE_TEASER,
      teaserType: TEASER_LAYOUT_WIDE,
      ...(teaserNr === 1 ? { downloadPriority: 'high' } : {}),
    });

    const mobileAd = MOBILE_ADS_BY_TEASER[teaserNr];
    if (mobileAd) {
      items.push({
        type: TYPE_AD,
        adConfig: [{ ...mobileAd, deviceType: 'mobile' }],
      });
    }

    // Desktop/tablet display ad after every Nth teaser (mobile is untouched).
    if (teaserNr % DESKTOP_AD_INTERVAL === 0) {
      items.push({
        type: TYPE_AD,
        adConfig: [
          {
            slot: INDEX_AD_1,
            isMultiPlacement: true,
            deviceType: 'tabletDesktop',
          },
        ],
      });
    }
  }

  return items;
};

export const landingPageDefault = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: buildLandingPageDefaultItems(),
    },
  ],
};
