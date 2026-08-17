import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import navigationStateSelector from '../../../../../shared/selectors/navigationStateSelector';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import ModalOverlay from '../ModalOverlay';
import NavigationBar from './components/NavigationBar';
import NavigationMenu from './components/NavigationMenu';
import NavigationPuzzlesMenu from './components/NavigationPuzzlesMenu';
import NavigationUserMenu from './components/NavigationUserMenu';
import { NAVIGATION_MODAL_OVERLAY } from '../ModalOverlay/constants';
import {
  TYPE_NAVIGATION_MENU_DEFAULT,
  TYPE_NAVIGATION_MENU_USER,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.preload'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illus */
import { query } from './queries.preload';
import { NavigationProps } from './typings';

type NavigationPropsInner = NavigationProps & {
  navigationPrimaryMenu: Menu;
  visibleNavigation: string;
  isPuzzlePage: boolean;
};

const getValidMainLinks = (menu: Menu): Array<MenuTreeItemEdge> | null => {
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
  visibleNavigation,
  isPuzzlePage,
  hasStickiness = true,
}: NavigationPropsInner): ReactElement => {
  const menuLinks = getValidMainLinks(navigationPrimaryMenu);
  const isVisible = visibleNavigation === TYPE_NAVIGATION_MENU_DEFAULT;

  return (
    <>
      {!isPuzzlePage ? (
        <TestFragment data-testid="navigation-navigationbar-wrapper">
          {/* @ts-ignore TODO: TS2322 ->  Type 'MenuTreeItemEdge[] | null' is not assignable to type 'MenuTreeItemEdge[]'. */}
          <NavigationBar menuLinks={menuLinks} hasStickiness={hasStickiness} />
        </TestFragment>
      ) : null}
      {visibleNavigation === TYPE_NAVIGATION_MENU_USER && (
        <div data-testid="navigation-navigationusermenu-wrapper">
          <ModalOverlay component={NAVIGATION_MODAL_OVERLAY} isVisible={true}>
            <NavigationUserMenu />
          </ModalOverlay>
        </div>
      )}
      {/* Note: the wrapping Fragment around the modal is necessary, otherwise it
      won't render correctly on SSR */}
      <div data-testid="navigation-navigationmenu-wrapper">
        <ModalOverlay
          component={NAVIGATION_MODAL_OVERLAY}
          isVisible={isVisible}
        >
          {!isPuzzlePage ? (
            <NavigationMenu isVisible={isVisible} menuLinks={menuLinks} />
          ) : (
            <NavigationPuzzlesMenu isVisible={isVisible} />
          )}
        </ModalOverlay>
      </div>
    </>
  );
};

const withData = withProps(query);

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
});

export default compose<any, any>(
  withData,
  connect(mapStateToProps),
)(Navigation);
