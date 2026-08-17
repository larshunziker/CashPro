import { TYPE_ESI_WIDGET_PARAGRAPH } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TYPE_INTERACTIVE_CHART } from '../../constants';

export const fullquoteInteractiveChartHybrid = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_ESI_WIDGET_PARAGRAPH,
        },
        // TODO: Comment back in if an integration will be sold for the hybrid app in the future
        // Don't forget to comment back in in the file `src/cash/screens/App/screens/FullquotePage/items.tsx` as well
        // {
        //   type: TYPE_ESI_WIDGET_PARAGRAPH,
        // },
        {
          type: TYPE_INTERACTIVE_CHART,
        },
        {
          type: TYPE_INTERACTIVE_CHART,
        },
      ],
    },
  ],
};
