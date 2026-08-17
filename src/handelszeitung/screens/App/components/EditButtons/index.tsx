/**
 * @file   EditButtons component
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2016-09-02
 */

/* istanbul ignore file */

import React from 'react';
import editButtonsFactory from '../../../../../common/components/EditButtons/factory';
import Link from '../../../../../common/components/Link';
import Icon from '../Icon';
import styles from './styles.legacy.css';

const EditButtons = editButtonsFactory({
  closeIcon: <Icon type="IconXMark" />,
  styles: {
    Wrapper: styles.Wrapper,
    WrapperInner: styles.WrapperInner,
    ListWrapper: styles.ListWrapper,
    ListItem: styles.ListItem,
    CloseButtonWrapper: styles.CloseButtonWrapper,
    CloseButton: styles.CloseButton,
    Link: styles.Link,
  },
  Link,
});

export default EditButtons;
