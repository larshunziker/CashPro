import React from 'react';
import noItemsFactory from '../../../../../../../common/components/NoItems/factory';
import Button from '../../../../components/ButtonWithLoading';
import Icon from '../../../../components/Icon';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
// eslint-disable-next-line
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
  text:
    'Wenn Sie einen Artikel später lesen wollen, können Sie diesen in der Merkliste ablegen.\n' +
    'Um diese Merkliste nutzen zu können, müssen Sie sich anmelden.',
  button: (
    <Button onClick={() => Auth0.login()} loading={false}>
      Anmelden
    </Button>
  ),
  iconType: 'IconBookmark',
});
