/**
 * @file   with impression track
 * @desc   track the impression of a component, as soon as it enters visible area
 * @date   2020-02-10
 *
 */

import 'helpers/intersection-observer';

import React from 'react';
import { tealiumTrackEvent } from 'helpers/tealium';

const intersectionObserverConfig = {
  threshold: 0.5,
  delay: 1000,
};

const isIntersectionObserverSupported =
  'IntersectionObserver' in global && __CLIENT__;

const withImpressionTrackingObserver =
  ({ getTrackingId, trackingId = '', isTrackingActivated }) =>
  (Component) => {
    class ImpressionTrackingObserver extends React.Component {
      trackedComponentRef = React.createRef();
      _observer =
        isIntersectionObserverSupported && !__TESTING__
          ? new IntersectionObserver(this.onEntry, intersectionObserverConfig)
          : null;

      onEntry(entries, observer) {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'impression',
                cms_paragraph_id: target.dataset.trackingId,
              },
            });

            try {
              observer.unobserve(target);
            } catch (e) {
              // ignore
            }
          }
        });
      }

      componentDidMount() {
        if (this._observer && this.trackedComponentRef.current) {
          this._observer.observe(this.trackedComponentRef.current);
        }
      }

      componentWillUnmount() {
        if (this._observer && this.trackedComponentRef.current) {
          this._observer.unobserve(this.trackedComponentRef.current);
        }
      }

      render() {
        const dataTrackingId =
          (typeof getTrackingId === 'function' && getTrackingId(this.props)) ||
          trackingId;

        const isTrackingActive =
          typeof isTrackingActivated === 'function' &&
          isTrackingActivated(this.props);

        if (!isTrackingActive || !dataTrackingId) {
          return <Component {...this.props} />;
        }

        return (
          <div ref={this.trackedComponentRef} data-tracking-id={dataTrackingId}>
            <Component {...this.props} />
          </div>
        );
      }
    }

    return ImpressionTrackingObserver;
  };

export default withImpressionTrackingObserver;
