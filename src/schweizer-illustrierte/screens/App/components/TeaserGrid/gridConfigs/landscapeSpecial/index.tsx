import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  TEASER_LAYOUT_L,
  TEASER_LAYOUT_S,
} from '../../../../../../../shared/constants/teaser';
import { MMR_1 } from '../../../AppNexus/constants';

export const landscapeSpecial = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_L,
          downloadPriority: 'high',
        },
        {
          type: TYPE_AD,
          adConfig: [
            { slot: MMR_1, isMultiPlacement: false, deviceType: 'mobile' },
          ],
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_L,
          downloadPriority: 'high',
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
          teaserType: TEASER_LAYOUT_L,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_L,
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
          teaserType: TEASER_LAYOUT_L,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_L,
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
      ],
    },
  ],
};
