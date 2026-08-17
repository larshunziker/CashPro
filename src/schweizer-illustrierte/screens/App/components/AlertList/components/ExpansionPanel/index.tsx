//  INFO: ExpansionPanel used for AlertList

import React from 'react';
import classNames from 'classnames';
import expansionPanelFactory, {
  ExpansionPanelState,
} from '../../../../../../../common/components/ExpansionPanel/factory';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';
import type { ExpansionPanelFactoryOptionsStyles } from '../../../../../../../common/components/ExpansionPanel/typings';

const getStylesByProps = (): ExpansionPanelFactoryOptionsStyles => ({
  ExpansionPanel: styles.ExpansionPanel,
  IsOpen: '',
  Header: styles.HeaderCentered,
  BoldTitle: '',
  Spacer: '',
  Icon: '',
  ArrowIcon: '',
  Content: styles.Content,
});

const ExpansionPanel = expansionPanelFactory({
  styles: getStylesByProps,
  header: ({ theme = 'default' }, { isClosed }: ExpansionPanelState) => (
    <div
      className={classNames(styles.HeaderContent, {
        [styles.HeaderContentThemeLight]: theme === 'light',
      })}
    >
      {isClosed ? 'Mehr anzeigen' : 'Weniger anzeigen'}
      <Icon
        type="IconExpand"
        addClass={classNames(styles.HeaderIcon, {
          [styles.IconOpenState]: !isClosed,
        })}
      />
    </div>
  ),
});

export default ExpansionPanel;
