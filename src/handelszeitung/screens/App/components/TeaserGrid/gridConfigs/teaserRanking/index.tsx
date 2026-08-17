import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_RANKING } from '../../../../../../../shared/constants/teaser';
import { MMR_1 } from '../../../AppNexus/constants';

export const teaserRanking = {
  gridGroups: [
    {
      config: {
        autoFill: true,
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_RANKING,
          downloadPriority: 'high',
        },
        {
          type: TYPE_AD,
          adConfig: [
            { slot: MMR_1, isMultiplacement: false, deviceType: 'mobile' },
          ],
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_RANKING,
          downloadPriority: 'high',
        },
      ],
    },
  ],
};
