import React from 'react';
import noItemsFactory from '../../../../../../../common/components/NoItems/factory';
import Link from '../../../../../../../common/components/Link';
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
  iconType: 'IconStar',
  button: (
    <Link path="/" className={styles.Link}>
      <button className={styles.Button}>Zur Startseite</button>
    </Link>
  ),
});
