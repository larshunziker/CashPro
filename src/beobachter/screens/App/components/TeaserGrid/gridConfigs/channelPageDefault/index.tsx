import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { MMR_1 } from '../../../../../../../shared/constants/adZone';
import { TEASER_LAYOUT_WIDE } from '../../../../../../../shared/constants/teaser';

export const channelPageDefault = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_AD,
          adConfig: [
            { slot: MMR_1, isMultiPlacement: false, deviceType: 'mobile' },
          ],
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_WIDE,
        },
      ],
    },
  ],
};
