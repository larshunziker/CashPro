/**
 * @file   with scroll down to anchor
 * @author Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @author Thomas Rubattel <thomas.rubattel@ringieraxelspringer.ch>
 * @date   2018-06-15
 *
 */

import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import namedComponent from 'decorators/namedComponent';

const scrollDownToAnchor = (currentUrl, anchor) => {
  if (anchor) {
    global.location.href = `${currentUrl}${anchor}`;
  }
};

const withLifecycle = lifecycle({
  componentDidMount() {
    scrollDownToAnchor(
      global.location.pathname + global.location.search,
      global.location.hash,
    );
  },
});

export default (Component) =>
  compose(namedComponent('withScrollDownToAnchor'), withLifecycle)(Component);
