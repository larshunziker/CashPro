/* istanbul ignore file */

import classNames from 'classnames';
import alertListFactory from '../../../../../common/components/AlertList/factory';
import AlertItem from '../AlertItem';
import SubscribeButton from '../SubscribeButton';
import ExpansionPanel from './components/ExpansionPanel';
import grid from '../../../../../common/assets/styles/grid.legacy.css';

export default alertListFactory({
  styles: {
    AlertListWrapper: '',
    AlertListInner: grid.Row,
    AlertListItem: classNames(grid.ColSm12, grid.ColXl8),
  },
  AlertItem,
  SubscribeButton,
  ExpansionPanel,
});
