import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  TEASER_LAYOUT_HERO,
  TEASER_LAYOUT_M,
  TEASER_LAYOUT_TRADING,
} from '../../../../../../../shared/constants/teaser';

export const fullquoteFonds = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HERO,
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
          type: TEASER_LAYOUT_TRADING,
          forceDisplayOnLastPosition: true,
        },
      ],
    },
  ],
};
