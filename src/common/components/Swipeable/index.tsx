import React from 'react';
import { useSwipeable } from 'react-swipeable';

/**
 *
 * @description example taken from https://github.com/FormidableLabs/react-swipeable/blob/main/migration.md#swipeable-simple-example
 * react-swipeable version 6+ no longer exports its own version of Swipeable.
 */
/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const Swipeable = ({ children, ...props }) => {
  const handlers = useSwipeable(props);
  return (
    <div id="swipeable" {...handlers} style={props.style}>
      {children}
    </div>
  );
};

export default Swipeable;
