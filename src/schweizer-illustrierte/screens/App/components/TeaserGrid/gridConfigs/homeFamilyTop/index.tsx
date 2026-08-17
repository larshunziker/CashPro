import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_HERO_XL_SLIDER } from '../../../../../../../shared/constants/teaser';
import { MMR_1 } from '../../../AppNexus/constants';
import { TYPE_HEROSLIDER_HOME_FAMILY } from '../constants';

export const homeFamilyTop = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_HEROSLIDER_HOME_FAMILY,
          downloadPriority: 'high',
          items: [
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO_XL_SLIDER,
            },
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO_XL_SLIDER,
            },
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO_XL_SLIDER,
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
