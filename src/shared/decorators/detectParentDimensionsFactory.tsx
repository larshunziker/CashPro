/**
 * @file  higher order component to detect it's parent bounding rect
 *
 */

/**
 * @TODO
 *
 * 1. Check if https://github.com/okonet/react-container-dimensions works instead.
 */

import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import namedComponent from './namedComponent';

const ref: RefObject = React.createRef();

const detectParentDimensions =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */

  (Component) =>
    ({ ...inputProps }) => {
      // if parent dimensions are not defined, we return a dummy component to get the 'componentDidMount' event
      // that we're able to detect its parent dimensions
      if (inputProps.parentDimensions === null) {
        if (__CLIENT__) {
          return <i ref={ref} style={{ display: 'none' }} />;
        }

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

// @todo: check if we can use reselect here to avoid recalculations
const updateBoundingClientRect = function updateRect() {
  const node = ref.current;
  const parentNode = (node && node.parentNode) || null;
  const newDimensions =
    (parentNode && parentNode.getBoundingClientRect()) || null;
  const existingDimensions = this.props.parentDimensions;
  if (
    node &&
    newDimensions &&
    (!existingDimensions ||
      existingDimensions.bottom !== newDimensions.bottom ||
      existingDimensions.height !== newDimensions.height ||
      existingDimensions.left !== newDimensions.left ||
      existingDimensions.right !== newDimensions.right ||
      existingDimensions.top !== newDimensions.top ||
      existingDimensions.width !== newDimensions.width)
  ) {
    this.props.setParentDimensions(newDimensions);
  }
};

const parentDimensionsLifecycle = lifecycle<any, any>({
  componentDidMount: updateBoundingClientRect,
  componentDidUpdate: updateBoundingClientRect,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'options' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (options) => (state) => ({
  windowState: options.windowStateSelector(state),
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'factoryOptions' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
export default (factoryOptions) => (Component) =>
  compose<any, any>(
    namedComponent('detectParentDimensions'),
    connect(mapStateToProps(factoryOptions)),
    withState('parentDimensions', 'setParentDimensions', null),
    parentDimensionsLifecycle,
    detectParentDimensions,
  )(Component);
