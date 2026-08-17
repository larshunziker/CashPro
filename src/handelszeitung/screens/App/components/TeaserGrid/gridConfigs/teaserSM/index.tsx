import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_SM } from '../../../../../../../shared/constants/teaser';

export const teaserSM = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
        autoFill: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SM,
        },
      ],
    },
  ],
};
