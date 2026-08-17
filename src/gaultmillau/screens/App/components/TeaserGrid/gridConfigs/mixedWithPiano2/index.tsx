import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_ML } from '../../../../../../../shared/constants/teaser';
import { PIANO_CONTAINER } from '../constants';

export const mixedWithPiano2 = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
          downloadPriority: 'high',
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
          downloadPriority: 'high',
        },
        {
          type: PIANO_CONTAINER,
        },
      ],
    },
  ],
};
