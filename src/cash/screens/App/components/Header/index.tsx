/* istanbul ignore file */

import { connect } from 'react-redux';
import classNames from 'classnames';
import headerFactory from '../../../../../common/components/Header/factory';
import windowStateSelector from '../../../../../shared/selectors/windowStateSelector';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import { MARKETING_PAGE } from '../../../../shared/actions/route';
import HeaderInner from './components/HeaderInner';
import { HEADER_PLACEHOLDER_ID } from './constants';
import styles from './styles.legacy.css';

const configIsVisible = {
  rootMargin: `${60 - 12 * 2 - 1}px 0px 0px 0px`,
};
const configIsCollapsed = {
  rootMargin: `-${60 - 12 + 2}px 0px 0px 0px`,
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'vertical' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'isHybridApp' implicitly has an 'any' type. */
const getStyleByProps = ({ vertical, isHybridApp }) => ({
  Wrapper: styles.Wrapper,
  Placeholder: classNames({
    [styles.Placeholder]: !isHybridApp,
    [styles.MarketingPage]: vertical === MARKETING_PAGE,
  }),
  IsSticky: styles.IsSticky,
  Header: '',
});

const Header = headerFactory({
  HeaderInner,
  placeholderId: HEADER_PLACEHOLDER_ID,
  observerConfigs: [configIsVisible, configIsCollapsed],
  styles: getStyleByProps,
});

const mapStateToProps = (state: ReduxState) => ({
  viewportLabel: windowStateSelector(state).viewport.label,
  vertical: locationStateSelector(state).vertical,
  isHybridApp: locationStateSelector(state).isHybridApp,
});

export default connect(mapStateToProps)(Header);
