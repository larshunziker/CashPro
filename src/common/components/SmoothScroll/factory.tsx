import React, { Component, MouseEvent, ReactElement } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { scrollToAnchorElement } from './helpers';
import { ANCHOR_TAG_SCROLL_TO_TOP } from './constants';
import { SmoothScrollProps } from './typings';

const SmoothScrollFactory = () => {
  class SmoothScroll extends Component<SmoothScrollProps> {
    static defaultProps = {
      offset: 60,
      behavior: 'smooth',
    };

    private registerTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private hasScrolledToHash = false;
    private boundAnchorId: string | null = null;

    constructor(props: SmoothScrollProps) {
      super(props);
    }

    scrollToAnchorElement = (event: MouseEvent) => {
      event.preventDefault();
      scrollToAnchorElement(this.props.anchorId, {
        behavior: this.props.behavior,
        offset: this.props.offset,
        scrollToTopAnchorId: ANCHOR_TAG_SCROLL_TO_TOP,
        replace: true,
      });
    };

    clearRegisterTimeout() {
      if (this.registerTimeoutId !== null) {
        clearTimeout(this.registerTimeoutId);
        this.registerTimeoutId = null;
      }
    }

    scrollToHashIfNeeded() {
      const { anchorId } = this.props;

      if (!anchorId || this.hasScrolledToHash) {
        return;
      }

      const encodedAnchorId = encodeURI(anchorId);

      if (global.location.hash !== `#${encodedAnchorId}`) {
        return;
      }

      this.hasScrolledToHash = true;
      scrollToAnchorElement(anchorId, {
        behavior: this.props.behavior,
        offset: this.props.offset,
        scrollToTopAnchorId: ANCHOR_TAG_SCROLL_TO_TOP,
      });
    }

    bindClickListeners() {
      const { anchorId } = this.props;

      if (!anchorId) {
        return;
      }

      Array.from(
        document.querySelectorAll(
          `a:not([href^="http"])[href*="#${encodeURI(anchorId)}"]`,
        ),
      ).forEach((linkAnchor: Record<string, any>): void => {
        linkAnchor.addEventListener('click', this.scrollToAnchorElement);
      });
      this.boundAnchorId = anchorId;
    }

    registerListener(shouldScrollToHash: boolean) {
      // Always clear pending work first so a falsy/changed anchorId cannot leave
      // a stale timeout that binds listeners with the wrong selector.
      this.clearRegisterTimeout();

      if (!this.props.anchorId) {
        return;
      }

      this.registerTimeoutId = setTimeout(() => {
        smoothscroll.polyfill();

        // Hash navigation must not depend on utility-bar links existing yet,
        // and must run only once so later re-renders cannot fight user scroll.
        if (shouldScrollToHash) {
          this.scrollToHashIfNeeded();
        }

        this.bindClickListeners();
      }, 100);
    }

    unregisterListener() {
      if (!this.boundAnchorId) {
        return;
      }

      Array.from(
        document.querySelectorAll(
          `a:not([href^="http"])[href*="#${encodeURI(this.boundAnchorId)}"]`,
        ),
      ).forEach((linkAnchor: Record<string, any>): void => {
        linkAnchor.removeEventListener('click', this.scrollToAnchorElement);
      });
      this.boundAnchorId = null;
    }

    componentDidMount() {
      this.registerListener(true);
    }

    componentDidUpdate(prevProps: SmoothScrollProps) {
      this.unregisterListener();
      // Allow a one-time hash scroll when anchorId becomes available after mount
      // (e.g. CASH comments: anchorId={(isInView && COMMENTS_ANCHOR_ID) || ''}).
      // Once scrolled, further updates only rebind click listeners.
      const anchorIdBecameAvailable =
        !prevProps.anchorId && !!this.props.anchorId;
      this.registerListener(anchorIdBecameAvailable && !this.hasScrolledToHash);
    }

    componentWillUnmount = () => {
      this.clearRegisterTimeout();
      this.unregisterListener();
    };

    render(): ReactElement | null {
      const { anchorId, children } = this.props;

      if (!anchorId) {
        return <>{children || null}</>;
      }

      return (
        <div
          key={`smooth-scroll-${anchorId}`}
          data-testid="smooth-scroll-factory-wrapper"
          id={anchorId}
        >
          {children}
        </div>
      );
    }
  }

  return SmoothScroll;
};

export default SmoothScrollFactory;
