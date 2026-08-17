import React, { memo } from 'react';
import { connect, useSelector } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import { MARKETING_PAGE } from '../../../../../../shared/actions/route';
import Breadcrumbs from '../../../Breadcrumbs';
import SVGIcon from '../../../SVGIcon';
import UtilityHeaderBar from '../../../UtilityBar/components/UtilityHeaderBar';
import MainLinks from '../MainLinks';
import { findMainChannelIndex } from '../MainLinks/findMainChannelIndex';
import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { SVG_ICONS_TYPE_MENU } from '../../../../../../../shared/constants/svgIcons';
import {
  UTILITYBAR_CONFIG_ARTICLE,
  UTILITYBAR_CONFIG_ARTICLE_GUIDE,
  UTILITYBAR_CONFIG_ARTICLE_NATIVE_ADVERTISING,
  UTILITYBAR_CONFIG_RR,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../../../../screens/Article/constants';
import {
  UTILITYBAR_CONFIG_EXPLAINING_ARTICLE,
  UTILITYBAR_OVERLAY_CONFIG_EXPLAINING_ARTICLE,
} from '../../../../screens/ExplainingArticles/constants';
import { NavigationMenuType } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { NavigationBarProps } from './typings';

export type NavigationBarPropsInner = NavigationBarProps & {
  headerContentType: string;
  headerArticleData: ArticleData;
  routePathname: string;
  routeScreenReady: boolean;
  routeVertical: string;
  setNavigationVisible: (visibleNavigation: string) => void;
  isInArticle: boolean;
  isInApp: boolean;
};

const NavigationBar = ({
  headerArticleData,
  headerContentType,
  isScrolledToCollapse,
  setNavigationVisible,
  routeVertical,
  routePathname,
  navigationPrimaryMenu,
  isInArticle,
  isInApp,
}: NavigationBarPropsInner) => {
  let enabledUtilities = UTILITYBAR_CONFIG_ARTICLE;
  let enabledOverlayUtilities = UTILITYBAR_OVERLAY_CONFIG_ARTICLE;

  if (headerContentType === EXPLAINING_ARTICLE_CONTENT_TYPE) {
    enabledUtilities = UTILITYBAR_CONFIG_EXPLAINING_ARTICLE;
    enabledOverlayUtilities = UTILITYBAR_OVERLAY_CONFIG_EXPLAINING_ARTICLE;
  }

  if (headerArticleData.subtypeValue === ARTICLE_TYPE_GUIDE) {
    enabledUtilities = UTILITYBAR_CONFIG_ARTICLE_GUIDE;
  }
  if (
    ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL === headerArticleData.subtypeValue ||
    ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE === headerArticleData.subtypeValue
  ) {
    enabledUtilities = UTILITYBAR_CONFIG_RR;
  }
  if (headerContentType === NATIVE_ADVERTISING_CONTENT_TYPE) {
    enabledUtilities = UTILITYBAR_CONFIG_ARTICLE_NATIVE_ADVERTISING;
  }

  const isSocialBarVisible = [
    ARTICLE_CONTENT_TYPE,
    NATIVE_ADVERTISING_CONTENT_TYPE,
    EXPLAINING_ARTICLE_CONTENT_TYPE,
  ].includes(headerContentType);

  const breadcrumbData = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => headerStateSelector(state).breadcrumbsData,
  );
  const mainChannelExists =
    findMainChannelIndex(navigationPrimaryMenu, routePathname) !== -1;
  return (
    <div
      className={classNames(styles.HomeNavigation, grid.HideForPrint, {
        [styles.MoveUp]: isInArticle && isScrolledToCollapse,
        [styles.Hidden]: isInApp && !isInArticle,
        [styles.BottomBorder]: isInApp,
      })}
    >
      <div className={classNames(grid.Container, styles.NavContainer)}>
        <nav
          className={classNames(styles.Bar, {
            [styles.Hidden]:
              routeVertical === MARKETING_PAGE ||
              (!isSocialBarVisible && isScrolledToCollapse),
          })}
        >
          <div className={styles.Menu} data-testid="menu">
            {!isInApp && (
              <button
                onClick={() => {
                  setNavigationVisible(NavigationMenuType.DEFAULT);
                  tealiumTrackEvent({
                    type: 'link',
                    payload: { event_name: 'menu_open' },
                  });
                }}
                className={classNames(styles.AllContents, {
                  [styles.Hidden]: isSocialBarVisible && isScrolledToCollapse,
                })}
                data-testid="menu-button"
              >
                <SVGIcon type={SVG_ICONS_TYPE_MENU} className={styles.Icon} />
                <span
                  className={classNames(
                    grid.HiddenSmDown,
                    styles.AllContentsLabel,
                    {
                      [styles.Hidden]:
                        isSocialBarVisible && isScrolledToCollapse,
                    },
                  )}
                >
                  Menü
                </span>
              </button>
            )}

            {(isInArticle || (breadcrumbData && !mainChannelExists)) && (
              <Breadcrumbs
                isCollapsed={isSocialBarVisible && isScrolledToCollapse}
                isInApp={isInApp}
                pageUrl={routePathname}
              />
            )}
            {!isInApp &&
              !isInArticle &&
              (!breadcrumbData || mainChannelExists) && (
                <MainLinks
                  menu={navigationPrimaryMenu}
                  routePathname={routePathname}
                />
              )}
          </div>

          <div
            className={classNames(styles.UtilityHeaderBar, grid.HiddenSmDown)}
          >
            {!__TESTING__ && (
              <UtilityHeaderBar
                isScrolledToCollapse={isScrolledToCollapse}
                articleData={headerArticleData}
                isSocialBarVisible={isSocialBarVisible}
                enabledUtilities={enabledUtilities}
                enabledOverlayUtilities={enabledOverlayUtilities}
                showTitle={false}
                hideIconLabel
              />
            )}
          </div>
        </nav>
      </div>

      <div
        className={classNames(
          'utility-bar-wrapper',
          styles.UtilityBarWrapper,
          grid.HideForPrint,
        )}
      >
        <div id="utility-bar-overlay" />
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  routeVertical: locationStateSelector(state).vertical,
  navigationStateNavigationVisibility:
    navigationStateSelector(state).visibleNavigation,
  headerArticleData: headerStateSelector(state).articleData,
  headerContentType: headerStateSelector(state).contentType,
});

const mapDispatchToProps = {
  setNavigationVisible,
};

export default compose<any, any>(connect(mapStateToProps, mapDispatchToProps))(
  memo<NavigationBarProps>(NavigationBar),
);
