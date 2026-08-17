import { TEASER_LAYOUT_M } from '../../../../../../shared/constants/teaser';
import { TYPE_TEASER } from '../../constants';

export const teaserStageUnlimited = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
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
