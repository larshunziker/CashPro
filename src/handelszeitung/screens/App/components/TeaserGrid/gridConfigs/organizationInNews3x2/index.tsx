import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { MMR_1 } from '../../../../../../../shared/constants/adZone';
import { TEASER_LAYOUT_ORGANIZATION } from '../../../../../../../shared/constants/teaser';

export const organizationInNews3x2 = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ORGANIZATION,
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
          teaserType: TEASER_LAYOUT_ORGANIZATION,
          downloadPriority: 'high',
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ORGANIZATION,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ORGANIZATION,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ORGANIZATION,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ORGANIZATION,
        },
      ],
    },
  ],
};
