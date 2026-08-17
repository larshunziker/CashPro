import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_HOROSCOPE } from '../../../../../../../shared/constants/teaser';
import { MMR_1 } from '../../../AppNexus/constants';

export const horoscope4x3 = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_AD,
          adConfig: [
            { slot: MMR_1, isMultiPlacement: false, deviceType: 'mobile' },
          ],
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HOROSCOPE,
        },
      ],
    },
  ],
};
