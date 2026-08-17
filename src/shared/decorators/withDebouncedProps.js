/**
 *
 */

import React from 'react';
import debounce from 'lodash/debounce';

const defaultConfig = {
  debounceTime: 500,
};

const withDebouncedProps =
  (config = defaultConfig) =>
  (Component) =>
    class extends React.Component {
      constructor(props) {
        super(props);
        this.updateDebounced = debounce(this.forceUpdate, config.debounceTime);
      }

      shouldComponentUpdate() {
        this.updateDebounced();
        return false;
      }

      componentWillUnmount() {
        this.updateDebounced.cancel();
      }

      render() {
        return <Component {...this.props} />;
      }
    };

export default withDebouncedProps;
