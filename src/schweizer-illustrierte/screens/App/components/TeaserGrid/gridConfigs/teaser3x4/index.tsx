import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { MMR_1 } from '../../../../../../../shared/constants/adZone';
import { TEASER_LAYOUT_M } from '../../../../../../../shared/constants/teaser';

export const teaser3x4 = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
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
          teaserType: TEASER_LAYOUT_M,
          downloadPriority: 'high',
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
          downloadPriority: 'high',
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
