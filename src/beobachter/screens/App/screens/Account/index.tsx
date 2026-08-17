import { compose } from 'redux';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import accountFactory from './../../../../../common/screens/Account/factory';
import Helmet from './../../components/Helmet';
import withHelmet from '../../../../shared/decorators/withHelmet';
import styles from './styles.legacy.css';

const Account = accountFactory({
  Helmet,
  styles: {
    Wrapper: styles.Wrapper,
    Title: styles.Title,
  },
  title: 'Mein Beobachter+',
  setLoading,
  setScreenReady,
});

export default compose<any>(withHelmet({}))(Account);
