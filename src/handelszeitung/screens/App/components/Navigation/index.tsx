import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import withProps from 'recompose/withProps';
import navigationStateSelector from '../../../../../shared/selectors/navigationStateSelector';
import ModalOverlay from '../ModalOverlay';
import NavigationMenu from './components/NavigationMenu';
import NavigationUserMenu from './components/NavigationUserMenu';
import { DEFAULT_MODAL_OVERLAY } from '../ModalOverlay/constants';
import { TYPE_NAVIGATION_USER_MENU_MODAL } from './components/NavigationUserMenu/constants';
import {
  TYPE_NAVIGATION_MENU_DEFAULT,
  TYPE_NAVIGATION_MENU_FADEOUT,
  TYPE_NAVIGATION_MENU_USER,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.preload'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/ */
import { GET_NAVIGATION } from './queries.preload';
import { NavigationProps } from './typings';

type NavigationPropsInner = NavigationProps & {
  visibleNavigation: string;
  navigationMenuSV: Menu | null;
  navigationMenuBIL: Menu | null;
  navigationMenuHZ: Menu | null;
  navigationMenuHZB: Menu | null;
};

const Navigation = (props: NavigationPropsInner): ReactElement => {
  switch (props.visibleNavigation) {
    case TYPE_NAVIGATION_MENU_USER: {
      // Note: the wrapping Fragment around the modal is necessary, otherwise it won't render correctly on SSR
      return (
        <div>
          <ModalOverlay component={DEFAULT_MODAL_OVERLAY} isVisible={true}>
            <NavigationUserMenu
              {...props}
              component={TYPE_NAVIGATION_USER_MENU_MODAL}
            />
          </ModalOverlay>
        </div>
      );
    }
    case TYPE_NAVIGATION_MENU_FADEOUT: {
      // Note: the wrapping Fragment around the modal is necessary, otherwise it won't render correctly on SSR
      return (
        <div>
          <ModalOverlay component={DEFAULT_MODAL_OVERLAY} isVisible={false}>
            <NavigationUserMenu
              {...props}
              component={TYPE_NAVIGATION_USER_MENU_MODAL}
            />
          </ModalOverlay>
        </div>
      );
    }
    case TYPE_NAVIGATION_MENU_DEFAULT:
    default: {
      // navigation has to be always on DOM for SEO reasons
      const isVisible =
        props.visibleNavigation === TYPE_NAVIGATION_MENU_DEFAULT;
      // Note: the wrapping Fragment around the modal is necessary, otherwise it won't render correctly on SSR
      return (
        <div>
          <ModalOverlay isVisible={isVisible} component={DEFAULT_MODAL_OVERLAY}>
            <NavigationMenu {...props} />
          </ModalOverlay>
        </div>
      );
    }
  }
};

const mapStateToProps = (state: ReduxState) => ({
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
});

const withUpdatePolicy = shouldUpdate<any>(
  (props: NavigationPropsInner, nextProps: NavigationPropsInner) =>
    props.visibleNavigation !== nextProps.visibleNavigation,
);

const withState = connect(mapStateToProps);

const withData = withProps(GET_NAVIGATION);

export default compose<any, any>(
  withData,
  withState,
  withUpdatePolicy,
)(Navigation);
