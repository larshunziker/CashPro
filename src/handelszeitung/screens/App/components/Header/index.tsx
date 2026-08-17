/* istanbul ignore file */

import headerFactory from '../../../../../common/components/Header/factory';
import HeaderInner from './components/HeaderInner';
import PartnerClaim from './components/PartnerClaim';
import { HEADER_PLACEHOLDER_ID } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/rasch-st */
import variables from '../../assets/styles/variables.legacy.css';
import styles from './styles.legacy.css';

const configIsVisible: InViewConfig = {
  rootMargin: `-${variables.headerHeightObserver} 0px 0px 0px`,
};

const configIsLogoVisible: InViewConfig = {
  root: '#subnav-logo',
  rootMargin: `-65px 0px 0px 0px`,
};

// INFO: if an observer config includes a root element, the reInitOnViewportLabelChange prop must be set to false. Otherwise the observer will be re-initialized and thus overwrite the root element.

const Header = headerFactory({
  HeaderInner,
  PartnerClaim,
  placeholderId: HEADER_PLACEHOLDER_ID,
  observerConfigs: [configIsVisible, configIsLogoVisible],
  reInitObserverOnLocationChange: [false, true],
  styles: {
    Wrapper: styles.Wrapper,
    Placeholder: styles.Placeholder,
    IsSticky: styles.IsSticky,
    Header: '',
  },
});

export default Header;
