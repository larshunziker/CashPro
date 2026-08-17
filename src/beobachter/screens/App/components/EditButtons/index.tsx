/* istanbul ignore file */

import React from 'react';
import editButtonsFactory from '../../../../../common/components/EditButtons/factory';
import Link from '../../../../../common/components/Link';
import Icon from '../Icon';
import {
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
  ARTICLE_TYPE_RATGEBER,
} from '../../../../../shared/constants/content';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
const getStylesByProps = ({ origin }) => {
  const isRightColumn = [
    ARTICLE_TYPE_RATGEBER,
    ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
    ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
  ].includes(origin);

  return {
    Wrapper: styles.Wrapper,
    WrapperInner: !isRightColumn ? styles.WrapperInner : '',
    ListWrapper: styles.ListWrapper,
    ListItem: styles.ListItem,
    CloseButtonWrapper: styles.CloseButtonWrapper,
    CloseButton: styles.CloseButton,
    Link: styles.Link,
  };
};

const EditButtons = editButtonsFactory({
  closeIcon: <Icon type="IconXMark" addClass={styles.Icon} />,
  styles: getStylesByProps,
  Link,
});

export default EditButtons;
