import { TYPE_TEASER } from '../../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_ML } from '../../../../../../../../shared/constants/teaser';

export const teaserStageUnlimited = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        ...Array(50).fill({
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
        }),
      ],
    },
  ],
};
