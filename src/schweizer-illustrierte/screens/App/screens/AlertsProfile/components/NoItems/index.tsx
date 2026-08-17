/* istanbul ignore file */

import React from 'react';
import noItemsFactory from '../../../../../../../common/components/NoItems/factory';
import Link from '../../../../../../../common/components/Link';
import ArrowButton from '../../../../components/ArrowButton';
import Icon from '../../../../components/Icon';
import styles from './styles.legacy.css';

export default noItemsFactory({
  styles: {
    NoItemsWrapper: '',
    InnerWrapper: styles.InnerWrapper,
    Text: styles.Text,
    Icon: styles.Icon,
    Wrapper: styles.Wrapper,
  },
  Icon,
  button: (
    <Link path="/" className={styles.Link}>
      <ArrowButton large>Startseite</ArrowButton>
    </Link>
  ),
  text: 'Mit unseren E-Mail-Alerts bleibst du bestens über deine Lieblingsthemen informiert. Sobald ein Artikel veröffentlicht wird, bekommst du eine Benachrichtigung per E-Mail. Noch keinen Alert eingerichtet? Einfach am Ende jedes Artikels den entsprechenden «Folgen» Button mit der Glocke aktivieren.',
});
