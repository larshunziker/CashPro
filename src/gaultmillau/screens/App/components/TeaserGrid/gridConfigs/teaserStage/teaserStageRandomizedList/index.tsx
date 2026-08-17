import { TYPE_TEASER } from '../../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_ML } from '../../../../../../../../shared/constants/teaser';

export const teaserStageRandomizedList = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
        autoFill: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
        },
      ],
    },
  ],
};
