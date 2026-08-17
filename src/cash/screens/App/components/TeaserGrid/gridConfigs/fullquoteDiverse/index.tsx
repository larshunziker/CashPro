import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  TEASER_LAYOUT_HERO,
  TEASER_LAYOUT_M,
  TEASER_LAYOUT_TRADING,
} from '../../../../../../../shared/constants/teaser';

export const fullquoteDiverse = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        // Header
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HERO,
          downloadPriority: 'high',
        },
        // Latest Data
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
          downloadPriority: 'high',
        },
        // Summary
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
        // Chart
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
        // Trading Piano Widget
        {
          type: TEASER_LAYOUT_TRADING,
          forceDisplayOnLastPosition: true,
        },
      ],
    },
  ],
};
