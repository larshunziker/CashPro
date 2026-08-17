import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  TEASER_LAYOUT_HERO_XL_2_X_1,
  TEASER_LAYOUT_M,
  TEASER_LAYOUT_PORTRAIT,
  TEASER_LAYOUT_S,
} from '../../../../../../../shared/constants/teaser';
import { MMR_1 } from '../../../AppNexus/constants';
import { TYPE_HEROSLIDER_HOME_STYLE } from '../constants';

export const homeStyleTop = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_HEROSLIDER_HOME_STYLE,
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
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_S,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_S,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_S,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_S,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_PORTRAIT,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_PORTRAIT,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_PORTRAIT,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
      ],
    },
  ],
};
