import { TYPE_TEASER } from '../../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_M } from '../../../../../../../../shared/constants/teaser';

export const teaserStageUnlimited = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        ...Array(50).fill({
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        }),
      ],
    },
  ],
};
