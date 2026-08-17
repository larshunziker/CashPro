/**
 * @file   with comments handler
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-02-20
 *
 */

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import namedComponent from 'decorators/namedComponent';

// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

const extendWithHandlers = withHandlers({
  toggleCommentSectionVisibility:
    ({ isCommentSectionVisible, setCommentSectionVisibility }) =>
    (event) => {
      event.preventDefault();
      setCommentSectionVisibility(!isCommentSectionVisible);
    },
});

export default (Component) =>
  compose(
    namedComponent('withCommentsHandlers'),
    withState('isCommentSectionVisible', 'setCommentSectionVisibility', false),
    extendWithHandlers,
  )(Component);
