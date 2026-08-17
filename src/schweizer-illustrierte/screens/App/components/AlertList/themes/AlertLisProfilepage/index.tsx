/* istanbul ignore file */

import classNames from 'classnames';
import alertListFactory from '../../../../../../../common/components/AlertList/factory';
import AlertItem from '../../../AlertItem';
import SubscribeButton from '../../../SubscribeButton';
import ExpansionPanel from '../../components/ExpansionPanel';
// @ts-ignore
import grid from '@grid.legacy.css';

export default alertListFactory({
  styles: {
    AlertListWrapper: grid.Container,
    AlertListInner: grid.Row,
    AlertListItem: classNames(grid.ColSm12, grid.ColXl8),
  },
  AlertItem,
  SubscribeButton,
  ExpansionPanel,
});
