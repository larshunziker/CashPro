/* istanbul ignore file */

import alertListFactory from '../../../../../common/components/AlertList/factory';
import AlertItem from '../AlertItem';
import SubscribeButton from '../SubscribeButton';
import ExpansionPanel from './components/ExpansionPanel';
import grid from '../../../../../common/assets/styles/grid.legacy.css';

const AlertListFactory = alertListFactory({
  styles: {
    AlertListWrapper: '',
    AlertListInner: grid.Row,
    AlertListItem: grid.ColSm12,
  },
  AlertItem,
  SubscribeButton,
  ExpansionPanel,
});

export default AlertListFactory;
