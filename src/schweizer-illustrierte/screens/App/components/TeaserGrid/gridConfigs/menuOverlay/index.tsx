import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_SUBSCRIPTION_M } from '../../../../../../../shared/constants/teaser';

export const menuOverlay = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SUBSCRIPTION_M,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SUBSCRIPTION_M,
        },
      ],
    },
  ],
};
