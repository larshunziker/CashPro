/**
 * @file    HOC adding viewport props
 * @author  Glenn Reyes <glenn@glennreyes.com>
 * @author  Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @desc    This decorator provides following utils:
 *          - matchViewport(label : string) : boolean
 *          - isMobile : boolean
 *          - isTablet : boolean
 *          - isDesktop : boolean
 * @date    2017-04-08
 *
 */

import { connect } from 'react-redux';
import { compose } from 'recompose';

const mapStateToProps = (options) => (state) => {
  const matchViewport = (label) =>
    options.windowStateSelector(state).viewport.label === label;
  const isMobile =
    matchViewport(options.VIEWPORT_XS) ||
    matchViewport(options.VIEWPORT_SM) ||
    matchViewport(options.VIEWPORT_MD);
  const isTablet =
    matchViewport(options.VIEWPORT_LG) || matchViewport(options.VIEWPORT_XL);
  const isDesktop = !isMobile && !isTablet;

  return {
    isDesktop,
    isMobile,
    isTablet,
    matchViewport,
  };
};

const withViewportPropsFactory = (options) => (Component) =>
  compose(connect(mapStateToProps(options)))(Component);

export default withViewportPropsFactory;
