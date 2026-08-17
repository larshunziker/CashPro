import { TYPE_ESI_WIDGET_PARAGRAPH } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TYPE_SIMULATOR } from '../../constants';

export const fullquoteDerivateSimulator = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_ESI_WIDGET_PARAGRAPH,
        },
        {
          type: TYPE_SIMULATOR,
        },
      ],
    },
  ],
};
