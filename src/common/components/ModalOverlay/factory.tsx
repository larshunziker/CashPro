import React, { Component } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import {
  ModalOverlayFactoryOptions,
  ModalOverlayFactoryOptionsStyles,
  ModalOverlayProps,
} from './typings';

export type ModalOverlayPropsInner = ModalOverlayFactoryOptions &
  ModalOverlayProps & {
    /* @ts-ignore TODO: TS7008 ->  Member 'setNavigationVisible' implicitly has an 'any' type. */
    setNavigationVisible;
  };

export type ModalOverlayState = {
  isSSR: boolean;
  transitionInProgress: boolean;
};

const defaultStyles: ModalOverlayFactoryOptionsStyles = {
  BodyClass: '',
  CenteredOverlay: '',
  FadeIn: '',
  FadeOut: '',
  IsDifferentFlavour: '',
  Wrapper: '',
};

const ModalOverlaySSR = ({ children }: ModalOverlayProps) => (
  <section style={{ display: 'none' }}>{children}</section>
);

export default ({
  modalRootId,
  setNavigationVisibleAction,
  styles: appStyles,
}: ModalOverlayFactoryOptions) => {
  class ModalOverlay extends Component<
    ModalOverlayPropsInner,
    ModalOverlayState
  > {
    el: HTMLElement;
    modalRoot: HTMLElement;
    timeoutId: ReturnType<typeof setTimeout>;

    constructor(props: ModalOverlayPropsInner) {
      super(props);

      // Create a div that we'll render the modal into. Because each
      // Modal component has its own element, we can render multiple
      // modal components into the modal container.
      if (typeof window !== 'undefined') {
        this.el = document.createElement('div');
      } else {
        /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'HTMLElement'. */
        this.el = null;
      }

      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Timeout'. */
      this.timeoutId = null;
      this.state = {
        isSSR: true,
        transitionInProgress: false,
      };
    }

    componentDidMount() {
      this.setState({
        isSSR: false,
      });
      // Append the element into the DOM on mount. We'll render
      // into the modal container element (see the HTML tab).
      /* @ts-ignore TODO: TS2322 ->  Type 'HTMLElement | null' is not assignable to type 'HTMLElement'. */
      this.modalRoot =
        (document && document.getElementById(modalRootId)) || null;

      if (this.modalRoot && this.el) {
        this.modalRoot.appendChild(this.el);
      }
    }

    componentDidUpdate(prevProps: ModalOverlayPropsInner) {
      // let the .3s transition animation end
      if (
        prevProps.isVisible &&
        !this.props.isVisible &&
        !this.state.transitionInProgress &&
        this.modalRoot &&
        this.el &&
        this.props.setNavigationVisible
      ) {
        this.setState({ transitionInProgress: true });
        this.props.setNavigationVisible(null);

        this.timeoutId = setTimeout(() => {
          this.setState({ transitionInProgress: false });
        }, 300);
      }
    }

    componentWillUnmount() {
      // Remove the element from the DOM when we unmount
      if (this.modalRoot && this.el) {
        this.timeoutId && clearTimeout(this.timeoutId);
        this.modalRoot.removeChild(this.el);
      }
    }

    shouldComponentUpdate(
      nextProps: ModalOverlayPropsInner,
      nextState: ModalOverlayState,
    ) {
      return (
        this.props.isVisible !== nextProps.isVisible ||
        this.state.isSSR !== nextState.isSSR ||
        this.state.transitionInProgress !== nextState.transitionInProgress ||
        this.props.children !== nextProps.children
      );
    }

    getStyles = () => {
      const styles =
        (typeof appStyles === 'function' && appStyles(this.props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };

    render() {
      if (this.state.isSSR && !__TESTING__) {
        return <ModalOverlaySSR {...this.props} />;
      }

      if (!this.el) {
        return null;
      }

      const styles = this.getStyles();
      const { children, isDifferentFlavour, isVisible } = this.props;

      // hide overlay if it is not visible
      const rootStyles: Record<string, any> = {};
      if (!isVisible && !this.state.transitionInProgress) {
        // display: none; breaks the image gallery stage on SI, visibility: hidden works fine
        rootStyles.visibility = 'hidden';
        rootStyles.zIndex = '-1'; // added due to HZ-721
      }

      return createPortal(
        <BodyClassName
          className={classNames({ [styles.BodyClass]: isVisible })}
        >
          <div
            className={classNames(styles.Wrapper, styles.CenteredOverlay, {
              [styles.FadeIn]: isVisible && styles.FadeIn,
              [styles.FadeOut || '']: !isVisible && styles.FadeOut,
              [styles.IsDifferentFlavour || '']: isDifferentFlavour,
            })}
            data-testid={'modal-wrapper'}
            style={rootStyles}
          >
            {(isVisible || (!isVisible && this.state.transitionInProgress)) && (
              <>{children}</>
            )}
          </div>
        </BodyClassName>,

        this.el,
      );
    }
  }

  const mapDispatchToProps: Record<string, any> = {
    setNavigationVisible: setNavigationVisibleAction,
  };

  const withStoreConnection = connect(null, mapDispatchToProps);

  return compose<any, any>(withStoreConnection)(ModalOverlay);
};
