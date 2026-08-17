/* istanbul ignore file */

import classNames from 'classnames';
import alertListFactory from '../../../../../common/components/AlertList/factory';
import AlertItem from '../AlertItem';
import SubscribeButton from '../SubscribeButton';
import ExpansionPanel from './components/ExpansionPanel';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const AlertList = alertListFactory({
  styles: {
    AlertListWrapper: '',
    AlertListInner: grid.Row,
    AlertListItem: classNames(grid.ColXl12, styles.AlertListSingleItem),
    OnlySingleAlertItem: styles.OnlySingleAlertItem,
    ExpansionPanelHiddenOnDesktop: grid.HiddenXlUp,
    ItemCount: styles.ItemCount,
    ListItem: styles.ListItem,
    ItemCountExpansionPanel: styles.ItemCountExpansionPanel,
  },
  AlertItem,
  SubscribeButton,
  ExpansionPanel,
});

export default AlertList;
