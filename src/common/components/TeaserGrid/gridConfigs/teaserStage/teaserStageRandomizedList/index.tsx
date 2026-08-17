import { TEASER_LAYOUT_S } from '../../../../../../shared/constants/teaser';
import { TYPE_TEASER } from '../../constants';

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
          teaserType: TEASER_LAYOUT_S,
        },
      ],
    },
  ],
};
