import React, { ReactElement, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/tests/helpers'. '/Users/bhs/code/work/rasch-s */
import { testLog } from '../../../../../../../shared/tests/helpers';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import Link from '../../../../../../../common/components/Link';
import Button from '../../../ButtonWithLoading';
import ExpansionPanelMenu from './components/ExpansionPanelMenu';
// import { NavigationMenuType } from '../../../../../../shared/constants/enums';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { NavigationMenuProps } from './typings';

export type NavigationMenuPropsInner = NavigationMenuProps;

type MainLinksProps = {
  menuLinks: MenuTreeItemEdge[];
  currentPathname: string;
  closeMenuHandler: (event: KeyboardEvent | MouseEvent) => void;
};

const MainLinks = ({
  menuLinks,
  currentPathname,
  closeMenuHandler,
}: MainLinksProps): ReactElement => (
  <>
    {menuLinks?.map(
      ({ node }: MenuTreeItemEdge, index: number): ReactElement => {
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItemEdge>[]' is not assignable to type 'MenuTreeItemEdge[]'. */
        const subItems: MenuTreeItemEdge[] = node?.subtree?.edges || [];

        if (subItems.length > 0) {
          return (
            <li
              className={classNames(
                'track-menu',
                styles.MenuItem,
                styles.ExpandableMenuItem,
              )}
              key={`navigation-menu-item-${node?.id}-${index}`}
              data-track-action="click"
              data-track-element={`menu-category-${index}`}
              data-testid={`menu-item-${index}`}
            >
              <ExpansionPanelMenu
                title={node?.link?.label || ''}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                path={node?.link?.path}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
                boldTitle={node?.link?.isMainChannel}
                onLinkClick={closeMenuHandler}
                isHeaderLinkClickable
              >
                <ul>
                  {subItems.length > 0 && (
                    <MainLinks
                      menuLinks={subItems}
                      currentPathname={currentPathname}
                      closeMenuHandler={closeMenuHandler}
                    />
                  )}
                </ul>
              </ExpansionPanelMenu>
            </li>
          );
        } else {
          return (
            <li
              className={classNames(styles.MenuItem, styles.SingleMenuItem)}
              key={`navigation-menu-item-${node?.id}--${index}`}
              data-testid={`menu-item-${index}`}
            >
              {/* @ts-ignore TODO: TS2322 ->  Type '{ __typename? */}
              <Link
                onClick={closeMenuHandler}
                data-track-action="click"
                data-track-element={`menu-link-${index}`}
                className={classNames('track-menu', styles.MenuSubItem, {
                  [styles.ActiveLink]: node?.link?.path === currentPathname,
                  [styles.MainLink]: node?.link?.isMainChannel,
                })}
                {...node?.link}
              />
            </li>
          );
        }
      },
    )}
  </>
);

const NavigationMenu = ({
  primaryMenuLinks,
  secondaryMenuLinks,
}: NavigationMenuPropsInner): ReactElement => {
  const dispatch = useDispatch();
  const routePathname = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).locationBeforeTransitions.pathname,
  );
  const visibleNavigation = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => navigationStateSelector(state).visibleNavigation,
  );

  const navigationMenuRef = useRef(null);

  const closeMenuHandler = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if (!visibleNavigation) {
        return;
      }
      if (
        //@ts-ignore
        event?.keyCode === 27 ||
        event.type === 'click'
      ) {
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
        dispatch(setNavigationVisible(null));

        testLog('closeMenuHandler has beed called');
      }
    },
    [dispatch, visibleNavigation],
  );

  if (!primaryMenuLinks?.length && !secondaryMenuLinks?.length) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <div className={classNames(grid.Row, grid.NoGutters)}>
      <div
        ref={navigationMenuRef}
        className={classNames(styles.Wrapper, grid.Col24, grid.ColSm12, 'col')}
      >
        <div className={styles.ContentWrapper}>
          <div>
            <ul
              data-testid="menu-items-wrapper-secondary"
              className={styles.DecoratedMenu}
            >
              <MainLinks
                menuLinks={secondaryMenuLinks}
                currentPathname={routePathname}
                closeMenuHandler={closeMenuHandler}
              />
            </ul>
            <ul data-testid="menu-items-wrapper-primary">
              <MainLinks
                menuLinks={primaryMenuLinks}
                currentPathname={routePathname}
                closeMenuHandler={closeMenuHandler}
              />
            </ul>
          </div>
          <div className={styles.BankTeaser}>
            <p>
              Mit dem <span>gratis Börsenabo</span> bereits von virtuellem
              Portfolio, Watchlist und Realtime Kursen an der SIX Swiss Exchange
              profitieren.
            </p>
            <Link path="/boersenabo/basic" className={styles.AboButton}>
              <Button
                variant="primary"
                size="big"
                onClick={() => {
                  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
                  dispatch(setNavigationVisible(null));
                }}
              >
                <span>Gratis Börsenabo sichern</span>
              </Button>
            </Link>
            <Link path="/boersenabo">
              <Button
                variant="secondary"
                size="big"
                onClick={() => {
                  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
                  dispatch(setNavigationVisible(null));
                }}
              >
                <span>Alle Börsenabos ansehen</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
