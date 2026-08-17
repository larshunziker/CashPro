import { TYPE_ESI_WIDGET_PARAGRAPH } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TYPE_INTERACTIVE_CHART } from '../../constants';

export const fullquoteInteractiveChart = {
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
          type: TYPE_ESI_WIDGET_PARAGRAPH,
        },
        {
          type: TYPE_INTERACTIVE_CHART,
        },
      ],
    },
  ],
};
