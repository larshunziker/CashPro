import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_M } from '../../../../../../../shared/constants/teaser';

export const teaser4x4 = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
        autoFill: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
      ],
    },
  ],
};
