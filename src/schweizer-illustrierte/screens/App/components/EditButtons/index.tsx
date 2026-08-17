/* istanbul ignore file */

import React from 'react';
import editButtonsFactory from '../../../../../common/components/EditButtons/factory';
import Link from '../../../../../common/components/Link';
import Icon from '../Icon';
import styles from './styles.legacy.css';

const editButtons = editButtonsFactory({
  closeIcon: <Icon type="IconCloseButtonSimple" addClass={styles.Icon} />,
  styles,
  Link,
});

export default editButtons;
