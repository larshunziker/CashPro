import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/tests/helpers'. '/Users/bhs/code/work/rasch-s */
import { testLog } from '../../../../../../../shared/tests/helpers';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import { setNavigationVisible as setNavigationVisibleAction } from '../../../../../../../shared/actions/navigation';
import Link from '../../../../../../../common/components/Link';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Icon from '../../../Icon';
import SearchForm from '../../../SearchForm';
import ExpansionPanelMenu from './components/ExpansionPanelMenu';
import ExpansionPanelSubMenu from './components/ExpansionPanelSubMenu';
import MenuLinkItem from './components/MenuLinkItem';
import {
  PUBLICATION_HZ,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../../../shared/constants/publications';
import {
  NEWSLETTER_TRACKING_PARAMS,
  NEWSLETTER_URL,
  ROUTE_SUBSCRIPTIONS,
  SUBSCRIPTION_TRACKING_PARAMS,
} from '../../../../constants';
import { SEARCH_FORM_THEME_MENU } from '../../../SearchForm/constants';
import { TYPE_NAVIGATION_MENU_FADEOUT } from '../../constants';
import {
  EXPANSION_PANEL_TYPE_HZ,
  EXPANSION_PANEL_TYPE_SV,
} from './components/ExpansionPanelMenu/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { NavigationMenuProps } from './typings';

type NavigationMenuPropsInner = NavigationMenuProps & {
  routePathname: string;
  setNavigationVisible: (visibleNavigation: string) => void;
  visibleNavigation: string;
};

type MenuProps = {
  menu: Menu;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  closeNavigation: (KeyboardEvent) => void;
};

type SubMenusProps = {
  menu: Menu;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  closeNavigation: (KeyboardEvent) => void;
};

type SubmenuProps = {
  entry: MenuTreeItem;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  closeNavigation: (KeyboardEvent) => void;
};

const Menu = ({ menu, closeNavigation }: MenuProps): ReactElement | null => {
  if (
    (menu?.links?.edges?.length || 0) <= 0 ||
    !Array.isArray(menu?.links?.edges)
  ) {
    return null;
  }

  return (
    <nav
      className={grid.Container}
      data-testid="navigation-menu-navigation-wrapper"
    >
      <ul className={classNames(styles.MainNavList, grid.Row)}>
        <SubMenus menu={menu} closeNavigation={closeNavigation} />
      </ul>
    </nav>
  );
};

export const SubMenus = ({
  menu,
  closeNavigation,
}: SubMenusProps): ReactElement | null => {
  if (!menu || !menu.links || !menu.links.edges || !menu.links.edges.length) {
    return null;
  }

  return (
    <>
      {menu.links.edges.map(
        ({ node }: MenuTreeItemEdge, index: number): ReactElement => {
          const hasSubtree = (node?.subtree?.edges?.length || 0) > 0;

          return (
            <li
              key={index}
              className={classNames(grid.ColXs24, {
                [styles.SubMenuWrapper]: hasSubtree,
                [styles.NavListItem]: !hasSubtree,
                [grid.ColSm8]: hasSubtree,
                [grid.ColMd6]: hasSubtree,
              })}
            >
              {(hasSubtree && (
                <TestFragment data-testid="navigation-menu-submenu">
                  <ExpansionPanelSubMenu
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                    title={node?.link?.label}
                    isOpen={true}
                  >
                    {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItem> | undefined' is not assignable to type 'MenuTreeItem'. */}
                    <SubMenu entry={node} closeNavigation={closeNavigation} />
                  </ExpansionPanelSubMenu>
                </TestFragment>
              )) || (
                <TestFragment data-testid="navigation-menu-without-submenu">
                  {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItem> | undefined' is not assignable to type 'MenuTreeItem'. */}
                  <MenuLinkItem node={node} closeNavigation={closeNavigation} />
                </TestFragment>
              )}
            </li>
          );
        },
      )}
    </>
  );
};

export const SubMenu = ({
  entry,
  closeNavigation,
}: SubmenuProps): ReactElement | null => {
  if (
    !entry ||
    !entry.subtree ||
    !entry.subtree.edges ||
    !entry.subtree.edges.length
  ) {
    return null;
  }

  return (
    <ul className={styles.SubNavList} data-testid="navigation-menu-submenu">
      {entry.subtree.edges.map(
        ({ node }: MenuTreeItemEdge, index: number): ReactElement => (
          <li key={index} className={styles.LinkWrapper}>
            {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItem> | undefined' is not assignable to type 'MenuTreeItem'. */}
            <MenuLinkItem node={node} closeNavigation={closeNavigation} />
          </li>
        ),
      )}
    </ul>
  );
};

class NavigationMenu extends React.Component<NavigationMenuPropsInner> {
  constructor(props: NavigationMenuPropsInner) {
    super(props);
  }

  closeNavigation = (event: KeyboardEvent) => {
    if (
      this.props.visibleNavigation === null ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.ctrlKey
    ) {
      return;
    }

    testLog('navigation closed');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
    this.props.setNavigationVisible(null);
  };

  closeMenuHandler = (event: KeyboardEvent) => {
    if (event?.keyCode === 27) {
      this.closeNavigation(event);
    }
  };

  componentDidMount() {
    global.addEventListener('keydown', this.closeMenuHandler);
  }

  shouldComponentUpdate(nextProps: NavigationMenuPropsInner) {
    if (this.props.routePathname !== nextProps.routePathname) {
      // Always turn off navigation when this location changed
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
      this.props.setNavigationVisible(null);
    }

    if (nextProps.visibleNavigation === null) {
      return true;
    }

    return this.props.visibleNavigation !== nextProps.visibleNavigation;
  }

  componentWillUnmount() {
    global.removeEventListener('keydown', this.closeMenuHandler);
  }

  render(): ReactElement | null {
    const {
      setNavigationVisible,
      navigationMenuHZ,
      navigationMenuSV,
      publication,
    }: NavigationMenuPropsInner = this.props;

    return (
      <div
        className={styles.NavigationMenuWrapper}
        data-testid="navigation-wrapper"
      >
        <div>
          <div className={styles.Container}>
            <button
              data-testid="navigation-close-button"
              onClick={(): void => {
                testLog('navigation closed');
                setNavigationVisible(TYPE_NAVIGATION_MENU_FADEOUT);
              }}
              className={styles.ActionIconClose}
              aria-label="Navigation schliessen"
            >
              <Icon type="IconXMark" addClass={styles.IconXMark} />
            </button>
            <div className={styles.SearchFormWrapper}>
              <SearchForm
                placeholder="Suchbegriff eingeben"
                focusOnMount
                focusOnMountDelay={300}
                theme={SEARCH_FORM_THEME_MENU}
              />
            </div>
            <div className={styles.SubscribeLinkWrapper}>
              <Link
                className={styles.SubscribeLink}
                path={`${ROUTE_SUBSCRIPTIONS}${SUBSCRIPTION_TRACKING_PARAMS}`}
                onClick={(): void =>
                  setNavigationVisible(TYPE_NAVIGATION_MENU_FADEOUT)
                }
                label="Abonnieren"
              />

              <Link
                className={styles.SubscribeLink}
                path={NEWSLETTER_URL + NEWSLETTER_TRACKING_PARAMS}
                onClick={(): void =>
                  setNavigationVisible(TYPE_NAVIGATION_MENU_FADEOUT)
                }
                label="Newsletter"
              />
            </div>
          </div>

          {(navigationMenuHZ && (
            <TestFragment data-testid="navigation-menu-hz-wrapper">
              <ExpansionPanelMenu
                type={EXPANSION_PANEL_TYPE_HZ}
                isOpen={publication === PUBLICATION_HZ}
                ariaLabel="HZ Menü togglen"
                toggleOnChildrenClick={false}
              >
                <Menu
                  menu={navigationMenuHZ}
                  closeNavigation={this.closeNavigation}
                />
              </ExpansionPanelMenu>
            </TestFragment>
          )) ||
            null}

          {(navigationMenuSV && (
            <TestFragment data-testid="navigation-menu-sv-wrapper">
              <ExpansionPanelMenu
                type={EXPANSION_PANEL_TYPE_SV}
                isOpen={publication === PUBLICATION_SWISS_INSURANCE}
                ariaLabel="Bilanz Menü togglen"
                toggleOnChildrenClick={false}
              >
                <Menu
                  menu={navigationMenuSV}
                  closeNavigation={this.closeNavigation}
                />
              </ExpansionPanelMenu>
            </TestFragment>
          )) ||
            null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
});

const mapDispatchToProps = {
  setNavigationVisible: setNavigationVisibleAction,
};

export default compose<any, any>(connect(mapStateToProps, mapDispatchToProps))(
  NavigationMenu,
);
