/**
 * @file   with teaser intersection observer
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-08-14
 *
 */

import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { setOriginalImageSrc } from 'helpers/replacePlaceholderOnLoad';
import {
  default as withIntersectionObserver,
  isIntersectionObserverSupported,
} from './withIntersectionObserver';

// ---------------------------------------------------------------------------------- //
// HELPER
// ---------------------------------------------------------------------------------- //

const handleFallback = (config) => {
  const selectors = document.querySelectorAll(config.selectors.join(','));

  selectors.forEach((selector) => {
    setOriginalImageSrc({ element: selector, config });
  });
};

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

const handle = (config) => {
  // define callback
  const onEntry = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      setOriginalImageSrc({ element: entry.target, config });

      try {
        observer.unobserve(entry.target);
      } catch (e) {
        // ignore
      }
    });
  };

  // strip out props which are not required by the intersection observer
  const obsectionObserverConfig = JSON.parse(JSON.stringify(config));
  delete obsectionObserverConfig.useBackgroundImage;

  return withIntersectionObserver(obsectionObserverConfig, onEntry);
};

const withLifecycle = (config) =>
  lifecycle({
    componentDidMount: () => {
      if (!isIntersectionObserverSupported) {
        handleFallback(config);
      }
    },
  });

export default (config) => (Component) =>
  compose(handle(config), withLifecycle(config))(Component);
