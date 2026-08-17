/**
 * @file   detect parent dimensions memoized
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-11-13
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import namedComponent from './namedComponent';

// ---------------------------------------------------------------------------------- //
// CONSTANTS
// ---------------------------------------------------------------------------------- //

// use this if your element has full container width (width of .container in a .section)
export const CONTAINER_WIDTH =
  'detect-parent-dimensions-memoized/container-width';

// use this if your element has the same width as an image gallery
export const INLINE_GALLERY_WIDTH =
  'detect-parent-dimensions-memoized/inline-gallery-width';

// use this if your element has the same width as an hero image gallery
export const GALLERY_HERO_WIDTH =
  'detect-parent-dimensions-memoized/gallery-hero-width';

export const NA_CAROUSEL_PARAGRAPH_WIDTH =
  'detect-parent-dimensions-memoized/na-carousel-paragraph-width';

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const CACHE = {};

const ref: RefObject = React.createRef();

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'inputProps' implicitly has an 'any' type. */
const detectParentDimensions = (Component) => (inputProps) => {
  // if parent dimensions are not defined, we return a dummy component to get the 'componentDidMount' event
  // that we're able to detect its parent dimensions
  if (inputProps.parentDimensions === null && __CLIENT__) {
    return <i ref={ref} style={{ display: 'none' }} />;
  } else if (inputProps.parentDimensions === null && __SERVER__) {
    const parentDimensions = {
      bottom: 0,
      height: inputProps.windowState.height,
      left: 0,
      right: 0,
      top: 0,
      width: inputProps.windowState.width,
    };

    return (
      <div ref={ref}>
        <Component {...inputProps} parentDimensions={parentDimensions} />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Component {...inputProps} />
    </div>
  );
};

// ---------------------------------------------------------------------------------- //
// RECOMPOSE
// ---------------------------------------------------------------------------------- //

/* @ts-ignore TODO: TS7006 ->  Parameter 'currentDimensions' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'newDimensions' implicitly has an 'any' type. */
const isUpdateRequired = (currentDimensions, newDimensions) =>
  !currentDimensions ||
  !newDimensions ||
  currentDimensions.bottom !== newDimensions.bottom ||
  currentDimensions.height !== newDimensions.height ||
  currentDimensions.left !== newDimensions.left ||
  currentDimensions.right !== newDimensions.right ||
  currentDimensions.top !== newDimensions.top ||
  currentDimensions.width !== newDimensions.width;

/* @ts-ignore TODO: TS7006 ->  Parameter 'key' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'windowWidth' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
const writeCache = (key, windowWidth, data) => {
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
  if (!CACHE[windowWidth]) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
    CACHE[windowWidth] = {};
  }
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
  if (!CACHE[windowWidth][key]) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
    CACHE[windowWidth][key] = {};
  }
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
  CACHE[windowWidth][key] = data;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'key' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'windowWidth' implicitly has an 'any' type. */
const readCache = (key, windowWidth) => {
  try {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
    return CACHE[windowWidth][key];
  } catch (e) {
    return null;
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'options' implicitly has an 'any' type. */
const updateBoundingClientRect = (options) =>
  function updateRect() {
    const existingDimensions = this.props.parentDimensions;

    // try to read from cache
    const cacheData = readCache(options.cacheKey, this.props.windowState.width);
    if (cacheData) {
      // update state if dimensions have changed
      if (isUpdateRequired(this.props.parentDimensions, cacheData)) {
        this.props.setParentDimensions(cacheData);
      }

      return;
    }

    // get new data
    const node = ref.current;
    const parentNode = (node && node.parentNode) || null;
    const newDimensions =
      (parentNode && parentNode.getBoundingClientRect()) || null;

    if (node && isUpdateRequired(existingDimensions, newDimensions)) {
      // update state
      this.props.setParentDimensions(newDimensions);

      // cache data
      writeCache(options.cacheKey, this.props.windowState.width, newDimensions);
    }
  };

/* @ts-ignore TODO: TS7006 ->  Parameter 'options' implicitly has an 'any' type. */
const parentDimensionsLifecycle = (options) =>
  lifecycle<any, any>({
    componentDidMount: updateBoundingClientRect(options),
    componentDidUpdate: updateBoundingClientRect(options),
  });

/* @ts-ignore TODO: TS7006 ->  Parameter 'options' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (options) => (state) => ({
  windowState: options.windowStateSelector(state),
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'factoryOptions' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'options' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
export default (factoryOptions) => (options) => (Component) =>
  compose<any, any>(
    namedComponent('detectParentDimensions'),
    connect(mapStateToProps(factoryOptions)),
    withState('parentDimensions', 'setParentDimensions', null),
    parentDimensionsLifecycle(options),
    detectParentDimensions,
  )(Component);
