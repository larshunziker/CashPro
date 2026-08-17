/* istanbul ignore file */

import React from 'react';
import editButtonsFactory from '../../../../../common/components/EditButtons/factory';
import Link from '../../../../../common/components/Link';
import Icon from '../Icon';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

const EditButtons = editButtonsFactory({
  closeIcon: <Icon type="IconXMark" />,
  styles: {
    Wrapper: styles.Wrapper,
    WrapperInner: sections.Container,
    ListWrapper: styles.ListWrapper,
    ListItem: styles.ListItem,
    Link: styles.Link,
    CloseButtonWrapper: styles.CloseButtonWrapper,
    CloseButton: styles.CloseButton,
  },
  Link,
});

export default EditButtons;
