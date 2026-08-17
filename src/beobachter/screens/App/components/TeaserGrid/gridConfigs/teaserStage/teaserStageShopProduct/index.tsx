import { TYPE_TEASER } from '../../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_SHOP_PRODUCT } from '../../../../../../../../shared/constants/teaser';

export const teaserStageShopProduct = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SHOP_PRODUCT,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SHOP_PRODUCT,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SHOP_PRODUCT,
        },
      ],
    },
  ],
};
