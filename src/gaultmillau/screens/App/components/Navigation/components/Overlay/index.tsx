import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import classNames from 'classnames';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../../../common/components/LinkLegacy';
import Icon from '../../../Icon';
import LanguageSwitch from '../../components/LanguageSwitch';
import MenuFooter from './components/MenuFooter';
import MenuTeaser from './components/MenuTeaser';
import {
  CloseLink,
  MapLink,
  NewsletterLink,
  ShopLink,
} from '../../../Header/components/HeaderInner/components/MenuItems';
import { ARTICLE_TYPE_BLOG_Q, BLOG_DATA } from '../../../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import gaultMillauIcons from '../../../../assets/styles/gaultMillau.legacy.css';
import styles from './styles.legacy.css';
import { OverlayProps } from './typings';

type OverlayPropsInner = OverlayProps & {
  visibleSubmenuId: number;
  setVisibleSubmenuId: Function;
  renderMainLinks: Function;
  renderSubLinks: Function;
  visibleNavigation: boolean;
  linkClickHandler: Function;
  language: string;
};

const Overlay = ({
  navigationToggle,
  navigationPrimaryMenu,
  renderMainLinks,
  language = 'de',
}: OverlayPropsInner) => {
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  const NavigationToggleWrapper = ({ children, doToggle = true }) => (
    <div
      className={styles.NavigationToggleWrapper}
      role="button"
      onClick={doToggle ? navigationToggle : undefined}
      aria-hidden="true"
      tabIndex={0}
    >
      {children}
    </div>
  );

  return (
    <div
      className={styles.NavigationMenuWrapper}
      data-testid="navigation-wrapper"
    >
      <div>
        <div className={classNames('main-navigation', styles.Wrapper)}>
          <div className={styles.ContainerWrapper}>
            <div className={classNames(grid.Row, styles.Header)}>
              {/* LANGUAGE SWITCH */}
              <div
                className={classNames(
                  grid.ColXs12,
                  grid.ColXl9,
                  styles.MenuLeft,
                )}
              >
                <CloseLink handleNavigationToggle={navigationToggle} />
              </div>
              <div
                className={classNames(
                  grid.ColXs12,
                  grid.ColXl10,
                  styles.MenuRight,
                )}
              >
                <LanguageSwitch />
              </div>
            </div>

            <div
              className={classNames(
                grid.Row,
                styles.NaviLinksWrapper,
                grid.HiddenSmUp,
              )}
            >
              <NavigationToggleWrapper>
                <MapLink isRight={false} language={language} />
              </NavigationToggleWrapper>
              <NavigationToggleWrapper>
                <NewsletterLink isRight={false} language={language} />
              </NavigationToggleWrapper>
              <NavigationToggleWrapper doToggle={false}>
                {language === 'de' && (
                  <ShopLink isRight={false} language={language} />
                )}
              </NavigationToggleWrapper>
            </div>

            <div className={grid.Row}>
              <div
                className={classNames(
                  styles.MainNavList,
                  grid.ColSm15,
                  grid.ColXl10,
                )}
              >
                {renderMainLinks(navigationPrimaryMenu)}
                <MenuFooter />
              </div>

              <div
                className={classNames(
                  styles.Divider,
                  grid.ColSm1,
                  grid.HiddenSmDown,
                )}
              >
                &nbsp;
              </div>
              <div className={classNames(grid.ColSm8, grid.HiddenSmDown)}>
                <NavigationToggleWrapper>
                  <MenuTeaser />
                </NavigationToggleWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const createFormattedTrackingLabel = (node: MenuTreeItem) =>
  (node &&
    node.link &&
    node.link.label &&
    node.link.label.replace(/\s+/g, '-').toLowerCase()) ||
  '';

export const MainLinks =
  ({
    /* @ts-ignore TODO: TS7031 ->  Binding element 'visibleSubmenuId' implicitly has an 'any' type. */
    visibleSubmenuId,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'navigationToggle' implicitly has an 'any' type. */
    navigationToggle,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'linkClickHandler' implicitly has an 'any' type. */
    linkClickHandler,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'renderSubLinks' implicitly has an 'any' type. */
    renderSubLinks,
  }) =>
  (menu: Menu): Array<ReactElement> => {
    if (!menu || !menu.links || !menu.links.edges || !menu.links.edges.length) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>[]'. */
      return null;
    }

    return (
      menu.links.edges
        /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<MenuTreeItemEdge>'. */
        .filter(({ node }) => node.link.label)
        /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<MenuTreeItemEdge>'. */
        .map(({ node }, index) => {
          const isActive = index === visibleSubmenuId;

          return (
            <div
              key={`overlay-menu-link-${node.link.label}`}
              data-index={index}
              data-testid="main-link-item"
              className={classNames(
                `menu-link-${index}-${createFormattedTrackingLabel(node)}`,
                styles.NavListItem,
                {
                  [styles.Active]: isActive,
                },
              )}
            >
              {/* we need to add onClick handlers on a wrapping element - otherwise the router will do a full refresh */}

              <span
                onClick={navigationToggle}
                role="link"
                tabIndex={-3}
                aria-hidden="true"
              >
                <Link
                  className={classNames(styles.Link, {
                    [styles.Active]: isActive,
                  })}
                  link={node.link}
                >
                  {((node.link.path ===
                    `/${BLOG_DATA[ARTICLE_TYPE_BLOG_Q].url}` ||
                    node.link.path ===
                      `/fr/${BLOG_DATA[ARTICLE_TYPE_BLOG_Q].url}`) && (
                    <>
                      <span className={styles.BlogQFirstWord}>Bella</span>&nbsp;
                      <span className={styles.BlogQSecondWord}>Italia</span>
                    </>
                  )) ||
                    node.link.label}
                </Link>
              </span>

              {node &&
                node.subtree &&
                node.subtree.edges &&
                Array.isArray(node.subtree.edges) &&
                node.subtree.edges.length > 0 && (
                  <>
                    <a
                      href="#toggleSubnavi"
                      className={styles.ToggleSubnavi}
                      onClick={linkClickHandler(index)}
                    >
                      <Icon
                        type={isActive ? 'IconChevronUp' : 'IconChevronDown'}
                        addClass={styles.ToggleIcon}
                        iconsOverride={gaultMillauIcons}
                      />
                    </a>
                    <div className={styles.SubNav}>
                      {renderSubLinks(node, index)}
                    </div>
                  </>
                )}
            </div>
          );
        })
    );
  };

export const SubLinks =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (props) => (entry: MenuTreeItem, parentIndex: number) => {
    if (
      !entry ||
      !entry.subtree ||
      !entry.subtree.edges ||
      !entry.subtree.edges.length
    ) {
      return null;
    }

    /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<MenuTreeItemEdge>'. */
    return entry.subtree.edges.map(({ node }, index: number) => (
      <div
        key={index}
        data-testid="sub-link-item"
        className={classNames(
          `menu-sublink-${parentIndex}-${index}-${createFormattedTrackingLabel(
            node,
          )}`,
          styles.SubNavListItem,
          styles.Active,
        )}
      >
        {/* we need to add onClick handlers on a wrapping element - otherwise the router will do a full refresh */}
        <span
          onClick={props.navigationToggle}
          role="link"
          tabIndex={-4}
          aria-hidden="true"
        >
          <Link link={(node && node.link) || null} className={styles.SubLink}>
            {node && node.link && node.link.label}
          </Link>
        </span>
      </div>
    ));
  };

const withRenderSubLinks = withHandlers({
  renderSubLinks: SubLinks,
});

const withRenderMainLinks = withHandlers({
  renderMainLinks: MainLinks,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
});

const updatePolicy = shouldUpdate<any>(
  (props: OverlayPropsInner, nextProps: OverlayPropsInner) => {
    if (nextProps.visibleNavigation === false) {
      nextProps.setVisibleSubmenuId(null);
      return true;
    }

    return (
      props.navigationPrimaryMenu !== nextProps.navigationPrimaryMenu ||
      props.navigationSecondaryMenu !== nextProps.navigationSecondaryMenu ||
      props.visibleNavigation !== nextProps.visibleNavigation ||
      props.visibleSubmenuId !== nextProps.visibleSubmenuId
    );
  },
);

const extendWithHandlers = withHandlers({
  linkClickHandler:
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    (props: OverlayPropsInner) => (index: number) => (event) => {
      event.preventDefault();
      if (props.visibleSubmenuId !== index) {
        props.setVisibleSubmenuId(index);
      } else {
        props.setVisibleSubmenuId(-1);
      }
    },
});

export default compose<any, any>(
  withState<Object, any, string, string>(
    'visibleSubmenuId',
    'setVisibleSubmenuId',
    null,
  ),
  connect(mapStateToProps),
  withRenderSubLinks,
  extendWithHandlers,
  withRenderMainLinks,
  updatePolicy,
)(Overlay);
