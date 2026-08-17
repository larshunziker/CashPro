import React, { Component, MouseEvent, ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { useQuery } from '@apollo/client';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/tests/helpers'. '/Users/bhs/code/work/rasch-s */
import { testLog } from '../../../../../../../shared/tests/helpers';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import Link from '../../../../../../../common/components/LinkLegacy';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Error from '../../../Error';
import ExpansionPanel from '../../../ExpansionPanel';
import Paragraphs from '../../../Paragraphs';
import MenuHeader from './components/MenuHeader';
import { MENU_OVERLAY } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { NAVIGATION_MENU_ROUTE } from './queries';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { NavigationMenuProps } from './typings';

export type NavigationMenuPropsInner = NavigationMenuProps & {
  activeMainChannel: string;
  routePathname: string;
  setNavigationVisible: (visibleNavigation: string) => void;
  visibleNavigation: string;
};

type NavigationMenuQueryComponent = Query & {
  loading: boolean;
  environment: { routeByPath: { object: LandingPage } };
};

type MainLinksProps = {
  menuLinks: Array<MenuTreeItemEdge>;
  activeMainChannel: string;
  currentPathname: string;
  closeMenuHandler: (event: KeyboardEvent | MouseEvent) => void;
};

const MainLinks = ({
  menuLinks,
  activeMainChannel,
  currentPathname,
  closeMenuHandler,
}: MainLinksProps): any => {
  return menuLinks.map(
    ({ node }: MenuTreeItemEdge, index: number): ReactElement => {
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItemEdge>[]' is not assignable to type 'MenuTreeItemEdge[]'. */
      const subItems: Array<MenuTreeItemEdge> = node?.subtree?.edges || [];
      const outerIndex = index;

      if (subItems.length > 0) {
        return (
          <li
            className={classNames('track-menu', styles.MenuItem)}
            key={`navigation-menu-item-${index}`}
            data-track-action="click"
            data-track-element={`menu-category-${index}`}
            data-testid={`menu-item-${index}`}
          >
            <ExpansionPanel
              title={node?.link?.label || ''}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
              boldTitle={node?.link?.isMainChannel}
              isOpen={
                node?.link?.label === activeMainChannel?.replace(/\s/g, '')
              }
              toggleOnChildrenClick={false}
            >
              <ul className={grid.ColOffsetSm1}>
                {subItems.length > 0 &&
                  subItems.map(({ node }: MenuTreeItemEdge, index: number) => {
                    return (
                      <li
                        className={styles.MenuItem}
                        key={`navigation-menu-sub-item-${index}`}
                      >
                        <Link
                          onClick={closeMenuHandler}
                          className={classNames(
                            'track-menu',
                            styles.MenuSubItem,
                            {
                              [styles.ActiveLink]:
                                node?.link?.path === currentPathname,
                            },
                          )}
                          data-track-action="click"
                          data-track-element={`menu-link-${outerIndex}-${index}`}
                          /* @ts-ignore TODO: TS2322 ->  Type 'MenuLink | null' is not assignable to type 'LinkType | MenuLink | undefined'. */
                          link={node?.link || null}
                        >
                          {node?.link?.label || ''}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </ExpansionPanel>
          </li>
        );
      } else {
        return (
          <li
            className={classNames(styles.MenuItem, styles.SingleMenuItem)}
            key={`navigation-menu-item-${index}`}
            data-testid={`menu-item-${index}`}
          >
            <Link
              onClick={closeMenuHandler}
              data-track-action="click"
              data-track-element={`menu-link-${index}`}
              className={classNames('track-menu', styles.MenuSubItem, {
                [styles.ActiveLink]: node?.link?.path === currentPathname,
              })}
              /* @ts-ignore TODO: TS2322 ->  Type 'MenuLink | null' is not assignable to type 'LinkType | MenuLink | undefined'. */
              link={node?.link || null}
            >
              {node?.link?.label || ''}
            </Link>
          </li>
        );
      }
    },
  );
};

const NavigationMenuComponent = () => {
  const { data, loading, error } = useQuery<NavigationMenuQueryComponent>(
    NAVIGATION_MENU_ROUTE,
  );

  if (loading || !data?.environment?.routeByPath?.object) {
    return null;
  }
  if (error) {
    return __DEVELOPMENT__ ? (
      <Error msg={`Apollo <ApolloQuery> component error: ${error}`} />
    ) : null;
  }

  const landingPage: LandingPage | null =
    data?.environment?.routeByPath?.object || null;

  return (
    <>
      {(Array.isArray(landingPage?.body) && landingPage.body.length > 0 && (
        <Paragraphs
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ParagraphInterface>[]' is not assignable to type 'ParagraphInterface[]'. */
          pageBody={landingPage.body}
          origin={MENU_OVERLAY}
          hasContainer={false}
        />
      )) ||
        null}
    </>
  );
};

class NavigationMenu extends Component<NavigationMenuPropsInner> {
  constructor(props: NavigationMenuPropsInner) {
    super(props);
    this.closeMenuHandler = this.closeMenuHandler.bind(this);
  }

  componentDidMount() {
    global.addEventListener('keydown', this.closeMenuHandler);
  }

  closeMenuHandler(event: KeyboardEvent | MouseEvent) {
    if (
      !this.props.visibleNavigation ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.ctrlKey
    ) {
      return;
    }

    //@ts-ignore
    if (event?.keyCode === 27) {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event: 'menu_close_esc',
        },
      });
    }

    if (
      //@ts-ignore
      event?.keyCode === 27 ||
      event === undefined ||
      //@ts-ignore
      event?.keyCode === undefined
    ) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
      this.props.setNavigationVisible(null);

      testLog('closeMenuHandler has beed called');
    }
  }

  componentWillUnmount() {
    global.removeEventListener('keydown', this.closeMenuHandler);
  }

  render(): ReactElement | null {
    const {
      menuLinks,
      activeMainChannel,
      isVisible,
      visibleNavigation,
      routePathname,
    } = this.props;

    if (!menuLinks || !menuLinks.length) {
      return null;
    }

    return (
      <div className={styles.Wrapper}>
        {visibleNavigation && (
          <TestFragment data-testid="menuheader-wrapper">
            <MenuHeader menuCloseHandler={this.closeMenuHandler} />
          </TestFragment>
        )}
        <div className={styles.ContentWrapper}>
          <div className={classNames(grid.Container, styles.MarginTop)}>
            <div className={grid.Row}>
              <ul
                data-testid="menu-items-wrapper"
                className={classNames(grid.ColSm17, styles.MenuListWrapper)}
              >
                <MainLinks
                  menuLinks={menuLinks}
                  activeMainChannel={activeMainChannel}
                  currentPathname={routePathname}
                  closeMenuHandler={this.closeMenuHandler}
                />
              </ul>
              <div className={grid.ColSm7}>
                {!__TESTING__ && isVisible && <NavigationMenuComponent />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state)
    .activeMainChannel as ActiveMainChannel,
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
});

const mapDispatchToProps = {
  setNavigationVisible,
};

export default compose<any, any>(connect(mapStateToProps, mapDispatchToProps))(
  NavigationMenu,
);
