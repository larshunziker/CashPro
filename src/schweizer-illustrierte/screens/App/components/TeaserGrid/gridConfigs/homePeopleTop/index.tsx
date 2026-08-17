import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  TEASER_LAYOUT_HERO_XL_SLIDER,
  TEASER_LAYOUT_M,
} from '../../../../../../../shared/constants/teaser';
import { MMR_1 } from '../../../AppNexus/constants';
import { TYPE_HEROSLIDER_HOME_PEOPLE } from '../constants';

export const homePeopleTop = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_HEROSLIDER_HOME_PEOPLE,
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
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
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
