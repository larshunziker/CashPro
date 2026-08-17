import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  TEASER_LAYOUT_HERO_S,
  TEASER_LAYOUT_HERO_XL,
  TEASER_LAYOUT_M,
} from '../../../../../../../shared/constants/teaser';
import { MMR_1 } from '../../../AppNexus/constants';
import { TYPE_HEROSLIDER_HOME } from '../constants';

export const homeTop = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_HEROSLIDER_HOME,
          downloadPriority: 'high',
          items: [
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO_XL,
            },
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO_XL,
            },
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO_XL,
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
          teaserType: TEASER_LAYOUT_HERO_S,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HERO_S,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HERO_S,
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
