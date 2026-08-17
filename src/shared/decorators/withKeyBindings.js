/**
 * @file   with key bindings
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-03-05
 *
 */

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

// ---------------------------------------------------------------------------------- //
// HELPERS
// ---------------------------------------------------------------------------------- //

// _ is because flow cant handle numeric object keys
const keyCodeMap = {
  _37: 'arrowLeft',
  _38: 'arrowUp',
  _39: 'arrowRight',
  _40: 'arrowDown',
  _13: 'enter',
  _27: 'escape',
};

// ---------------------------------------------------------------------------------- //
// LOGIC
// ---------------------------------------------------------------------------------- //

const handleKeyDown = (props, config, event) => {
  const keyName = keyCodeMap[`_${event.which}`];

  if (keyName && config.keyMap[keyName] && config.keyMap[keyName].action) {
    event.preventDefault();

    if (config.keyMap[keyName].test && !config.keyMap[keyName].test(props)) {
      return;
    }

    config.keyMap[keyName].action(props);
  }
};

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

const withOnKeyUpHandler = (config) =>
  withHandlers({
    onKeyDownHandler: (props) => (event) => handleKeyDown(props, config, event),
  });

export default (config) => (Component) =>
  compose(withOnKeyUpHandler(config))(Component);
