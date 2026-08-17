import { connect } from 'react-redux';
import classNames from 'classnames';
import headerFactory from '../../../../../common/components/Header/factory';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import { MARKETING_PAGE } from '../../../../shared/actions/route';
import HeaderInner from './components/HeaderInner';
import { HEADER_PLACEHOLDER_ID } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/rasch-st */
import variables from '../../assets/styles/variables.legacy.css';
import styles from './styles.legacy.css';

const configIsVisible: InViewConfig = {
  rootMargin: `-${variables.headerHeightObserver} 0px 0px 0px`,
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'vertical' implicitly has an 'any' type. */
const getStyleByProps = ({ vertical }) => ({
  Wrapper: styles.Wrapper,
  Placeholder: classNames(styles.Placeholder, {
    [styles.MarketingPage]: vertical === MARKETING_PAGE,
  }),
  IsSticky: '',
  Header: '',
});

const Header = headerFactory({
  HeaderInner,
  placeholderId: HEADER_PLACEHOLDER_ID,
  observerConfigs: [configIsVisible, {}],
  styles: getStyleByProps,
});

const mapStateToProps = (state: ReduxState) => ({
  vertical: locationStateSelector(state).vertical,
});

export default connect(mapStateToProps)(Header);
