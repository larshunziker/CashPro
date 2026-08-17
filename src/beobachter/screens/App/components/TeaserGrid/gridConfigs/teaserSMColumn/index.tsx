import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_SM } from '../../../../../../../shared/constants/teaser';

export const teaserSMColumn = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SM,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SM,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SM,
        },
      ],
    },
  ],
};
