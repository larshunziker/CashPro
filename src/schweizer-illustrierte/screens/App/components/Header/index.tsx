import { connect } from 'react-redux';
import classNames from 'classnames';
import headerFactory from '../../../../../common/components/Header/factory';
import isStyleDesignByChannel from '../../../../shared/helpers/isStyleDesignByChannel';
import windowStateSelector from '../../../../../shared/selectors/windowStateSelector';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import {
  VIEWPORT_LG,
  VIEWPORT_MD,
  VIEWPORT_SM,
  VIEWPORT_XL,
  VIEWPORT_XS,
  VIEWPORT_XXL,
} from '../../../../../shared/actions/window';
import HeaderInner from '../Header/components/HeaderInner';
import { HEADER_PLACEHOLDER_ID } from '../Header/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/rasch-st */
import variables from '../../assets/styles/variables.legacy.css';
import styles from './styles.legacy.css';
import { HeaderProps } from '../../../../../common/components/Header/typings';
import { ActiveMainChannel } from '../../../../shared/types';

type HeaderPropsInner = HeaderProps & {
  viewportLabel: ViewportLabel;
  activeMainChannel: ActiveMainChannel;
};

let configIsVisible: InViewConfig;

let configIsCollapsed: InViewConfig;

const HEADER_DIMENSIONS_BY_VIEWPORT = {
  [VIEWPORT_XS]: {
    height: parseInt(variables.headerHeightXs, 10),
    margin: parseInt(variables.headerMarginXs, 10) - 5,
    marginSY: parseInt(variables.headerMarginSYXs, 10) - 8,
  },
  [VIEWPORT_SM]: {
    height: parseInt(variables.headerHeightSm, 10),
    margin: parseInt(variables.headerMarginLg, 10),
    marginSY: parseInt(variables.headerMarginSYLg, 10) - 7,
  },
  [VIEWPORT_MD]: {
    height: parseInt(variables.headerHeightSm, 10),
    margin: parseInt(variables.headerMarginLg, 10),
    marginSY: parseInt(variables.headerMarginSYLg, 10) - 5,
  },
  [VIEWPORT_LG]: {
    height: parseInt(variables.headerHeightSm, 10),
    margin: parseInt(variables.headerMarginLg, 10),
    marginSY: parseInt(variables.headerMarginSYLg, 10) - 5,
  },
  [VIEWPORT_XL]: {
    height: parseInt(variables.headerHeightXl, 10),
    margin: parseInt(variables.headerMarginXl, 10) - 1,
    marginSY: parseInt(variables.headerMarginSYXl, 10) - 2,
  },
  [VIEWPORT_XXL]: {
    height: parseInt(variables.headerHeightXl, 10),
    margin: parseInt(variables.headerMarginXl, 10) - 1,
    marginSY: parseInt(variables.headerMarginSYXl, 10) - 2,
  },
};

const getHeaderDimension = (viewport: ViewportLabel, prop = 'height'): number =>
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ height */
  HEADER_DIMENSIONS_BY_VIEWPORT[viewport][prop];

const getObserverConfigsByProps = ({
  viewportLabel,
  activeMainChannel,
}: HeaderPropsInner): Array<InViewConfig> => {
  const headerMargin =
    (isStyleDesignByChannel(activeMainChannel) && 'marginSY') || 'margin';
  const headerDimensionMargin = getHeaderDimension(viewportLabel, headerMargin);

  if (viewportLabel === VIEWPORT_XS) {
    configIsVisible = {
      rootMargin: `-${
        parseInt(variables.headerHeightXs, 10) - headerDimensionMargin * 2
      }px 0px 0px 0px`,
    };
    configIsCollapsed = {
      rootMargin: `-${
        parseInt(variables.headerHeightXs, 10) - headerDimensionMargin + 2
      }px 0px 0px 0px`,
    };
  } else if (
    viewportLabel === VIEWPORT_SM ||
    viewportLabel === VIEWPORT_MD ||
    viewportLabel === VIEWPORT_LG
  ) {
    configIsVisible = {
      rootMargin: `-${
        parseInt(variables.headerHeightSm, 10) - headerDimensionMargin
      }px 0px 0px 0px`,
    };
    configIsCollapsed = {
      rootMargin: `-${
        parseInt(variables.headerHeightSm, 10) - headerDimensionMargin
      }px 0px 0px 0px`,
    };
  } else {
    configIsVisible = {
      rootMargin: `-${
        parseInt(variables.headerHeightXl, 10) - headerDimensionMargin
      }px 0px 0px 0px`,
    };
    configIsCollapsed = {
      rootMargin: `-${
        parseInt(variables.headerHeightXl, 10) - headerDimensionMargin
      }px 0px 0px 0px`,
    };
  }

  // could not import from variables.legacy.css like variables.headerHeightXl for tests
  if (__TESTING__) {
    configIsVisible = {
      rootMargin: `-${60 - 12 * 2 - 1}px 0px 0px 0px`,
    };
    configIsCollapsed = {
      rootMargin: `-${60 - 12 + 2}px 0px 0px 0px`,
    };
  }

  return [configIsVisible, configIsCollapsed];
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'isMarketingPageReducedHeader' implicitly has an 'any' type. */
const getStyleByProps = ({ isMarketingPageReducedHeader }) => ({
  Wrapper: styles.Wrapper,
  Placeholder: classNames(styles.Placeholder, {
    [styles.MarketingPage]: isMarketingPageReducedHeader,
  }),
  IsSticky: styles.IsSticky,
  Header: '',
});

const Header = headerFactory({
  HeaderInner,
  placeholderId: HEADER_PLACEHOLDER_ID,
  observerConfigs: getObserverConfigsByProps,
  reInitObserverOnViewportLabelChange: [true, true],
  styles: getStyleByProps,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
  viewportLabel: windowStateSelector(state).viewport.label,
});

export default connect(mapStateToProps)(Header);
