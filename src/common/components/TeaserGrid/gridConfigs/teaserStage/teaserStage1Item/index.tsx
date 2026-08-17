import { TYPE_TEASER } from '../../constants';
import { TEASER_LAYOUT_XL } from '../../../../../../shared/constants/teaser';

export const teaserStage1Item = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_XL,
        },
      ],
    },
  ],
};
