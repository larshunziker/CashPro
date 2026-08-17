/* istanbul ignore file */

// TODO: check if we need this cp right now it's not used anywhere
import 'helpers/intersection-observer';

import React, { Component, ReactElement, createRef } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../shared/tests/components/TestFragment';
import styles from './styles.legacy.css';
import { LazyImgProps } from './typings';

const MAX_IMAGES_MEMOIZED = 100;

// @ts-ignore TODO: Update type for global
const loadedImagesStack: Array<string> = global.loadedImagesStack || [];

const memoizeImg = (src: string) => {
  loadedImagesStack.push(src);

  if (loadedImagesStack.length > MAX_IMAGES_MEMOIZED) {
    loadedImagesStack.shift();
  }
};

const imgInMemory = (src: string) => !!~loadedImagesStack.indexOf(src);

type LazyImgState = {
  isIntersecting: boolean;
  isLoaded: boolean;
  showThumb: boolean;
};

/**
 * @deprecated DON'T USE THIS COMPONENT ANYMORE, PLEASE USE THE "Picture" COMPONENT INSTEAD!
 */
export default class LazyImg extends Component<LazyImgProps, LazyImgState> {
  imageEl: RefObject;
  thumbEl: RefObject;
  observer: IntersectionObserver;
  timer: ReturnType<typeof setTimeout>;

  constructor(props: LazyImgProps) {
    super(props);

    this.imageEl = createRef();
    this.thumbEl = createRef();

    this.state = {
      isIntersecting: this.props.isIntersecting || false,
      isLoaded: this.props.isLoaded === true || imgInMemory(this.props.src),
      showThumb: true,
    };
  }

  componentDidMount(): void {
    if (!this.state.isLoaded) {
      this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
        rootMargin: this.props.rootMargin || '300px',
        threshold: this.props.threshold || 0,
      });

      this.observer.observe(this.imageEl.current);
    }
  }

  componentWillUnmount(): void {
    this.imageEl.current.onload = undefined;
    this.imageEl.current.onerror = undefined;
    clearTimeout(this.timer);
    this.observer && this.observer.disconnect();
  }

  shouldComponentUpdate(nextProps: LazyImgProps, nextState: LazyImgState) {
    if (
      this.props.src !== nextProps.src ||
      this.props.className !== nextProps.className ||
      this.state.isIntersecting !== nextState.isIntersecting ||
      this.state.isLoaded !== nextState.isLoaded ||
      this.state.showThumb !== nextState.showThumb
    ) {
      return true;
    }

    return false;
  }

  onIntersection(entries: Array<any>): void {
    if (entries[0].isIntersecting) {
      // Destroy observer
      this.observer.disconnect();

      this.imageEl.current.onload = (): void => {
        this.timer = setTimeout(() => {
          this.setState({ showThumb: false });
        }, 500);

        this.setState({ isLoaded: true });
      };
      this.imageEl.current.onerror = (): void => {
        this.imageEl.current.src = this.props.placeholderSrc;
      };
      this.imageEl.current.src = this.props.src;

      memoizeImg(this.props.src);

      this.setState({ isIntersecting: true });
    }
  }

  render(): ReactElement {
    const imgSrc = this.state.isLoaded
      ? this.props.src && this.props.src !== ''
        ? this.props.src
        : this.props.placeholderSrc
      : this.props.placeholderSrc;

    let imgTag: ReactElement = (
      <img
        ref={this.imageEl}
        className={classNames(styles.Image, this.props.className)}
        src={imgSrc}
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
        title={this.props.title || null}
        alt={
          imgSrc !== this.props.placeholderSrc ? this.props.alt : 'Placeholder'
        }
        /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'string | number | undefined'. */
        width={this.props.width || null}
        /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'string | number | undefined'. */
        height={this.props.height || null}
        data-testid={this.props.dataTestId || 'image-wrapper'}
        data-src={this.props.src}
        data-alt={this.props.alt}
      />
    );

    // Render the blurry thumbnail only on intersection
    if (
      this.state.isIntersecting &&
      this.state.showThumb &&
      this.props.thumbnailSrc
    ) {
      imgTag = (
        <>
          {imgTag}
          <img
            ref={this.thumbEl}
            src={this.props.thumbnailSrc}
            alt="Placeholder"
            className={classNames(styles.Placeholder, this.props.className)}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'string | number | undefined'. */
            width={this.props.width || null}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'string | number | undefined'. */
            height={this.props.height || null}
            style={{ opacity: this.state.isLoaded ? 0 : 1 }}
          />
        </>
      );
    }

    if (this.props.children) {
      return (
        <TestFragment data-testid="image-children-wrapper">
          {imgTag}
          {this.props.children}
        </TestFragment>
      );
    }

    return imgTag;
  }
}
