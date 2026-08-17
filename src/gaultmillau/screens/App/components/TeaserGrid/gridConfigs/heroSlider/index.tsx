import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_HERO } from '../../../../../../../shared/constants/teaser';
import { TYPE_HEROSLIDER_HOME } from '../constants';

export const heroSlider = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_HEROSLIDER_HOME,
          downloadPriority: 'high',
          items: [
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO,
            },
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO,
            },
            {
              type: TYPE_TEASER,
              teaserType: TEASER_LAYOUT_HERO,
            },
          ],
        },
      ],
    },
  ],
};
