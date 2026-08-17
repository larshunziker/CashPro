//  INFO: ExpansionPanel used for AlertList
/* istanbul ignore file */

import React from 'react';
import classNames from 'classnames';
import expansionPanelFactory, {
  ExpansionPanelState,
} from '../../../../../../../common/components/ExpansionPanel/factory';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';

export default expansionPanelFactory({
  styles: {
    ExpansionPanel: styles.ExpansionPanel,
    IsOpen: '',
    Header: styles.HeaderCentered,
    BoldTitle: '',
    Spacer: styles.Spacer,
    Icon: '',
    ArrowIcon: '',
    Content: styles.Content,
  },
  /* @ts-ignore TODO: TS7006 ->  Parameter '_' implicitly has an 'any' type. */
  header: (_, { isClosed }: ExpansionPanelState) => (
    <div className={styles.HeaderContent}>
      {isClosed ? 'Mehr anzeigen' : 'Weniger anzeigen'}
      <Icon
        type={'IconChevronDown'}
        addClass={classNames(styles.HeaderIcon, {
          [styles.IconOpenState]: !isClosed,
        })}
      />
    </div>
  ),
});
