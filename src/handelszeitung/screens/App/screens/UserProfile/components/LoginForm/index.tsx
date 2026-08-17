import React from 'react';
import noItemsFactory from '../../../../../../../common/components/NoItems/factory';
import Button from '../../../../components/ButtonWithLoading';
import Icon from '../../../../components/Icon';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
// eslint-disable-next-line
import styles from './styles.legacy.css';

const UserProfileLoginForm = noItemsFactory({
  styles: {
    NoItemsWrapper: '',
    InnerWrapper: styles.InnerWrapper,
    Text: styles.Text,
    Icon: styles.Icon,
    Wrapper: styles.Wrapper,
  },
  Icon,
  text: 'Loggen Sie sich in Ihr bestehendes Profil ein oder registrieren Sie sich neu, um Ihr Profil zu konfigurieren.',
  button: (
    <Button onClick={() => Auth0.login()} loading={false}>
      Anmelden
    </Button>
  ),
  iconType: 'IconUser',
});

export default UserProfileLoginForm;
