import React, { memo, ReactElement, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withProps from 'recompose/withProps';
import debounce from 'lodash/debounce';
import {
  setActiveMenuCategory,
  setNavigationVisible,
} from '../../../../../shared/actions/navigation';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import ModalOverlay from '../ModalOverlay';
import NavigationFlyoutMenu from './components/FlyoutNavigationMenu';
import NavigationBar from './components/NavigationBar';
import NavigationLoginMenu from './components/NavigationLoginMenu';
import NavigationMenu from './components/NavigationMenu';
import NavigationUserMenu from './components/NavigationUserMenu';
import {
  ModalOverlayType,
  NavigationMenuType,
} from '../../../../shared/constants/enums';
import { TYPE_NAVIGATION_USER_MENU_MODAL } from './components/NavigationUserMenu/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.preload'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/Ap */
import { query } from './queries.preload';
import { NavigationProps } from './typings';

type NavigationPropsInner = NavigationProps & {
  navigationPrimaryMenu: Menu;
  navigationSecondaryMenu: Menu;
};

const getValidMainLinks = (menu: Menu): MenuTreeItemEdge[] | null => {
  if (!menu?.links?.edges?.length || !Array.isArray(menu.links.edges)) {
    return null;
  }

  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItemEdge>[]' is not assignable to type 'MenuTreeItemEdge[]'. */
  return menu.links.edges.filter(
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    (edge) => edge.node && edge.node.link && edge.node.link.label,
  );
};

const Navigation = ({
  navigationPrimaryMenu,
  navigationSecondaryMenu,
}: NavigationPropsInner): ReactElement => {
  const dispatch = useDispatch();

  const [focusLink, setFocusLink] = useState('');

  const visibleNavigation = useSelector<ReduxState, NavigationMenuType>(
    ({ navigation }) =>
      navigation.visibleNavigation as unknown as NavigationMenuType,
  );
  const primaryMenuLinks = getValidMainLinks(navigationPrimaryMenu);
  const secondaryMenuLinks = getValidMainLinks(navigationSecondaryMenu);

  const openFlyoutMenu = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'node' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
    (node, type) => {
      setFocusLink(node.id);
      dispatch(setActiveMenuCategory(node.id));
      dispatch(setNavigationVisible(type));
    },
    [setFocusLink, dispatch],
  );

  const closeFlyoutMenu = useCallback(() => {
    setFocusLink('');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
    dispatch(setNavigationVisible(null));
  }, [setFocusLink, dispatch]);

  const toggleFlyoutMenu = useCallback(
    (type: NavigationMenuType, node: MenuTreeItem) => {
      if (node?.subtree?.edges?.length) {
        openFlyoutMenu(node, type);
      } else {
        closeFlyoutMenu();
      }
    },
    [openFlyoutMenu, closeFlyoutMenu],
  );

  const toggleFlyoutMenuDebounced = debounce(
    (type: NavigationMenuType, node: MenuTreeItem) =>
      toggleFlyoutMenu(type, node),
    300,
    { leading: false, trailing: true },
  );

  const toggleFlyoutNavigation = (
    type: NavigationMenuType,
    node: MenuTreeItem,
  ) => {
    closeFlyoutMenuDebounced?.cancel?.();
    toggleFlyoutMenuDebounced(type, node);
  };

  const closeFlyoutMenuDebounced = debounce(() => closeFlyoutMenu(), 120, {
    leading: false,
    trailing: true,
  });

  const closeFlyout = () => {
    toggleFlyoutMenuDebounced.cancel();
    closeFlyoutMenuDebounced();
  };

  return (
    <>
      <TestFragment data-testid="navigation-navigationbar-wrapper">
        <NavigationBar
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItemEdge>[] | null' is not assignable to type 'MenuTreeItemEdge[]'. */
          menuLinks={navigationPrimaryMenu?.links?.edges || null}
          toggleNavigation={toggleFlyoutNavigation}
          closeFlyoutMenuDebounced={closeFlyout}
          focusLink={focusLink}
        />
      </TestFragment>
      {visibleNavigation === NavigationMenuType.USER && (
        <TestFragment data-testid="navigation-navigationusermenu-wrapper">
          <ModalOverlay component={ModalOverlayType.DEFAULT} isVisible={true}>
            <NavigationUserMenu component={TYPE_NAVIGATION_USER_MENU_MODAL} />
          </ModalOverlay>
        </TestFragment>
      )}
      {visibleNavigation === NavigationMenuType.FLYOUT_NAVI_MENU && (
        <TestFragment data-testid="navigation-flyoutmenu-wrapper">
          <ModalOverlay
            component={ModalOverlayType.FLYOUT_NAVI_MENU}
            isVisible={true}
          >
            <NavigationFlyoutMenu
              /* @ts-ignore TODO: TS2322 ->  Type 'MenuTreeItemEdge[] | null' is not assignable to type 'MenuTreeItemEdge[]'. */
              primaryMenuLinks={primaryMenuLinks}
              closeFlyoutMenuDebounced={closeFlyoutMenuDebounced}
              cancelToggleFlyoutMenu={toggleFlyoutMenuDebounced.cancel}
            />
          </ModalOverlay>
        </TestFragment>
      )}
      {visibleNavigation === NavigationMenuType.LOGIN && (
        <TestFragment data-testid="navigation-navigationusermenu-wrapper">
          <ModalOverlay component={ModalOverlayType.DEFAULT} isVisible={true}>
            <NavigationLoginMenu />
          </ModalOverlay>
        </TestFragment>
      )}
      <div data-testid="navigation-navigationmenu-wrapper">
        <ModalOverlay
          component={ModalOverlayType.NAVIGATION}
          isVisible={visibleNavigation}
        >
          <NavigationMenu
            /* @ts-ignore TODO: TS2322 ->  Type 'MenuTreeItemEdge[] | null' is not assignable to type 'MenuTreeItemEdge[]'. */
            primaryMenuLinks={primaryMenuLinks}
            /* @ts-ignore TODO: TS2322 ->  Type 'MenuTreeItemEdge[] | null' is not assignable to type 'MenuTreeItemEdge[]'. */
            secondaryMenuLinks={secondaryMenuLinks}
          />
        </ModalOverlay>
      </div>
    </>
  );
};

const withData = withProps(query);

export default withData(memo(Navigation));
