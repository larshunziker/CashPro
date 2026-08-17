import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_HERO_XL_2_X_1 } from '../../../../../../../shared/constants/teaser';
import { MMR_1 } from '../../../AppNexus/constants';
import { TYPE_HEROSLIDER_HOME_BODY_HEALTH } from '../constants';

export const homeBodyAndHealthTop = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_HEROSLIDER_HOME_BODY_HEALTH,
          downloadPriority: 'high',
          items: [
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO_XL_2_X_1,
            },
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO_XL_2_X_1,
            },
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO_XL_2_X_1,
            },
          ],
        },
        {
          type: TYPE_AD,
          adConfig: [
            { slot: MMR_1, isMultiPlacement: false, deviceType: 'mobile' },
          ],
        },
      ],
    },
  ],
};
