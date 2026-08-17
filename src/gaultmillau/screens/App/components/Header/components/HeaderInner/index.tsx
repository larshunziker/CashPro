import React, { MouseEvent, ReactElement } from 'react';
import { IntlShape, defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-transition-group'. '/Users/bhs/code/work/rasch-stack/node_modules/r */
import { CSSTransition } from 'react-transition-group';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import classNames from 'classnames';
import {
  DEVICE_TYPE_ANDROID,
  getMobileOperatingSystem,
} from '../../../../../../../shared/helpers/utils';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import selectLocationState from '../../../../../../../shared/selectors/locationStateSelector';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import scrollStateSelector from '../../../../../../../shared/selectors/scrollStateSelector';
import searchStateSelector from '../../../../../../../shared/selectors/searchStateSelector';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/withWebkitCheck'. '/Users/bhs/code */
import withWebkitCheck from '../../../../../../../shared/decorators/withWebkitCheck';
import { setNavigationVisible as navigationToggleAction } from '../../../../../../../shared/actions/navigation';
import { searchToggle as searchToggleAction } from '../../../../../../../shared/actions/search';
import { HOME, HOME_FR } from '../../../../../../shared/actions/route';
import Logo from '../../../Logo';
import Navigation from '../../../Navigation';
import RefetchGqlDataLink from '../../../RefetchGqlDataLink';
import SVGIcon from '../../../SVGIcon';
import UtilityHeaderBar from '../../../UtilityBar/components/UtilityHeaderBar';
import SearchForm, {
  TYPE_SEARCH_FORM_DEFAULT,
} from '../../../Search/components/SearchForm';
import { DEFAULT_LANGUAGE } from '../../../Navigation/components/LanguageSwitch';
import {
  MapLink,
  MenuLink,
  NewsletterLink,
  SearchLink,
} from './components/MenuItems';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { SVG_ICONS_TYPE_ARROW_BACK } from '../../../../../../../shared/constants/svgIcons';
import { URL_DE_SEARCH, URL_FR_SEARCH } from '../../../../../App/constants';
import { UTILITY_TYPE_SHARE } from '../../../UtilityBar/constants';
import {
  MAP_URL_DE,
  MAP_URL_FR,
  NEWSLETTER_URL_DE,
  NEWSLETTER_URL_FR,
  UTILITYHEADERBAR_OVERLAY_CONFIG,
} from './constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { HeaderInnerProps } from './typings';

type HeaderInnerPropsInner = HeaderInnerProps & {
  handleNavigationToggle: (event: MouseEvent) => void;
  handleSearchToggle: (event: MouseEvent) => void;
  handleBrandClick: () => void;
  routeVertical: string;
  routeScreenReady: boolean;
  routePathname: string;
  visibleNavigation: string;
  menu: Record<string, any>;
  isSticky: boolean;
  navigationToggle: (isNavigationVisible: boolean) => void;
  scrollScrollTop: number;
  visibleSearch: boolean;
  language: string;
  searchToggle: (visibleSearch: boolean) => void;
  isWebkit: boolean;
  isPWABackButtonVisible: boolean;
  setPWABackButtonVisible: (isPWABackButtonVisible: boolean) => void;
  elementRef: HTMLElement;
  setElementRef: (element: HTMLElement) => void;
  handleRef: () => void;
  intl: IntlShape;
  headerArticleData: ArticleData;
  isHome?: boolean;
};

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

export const headerInnerMsgs: Record<string, any> = defineMessages({
  searchPlaceholder: {
    id: 'app.header.search',
    description: 'The title of the search action in the header',
    defaultMessage: 'Suche',
  },
});

const HeaderInner = ({
  handleNavigationToggle,
  handleRef,
  handleSearchToggle,
  handleBrandClick,
  intl,
  routeVertical,
  routePathname,
  visibleSearch,
  params,
  language,
  isSinglePage,
  isVisible,
  visibleNavigation,
  isPWABackButtonVisible,
  isCollapsed,
  headerArticleData,
  isHome: hasToHideUtilityBar = false,
}: HeaderInnerPropsInner): ReactElement => {
  const { isSSR } = useSSRContext();

  const navigateBack = () => {
    if (!isSSR) {
      if (global?.history?.state) {
        global.history.back();
      } else {
        window.location.href = '/';
      }
    }
  };
  const isHome = routeVertical === HOME || routeVertical === HOME_FR;

  return (
    <div className={'header-inner'} ref={handleRef}>
      <div className={styles.Wrapper}>
        <div
          className={classNames(styles.InnerWrapper, {
            [styles.OnHomeAndTop]: isHome && (!isCollapsed || isVisible),
            [styles.NavigationOpen]: visibleNavigation,
          })}
        >
          <div className={classNames(grid.Container, styles.Container)}>
            <div className={classNames(styles.ActionGroup, grid.Row)}>
              <button
                className={classNames(styles.BackLink, {
                  [styles.Visible]: isPWABackButtonVisible || false,
                })}
                onClick={() => navigateBack()}
                aria-label="Zurück"
              >
                <SVGIcon type={SVG_ICONS_TYPE_ARROW_BACK} />
                <span>Zurück</span>
              </button>

              <div
                className={classNames(
                  grid.ColXs8,
                  styles.Menu,
                  grid.HideForPrint,
                )}
              >
                {/* MENU */}
                {!isSinglePage && (
                  <MenuLink handleNavigationToggle={handleNavigationToggle} />
                )}

                {/* SEARCH */}
                {!visibleNavigation && !isSinglePage && (
                  <SearchLink
                    visibleSearch={visibleSearch}
                    handleSearchToggle={handleSearchToggle}
                    intl={intl}
                    headerInnerMsgs={headerInnerMsgs}
                    addClass={classNames(grid.HiddenSmDown, grid.HideForPrint)}
                  />
                )}
              </div>

              <div className={classNames(grid.ColXs8, styles.HeaderLogo)}>
                <RefetchGqlDataLink
                  path={`${language === 'fr' ? '/fr' : '/'}`}
                  className={styles.BrandWrapper}
                  onClick={handleBrandClick}
                  aria-label="Zur Startseite"
                >
                  <Logo />
                </RefetchGqlDataLink>
              </div>

              <div
                className={classNames(
                  grid.ColXs8,
                  styles.Menu,
                  styles.FlexEnd,
                  grid.HideForPrint,
                )}
              >
                {/* MAP */}
                {!visibleNavigation && !isSinglePage && (
                  <MapLink
                    language={language}
                    isActive={
                      routePathname === MAP_URL_FR ||
                      routePathname === MAP_URL_DE
                    }
                    addClass={grid.HiddenSmDown}
                  />
                )}

                {/* Newsletter */}
                {!visibleNavigation && !isSinglePage && (
                  <NewsletterLink
                    language={language}
                    isActive={
                      routePathname === NEWSLETTER_URL_FR ||
                      routePathname === NEWSLETTER_URL_DE
                    }
                    addClass={grid.HiddenSmDown}
                  />
                )}
                {/* SEARCH on Mobile Screens */}
                {!visibleNavigation && !isSinglePage && (
                  <SearchLink
                    visibleSearch={visibleSearch}
                    handleSearchToggle={handleSearchToggle}
                    intl={intl}
                    headerInnerMsgs={headerInnerMsgs}
                    isRight={true}
                    addClass={grid.HiddenSmUp}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
      {headerArticleData && !hasToHideUtilityBar && (
        <>
          <UtilityHeaderBar
            overlayTitle={
              language === DEFAULT_LANGUAGE
                ? 'Artikel teilen'
                : 'Partager l’article'
            }
            /* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'boolean'. */
            isScrolledToCollapse={isCollapsed}
            articleData={headerArticleData}
            isSocialBarVisible={true}
            enabledUtilities={[UTILITY_TYPE_SHARE]}
            enabledOverlayUtilities={UTILITYHEADERBAR_OVERLAY_CONFIG}
          />
          <div className={styles.UtilityOverlayWrapper}>
            <div id="utility-bar-overlay" />
          </div>
        </>
      )}

      {/* SearchForm solution */}
      {visibleSearch && (
        <CSSTransition
          classNames={{
            appear: styles.ToggleSearchAppear,
            appearActive: styles.ToggleSearchAppearActive,
            enter: styles.ToggleSearchAppear,
            enterActive: styles.ToggleSearchAppearActive,
            exit: styles.ToggleSearchLeave,
            exitActive: styles.ToggleSearchLeaveActive,
          }}
          appear
          timeout={300}
        >
          <div className={styles.FixSearchForm}>
            <SearchForm
              initialQuery={params?.query}
              placeholder={intl.formatMessage(
                headerInnerMsgs.searchPlaceholder,
              )}
              focusOnMount
              component={TYPE_SEARCH_FORM_DEFAULT}
              onSubmitRoute={language === 'fr' ? URL_FR_SEARCH : URL_DE_SEARCH}
            />
          </div>
        </CSSTransition>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------------- //
// LOGIC
// ---------------------------------------------------------------------------------- //

const stopEvent = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation(); // don't let it bubble up to App/index.js:handleRootClick
};

const handleSearchToggle =
  (props: HeaderInnerPropsInner) => (event: MouseEvent) => {
    stopEvent(event);
    props.searchToggle(!props.visibleSearch);

    // force to close overlay on search bar gets visible
    if (!props.visibleSearch && props.visibleNavigation) {
      props.navigationToggle(false);
    }
  };

const handleNavigationToggle =
  (props: HeaderInnerPropsInner) => (event: MouseEvent) => {
    stopEvent(event);
    props.navigationToggle(!props.visibleNavigation);

    // force to close search bar on navigation overlay gets visible
    if (!props.visibleNavigation && props.visibleSearch) {
      props.searchToggle(false);
    }
  };

const handleBrandClick = (props: HeaderInnerPropsInner) => () => {
  props.navigationToggle(false);
};

// ---------------------------------------------------------------------------------- //
// RECOMPOSE
// ---------------------------------------------------------------------------------- //

const mapStateToProps = (state: ReduxState) => ({
  routeVertical: selectLocationState(state).vertical,
  routeScreenReady: selectLocationState(state).screenReady,
  routePathname: selectLocationState(state).locationBeforeTransitions.pathname,
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
  scrollScrollTop: scrollStateSelector(state).scrollTop,
  visibleSearch: searchStateSelector(state).visible,
  language: settingsStateSelector(state).language,
  headerArticleData: headerStateSelector(state).articleData,
});

const mapDispatchToProps: Record<string, any> = {
  navigationToggle: navigationToggleAction,
  searchToggle: searchToggleAction,
};

const extendWithHandlers = withHandlers({
  handleSearchToggle,
  handleNavigationToggle,
  handleBrandClick,
});

const extendWithHandleRef = withHandlers({
  handleRef: (props: HeaderInnerPropsInner) => (element: HTMLElement) => {
    if (element && !props.elementRef) {
      props.setElementRef(element);
    }
  },
});

const updatePolicy = shouldUpdate<any>(
  (props: HeaderInnerPropsInner, nextProps: HeaderInnerPropsInner): boolean => {
    // do nothing if screenReady isn't true
    if (!nextProps.routeScreenReady) {
      return false;
    }

    const isPWABackButtonShown =
      (__CLIENT__ &&
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"standalone"' can't be used to index type 'Navigator'. */
        (global?.navigator?.['standalone'] ||
          window.matchMedia('(display-mode: standalone)').matches) &&
        getMobileOperatingSystem() !== DEVICE_TYPE_ANDROID &&
        window.location.pathname !== '/') ||
      false;

    if (isPWABackButtonShown !== nextProps.isPWABackButtonVisible) {
      props.setPWABackButtonVisible(isPWABackButtonShown);
      return true;
    }

    return (
      props.isSticky !== nextProps.isSticky ||
      props.visibleNavigation !== nextProps.visibleNavigation ||
      props.visibleSearch !== nextProps.visibleSearch ||
      props.isVisible !== nextProps.isVisible ||
      props.routeVertical !== nextProps.routeVertical ||
      props.scrollScrollTop !== nextProps.scrollScrollTop ||
      props.routeScreenReady !== nextProps.routeScreenReady ||
      props.isPWABackButtonVisible !== nextProps.isPWABackButtonVisible ||
      props.isCollapsed !== nextProps.isCollapsed
    );
  },
);

export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withState<Record<string, any>, any, any, string>(
    'elementRef',
    'setElementRef',
    null,
  ),
  withState<Record<string, any>, any, any, string>(
    'isPWABackButtonVisible',
    'setPWABackButtonVisible',
    false,
  ),
  extendWithHandleRef,
  withWebkitCheck,
  extendWithHandlers,
  updatePolicy,
)(HeaderInner);
