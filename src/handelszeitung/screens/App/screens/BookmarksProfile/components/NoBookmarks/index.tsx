import React from 'react';
import noItemsFactory from '../../../../../../../common/components/NoItems/factory';
import Button from '../../../../components/ButtonWithLoading';
import Icon from '../../../../components/Icon';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import styles from './styles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.ScaleAnimation];

const NoItemsButton = () => {
  const navigate = useStableNavigate();
  return (
    <Button onClick={() => navigate('/')} loading={false}>
      Zurück zur Startseite
    </Button>
  );
};

export default noItemsFactory({
  styles: {
    NoItemsWrapper: '',
    InnerWrapper: styles.InnerWrapper,
    Text: styles.Text,
    Icon: styles.Icon,
    Wrapper: styles.Wrapper,
  },
  Icon,
  text: 'Mit diesem Symbol speichern Sie interessante Artikel, um sie später zu lesen.',
  button: <NoItemsButton />,
  iconType: 'IconBookmark',
});
