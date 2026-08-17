import { TYPE_TEASER } from '../../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_MD } from '../../../../../../../../shared/constants/teaser';
import { TEASER_LAYOUT_MOBILE_SM_TO_DESKTOP_MD } from '../../../../../../../shared/constants/teaser';

export const teaserStageDefault = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MD,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_SM_TO_DESKTOP_MD,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_SM_TO_DESKTOP_MD,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_SM_TO_DESKTOP_MD,
        },
      ],
    },
  ],
};
