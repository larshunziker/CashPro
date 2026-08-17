import loginFormFactory from '../../../../../../../common/components/LoginForm/factory';
import Icon from '../../../../../../../beobachter/screens/App/components/Icon';
import styles from './styles.legacy.css';

export default loginFormFactory({
  styles: {
    LoginFormWrapper: styles.LoginFormWrapper,
    Button: styles.Button,
    Message: styles.Message,
    Icon: styles.Icon,
  },
  Icon,
  iconType: 'IconBookmark',
});
