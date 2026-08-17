/**
 * @file   withArticleIntersectionObserver
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2018-06-18 14:24:49
 *
 */

import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import {
  default as withIntersectionObserver,
  isIntersectionObserverSupported,
} from './withIntersectionObserver';

// ---------------------------------------------------------------------------------- //
// HELPER
// ---------------------------------------------------------------------------------- //

const hideSocialSharebar = (el, isIntersecting) => {
  const src = (el && el.querySelector('#social-share-bar')) || null;
  if (!src) {
    return;
  }
  if (isIntersecting) {
    src.style.display = '';
  } else {
    src.style.display = 'none';
  }
};

const handleFallback = (config) => {
  const selectors = document.querySelectorAll(config.selectors.join(','));

  selectors.forEach((selector) => {
    hideSocialSharebar(selector, true);
  });
};

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

const handle = (config) => {
  // define callback
  const onEntry = (entries) => {
    entries.forEach((entry) => {
      hideSocialSharebar(entry.target, entry.isIntersecting);
    });
  };

  return withIntersectionObserver(config, onEntry);
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
