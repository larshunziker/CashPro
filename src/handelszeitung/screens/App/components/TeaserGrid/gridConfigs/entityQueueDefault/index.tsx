import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { MHPA_2 } from '../../../../../../../shared/constants/adZone';
import {
  TEASER_LAYOUT_L,
  TEASER_LAYOUT_M,
  TEASER_LAYOUT_S,
} from '../../../../../../../shared/constants/teaser';

export const entityQueueDefault = {
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
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_L,
          downloadPriority: 'high',
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_S,
        },
        {
          type: TYPE_AD,
          adConfig: [{ slot: MHPA_2, deviceType: 'mobile' }],
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
