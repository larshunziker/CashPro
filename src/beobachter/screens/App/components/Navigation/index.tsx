import React, { ReactElement, memo } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withProps from 'recompose/withProps';
import { ProgressBarPlaceholder } from '../../../../../common/components/ProgressBar/factory';
import { setTree } from '../../../../../shared/actions/navigation';
import navigationStateSelector from '../../../../../shared/selectors/navigationStateSelector';
import ModalOverlay from '../ModalOverlay';
import NavigationBar from './components/NavigationBar';
import NavigationMenu from './components/NavigationMenu';
import NavigationUserMenu from './components/NavigationUserMenu';
import { SLIDE_IN_MODAL_OVERLAY } from '../ModalOverlay/constants';
import { NavigationMenuType } from './constants';
import { TYPE_NAVIGATION_USER_MENU_MODAL } from './components/NavigationUserMenu/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.preload'. '/Users/bhs/code/work/rasch-stack/src/beobachter/scre */
import { GET_NAVIGATION } from './queries.preload';
import { NavigationProps } from './typings';

type NavigationPropsInner = NavigationProps & {
  visibleNavigation?: NavigationMenuType;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  setNavigationTree: (props) => void;
  navigationPrimaryMenu: Menu;
  navigationSecondaryMenu: Menu;
  navigationQuickAccessMenu: Menu;
  isInArticle: boolean;
  setFocusSearchOnMount: (focusOnMount: boolean) => void;
  isInApp?: boolean;
};

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const Navigation = ({
  navigationPrimaryMenu,
  navigationSecondaryMenu,
  navigationQuickAccessMenu,
  visibleNavigation,
  isScrolledToCollapse,
  children,
  isInArticle,
  setFocusSearchOnMount,
  isInApp,
}: NavigationPropsInner): ReactElement => {
  // navigation has to be always on DOM for SEO reasons
  const isVisible = visibleNavigation === NavigationMenuType.DEFAULT;
  const isUserMenuVisible = visibleNavigation === NavigationMenuType.USER;

  return (
    <>
      <NavigationBar
        navigationPrimaryMenu={navigationPrimaryMenu}
        isScrolledToCollapse={isScrolledToCollapse}
        isInArticle={isInArticle}
        isInApp={isInApp}
      />

      <ModalOverlay
        component={SLIDE_IN_MODAL_OVERLAY}
        isVisible={isUserMenuVisible}
        isLeftToRight={false}
      >
        <NavigationUserMenu component={TYPE_NAVIGATION_USER_MENU_MODAL} />
      </ModalOverlay>

      <ModalOverlay
        component={SLIDE_IN_MODAL_OVERLAY}
        isVisible={isVisible}
        isLeftToRight={true}
      >
        <NavigationMenu
          navigationPrimaryMenu={navigationPrimaryMenu}
          navigationSecondaryMenu={navigationSecondaryMenu}
          navigationQuickAccessMenu={navigationQuickAccessMenu}
          visibleNavigation={visibleNavigation}
          setFocusSearchOnMount={setFocusSearchOnMount}
        >
          {children}
        </NavigationMenu>
      </ModalOverlay>

      <ProgressBarPlaceholder />
    </>
  );
};

const setNavigationTreeAfterRender = (props: NavigationPropsInner) => {
  // update the redux state
  if (props.navigationPrimaryMenu) {
    props.setNavigationTree(props.navigationPrimaryMenu);
  }
};

const mapStateToProps = (state: ReduxState) => ({
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
});

const mapDispatchToProps = {
  setNavigationTree: setTree,
};

const withStoreConnection = connect(mapStateToProps, mapDispatchToProps);

const withData = withProps(GET_NAVIGATION);

const withLifecycle = lifecycle<NavigationPropsInner, NavigationPropsInner>({
  // set navigation tree data
  componentDidMount() {
    setNavigationTreeAfterRender(this.props);
  },
  componentDidUpdate() {
    setNavigationTreeAfterRender(this.props);
  },
});

export default compose<any, any>(
  withData,
  withStoreConnection,
  withLifecycle,
)(memo<NavigationProps>(Navigation));
