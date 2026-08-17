import React from 'react';
import noItemsFactory from '../../../../../../../common/components/NoItems/factory';
import ArrowButton from '../../../../components/ArrowButton';
import Icon from '../../../../components/Icon';
import Link from '../../../../../../../common/components/Link';
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
  text: 'Mit diesem Symbol speicherst du interessante Artikel, um sie später zu lesen.',
  button: (
    <Link path="/" className={styles.Link}>
      <ArrowButton addClass={styles.Button}>Zurück zur Startseite</ArrowButton>
    </Link>
  ),
  iconType: 'IconBookmarkOutlineDefault',
});
