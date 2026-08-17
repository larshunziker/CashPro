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
  text: 'Benutzen Sie dieses Symbol, um Artikel, die Ihr Interesse geweckt haben, zu speichern. So können Sie sie später hier wiederfinden.',
  button: <Link path="/" className={styles.Button} label="Zur Startseite" />,
  iconType: 'IconBookmark',
});
