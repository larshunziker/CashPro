//  INFO: ExpansionPanel used for AlertList

import React from 'react';
import classNames from 'classnames';
import expansionPanelFactory, {
  ExpansionPanelState,
} from '../../../../../../../common/components/ExpansionPanel/factory';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';
import { ExpansionPanelFactoryOptionsStyles } from '../../../../../../../common/components/ExpansionPanel/typings';

const getStylesByProps = (): ExpansionPanelFactoryOptionsStyles => ({
  ExpansionPanel: styles.ExpansionPanel,
  IsOpen: styles.isOpen,
  Header: styles.HeaderCentered,
  BoldTitle: '',
  Spacer: styles.Spacer,
  Icon: '',
  ArrowIcon: '',
  Content: styles.Content,
  NotExpandable: styles.NotExpandable,
});

/* @ts-ignore TODO: TS7006 ->  Parameter '_' implicitly has an 'any' type. */
const Header = (_, { isClosed }: ExpansionPanelState) => (
  <div className={styles.HeaderContent}>
    {isClosed ? 'Mehr anzeigen' : 'Weniger anzeigen'}
    <Icon
      type={'IconChevronDown'}
      addClass={classNames(styles.HeaderIcon, {
        [styles.IconOpenState]: !isClosed,
      })}
    />
  </div>
);

const ExpansionPanel = expansionPanelFactory({
  styles: getStylesByProps,
  header: Header,
  initialHeight: 115,
  checkIfContentFitsInHeight: true,
});

export default ExpansionPanel;
