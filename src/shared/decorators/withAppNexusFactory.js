import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * with app nexus
 *
 * @file    hoc for app nexus usage factory
 * @author  Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @author  Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date    2019-06-17
 *
 */
import { extractDataFromPropsByConfigMap } from 'helpers/extractDataFromPropsByConfigMap';
import { log } from 'helpers/utils';
import { ADMEIRA_VIEWPORTS } from 'constants/ads';

export default ({
    windowStateSelector,
    mapVerticalToAdCategory,
    mapPathSegmentToVertical,
    mapPathSegmentToOnmeda,
    defaultVertical,
  }) =>
  ({ parseTrackingData }) =>
  (WrappedComponent) => {
    class AppNexusHoC extends Component {
      constructor(props) {
        super(props);
      }

      getChannel = () => {
        const pathname = this.props?.location?.pathname || '';

        if (!this.props?.location) {
          log('appnexus-hoc', 'location props not provided!', 'red');
        }

        // if the whole path is explicitly === "/" -> then we're on HOME!
        if (pathname === '/') {
          return 'Home';
        }

        // map the new location to a possible vertical
        let channel = pathname
          .split('/')
          .reduce(
            (prev, current) =>
              prev === defaultVertical && current.length > 0
                ? mapPathSegmentToVertical(current)
                : prev,
            defaultVertical,
          ); // better detect DEFAULT as fallback as we just don't know where we are

        // update vertical and specify if we're on onmeda
        if (mapPathSegmentToOnmeda) {
          channel = mapPathSegmentToOnmeda(channel, pathname);
        }

        return mapVerticalToAdCategory()[channel] || 'ROS';
      };

      /**
       * getCurrentViewport
       *
       * @deprecated
       * @desc  read the current viewport for the ads
       *        it's not the same breakpoints like the windowState breakpoints
       * @param {Object} windowWidth
       */
      getCurrentViewport = (windowWidth) => {
        let viewport = ADMEIRA_VIEWPORTS[0];

        for (let i = 0; i < ADMEIRA_VIEWPORTS.length; i += 1) {
          if (
            ADMEIRA_VIEWPORTS[i].from <= windowWidth &&
            ADMEIRA_VIEWPORTS[i].to >= windowWidth
          ) {
            viewport = ADMEIRA_VIEWPORTS[i];
            break;
          }
        }

        return viewport;
      };

      render() {
        // update hoc just on screen ready (not crucial but looks better on the logs)
        if (!__TESTING__) {
          if (!global.Ads) {
            global.Ads = global.__INITIAL_ADS_CONFIG__ || {};
          }

          log('appnexus-hoc', 'in render', 'green');
          // push ad config data to global scope for ssr handling
          global.Ads = {
            ...global.Ads,
            config: {
              ...global.Ads.config,
              channel: this.getChannel(),
              // TODO: remove platform as soon as all apps are using the new ad logic
              platform: this.getCurrentViewport(this.props.windowStateWidth)
                .label,
              targeting: extractDataFromPropsByConfigMap(
                parseTrackingData(this.props),
                this.props,
              ),
            },
            tracking: {
              ...global.Ads.tracking,
            },
          };
        }
        return <WrappedComponent {...this.props} />;
      }
    }

    const mapStateToProps = (state) => ({
      windowStateWidth: windowStateSelector(state).width,
    });

    return connect(mapStateToProps)(AppNexusHoC);
  };
