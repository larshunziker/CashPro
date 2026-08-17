/* istanbul ignore file */

//  this component is currently used for comments and webforms with auth restirction
import loginFormFactory from '../../../../../common/components/LoginForm/factory';
import styles from './styles.legacy.css';

const LoginForm = loginFormFactory({
  styles: {
    LoginFormWrapper: styles.LoginFormWrapper,
    Button: styles.Button,
    Message: styles.Message,
  },
});

export default LoginForm;
