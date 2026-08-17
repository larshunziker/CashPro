import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import scrollStateSelector from '../../../shared/selectors/scrollStateSelector';
import { ScrollToTopFactoryOptions, ScrollToTopProps } from './typings';

type ScrollToTopPropsInner = ScrollToTopProps & {
  scrollScrollTop: number;
};

type ScrollToTopState = {
  isVisible: boolean;
};

const ScrollToTopFactory = ({
  icon,
  anchorTagScrollToTop,
  pixelsScrolledToFadeInComponentDefault,
  styles,
}: ScrollToTopFactoryOptions) => {
  class ScrollToTop extends Component<ScrollToTopPropsInner, ScrollToTopState> {
    state: ScrollToTopState = {
      isVisible: false,
    };

    shouldComponentUpdate(
      nextProps: ScrollToTopPropsInner,
      nextState: ScrollToTopState,
    ) {
      return this.state.isVisible !== nextState.isVisible;
    }

    static getDerivedStateFromProps(nextProps: ScrollToTopPropsInner) {
      return {
        isVisible:
          nextProps.scrollScrollTop >
          (nextProps.pixelsScrolledToFadeInComponent
            ? nextProps.pixelsScrolledToFadeInComponent
            : pixelsScrolledToFadeInComponentDefault),
      };
    }

    render() {
      return (
        <div
          className={classNames(styles.ButtonWrapper, {
            [styles.ScrollToTopFadeIn]: this.state.isVisible,
            [styles.ScrollToTopFadeOut]: !this.state.isVisible,
          })}
        >
          <a
            href={`#${anchorTagScrollToTop}`}
            className={styles.ButtonToTop}
            aria-label="Nach oben"
          >
            {icon}
          </a>
        </div>
      );
    }
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    scrollScrollTop: scrollStateSelector(state).scrollTop,
  });

  return connect(mapStateToProps)(ScrollToTop);
};

export default ScrollToTopFactory;
