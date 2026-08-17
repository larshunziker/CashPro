/**
 *
 */

import React from 'react';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import classNames from 'classnames';
import styles from './styles.legacy.css';

const ImageCaption = ({ caption }) => {
  if (!caption) {
    return null;
  }

  return (
    <div
      className={classNames('image-caption', styles.Wrapper)}
      dangerouslySetInnerHTML={{ __html: caption }}
    />
  );
};

const withExtendedHandlers = withHandlers({
  clickHandler: (props) => () => props.toggleVisibility(!props.isVisible),
});

const withUpdatePolicy = shouldUpdate(
  (props, nextProps) =>
    props.isVisible !== nextProps.isVisible ||
    props.caption !== nextProps.caption,
);

const withIsVisibleState = withState('isVisible', 'toggleVisibility', false);

export default compose(
  withIsVisibleState,
  withExtendedHandlers,
  withUpdatePolicy,
)(ImageCaption);
