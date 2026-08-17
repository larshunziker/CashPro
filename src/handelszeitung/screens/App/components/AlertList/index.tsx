/* istanbul ignore file */

import classNames from 'classnames';
import alertListFactory from '../../../../../common/components/AlertList/factory';
import AlertItem from '../AlertItem';
import SubscribeButton from '../SubscribeButton';
import ExpansionPanel from './components/ExpansionPanel';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import { AlertListProps } from '../../../../../common/components/AlertList/typings';

const getStylesByProps = ({ isSplittedPageLayout }: AlertListProps) => {
  return {
    AlertListWrapper: '',
    AlertListInner: grid.Row,
    AlertListItem: classNames(grid.ColSm12, {
      [grid.ColMd8]: !isSplittedPageLayout,
      [grid.ColXs24]: isSplittedPageLayout,
    }),
  };
};

export default alertListFactory({
  styles: getStylesByProps,
  AlertItem,
  SubscribeButton,
  ExpansionPanel,
});
