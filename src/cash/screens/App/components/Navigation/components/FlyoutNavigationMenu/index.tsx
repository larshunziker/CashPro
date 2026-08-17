import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/tests/helpers'. '/Users/bhs/code/work/rasch-s */
import { testLog } from '../../../../../../../shared/tests/helpers';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import NavigationAdIntegration from './components/NavigationAdIntegration';
import { NavigationMenuType } from '../../../../../../shared/constants/enums';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { NavigationMenuProps } from './typings';

// jest.mock('../../../../../../../common/components/Link');
// jest.mock('../../../Icon');
// jest.mock('./components/NavigationAdIntegration');

export type NavigationMenuPropsInner = NavigationMenuProps & {
  closeFlyoutMenuDebounced?: (() => void) & {
    cancel?: () => void;
  };
  cancelToggleFlyoutMenu?: () => void;
};

const NavigationFlyoutMenu = ({
  primaryMenuLinks,
  closeFlyoutMenuDebounced,
  cancelToggleFlyoutMenu,
}: NavigationMenuPropsInner): ReactElement => {
  const dispatch = useDispatch();
  const visibleNavigation = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => navigationStateSelector(state).visibleNavigation,
  );
  const activeVerticalMenu = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => navigationStateSelector(state).activeVerticalMenu,
  );

  const flyoutNavigationMenuRef = useRef(null);

  const closeMenu = useCallback(() => {
    if (!visibleNavigation) {
      return;
    }
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
    dispatch(setNavigationVisible(null));
    testLog('closeMenu handler handler has been called');
  }, [dispatch, visibleNavigation]);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event?.keyCode === 27) {
        closeMenu();
      }
    },
    [closeMenu],
  );

  const handleMouseLeave = useCallback(() => {
    if (visibleNavigation) {
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      closeFlyoutMenuDebounced();
    }
  }, [visibleNavigation, closeFlyoutMenuDebounced]);

  const handleMouseEnter = useCallback(() => {
    if (cancelToggleFlyoutMenu) {
      cancelToggleFlyoutMenu();
    }
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    if (closeFlyoutMenuDebounced.cancel) {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      closeFlyoutMenuDebounced.cancel();
    }
  }, [closeFlyoutMenuDebounced, cancelToggleFlyoutMenu]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        flyoutNavigationMenuRef.current &&
        /* @ts-ignore TODO: TS2339 ->  Property 'contains' does not exist on type 'never'. */
        !flyoutNavigationMenuRef.current.contains(event.target) &&
        visibleNavigation
      ) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        closeFlyoutMenuDebounced();
      }
    },
    [flyoutNavigationMenuRef, visibleNavigation, closeFlyoutMenuDebounced],
  );

  useEffect(() => {
    if (visibleNavigation === NavigationMenuType.FLYOUT_NAVI_MENU) {
      global.addEventListener('keydown', handleKeydown);
      global.addEventListener('click', handleClickOutside);
    }

    return () => {
      global.removeEventListener('keydown', handleKeydown);
      global.removeEventListener('click', handleClickOutside);
    };
  }, [
    handleKeydown,
    handleClickOutside,
    handleMouseLeave,
    visibleNavigation,
    handleMouseEnter,
  ]);

  if (!primaryMenuLinks?.length) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const activeMenuLabel = (): string => {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    const menu = primaryMenuLinks.filter(
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      (menu) => menu.node.id === activeVerticalMenu,
    )[0].node.link.label;

    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
    return menu;
  };

  return (
    <nav
      className={classNames(grid.ContainerPullOut, styles.MenuWrapper)}
      ref={flyoutNavigationMenuRef}
      data-testid="flyout-menu-items-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={classNames('track-menu', styles.CloseButton)}
        aria-label="Menu schließen"
        data-track-action="close"
        data-track-element="flyout-menu"
        data-testid={`flyout-menu-close-button`}
      >
        <Icon type="IconXMark" onClick={closeMenu} />
      </button>
      {primaryMenuLinks.map(({ node }) => (
        <ul
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          key={`${node.id}`}
          className={classNames(styles.ListItem, styles.SubMenu, {
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            [styles.ActiveSubMenu]: node.id === activeVerticalMenu,
          })}
          id={`${node?.link?.label}`}
        >
          <li className={grid.Row}>
            {node?.subtree?.edges?.map((subItem, index) => {
              return (
                <ul
                  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                  key={`${subItem.node.id}`}
                  className={classNames(grid.ColMd6, styles.ListItem)}
                  data-testid={`flyout-menu-title-link`}
                >
                  <Link
                    onClick={closeMenu}
                    className={classNames('track-menu', styles.TitleLink)}
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                    path={subItem?.node?.link?.path}
                    data-track-action="click"
                    data-track-element={`flyout-menu-title-link-${index}`}
                  >
                    {subItem?.node?.link?.label}
                  </Link>

                  {subItem?.node?.subtree?.edges?.map((subItemThird, index) => (
                    <li
                      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                      key={`${subItemThird.node.id}`}
                      data-testid={`flyout-menu-link`}
                    >
                      <Link
                        onClick={closeMenu}
                        className={classNames('track-menu', styles.Link)}
                        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                        path={subItemThird?.node?.link?.path}
                        data-track-action="click"
                        data-track-element={`flyout-link-${index}`}
                      >
                        {subItemThird?.node?.link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              );
            })}
            <NavigationAdIntegration
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItem> | undefined' is not assignable to type 'MenuTreeItem'. */
              menu={node}
              activeLabel={activeMenuLabel()}
            />
          </li>
        </ul>
      ))}
    </nav>
  );
};

export default NavigationFlyoutMenu;
