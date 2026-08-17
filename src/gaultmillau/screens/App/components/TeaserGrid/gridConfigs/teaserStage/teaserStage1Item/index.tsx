import { TYPE_TEASER } from '../../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_HERO_A } from '../../../../../../../../shared/constants/teaser';

export const teaserStage1Item = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HERO_A,
        },
      ],
    },
  ],
};
