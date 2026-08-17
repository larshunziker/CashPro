import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import classNames from 'classnames';
import navigationStateSelector from '../../../../../shared/selectors/navigationStateSelector';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import { setNavigationVisible as navigationToggleAction } from '../../../../../shared/actions/navigation';
import ModalOverlay from '../ModalOverlay';
import NavigationDefault from './components/NavigationDefault';
import Overlay from './components/Overlay';
import { DEFAULT_LANGUAGE } from './components/LanguageSwitch';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './query.preload'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/scree */
import { GET_NAVIGATION } from './query.preload';
import styles from './styles.legacy.css';
import { NavigationDefaultProps } from './components/NavigationDefault/typings';
import { NavigationProps } from './typings';

type NavigationPropsInner = NavigationProps &
  NavigationDefaultProps & { visibleNavigation: string };

export const doHandleNavigationToggle =
  (props: NavigationPropsInner) =>
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  (event): void => {
    if (event.metaKey || event.shiftKey || event.altKey || event.ctrlKey) {
      return;
    }

    // update the redux state
    props.navigationToggle(!props.visibleNavigation);
  };

export const overlay =
  (props: NavigationPropsInner) =>
  (
    navigationPrimaryMenu: Menu | null,
    navigationPrimaryMenuFr: Menu | null,
    navigationSecondaryMenu: Menu | null,
  ): ReactElement => (
    <nav
      className={classNames(styles.OverlayWrapper, {
        [styles.Visible]: props.visibleNavigation,
      })}
    >
      <ModalOverlay isVisible={props.visibleNavigation}>
        <Overlay
          navigationPrimaryMenu={
            props.language === DEFAULT_LANGUAGE
              ? navigationPrimaryMenu
              : navigationPrimaryMenuFr
          }
          navigationSecondaryMenu={navigationSecondaryMenu}
          navigationToggle={props.handleNavigationToggle}
        />
      </ModalOverlay>
    </nav>
  );

const withData = withProps(GET_NAVIGATION);

const withHandleNavigationToggle = withHandlers({
  handleNavigationToggle: doHandleNavigationToggle,
});

const withRenderNavigationOverlay = withHandlers({
  renderNavigationOverlay: overlay,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
  language: settingsStateSelector(state).language,
});

const mapDispatchToProps = {
  navigationToggle: navigationToggleAction,
};

export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withData,
  withHandleNavigationToggle,
  withRenderNavigationOverlay,
)(NavigationDefault);
