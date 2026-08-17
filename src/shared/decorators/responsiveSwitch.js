/**
 * Responsive decorator
 *
 *
 */

/**
 * @TODO
 *
 * 1. Remove this (not used anywhere).
 */

import React from 'react';
import { connect } from 'react-redux';
import { log } from 'helpers/utils';
import mapStateToProps from 'selectors/windowStateSelector';

const createResponsiveSwitch =
  (conditions) =>
  (MainComponent, FallbackComponent = null) =>
  (props) => {
    // width and height has to be defined in the props
    if (
      typeof props.width === 'undefined' ||
      typeof props.height === 'undefined'
    ) {
      log('width and/or height are not defined');
      return <MainComponent {...props} />;
    }

    // check if width condition is met
    if (
      (typeof conditions.minWidth !== 'undefined' &&
        conditions.minWidth > props.width) ||
      (typeof conditions.maxWidth !== 'undefined' &&
        conditions.maxWidth < props.width)
    ) {
      return FallbackComponent === null ? null : (
        <FallbackComponent {...props} />
      );
    }

    // check if height condition is met
    if (
      (typeof conditions.minHeight !== 'undefined' &&
        conditions.minHeight > props.height) ||
      (typeof conditions.maxHeight !== 'undefined' &&
        conditions.maxHeight < props.height)
    ) {
      return FallbackComponent === null ? null : (
        <FallbackComponent {...props} />
      );
    }

    return <MainComponent {...props} />;
  };

export default (conditions) =>
  (MainComponent, FallbackComponent = null) =>
    connect(mapStateToProps)(
      createResponsiveSwitch(conditions)(MainComponent, FallbackComponent),
    );
