import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import stopEvent from '../../../../../../../shared/helpers/stopEvent';
import {
  DEVICE_TYPE_ANDROID,
  getMobileOperatingSystem,
} from '../../../../../../../shared/helpers/utils';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import scrollStateSelector from '../../../../../../../shared/selectors/scrollStateSelector';
import searchStateSelector from '../../../../../../../shared/selectors/searchStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import { searchToggle } from '../../../../../../../shared/actions/search';
import Link from '../../../../../../../common/components/Link';
import SVGIcon from '../../../SVGIcon';
import IconMenu from '../../../SVGIcon/components/Menu';
import IconSearch from '../../../SVGIcon/components/Search';
import UtilityHeaderBar from '../../../UtilityBar/components/UtilityHeaderBar';
import HeaderLogo from '../HeaderLogo';
import HeaderUserLogin from '../HeaderUserLogin';
import { default as Navigation } from '../../../Navigation';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { getIsSocialBarVisible, navigateBack } from './helper';
import { PAGE_TYPE_MARKETING } from '../../../../../../../shared/constants/content';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZ,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../../../shared/constants/publications';
import { SVG_ICONS_TYPE_ARROW_BACK } from '../../../../../../../shared/constants/svgIcons';
import {
  NEWSLETTER_TRACKING_PARAMS,
  NEWSLETTER_URL,
  NEWSLETTER_URL_HZB,
  NEWSLETTER_URL_SV,
  ROUTE_SUBSCRIPTIONS,
  ROUTE_SUBSCRIPTIONS_BIL,
  ROUTE_SUBSCRIPTIONS_SWISS_INSURANCE,
  SUBSCRIPTION_TRACKING_PARAMS,
} from '../../../../constants';
import {
  LANDING_PAGE_BILANZ_HOME,
  LANDING_PAGE_HZB_HOME,
  LANDING_PAGE_SV_HOME,
} from '../../../../screens/LandingPage/constants';
import { TYPE_NAVIGATION_MENU_DEFAULT } from '../../../Navigation/constants';
import {
  UTILITYBAR_CONFIG,
  UTILITYBAR_CONFIG_BIL,
  UTILITYBAR_CONFIG_HZ,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../../UtilityBar/constants';
import { MIN_SCROLL_TOP_FOR_STICKY_HEADER } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { HeaderInnerProps } from './typings';

type HeaderInnerPropsInner = HeaderInnerProps & {
  handleSearchToggle: () => void;
  setNavigationVisible: (navigation: string | null) => void;
  searchToggle: (visibleSearch: boolean) => void;
  routeScreenReady: boolean;
  visibleSearch: boolean;
  scrollTop: number;
  isCollapsed: boolean;
  headerContentType: string;
  headerArticleData: ArticleData;
  routePathname: string;
  subtypeValue: string;
};

const HeaderInner = ({
  headerArticleData,
  headerContentType,
  handleSearchToggle,
  setNavigationVisible,
  subtypeValue,
  isCollapsed,
  routePathname,
  publication,
}: HeaderInnerPropsInner): ReactElement => {
  const { isSSR } = useSSRContext();
  const isSocialBarVisible = getIsSocialBarVisible(headerContentType);
  const isMarketingPageReducedHeader = subtypeValue === PAGE_TYPE_MARKETING;
  const isHome =
    routePathname === '/' ||
    routePathname === LANDING_PAGE_BILANZ_HOME ||
    routePathname === LANDING_PAGE_SV_HOME ||
    routePathname === LANDING_PAGE_HZB_HOME;

  const getSubscriptionPath = (publication: string) => {
    switch (publication) {
      case PUBLICATION_BIL:
        return ROUTE_SUBSCRIPTIONS_BIL;
      case PUBLICATION_SWISS_INSURANCE:
        return ROUTE_SUBSCRIPTIONS_SWISS_INSURANCE;
      default:
        return ROUTE_SUBSCRIPTIONS;
    }
  };

  const isPWABackButtonShown =
    (!isSSR &&
      !__TESTING__ &&
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"standalone"' can't be used to index type 'Navigator'. */
      (global?.navigator?.['standalone'] ||
        window.matchMedia('(display-mode: standalone)').matches) &&
      getMobileOperatingSystem() !== DEVICE_TYPE_ANDROID &&
      window.location.pathname !== '/') ||
    false;

  const [aboButtonIsPressed, setAboButtonIsPressed] = useState(false);
  return (
    <div
      data-testid="header-inner-wrapper"
      className={classNames('header-inner', styles.OuterWrapper, {
        [styles.MarketingPage]: isMarketingPageReducedHeader,
        [grid.GridCentered]: isMarketingPageReducedHeader,
      })}
    >
      <nav className={styles.Wrapper}>
        <div className={styles.Content}>
          <ul className={styles.LeftNav}>
            {isPWABackButtonShown && (
              <li className={styles.NavItem}>
                <button
                  className={styles.BackButton}
                  onClick={() => navigateBack()}
                >
                  <SVGIcon type={SVG_ICONS_TYPE_ARROW_BACK} />
                  <span className={styles.ActionLabel}>Zurück</span>
                </button>
              </li>
            )}
            <li className={styles.NavItem}>
              <button
                className={classNames(styles.MenuButton, {
                  [styles.Hidden]: isPWABackButtonShown,
                })}
                onClick={() =>
                  setNavigationVisible(TYPE_NAVIGATION_MENU_DEFAULT)
                }
                aria-label="Menü öffnen"
              >
                <IconMenu />
                <span className={styles.ActionLabel}>Menü</span>
              </button>
            </li>
            <li className={styles.NavItem}>
              <button
                className={styles.SearchButton}
                onClick={handleSearchToggle}
              >
                <IconSearch />
                <span className={styles.ActionLabel}>Suchen</span>
              </button>
            </li>
          </ul>
          <div
            className={classNames(styles.LogoWrapper, {
              [styles.isCollapsed]: isCollapsed && isHome,
              [styles.isVisible]: !isHome,
            })}
          >
            <HeaderLogo publication={publication} />
          </div>
          <ul className={styles.RightNav}>
            <li className={styles.NavItem}>
              <Link
                className={styles.AboButton}
                path={
                  getSubscriptionPath(publication) +
                  SUBSCRIPTION_TRACKING_PARAMS
                }
                label="Abo"
                aria-label="Abo"
                aria-pressed={aboButtonIsPressed}
                onClick={() => setAboButtonIsPressed(true)}
              />
            </li>
            <li className={styles.NavItem}>
              <Link
                className={styles.NewsletterButton}
                path={
                  publication === PUBLICATION_SWISS_INSURANCE
                    ? NEWSLETTER_URL_SV + NEWSLETTER_TRACKING_PARAMS
                    : publication === PUBLICATION_HZB
                    ? NEWSLETTER_URL_HZB + NEWSLETTER_TRACKING_PARAMS
                    : NEWSLETTER_URL + NEWSLETTER_TRACKING_PARAMS
                }
                label="Newsletter"
              />
            </li>
            <HeaderUserLogin />
          </ul>
        </div>
      </nav>
      <Navigation publication={publication} />
      <UtilityHeaderBar
        isScrolledToCollapse={isCollapsed}
        articleData={headerArticleData}
        isSocialBarVisible={isSocialBarVisible}
        enabledUtilities={
          (publication === PUBLICATION_BIL && UTILITYBAR_CONFIG_BIL) ||
          (publication === PUBLICATION_HZ && UTILITYBAR_CONFIG_HZ) ||
          UTILITYBAR_CONFIG
        }
        enabledOverlayUtilities={UTILITYBAR_OVERLAY_CONFIG}
      />
      <div className={styles.UtilityOverlayWrapper}>
        <div id="utility-bar-overlay" />
      </div>
    </div>
  );
};

const handleSearchToggle = (props: HeaderInnerPropsInner) => (event: Event) => {
  stopEvent(event);
  props.searchToggle(!props.visibleSearch);
};

const mapStateToProps = (state: ReduxState) => ({
  routeScreenReady: locationStateSelector(state).screenReady,
  scrollTop: scrollStateSelector(state).scrollTop,
  visibleSearch: searchStateSelector(state).visible,
  headerArticleData: headerStateSelector(state).articleData,
  headerContentType: headerStateSelector(state).contentType,
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
});

const mapDispatchToProps: Record<string, any> = {
  searchToggle,
  setNavigationVisible,
};

const extendWithHandlers = withHandlers({
  handleSearchToggle,
});

const updatePolicy = shouldUpdate<any>(
  (props: HeaderInnerPropsInner, nextProps: HeaderInnerPropsInner): boolean => {
    // do nothing if screenReady isn't true
    if (!nextProps.routeScreenReady) {
      return false;
    }

    // hide the search-bar-overlay when we scroll down to the point where the header gets sticky
    if (
      nextProps.isCollapsed &&
      nextProps.scrollTop < MIN_SCROLL_TOP_FOR_STICKY_HEADER &&
      props.visibleSearch
    ) {
      // Visibility state deactivated because iOS firing a scroll event
      // nextProps.setSearchVisible(false);
      return true;
    }

    return (
      props.publication !== nextProps.publication ||
      props.visibleSearch !== nextProps.visibleSearch ||
      props.isCollapsed !== nextProps.isCollapsed ||
      props.routeScreenReady !== nextProps.routeScreenReady ||
      props.subtypeValue !== nextProps.subtypeValue ||
      props.headerContentType !== nextProps.headerContentType
    );
  },
);

export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  extendWithHandlers,
  updatePolicy,
)(HeaderInner);
